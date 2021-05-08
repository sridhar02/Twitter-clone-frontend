import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

import styles from "./Tweet.module.css";
import TweetCard from './TweetCard';

export default function Tweet() {
    let { id } = useParams();
    const [tweet, setTweet] = useState(null)

    useEffect(() => {
        const fetchTweet = async () => {
            let endpoint
            const URL = 'http://localhost:8000';
            if (id) {
                endpoint = `${URL}/tweets/?tweetId=${id}`
            } else {
                endpoint = `${URL}/tweets`
            }
            const result = await (await fetch(endpoint)).json();
            setTweet(result);
        };

        fetchTweet();
    }, [id]);

    console.log(id, tweet);

    if (!tweet) {
        return <div>Loading..</div>
    }

    return (
        <div className={styles.container}>
            {tweet.map(tweet =>
                <TweetCard tweet={tweet} key={tweet.id} />
            )}
        </div>
    )
}
