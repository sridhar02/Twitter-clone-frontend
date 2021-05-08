import React from 'react';

import styles from './TweetCard.module.css';
import { AiOutlineRetweet } from 'react-icons/ai';
import { FaRegHeart, FaRegEnvelope, FaRegCommentAlt } from 'react-icons/fa';

export default function TweetCard({ tweet }) {
  const { text } = tweet;
  const user = {
    username: 'sridhar02',
    name: 'JamesBond',
    profileImg:
      'https://media.gettyimages.com/photos/home-office-picture-id1193214720?k=6&m=1193214720&s=612x612&w=0&h=PG-IQkhXnBoKPFgErSLEwbDuAztvfXJjAg83tSr1RGA=',
  };

  return (
    <div className={styles.container}>
      <img
        src={user.profileImg}
        alt="user profile logo"
        className={styles.profileImg}
      />
      <div>
        <div className={styles.head}>
          <div className={styles.subHeader}>
            <p className={styles.name}>{user.name}</p>
            <p className={styles.username}>@{user.username}</p>
            <p className={styles.dot}>.</p>
            <p className={styles.time}>31s</p>
          </div>
          <div className={styles.moreOptions}>...</div>
        </div>
        {/* <p className={styles.tweetText}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p> */}
        <p className={styles.tweetText}>{text}</p>
        <div className={styles.icons}>
          <FaRegCommentAlt />
          <AiOutlineRetweet />
          <FaRegHeart />
          <FaRegEnvelope />
        </div>
      </div>
    </div>
  );
}
