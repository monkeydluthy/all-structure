import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../config/supabaseConfig';
import AnalyticsWidget from '../components/AnalyticsWidget';

const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [showModal, setShowModal] = useState({ show: false, type: '', message: '' });
  const [activeTab, setActiveTab] = useState('analytics');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/admin/login');
      } else {
        setUser(user);
      }
      setLoading(false);
    };

    checkUser();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}>
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-header" style={{ 
        background: 'linear-gradient(135deg, #0f172a 0%, #1f2937 100%)',
        padding: '2rem 0',
        color: 'white'
      }}>
        <div className="container">
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center' 
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <img 
                src="/images/logo.png" 
                alt="All Structure Maintenance Logo" 
                style={{ height: '50px', width: 'auto' }}
              />
              <h1 style={{ margin: 0 }}>Admin Dashboard</h1>
            </div>
            <div className="admin-header-right" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <span className="admin-welcome-text">Welcome, {user?.email === 'luthdigitalconsult@gmail.com' ? 'Anthony' : user?.email === 'AllstructureMainLLC@yahoo.com' ? 'Steve' : user?.email}</span>
              <a 
                href="https://all-structure-maintenance.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: '0.5rem 1.5rem',
                  background: 'transparent',
                  color: 'white',
                  border: '2px solid white',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.target.style.background = 'white';
                  e.target.style.color = '#1f2937';
                }}
                onMouseOut={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.color = 'white';
                }}
              >
                Visit Website
              </a>
              <button
                onClick={handleLogout}
                style={{
                  padding: '0.5rem 1.5rem',
                  background: '#d4a017',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: '4rem 0' }}>
        <div className="container">
          <div style={{
            background: 'white',
            padding: '3rem',
            borderRadius: '16px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            {/* Tab Navigation */}
            <div style={{ 
              display: 'flex', 
              borderBottom: '2px solid #e5e7eb',
              marginBottom: '2rem',
              gap: '1rem'
            }}>
              <button
                onClick={() => setActiveTab('analytics')}
                style={{
                  padding: '1rem 1.5rem',
                  background: 'transparent',
                  border: 'none',
                  borderBottom: activeTab === 'analytics' ? '3px solid #d4a017' : '3px solid transparent',
                  color: activeTab === 'analytics' ? '#d4a017' : '#6b7280',
                  fontWeight: activeTab === 'analytics' ? '600' : '400',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  marginBottom: '-2px'
                }}
              >
                📊 Analytics
              </button>
              <button
                onClick={() => setActiveTab('portfolio')}
                style={{
                  padding: '1rem 1.5rem',
                  background: 'transparent',
                  border: 'none',
                  borderBottom: activeTab === 'portfolio' ? '3px solid #d4a017' : '3px solid transparent',
                  color: activeTab === 'portfolio' ? '#d4a017' : '#6b7280',
                  fontWeight: activeTab === 'portfolio' ? '600' : '400',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  marginBottom: '-2px'
                }}
              >
                🖼️ Portfolio
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === 'analytics' && (
              <div>
                <div style={{
                  background: '#f8fafc',
                  padding: '2rem',
                  borderRadius: '12px',
                  border: '1px solid #e5e7eb'
                }}>
                  <AnalyticsWidget />
                </div>
              </div>
            )}

            {activeTab === 'portfolio' && (
              <div>
                <div className="portfolio-header" style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  marginBottom: '2rem'
                }}>
                  <h3 style={{ margin: 0, color: '#1f2937' }}>
                    Manage Your Portfolio Projects
                  </h3>
                  <button
                    onClick={() => setShowAddForm(true)}
                    style={{
                      padding: '0.75rem 1.5rem',
                      background: '#d4a017',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontWeight: '600',
                      fontSize: '1rem'
                    }}
                  >
                    + Add New Project
                  </button>
                </div>

            {/* Add Project Form */}
            {showAddForm && (
              <AddProjectForm 
                onClose={() => setShowAddForm(false)} 
                onSuccess={(message) => {
                  setShowModal({ show: true, type: 'success', message });
                  setShowAddForm(false);
                }}
                onError={(message) => {
                  setShowModal({ show: true, type: 'error', message });
                }}
                isModal={true}
              />
            )}

            {/* Edit Project Form */}
            {editingProject && (
              <AddProjectForm 
                project={editingProject}
                onClose={() => setEditingProject(null)} 
                onSuccess={(message) => {
                  setShowModal({ show: true, type: 'success', message });
                  setEditingProject(null);
                }}
                onError={(message) => {
                  setShowModal({ show: true, type: 'error', message });
                }}
                isModal={true}
              />
            )}

                {/* Projects List */}
                <ProjectsList onEditClick={(project) => setEditingProject(project)} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Success/Error Modal */}
      {showModal.show && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'white',
            padding: '2rem',
            borderRadius: '12px',
            maxWidth: '400px',
            width: '90%',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
          }}>
            <h3 style={{ 
              marginTop: 0,
              color: showModal.type === 'success' ? '#10b981' : '#dc2626'
            }}>
              {showModal.type === 'success' ? '✓ Success' : '✕ Error'}
            </h3>
            <p style={{ marginBottom: '1.5rem', color: '#374151' }}>
              {showModal.message}
            </p>
            <button
              onClick={() => setShowModal({ show: false, type: '', message: '' })}
              style={{
                width: '100%',
                padding: '0.75rem',
                background: showModal.type === 'success' ? '#10b981' : '#dc2626',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '1rem'
              }}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Projects List Component
const ProjectsList = ({ onEditClick }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState({ show: false, projectId: null });

  useEffect(() => {
    fetchProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select(`
          *,
          project_images (*)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (projectId) => {
    setShowDeleteConfirm({ show: true, projectId });
  };

  const handleDeleteConfirm = async () => {
    const { projectId } = showDeleteConfirm;

    try {
      // Delete images from storage
      const { data: images, error: imagesError } = await supabase
        .from('project_images')
        .select('image_url')
        .eq('project_id', projectId);

      if (!imagesError && images) {
        for (const img of images) {
          const imagePath = img.image_url.split('/').pop();
          await supabase.storage.from('project-images').remove([imagePath]);
        }
      }

      // Delete image records
      const { error: deleteImagesError } = await supabase
        .from('project_images')
        .delete()
        .eq('project_id', projectId);

      if (deleteImagesError) throw deleteImagesError;

      // Delete project
      const { error: deleteProjectError } = await supabase
        .from('projects')
        .delete()
        .eq('id', projectId);

      if (deleteProjectError) throw deleteProjectError;

      // Refresh list
      fetchProjects();
      setShowDeleteConfirm({ show: false, projectId: null });
    } catch (error) {
      console.error('Error deleting project:', error);
      alert('Failed to delete project: ' + error.message);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>
        Loading projects...
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>
        No projects uploaded yet. Click "+ Add New Project" to get started.
      </div>
    );
  }

  return (
    <div style={{ display: 'grid', gap: '1rem' }}>
      {projects.map((project) => {
        const images = project.project_images || [];
        const beforeImage = images.find(img => img.image_type === 'before')?.image_url;
        const afterImage = images.find(img => img.image_type === 'after')?.image_url;
        const galleryImage = images.find(img => img.image_type === 'gallery')?.image_url;

        return (
          <div
            key={project.id}
            className="admin-project-card"
            style={{
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              padding: '1.5rem',
              background: 'white',
              display: 'flex',
              gap: '1.5rem'
            }}
          >
            {/* Image Preview */}
            <div style={{ minWidth: '150px', maxWidth: '150px' }}>
              {project.is_before_after && beforeImage && afterImage ? (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                  <img
                    src={beforeImage}
                    alt="Before"
                    style={{
                      width: '100%',
                      height: '75px',
                      objectFit: 'cover',
                      borderRadius: '4px'
                    }}
                  />
                  <img
                    src={afterImage}
                    alt="After"
                    style={{
                      width: '100%',
                      height: '75px',
                      objectFit: 'cover',
                      borderRadius: '4px'
                    }}
                  />
                </div>
              ) : galleryImage ? (
                <img
                  src={galleryImage}
                  alt={project.title}
                  style={{
                    width: '100%',
                    height: '150px',
                    objectFit: 'cover',
                    borderRadius: '8px'
                  }}
                />
              ) : (
                <div style={{
                  width: '100%',
                  height: '150px',
                  background: '#f3f4f6',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#9ca3af'
                }}>
                  No image
                </div>
              )}
            </div>

            {/* Project Info */}
            <div className="admin-project-info" style={{ flex: 1 }}>
              <h4 style={{ margin: '0 0 0.5rem 0', color: '#1f2937' }}>
                {project.title}
              </h4>
              <p style={{ margin: '0 0 0.5rem 0', color: '#6b7280', fontSize: '0.9rem' }}>
                {project.description}
              </p>
              <div style={{ display: 'flex', gap: '1rem', fontSize: '0.85rem', color: '#9ca3af' }}>
                <span>📍 {project.location}</span>
                <span>🔧 {project.service}</span>
                <span>{project.is_before_after ? '📊 Before/After' : '🖼️ Gallery'}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="admin-project-actions" style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
              <button
                onClick={() => onEditClick(project)}
                style={{
                  padding: '0.5rem 1rem',
                  background: '#d4a017',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '0.9rem'
                }}
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteClick(project.id)}
                style={{
                  padding: '0.5rem 1rem',
                  background: '#dc2626',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '0.9rem'
                }}
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm.show && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'white',
            padding: '2rem',
            borderRadius: '12px',
            maxWidth: '400px',
            width: '90%',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
          }}>
            <h3 style={{ marginTop: 0, color: '#1f2937' }}>
              Confirm Delete
            </h3>
            <p style={{ marginBottom: '1.5rem', color: '#374151' }}>
              Are you sure you want to delete this project? This action cannot be undone.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setShowDeleteConfirm({ show: false, projectId: null })}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: 'white',
                  color: '#374151',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: '#dc2626',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Add Project Form Component
const AddProjectForm = ({ project, onClose, onSuccess, onError, isModal = false }) => {
  const isEditing = !!project;
  const [formData, setFormData] = useState({
    title: project?.title || '',
    description: project?.description || '',
    service: project?.service || 'Remodeling',
    location: project?.location || '',
    is_before_after: project?.is_before_after || false
  });
  const [beforeImages, setBeforeImages] = useState([]);
  const [afterImages, setAfterImages] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);
  const [beforeImagePreviews, setBeforeImagePreviews] = useState([]);
  const [afterImagePreviews, setAfterImagePreviews] = useState([]);
  const [galleryImagePreviews, setGalleryImagePreviews] = useState([]);
  const [uploading, setUploading] = useState(false);

  const services = ['Remodeling', 'Restoration', 'Roofing', 'Painting', 'Tile', 'Maintenance'];

  const handleImageChange = (type, e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const previews = files.map(file => URL.createObjectURL(file));
      if (type === 'before') {
        setBeforeImages(prev => [...prev, ...files]);
        setBeforeImagePreviews(prev => [...prev, ...previews]);
      }
      if (type === 'after') {
        setAfterImages(prev => [...prev, ...files]);
        setAfterImagePreviews(prev => [...prev, ...previews]);
      }
      if (type === 'gallery') {
        setGalleryImages(prev => [...prev, ...files]);
        setGalleryImagePreviews(prev => [...prev, ...previews]);
      }
    }
    // Reset input to allow selecting the same files again
    e.target.value = '';
  };

  const removeImage = (type, index) => {
    if (type === 'before') {
      // Revoke the object URL before removing
      URL.revokeObjectURL(beforeImagePreviews[index]);
      setBeforeImages(prev => prev.filter((_, i) => i !== index));
      setBeforeImagePreviews(prev => prev.filter((_, i) => i !== index));
    }
    if (type === 'after') {
      URL.revokeObjectURL(afterImagePreviews[index]);
      setAfterImages(prev => prev.filter((_, i) => i !== index));
      setAfterImagePreviews(prev => prev.filter((_, i) => i !== index));
    }
    if (type === 'gallery') {
      URL.revokeObjectURL(galleryImagePreviews[index]);
      setGalleryImages(prev => prev.filter((_, i) => i !== index));
      setGalleryImagePreviews(prev => prev.filter((_, i) => i !== index));
    }
  };

  // Cleanup object URLs on unmount
  useEffect(() => {
    return () => {
      [...beforeImagePreviews, ...afterImagePreviews, ...galleryImagePreviews].forEach(url => {
        URL.revokeObjectURL(url);
      });
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      let projectResult;
      if (isEditing) {
        // Update existing project
        const { data, error } = await supabase
          .from('projects')
          .update(formData)
          .eq('id', project.id)
          .select()
          .single();
        if (error) throw error;
        projectResult = { id: project.id };
      } else {
        // Create new project
        const { data, error: projectError } = await supabase
          .from('projects')
          .insert([formData])
          .select()
          .single();
        if (projectError) throw projectError;
        projectResult = data;
      }

      // Upload images if provided
      const imageUploads = [];

      if (formData.is_before_after) {
        // Upload all before images
        for (let i = 0; i < beforeImages.length; i++) {
          const beforeUrl = await uploadImage(beforeImages[i], `before-${Date.now()}-${i}`);
          imageUploads.push({ project_id: projectResult.id, image_url: beforeUrl, image_type: 'before', display_order: i + 1 });
        }
        // Upload all after images
        for (let i = 0; i < afterImages.length; i++) {
          const afterUrl = await uploadImage(afterImages[i], `after-${Date.now()}-${i}`);
          imageUploads.push({ project_id: projectResult.id, image_url: afterUrl, image_type: 'after', display_order: i + 1 });
        }
      } else {
        // Upload all gallery images
        for (let i = 0; i < galleryImages.length; i++) {
          const galleryUrl = await uploadImage(galleryImages[i], `gallery-${Date.now()}-${i}`);
          imageUploads.push({ project_id: projectResult.id, image_url: galleryUrl, image_type: 'gallery', display_order: i + 1 });
        }
      }

      // Insert image records
      if (imageUploads.length > 0) {
        const { error: imagesError } = await supabase
          .from('project_images')
          .insert(imageUploads);

        if (imagesError) throw imagesError;
      }

      // Cleanup preview URLs before resetting
      [...beforeImagePreviews, ...afterImagePreviews, ...galleryImagePreviews].forEach(url => {
        URL.revokeObjectURL(url);
      });

      // Reset form and close
      setFormData({
        title: '',
        description: '',
        service: 'Remodeling',
        location: '',
        is_before_after: false
      });
      setBeforeImages([]);
      setAfterImages([]);
      setGalleryImages([]);
      setBeforeImagePreviews([]);
      setAfterImagePreviews([]);
      setGalleryImagePreviews([]);
      onSuccess(isEditing ? 'Project updated successfully!' : 'Project added successfully!');
    } catch (error) {
      console.error('Error saving project:', error);
      onError(isEditing ? 'Failed to update project: ' + error.message : 'Failed to add project: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const uploadImage = async (file, filename) => {
    const fileExt = file.name.split('.').pop();
    const finalFilename = `${filename}.${fileExt}`;

    const { data, error } = await supabase.storage
      .from('project-images')
      .upload(finalFilename, file);

    if (error) throw error;

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('project-images')
      .getPublicUrl(finalFilename);

    return publicUrl;
  };

  const formContent = (
    <>
      <h3 style={{ marginBottom: '1.5rem', color: '#1f2937' }}>
        {isEditing ? 'Edit Project' : 'Add New Project'}
      </h3>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151' }}>
            Title
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '1rem',
              boxSizing: 'border-box'
            }}
            placeholder="e.g., Kitchen Remodel"
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151' }}>
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
            rows="3"
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '1rem',
              boxSizing: 'border-box',
              resize: 'vertical'
            }}
            placeholder="e.g., Complete kitchen transformation"
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151' }}>
              Service Type
            </label>
            <select
              value={formData.service}
              onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '1rem',
                boxSizing: 'border-box'
              }}
            >
              {services.map(service => (
                <option key={service} value={service}>{service}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151' }}>
              Location
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '1rem',
                boxSizing: 'border-box'
              }}
              placeholder="e.g., Meriden, CT"
            />
          </div>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={formData.is_before_after}
              onChange={(e) => setFormData({ ...formData, is_before_after: e.target.checked })}
              style={{ width: '18px', height: '18px' }}
            />
            <span style={{ fontWeight: '600', color: '#374151' }}>
              This is a Before/After project
            </span>
          </label>
        </div>

        {formData.is_before_after ? (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151' }}>
                Before Images {beforeImages.length > 0 && `(${beforeImages.length} selected)`}
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => handleImageChange('before', e)}
                required={!isEditing && beforeImages.length === 0}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  boxSizing: 'border-box',
                  marginBottom: '0.5rem'
                }}
              />
              {beforeImages.length > 0 && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))', gap: '0.5rem', marginTop: '0.5rem' }}>
                  {beforeImages.map((file, index) => (
                    <div key={index} style={{ position: 'relative' }}>
                      <img
                        src={beforeImagePreviews[index]}
                        alt={`Before ${index + 1}`}
                        style={{
                          width: '100%',
                          height: '80px',
                          objectFit: 'cover',
                          borderRadius: '4px',
                          border: '1px solid #d1d5db'
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => removeImage('before', index)}
                        style={{
                          position: 'absolute',
                          top: '-8px',
                          right: '-8px',
                          background: '#dc2626',
                          color: 'white',
                          border: 'none',
                          borderRadius: '50%',
                          width: '24px',
                          height: '24px',
                          cursor: 'pointer',
                          fontSize: '14px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                        }}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151' }}>
                After Images {afterImages.length > 0 && `(${afterImages.length} selected)`}
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => handleImageChange('after', e)}
                required={!isEditing && afterImages.length === 0}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  boxSizing: 'border-box',
                  marginBottom: '0.5rem'
                }}
              />
              {afterImages.length > 0 && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))', gap: '0.5rem', marginTop: '0.5rem' }}>
                  {afterImages.map((file, index) => (
                    <div key={index} style={{ position: 'relative' }}>
                      <img
                        src={afterImagePreviews[index]}
                        alt={`After ${index + 1}`}
                        style={{
                          width: '100%',
                          height: '80px',
                          objectFit: 'cover',
                          borderRadius: '4px',
                          border: '1px solid #d1d5db'
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => removeImage('after', index)}
                        style={{
                          position: 'absolute',
                          top: '-8px',
                          right: '-8px',
                          background: '#dc2626',
                          color: 'white',
                          border: 'none',
                          borderRadius: '50%',
                          width: '24px',
                          height: '24px',
                          cursor: 'pointer',
                          fontSize: '14px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                        }}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151' }}>
              Gallery Images {galleryImages.length > 0 && `(${galleryImages.length} selected)`}
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => handleImageChange('gallery', e)}
              required={!isEditing && galleryImages.length === 0}
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '1rem',
                boxSizing: 'border-box',
                marginBottom: '0.5rem'
              }}
            />
            {galleryImages.length > 0 && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))', gap: '0.5rem', marginTop: '0.5rem' }}>
                {galleryImages.map((file, index) => (
                  <div key={index} style={{ position: 'relative' }}>
                    <img
                      src={galleryImagePreviews[index]}
                      alt={`Gallery ${index + 1}`}
                      style={{
                        width: '100%',
                        height: '80px',
                        objectFit: 'cover',
                        borderRadius: '4px',
                        border: '1px solid #d1d5db'
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => removeImage('gallery', index)}
                      style={{
                        position: 'absolute',
                        top: '-8px',
                        right: '-8px',
                        background: '#dc2626',
                        color: 'white',
                        border: 'none',
                        borderRadius: '50%',
                        width: '24px',
                        height: '24px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                      }}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
          <button
            type="button"
            onClick={onClose}
            disabled={uploading}
            style={{
              padding: '0.75rem 1.5rem',
              background: 'white',
              color: '#374151',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              cursor: uploading ? 'not-allowed' : 'pointer',
              fontWeight: '600',
              fontSize: '1rem'
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={uploading}
            style={{
              padding: '0.75rem 1.5rem',
              background: '#d4a017',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: uploading ? 'not-allowed' : 'pointer',
              fontWeight: '600',
              fontSize: '1rem',
              opacity: uploading ? 0.7 : 1
            }}
          >
            {uploading ? 'Uploading...' : (isEditing ? 'Update Project' : 'Add Project')}
          </button>
        </div>
      </form>
    </>
  );

  // If modal mode, wrap in modal overlay
  if (isModal) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '1rem'
      }}>
        <div style={{
          background: '#f8fafc',
          padding: '2rem',
          borderRadius: '12px',
          border: '1px solid #e5e7eb',
          maxWidth: '600px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto'
        }}>
          {formContent}
        </div>
      </div>
    );
  }

  // Otherwise render inline
  return (
    <div style={{
      background: '#f8fafc',
      padding: '2rem',
      borderRadius: '12px',
      marginBottom: '2rem',
      border: '1px solid #e5e7eb'
    }}>
      {formContent}
    </div>
  );
};

export default AdminDashboard;

