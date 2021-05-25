import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { formatDistanceToNowStrict, parseISO } from 'date-fns';

import { AiOutlineRetweet } from 'react-icons/ai';
import { FaRegHeart, FaRegEnvelope, FaRegCommentAlt } from 'react-icons/fa';

import styles from './TweetCard.module.css';

export default function TweetCard({ tweet, user }) {
  const history = useHistory();
  const [likes, setLikes] = useState(() => tweet.likesCount);

  const { text, id, updatedAt } = tweet;

  const postLike = async (e) => {
    // e.propagation();
    e.preventDefault();
    const data = {
      tweetId: id,
      userId: user.id,
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (response.status === 201) {
        setLikes((prevState) => prevState + 1);
      }
    } catch (error) {
      alert(error);
    }
  };

  const openProfile = (e) => {
    e.preventDefault();
    history.push(`/${tweet.user.username}`);
  };

  return (
    <div className={styles.container}>
      <div onClick={(e) => openProfile(e)}>
        <img
          className={styles.profileImg}
          src={tweet.user.profileImage}
          alt="user profile logo"
        />
      </div>
      <div className={styles.tweetContainer}>
        <div className={styles.head}>
          <div className={styles.subHeader}>
            <p className={styles.name}>{tweet.user.name}</p>
            <p className={styles.username}>@{tweet.user.username}</p>
            <p className={styles.dot}>.</p>
            <p className={styles.time}>
              {formatDistanceToNowStrict(parseISO(updatedAt))}
            </p>
          </div>
          <div className={styles.moreOptions}>...</div>
        </div>
        <p className={styles.tweetText}>{text}</p>
        <div className={styles.icons}>
          <span>
            <FaRegCommentAlt />
          </span>
          <span>
            <AiOutlineRetweet />
          </span>
          <button type="button" onClick={(e) => postLike(e)}>
            <FaRegHeart />
            {likes}
          </button>
          <FaRegEnvelope />
        </div>
      </div>
    </div>
  );
}
