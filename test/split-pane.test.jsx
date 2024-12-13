import React, { StrictMode } from 'react';
import { describe, it, vi } from 'vitest';

import { SplitPane } from '../src/SplitPane';
import { asserter } from './assertions/Asserter';

describe('Default SplitPane', () => {
  const splitPane = (
    <SplitPane>
      <div>one</div>
      <div>two</div>
    </SplitPane>
  );

  it('should render the child panes', () => {
    const assert = asserter(splitPane);
    assert.assertPaneContents(['one', 'two']);
  });

  it('should have vertical orientation', () => {
    const assert = asserter(splitPane);
    assert.assertOrientation('vertical');
  });

  it('should contain a Resizer', () => {
    const assert = asserter(splitPane);
    assert.assertContainsResizer();
  });
});

describe('SplitPane can have a specific class', () => {
  const splitPane = (
    <SplitPane className="some-class">
      <div>one</div>
      <div>two</div>
    </SplitPane>
  );

  it('should have the specified class', () => {
    const assert = asserter(splitPane);
    assert.assertSplitPaneClass('some-class');
  });
});

describe('SplitPane can have resizing callbacks', () => {
  const onDragStartedCallback = vi.fn(() => {});
  const onDragFinishedCallback = vi.fn(() => {});

  const splitPane = (
    <SplitPane
      className="some-class"
      onDragStarted={onDragStartedCallback}
      onDragFinished={onDragFinishedCallback}
    >
      <div>one</div>
      <div>two</div>
    </SplitPane>
  );

  it('should call callbacks on resizing', async () => {
    const assert = asserter(splitPane);
    await assert.assertResizeCallbacks(
      onDragStartedCallback,
      onDragFinishedCallback
    );
  });
});

describe('Internal Panes have class', () => {
  const splitPane = (
    <SplitPane paneClassName="some-class">
      <div>one</div>
      <div>two</div>
    </SplitPane>
  );

  it('should have the specified classname', () => {
    const assert = asserter(splitPane);
    assert.assertPaneClasses('some-class', 'some-class');
  });

  it('should have the default classname', () => {
    const assert = asserter(splitPane);
    assert.assertPaneClasses('Pane1', 'Pane2');
  });
});

describe('Top/Left Pane have class', () => {
  const splitPane = (
    <SplitPane pane1ClassName="some-class">
      <div>one</div>
      <div>two</div>
    </SplitPane>
  );

  it('should have the specified classname', () => {
    const assert = asserter(splitPane);
    assert.assertTopPaneClasses('some-class');
  });

  it('should have the default classname', () => {
    const assert = asserter(splitPane);
    assert.assertTopPaneClasses('Pane1');
  });
});

describe('Bottom/Right Pane have class', () => {
  const splitPane = (
    <SplitPane pane2ClassName="some-class">
      <div>one</div>
      <div>two</div>
    </SplitPane>
  );

  it('should have the specified classname', () => {
    const assert = asserter(splitPane);
    assert.assertBottomPaneClasses('some-class');
  });

  it('should have the default classname', () => {
    const assert = asserter(splitPane);
    assert.assertBottomPaneClasses('Pane2');
  });
});

describe('Internal Resizer have class', () => {
  const splitPane = (
    <SplitPane resizerClassName="some-class">
      <div>one</div>
      <div>two</div>
    </SplitPane>
  );

  it('should have the specified classname', () => {
    const assert = asserter(splitPane);
    assert.assertResizerClasses('some-class');
  });

  it('should have the default classname', () => {
    const assert = asserter(splitPane);
    assert.assertResizerClasses('Resizer');
  });
});

describe('Component updates', () => {
  const splitPane1 = (
    <SplitPane primary="first" debug>
      <div>one</div>
      <div>two</div>
    </SplitPane>
  );
  const splitPane2 = (
    <SplitPane primary="second" debug>
      <div>one</div>
      <div>two</div>
    </SplitPane>
  );
  it('unsets the width on the non-primary panel when first', () => {
    const assert = asserter(splitPane1);
    assert.assertPrimaryPanelChange(splitPane2, 'first', 'second');
  });

  it('unsets the width on the non-primary panel when second', () => {
    const assert = asserter(splitPane2);
    assert.assertPrimaryPanelChange(splitPane1, 'second', 'first');
  });

  it('updates the width of first panel when updating size, in strict mode (#309)', () => {
    // For some reason StrictMode renders to null if it is the root of the jsx,
    // and we also need the root to be a class-based component. So this is just a complicated
    // way of getting around this problem.
    class Div extends React.Component {
      render() {
        return <div>{this.props.children}</div>;
      }
    }
    const paneWithWidth = (size) => (
      <Div>
        <StrictMode>
          <SplitPane primary="first" size={size}>
            <div>one</div>
            <div>two</div>
          </SplitPane>
        </StrictMode>
      </Div>
    );

    const assert = asserter(paneWithWidth(100));
    assert.assertPaneWidthChange(paneWithWidth(200), '200px');
  });
});
