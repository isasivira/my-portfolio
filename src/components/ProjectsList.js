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
    padding: theme.spacing.lg,
    maxWidth: '1200px',
    margin: '0 auto',
    fontFamily: theme.fonts.main,
    color: theme.colors.text
  },
  projectsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: theme.spacing.lg,
    marginTop: theme.spacing.lg,
    '@media (max-width: 768px)': {
      gridTemplateColumns: '1fr',
      gap: theme.spacing.md
    }
  },
  projectCard: {
    backgroundColor: theme.colors.cardBg,
    borderRadius: theme.borderRadius.medium,
    overflow: 'hidden',
    border: `1px solid ${theme.colors.border}`,
    boxShadow: theme.shadows.small,
    transition: theme.animation.transition,
    ':hover': {
      transform: 'translateY(-4px)',
      boxShadow: theme.shadows.medium
    }
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: '180px',
    overflow: 'hidden',
    borderTopLeftRadius: theme.borderRadius.medium,
    borderTopRightRadius: theme.borderRadius.medium
  },
  projectImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: theme.animation.transition,
    ':hover': {
      transform: 'scale(1.05)'
    }
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.1) 100%)',
    transition: theme.animation.transition
  },
  projectContent: {
    padding: theme.spacing.md,
    fontFamily: theme.fonts.main
  },
  editForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.md,
    padding: theme.spacing.sm,
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.small,
    border: `1px solid ${theme.colors.border}`
  },
  input: {
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.borderRadius.small,
    border: `1px solid ${theme.colors.border}`,
    fontSize: '16px',
    color: theme.colors.text,
    backgroundColor: theme.colors.white,
    transition: theme.animation.transition,
    fontFamily: theme.fonts.main,
    ':focus': {
      outline: 'none',
      borderColor: theme.colors.primary,
      boxShadow: `0 0 0 2px ${theme.colors.primaryLight}`
    }
  },
  textarea: {
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.borderRadius.small,
    border: `1px solid ${theme.colors.border}`,
    fontSize: '16px',
    color: theme.colors.text,
    backgroundColor: theme.colors.white,
    transition: theme.animation.transition,
    minHeight: '80px',
    fontFamily: theme.fonts.main,
    ':focus': {
      outline: 'none',
      borderColor: theme.colors.primary,
      boxShadow: `0 0 0 2px ${theme.colors.primaryLight}`
    }
  },
  editActions: {
    display: 'flex',
    gap: theme.spacing.sm,
    justifyContent: 'flex-end',
    marginTop: theme.spacing.sm
  },
  saveButton: {
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.borderRadius.small,
    fontSize: '14px',
    fontWeight: '500',
    border: 'none',
    cursor: 'pointer',
    backgroundColor: theme.colors.primary,
    color: theme.colors.white,
    transition: theme.animation.transition,
    boxShadow: theme.shadows.small,
    fontFamily: theme.fonts.main,
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.xs,
    ':hover': {
      backgroundColor: theme.colors.primaryDark,
      transform: 'translateY(-1px)',
      boxShadow: theme.shadows.medium
    }
  },
  cancelButton: {
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.borderRadius.small,
    fontSize: '14px',
    fontWeight: '500',
    border: `1px solid ${theme.colors.border}`,
    cursor: 'pointer',
    backgroundColor: theme.colors.background,
    color: theme.colors.text,
    transition: theme.animation.transition,
    boxShadow: theme.shadows.small,
    fontFamily: theme.fonts.main,
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.xs,
    ':hover': {
      backgroundColor: theme.colors.primaryLight,
      color: theme.colors.primary,
      transform: 'translateY(-1px)',
      boxShadow: theme.shadows.medium
    }
  },
  projectTitle: {
    margin: `0 0 ${theme.spacing.xs} 0`,
    fontSize: '20px',
    color: theme.colors.text,
    fontWeight: '600',
    fontFamily: theme.fonts.heading
  },
  projectMeta: {
    display: 'flex',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
    flexWrap: 'wrap',
    alignItems: 'center'
  },
  badge: {
    backgroundColor: theme.colors.primaryLight,
    color: theme.colors.primaryDark,
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.borderRadius.small,
    fontSize: '0.75rem',
    fontWeight: '500',
    fontFamily: theme.fonts.main
  },
  date: {
    color: theme.colors.textLight,
    fontSize: '0.75rem',
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.xs,
    fontFamily: theme.fonts.main
  },
  projectDescription: {
    margin: `0 0 ${theme.spacing.md} 0`,
    color: theme.colors.text,
    fontSize: '0.9em',
    lineHeight: '1.6',
    fontFamily: theme.fonts.main
  },
  projectActions: {
    display: 'flex',
    gap: theme.spacing.sm,
    marginTop: theme.spacing.md
  },
  editButton: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.xs,
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.borderRadius.small,
    fontSize: '14px',
    fontWeight: '500',
    border: `1px solid ${theme.colors.border}`,
    cursor: 'pointer',
    backgroundColor: theme.colors.background,
    color: theme.colors.text,
    transition: theme.animation.transition,
    boxShadow: theme.shadows.small,
    fontFamily: theme.fonts.main,
    ':hover': {
      backgroundColor: theme.colors.primaryLight,
      color: theme.colors.primary,
      transform: 'translateY(-1px)',
      boxShadow: theme.shadows.medium
    }
  },
  deleteButton: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.xs,
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.borderRadius.small,
    fontSize: '14px',
    fontWeight: '500',
    border: `1px solid ${theme.colors.error}`,
    cursor: 'pointer',
    backgroundColor: theme.colors.error,
    color: theme.colors.white,
    transition: theme.animation.transition,
    boxShadow: theme.shadows.small,
    fontFamily: theme.fonts.main,
    ':hover': {
      backgroundColor: theme.colors.primaryDark,
      transform: 'translateY(-1px)',
      boxShadow: theme.shadows.medium
    }
  },
  buttonIcon: {
    fontSize: '16px',
    transition: theme.animation.transition,
    display: 'inline-block'
  },
  emptyState: {
    textAlign: 'center',
    padding: theme.spacing.xl,
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.large,
    border: `2px dashed ${theme.colors.border}`,
    color: theme.colors.textLight,
    fontFamily: theme.fonts.main
  },
  emptyStateIcon: {
    fontSize: '48px',
    marginBottom: theme.spacing.md
  },
  emptyStateText: {
    fontSize: '18px',
    color: theme.colors.text,
    margin: `0 0 ${theme.spacing.xs} 0`,
    fontWeight: '500',
    fontFamily: theme.fonts.heading
  },
  emptyStateSubtext: {
    fontSize: '14px',
    color: theme.colors.textLight,
    margin: 0,
    fontFamily: theme.fonts.main
  }
};

export default ProjectsList; 