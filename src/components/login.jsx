import React, { useState } from "react";
import { useHistory } from "react-router-dom"
import styles from "./login.module.css";

function Icon() {
  return (
    <svg
      className={styles.twitterLogo}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="328 355 335 276"
    >
      <path
        fill="#3BA9EE"
        d="M630 425a195 195 0 01-299 175 142 142 0 0097-30 70 70 0 01-58-47 70 70 0 0031-2 70 70 0 01-57-66 70 70 0 0028 5 70 70 0 01-18-90 195 195 0 00141 72 67 67 0 01116-62 117 117 0 0043-17 65 65 0 01-31 38 117 117 0 0039-11 65 65 0 01-32 35z"
      ></path>
    </svg>
  );
}

export default function Login() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const API_URL = 'http://localhost:8000';
    const data = { email, password };
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (response.status === 200) {
        console.log(response)
        localStorage.setItem('user',JSON.stringify(response.json()))
        history.push('/');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <Icon />
        <h2 className={styles.title}>Log in to Twitter</h2>
      </div>
      <form onSubmit={handleLogin}>
        <div className={styles.formContainer}>
          <label className={styles.label} htmlFor="email">
            Email
          </label>
          <input
            className={styles.input}
            id="email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Phone,email, or username"
          />
          <label className={styles.label} htmlFor="password">
            Password
          </label>
          <input
            className={styles.input}
            id="password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>
        <button className={styles.button}>Log in</button>
        <div className={styles.linksContainer}>
          <a href="/fp" className={styles.link}>
            {" "}
            Forgot password
          </a>
          <br />
          <a href="/signup" className={styles.link}>
            Sign up for Twitter
          </a>
        </div>
      </form>
    </div>
  );
}
