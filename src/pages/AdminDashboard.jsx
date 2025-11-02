import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../config/supabaseConfig';

const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
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
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: '2rem'
            }}>
              <h2 style={{ margin: 0, color: '#1f2937' }}>
                Portfolio Management
              </h2>
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
              <AddProjectForm onClose={() => setShowAddForm(false)} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Add Project Form Component
const AddProjectForm = ({ onClose }) => {
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
      onClose();
      alert('Project added successfully!');
    } catch (error) {
      console.error('Error adding project:', error);
      alert('Failed to add project: ' + error.message);
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

