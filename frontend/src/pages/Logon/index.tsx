import { FiLogIn } from 'react-icons/fi'
import React, { useState, FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';

import './styles.css';
import { api } from '../../services/api';
import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';

export function Logon() {
  const history = useHistory();
  const [id, setId] = useState('');

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    try {
      const { data } = await api.post<{ name:string }>('sessions', { id });
      localStorage.setItem('ongId', id);
      localStorage.setItem('ongName', data.name);
      history.push('/profile');
    } catch {
      alert('Falha no login, tente novamente.');
    }
  }

  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoImg} alt="Be The Hero"/>

        <form onSubmit={handleLogin}>
          <h1>Faça seu logon</h1>

          <input
            value={id}
            placeholder="Sua ID"
            onChange={e => setId(e.target.value)}
          />
          <button className="button" type="submit">Entrar</button>

          <Link className="back-link" to="/register" >
            <FiLogIn size={16} color="#e02041" />
            Não tenho cadastro
          </Link>
        </form>
      </section>

      <img src={heroesImg} alt="Heroes"/>
    </div>
  );
}
