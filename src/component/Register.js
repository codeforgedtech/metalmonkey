import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { db, auth } from '../db/firebase';
import { collection, addDoc } from 'firebase/firestore';
import './Register.css'; // Importera CSS-filen

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [telephone, setTelephone] = useState('');
  const [site, setSite] = useState('');
  const [address, setAddress] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // Lägg till användaren i Firestore med ytterligare fält
      const usersCollection = collection(db, 'users');
      await addDoc(usersCollection, {
        uid: user.uid,
        email: user.email,
        username: username,
        address: address,
        site: site,
        telephone: telephone
      });
  
      // Visa toast-meddelande när registreringen är klar
      setToastMessage('Registreringen är klar! Välkommen, ' + username + '!');
  
      console.log('User registered successfully');
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h2>Register new account</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
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
        <button onClick={handleRegister}>Register Account</button>
        {toastMessage && <div className="toast">{toastMessage}</div>}
      </div>
    </div>
  );
}

export default Register;