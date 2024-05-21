import React, { useState, useEffect } from 'react';
import { db } from '../../../db/firebase'; // Importera din firebase-konfiguration
import './AllBlogPosts.css';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { FaTrashAlt, FaEdit } from 'react-icons/fa'; 
import { Link, useParams } from 'react-router-dom'; 

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [sortBy, setSortBy] = useState('title'); // Default sorting by title
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10; // Number of posts per page

  // Hämta alla poster från databasen vid mount
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

  // Funktion för att ta bort en post från databasen
  const handleDelete = async (postId) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        await deleteDoc(doc(db, `posts/${postId}`));
        setPosts(posts.filter(post => post.id !== postId));
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  // Sort posts
  const sortedPosts = posts.slice().sort((a, b) => {
    if (sortBy === 'band') {
      return a.band.localeCompare(b.band);
    } else if (sortBy === 'label') {
      return a.label.localeCompare(b.label);
    } else {
      return a.title.localeCompare(b.title);
    }
  });

  // Pagination logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container">
      <h2>All Reviews</h2>
      <div className="sort-buttons">
        <button onClick={() => setSortBy('title')}>Sort by Title</button>
        <button onClick={() => setSortBy('band')}>Sort by Band</button>
        <button onClick={() => setSortBy('label')}>Sort by Label</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Band</th>
            <th>Label</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentPosts.map(post => (
            <tr key={post.id}>
              <td>{post.title}</td>
              <td>{post.band}</td>
              <td>{post.label}</td>
              <td>
                <Link to="#" onClick={() => handleDelete(post.id)} className="action-link"><FaTrashAlt className="action-icon" /></Link>
                <Link to={`/admin/editPost/${post.id}`} className="action-link"><FaEdit className="action-icon" /></Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        {Array.from({ length: Math.ceil(sortedPosts.length / postsPerPage) }).map((_, index) => (
          <button key={index} onClick={() => paginate(index + 1)} className={`page-button ${currentPage === index + 1 ? 'active' : ''}`}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AllPosts;