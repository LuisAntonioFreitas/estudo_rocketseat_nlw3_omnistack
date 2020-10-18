import Leaflet from 'leaflet';

//import mapMarkerImg from '../images/map-marker.svg';
import mapMarkerBorderImg from '../images/map-marker-border.png';

const mapIcon = Leaflet.icon({
  iconUrl: mapMarkerBorderImg,

  iconSize: [58, 68], // eixo: x, y | tamanho: total de x e y
  iconAnchor: [29, 68], // eixo: x, y | referencia: meio de x e final de y

  popupAnchor: [170,2]
})

export default mapIcon;