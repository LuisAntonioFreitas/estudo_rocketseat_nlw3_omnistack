import React from 'react';

// Pega localização do usuário
function localUsuario() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position: Position) => {
      sessionStorage.setItem('@map/latitude/inicial', String(position.coords.latitude));
      sessionStorage.setItem('@map/longitude/inicial', String(position.coords.longitude));
      console.log("latitude: " + sessionStorage.getItem('@map/latitude/inicial'));
      console.log("longitude: " + sessionStorage.getItem('@map/longitude/inicial'));
    }, (error: any) => {}, ( { enableHighAccuracy: true, timeout: 20000, maximumAge: 0 }) );
  }
  sessionStorage.setItem('@map/latitude/atual', String(sessionStorage.getItem('@map/latitude/inicial')));
  sessionStorage.setItem('@map/longitude/atual', String(sessionStorage.getItem('@map/longitude/inicial')));
  sessionStorage.setItem('@map/zoom/atual', String(sessionStorage.getItem('@map/zoom/inicial')));
}

export default localUsuario;