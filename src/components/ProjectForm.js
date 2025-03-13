import React, { useState, useEffect } from 'react';
import useForm from '../hooks/useForm';
import Button from './Button';
import supabase from '../supabaseClient';
import theme from '../theme';

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
    console.log('ProjectForm initialValues:', initialValues);
    console.log('ProjectForm current values:', values);
  }, [initialValues, values]);

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

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted with values:', values);
    onSubmit(values);
  };

  return (
    <form onSubmit={handleFormSubmit} style={styles.form}>
      <div style={styles.formHeader}>
        <h2 style={styles.formTitle}>
          {initialValues.id ? '✨ Edit Project ✨' : '✨ Create New Project ✨'}
        </h2>
        <p style={styles.formSubtitle}>
          {initialValues.id ? 'Update your project details' : 'Add a new project to your portfolio'}
        </p>
      </div>

      <div style={styles.formGroup}>
        <label htmlFor="title" style={styles.label}>Project Title *</label>
        <input
          type="text"
          id="title"
          name="title"
          value={values.title}
          onChange={handleChange}
          style={styles.input}
          placeholder="Enter a creative title"
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
          placeholder="Tell us about your project..."
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
          {initialValues.id ? '✨ Update Project' : '✨ Create Project'}
        </Button>
      </div>
    </form>
  );
};

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    maxWidth: '500px',
    margin: '0 auto',
    padding: '20px',
    '@media (max-width: 768px)': {
      padding: '16px',
      gap: '20px'
    }
  },
  formHeader: {
    textAlign: 'center',
    marginBottom: '10px',
    '@media (max-width: 768px)': {
      marginBottom: '8px'
    }
  },
  formTitle: {
    fontSize: '24px',
    color: theme.colors.primary,
    margin: '0 0 8px 0',
    fontWeight: '600',
    '@media (max-width: 768px)': {
      fontSize: '20px',
      margin: '0 0 6px 0'
    }
  },
  formSubtitle: {
    fontSize: '14px',
    color: theme.colors.textLight,
    margin: 0,
    '@media (max-width: 768px)': {
      fontSize: '12px'
    }
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    '@media (max-width: 768px)': {
      gap: '6px'
    }
  },
  label: {
    fontSize: '0.875rem',
    fontWeight: '500',
    color: theme.colors.text,
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    '@media (max-width: 768px)': {
      fontSize: '0.8125rem'
    }
  },
  input: {
    padding: '12px 16px',
    borderRadius: '12px',
    border: '2px solid rgba(255, 182, 193, 0.3)',
    fontSize: '1rem',
    width: '100%',
    boxSizing: 'border-box',
    backgroundColor: 'rgba(255, 182, 193, 0.05)',
    transition: 'all 0.3s ease-in-out',
    '@media (max-width: 768px)': {
      padding: '10px 14px',
      fontSize: '0.875rem',
      borderRadius: '10px'
    },
    ':focus': {
      outline: 'none',
      borderColor: theme.colors.primary,
      boxShadow: '0 0 0 3px rgba(255, 165, 192, 0.2)'
    }
  },
  buttonGroup: {
    marginTop: '10px',
    display: 'flex',
    justifyContent: 'center',
    '@media (max-width: 768px)': {
      marginTop: '8px'
    }
  },
};

export default ProjectForm; 