import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../auth';
import { collection, query, where, getDocs, updateDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import './user-page.css';
import { Link } from 'react-router-dom';
import { db } from './../../../db/firebase';

const UserPage = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);
  const [editing, setEditing] = useState(false);
  const [newUserData, setNewUserData] = useState({
    username: '',
    email: '',
    address: '',
    site: '',
    telephone: ''
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (user) {
          const q = query(collection(db, 'users'), where('uid', '==', user.uid));
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            setUserData(doc.data());
          });
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [user]);

  const handleEdit = () => {
    setEditing(true);
    setNewUserData(userData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUserData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const updatedUserData = { ...newUserData }; // Skapa en kopia av newUserData
        const userDocRef = doc(db, 'users', user.uid);
        const docSnapshot = await getDoc(userDocRef);

        // Kontrollera om dokumentet finns för användar-ID:et
        if (docSnapshot.exists()) {
            const docId = docSnapshot.id; // Hämta dokumentets ID
            const docRef = doc(db, 'users', docId); // Skapa en referens till det befintliga dokumentet
            await updateDoc(docRef, updatedUserData); // Uppdatera det befintliga dokumentet
            console.log('User data updated successfully');
        } else {
            // Dokumentet finns inte, skapa det med användar-ID:et
            await setDoc(userDocRef, updatedUserData);
            console.log('User document created successfully');
        }

        // Uppdatera tillståndet och avsluta redigeringen
        setEditing(false);
        setUserData(updatedUserData);
    } catch (error) {
        console.error('Error updating user data:', error);
    }
};



  return (
    <div className="user-info-container">
      <h2>User Information</h2>
      {editing ? (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" value={newUserData.username} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="text" id="email" name="email" value={newUserData.email} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address:</label>
            <input type="text" id="address" name="address" value={newUserData.address} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="site">Site:</label>
            <input type="text" id="site" name="site" value={newUserData.site} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="telephone">Telephone:</label>
            <input type="text" id="telephone" name="telephone" value={newUserData.telephone} onChange={handleChange} />
          </div>
          <button type="submit">Save</button>
        
        </form>
      ) : (
        <div className='form-group'>
           {userData && (
                      <><p>
                       <div className="form">
                        <strong>Name:</strong> {userData?.username} </div></p>
                       
                        <p><strong>Email:</strong> {userData?.email}</p>
                        <p><strong>Address:</strong> {userData?.address}</p>
                        <p><strong>Site:</strong> {userData?.site}</p>
                        <p><strong>Telephone:</strong> {userData?.telephone}</p>
                        <button onClick={handleEdit}>Edit</button>
                      
                      </>
                    )}
                  </div>

      )}
    </div>
  );
};

export default UserPage;
