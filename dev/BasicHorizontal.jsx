import React from 'react';
import { SplitPane } from '../src';

export default () => {
  return (
    <SplitPane split="horizontal" defaultSize={200} minSize={50} maxSize={450}>
      <div>one</div>
      <div>two</div>
    </SplitPane>
  );
};
