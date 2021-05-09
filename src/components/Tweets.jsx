import React, { useEffect, useState } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';

import TweetCard from './TweetCard';

import Styles from './Tweets.module.css';

export default function Tweets({ user }) {
  let history = useHistory();
  let { username } = useParams();
  const [tweets, setTweets] = useState([]);

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

  useEffect(() => {
    const fetchData = async () => {
      fetchTweets();
    };
    fetchData();
  }, []);

  if (tweets.length === 0) {
    return <div>Loading....</div>;
  }

  return (
    <div className={Styles.container}>
      <div className={Styles.userContainer}>
        <div>
          <img src="" alt="" />
          <button>Push Notifications</button>
          <button>Follow</button>
        </div>
        <p>{user.name}</p>
        <p>{user.username}</p>
        <div>User bio</div>
        <div className={Styles.ddf}>
          <p>personal site URL</p>
          <p>Joined where w</p>
        </div>
      </div>
      {tweets.map((tweet) => (
        <div key={tweet.id}>
          <Link to={`/tweet/${tweet.id}`} className={Styles.link}>
            <TweetCard tweet={tweet} user={user} />
          </Link>
        </div>
      ))}
    </div>
  );
}
