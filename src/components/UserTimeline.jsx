import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';

import TweetCard from './TweetCard';
import css from './Tweets.module.css';
import NewTweet from './NewTweet';

const fetchTweets = async (offset) => {
  const response = await axios.get('/tweets', {
    params: {
      offset,
    },
  });
  return response.data;
};

export default function UserTimeline({ user }) {
  const [tweets, setTweets] = useState([]);
  const [offset, setOffset] = useState(0);
  const [more, setMore] = useState(true);
  const [key, setKey] = useState(0);

  const onNext = () => {
    setOffset((t) => t + 10);
  };

  useEffect(() => {
    let safe = true;
    fetchTweets(offset).then((data) => {
      if (safe) {
        if (data.length === 0) {
          setMore(false);
        } else {
          setTweets((_tweets) => _tweets.concat(data));
        }
      }
    });
    return () => {
      safe = false;
    };
  }, [offset, key]);

  if (tweets.length === 0 && more) {
    return <div>Loading....</div>;
  }

  return (
    <div className={css.container}>
      <NewTweet user={user} onSuccess={() => setKey(key + 1)} />
      <InfiniteScroll
        dataLength={tweets.length}
        next={onNext}
        loader={<h4>Loading....</h4>}
        hasMore={more}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {tweets.map((tweet) => (
          <div key={tweet.id}>
            <Link to={`/tweet/${tweet.id}`} className={css.link}>
              <TweetCard tweet={tweet} user={user} />
            </Link>
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
}
