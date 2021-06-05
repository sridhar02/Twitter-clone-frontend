import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@reach/tabs';

import TweetCard from './TweetCard';
import ProfileContainer from './ProfileContainer';

import css from './profile.module.css';
import Tweets from './UserTimeline';

const fetchUser = async (username) => {
  const response = await axios.get('/user', {
    params: {
      username,
    },
  });
  return response.data;
};

const fetchTweets = async (username, offset) => {
  const response = await axios.get('/tweets', {
    params: {
      username,
      offset,
    },
  });
  return response.data;
};

function UserTweets({ username }) {
  const [tweets, setTweets] = useState([]);
  const [offset, setOffset] = useState(0);
  const [more, setMore] = useState(true);

  const onNext = () => {
    setOffset((t) => t + 10);
  };

  useEffect(() => {
    let safe = true;
    fetchTweets(username, offset).then((data) => {
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
  }, [offset, username]);

  if (tweets.length === 0 && more) {
    return <div>Loading....</div>;
  }

  return (
    <div>
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
              <TweetCard tweet={tweet} />
            </Link>
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
}
export default function Profile({ authUser }) {
  const { username } = useParams();
  const [user, setUser] = useState('');

  useEffect(() => {
    if (username) {
      fetchUser(username).then((data) => setUser(data));
    }
  }, [username]);

  return (
    <div className={css.container}>
      <div className={css.profileContainer}>
        <ProfileContainer user={user} authUser={authUser} />
      </div>
      {/* user tweets container */}
      {/* <Tweets user={user} username={username} /> */}
      <Tabs className={css.tabs}>
        <TabList className={css.tabList}>
          <Tab>Tweets</Tab>
          <Tab>Tweets & replies</Tab>
          <Tab>Media</Tab>
          <Tab>Likes</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>{user && <UserTweets username={user.username} />}</TabPanel>
          <TabPanel>Tweets & replies component</TabPanel>
          <TabPanel>Media component</TabPanel>
          <TabPanel>tab2</TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}
