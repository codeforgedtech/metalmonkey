import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { db } from '../../db/firebase';
import { TiArrowBackOutline } from "react-icons/ti";
import { query, where, getDocs, collection } from 'firebase/firestore';
import './albumDetailsPage.css'; // Importera din CSS-fil här


import bandLogos from './BandLogos';

const AlbumDetailsPage = () => {
  const { band } = useParams();
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const fetchAlbumsByBand = async () => {
      try {
        const q = query(collection(db, 'posts'), where('band', '==', band));
        const querySnapshot = await getDocs(q);

        const albumsData = [];
        querySnapshot.forEach((doc) => {
          const albumData = { id: doc.id, ...doc.data() };
          albumsData.push(albumData);
        });

        setAlbums(albumsData);
      } catch (error) {
        console.error('Error fetching Albums by band:', error);
      }
    };

    fetchAlbumsByBand();
  }, [band]);

  // Hämta logotypen för det aktuella bandet från bandLogos
  const bandLogo = bandLogos[band];
  console.log('bandLogos:', bandLogos); // Utskrift för att kontrollera bandLogos
  console.log('Band:', band); 
  return (
    <div className="album-details-container">

      {bandLogo ? (
        <img src={bandLogo} alt={band} className="band-logos" />
      ) : (
        <span className="default-logo">Logo for the {band} missing!</span>
      )}

      <h2>Album</h2>
      <ul className="album-list">
        {albums.map((album) => (
          <li key={album.id}>
            <Link to={`/post/${album.id}`}>
              <img src={album.imageURL} alt={album.title} width={200}/>  {/* Visa omslagsbilden */}
             
            </Link>
            <div className="album-title"><span>{album.title}</span></div>
          </li>
        ))}
      </ul>
      <Link to="/" className="back-button"><TiArrowBackOutline size={20}/></Link>
    </div>
  );
};

export default AlbumDetailsPage;