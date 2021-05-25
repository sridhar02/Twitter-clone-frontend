import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import styles from './NewTweet.module.css';

export default function NewTweet({ user }) {
  const [inputText, setInputText] = useState('');

  const postTweet = async () => {
    const data = {
      text: inputText,
      userId: user.id,
    };

    try {
      const response = await axios.post('/tweet', data);
      if (response.status === 201) {
        setInputText('');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <Link to={`/${user.username}`}>
        <img
          src={user.profileImage}
          alt="user profile logo"
          className={styles.profileImg}
        />
      </Link>
      <div className={styles.inputContainer}>
        <input
          placeholder="What's happening?"
          className={styles.input}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <div className={styles.divider} />
        <div className={styles.buttonsContainer}>
          <span>Other from of actions</span>
          <button className={styles.button} onClick={postTweet}>
            Tweet
          </button>
        </div>
      </div>
    </div>
  );
}
