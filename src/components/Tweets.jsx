import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

import TweetCard from './TweetCard';
import Styles from './Tweets.module.css';
import Profile from './profile';

export default function Tweets({ AuthUser }) {
  const { username } = useParams();
  const [user, setUser] = useState('');
  const [tweets, setTweets] = useState([]);

  const URL = import.meta.env.VITE_API_URL;

  const fetchUser = async () => {
    try {
      const response = await axios.get(`${URL}/user/?username=${username}`);
      if (response) {
        setUser(response.data);
      }
    } catch (error) {
      alert(error);
    }
  };

  const fetchTweets = async () => {
    let endpoint;
    if (username) {
      endpoint = `${URL}/tweets/?username=${username}`;
    } else {
      endpoint = `${URL}/tweets`;
    }
    const response = await axios.get(endpoint);
    setTweets(response.data);
  };

  useEffect(() => {
    const fetchData = async () => {
      fetchTweets();
      fetchUser();
    };
    fetchData();
  }, []);

  // if (tweets.length === 0) {
  //   return <div>Loading....</div>;
  // }

  return (
    <div className={Styles.container}>
      <Profile user={user} AuthUser={AuthUser} />
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
