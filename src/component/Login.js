import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Importera CSS-filen för styling

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);
      console.log('Logged in successfully');
      
      // Sparar inloggningsstatus i sessionscookie
      setSessionCookie(); 
      
      navigate('/admin/allposts');
      window.location.reload(); 
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  // Funktion för att ställa in sessionscookie
  const setSessionCookie = () => {
    document.cookie = `loggedIn=true; path=/;`;
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login to Metal Monkey</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}

export default Login;