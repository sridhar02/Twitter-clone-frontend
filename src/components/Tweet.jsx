import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import styles from './Tweet.module.css';
import TweetCard from './TweetCard';

export default function Tweet({ user }) {
  const { id } = useParams();
  const [tweet, setTweet] = useState(null);

  const fetchTweet = async () => {
    let endpoint;
    const URL = `${import.meta.env.VITE_API_URL}`;
    if (id) {
      endpoint = `${URL}/tweets/?tweetId=${id}`;
    } else {
      endpoint = `${URL}/tweets`;
    }
    const result = await (await fetch(endpoint)).json();
    setTweet(result);
  };

  useEffect(() => {
    const fetchData = async () => {
      fetchTweet();
    };
    fetchData();
  }, [id]);

  if (!tweet) {
    return <div>Loading..</div>;
  }

  return (
    <div className={styles.container}>
      {tweet.map((tweet) => (
        <TweetCard
          tweet={tweet}
          key={tweet.id}
          user={user}
          fetchTweet={fetchTweet}
        />
      ))}
    </div>
  );
}
