import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import TweetCard from './TweetCard';

import Styles from './Tweets.module.css';

export default function Tweets() {
  let { username } = useParams();
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    const fetchTweets = async () => {
      let endpoint;
      const URL = 'http://localhost:8000';
      if (username) {
        endpoint = `${URL}/tweets/?username=${username}`;
      } else {
        endpoint = `${URL}/tweets`;
      }
      const result = await (await fetch(endpoint)).json();
      setTweets(result);
    };

    fetchTweets();
  }, []);

  console.log(username, tweets);

  if (tweets.length === 0) {
    return <div>Loading....</div>;
  }

  return (
    <div className={Styles.container}>
      <h1>Tweets page</h1>
      {tweets.map((tweet) => (
        <div key={tweet.id}>
          <Link to={`/tweet/${tweet.id}`} className={Styles.link}>
            <TweetCard tweet={tweet} />
          </Link>
        </div>
      ))}
    </div>
  );
}
