import React from 'react';
import { describe, it } from 'vitest';
import { SplitPane } from '../src/SplitPane';
import { asserter } from './assertions/Asserter';

describe('Horizontal SplitPane', () => {
  describe('Defaults', () => {
    const splitPane = (
      <SplitPane split="horizontal">
        <div>one</div>
        <div>two</div>
      </SplitPane>
    );

    it('should render the SplitPane', () => {
      const assert = asserter(splitPane);
      assert.assertPaneContents(['one', 'two']);
    });

    it('should render the child panes', () => {
      const assert = asserter(splitPane);
      assert.assertPaneContents(['one', 'two']);
    });

    it('should have horizontal orientation', () => {
      const assert = asserter(splitPane);
      assert.assertOrientation('horizontal');
    });

    it('should contain a Resizer', () => {
      const assert = asserter(splitPane);
      assert.assertContainsResizer();
    });
  });

  describe('With defaultSize property', async () => {
    const splitPane = (
      <SplitPane split="horizontal" defaultSize={99}>
        <div>one</div>
        <div>two</div>
      </SplitPane>
    );

    it('should have correct height for the top Pane', async () => {
      const assert = asserter(splitPane);
      assert.assertPaneHeight('99px');
    });
  });

  describe('With primary property set to second', () => {
    const splitPane = (
      <SplitPane split="horizontal" defaultSize={99} primary="second">
        <div>one</div>
        <div>two</div>
      </SplitPane>
    );

    it('should have correct height for the bottom Pane', () => {
      const assert = asserter(splitPane);
      assert.assertPaneHeight('99px', 'second');
    });
  });

  describe('Resizer move up and down', () => {
    const splitPane = (
      <SplitPane
        split="horizontal"
        defaultSize={200}
        minSize={50}
        maxSize={450}
      >
        <div>one</div>
        <div>two</div>
      </SplitPane>
    );

    it('after move down, the first pane should be larger than before', async () => {
      const moveDown = { y: 200 };
      const assert = asserter(splitPane);
      await assert.assertResizeByDragging(moveDown, { height: 400 });
    });

    it('after move up, the first pane should be smaller than before', async () => {
      const moveUp = { y: -120 };
      const assert = asserter(splitPane);
      await assert.assertResizeByDragging(moveUp, { height: 80 });
    });

    it('after move up, the first pane should not be smaller than `minSize`', async () => {
      const moveUpExtreme = { y: -190 };
      const assert = asserter(splitPane);
      await assert.assertResizeByDragging(moveUpExtreme, { height: 50 });
    });

    it('after move down, the first pane should not be larger than `maxSize`', async () => {
      const moveDownExtreme = { y: 300 };
      const assert = asserter(splitPane);
      await assert.assertResizeByDragging(moveDownExtreme, { height: 450 });
    });
  });

  describe('Resizer move up and down and primary prop is set to second', () => {
    const splitPane = (
      <SplitPane split="horizontal" defaultSize={400} primary="second">
        <div>one</div>
        <div>two</div>
      </SplitPane>
    );

    it('after move down, the second pane should be smaller than before', async () => {
      const moveDown = { y: 160 };
      const assert = asserter(splitPane);
      await assert.assertResizeByDragging(moveDown, { height: 240 }, 'second');
    });

    it('after move up, the second pane should be larger than before', async () => {
      const moveUp = { y: -111 };
      const assert = asserter(splitPane);
      await assert.assertResizeByDragging(moveUp, { height: 511 }, 'second');
    });
  });

  describe('Resizer move up and down and step prop is set to 50px', () => {
    const splitPane = (
      <SplitPane
        split="horizontal"
        defaultSize={400}
        minSize={200}
        maxSize={600}
        step={50}
      >
        <div>one</div>
        <div>two</div>
      </SplitPane>
    );

    it('after move down by 75px, first pane should only have height 450px', async () => {
      const moveDown = { y: 75 };
      const assert = asserter(splitPane);
      await assert.assertResizeByDragging(moveDown, { height: 450 });
    });

    it('after move up by 75px, first pane should only have height 350px', async () => {
      const moveUp = { y: -75 };
      const assert = asserter(splitPane);
      await assert.assertResizeByDragging(moveUp, { height: 350 });
    });

    it('after move down by 75px, first pane should still have height 400px', async () => {
      const moveDownSmall = { y: 25 };
      const assert = asserter(splitPane);
      await assert.assertResizeByDragging(moveDownSmall, { height: 400 });
    });

    it('after move up by 75px, first pane should still have height 400px', async () => {
      const moveUpSmall = { y: -25 };
      const assert = asserter(splitPane);
      await assert.assertResizeByDragging(moveUpSmall, { height: 400 });
    });
  });
});
