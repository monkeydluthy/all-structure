import React from 'react';
import { HIC_LOOKUP_URL, HIC_NUMBER, LEGAL_NAME } from '../config/business';

const ContractorRegistration = ({ className = '' }) => (
  <p className={`contractor-registration${className ? ` ${className}` : ''}`}>
    {LEGAL_NAME} · Home Improvement Contractor Registration{' '}
    <a href={HIC_LOOKUP_URL} target="_blank" rel="noopener noreferrer">
      {HIC_NUMBER}
    </a>
  </p>
);

export default ContractorRegistration;
