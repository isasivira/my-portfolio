import { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import Login from './components/Login';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data?.user ?? null);
    };

    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <div>
      {user ? (
        <div>
          <h1>Welcome, {user.email}</h1>
          <button onClick={handleLogout}>Logout</button>
          {/* Add admin dashboard here */}
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
{user && user.role === 'admin' && (
  <div>
    <h2>Admin Dashboard</h2>
    <button onClick={handleCreateProject}>Add Project</button>
  </div>
)}


