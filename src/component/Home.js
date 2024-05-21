import React, { useState, useEffect } from 'react';
import './home.css'; // Importera CSS-filen för styling

import BlogTopRe from './Posts/BlogTopRe'; 
import { db } from './../db/firebase';
import { collection, getDocs } from 'firebase/firestore';

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'posts'));
        const postsData = [];
        querySnapshot.forEach((doc) => {
          postsData.push({ id: doc.id, ...doc.data() });
        });
        setPosts(postsData);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="home">
     
      <main className="main">
      <BlogTopRe posts={posts} />
     
        
          
      
      </main>
    </div>
  );
};

export default Home;