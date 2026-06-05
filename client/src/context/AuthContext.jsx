// AuthContext.jsx

//const AuthContext = createContext();

// export function useAuth() {
    //   return useContext(AuthContext);
    // }
    
    // export function AuthProvider({ children }) {
        //   const [user, setUser] = useState(null);
        //   const login = ({ username, password }) => { /* ... */ };
        //   return <AuthContext.Provider value={{ user, login }}>{children}</AuthContext.Provider>;
        // }
        // import { createContext, useContext, useState } from "react";
        // import axios from "axios";
        
        // const AuthContext = createContext();
        
        // // Custom hook to use the auth context
        // export function useAuth() {
            //   return useContext(AuthContext);
            // }
            
            // // AuthProvider wraps your app and provides auth state
            // export function AuthProvider({ children }) {
                //   const [user, setUser] = useState(null);
                
                //   // login makes a request to your backend and updates user
                //   const login = async ({ username, password }) => {
                    //     const res = await axios.post('/api/auth/login', { username, password }, { withCredentials: true });
                    //     if (res.data.success) setUser(res.data.user);
                    //     else throw new Error(res.data.error || 'Login failed');
                    //   };
                    
                    //   const logout = async () => {
                        //     await axios.get('/api/auth/logout', { withCredentials: true });
                        //     setUser(null);
                        //   };
                        // if (!res.ok) {
                            //   const text = await res.text();
                            //   console.error('API error:', res.status, text);
                            //   setError(text || `Failed with status ${res.status}`);
                            //   return;
                            // }
                            // const data = await res.json(); // safe to parse now
                            // // handle success...
                            
                            //   // Optional: add logout, register, etc.
                            
                            //   return (
                                //     <AuthContext.Provider value={{ user, login }}>
                                //       {children}
                                //     </AuthContext.Provider>
                                //   );
                                // }
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
        export const AuthContext = createContext();
        
        export function useAuth() {
            return useContext(AuthContext);
        }
        export function AuthProvider({ children }) {
            const [user, setUser] = useState(null);
            const [loading, setLoading] = useState(true);

            useEffect(() => {
                const checkAuth = async () => {
                    try {
                        const res = await axios.get('/api/auth/me', { withCredentials: true });
                        if (res.data.success) {
                            setUser(res.data.user);
                        }
                    } catch (err) {
                        console.log("Not logged in");
                    } finally {
                        setLoading(false);
                    }
                };
                checkAuth();
            }, []);
            
            const login = async ({ username, password }) => {
                const res = await axios.post('/api/auth/login', { username, password }, { withCredentials: true });
                if (res.data.success) setUser(res.data.user);
                else throw new Error(res.data.error || 'Login failed');
            };

            const refreshUser = async () => {
                try {
                    const res = await axios.get('/api/auth/me', { withCredentials: true });
                    if (res.data.success) setUser(res.data.user);
                } catch (err) {
                    console.error("Failed to refresh user", err);
                }
            };
            
            const register = async ({ username, password, email, fullname }) => {
                const res = await axios.post('/api/auth/register',
                  { username, password, email, fullname },
                   { withCredentials: true }
                );
                 if (!res.data.success) throw new Error(res.data.error || 'Registration failed');
                 setUser(res.data.user);
            };
            
            const logout = async () => {
                await axios.get('/api/auth/logout', { withCredentials: true });
                setUser(null);
            };
            
  return (
    <AuthContext.Provider value={{ user, login, register, logout, refreshUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
