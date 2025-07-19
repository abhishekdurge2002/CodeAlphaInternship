import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = useAuth();
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!email || !password) {
      alert('Please enter both email and password.');
      return;
    }

    try {
      await auth.register(email, password);
      alert('Registration successful! You are now logged in.');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error registering user:', error.message);
      alert('Registration failed: ' + auth.error);
    }
  };

  return (
    
    <div className="container flex-center" style={{ minHeight: 'calc(100vh - var(--spacing-xxxl))' }}> {}
      <div className="register-container card" style={{ maxWidth: '400px', width: '100%' }}> {}
        <h2>Register</h2>
        <div className="form-group">
          <label htmlFor="register-email">Email:</label>
          <input
            type="email"
            id="register-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@example.com"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="register-password">Password:</label>
          <input
            type="password"
            id="register-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Min 6 characters"
            required
          />
        </div>
        <button onClick={handleRegister} disabled={auth.loading} className="button-primary" style={{ width: '100%', marginTop: 'var(--spacing-md)' }}>
          {auth.loading ? 'Registering...' : 'Register'}
        </button>
        {auth.error && <p className="error-message">{auth.error}</p>}
        <p style={{ marginTop: 'var(--spacing-lg)', fontSize: 'var(--font-size-sm)', textAlign: 'center' }}>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;