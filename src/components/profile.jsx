import React from 'react';
import { Link } from 'react-router-dom';

import faker from 'faker';

import Styles from './profile.module.css';

export default function Profile({ AuthUser, user }) {
  const img = faker.image.avatar();

  const userImage =
    'https://media.gettyimages.com/photos/home-office-picture-id1193214720?k=6&m=1193214720&s=612x612&w=0&h=PG-IQkhXnBoKPFgErSLEwbDuAztvfXJjAg83tSr1RGA=';

  const handleFollow = async () => {
    const URL = import.meta.env.VITE_API_URL;

    const data = {
      userId: AuthUser.id,
      followerId: user.id,
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
    <div className={Styles.userContainer}>
      <div className={Styles.profileImgContainer}>
        {AuthUser.name !== user.name ? (
          <>
            <img
              src={user.profileImage}
              alt="profile logo"
              className={Styles.profileImage}
            />
            <button
              type="button"
              onClick={handleFollow}
              className={Styles.button}
            >
              Follow
            </button>
          </>
        ) : (
          <>
            <img
              src={AuthUser.profileImage}
              alt=""
              className={Styles.profileImage}
            />
            <button
              type="button"
              onClick={handleEditUser}
              className={Styles.button}
            >
              Edit profile
            </button>
          </>
        )}
      </div>
      <div className={Styles.profileDetails}>
        <span className={Styles.name}>{user.name}</span>
        <span className={Styles.username}>@{user.username}</span>
        <div className={Styles.bio}>
          ᴬ ᶠʳᵉᵉ 🦜 | ᵗᵉᶜʰⁱᵉ | ˢᵖⁱʳⁱᵗᵘᵃˡ ᵇᵉⁱⁿᵍ ᵒⁿ ᵃ ʰᵘᵐᵃⁿ ʲᵒᵘʳⁿᵉʸ
        </div>
        <div className={Styles.joinContainer}>
          <div>Bengaluru, India</div>
          <div className={Styles.joinedDate}>Joined December 2020</div>
        </div>
        <div className={Styles.followContainer}>
          <Link to="/followers">
            <span className={Styles.count}>{user.followersCount}</span>
            Followers
          </Link>
          <div className={Styles.following}>
            <Link to="/following">
              <span className={Styles.count}>{user.followingCount}</span>
              Following
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
