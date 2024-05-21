import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { db } from '../../db/firebase';
import { TiArrowBackOutline } from "react-icons/ti";
import { query, where, getDocs, collection } from 'firebase/firestore';
import './labelDetailsPage.css'; // Importera din CSS-fil här
import bandLogos from './BandLogos'; // Importera bandlogotyperna

const LabelDetailsPage = () => {
  const { label } = useParams();
  const [albums, setAlbums] = useState([]);
  const [bands, setBands] = useState([]);

  useEffect(() => {
    const fetchAlbumsByLabel = async () => {
      try {
        const q = query(collection(db, 'posts'), where('label', '==', label));
        const querySnapshot = await getDocs(q);

        const albumsData = [];
        querySnapshot.forEach((doc) => {
          const albumData = { id: doc.id, ...doc.data() };
          albumsData.push(albumData);
        });

        setAlbums(albumsData);
      } catch (error) {
        console.error('Error fetching Albums by label:', error);
      }
    };

    const fetchBandsByLabel = async () => {
      try {
        const q = query(collection(db, 'posts'), where('label', '==', label));
        const querySnapshot = await getDocs(q);

        const uniqueBands = {};
        querySnapshot.forEach((doc) => {
          const bandData = { id: doc.id, ...doc.data() };
          if (!uniqueBands[bandData.band]) {
            uniqueBands[bandData.band] = bandData;
          }
        });

        setBands(Object.values(uniqueBands));
      } catch (error) {
        console.error('Error fetching Bands by label:', error);
      }
    };

    fetchAlbumsByLabel();
    fetchBandsByLabel();
  }, [label]);

  return (
    <div className="label-details-container">
      <h2>{label}</h2>
      <h3>Albums</h3>
      <ul className="album-list">
        {albums.map((album) => (
          <li key={album.id}>
            <Link to={`/post/${album.id}`}>
              <img src={album.imageURL} alt={album.title} width={200}/> {/* Visa omslagsbilden */}
            </Link>
            <div className="album-title"><span>{album.title}</span></div>
          </li>
        ))}
      </ul>
      <h3>Bands</h3>
      <ul className="band-list">
        {bands.map((band) => (
          <li key={band.id}>
            <Link to={`/band/${band.id}`}>
              {bandLogos[band.band] && <img src={bandLogos[band.band]} alt={band.band} className="band-logo" />} {/* Bandlogotyp */}
              <span>{band.band}</span>
            </Link>
          </li>
        ))}
      </ul>
      <Link to="/" className="back-button"><TiArrowBackOutline size={20}/></Link>
    </div>
  );
};

export default LabelDetailsPage;