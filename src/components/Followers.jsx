import React, { useState, useEffect } from 'react';
import axios from 'axios';

import FollowCard from './FollowCard';

const fetchFollowers = async (user) => {
  const response = await axios.get('/follow', {
    params: {
      userId: user.id,
    },
  });
  return response.data;
};

export default function Followers({ user, css }) {
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    if (user) {
      fetchFollowers(user).then((data) => setFollowers(data));
    }
  }, [user]);

  return (
    <>
      {followers.map((follow) => (
        <FollowCard
          key={follow.id}
          css={css}
          image={follow.follower.profileImage}
          name={follow.follower.name}
          username={follow.follower.username}
        />
      ))}
    </>
  );
}
