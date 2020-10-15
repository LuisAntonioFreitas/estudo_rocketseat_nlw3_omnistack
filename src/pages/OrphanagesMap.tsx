import React from 'react';
import { Link } from 'react-router-dom';
import { Map, TileLayer } from 'react-leaflet';
import { FiPlus, FiRefreshCw } from 'react-icons/fi';

import 'leaflet/dist/leaflet.css';

import '../styles/pages/orphanagesmap.css'

import mapMarkerImg from '../images/map-marker.svg';

const mapToken = process.env.REACT_APP_MAPBOX_TOKEN;
const mapCenter = [-22.9752102,-43.3746088];
// const mapStyle = 'light-v10';
const mapStyle = 'outdoors-v11';
//const mapStyle = 'satellite-streets-v11';

function OrphanagesMap() {
  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarkerImg} alt="Happy"/>

          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita :)</p>
        </header>

        <footer>
          <strong>Rio de Janeiro</strong>
          <span>Rio de Janeiro</span>
        </footer>
      </aside>

      <Map
        center={[-22.9752102,-43.3746088]}
        zoom={14}
        style={{ width: '100%', height: '100%' }}
      >
        {/* OpenStreetMap */}
        {/* <TileLayer 
          url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" 
        /> */}

        {/* MapBox */}
        <TileLayer 
          url={`https://api.mapbox.com/styles/v1/mapbox/${mapStyle}/tiles/256/{z}/{x}/{y}@2x?access_token=${mapToken}`} 
        />
      </Map>

      <Link to="" className="link tipo-mapa">
        <FiRefreshCw size={32} color="#fff"></FiRefreshCw>
      </Link>

      <Link to="" className="link create-orphanage">
        <FiPlus size={32} color="#fff"></FiPlus>
      </Link>
    </div>
  );
}

export default OrphanagesMap;