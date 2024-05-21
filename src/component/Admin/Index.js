import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../../db/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import './AdminPanel.css'; // Importera CSS-filen
import { isLoggedIn } from '../../authUtils'; 
import { FaHome, FaUser, FaPlus, FaList } from 'react-icons/fa'; // Importera ikonerna från FontAwesome

function AdminPage() {
  const auth = getAuth();
  const navigate = useNavigate();
  const currentUser = auth.currentUser;
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchUsername = async () => {
      if (currentUser) {
        const q = query(collection(db, 'users'), where('uid', '==', currentUser.uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          setUsername(doc.data().username);
        });
      }
    };

    fetchUsername();
  }, [currentUser]);

  return (
    <div className="admin-container">
      <div className="admin-content">
        <div className='admin-link'><h2>Admin Page</h2></div>
        {isLoggedIn() && (
        
            <p>Welcome, {username}</p>
       
        )}
      </div>
    </div>
  );
}

export default AdminPage;