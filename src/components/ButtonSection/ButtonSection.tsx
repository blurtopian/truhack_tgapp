import React, { useState } from 'react';
import { Button } from '@telegram-apps/telegram-ui';
import { Icon20Copy } from '@telegram-apps/telegram-ui/dist/icons/20/copy';

interface ButtonSectionProps {
  handleHasCandidate: () => Promise<void>;
  handleHasNoCandidate: () => Promise<void>;
}

export const ButtonSection: React.FC<ButtonSectionProps> = ({ handleHasCandidate, handleHasNoCandidate }) => {
  return (
    <span style={{ display: 'flex', justifyContent: 'space-evenly', margin: 10 }}>
      <Button
        before={<Icon20Copy />}
        mode="filled"
        size="m"
        style={{ width: '40%' }}
        onClick={handleHasCandidate}
      >
        Yes
      </Button>
      <Button
        before={<Icon20Copy />}
        mode="filled"
        size="m"
        style={{ width: '40%' }}
        onClick={handleHasNoCandidate}
      >
        No
      </Button>
    </span>
  )
};
