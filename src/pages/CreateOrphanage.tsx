import React, { FormEvent, useState, ChangeEvent } from "react";
import { useHistory } from 'react-router-dom';
import { Map, Marker, TileLayer } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';
import { FiPlus } from "react-icons/fi";

import api from '../services/api';

import Sidebar from "../components/Sidebar";

import 'leaflet/dist/leaflet.css';

import '../styles/pages/create-orphanage.css';

import mapIcon from "../utils/mapIcon";
import { formatDiagnosticsWithColorAndContext } from "typescript";
const mapToken = process.env.REACT_APP_MAPBOX_TOKEN;
const mapCenterLatitude = -22.9752102;
const mapCenterLongitude = -43.3746088;
//const mapStyle = 'light-v10';
const mapStyle = 'outdoors-v11';
//const mapStyle = 'satellite-streets-v11';

export default function CreateOrphanage() {
  const history = useHistory();

  const [position, setPosition] = useState({ latitude: 0, longitude: 0 })

  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [instructions, setInstructions] = useState('');
  const [opening_hours, setOpeningHours] = useState('');
  const [open_on_weekends, setOpenOnWeekends] = useState(true);
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  function handleMapClick(event: LeafletMouseEvent) {
    const { lat, lng } = event.latlng;

    setPosition({
      latitude: lat,
      longitude: lng
    })
  }

  function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) {
      return;
    }

    console.log(event.target.files);

    const selectedImagens = Array.from(event.target.files);

    setImages(selectedImagens);

    const selectedPreviewImagens = selectedImagens.map(image => {
      return URL.createObjectURL(image);
    });

    setPreviewImages(selectedPreviewImagens);
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const { latitude, longitude } = position; 

    console.log({
      name,
      about,
      latitude, 
      longitude, 
      instructions,
      opening_hours,
      open_on_weekends,
      images
    })

    const data = new FormData();

    data.append('name', name);
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
    data.append('about', about);
    data.append('instructions', instructions);
    data.append('opening_hours', opening_hours);
    data.append('open_on_weekends', String(open_on_weekends));
    
    images.forEach(image => {
      data.append('images', image);
    })

    await api.post('orphanages', data)

    alert('Cadastro realizado com sucesso!');

    history.push('/app');
  }


  return (
    <div id="page-create-orphanage">
      <Sidebar />

      <main>
        <form onSubmit={handleSubmit} className="create-orphanage-form">
          <fieldset>
            <legend>Dados</legend>

            <Map 
              center={[-22.9752102,-43.3746088]} 
              style={{ width: '100%', height: 280 }}
              zoom={14}
              onClick={handleMapClick}
            >
              {/* MapBox */}
              <TileLayer 
                url={`https://api.mapbox.com/styles/v1/mapbox/${mapStyle}/tiles/256/{z}/{x}/{y}@2x?access_token=${mapToken}`} 
              />

              { position.latitude != 0 && (
                <Marker interactive={false} icon={mapIcon} position={[position.latitude,position.longitude]} />
              )}
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input id="name" value={name} 
                onChange={event => setName(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea id="about" maxLength={300} value={about} 
                onChange={event => setAbout(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {previewImages.map((image, index) => {
                  return (
                    <img key={index} src={image} alt={name} />
                )}
                )}

                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>

              <input multiple onChange={handleSelectImages} type="file" id="image[]" />
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea id="instructions" value={instructions} 
                onChange={event => setInstructions(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de funcionamento</label>
              <input id="opening_hours" value={opening_hours} 
                onChange={event => setOpeningHours(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button 
                  type="button" 
                  className={ open_on_weekends ? ( 'active' ) : ( '' ) }
                  onClick={() => {
                    setOpenOnWeekends(true);
                  }}
                >
                  Sim
                </button>
                <button 
                  type="button"
                  className={ !open_on_weekends ? ( 'active' ) : ( '' ) }
                  onClick={() => {
                    setOpenOnWeekends(false);
                  }}
                >
                  Não
                </button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
