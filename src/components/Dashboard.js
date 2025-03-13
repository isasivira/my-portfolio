import React, { useState, useEffect } from 'react';
import supabase from '../supabaseClient';
import Button from './Button';
import ProjectForm from './ProjectForm';

const Dashboard = ({ user }) => {
  const [projects, setProjects] = useState([]);
  const [showProjectForm, setShowProjectForm] = useState(false);

  useEffect(() => {
    if (user) {
      fetchProjects();
    }
  }, [user]);

  const fetchProjects = async () => {
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
      .eq('user_id', user.id)
      .order('date_created', { ascending: false });

    if (error) {
      console.error('Error fetching projects:', error);
    } else {
      setProjects(data || []);
    }
  };

  const handleCreateProject = async (projectData) => {
    try {
      const { error } = await supabase
        .from('projects')
        .insert([
          { 
            ...projectData,
            user_id: user.id,
            date_created: projectData.date_created || new Date().toISOString().split('T')[0]
          }
        ]);

      if (error) throw error;

      await fetchProjects();
      setShowProjectForm(false);
    } catch (error) {
      console.error('Error creating project:', error.message);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.projectsContainer}>
        <div style={styles.projectsHeader}>
          <h3 style={styles.projectsTitle}>Your Projects</h3>
          <Button
            onClick={() => setShowProjectForm(!showProjectForm)}
            variant="primary"
          >
            {showProjectForm ? 'Cancel' : 'New Project'}
          </Button>
        </div>

        {showProjectForm && (
          <div style={styles.formContainer}>
            <ProjectForm onSubmit={handleCreateProject} />
          </div>
        )}

        {projects.length === 0 && !showProjectForm ? (
          <p>No projects yet. Start by creating your first project!</p>
        ) : (
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
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  projectsContainer: {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  projectsHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px'
  },
  projectsTitle: {
    marginTop: 0,
    marginBottom: 0
  },
  formContainer: {
    marginBottom: '30px',
    borderBottom: '1px solid #e5e7eb',
    paddingBottom: '30px'
  },
  projectsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px',
    marginTop: '20px'
  },
  projectCard: {
    backgroundColor: '#f8fafc',
    borderRadius: '6px',
    overflow: 'hidden',
    border: '1px solid #e2e8f0'
  },
  projectImage: {
    width: '100%',
    height: '200px',
    objectFit: 'cover'
  },
  projectContent: {
    padding: '15px'
  },
  projectTitle: {
    margin: '0 0 10px 0'
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
    color: '#64748b',
    fontSize: '0.9em',
    lineHeight: '1.5'
  }
};

export default Dashboard; 