import React, { useState, useEffect } from 'react';
import useForm from '../hooks/useForm';
import Button from './Button';
import supabase from '../supabaseClient';

const ProjectForm = ({ onSubmit, initialValues = {
  title: '',
  description: '',
  platform_id: '',
  type_id: '',
  images_url: '',
  date_created: new Date().toISOString().split('T')[0]
} }) => {
  const [platforms, setPlatforms] = useState([]);
  const [types, setTypes] = useState([]);
  const { values, handleChange, handleSubmit } = useForm(initialValues);

  useEffect(() => {
    // Fetch platforms and types when component mounts
    const fetchOptions = async () => {
      // Fetch platforms
      const { data: platformsData, error: platformsError } = await supabase
        .from('platforms')
        .select('*');
      
      if (platformsError) {
        console.error('Error fetching platforms:', platformsError);
      } else {
        console.log('Fetched platforms:', platformsData);
        setPlatforms(platformsData || []);
      }

      // Fetch types
      const { data: typesData, error: typesError } = await supabase
        .from('type')
        .select('*');
      
      if (typesError) {
        console.error('Error fetching types:', typesError);
      } else {
        console.log('Fetched types:', typesData);
        setTypes(typesData || []);
      }
    };

    fetchOptions();
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
      <div style={styles.formGroup}>
        <label htmlFor="title" style={styles.label}>Project Title *</label>
        <input
          type="text"
          id="title"
          name="title"
          value={values.title}
          onChange={handleChange}
          style={styles.input}
          required
        />
      </div>

      <div style={styles.formGroup}>
        <label htmlFor="description" style={styles.label}>Description</label>
        <textarea
          id="description"
          name="description"
          value={values.description}
          onChange={handleChange}
          style={{ ...styles.input, minHeight: '100px' }}
        />
      </div>

      <div style={styles.formGroup}>
        <label htmlFor="platform_id" style={styles.label}>Platform</label>
        <select
          id="platform_id"
          name="platform_id"
          value={values.platform_id}
          onChange={handleChange}
          style={styles.input}
        >
          <option value="">Select Platform</option>
          {platforms && platforms.length > 0 ? (
            platforms.map(platform => {
              console.log('Rendering platform option:', platform);
              return (
                <option key={platform.id} value={platform.id}>
                  {platform.name}
                </option>
              );
            })
          ) : (
            <option value="" disabled>Loading platforms...</option>
          )}
        </select>
      </div>

      <div style={styles.formGroup}>
        <label htmlFor="type_id" style={styles.label}>Type</label>
        <select
          id="type_id"
          name="type_id"
          value={values.type_id}
          onChange={handleChange}
          style={styles.input}
        >
          <option value="">Select Type</option>
          {types && types.length > 0 ? (
            types.map(type => {
              console.log('Rendering type option:', type);
              return (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              );
            })
          ) : (
            <option value="" disabled>Loading types...</option>
          )}
        </select>
      </div>

      <div style={styles.formGroup}>
        <label htmlFor="images_url" style={styles.label}>Image URL</label>
        <input
          type="url"
          id="images_url"
          name="images_url"
          value={values.images_url}
          onChange={handleChange}
          style={styles.input}
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div style={styles.formGroup}>
        <label htmlFor="date_created" style={styles.label}>Date Created</label>
        <input
          type="date"
          id="date_created"
          name="date_created"
          value={values.date_created}
          onChange={handleChange}
          style={styles.input}
        />
      </div>

      <div style={styles.buttonGroup}>
        <Button type="submit" variant="primary">
          Create Project
        </Button>
      </div>
    </form>
  );
};

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    maxWidth: '500px',
    margin: '0 auto',
    padding: '20px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  label: {
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#374151',
  },
  input: {
    padding: '8px 12px',
    borderRadius: '6px',
    border: '1px solid #d1d5db',
    fontSize: '1rem',
    width: '100%',
    boxSizing: 'border-box',
  },
  buttonGroup: {
    marginTop: '10px',
  },
};

export default ProjectForm; 