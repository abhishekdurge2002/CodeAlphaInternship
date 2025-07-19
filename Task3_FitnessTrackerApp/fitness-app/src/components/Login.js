import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom'; 

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    
    if (!email || !password) {
      alert('Please enter both email and password.');
      return;
    }

    try {
      await auth.login(email, password);
      alert('Login successful!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error logging in:', error.message);
      alert('Login failed: ' + auth.error);
    }
  };

  return (
   
    <div className="container flex-center" style={{ minHeight: 'calc(100vh - var(--spacing-xxxl))' }}> {}
      <div className="login-container card" style={{ maxWidth: '400px', width: '100%' }}> {}
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="login-email">Email:</label>
          <input
            type="email"
            id="login-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@example.com"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="login-password">Password:</label>
          <input
            type="password"
            id="login-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <button onClick={handleLogin} disabled={auth.loading} className="button-primary" style={{ width: '100%', marginTop: 'var(--spacing-md)' }}>
          {auth.loading ? 'Logging In...' : 'Login'}
        </button>
        {auth.error && <p className="error-message">{auth.error}</p>}
        <p style={{ marginTop: 'var(--spacing-lg)', fontSize: 'var(--font-size-sm)', textAlign: 'center' }}>
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;