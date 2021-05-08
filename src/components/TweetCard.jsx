import React from 'react';
import { formatDistanceToNowStrict, parseISO } from 'date-fns';

import styles from './TweetCard.module.css';
import { AiOutlineRetweet } from 'react-icons/ai';
import { FaRegHeart, FaRegEnvelope, FaRegCommentAlt } from 'react-icons/fa';

export default function TweetCard({ tweet, user, fetchTweet }) {
  const {
    text,
    id,
    likesCount,
    retweetsCount,
    commentsCount,
    updatedAt,
  } = tweet;
  const testUser = {
    username: 'sridhar02',
    name: 'JamesBond',
    profileImg:
      'https://media.gettyimages.com/photos/home-office-picture-id1193214720?k=6&m=1193214720&s=612x612&w=0&h=PG-IQkhXnBoKPFgErSLEwbDuAztvfXJjAg83tSr1RGA=',
  };

  const postLike = async () => {
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
        fetchTweet();
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className={styles.container}>
      <img
        src={testUser.profileImg}
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
            {commentsCount}
          </span>
          <span>
            <AiOutlineRetweet />
            {retweetsCount}
          </span>
          <button onClick={postLike}>
            <FaRegHeart /> {likesCount}
          </button>
          <FaRegEnvelope />
        </div>
      </div>
    </div>
  );
}
