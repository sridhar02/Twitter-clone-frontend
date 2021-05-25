import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function FollowCard({ css, image, name, username }) {
  const [showUnFollow] = useState(false);

  return (
    <div className={css.followerContainer}>
      <Link to={`/${username}`}>
        <img src={image} alt="follower logo" className={css.profileImage} />
      </Link>
      <div className={css.namesContainer}>
        <div className={css.nameWrapper}>
          <p>{name}</p>
          <button
            type="button"
            // onClick={handleFollow}
            className={css.button}
          >
            {showUnFollow ? 'UnFollow' : 'Follow'}
          </button>
        </div>
        <div>@ {username}</div>
      </div>
    </div>
  );
}

export default FollowCard;
