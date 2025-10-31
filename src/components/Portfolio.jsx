import React, { useState } from 'react';

const Portfolio = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
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

  const openModal = (project) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
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
                <div className="modal-before">
                  <img src={selectedProject.beforeImage} alt="Before" />
                  <span>Before</span>
                </div>
                <div className="modal-after">
                  <img src={selectedProject.afterImage} alt="After" />
                  <span>After</span>
                </div>
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
