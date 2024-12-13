import React from 'react';
import { describe, it } from 'vitest';
import { SplitPane } from '../src/SplitPane';
import { asserter } from './assertions/Asserter';

describe('Vertical SplitPane', () => {
  describe('Defaults', () => {
    const splitPane = (
      <SplitPane split="vertical">
        <div>one</div>
        <div>two</div>
      </SplitPane>
    );

    it('should render the SplitPane', () =>
      asserter(splitPane).assertPaneContents(['one', 'two']));

    it('should have vertical orientation', () =>
      asserter(splitPane).assertOrientation('vertical'));

    it('should contain a Resizer', () =>
      asserter(splitPane).assertContainsResizer());
  });

  describe('With defaultSize property', () => {
    const splitPane = (
      <SplitPane split="vertical" defaultSize={99}>
        <div>one</div>
        <div>two</div>
      </SplitPane>
    );

    it('should have correct width for the left Pane', () => {
      asserter(splitPane).assertPaneWidth('99px');
      asserter(splitPane).assertPaneWidth(null, 'second');
    });
  });

  describe('With size property', () => {
    it('should set the width of the primary pane', () => {
      const splitPane = (
        <SplitPane size={100}>
          <div>one</div>
          <div>two</div>
        </SplitPane>
      );
      asserter(splitPane).assertPaneWidth('100px');
    });

    it('should override the defaultSize', () => {
      const splitPane = (
        <SplitPane size={100} defaultSize={200}>
          <div>one</div>
          <div>two</div>
        </SplitPane>
      );
      asserter(splitPane).assertPaneWidth('100px');
    });
  });

  describe('With primary property set to second', () => {
    const splitPane = (
      <SplitPane split="vertical" defaultSize={99} primary="second">
        <div>one</div>
        <div>two</div>
      </SplitPane>
    );

    it('should have correct width for the right Pane', () => {
      asserter(splitPane).assertPaneWidth(null);
      asserter(splitPane).assertPaneWidth('99px', 'second');
    });
  });

  describe('Resizer move to the right and left', () => {
    const splitPane = (
      <SplitPane split="vertical" defaultSize={200} minSize={50} maxSize={450}>
        <div>one</div>
        <div>two</div>
      </SplitPane>
    );

    it('after move to right, the first pane should be larger than before', async () => {
      const moveToRight = { x: 200 };
      await asserter(splitPane).assertResizeByDragging(moveToRight, {
        width: 400,
      });
    });

    it('after move to left, the first pane should be smaller than before', async () => {
      const moveToLeft = { x: -120 };
      await asserter(splitPane).assertResizeByDragging(moveToLeft, {
        width: 80,
      });
    });

    it('after move to left, the first pane should not be smaller than `minSize`', async () => {
      const moveLeftExtreme = { x: -190 };
      await asserter(splitPane).assertResizeByDragging(moveLeftExtreme, {
        width: 50,
      });
    });

    it('after move to right, the first pane should not be larger than `minSize`', async () => {
      const moveRightExtreme = { x: 300 };
      await asserter(splitPane).assertResizeByDragging(moveRightExtreme, {
        width: 450,
      });
    });
  });

  describe('Resizer move to the right and left and primary prop is set to second', () => {
    const splitPane = (
      <SplitPane split="vertical" defaultSize={400} primary="second">
        <div>one</div>
        <div>two</div>
      </SplitPane>
    );

    const moveToRight = { x: 160 };

    it('after move to right, the second pane should be smaller then before', async () => {
      await asserter(splitPane).assertResizeByDragging(
        moveToRight,
        {
          width: 240,
        },
        'second'
      );
    });

    const moveToLeft = { x: -111 };

    it('after move to left, the second pane should be larger then before', async () => {
      await asserter(splitPane).assertResizeByDragging(
        moveToLeft,
        {
          width: 511,
        },
        'second'
      );
    });
  });

  describe('Resizer move to the right and left and step prop is set to 50px', () => {
    const splitPane = (
      <SplitPane
        split="vertical"
        defaultSize={400}
        minSize={200}
        maxSize={600}
        step={50}
      >
        <div>one</div>
        <div>two</div>
      </SplitPane>
    );

    const moveToRight = { x: 75 };

    it('after move to right by 75px, first pane should only have width 450px', async () => {
      await asserter(splitPane).assertResizeByDragging(moveToRight, {
        width: 450,
      });
    });

    const moveToLeft = { x: -75 };

    it('after move to left by 75px, first pane should only have width 350px', async () => {
      await asserter(splitPane).assertResizeByDragging(moveToLeft, {
        width: 350,
      });
    });

    const moveToRightSmall = { x: 25 };

    it('after move to right by 25px, first pane should still have width 400px', async () => {
      await asserter(splitPane).assertResizeByDragging(moveToRightSmall, {
        width: 400,
      });
    });

    const moveToLeftSmall = { x: -25 };

    it('after move to left by 75px, first pane should still have width 400px', async () => {
      await asserter(splitPane).assertResizeByDragging(moveToLeftSmall, {
        width: 400,
      });
    });
  });
});
