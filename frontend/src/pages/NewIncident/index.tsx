import React, { useState, FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';

import './styles.css';
import { api } from '../../services/api';
import logoImg from '../../assets/logo.svg';
import { FiArrowLeft } from 'react-icons/fi';


export function NewIncident() {
  const history = useHistory();
  const ongId = localStorage.getItem('ongId');
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  const [description, setDescription] = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const payload = {
      title,
      description, 
      value,
    };

    try {
      await api.post('incidents', payload, {
        headers: { Authorization: ongId }
      });
      history.push('/profile');
    } catch {
      alert('Erro ao cadastrar caso, tente novamente.');
    }
  }

  return (
    <div className="new-incident-container">
      <div className="content">

        <section>
        <img src={logoImg} alt="Be The Hero"/>

          <h1>Cadastrar novo caso</h1>
          <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>

          <Link className="back-link" to="/profile" >
            <FiArrowLeft size={16} color="#e02041" />
            Voltar para home
          </Link>
        </section>

        <form onSubmit={handleSubmit}>
          <input
            value={title}
            placeholder="Título do caso"
            onChange={e => setTitle(e.target.value)}
          />
          <textarea
            value={description}
            placeholder="Descrição"
            onChange={e => setDescription(e.target.value)}
          />
          <input
            value={value}
            placeholder="Valor em reais"
            onChange={e => setValue(e.target.value)}
          />
          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}
