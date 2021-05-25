import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import styles from './Tweet.module.css';
import TweetCard from './TweetCard';

const URL = `${import.meta.env.VITE_API_URL}`;

const fetchTweet = async (id) => {
  const response = await axios.get(`${URL}/tweets`, {
    params: {
      tweetId: id,
    },
  });
  return response.data;
};

export default function Tweet({ user }) {
  const { id } = useParams();
  const [tweet, setTweet] = useState(null);

  useEffect(() => {
    fetchTweet(id).then((data) => setTweet(data));
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
