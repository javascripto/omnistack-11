import React, { FormEvent, useState, Dispatch, SetStateAction, ChangeEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';
import { api } from '../../services/api';
import logoImg from '../../assets/logo.svg';

export function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUf] = useState('');

  const history = useHistory();

  async function handleRegister(event: FormEvent) {
    event.preventDefault();
    const payload = {
      name,
      email,
      whatsapp,
      city,
      uf
    };

    try {
      const { data: { id }} = await api.post('ongs', payload);
      alert(`Seu ID de acesso: ${id}`);
      history.push('/');
    } catch {
      alert('Erro no cadastro, tente novamente.');
    }

  }
  function passValue(callback: Dispatch<SetStateAction<string>>) {
    return (event: ChangeEvent<HTMLInputElement>) => {
      callback(event.target.value);
    };
  }


  return (
    <div className="register-container">
      <div className="content">

        <section>
        <img src={logoImg} alt="Be The Hero"/>

          <h1>Cadastro</h1>
          <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrar os casos da sua ONG.</p>
          <Link className="back-link" to="/" >
            <FiArrowLeft size={16} color="#e02041" />
            Já tenho cadastro
          </Link>
        </section>

        <form onSubmit={handleRegister}>
          <input
            value={name}
            placeholder="Nome da ONG"
            onChange={passValue(setName)}
            />
          <input
            type="email"
            value={email}
            placeholder="E-mail"
            onChange={passValue(setEmail)}
            />
          <input
            value={whatsapp}
            placeholder="Whatsapp"
            onChange={passValue(setWhatsapp)}
            />
          <div className="input-group">
            <input
              value={city}
              placeholder="Cidade"
              onChange={passValue(setCity)}
              />
            <input
              value={uf}
              placeholder="UF"
              onChange={passValue(setUf)}
              style={{width: '80px'}}
            />
          </div>
          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
