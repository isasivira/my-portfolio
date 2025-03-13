import React, { useState } from 'react';
import supabase from '../supabaseClient';
import theme from '../theme';
import ConfirmDialog from './ConfirmDialog';

const ProjectsList = ({ projects, fetchProjects }) => {
  const [editingProject, setEditingProject] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [deleteDialog, setDeleteDialog] = useState({
    isOpen: false,
    projectId: null,
    projectTitle: ''
  });

  const handleUpdate = async (projectId) => {
    const { error } = await supabase
      .from("projects")
      .update({ 
        title: newTitle,
        description: newDescription 
      })
      .eq("id", projectId);

    if (error) {
      console.error("Error updating project:", error.message);
    } else {
      console.log("Project updated successfully ✨");
      setEditingProject(null);
      setNewTitle("");
      setNewDescription("");
      fetchProjects();
    }
  };

  const handleDelete = async (projectId) => {
    try {
      const { error } = await supabase.from("projects").delete().eq("id", projectId);

      if (error) {
        console.error("Error deleting project:", error.message);
      } else {
        console.log("Project deleted successfully ✨");
        fetchProjects();
      }
    } catch (error) {
      console.error("Error deleting project:", error);
    } finally {
      setDeleteDialog({ isOpen: false, projectId: null, projectTitle: '' });
    }
  };

  const startEditing = (project) => {
    setEditingProject(project.id);
    setNewTitle(project.title);
    setNewDescription(project.description || "");
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

  return (
    <div style={styles.container}>
      <ConfirmDialog
        isOpen={deleteDialog.isOpen}
        onClose={closeDeleteDialog}
        onConfirm={() => handleDelete(deleteDialog.projectId)}
        title="Delete Project"
        message={`Are you sure you want to delete "${deleteDialog.projectTitle}"? This action cannot be undone. 🎨`}
      />
      {projects.length === 0 ? (
        <div style={styles.emptyState}>
          <div style={styles.emptyStateIcon}>🎨</div>
          <p style={styles.emptyStateText}>No projects found</p>
          <p style={styles.emptyStateSubtext}>Start creating your projects! ✨</p>
        </div>
      ) : (
        <div style={styles.projectsGrid}>
          {projects.map((project) => (
            <div key={project.id} style={styles.projectCard}>
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
                {editingProject === project.id ? (
                  <div style={styles.editForm}>
                    <input
                      type="text"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      placeholder="Project Title"
                      style={styles.input}
                    />
                    <textarea
                      value={newDescription}
                      onChange={(e) => setNewDescription(e.target.value)}
                      placeholder="Project Description"
                      style={styles.textarea}
                    />
                    <div style={styles.editActions}>
                      <button
                        onClick={() => handleUpdate(project.id)}
                        style={styles.saveButton}
                      >
                        <span style={styles.buttonIcon}>💾</span>
                        Save
                      </button>
                      <button
                        onClick={() => {
                          setEditingProject(null);
                          setNewTitle("");
                          setNewDescription("");
                        }}
                        style={styles.cancelButton}
                      >
                        <span style={styles.buttonIcon}>❌</span>
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h3 style={styles.projectTitle}>{project.title}</h3>
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
                        onClick={() => startEditing(project)}
                        style={styles.editButton}
                      >
                        <span style={styles.buttonIcon}>✏️</span>
                        Edit
                      </button>
                      <button
                        onClick={() => openDeleteDialog(project)}
                        style={styles.deleteButton}
                      >
                        <span style={styles.buttonIcon}>🗑️</span>
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto'
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
  editForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  input: {
    padding: '8px 12px',
    borderRadius: '8px',
    border: '1px solid rgba(255, 182, 193, 0.3)',
    fontSize: '16px',
    color: theme.colors.text,
    backgroundColor: 'rgba(255, 182, 193, 0.05)',
    transition: 'all 0.2s ease-in-out',
    ':focus': {
      outline: 'none',
      borderColor: theme.colors.primary,
      boxShadow: '0 0 0 2px rgba(255, 182, 193, 0.2)'
    }
  },
  textarea: {
    padding: '8px 12px',
    borderRadius: '8px',
    border: '1px solid rgba(255, 182, 193, 0.3)',
    fontSize: '14px',
    color: theme.colors.text,
    backgroundColor: 'rgba(255, 182, 193, 0.05)',
    minHeight: '100px',
    resize: 'vertical',
    transition: 'all 0.2s ease-in-out',
    ':focus': {
      outline: 'none',
      borderColor: theme.colors.primary,
      boxShadow: '0 0 0 2px rgba(255, 182, 193, 0.2)'
    }
  },
  editActions: {
    display: 'flex',
    gap: '8px',
    justifyContent: 'flex-end'
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
    lineHeight: '1.6',
    marginBottom: '20px'
  },
  projectActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '8px',
    marginTop: '16px'
  },
  editButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '6px 12px',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: '500',
    border: 'none',
    cursor: 'pointer',
    backgroundColor: 'rgba(255, 182, 193, 0.1)',
    color: theme.colors.primary,
    transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    boxShadow: '0 2px 8px rgba(255, 182, 193, 0.2)',
    ':hover': {
      backgroundColor: 'rgba(255, 182, 193, 0.2)',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 12px rgba(255, 182, 193, 0.3)',
      '& span': {
        transform: 'scale(1.1)'
      }
    },
    ':active': {
      transform: 'translateY(0)',
      boxShadow: '0 2px 4px rgba(255, 182, 193, 0.1)'
    }
  },
  saveButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '6px 12px',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: '500',
    border: 'none',
    cursor: 'pointer',
    backgroundColor: 'rgba(144, 238, 144, 0.1)',
    color: '#2e8b57',
    transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    boxShadow: '0 2px 8px rgba(144, 238, 144, 0.2)',
    ':hover': {
      backgroundColor: 'rgba(144, 238, 144, 0.2)',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 12px rgba(144, 238, 144, 0.3)',
      '& span': {
        transform: 'scale(1.1)'
      }
    },
    ':active': {
      transform: 'translateY(0)',
      boxShadow: '0 2px 4px rgba(144, 238, 144, 0.1)'
    }
  },
  cancelButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '6px 12px',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: '500',
    border: 'none',
    cursor: 'pointer',
    backgroundColor: 'rgba(255, 99, 71, 0.1)',
    color: '#ff6347',
    transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    boxShadow: '0 2px 8px rgba(255, 99, 71, 0.2)',
    ':hover': {
      backgroundColor: 'rgba(255, 99, 71, 0.2)',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 12px rgba(255, 99, 71, 0.3)',
      '& span': {
        transform: 'scale(1.1)'
      }
    },
    ':active': {
      transform: 'translateY(0)',
      boxShadow: '0 2px 4px rgba(255, 99, 71, 0.1)'
    }
  },
  deleteButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '6px 12px',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: '500',
    border: 'none',
    cursor: 'pointer',
    backgroundColor: 'rgba(255, 99, 71, 0.1)',
    color: '#ff6347',
    transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    boxShadow: '0 2px 8px rgba(255, 99, 71, 0.2)',
    ':hover': {
      backgroundColor: 'rgba(255, 99, 71, 0.2)',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 12px rgba(255, 99, 71, 0.3)',
      '& span': {
        transform: 'scale(1.1)'
      }
    },
    ':active': {
      transform: 'translateY(0)',
      boxShadow: '0 2px 4px rgba(255, 99, 71, 0.1)'
    }
  },
  buttonIcon: {
    fontSize: '14px',
    transition: 'transform 0.3s ease-in-out',
    display: 'inline-block'
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

export default ProjectsList; 