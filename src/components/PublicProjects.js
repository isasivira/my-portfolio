import React, { useState, useEffect } from 'react';
import supabase from '../supabaseClient';
import theme from '../theme';

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
        <div style={styles.loadingSpinner}>✨ Loading Projects ✨</div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.projectsContainer}>
        <div style={styles.projectsHeader}>
          <div style={styles.headerContent}>
            <h1 style={styles.title}>✨ Creative Projects ✨</h1>
            <p style={styles.subtitle}>Explore amazing works from talented creators</p>
          </div>
        </div>

        {projects.length === 0 ? (
          <div style={styles.emptyState}>
            <div style={styles.emptyStateIcon}>🎨</div>
            <p style={styles.emptyStateText}>No projects available yet</p>
            <p style={styles.emptyStateSubtext}>Check back later for amazing creations ✨</p>
          </div>
        ) : (
          <div style={styles.projectsGrid}>
            {projects.map((project) => (
              <div 
                key={project.id}
                style={styles.projectCard}
              >
                {project.images_url && (
                  <div style={styles.imageContainer}>
                    <img 
                      src={project.images_url} 
                      alt={project.title}
                      style={styles.projectImage}
                    />
                    <div style={styles.imageOverlay}></div>
                  </div>
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
        )}
      </div>
    </div>
  );
};

const styles = {
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: 'rgba(255, 182, 193, 0.05)'
  },
  loadingSpinner: {
    fontSize: '1.5rem',
    color: theme.colors.primary,
    animation: 'pulse 1.5s infinite'
  },
  container: {
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  projectsContainer: {
    backgroundColor: '#ffffff',
    borderRadius: '20px',
    padding: '30px',
    boxShadow: '0 4px 20px rgba(255, 182, 193, 0.15)',
    border: '1px solid rgba(255, 182, 193, 0.2)'
  },
  projectsHeader: {
    textAlign: 'center',
    marginBottom: '40px',
    paddingBottom: '20px',
    borderBottom: '2px solid rgba(255, 182, 193, 0.2)'
  },
  headerContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  title: {
    margin: 0,
    fontSize: '32px',
    color: theme.colors.primary,
    fontWeight: '600'
  },
  subtitle: {
    margin: 0,
    color: theme.colors.textLight,
    fontSize: '16px'
  },
  projectsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '24px',
    marginTop: '20px'
  },
  projectCard: {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    overflow: 'hidden',
    border: '1px solid rgba(255, 182, 193, 0.2)',
    boxShadow: '0 4px 12px rgba(255, 182, 193, 0.1)',
    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
    ':hover': {
      transform: 'translateY(-4px)',
      boxShadow: '0 8px 24px rgba(255, 182, 193, 0.2)'
    }
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: '200px',
    overflow: 'hidden'
  },
  projectImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.3s ease-in-out'
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.1) 100%)'
  },
  projectContent: {
    padding: '20px'
  },
  projectTitle: {
    margin: '0 0 12px 0',
    fontSize: '18px',
    color: theme.colors.text,
    fontWeight: '600'
  },
  projectMeta: {
    display: 'flex',
    gap: '8px',
    marginBottom: '12px',
    flexWrap: 'wrap'
  },
  badge: {
    backgroundColor: theme.colors.badge.bg,
    color: theme.colors.badge.text,
    padding: '4px 12px',
    borderRadius: '12px',
    fontSize: '0.75rem',
    fontWeight: '500'
  },
  date: {
    color: theme.colors.textLight,
    fontSize: '0.75rem',
    display: 'flex',
    alignItems: 'center',
    gap: '4px'
  },
  projectDescription: {
    margin: '0',
    color: theme.colors.text,
    fontSize: '0.9em',
    lineHeight: '1.6'
  },
  emptyState: {
    textAlign: 'center',
    padding: '40px 20px',
    backgroundColor: 'rgba(255, 182, 193, 0.05)',
    borderRadius: '16px',
    border: '2px dashed rgba(255, 182, 193, 0.3)'
  },
  emptyStateIcon: {
    fontSize: '48px',
    marginBottom: '16px'
  },
  emptyStateText: {
    fontSize: '18px',
    color: theme.colors.text,
    margin: '0 0 8px 0'
  },
  emptyStateSubtext: {
    fontSize: '14px',
    color: theme.colors.textLight,
    margin: 0
  }
};

export default PublicProjects; 