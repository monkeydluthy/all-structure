import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../config/supabaseConfig';
import AnalyticsWidget from '../components/AnalyticsWidget';

const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
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
    <div>
      <div style={{ 
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
            <h1 style={{ margin: 0 }}>Admin Dashboard</h1>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <span>Welcome, {user?.email}</span>
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
                <div style={{ 
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
                  />
                )}

                {/* Projects List */}
                <ProjectsList />
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
const ProjectsList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState({ show: false, projectId: null });

  useEffect(() => {
    fetchProjects();
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
            <div style={{ flex: 1 }}>
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
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
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
const AddProjectForm = ({ onClose, onSuccess, onError }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    service: 'Remodeling',
    location: '',
    is_before_after: false
  });
  const [beforeImage, setBeforeImage] = useState(null);
  const [afterImage, setAfterImage] = useState(null);
  const [galleryImage, setGalleryImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const services = ['Remodeling', 'Restoration', 'Roofing', 'Painting', 'Tile', 'Maintenance'];

  const handleImageChange = (type, e) => {
    const file = e.target.files[0];
    if (file) {
      if (type === 'before') setBeforeImage(file);
      if (type === 'after') setAfterImage(file);
      if (type === 'gallery') setGalleryImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      // Create project in database
      const { data: project, error: projectError } = await supabase
        .from('projects')
        .insert([formData])
        .select()
        .single();

      if (projectError) throw projectError;

      // Upload images if provided
      const imageUploads = [];

      if (formData.is_before_after) {
        if (beforeImage) {
          const beforeUrl = await uploadImage(beforeImage, `before-${Date.now()}`);
          imageUploads.push({ project_id: project.id, image_url: beforeUrl, image_type: 'before', display_order: 1 });
        }
        if (afterImage) {
          const afterUrl = await uploadImage(afterImage, `after-${Date.now()}`);
          imageUploads.push({ project_id: project.id, image_url: afterUrl, image_type: 'after', display_order: 2 });
        }
      } else {
        if (galleryImage) {
          const galleryUrl = await uploadImage(galleryImage, `gallery-${Date.now()}`);
          imageUploads.push({ project_id: project.id, image_url: galleryUrl, image_type: 'gallery', display_order: 1 });
        }
      }

      // Insert image records
      if (imageUploads.length > 0) {
        const { error: imagesError } = await supabase
          .from('project_images')
          .insert(imageUploads);

        if (imagesError) throw imagesError;
      }

      // Reset form and close
      setFormData({
        title: '',
        description: '',
        service: 'Remodeling',
        location: '',
        is_before_after: false
      });
      setBeforeImage(null);
      setAfterImage(null);
      setGalleryImage(null);
      onSuccess('Project added successfully!');
    } catch (error) {
      console.error('Error adding project:', error);
      onError('Failed to add project: ' + error.message);
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

  return (
    <div style={{
      background: '#f8fafc',
      padding: '2rem',
      borderRadius: '12px',
      marginBottom: '2rem',
      border: '1px solid #e5e7eb'
    }}>
      <h3 style={{ marginBottom: '1.5rem', color: '#1f2937' }}>
        Add New Project
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
                Before Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange('before', e)}
                required
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  boxSizing: 'border-box'
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151' }}>
                After Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange('after', e)}
                required
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  boxSizing: 'border-box'
                }}
              />
            </div>
          </div>
        ) : (
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151' }}>
              Gallery Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange('gallery', e)}
              required
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '1rem',
                boxSizing: 'border-box'
              }}
            />
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
            {uploading ? 'Uploading...' : 'Add Project'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminDashboard;

