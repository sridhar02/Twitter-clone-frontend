import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import ProfileContainer from './ProfileContainer';

import Styles from './profile.module.css';
import Tweets from './Tweets';

const fetchUser = async (username) => {
  const response = await axios.get('/user', {
    params: {
      username,
    },
  });
  return response.data;
};

export default function Profile({ authUser }) {
  const { username } = useParams();
  const [user, setUser] = useState('');

  useEffect(() => {
    if (username) {
      fetchUser(username).then((data) => setUser(data));
    }
  }, [username]);

  return (
    <div className={Styles.container}>
      <div className={Styles.profileContainer}>
        <ProfileContainer user={user} authUser={authUser} />
      </div>
      {/* user tweets container */}
      {/* <Tweets user={user} username={username} /> */}
    </div>
  );
}
