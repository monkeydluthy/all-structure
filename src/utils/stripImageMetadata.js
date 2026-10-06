const replaceExtension = (filename, extension) => {
  const base = filename.replace(/\.[^.]+$/, '');
  return `${base || 'image'}.${extension}`;
};

const jpegHasApp1 = (bytes) => {
  let offset = 2;
  while (offset + 4 < bytes.length && bytes[offset] === 0xff) {
    const marker = bytes[offset + 1];
    if (marker === 0xda || marker === 0xd9) return false;
    const length = (bytes[offset + 2] << 8) | bytes[offset + 3];
    if (marker === 0xe1) return true;
    offset += 2 + length;
  }
  return false;
};

const readTiffOrientation = (bytes, tiffStart, size) => {
  if (size < 8) return null;
  const little = bytes[tiffStart] === 0x49;
  const view = new DataView(bytes.buffer, bytes.byteOffset + tiffStart, size);
  const get16 = (offset) => view.getUint16(offset, little);
  const get32 = (offset) => view.getUint32(offset, little);
  if (get16(2) !== 42) return null;
  const ifd = get32(4);
  if (ifd + 2 > view.byteLength) return null;
  const count = get16(ifd);
  for (let i = 0; i < count; i += 1) {
    const entry = ifd + 2 + i * 12;
    if (entry + 12 > view.byteLength) break;
    if (get16(entry) === 0x0112) return get16(entry + 8);
  }
  return null;
};

const readJpegOrientation = (bytes) => {
  let offset = 2;
  while (offset + 4 < bytes.length && bytes[offset] === 0xff) {
    const marker = bytes[offset + 1];
    if (marker === 0xda || marker === 0xd9) return 1;
    const length = (bytes[offset + 2] << 8) | bytes[offset + 3];
    if (marker === 0xe1) {
      const payloadStart = offset + 4;
      const header = [0x45, 0x78, 0x69, 0x66, 0x00, 0x00];
      const isExif = header.every((value, index) => bytes[payloadStart + index] === value);
      if (isExif) {
        const orientation = readTiffOrientation(bytes, payloadStart + 6, length - 2 - 6);
        if (orientation) return orientation;
      }
    }
    offset += 2 + length;
  }
  return 1;
};

const stripJpegApp1 = (bytes) => {
  const chunks = [bytes.subarray(0, 2)];
  let offset = 2;
  while (offset + 4 < bytes.length && bytes[offset] === 0xff) {
    const marker = bytes[offset + 1];
    if (marker === 0xda) {
      chunks.push(bytes.subarray(offset));
      break;
    }
    const length = (bytes[offset + 2] << 8) | bytes[offset + 3];
    const segmentEnd = offset + 2 + length;
    if (marker !== 0xe1) chunks.push(bytes.subarray(offset, segmentEnd));
    offset = segmentEnd;
  }
  return new Blob(chunks, { type: 'image/jpeg' });
};

const readPngExifOrientation = (bytes) => {
  let offset = 8;
  while (offset + 8 <= bytes.length) {
    const length = new DataView(bytes.buffer, bytes.byteOffset + offset, 4).getUint32(0);
    const type = String.fromCharCode(
      bytes[offset + 4],
      bytes[offset + 5],
      bytes[offset + 6],
      bytes[offset + 7]
    );
    if (type === 'eXIf') {
      return readTiffOrientation(bytes, offset + 8, length) || 1;
    }
    offset += 12 + length;
    if (type === 'IEND') break;
  }
  return null;
};

const chunkHasGps = (bytes, dataStart, length) => {
  const sample = bytes.subarray(dataStart, dataStart + length);
  const text = new TextDecoder('latin1').decode(sample);
  return /GPSLatitude|GPSLongitude|GPSAltitude/.test(text);
};

const stripPngLocationMetadata = (bytes) => {
  const chunks = [bytes.subarray(0, 8)];
  let offset = 8;
  let removed = false;
  while (offset + 8 <= bytes.length) {
    const length = new DataView(bytes.buffer, bytes.byteOffset + offset, 4).getUint32(0);
    const type = String.fromCharCode(
      bytes[offset + 4],
      bytes[offset + 5],
      bytes[offset + 6],
      bytes[offset + 7]
    );
    const dataStart = offset + 8;
    const chunkEnd = offset + 12 + length;
    const isText = type === 'tEXt' || type === 'iTXt' || type === 'zTXt';
    const drop = type === 'eXIf' || (isText && chunkHasGps(bytes, dataStart, length));
    if (drop) removed = true;
    else chunks.push(bytes.subarray(offset, chunkEnd));
    offset = chunkEnd;
    if (type === 'IEND') break;
  }
  return removed ? new Blob(chunks, { type: 'image/png' }) : null;
};

const fileFromBlob = (blob, filename, type) => new File([blob], filename, { type, lastModified: Date.now() });

const renderOriented = async (file, type, extension) => {
  const bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' });
  const canvas = document.createElement('canvas');
  canvas.width = bitmap.width;
  canvas.height = bitmap.height;
  const context = canvas.getContext('2d');
  context.drawImage(bitmap, 0, 0);
  bitmap.close?.();

  const blob = await new Promise((resolve, reject) => {
    canvas.toBlob(
      (result) => (result ? resolve(result) : reject(new Error('Could not process image'))),
      type,
      1
    );
  });

  return fileFromBlob(blob, replaceExtension(file.name, extension), type);
};

const sniffType = (file, bytes) => {
  if (file.type) return file.type;
  if (bytes[0] === 0xff && bytes[1] === 0xd8) return 'image/jpeg';
  if (bytes[0] === 0x89 && bytes[1] === 0x50) return 'image/png';
  return '';
};

export const stripImageMetadata = async (file) => {
  const bytes = new Uint8Array(await file.arrayBuffer());
  const type = sniffType(file, bytes);

  if (type === 'image/jpeg' || type === 'image/jpg') {
    const orientation = readJpegOrientation(bytes) || 1;
    if (orientation !== 1) return renderOriented(file, 'image/jpeg', 'jpg');
    if (!jpegHasApp1(bytes)) return file;
    return fileFromBlob(stripJpegApp1(bytes), replaceExtension(file.name, 'jpg'), 'image/jpeg');
  }

  if (type === 'image/png') {
    const orientation = readPngExifOrientation(bytes);
    if (orientation && orientation !== 1) return renderOriented(file, 'image/png', 'png');
    const stripped = stripPngLocationMetadata(bytes);
    if (!stripped) return file;
    return fileFromBlob(stripped, replaceExtension(file.name, 'png'), 'image/png');
  }

  const outputType = type === 'image/webp' ? 'image/webp' : 'image/jpeg';
  const extension = outputType === 'image/webp' ? 'webp' : 'jpg';
  return renderOriented(file, outputType, extension);
};
