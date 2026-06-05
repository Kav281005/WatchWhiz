const AuthContext = React.createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = async (creds) => {
    const res = await fetch('/api/auth/login', {/*...*/});
    const data = await res.json();
    if (data.success) setUser(data.user);
  };

  // register & logout similarly

  return <AuthContext.Provider value={{ user, login, logout, register }}>{children}</AuthContext.Provider>;
}
