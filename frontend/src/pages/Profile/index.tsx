import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import './styles.css';
import { api } from '../../services/api';
import logoImg from '../../assets/logo.svg';

export interface Incident {
  id: number;
  title: string;
  description: string;
  value: number;
  ong_id: string;
}

export function Profile() {
  const history = useHistory();
  const ongId = localStorage.getItem('ongId');
  const ongName = localStorage.getItem('ongName');
  const [incidents, setIncidents] = useState<Incident[]>([]);

  useEffect(() => {
    api
      .get<Incident[]>('profile', { headers: { Authorization: ongId }})
      .then(({data}) => setIncidents(data));
  }, [ongId]);

  const options = { style: 'currency', currency: 'BRL' };
  const numberFormatter = Intl.NumberFormat('pt-BR', options);
  const currencyPipe = (value: number) => numberFormatter.format(value);

  async function handleDeleteIncident(id: number) {
    try {
      await api.delete(`incidents/${id}`, {
        headers: { Authorization: ongId }
      });
      setIncidents(incidents.filter(i => i.id !== id));
    } catch {
      alert('Erro ao deletar caso, tente novamente.')
    }
  }

  function handleLogout() {
    localStorage.clear();
    history.push('/');
  }

  return (
    <div className="profile-container">
      <header>
        <Link to="/">
          <img src={logoImg} alt="Be the Hero"/>
        </Link>
        <span>Bem vinda, {ongName}</span>

        <Link className="button" to="incidents/new">Cadastrar novo caso</Link>
        <button onClick={handleLogout} type="button">
          <FiPower size={18} color="#e02041"/>
        </button>
      </header>

      <h1>Casos cadastrados</h1>

      <ul>
      {incidents.map(incident => (
        <li key={incident.id}>
          <strong>CASO:</strong>
          <p>{incident.title}</p>

          <strong>DESCRIÇÃO:</strong>
          <p>{incident.description}</p>

          <strong>VALOR:</strong>
          <p>{currencyPipe(incident.value)}</p>

          <button type="button" onClick={() => handleDeleteIncident(incident.id)}>
            <FiTrash2 size={20} color="#a8a8b3" />
          </button>
        </li>
      ))}
      </ul>
    </div>
  );
}
