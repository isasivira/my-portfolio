import React, { useState, useEffect } from 'react';
import useForm from '../hooks/useForm';
import Button from './Button';
import supabase from '../supabaseClient';
// import theme from '../theme'; // Remove theme import as styles are now in CSS
import './ProjectForm.css';

const ProjectForm = ({ onSubmit, initialValues = {
  title: '',
  description: '',
  platform_id: '',
  type_id: '',
  images_url: [],
  date_created: new Date().toISOString().split('T')[0]
} }) => {
  const [platforms, setPlatforms] = useState([]);
  const [types, setTypes] = useState([]);
  const [images, setImages] = useState(initialValues.images_url || []);
  const { values, handleChange, handleSubmit } = useForm(initialValues);

  useEffect(() => {
    console.log('ProjectForm initialValues:', initialValues);
    console.log('ProjectForm current values:', values);
  }, [initialValues, values]);

  useEffect(() => {
    setImages(initialValues.images_url || []);
    // eslint-disable-next-line
  }, [initialValues.id]);

  useEffect(() => {
    const fetchOptions = async () => {
      const { data: platformsData, error: platformsError } = await supabase
        .from('platforms')
        .select('*');
      
      if (platformsError) {
        console.error('Error fetching platforms:', platformsError);
      } else {
        setPlatforms(platformsData || []);
      }

      const { data: typesData, error: typesError } = await supabase
        .from('type')
        .select('*');
      
      if (typesError) {
        console.error('Error fetching types:', typesError);
      } else {
        setTypes(typesData || []);
      }
    };

    fetchOptions();
  }, []);

  const handleImageChange = (idx, value) => {
    const newImages = [...images];
    newImages[idx] = value;
    setImages(newImages);
  };

  const handleAddImage = () => setImages([...images, '']);
  const handleRemoveImage = (idx) => setImages(images.filter((_, i) => i !== idx));

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted with values:', values);
    onSubmit({ ...values, images_url: images.filter(Boolean) });
  };

  return (
    <form onSubmit={handleFormSubmit} className="project-form">
      <div className="form-header">
        <h2 className="form-title">
          {initialValues.id ? '✨ Edit Project ✨' : '✨ Create New Project ✨'}
        </h2>
        <p className="form-subtitle">
          {initialValues.id ? 'Update your project details' : 'Add a new project to your portfolio'}
        </p>
      </div>

      <div className="form-group">
        <label htmlFor="title" className="label">Project Title *</label>
        <input
          type="text"
          id="title"
          name="title"
          value={values.title}
          onChange={handleChange}
          className="input"
          placeholder="Enter a creative title"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="description" className="label">Description</label>
        <textarea
          id="description"
          name="description"
          value={values.description}
          onChange={handleChange}
          className="input textarea"
          placeholder="Tell us about your project..."
        />
      </div>

      <div className="form-group">
        <label htmlFor="platform_id" className="label">Platform</label>
        <select
          id="platform_id"
          name="platform_id"
          value={values.platform_id}
          onChange={handleChange}
          className="input"
        >
          <option value="">Select Platform</option>
          {platforms && platforms.length > 0 ? (
            platforms.map(platform => (
              <option key={platform.id} value={platform.id}>
                {platform.name}
              </option>
            ))
          ) : (
            <option value="" disabled>Loading platforms...</option>
          )}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="type_id" className="label">Type</label>
        <select
          id="type_id"
          name="type_id"
          value={values.type_id}
          onChange={handleChange}
          className="input"
        >
          <option value="">Select Type</option>
          {types && types.length > 0 ? (
            types.map(type => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))
          ) : (
            <option value="" disabled>Loading types...</option>
          )}
        </select>
      </div>

      <div className="form-group">
        <label className="label">Image URLs</label>
        {images.map((img, idx) => (
          <div key={idx} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
            <input
              type="url"
              value={img}
              onChange={e => handleImageChange(idx, e.target.value)}
              className="input"
              placeholder="https://example.com/image.jpg"
              required
            />
            <button type="button" onClick={() => handleRemoveImage(idx)} style={{ color: 'red' }}>✕</button>
          </div>
        ))}
        <Button type="button" onClick={handleAddImage} variant="secondary">Add Image</Button>
      </div>

      <div className="form-group">
        <label htmlFor="date_created" className="label">Date Created</label>
        <input
          type="date"
          id="date_created"
          name="date_created"
          value={values.date_created}
          onChange={handleChange}
          className="input"
        />
      </div>

      <div className="button-group">
        <Button type="submit" variant="primary">
          {initialValues.id ? '✨ Update Project' : '✨ Create Project'}
        </Button>
      </div>
    </form>
  );
};

export default ProjectForm; 