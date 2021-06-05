import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@reach/tabs';

import Followers from './Followers';
import Following from './Following';

import css from './follow.module.css';
import '@reach/tabs/styles.css';

const fetchUser = async (username) => {
  const response = await axios.get('/user', {
    params: {
      username,
    },
  });
  return response.data;
};

export default function Follow() {
  // const history = useHistory();
  const { username, followType } = useParams();
  const [user, setUser] = useState('');

  useEffect(() => {
    if (username) {
      fetchUser(username).then((data) => setUser(data));
    }
  }, [username]);

  // const changeToFollowing = () => {
  //   history.push(`/${username}/following`);
  // };

  return (
    <div className={css.container}>
      {followType}
      <Tabs className={css.tabs}>
        <TabList className={css.tabList}>
          <Tab>Followers</Tab>
          <Tab>Following</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Followers user={user} css={css} />
          </TabPanel>
          <TabPanel>
            <Following user={user} css={css} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}
