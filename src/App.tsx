import '@telegram-apps/telegram-ui/dist/styles.css';

import styles from './Placeholder.stories.module.css';

// Import components from the library
import { AppRoot, List, 
  FixedLayout, Button, Tabbar, Placeholder
} from '@telegram-apps/telegram-ui';

import { Icon28Chat } from '@telegram-apps/telegram-ui/dist/icons/28/chat';
import { Icon28Devices } from '@telegram-apps/telegram-ui/dist/icons/28/devices';
import { Icon28Stats } from '@telegram-apps/telegram-ui/dist/icons/28/stats';

import { useState } from 'react';
import "@twa-dev/sdk";
import truhackAPI from "./apis/truhackAPI"; // Import truhackAPI
import { TweetSection } from './components/TweetSection/TweetSection';
import { ButtonSection } from './components/ButtonSection/ButtonSection';

const tabs = [
  {
    id: 0,
    Icon: Icon28Devices,
    text: 'Devices',
  },
  {
    id: 1,
    Icon: Icon28Chat,
    text: 'Chat',
  },
  {
    id: 2,
    Icon: Icon28Stats,
    text: 'Stats',
  },
];

interface Tweet {
  _id: string;
  tweets_content: string;
  hasCandidate: boolean;
  reviewedBy: string;
}

async function getNextTweet() {
  const resp = await truhackAPI.getUrl("/tweets?reviewed=false");
  const body = await resp.json();
  console.log('getNextTweet',body);
  return body.data[0];
}

function removeLineBreaks(text: string) {
  return text.replace(/(\r\n|\n|\r)/gm, " ");
}

const App = () => {
  const [start, setStart] = useState(false);
  const [tweet, setTweet] = useState<Tweet | null>(null);
  const [reviewEnd, setReviewEnd] = useState(false);
  const [currentTab, setCurrentTab] = useState(tabs[0].id);

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
    if (tweet) {
      await updateTweetStatus(tweet._id, true, 'user');
    }
  }

  const handleHasNoCandidate = async () => {
    if (tweet) {
      await updateTweetStatus(tweet._id, false, 'user');
    }
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

  const args = {
    children: (
      <img
        alt="Telegram sticker"
        src="https://xelene.me/telegram.gif"
        className={styles.sticker}
      />
    ),
    header: 'Title',
    description: 'Description',
  };

  return (
    <AppRoot>
      <FixedLayout vertical="top" style={{
        padding: 16
      }}>
        <Button size="l" stretched>
          This is FixedLayout with top vertical
        </Button>
      </FixedLayout>
      <List>
        {reviewEnd ?
          <Placeholder {...args} />
          :
          null
        }
        {start ?
          <FixedLayout style={{
            padding: 32
          }}>
            <List>
              {tweet && <TweetSection tweet={tweet} />}
              <ButtonSection
                handleHasCandidate={handleHasCandidate}
                handleHasNoCandidate={handleHasNoCandidate}
              />
            </List>
          </FixedLayout>
          :
          null
        } 
      </List>
      <FixedLayout style={{
        padding: 16
      }}>
        {start ?
          <Tabbar>
          {tabs.map(({
            id,
            text,
            Icon
          }) => <Tabbar.Item key={id} text={text} selected={id === currentTab} onClick={() => setCurrentTab(id)}>
                <Icon />
              </Tabbar.Item>)}
          </Tabbar>
          :
          <Button size="l" stretched onClick={handleStart}>
            Start
          </Button>
        }
      </FixedLayout>
    </AppRoot>
  );
};

export default App;
