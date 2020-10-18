import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';
import { FiPlus, FiRefreshCw, FiArrowRight } from 'react-icons/fi';
import { BiTargetLock } from 'react-icons/bi';

import api from '../services/api';

import 'leaflet/dist/leaflet.css';

import '../styles/pages/orphanages-map.css'

import mapMarkerImg from '../images/map-marker.svg';

import mapIcon from "../utils/mapIcon";
const mapToken = process.env.REACT_APP_MAPBOX_TOKEN;
//const mapStyle = 'light-v10';
const mapStylePrimary = sessionStorage.getItem('@map/stylePrimary'); //'outdoors-v11';
const mapStyleSecundary = sessionStorage.getItem('@map/styleSecundary'); //'satellite-streets-v11';

console.log(sessionStorage.getItem('@map/latitude/inicial'));
console.log(sessionStorage.getItem('@map/latitude/atual'));
console.log(sessionStorage.getItem('@map/style/atual'));

interface Orphanage {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
}

function OrphanagesMap() {
  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

  const [mapLatitude, setMapLatitude] = useState(Number(sessionStorage.getItem('@map/latitude/atual')));
  const [mapLongitude, setMapLongitude] = useState(Number(sessionStorage.getItem('@map/longitude/atual')));
  const [mapZoom, setMapZoom] = useState(Number(sessionStorage.getItem('@map/zoom/atual')));
  const [mapStyle, setMapStyle] = useState(sessionStorage.getItem('@map/style/atual'));

  const [origem, setOrigem] = useState({ latitude: Number(sessionStorage.getItem('@map/latitude/atual')), 
                                         longitude: Number(sessionStorage.getItem('@map/longitude/atual')), 
                                         zoom: Number(sessionStorage.getItem('@map/zoom/atual')) 
                                      })

  useEffect(() => {
    setMapLatitude(Number(sessionStorage.getItem('@map/latitude/atual')));
    setMapLongitude(Number(sessionStorage.getItem('@map/longitude/atual')));
    setMapZoom(Number(sessionStorage.getItem('@map/zoom/atual')));

    api.get('orphanages').then(response => {
      //console.log(response);
      setOrphanages(response.data);
    })
    .catch(function (error) {
      console.log(error.response);
    });
  }, []);

  function handleMapPontoInicial() {
    sessionStorage.setItem('@map/latitude/atual', String(sessionStorage.getItem('@map/latitude/inicial')));
    sessionStorage.setItem('@map/longitude/atual', String(sessionStorage.getItem('@map/longitude/inicial')));
    sessionStorage.setItem('@map/zoom/atual', String(sessionStorage.getItem('@map/zoom/inicial')));

    setMapLatitude(Number(sessionStorage.getItem('@map/latitude/inicial')));
    setMapLongitude(Number(sessionStorage.getItem('@map/longitude/inicial')));
    setMapZoom(Number(sessionStorage.getItem('@map/zoom/inicial')));
  }

  function handleMapStyle() {
    sessionStorage.setItem('@map/style/atual', String(mapStyle == mapStylePrimary ? ( mapStyleSecundary ) : ( mapStylePrimary )));
    setMapStyle(sessionStorage.getItem('@map/style/atual'));
  }

  function handleMapClick(event: LeafletMouseEvent) {
    let nLat = 0; let nLng = 0; let nZoom = 0; 

    if (event.latlng) {
      const { lat, lng } = event.latlng;
      nLat = lat;
      nLng = lng;
    } else {
      nLat = Number(sessionStorage.getItem('@map/latitude/atual'));
      nLng = Number(sessionStorage.getItem('@map/longitude/atual'));
    };
    if (event.target._zoom) {
      const zoom = event.target._zoom;
      nZoom = zoom;
    } else {
      nZoom = Number(sessionStorage.getItem('@map/zoom/atual'));
    };

    console.log(nLat + ", " + nLng + ", " + nZoom);

    sessionStorage.setItem('@map/latitude/atual', String(nLat))
    sessionStorage.setItem('@map/longitude/atual', String(nLng))
    sessionStorage.setItem('@map/zoom/atual', String(nZoom))

    setOrigem({
      latitude: nLat,
      longitude: nLng,
      zoom: nZoom
    })
  }

  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarkerImg} alt={process.env.REACT_APP_NAME} />

          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita :)</p>
        </header>

        <footer>
          <strong>Rio de Janeiro</strong>
          <span>Rio de Janeiro</span>
        </footer>
      </aside>

      <Map
        center={[mapLatitude,mapLongitude]}
        zoom={mapZoom}
        style={{ width: '100%', height: '100%' }}
        onClick={handleMapClick}
        onZoomEnd={handleMapClick}
        onMouseUp={handleMapClick}
        >
        {/* OpenStreetMap */}
        {/* <TileLayer 
          url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" 
        /> */}

        {/* MapBox */}
        <TileLayer 
          url={`https://api.mapbox.com/styles/v1/mapbox/${sessionStorage.getItem('@map/style/atual')}/tiles/256/{z}/{x}/{y}@2x?access_token=${mapToken}`} 
        />

        {orphanages.map(orphanage => {
          return (
            <Marker
              key={orphanage.id}
              icon={mapIcon}
              position={[orphanage.latitude,orphanage.longitude]} 
            >
              <Popup className="map-popup"
                closeButton={false}
                minWidth={240}
                maxWidth={240}
              >
                {orphanage.name}
                <Link to={`/orphanages/${orphanage.id}`}>
                  <FiArrowRight size={20} color="#fff"></FiArrowRight>
                </Link>
              </Popup>
            </Marker>
          )
        })}

        <button
          type="button"
          className="link tipo-mapa"
          onClick={handleMapStyle}
          >
          <FiRefreshCw size={32} color="#fff"></FiRefreshCw>
        </button>

      </Map>

      <button
        type="button"
        className="link ponto-inicial-mapa"
        onClick={handleMapPontoInicial}
        >
        <BiTargetLock size={32} color="#fff"></BiTargetLock>
      </button>

      <Link to="/orphanages/create" className="link create-orphanage">
        <FiPlus size={32} color="#fff"></FiPlus>
      </Link>
    </div>
  );
}

export default OrphanagesMap;