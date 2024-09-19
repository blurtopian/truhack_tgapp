import { useState } from 'react';
import "./App.css";
import "@twa-dev/sdk";
import truhackAPI from "./apis/truhackAPI"; // Import truhackAPI
import { htmlToText } from "html-to-text";

import 'antd/dist/reset.css';  // Ant Design styles reset
import './index.css';           // Your styles

import { Button, Typography, Layout } from 'antd';
import './App.css';

const { Header, Content, Footer } = Layout;

interface Tweet {
  _id: string;
  text: string;
  hasCandidate: boolean;
  reviewedBy: string;
}

async function getNextTweet() {
  const resp = await truhackAPI.getUrl("/tweets?reviewed=false");
  const body = await resp.json();
  console.log('getNextTweet',body);
  return body.data[0];
}

function removeLineBreaks(text) {
  return text.replace(/(\r\n|\n|\r)/gm, " ");
}

const App = () => {
  const [start, setStart] = useState(false);
  const [tweet, setTweet] = useState({});
  const [reviewEnd, setReviewEnd] = useState(false);

  // Function to update the tweet classification
  const updateTweetStatus = async (tweetId: any, hasCandidate: boolean, reviewedBy: string) => {
    truhackAPI.fetchUrl(`/tweets/${tweetId}`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        hasCandidate: hasCandidate,
        reviewedBy: reviewedBy,
        is_reviewed: true,
      }),
    })
    .then(async (res: any) => {
      if (res.status === 200) {
        const response = await res.json();
        console.log('update response', response);

        const nextTweet: Tweet = await getNextTweet();
        if (nextTweet) {
          setTweet(nextTweet);
        } else {
          alert('No more tweets to review');
          setReviewEnd(true);
        }

      }
    })
  }

  const handleHasCandidate = async () => {
    await updateTweetStatus(tweet._id, true, 'user');
  }

  const handleHasNoCandidate = async () => {
    await updateTweetStatus(tweet._id, false, 'user');
  }

  const handleStart = async () => {
    setStart(!start);
    const nextTweet: Tweet = await getNextTweet();
    if (nextTweet) {
      setTweet(nextTweet);
    } else {
      alert('No more tweets to review');
      setReviewEnd(true);
    }
  };

  return (
    <Layout style={{ height: '100vh' }}>
      <Header style={{ color: 'white', textAlign: 'center', fontSize: '20px' }}>Chat Application</Header>
      <Content style={{ padding: '20px' }}>
        <div className="chat-container">
          <div className="chat-input">
            {reviewEnd ?
              <Typography.Text>Review Ended</Typography.Text>
              :
              null
            }
            {start ?
              <>
                <div className="top-text">
                  <Typography.Text>{removeLineBreaks(htmlToText(tweet.tweets_content))}</Typography.Text>
                </div>
                <div className="button-container">
                  <Button type="primary" onClick={handleHasCandidate} style={{ marginLeft: '10px' }}>
                    Contains Candidate
                  </Button>
                  <Button type="primary" onClick={handleHasNoCandidate} style={{ marginLeft: '10px' }}>
                    Does Not Contain Candidate
                  </Button>
                </div>
              </>
              :
              <Button type="primary" onClick={handleStart} style={{ marginLeft: '10px' }}>
                Start
              </Button>
            } 
          </div>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Simple Chat App ©2024</Footer>
    </Layout>
  );
};

export default App;
