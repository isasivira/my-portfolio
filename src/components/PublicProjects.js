import React, { useState, useEffect } from 'react';
import supabase from '../supabaseClient';
// import theme from '../theme'; // Remove theme import as styles are now in CSS
import './PublicProjects.css'; // Import the new CSS file

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
      <div className="loading-container">
        <div className="loading-spinner">✨ Loading Projects ✨</div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="projects-container">
        <div className="projects-header">
          <div className="header-content">
            <h1 className="title">✨ Creative Projects ✨</h1>
            <p className="subtitle">Explore amazing works from talented creators</p>
          </div>
        </div>

        {projects.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">🎨</div>
            <p className="empty-state-text">No projects available yet</p>
            <p className="empty-state-subtext">Check back later for amazing creations ✨</p>
          </div>
        ) : (
          <div className="projects-grid">
            {projects.map((project, index) => (
              <div 
                key={project.id}
                className="project-card"
                style={{ animationDelay: `${index * 0.1}s` }} /* Inline style for animation delay */
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

export default PublicProjects; 