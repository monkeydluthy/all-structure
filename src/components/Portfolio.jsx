import React, { useState, useEffect } from 'react';
import { supabase } from '../config/supabaseConfig';

const Portfolio = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [supabaseProjects, setSupabaseProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Hardcoded projects (always shown first)
  const hardcodedProjects = [
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

  // Fetch Supabase projects on mount
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data: projects, error } = await supabase
          .from('projects')
          .select(`
            *,
            project_images (*)
          `)
          .eq('is_before_after', true)
          .order('created_at', { ascending: false });

        if (error) throw error;

        // Transform the data to match our hardcoded format
        const transformedProjects = projects.map(project => {
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
            allImages, // Keep all images for gallery
            imageCount: allImages.length,
            service: project.service,
            location: project.location,
          };
        });

        setSupabaseProjects(transformedProjects);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Combine hardcoded and Supabase projects
  const projects = [...hardcodedProjects, ...supabaseProjects];

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
    <section id="portfolio" className="portfolio">
      <div className="container">
        <h2>Our Recent Work</h2>
        <p className="section-subtitle">See the quality of our craftsmanship</p>

        <div className="portfolio-grid">
          {projects.map((project) => (
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
                  {project.imageCount > 2 && (
                    <span className="image-count">📷 {project.imageCount} images</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for project details */}
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
                {selectedProject.allImages && selectedProject.allImages.length > 2 ? (
                  // Gallery view for multiple images
                  <div style={{ position: 'relative', width: '100%' }}>
                    <img 
                      src={selectedProject.allImages[currentImageIndex]} 
                      alt={`${selectedProject.title} - Image ${currentImageIndex + 1}`}
                      style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
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
                ) : (
                  // Standard before/after view
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
    </section>
  );
};

export default Portfolio;
