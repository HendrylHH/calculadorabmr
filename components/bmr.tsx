import React, { useState, useEffect } from 'react';
import './bmr.css';

interface BMRHistorico {
  genero: string;
  peso: number;
  altura: number;
  idade: number;
  atividade: string;
  bmr: number;
}

const CalcBMR: React.FC = () => {
  const [genero, setGenero] = useState<string>('homem');
  const [peso, setPeso] = useState<number>(0);
  const [altura, setAltura] = useState<number>(0);
  const [idade, setIdade] = useState<number>(0);
  const [atividade, setAtividade] = useState<string>('sedentario');
  const [bmr, setBmr] = useState<number>(0);
  const [historico, setHistorico] = useState<BMRHistorico[]>(() => {
    const historicoSalvo = localStorage.getItem('bmrHistorico');
    return historicoSalvo ? JSON.parse(historicoSalvo) : [];
  });
  const [erro, setErro] = useState<string>('');
  const [calculado, setCalculado] = useState<boolean>(false);

  useEffect(() => {
    const historicoSalvo = localStorage.getItem('BMRHistorico');
    if (historicoSalvo) {
      setHistorico(JSON.parse(historicoSalvo));
    }
  }, []);

  const validacao = (): boolean => {
    if (peso <= 0 || altura <= 0 || idade <= 0) {
      setErro('Por gentileza, insira valores válidos para o cálculo');
      return false;
    }
    if (peso > 250 || altura > 250 || idade > 120) {
      setErro('Por gentileza, insira valores realistas: peso <= 250 kg, altura <= 250 cm, idade <= 120 anos.');
      return false;
    }
    setErro('');
    return true;
  };

  const calcularBMR = (genero: string, peso: number, altura: number, idade: number, atividade: string): number => {
    let bmrBase: number;
    if (genero === 'homem') {
      bmrBase = 88.362 + (13.397 * peso) + (4.799 * altura) - (5.677 * idade);
    } else {
      bmrBase = 447.593 + (9.247 * peso) + (3.098 * altura) - (4.330 * idade);
    }

    const atividadeMultiplicadores: { [key: string]: number } = {
      'sedentario': 1.2,
      'levemente ativo': 1.375,
      'moderadamente ativo': 1.55,
      'muito ativo': 1.725,
      'extremamente ativo': 1.9,
    };

    return bmrBase * atividadeMultiplicadores[atividade];
  };

  const tratamentoclique = () => {
    if (!validacao()) return;

    const valorBMR = calcularBMR(genero, peso, altura, idade, atividade);
    setBmr(valorBMR);
    atualizarHistorico(genero, peso, altura, idade, atividade, valorBMR);
    setCalculado(true);
  };

  const atualizarHistorico = (genero: string, peso: number, altura: number, idade: number, atividade: string, bmr: number) => {
    const novoHistorico: BMRHistorico = { genero, peso, altura, idade, atividade, bmr };
    setHistorico([...historico, novoHistorico]);
    localStorage.setItem('BMRHistorico', JSON.stringify([...historico, novoHistorico]));
    setCalculado(true);
  };

  const limparHistorico = () => {
    setHistorico([]);
    localStorage.removeItem('BMRHistorico');
  };

  return (
    <div className="bmr-calculator">
      <h1>Calculadora de BMR</h1>
      <div className="form">
        <label>
          Gênero:
          <select value={genero} onChange={(e) => setGenero(e.target.value)}>
            <option value="homem">Masculino</option>
            <option value="mulher">Feminino</option>
          </select>
        </label>
        <label>
          Peso (kg):
          <input type="number" value={peso} min="0" onChange={(e) => setPeso(Math.max(0, Number(e.target.value)))} />
        </label>
        <label>
          Altura (cm):
          <input type="number" value={altura} min="0" onChange={(e) => setAltura(Math.max(0, Number(e.target.value)))} />
        </label>
        <label>
          Idade:
          <input type="number" value={idade} min="0" onChange={(e) => setIdade(Math.max(0, Number(e.target.value)))} />
        </label>
        <label>
          Nível de Atividade:
          <select value={atividade} onChange={(e) => setAtividade(e.target.value)}>
            <option value="sedentario">Sedentário</option>
            <option value="levemente ativo">Levemente Ativo</option>
            <option value="moderadamente ativo">Moderadamente Ativo</option>
            <option value="muito ativo">Muito Ativo</option>
            <option value="extremamente ativo">Extremamente Ativo</option>
          </select>
        </label>
        {erro && <p className="erro">{erro}</p>}
        <button onClick={tratamentoclique}>Calcular BMR</button>
        {calculado && <h2>Seu BMR é: {bmr.toFixed(2)}</h2>}
        <h2>Histórico</h2>
        <ul>
          {historico.map((item, index) => (
            <li key={index}>
              {item.genero === 'homem' ? 'Masculino' : 'Feminino'} - Peso: {item.peso} kg, Altura: {item.altura} cm, Idade: {item.idade}, Nível de Atividade: {item.atividade}, BMR: {item.bmr.toFixed(2)}
            </li>
          ))}
        </ul>
        <button onClick={limparHistorico}>Limpar Histórico</button>
      </div>
    </div>
  );
};

export default CalcBMR;
