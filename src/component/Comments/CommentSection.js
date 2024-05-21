import React, { useState, useEffect } from 'react';
import { db } from '../../db/firebase';
import './CommentSection.css';
const CommentSection = ({ postId, currentUser }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const commentsCollection = db.collection('comments').where('postId', '==', postId);
        const snapshot = await commentsCollection.get();
        const commentsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setComments(commentsData);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentUser) {
        const userId = currentUser.uid;
        const newCommentData = {
          postId,
          text: newComment,
          userId,
          createdAt: new Date()
        };
  
        // Lägg till den nya kommentaren i databasen
        await db.collection('comments').add(newCommentData);
  
        // Återställ formuläret
        setNewComment('');
  
        console.log('Comment posted successfully');
      } else {
        console.log('Please log in to post a comment');
      }
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  return (
    <div className="comment-section">
      <h3>Comments</h3>
      <form onSubmit={handleSubmit}>
        <textarea value={newComment} onChange={(e) => setNewComment(e.target.value)} />
        <button type="submit">Post Comment</button>
      </form>
      <ul>
        {comments.map(comment => (
          <li key={comment.id}>{comment.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default CommentSection;
