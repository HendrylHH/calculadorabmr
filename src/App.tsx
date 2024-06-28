import React, { useState } from 'react';
import PGInicial from '../components/inicio';
import BMRCalc from '../components/bmr';
import './App.css';

const App: React.FC = () => {
  const [mostrarCalculadora, setMostrarCalculadora] = useState<boolean>(false);

  const handleIniciarCalculadora = () => {
    setMostrarCalculadora(true);
  };

  return (
    <div className="App">
      {!mostrarCalculadora ? (
        <PGInicial onIniciarCalculadora={handleIniciarCalculadora} />
      ) : (
        <BMRCalc />
      )}
    </div>
  );
};

export default App;
