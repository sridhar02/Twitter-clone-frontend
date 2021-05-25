import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import Followers from './Followers';
import Following from './Following';

import css from './follow.module.css';

const fetchUser = async (username) => {
  const response = await axios.get('/user', {
    params: {
      username,
    },
  });
  return response.data;
};

export default function Follow() {
  const { username, followType } = useParams();
  const [user, setUser] = useState('');

  useEffect(() => {
    if (username) {
      fetchUser(username).then((data) => setUser(data));
    }
  }, [username]);

  let component;
  if (followType === 'followers') {
    component = <Followers user={user} css={css} />;
  } else {
    component = <Following user={user} css={css} />;
  }

  return (
    <div className={css.container}>
      <p>{username}</p>
      <p>{followType}</p>
      {component}
    </div>
  );
}
