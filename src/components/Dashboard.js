import React, { useState, useEffect } from 'react';
import supabase from '../supabaseClient';
import Button from './Button';
import ProjectForm from './ProjectForm';
import theme from '../theme';
import ConfirmDialog from './ConfirmDialog';

const Dashboard = ({ user }) => {
  console.log('Dashboard user:', user);
  const [projects, setProjects] = useState([]);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState({
    isOpen: false,
    projectId: null,
    projectTitle: ''
  });
  const [expandedProject, setExpandedProject] = useState(null);

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

  const handleUpdateProject = async (projectData) => {
    try {
      console.log('Updating project with data:', projectData);
      console.log('Editing project ID:', editingProject.id);
      console.log('User ID:', user.id);

      // Clean up the project data by removing joined tables and keeping only the fields that exist in the projects table
      const cleanProjectData = {
        title: projectData.title,
        description: projectData.description,
        platform_id: projectData.platform_id,
        type_id: projectData.type_id,
        images_url: projectData.images_url,
        date_created: projectData.date_created
      };

      console.log('Cleaned project data:', cleanProjectData);

      const { data, error } = await supabase
        .from('projects')
        .update(cleanProjectData)
        .eq('id', editingProject.id)
        .eq('user_id', user.id)
        .select();

      if (error) {
        console.error('Supabase update error:', error);
        throw error;
      }

      console.log('Update response:', data);
      await fetchProjects();
      setEditingProject(null);
      setShowProjectForm(false);
    } catch (error) {
      console.error('Error updating project:', error.message);
    }
  };

  const handleDeleteProject = async (projectId) => {
    try {
      console.log('Deleting project with ID:', projectId);
      console.log('User ID:', user.id);

      const { data, error } = await supabase
        .from('projects')
        .delete()
        .eq('id', projectId)
        .eq('user_id', user.id)
        .select();

      if (error) {
        console.error('Supabase delete error:', error);
        throw error;
      }

      console.log('Delete response:', data);
      await fetchProjects();
    } catch (error) {
      console.error('Error deleting project:', error.message);
    } finally {
      setDeleteDialog({ isOpen: false, projectId: null, projectTitle: '' });
    }
  };

  const openDeleteDialog = (project) => {
    console.log("Opening delete dialog for project:", project.title);
    setDeleteDialog({
      isOpen: true,
      projectId: project.id,
      projectTitle: project.title
    });
  };

  const closeDeleteDialog = () => {
    console.log("Closing delete dialog");
    setDeleteDialog({ isOpen: false, projectId: null, projectTitle: '' });
  };

  const handleProjectClick = (project) => {
    setExpandedProject(project);
  };

  const closeExpandedProject = () => {
    setExpandedProject(null);
  };

  return (
    <div style={styles.container}>
      <ConfirmDialog
        isOpen={deleteDialog.isOpen}
        onClose={closeDeleteDialog}
        onConfirm={() => handleDeleteProject(deleteDialog.projectId)}
        title="Delete Project"
        message={`Are you sure you want to delete "${deleteDialog.projectTitle}"? This action cannot be undone. 🎨`}
      />

      {expandedProject && (
        <div style={styles.expandedOverlay} onClick={closeExpandedProject}>
          <div style={styles.expandedContent} onClick={e => e.stopPropagation()}>
            <button style={styles.closeButton} onClick={closeExpandedProject}>×</button>
            {expandedProject.images_url && (
              <div style={styles.expandedImageContainer}>
                <img 
                  src={expandedProject.images_url} 
                  alt={expandedProject.title}
                  style={styles.expandedImage}
                />
              </div>
            )}
            <div style={styles.expandedDetails}>
              <h2 style={styles.expandedTitle}>{expandedProject.title}</h2>
              <div style={styles.expandedMeta}>
                {expandedProject.type?.name && (
                  <span style={styles.badge}>{expandedProject.type.name}</span>
                )}
                {expandedProject.platforms?.name && (
                  <span style={styles.badge}>{expandedProject.platforms.name}</span>
                )}
                {expandedProject.date_created && (
                  <span style={styles.date}>
                    {new Date(expandedProject.date_created).toLocaleDateString()}
                  </span>
                )}
              </div>
              <p style={styles.expandedDescription}>
                {expandedProject.description || 'No description provided'}
              </p>
              <div style={styles.expandedActions}>
                <button
                  onClick={() => {
                    setEditingProject(expandedProject);
                    setShowProjectForm(true);
                    closeExpandedProject();
                  }}
                  style={styles.actionButton}
                >
                  <span style={styles.buttonIcon}>✏️</span>
                  Edit
                </button>
                <button
                  onClick={() => {
                    openDeleteDialog(expandedProject);
                    closeExpandedProject();
                  }}
                  style={{ ...styles.actionButton, ...styles.dangerButton }}
                >
                  <span style={styles.buttonIcon}>🗑️</span>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div style={styles.projectsContainer}>
        <div style={styles.projectsHeader}>
          <div style={styles.headerContent}>
            <h3 style={styles.projectsTitle}>✨ My Projects ✨</h3>
            <p style={styles.subtitle}>Manage your creative portfolio</p>
          </div>
          <Button
            onClick={() => {
              setEditingProject(null);
              setShowProjectForm(!showProjectForm);
            }}
            variant="primary"
          >
            {showProjectForm ? 'Cancel' : '✨ New Project'}
          </Button>
        </div>

        {showProjectForm && (
          <div style={styles.formContainer}>
            <ProjectForm 
              onSubmit={editingProject ? handleUpdateProject : handleCreateProject}
              initialValues={editingProject || {
                title: '',
                description: '',
                platform_id: '',
                type_id: '',
                images_url: '',
                date_created: new Date().toISOString().split('T')[0]
              }}
            />
          </div>
        )}

        {projects.length === 0 && !showProjectForm ? (
          <div style={styles.emptyState}>
            <div style={styles.emptyStateIcon}>🎨</div>
            <p style={styles.emptyStateText}>No projects yet. Start by creating your first project!</p>
            <p style={styles.emptyStateSubtext}>Let your creativity shine ✨</p>
          </div>
        ) : (
          <div style={styles.projectsGrid}>
            {projects.map((project) => (
              <div 
                key={project.id}
                style={styles.projectCard}
                onClick={() => handleProjectClick(project)}
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
                  <div style={styles.projectActions}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingProject(project);
                        setShowProjectForm(true);
                      }}
                      style={styles.actionButton}
                    >
                      <span style={styles.buttonIcon}>✏️</span>
                      Edit
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openDeleteDialog(project);
                      }}
                      style={{ ...styles.actionButton, ...styles.dangerButton }}
                    >
                      <span style={styles.buttonIcon}>🗑️</span>
                      Delete
                    </button>
                  </div>
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
    padding: '80px 24px 24px',
    maxWidth: '1200px',
    margin: '0 auto',
    '@media (max-width: 768px)': {
      padding: '80px 16px 16px'
    }
  },
  projectsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  },
  projectsHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    '@media (max-width: 768px)': {
      flexDirection: 'column',
      gap: '16px',
      textAlign: 'center'
    }
  },
  headerContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  projectsTitle: {
    fontSize: '32px',
    color: theme.colors.text,
    margin: 0,
    fontFamily: "'Fredericka the Great', cursive",
    '@media (max-width: 768px)': {
      fontSize: '28px'
    }
  },
  subtitle: {
    fontSize: '16px',
    color: theme.colors.textLight,
    margin: 0,
    '@media (max-width: 768px)': {
      fontSize: '14px'
    }
  },
  formContainer: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.medium,
    padding: '24px',
    boxShadow: theme.shadows.medium,
    '@media (max-width: 768px)': {
      padding: '16px'
    }
  },
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '48px 24px',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.medium,
    boxShadow: theme.shadows.medium,
    textAlign: 'center',
    '@media (max-width: 768px)': {
      padding: '32px 16px'
    }
  },
  emptyStateIcon: {
    fontSize: '48px',
    marginBottom: '16px'
  },
  emptyStateText: {
    fontSize: '18px',
    color: theme.colors.text,
    margin: '0 0 8px 0',
    '@media (max-width: 768px)': {
      fontSize: '16px'
    }
  },
  emptyStateSubtext: {
    fontSize: '14px',
    color: theme.colors.textLight,
    margin: 0,
    '@media (max-width: 768px)': {
      fontSize: '12px'
    }
  },
  projectsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '24px',
    '@media (max-width: 768px)': {
      gridTemplateColumns: '1fr',
      gap: '16px'
    }
  },
  projectCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.medium,
    overflow: 'hidden',
    boxShadow: theme.shadows.medium,
    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
    ':hover': {
      transform: 'translateY(-4px)',
      boxShadow: theme.shadows.large
    }
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    paddingTop: '56.25%', // 16:9 aspect ratio
    overflow: 'hidden'
  },
  projectImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.1) 100%)'
  },
  projectContent: {
    padding: '16px',
    '@media (max-width: 768px)': {
      padding: '12px'
    }
  },
  projectTitle: {
    fontSize: '22px',
    color: theme.colors.text,
    margin: '0 0 12px 0',
    fontFamily: "'Fredericka the Great', cursive",
    '@media (max-width: 768px)': {
      fontSize: '20px'
    }
  },
  projectMeta: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    marginBottom: '12px'
  },
  badge: {
    backgroundColor: theme.colors.badge.bg,
    color: theme.colors.badge.text,
    padding: '4px 8px',
    borderRadius: theme.borderRadius.small,
    fontSize: '12px',
    fontWeight: '500'
  },
  date: {
    color: theme.colors.textLight,
    fontSize: '12px'
  },
  projectDescription: {
    fontSize: '14px',
    color: theme.colors.textLight,
    margin: '0 0 16px 0',
    lineHeight: '1.5',
    '@media (max-width: 768px)': {
      fontSize: '12px'
    }
  },
  projectActions: {
    display: 'flex',
    gap: '8px',
    '@media (max-width: 768px)': {
      flexDirection: 'column'
    }
  },
  actionButton: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    padding: '8px 16px',
    borderRadius: theme.borderRadius.small,
    fontSize: '14px',
    fontWeight: '500',
    border: 'none',
    cursor: 'pointer',
    backgroundColor: 'rgba(255, 182, 193, 0.1)',
    color: theme.colors.primary,
    transition: 'all 0.3s ease-in-out',
    '@media (max-width: 768px)': {
      width: '100%'
    }
  },
  dangerButton: {
    backgroundColor: 'rgba(255, 99, 71, 0.1)',
    color: '#ff6347',
    boxShadow: '0 2px 8px rgba(255, 99, 71, 0.2)',
    ':hover': {
      backgroundColor: 'rgba(255, 99, 71, 0.2)',
      boxShadow: '0 4px 12px rgba(255, 99, 71, 0.3)'
    },
    ':active': {
      boxShadow: '0 2px 4px rgba(255, 99, 71, 0.1)'
    }
  },
  buttonIcon: {
    fontSize: '14px',
    transition: 'transform 0.3s ease-in-out',
    display: 'inline-block'
  },
  expandedOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    padding: '20px',
    '@media (max-width: 768px)': {
      padding: '16px'
    }
  },
  expandedContent: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.large,
    maxWidth: '800px',
    width: '100%',
    maxHeight: '90vh',
    overflow: 'auto',
    position: 'relative',
    boxShadow: theme.shadows.large,
    '@media (max-width: 768px)': {
      maxHeight: '95vh',
      borderRadius: theme.borderRadius.medium
    }
  },
  closeButton: {
    position: 'absolute',
    top: '16px',
    right: '16px',
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    border: 'none',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    color: theme.colors.text,
    fontSize: '24px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    transition: 'all 0.3s ease-in-out',
    '@media (max-width: 768px)': {
      top: '12px',
      right: '12px',
      width: '28px',
      height: '28px',
      fontSize: '20px'
    },
    ':hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
      transform: 'rotate(90deg)'
    }
  },
  expandedImageContainer: {
    width: '100%',
    height: '400px',
    overflow: 'hidden',
    borderTopLeftRadius: theme.borderRadius.large,
    borderTopRightRadius: theme.borderRadius.large,
    '@media (max-width: 768px)': {
      height: '300px',
      borderTopLeftRadius: theme.borderRadius.medium,
      borderTopRightRadius: theme.borderRadius.medium
    }
  },
  expandedImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  expandedDetails: {
    padding: '24px',
    '@media (max-width: 768px)': {
      padding: '16px'
    }
  },
  expandedTitle: {
    fontSize: '36px',
    color: theme.colors.text,
    margin: '0 0 16px 0',
    fontFamily: "'Fredericka the Great', cursive",
    '@media (max-width: 768px)': {
      fontSize: '32px',
      margin: '0 0 12px 0'
    }
  },
  expandedMeta: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    marginBottom: '16px',
    '@media (max-width: 768px)': {
      marginBottom: '12px'
    }
  },
  expandedDescription: {
    fontSize: '16px',
    lineHeight: '1.6',
    color: theme.colors.text,
    margin: '0 0 24px 0',
    '@media (max-width: 768px)': {
      fontSize: '14px',
      margin: '0 0 16px 0'
    }
  },
  expandedActions: {
    display: 'flex',
    gap: '12px',
    '@media (max-width: 768px)': {
      flexDirection: 'column',
      gap: '8px'
    }
  }
};

export default Dashboard; 