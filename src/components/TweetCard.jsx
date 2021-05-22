import React, { useState } from 'react';
import { formatDistanceToNowStrict, parseISO } from 'date-fns';

import { AiOutlineRetweet } from 'react-icons/ai';
import { FaRegHeart, FaRegEnvelope, FaRegCommentAlt } from 'react-icons/fa';

import styles from './TweetCard.module.css';

export default function TweetCard({ tweet, user }) {
  const [likes, setLikes] = useState(() => tweet.likesCount);

  const { text, id, updatedAt } = tweet;

  const testUser = {
    username: 'sridhar02',
    name: 'JamesBond',
    profileImg:
      'https://media.gettyimages.com/photos/home-office-picture-id1193214720?k=6&m=1193214720&s=612x612&w=0&h=PG-IQkhXnBoKPFgErSLEwbDuAztvfXJjAg83tSr1RGA=',
  };

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

  return (
    <div className={styles.container}>
      <img
        src={user.profileImage}
        alt="user profile logo"
        className={styles.profileImg}
      />
      <div className={styles.tweetContainer}>
        <div className={styles.head}>
          <div className={styles.subHeader}>
            <p className={styles.name}>{user.name}</p>
            <p className={styles.username}>@{user.username}</p>
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
