import { useState, useEffect, useContext, createContext } from 'react';

import { auth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, firebaseUpdateProfile } from '../services/firebase';



const AuthContext = createContext(null);


export function AuthProvider({ children }) {
  const authService = useProvideAuth(); 
  return <AuthContext.Provider value={authService}>{children}</AuthContext.Provider>;
}


export const useAuth = () => {
  return useContext(AuthContext);
};


function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
      setLoading(false);
      setError(null);
    });

   
    return () => unsubscribe();
  }, []); 

  
  const register = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      
      const response = await createUserWithEmailAndPassword(auth, email, password);
      setUser(response.user);
      return response.user;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      
      const response = await signInWithEmailAndPassword(auth, email, password);
      setUser(response.user);
      return response.user;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    setError(null);
    try {
      
      await signOut(auth);
      setUser(null);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (displayName, photoURL = null) => {
    setLoading(true);
    setError(null);
    try {
      if (user) {
      
        await firebaseUpdateProfile(user, { displayName, photoURL });
      
        setUser({ ...user, displayName, photoURL });
        return true;
      }
      return false;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    register,
    login,
    logout,
    updateProfile,
  };
}