import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../config/supabaseConfig';
import usePageMetadata from '../hooks/usePageMetadata';

const SITE_URL = 'https://all-structure-maintenance.netlify.app';

const PortfolioPage = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [supabaseBeforeAfter, setSupabaseBeforeAfter] = useState([]);
  const [supabaseGallery, setSupabaseGallery] = useState([]);
  const [loading, setLoading] = useState(true);

  usePageMetadata({
    title: 'Construction Portfolio Meriden CT | All Structure Maintenance Projects',
    description:
      'Browse remodeling, roofing, restoration, and property maintenance projects completed by All Structure Maintenance in Meriden, Wallingford, Cheshire, and across Connecticut.',
    keywords: [
      'general contractor meriden ct portfolio',
      'kitchen remodeling connecticut projects',
      'bathroom renovation meriden ct before and after',
      'roofing contractor wallingford ct photos',
      'water damage restoration meriden examples',
      'best general contractor near meriden work',
    ],
    canonicalPath: '/portfolio',
    openGraph: {
      title: 'Project Portfolio | All Structure Maintenance',
      description:
        'See before-and-after photos from Connecticut remodeling, roofing, restoration, and maintenance projects completed by All Structure Maintenance.',
      type: 'website',
      image: `${SITE_URL}/images/kitchen-after.jpg`,
    },
    structuredData: [
      {
        id: 'portfolio-collection',
        data: {
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'All Structure Maintenance Project Portfolio',
          url: `${SITE_URL}/portfolio`,
          description:
            'Remodeling, roofing, restoration, painting, tile, and property maintenance projects completed across Meriden, Wallingford, Cheshire, and surrounding Connecticut communities.',
        },
      },
    ],
  });

  // Hardcoded projects (always shown first)
  const beforeAfterProjects = [
    {
      id: 1,
      title: 'Kitchen Remodel',
      description: 'Complete kitchen transformation',
      beforeImage: '/images/kitchen-before.jpg',
      afterImage: '/images/kitchen-after.jpg',
      service: 'Remodeling',
      location: 'Meriden, CT',
    },
    {
      id: 2,
      title: 'Bathroom Renovation',
      description: 'Modern bathroom upgrade',
      beforeImage: '/images/bathroom-before.jpg',
      afterImage: '/images/bathroom-after.jpg',
      service: 'Remodeling',
      location: 'Wallingford, CT',
    },
    {
      id: 3,
      title: 'Roof Repair',
      description: 'Complete roof restoration',
      beforeImage: '/images/roof-before.jpg',
      afterImage: '/images/roof-after.jpg',
      service: 'Roofing',
      location: 'Southington, CT',
    },
    {
      id: 4,
      title: 'Basement Finishing',
      description: 'Unfinished to finished basement',
      beforeImage: '/images/basement-before.jpg',
      afterImage: '/images/basement-after.jpg',
      service: 'Remodeling',
      location: 'Cheshire, CT',
    },
    {
      id: 5,
      title: 'Water Damage Restoration',
      description: 'Complete restoration after flood',
      beforeImage: '/images/water-restore-before.jpg',
      afterImage: '/images/water-restore-after.jpg',
      service: 'Restoration',
      location: 'Meriden, CT',
    },
    {
      id: 6,
      title: 'Tile Installation',
      description: 'Floor tiling',
      beforeImage: '/images/tiling-before.jpg',
      afterImage: '/images/tiling-after.jpg',
      service: 'Tile Work',
      location: 'Wallingford, CT',
    },
  ];

  const projectGallery = [
    {
      id: 1,
      title: 'Modern Remodeling Work',
      description: 'Beautiful contemporary design',
      image: '/images/remodel.jpg',
      service: 'Remodeling',
      location: 'Meriden, CT',
    },
    {
      id: 2,
      title: 'Full Restoration Project',
      description: 'Complete property restoration',
      image: '/images/restore.jpg',
      service: 'Restoration',
      location: 'Wallingford, CT',
    },
    {
      id: 3,
      title: 'Roofing Excellence',
      description: 'Professional roof installation',
      image: '/images/roof.JPEG',
      service: 'Roofing',
      location: 'Southington, CT',
    },
    {
      id: 4,
      title: 'Sheetrock Installation',
      description: 'Smooth sheetrock finishing',
      image: '/images/sheetrock.JPG',
      service: 'Painting',
      location: 'Cheshire, CT',
    },
    {
      id: 5,
      title: 'Tile Work',
      description: 'Custom tile installation',
      image: '/images/tile.jpg',
      service: 'Tile',
      location: 'Meriden, CT',
    },
    {
      id: 6,
      title: 'Property Maintenance',
      description: 'Well-maintained outdoor space',
      image: '/images/lawn.jpg',
      service: 'Maintenance',
      location: 'Wallingford, CT',
    },
  ];

  // Fetch Supabase projects on mount
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Fetch before/after projects
        const { data: beforeAfterData, error: beforeAfterError } = await supabase
          .from('projects')
          .select(`
            *,
            project_images (*)
          `)
          .eq('is_before_after', true)
          .order('created_at', { ascending: false });

        if (beforeAfterError) throw beforeAfterError;

        const transformedBeforeAfter = beforeAfterData.map(project => {
          const images = project.project_images || [];
          const beforeImages = images.filter(img => img.image_type === 'before').map(img => img.image_url);
          const afterImages = images.filter(img => img.image_type === 'after').map(img => img.image_url);
          const allImages = [...beforeImages, ...afterImages];
          
          return {
            id: project.id,
            title: project.title,
            description: project.description,
            beforeImage: beforeImages[0] || '',
            afterImage: afterImages[0] || '',
            allImages,
            imageCount: allImages.length,
            service: project.service,
            location: project.location,
          };
        });

        // Fetch gallery projects
        const { data: galleryData, error: galleryError } = await supabase
          .from('projects')
          .select(`
            *,
            project_images (*)
          `)
          .eq('is_before_after', false)
          .order('created_at', { ascending: false });

        if (galleryError) throw galleryError;

        const transformedGallery = galleryData.map(project => {
          const images = project.project_images || [];
          const galleryImages = images.filter(img => img.image_type === 'gallery').map(img => img.image_url);
          
          return {
            id: project.id,
            title: project.title,
            description: project.description,
            image: galleryImages[0] || '',
            allImages: galleryImages,
            imageCount: galleryImages.length,
            service: project.service,
            location: project.location,
          };
        });

        setSupabaseBeforeAfter(transformedBeforeAfter);
        setSupabaseGallery(transformedGallery);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const openModal = (project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
  };

  const closeModal = () => {
    setSelectedProject(null);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (selectedProject?.allImages) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedProject.allImages.length);
    }
  };

  const prevImage = () => {
    if (selectedProject?.allImages) {
      setCurrentImageIndex((prev) => (prev - 1 + selectedProject.allImages.length) % selectedProject.allImages.length);
    }
  };

  return (
    <div>
      <section className="portfolio-hero">
        <div className="container">
          <h1>General Contractor Portfolio in Meriden &amp; Connecticut</h1>
          <p>
            Explore how All Structure Maintenance—Meriden’s trusted general contractor—delivers kitchen remodeling, bathroom renovation, emergency water damage restoration, roofing repairs, and property maintenance across Connecticut. Each project highlights our commitment to clean job sites, detailed craftsmanship, and responsive communication.
          </p>
          <p>
            Looking for inspiration? Review the transformations below, then schedule a consultation to discuss your project in Meriden, Wallingford, Cheshire, or nearby towns. You can also revisit our{' '}
            <Link to="/services">service pages</Link> for detailed scopes of work and connect with us on the{' '}
            <a href="https://www.facebook.com/people/All-Structure-Maintenance/100063566413883/" target="_blank" rel="noopener noreferrer">
              All Structure Maintenance Facebook page
            </a>{' '}for current updates.
          </p>
          <div className="portfolio-hero-links">
            <Link to="/services/remodeling">Kitchen &amp; Bathroom Remodeling</Link>
            <Link to="/services/roofing">Roofing &amp; Gutter Projects</Link>
            <Link to="/services/restoration">Water Damage Restoration</Link>
            <Link to="/services/maintenance">Property Maintenance Programs</Link>
            <Link to="/contact">Request a Project Estimate</Link>
          </div>
        </div>
      </section>

      {/* Before & After Section */}
      <section className="portfolio-section before-after-section">
        <div className="container">
          <h2>Before & After</h2>
          <p className="section-subtitle">See the transformation of our recent projects</p>

          <div className="portfolio-grid">
            {[...beforeAfterProjects, ...supabaseBeforeAfter].map((project) => (
              <div
                key={project.id}
                className="portfolio-item"
                onClick={() => openModal(project)}
              >
                <div className="before-after-container">
                  <div className="before-image">
                    <img
                      src={project.beforeImage}
                      alt={`${project.title} - Before`}
                    />
                    <span className="label">Before</span>
                  </div>
                  <div className="after-image">
                    <img
                      src={project.afterImage}
                      alt={`${project.title} - After`}
                    />
                    <span className="label">After</span>
                  </div>
                </div>
                <div className="portfolio-overlay">
                  <h4>{project.title}</h4>
                  <p>{project.description}</p>
                  <div className="project-details">
                    <span className="service">{project.service}</span>
                    <span className="location">{project.location}</span>
                    {project.imageCount && project.imageCount > 1 && (
                      <span className="image-count">📷 {project.imageCount} images</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="portfolio-section gallery-section">
        <div className="container">
          <h2>Project Gallery</h2>
          <p className="section-subtitle">Browse our completed projects</p>

          <div className="portfolio-grid">
            {[...projectGallery, ...supabaseGallery].map((project) => (
              <div
                key={project.id}
                className="portfolio-item"
                onClick={() => openModal(project)}
              >
                <div className="portfolio-single-image">
                  <img src={project.image} alt={project.title} />
                </div>
                <div className="portfolio-overlay">
                  <h4>{project.title}</h4>
                  <p>{project.description}</p>
                  <div className="project-details">
                    <span className="service">{project.service}</span>
                    <span className="location">{project.location}</span>
                    {project.imageCount && project.imageCount > 1 && (
                      <span className="image-count">📷 {project.imageCount} images</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedProject && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeModal}>
              ✕
            </button>
            <div className="modal-header">
              <h3>{selectedProject.title}</h3>
              <p>{selectedProject.description}</p>
            </div>
            <div className="modal-images">
              {selectedProject.allImages && selectedProject.allImages.length >= 2 ? (
                // Gallery view for multiple images
                <div className="modal-gallery-container" style={{ 
                  position: 'relative', 
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  minHeight: '400px',
                  maxHeight: '600px',
                  overflow: 'hidden'
                }}>
                  <img 
                    src={selectedProject.allImages[currentImageIndex]} 
                    alt={`${selectedProject.title} - Image ${currentImageIndex + 1}`}
                    style={{ 
                      maxWidth: '100%',
                      maxHeight: '100%',
                      width: 'auto',
                      height: 'auto',
                      objectFit: 'contain',
                      borderRadius: '8px',
                      display: 'block'
                    }}
                  />
                  {selectedProject.allImages.length > 1 && (
                    <>
                      <button
                        onClick={(e) => { e.stopPropagation(); prevImage(); }}
                        style={{
                          position: 'absolute',
                          left: '10px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          background: 'rgba(0, 0, 0, 0.5)',
                          color: 'white',
                          border: 'none',
                          borderRadius: '50%',
                          width: '40px',
                          height: '40px',
                          fontSize: '20px',
                          cursor: 'pointer'
                        }}
                      >
                        ‹
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); nextImage(); }}
                        style={{
                          position: 'absolute',
                          right: '10px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          background: 'rgba(0, 0, 0, 0.5)',
                          color: 'white',
                          border: 'none',
                          borderRadius: '50%',
                          width: '40px',
                          height: '40px',
                          fontSize: '20px',
                          cursor: 'pointer'
                        }}
                      >
                        ›
                      </button>
                      <div style={{
                        position: 'absolute',
                        bottom: '10px',
                        right: '10px',
                        background: 'rgba(0, 0, 0, 0.7)',
                        color: 'white',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '20px',
                        fontSize: '0.9rem'
                      }}>
                        {currentImageIndex + 1} / {selectedProject.allImages.length}
                      </div>
                    </>
                  )}
                </div>
              ) : selectedProject.beforeImage && selectedProject.afterImage ? (
                <>
                  <div className="modal-before">
                    <img src={selectedProject.beforeImage} alt="Before" />
                    <span>Before</span>
                  </div>
                  <div className="modal-after">
                    <img src={selectedProject.afterImage} alt="After" />
                    <span>After</span>
                  </div>
                </>
              ) : (
                <div className="modal-single-image">
                  <img src={selectedProject.image} alt={selectedProject.title} />
                </div>
              )}
            </div>
            <div className="modal-details">
              <div className="detail-item">
                <strong>Service:</strong> {selectedProject.service}
              </div>
              <div className="detail-item">
                <strong>Location:</strong> {selectedProject.location}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioPage;
