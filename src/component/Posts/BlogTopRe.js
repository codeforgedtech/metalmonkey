import React, { useState } from 'react';
import './blogTopRe.css'; // Importera CSS-filen för styling
import { Link } from 'react-router-dom'; 

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return date.toLocaleDateString('en-US', options);
};

const BlogTopRe = ({ posts }) => {
  const [currentPage, setCurrentPage] = useState(1); // Håll koll på den aktuella sidan
  const [sortBy, setSortBy] = useState('date'); // Håll koll på det aktuella sorteringsalternativet
  const postsPerPage = 6; // Antal inlägg som ska visas per sida

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  // Sortera inläggen baserat på det aktuella sorteringsalternativet
  const sortedPosts = posts.slice().sort((a, b) => {
    if (sortBy === 'band') {
      return a.band.localeCompare(b.band); // Sortera efter bandets namn
    } else if (sortBy === 'label') {
      return a.label.localeCompare(b.label); // Sortera efter bolagets namn
    } else if (sortBy === 'rating') {
      return b.rating - a.rating; // Sortera efter betyg i minskande ordning
    } else if (sortBy === 'release') {
      // Om a.release och b.release är datumobjekt, jämför dem genom att konvertera till strängar
      const releaseA = a.release instanceof Date ? a.release.toISOString() : a.release;
      const releaseB = b.release instanceof Date ? b.release.toISOString() : b.release;
      return releaseA.localeCompare(releaseB); // Sortera efter release i alfanumerisk ordning
    } else if (sortBy === 'country') {
      // Om a.release och b.release är datumobjekt, jämför dem genom att konvertera till strängar
      const countryA = a.country instanceof Date ? a.country.toISOString() : a.country;
      const countryB = b.country instanceof Date ? b.country.toISOString() : b.country;
      return countryA.localeCompare(countryB); // Sortera efter release i alfanumerisk ordning
    } else {
      const dateA = a.createdAt.toDate(); // Konvertera Firebase Timestamp till JavaScript Date-objekt
      const dateB = b.createdAt.toDate(); // Konvertera Firebase Timestamp till JavaScript Date-objekt
      return dateB - dateA; // Sortera inläggen i minskande ordning efter datum
    }
  });

  const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = pageNumber => setCurrentPage(pageNumber);
  const handleSortByChange = value => setSortBy(value);

  return (
    <>
      <div className="top-container-sort">
        <div className="sort-container">
          <button className={`sort-button ${sortBy === 'date' ? 'active' : ''}`} onClick={() => handleSortByChange('date')}>Date</button>
          <button className={`sort-button ${sortBy === 'band' ? 'active' : ''}`} onClick={() => handleSortByChange('band')}>Band</button>
          <button className={`sort-button ${sortBy === 'label' ? 'active' : ''}`} onClick={() => handleSortByChange('label')}>Label</button>
          <button className={`sort-button ${sortBy === 'rating' ? 'active' : ''}`} onClick={() => handleSortByChange('rating')}>Rating</button>
          <button className={`sort-button ${sortBy === 'release' ? 'active' : ''}`} onClick={() => handleSortByChange('release')}>Release</button>
          <button className={`sort-button ${sortBy === 'country' ? 'active' : ''}`} onClick={() => handleSortByChange('country')}>Country</button>
        </div>
      </div>
    
      <div className="top-container">
     
        {currentPosts.map((post, index) => (
          <div key={index} className="top-post">
            <div className="top-details">
              <Link to={`/post/${post.id}`} className="cover-image-link">
                <div className="cover-image-container">
                  <img src={post.imageURL} alt={post.title} />
                  <div className="hover-content">
                    {post.band} <br/> 
                    {post.title}<br/>
                
                  </div>
                </div>
              </Link>
              <div className="writer">Writer: {post.authorName}</div>
              <div className="date">Date: {formatDate(post.createdAt.toDate())}</div>
              <div className="rating-container">
  <div className="rating-label">Rating</div>
  <div className="rating-circle">{post.rating}</div>
</div>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
        {Array.from({ length: Math.ceil(sortedPosts.length / postsPerPage) }).map((_, index) => (
          <div key={index} className={`page-button ${currentPage === index + 1 ? 'active' : ''}`} onClick={() => paginate(index + 1)}>
            {index + 1}
          </div>
        ))}
      </div>
    </>
  );
};

export default BlogTopRe;

