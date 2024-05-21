import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom'; // Importera Link från react-router-dom
import { db } from '../../db/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { TiArrowBackOutline } from "react-icons/ti";
import './PostDetails.css';
import { Rating } from '@mui/material';

const PostDetails = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const docRef = doc(db, 'posts', postId);
        const docSnap = await getDoc(docRef);
        const postData = docSnap.data();
        
        // Formatera datum
        const date = new Date(postData.createdAt.toDate());
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;

        // Uppdatera postobjektet med formaterat datum
        setPost({ ...postData, formattedDate });
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPost();
  }, [postId]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="blog-posts-det">
      <div className='posts-det'>
        <div className="post-details-det">
          <h3>
            <Link to={`/band/${post.band}`}>{post.band}</Link> - {post.title}
          </h3>
          <p className="author-det">Author: {post.authorName}</p>
          <p className="author-det">Record label: <Link to={`/label/${post.label}`}>{post.label}</Link></p>
          <p className="author-det">Country: <Link to={`/country/${post.country}`}>{post.country}</Link></p>
          <p className="author-det"> Release date: {post.release}</p>
          <p className="date-det">Post date: {post.formattedDate}</p>
          <div className="content-det" dangerouslySetInnerHTML={{ __html: post.content }}></div>
        
          {post.categories && (
            <div className="categories-det-det">
              <strong>Gener:</strong><br/>
              {post.categories.map((category, index) => (
                <span key={index} className="category">{category}</span>
              ))}
            </div>
          )}
          {post.tags && (
            <div className="tags-det-det">
              <strong>Themes:</strong><br/>
              {post.tags.map((tag, index) => (
                <span key={index} className="tag">{tag}</span>
              ))}
            </div>
          )}
        </div>
        <div className="image-container-det">
          <img src={post.imageURL} alt={post.title} />
          <div className="rating-det">
            <p/>
            <strong>Rating</strong><br />
            <Rating
              name="customized-icons"
              value={post.rating}
              readOnly
              precision={0.5}
            />
          </div>
          <p/>
          {post.bandMembers && (
            <div className="bandMembers-det">
              <strong>Members</strong>
              <ul>
                {post.bandMembers.map((member, index) => (
                  // Använd Link för att skapa en navigeringslänk till sidan för bandmedlemmen
                  <li key={index} className="band-det"><Link to={`/band-member/${member}`}>{member}</Link></li>
                ))}
              </ul>
            </div>
          )}
          {post.playlists && (
            <div className="playlists-det">
              <strong>Playlists</strong>
              <ol>
                {post.playlists.map((playlist, index) => (
                  <li key={index} className="play-det">{playlist}</li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </div>
      <Link to="/" className="back-button"><TiArrowBackOutline size={20}/></Link>
    </div>
  );
};

export default PostDetails;