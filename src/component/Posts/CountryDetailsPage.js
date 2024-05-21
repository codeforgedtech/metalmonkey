import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { db } from '../../db/firebase';
import { TiArrowBackOutline } from "react-icons/ti";
import { query, where, getDocs, collection, distinct } from 'firebase/firestore';
import './countryDetailsPage.css'; // Importera din CSS-fil här
import bandLogos from './BandLogos'; // Importera bandloggor här

const CountryDetailsPage = () => {
  const { country } = useParams();
  const [albums, setAlbums] = useState([]);
  const [bands, setBands] = useState([]);

  useEffect(() => {
    const fetchAlbumsByCountry = async () => {
      try {
        const q = query(collection(db, 'posts'), where('country', '==', country));
        const querySnapshot = await getDocs(q);

        const albumsData = [];
        querySnapshot.forEach((doc) => {
          const albumData = { id: doc.id, ...doc.data() };
          albumsData.push(albumData);
        });

        setAlbums(albumsData);
      } catch (error) {
        console.error('Error fetching Albums by country:', error);
      }
    };

    fetchAlbumsByCountry();
  }, [country]);

  useEffect(() => {
    const fetchBandsByCountry = async () => {
      try {
        const q = query(collection(db, 'posts'), where('country', '==', country));
        const querySnapshot = await getDocs(q);

        const bandsData = [];
        querySnapshot.forEach((doc) => {
          const bandData = doc.data().band;
          if (!bandsData.includes(bandData)) {
            bandsData.push(bandData);
          }
        });

        setBands(bandsData);
      } catch (error) {
        console.error('Error fetching Bands by country:', error);
      }
    };

    fetchBandsByCountry();
  }, [country]);

  return (
    <div className="country-details-container">
      <h2>Albums from {country}</h2>
      <ul className="album-list">
        {albums.map((album) => (
          <li key={album.id}>
            <Link to={`/post/${album.id}`}>
              <img src={album.imageURL} alt={album.title} width={200}/>
            </Link>
            <div className="album-title"><span>{album.title}</span></div>
          </li>
        ))}
      </ul>

      <h2>Bands from {country}</h2>
      <ul className="album-list">
        {bands.map((band, index) => (
          <li key={index}>
           
            <Link to={`/band/${band}`} >
              {bandLogos[band] && <img className="bands-logo-c" src={bandLogos[band]} alt={band}  />} {/* Bandlogga */}
  
            </Link>
          </li>
        ))}
      </ul>

      <Link to="/" className="back-button"><TiArrowBackOutline size={20}/></Link>
    </div>
  );
};

export default CountryDetailsPage;
