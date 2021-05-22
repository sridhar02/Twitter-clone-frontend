import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './NewTweet.module.css';

export default function NewTweet({ fetchTweets, user }) {
  const [inputText, setInputText] = useState('');
  const testUser = {
    id: 1,
    username: 'sridhar02',
    name: 'JamesBond',
    profileImg:
      'https://media.gettyimages.com/photos/home-office-picture-id1193214720?k=6&m=1193214720&s=612x612&w=0&h=PG-IQkhXnBoKPFgErSLEwbDuAztvfXJjAg83tSr1RGA=',
  };

  const postTweet = async () => {
    const data = {
      text: inputText,
      userId: user.id,
    };
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/tweet`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (response.status === 201) {
        setInputText('');
        fetchTweets();
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
