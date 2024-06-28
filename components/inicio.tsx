import React from 'react';
import './inicio.css';

interface pginicial {
  onIniciarCalculadora: () => void;
}

const PGInicial: React.FC<pginicial> = ({ onIniciarCalculadora }) => {
  return (
    <div className="inicio-container">
      <div className="menu">
        <h1>Bem-vindo à Calculadora de BMR</h1>
        <button onClick={onIniciarCalculadora}>INICIAR</button>
      </div>
    </div>
  );
};

export default PGInicial;
