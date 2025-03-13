import React, { useState, useEffect } from 'react';
import supabase from '../supabaseClient';

const PublicProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select(`
          *,
          platforms (
            id,
            name
          ),
          type (
            id,
            name
          )
        `)
        .order('date_created', { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        Loading...
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>All Projects</h1>
      <div style={styles.projectsGrid}>
        {projects.map((project) => (
          <div 
            key={project.id}
            style={styles.projectCard}
          >
            {project.images_url && (
              <img 
                src={project.images_url} 
                alt={project.title}
                style={styles.projectImage}
              />
            )}
            <div style={styles.projectContent}>
              <h4 style={styles.projectTitle}>{project.title}</h4>
              <div style={styles.projectMeta}>
                {project.type?.name && (
                  <span style={styles.badge}>{project.type.name}</span>
                )}
                {project.platforms?.name && (
                  <span style={styles.badge}>{project.platforms.name}</span>
                )}
                {project.date_created && (
                  <span style={styles.date}>
                    {new Date(project.date_created).toLocaleDateString()}
                  </span>
                )}
              </div>
              <p style={styles.projectDescription}>
                {project.description || 'No description provided'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh'
  },
  container: {
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  title: {
    marginBottom: '30px',
    color: '#1a202c',
    textAlign: 'center'
  },
  projectsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px',
    marginTop: '20px'
  },
  projectCard: {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    transition: 'transform 0.2s ease-in-out',
    ':hover': {
      transform: 'translateY(-4px)'
    }
  },
  projectImage: {
    width: '100%',
    height: '200px',
    objectFit: 'cover'
  },
  projectContent: {
    padding: '20px'
  },
  projectTitle: {
    margin: '0 0 10px 0',
    color: '#2d3748',
    fontSize: '1.25rem'
  },
  projectMeta: {
    display: 'flex',
    gap: '8px',
    marginBottom: '12px',
    flexWrap: 'wrap'
  },
  badge: {
    backgroundColor: '#e2e8f0',
    color: '#475569',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '0.75rem'
  },
  date: {
    color: '#64748b',
    fontSize: '0.75rem'
  },
  projectDescription: {
    margin: '0',
    color: '#4a5568',
    fontSize: '0.9rem',
    lineHeight: '1.5'
  }
};

export default PublicProjects; 