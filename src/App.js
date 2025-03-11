import React from 'react';
import { useState, useEffect } from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import supabase from './supabaseClient';

function App() {
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Check for initial user session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProjects = async () => {
    const { data, error } = await supabase.from('projects').select('*');
    if (error) {
      console.error('Error fetching projects:', error);
    } else {
      setProjects(data);
    }
  };

  const handleCreateProject = async (projectData) => {
    const { error } = await supabase
      .from('projects')
      .insert([projectData]);
    
    if (error) {
      console.error('Error creating project:', error);
    } else {
      fetchProjects(); // Refresh the projects list
    }
  };

  return (
    <div>
      <h1>My Portfolio</h1>
      {!user ? (
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
        />
      ) : (
        <div>
          <p>Welcome, {user.email}</p>
          {/* Add your project creation form and project list here */}
          <ul>
            {projects.map((project) => (
              <li key={project.id}>{project.title}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;