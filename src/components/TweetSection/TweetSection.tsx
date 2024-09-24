import React, { useState } from 'react';
import { Section, Placeholder } from '@telegram-apps/telegram-ui';

interface Tweet {
  _id: string;
  tweets_content: string;
  hasCandidate: boolean;
  reviewedBy: string;
}

interface TweetSectionProps {
  tweet: Tweet;
}

export const TweetSection: React.FC<TweetSectionProps> =  ({ tweet }) => {
  return (
    <Section header="Form section">
      <Placeholder>
        {tweet?.tweets_content}
      </Placeholder>
    </Section>
  )
};
