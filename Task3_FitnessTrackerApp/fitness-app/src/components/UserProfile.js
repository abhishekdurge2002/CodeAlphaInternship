import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom'; 
function UserProfile() {
  const auth = useAuth();
  const navigate = useNavigate();

  const [displayName, setDisplayName] = useState(auth.user?.displayName || '');
  const [email, setEmail] = useState(auth.user?.email || '');
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [updateError, setUpdateError] = useState(null);

  useEffect(() => {
    if (auth.user) {
      setDisplayName(auth.user.displayName || '');
      setEmail(auth.user.email || '');
    } else {
      setDisplayName('');
      setEmail('');
    }
  }, [auth.user]);

  const handleUpdateProfile = async () => {
    if (!auth.user) {
      setUpdateError('No user logged in to update.');
      return;
    }
    setLoadingUpdate(true);
    setUpdateError(null);
    try {
      await auth.updateProfile(displayName);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error.message);
      setUpdateError(auth.error || 'Failed to update profile.');
      alert('Profile update failed: ' + (auth.error || error.message));
    } finally {
      setLoadingUpdate(false);
    }
  };

  const handleLogout = async () => {
    try {
      await auth.logout();
      alert('Logged out successfully!');
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error.message);
      alert('Logout failed: ' + auth.error);
    }
  };

  if (auth.loading) {
    return <div className="container" style={{ textAlign: 'center', padding: 'var(--spacing-xl)' }}>Loading profile...</div>;
  }

  if (!auth.user) {
    return (
      <div className="container card" style={{ textAlign: 'center', padding: 'var(--spacing-xl)' }}>
        <h2>User Profile</h2>
        <p>Please <Link to="/login">sign in</Link> or <Link to="/register">register</Link> to view and edit your profile.</p>
      </div>
    );
  }

  return (
    <div className="container card">
      <h2>User Profile</h2>
      <div className="form-group">
        <label htmlFor="profile-display-name">Display Name:</label>
        <input
          type="text"
          id="profile-display-name"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          placeholder="Your full name"
        />
      </div>
      <div className="form-group">
        <label htmlFor="profile-email">Email:</label>
        <input
          type="email"
          id="profile-email"
          value={email}
          readOnly
          disabled
          style={{ backgroundColor: 'var(--background-color)' }}
        />
        <small style={{ fontSize: 'var(--font-size-sm)', color: 'var(--light-text-color)' }}>
          (Email cannot be changed from here)
        </small>
      </div>
      <button onClick={handleUpdateProfile} disabled={loadingUpdate}>
        {loadingUpdate ? 'Updating...' : 'Update Profile'}
      </button>
      {updateError && <p className="error-message" style={{ color: 'var(--danger-color)', marginTop: 'var(--spacing-sm)' }}>{updateError}</p>}

      <hr style={{ margin: 'var(--spacing-lg) 0', borderColor: 'var(--border-color)' }} />

      <button onClick={handleLogout} className="button-secondary" disabled={auth.loading}>
        {auth.loading ? 'Logging Out...' : 'Logout'}
      </button>
    </div>
  );
}

export default UserProfile;