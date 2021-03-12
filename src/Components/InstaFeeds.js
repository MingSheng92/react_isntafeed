import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Feed from './Feed'

import './instaFeeds.css'


const InstaFeeds = (props) => {
    const [feeds, setFeedsData] = useState([])

    useEffect(() => {
        // this is to avoid memory leaks
        const abortController = new AbortController();

        void async function fetchInstagramPost () {
          try{
            axios
                .get(`https://graph.instagram.com/me/media?fields=id,media_type,media_url,caption&limit=${props.limit}&access_token=${props.token}`)
                .then((resp) => {
                    setFeedsData(resp.data.data)
                })
          } catch (err) {
              console.log('error', err)
          }
        }
  
        return () => {
            // cancel pending fetch request on component unmount
            abortController.abort(); 
        };
    }, [props.limit])

    return (
        <div className="container">
            {feeds.map((feed) => (
                <Feed key={feed.id} feed={feed} />
            ))}
        </div>
    );
}

export default InstaFeeds;