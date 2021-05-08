import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

import NewTweet from './NewTweet';
import TweetCard from './TweetCard';

import styles from './TimeLine.module.css';

export default function TimeLine() {
  let { username } = useParams();
  const [tweets, setTweets] = useState(null);

  const fetchTweets = async () => {
    let endpoint;
    const URL = 'http://localhost:8000';
    if (username) {
      endpoint = `${URL}/tweets/?username=${username}`;
    }

    const result = await (await fetch(endpoint)).json();
    setTweets(result);
  };
  useEffect(() => {
    const fetchData = async () => {
      fetchTweets();
    };
    fetchData();
  }, []);

  if (!tweets) return <div>Loading....</div>;

  return (
    <div className={styles.container}>
      <h2>
        {username} Timeline router and ability to create a new tweet from the
        timeline
      </h2>
      <div className={styles.newTweet}>
        <NewTweet fetchTweets={fetchTweets} />
      </div>
      {/* <div className={styles.tweetsContainer}> */}
      {tweets.map((tweet) => (
        <div key={tweet.id}>
          <Link to={`/tweet/${tweet.id}`} className={styles.link}>
            <TweetCard tweet={tweet} />
          </Link>
        </div>
      ))}
      {/* </div> */}
    </div>
  );
}
