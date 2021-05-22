import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import styles from './signup.module.css';

export default function Signup() {
  const history = useHistory();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (event) => {
    event.preventDefault();
    const API_URL = 'http://localhost:8000';
    const data = { name, username, email, password };
    try {
      const response = await fetch(`${API_URL}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (response.status === 201) {
        history.push('/login');
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Twitter Signup</h2>
      <form onSubmit={handleSignup}>
        <div className={styles.formContainer}>
          <label className={styles.label} htmlFor="name">
            Name
          </label>
          <input
            id="name"
            type="text"
            vlaue={name}
            required
            placeholder="Name"
            className={styles.input}
            onChange={(e) => setName(e.target.value)}
          />
          <label className={styles.label} htmlFor="username">
            Username
          </label>
          <input
            type="text"
            id="username"
            placeholder="Username"
            vlaue={username}
            required
            className={styles.input}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label className={styles.label} htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Name"
            value={email}
            required
            className={styles.input}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className={styles.label} htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="password"
            value={password}
            required
            className={styles.input}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className={styles.button} type="submit">
          Sign up
        </button>
        <div className={styles.linksContainer}>
          <a href="/login" className={styles.link}>
            Already have an account ?
          </a>
        </div>
      </form>
    </div>
  );
}
