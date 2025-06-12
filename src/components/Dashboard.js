import React, { useState, useEffect } from 'react';
import supabase from '../supabaseClient';
import Button from './Button';
import ProjectForm from './ProjectForm';
import ConfirmDialog from './ConfirmDialog';
import './Dashboard.css';

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
    <div className="dashboard-container">
      <ConfirmDialog
        isOpen={deleteDialog.isOpen}
        onClose={closeDeleteDialog}
        onConfirm={() => handleDeleteProject(deleteDialog.projectId)}
        title="Delete Project"
        message={`Are you sure you want to delete "${deleteDialog.projectTitle}"? This action cannot be undone. 🎨`}
      />

      {showProjectForm && (
        <div className="form-container">
          <ProjectForm
            onSubmit={editingProject ? handleUpdateProject : handleCreateProject}
            onCancel={() => {
              setShowProjectForm(false);
              setEditingProject(null);
            }}
            initialData={editingProject}
          />
        </div>
      )}

      {expandedProject && (
        <div className="expanded-overlay" onClick={closeExpandedProject}>
          <div className="expanded-content" onClick={e => e.stopPropagation()}>
            <button className="close-button" onClick={closeExpandedProject}>×</button>
            {expandedProject.images_url && (
              <div className="expanded-image-container">
                <img 
                  src={expandedProject.images_url} 
                  alt={expandedProject.title}
                  className="expanded-image"
                />
              </div>
            )}
            <div className="expanded-details">
              <h2 className="expanded-title">{expandedProject.title}</h2>
              <div className="expanded-meta">
                {expandedProject.type?.name && (
                  <span className="badge">{expandedProject.type.name}</span>
                )}
                {expandedProject.platforms?.name && (
                  <span className="badge">{expandedProject.platforms.name}</span>
                )}
                {expandedProject.date_created && (
                  <span className="date">
                    {new Date(expandedProject.date_created).toLocaleDateString()}
                  </span>
                )}
              </div>
              <p className="expanded-description">
                {expandedProject.description || 'No description provided'}
              </p>
              <div className="expanded-actions">
                <Button 
                  onClick={() => {
                    setEditingProject(expandedProject);
                    setShowProjectForm(true);
                    closeExpandedProject();
                  }}
                  className="edit-button"
                >
                  <span className="button-icon">✏️</span>
                  Edit
                </Button>
                <Button 
                  onClick={() => {
                    openDeleteDialog(expandedProject);
                    closeExpandedProject();
                  }}
                  className="delete-button"
                >
                  <span className="button-icon">🗑️</span>
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="projects-section">
        <div className="projects-header">
          <div className="header-content">
            <h1 className="projects-title">Your Projects</h1>
            <p className="subtitle">Manage and showcase your amazing work</p>
          </div>
          <Button 
            onClick={() => {
              setShowProjectForm(true);
              setEditingProject(null);
            }}
          >
            <span className="button-icon">✨</span>
            Add New Project
          </Button>
        </div>

        {projects.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon"></div>
            <p className="empty-state-text">No projects added yet!</p>
            <p className="empty-state-subtext">Start by adding your first project above. 🚀</p>
          </div>
        ) : (
          <div className="projects-grid">
            {projects.map((project, index) => (
              <div 
                key={project.id}
                className="project-card"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => handleProjectClick(project)}
              >
                {project.images_url && (
                  <div className="image-container">
                    <img 
                      src={project.images_url} 
                      alt={project.title}
                      className="project-image"
                    />
                    <div className="image-overlay"></div>
                  </div>
                )}
                <div className="project-content">
                  <h4 className="project-title">{project.title}</h4>
                  <div className="project-meta">
                    {project.type?.name && (
                      <span className="badge">{project.type.name}</span>
                    )}
                    {project.platforms?.name && (
                      <span className="badge">{project.platforms.name}</span>
                    )}
                    {project.date_created && (
                      <span className="date">
                        {new Date(project.date_created).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                  <p className="project-description">
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

export default Dashboard; 