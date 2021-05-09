import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import styles from './Tweet.module.css';
import TweetCard from './TweetCard';

export default function Tweet({ user }) {
  let { id } = useParams();
  let history = useHistory();
  const [tweet, setTweet] = useState(null);

  const fetchTweet = async () => {
    let endpoint;
    const URL = 'http://localhost:8000';
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
