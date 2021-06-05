import React from 'react';
import { Link } from 'react-router-dom';

import faker from 'faker';

import css from './profileContainer.module.css';

export default function ProfileContainer({ user, authUser }) {
  const img = faker.image.avatar();

  const handleFollow = async () => {
    const URL = import.meta.env.VITE_API_URL;

    const data = {
      userId: user.id,
      followerId: authUser.id,
    };
    try {
      const response = await fetch(`${URL}/follow`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (response.status === 200) {
        const res = await response.json();
        alert(res);
      }
    } catch (error) {
      alert(error);
    }
  };

  const handleEditUser = () => {};

  return (
    <div className={css.userContainer}>
      <div className={css.profileImgContainer}>
        {authUser.name !== user.name ? (
          <>
            <img
              src={user.profileImage}
              alt="profile logo"
              className={css.profileImage}
            />
            <button type="button" onClick={handleFollow} className={css.button}>
              Follow
            </button>
          </>
        ) : (
          <>
            <img
              src={authUser.profileImage}
              alt=""
              className={css.profileImage}
            />
            <button
              type="button"
              onClick={handleEditUser}
              className={css.button}
            >
              Edit profile
            </button>
          </>
        )}
      </div>
      <div className={css.profileDetails}>
        <span className={css.name}>{user.name}</span>
        <span className={css.username}>@{user.username}</span>
        <div className={css.bio}>
          ᴬ ᶠʳᵉᵉ 🦜 | ᵗᵉᶜʰⁱᵉ | ˢᵖⁱʳⁱᵗᵘᵃˡ ᵇᵉⁱⁿᵍ ᵒⁿ ᵃ ʰᵘᵐᵃⁿ ʲᵒᵘʳⁿᵉʸ
        </div>
        <div className={css.joinContainer}>
          <div>Bengaluru, India</div>
          <div className={css.joinedDate}>Joined December 2020</div>
        </div>
        <div className={css.followContainer}>
          <Link to={`/${user.username}/followers`}>
            <span className={css.count}>{user.followersCount}</span>
            Followers
          </Link>
          <div className={css.following}>
            <Link to={`/${user.username}/following`}>
              <span className={css.count}>{user.followingCount}</span>
              Following
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
