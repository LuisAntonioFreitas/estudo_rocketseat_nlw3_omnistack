import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

import '../styles/pages/landing.css'

import logoImg from '../images/logo.svg';

// Variáveis de Sessão
sessionStorage.setItem('@map/latitude/inicial', '-22.9752102');
sessionStorage.setItem('@map/longitude/inicial', '-43.3746088');
sessionStorage.setItem('@map/zoom/inicial', '14');
sessionStorage.setItem('@map/stylePrimary', 'outdoors-v11');
sessionStorage.setItem('@map/styleSecundary', 'satellite-streets-v11');
sessionStorage.setItem('@map/style/inicial', String(sessionStorage.getItem('@map/stylePrimary')));

sessionStorage.setItem('@map/latitude/atual', String(sessionStorage.getItem('@map/latitude/inicial')));
sessionStorage.setItem('@map/longitude/atual', String(sessionStorage.getItem('@map/longitude/inicial')));
sessionStorage.setItem('@map/zoom/atual', String(sessionStorage.getItem('@map/zoom/inicial')));
sessionStorage.setItem('@map/style/atual', String(sessionStorage.getItem('@map/style/inicial')));

function Landing() {
  return (
    <div id="page-landing">
      <div className="content-wrapper">
        <img src={logoImg} alt="Happy"/>

        <main>
          <h1>Leve felicidade para o mundo</h1>
          <p>Visite orfanatos e mude o dia de muitas crianças.</p>
        </main>

        <div className="location">
          <strong>Rio de Janeiro</strong>
          <span>Rio de Janeiro</span>
        </div>

        <Link to="/app" className="enter-app">
          <FiArrowRight size={26} color="rgba(0,0,0,0.6)"></FiArrowRight>
        </Link>
      </div>
    </div>
  );
}

export default Landing;