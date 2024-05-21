import React from 'react';
import Rating from '@mui/material/Rating';
import './blogPost.css'; // Importera CSS-filen för styling

const BlogPost = ({ post }) => {
  const { imageURL, rating, bandMembers, playlists, label, band, title, content, authorName, createdAt, categories, tags } = post;
  const formattedDate = createdAt ? createdAt.toDate().toString() : '';

  return (
    <div className="blog-post">
      <div className='posts'>
        <div className="post-details">
          <h3>{band} - {title}</h3>
          <p className="author">Author: {authorName}</p>
          <p className="author">Recordlabel: {label}</p>
          <p className="date">Date: {formattedDate}</p>
          <div className="content" dangerouslySetInnerHTML={{ __html: content }}></div>
          {categories && (
            <div className="categories">
              <strong>Categories:</strong>
              {categories.map((category, index) => (
                <span key={index} className="category">{category}</span>
              ))}
            </div>
          )}
          <div className="list">
            {playlists && (
              <div className="playlists">
                <strong>Playlists:</strong>
                <ol>
                  {playlists.map((playlist, index) => (
                    <li key={index} className="play">{playlist}</li>
                  ))}
                </ol>
              </div>
            )}
            {bandMembers && (
              <div className="bandMembers">
                <strong>Members :</strong>
                <ul>
                  {bandMembers.map((member, index) => (
                    <li key={index} className="band">{member}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          {tags && (
            <div className="tags">
              <strong>Tags:</strong>
              {tags.map((tag, index) => (
                <span key={index} className="tag">{tag}</span>
              ))}
            </div>
          )}
          <div className="rating">
            <strong>Rating:</strong><br />
            <Rating
              name="customized-icons"
              value={rating}
              readOnly
              precision={0.5}
            />
          </div>
        </div>
        <div className="image-container">
          <img src={imageURL} alt={title} />
        </div>
      </div>
    </div>
  );
};

export default BlogPost;