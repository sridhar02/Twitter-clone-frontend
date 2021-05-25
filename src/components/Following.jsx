import React, { useState, useEffect } from 'react';
import axios from 'axios';

import FollowCard from './FollowCard';

const fetchFollowing = async (user) => {
  const response = await axios.get('/follow', {
    params: {
      followerId: user.id,
    },
  });
  return response.data;
};

function Following({ user, css }) {
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    if (user) {
      fetchFollowing(user).then((data) => setFollowing(data));
    }
  }, [user]);

  return (
    <>
      {following.map((follow) => (
        <FollowCard
          key={follow.id}
          css={css}
          image={follow.user.profileImage}
          name={follow.user.name}
          username={follow.user.username}
        />
      ))}
    </>
  );
}

export default Following;
