import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { db } from '../../db/firebase';
import { TiArrowBackOutline } from "react-icons/ti";
import { query, where, getDocs, collection } from 'firebase/firestore';
import './bandDetailsPage.css'; // Importera din CSS-fil här
import bandLogos from './BandLogos'; // Importera bandlogor här

const BandDetailsPage = () => {
  const { member } = useParams();
  const [bands, setBands] = useState([]);

  useEffect(() => {
    const fetchBandsByMember = async () => {
      try {
        const q = query(collection(db, 'posts'), where('bandMembers', 'array-contains', member));
        const querySnapshot = await getDocs(q);

        const uniqueBands = {};
        querySnapshot.forEach((doc) => {
          const bandData = { id: doc.id, ...doc.data() };
          if (!uniqueBands[bandData.band]) { // Kontrollera om bandet redan finns i listan
            uniqueBands[bandData.band] = bandData;
          }
        });

        setBands(Object.values(uniqueBands));
      } catch (error) {
        console.error('Error fetching bands by member:', error);
      }
    };

    fetchBandsByMember();
  }, [member]);

  return (
    <div className="band-details-container">
      <h2>Bands with Member: {member}</h2>
      <ul className="band-list">
      {bands.map((band) => (
  <li key={band.id}>
    <Link to={`/band/${band.band}`} >
      {bandLogos[band.band] && <img className="band-logo" src={bandLogos[band.band]} alt={band.band} />} {/* Bandlogga */}
    </Link>
  </li>
))}
      </ul>
      <Link to="/" className="back-button"><TiArrowBackOutline size={20}/></Link>
    </div>
  );
};

export default BandDetailsPage;