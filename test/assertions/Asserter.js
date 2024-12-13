// @ts-check
import { expect } from 'vitest';
import { render } from 'vitest-browser-react';

export function asserter(jsx) {
  const splitPane = render(jsx);
  const component = splitPane.getByTestId('split-pane');

  const findPanes = () => splitPane.getByRole('region').all();

  const findTopPane = () => findPanes()[0];

  const findBottomPane = () => {
    const items = findPanes();
    return items[items.length - 1];
  };

  const findPaneByOrder = (paneString) =>
    paneString === 'first' ? findTopPane() : findBottomPane();

  const findResizers = () => splitPane.getByRole('separator').all();

  const assertStyles = (componentName, actualStyles, expectedStyles) => {
    Object.keys(expectedStyles).forEach((prop) => {
      // console.log(`${prop}: '${actualStyles[prop]}',`);
      if (expectedStyles[prop] && expectedStyles[prop] !== '') {
        // console.log(`${prop}: '${actualStyles[prop]}',`);
        expect(actualStyles[prop]).toEqual(
          expectedStyles[prop]
          //`${componentName} has incorrect css property for '${prop}'`
        );
      }
    });
    return this;
  };

  const getPaneSize = (paneString) => {
    const pane = findPaneByOrder(paneString).element();
    return pane.getBoundingClientRect();
  };

  const assertPaneStyles = (expectedStyles, paneString) => {
    const pane = findPaneByOrder(paneString).element();
    if (!('style' in pane)) {
      throw new Error('Pane does not have a style property');
    }
    return assertStyles(`${paneString} Pane`, pane.style, expectedStyles);
  };

  const assertCallbacks = (
    expectedDragStartedCallback,
    expectedDragFinishedCallback
  ) => {
    expect(expectedDragStartedCallback).toHaveBeenCalled();
    expect(expectedDragFinishedCallback).toHaveBeenCalled();
  };

  const getRootPosition = () => {
    return splitPane.baseElement.getBoundingClientRect();
  };

  const getResizerPosition = () => {
    const [resizerNode] = findResizers();
    return resizerNode.element().getBoundingClientRect();
  };

  const calculateDividerMove = (mousePositionDifference) => {
    const rootPosition = getRootPosition();
    const resizerPosition = getResizerPosition();

    // Now if we're saying "move Y up by 200 px", add 200 px to existing resizer position
    let x = resizerPosition.left - rootPosition.left;
    let y = resizerPosition.top - rootPosition.top;

    if (mousePositionDifference.x) {
      x += mousePositionDifference.x;
    }
    if (mousePositionDifference.y) {
      y += mousePositionDifference.y;
    }

    return { x, y };
  };

  const simulateDragAndDrop = async (mousePositionDifference) => {
    const diff = calculateDividerMove(mousePositionDifference);
    const [resizer] = findResizers();

    await resizer.dropTo(component, {
      sourcePosition: { x: 1, y: 1 },
      targetPosition: {
        x: diff.x ? diff.x + 1 : 0,
        y: diff.y ? diff.y + 1 : 0,
      },
    });
  };

  const assertClass = (comp, expectedClassName) => {
    expect(comp.element().className, 'Incorrect className').toContain(
      expectedClassName
    );
    return this;
  };

  return {
    assertOrientation(expectedOrientation) {
      assertClass(component, expectedOrientation);
      return this;
    },

    assertSplitPaneClass(expectedClassName) {
      assertClass(component, expectedClassName);
    },

    assertPaneClasses(expectedTopPaneClass, expectedBottomPaneClass) {
      assertClass(findTopPane(), expectedTopPaneClass);
      assertClass(findBottomPane(), expectedBottomPaneClass);
    },

    assertTopPaneClasses(expectedTopPaneClass) {
      assertClass(findTopPane(), expectedTopPaneClass);
    },

    assertBottomPaneClasses(expectedBottomPaneClass) {
      assertClass(findBottomPane(), expectedBottomPaneClass);
    },

    assertPaneContents(expectedContents) {
      const panes = findPanes();
      const values = panes.map((pane) => pane.element().textContent);
      expect(values, 'Incorrect contents for Pane').toEqual(expectedContents);
      return this;
    },

    assertContainsResizer() {
      expect(
        findResizers(),
        'Expected the SplitPane to have a single Resizer'
      ).toHaveLength(1);
      expect(
        findPanes(),
        'Expected the SplitPane to have 2 panes'
      ).toHaveLength(2);
      return this;
    },

    assertPaneWidth(expectedWidth, pane = 'first') {
      return assertPaneStyles({ width: expectedWidth }, pane);
    },

    assertPaneHeight(expectedHeight, pane = 'first') {
      return assertPaneStyles({ height: expectedHeight }, pane);
    },

    async assertResizeByDragging(
      mousePositionDifference,
      expectedDimensions,
      pane = 'first'
    ) {
      await simulateDragAndDrop(mousePositionDifference);
      const after = getPaneSize(pane);

      for (const key in expectedDimensions) {
        expect(after[key]).toBe(expectedDimensions[key]);
      }
    },

    async assertResizeCallbacks(
      expectedDragStartedCallback,
      expectedDragFinishedCallback
    ) {
      await simulateDragAndDrop(200);
      return assertCallbacks(
        expectedDragStartedCallback,
        expectedDragFinishedCallback
      );
    },

    assertResizerClasses(expectedClass) {
      assertClass(findResizers()[0], expectedClass);
    },

    assertPrimaryPanelChange(newJsx, primaryPane, secondaryPane) {
      const primary = findPaneByOrder(primaryPane).element();
      const secondary = findPaneByOrder(secondaryPane).element();

      expect(primary).toMatchObject({ style: { width: '50px' } });
      expect(secondary).toMatchObject({ style: { width: '' } });

      splitPane.rerender(newJsx);

      expect(primary).toMatchObject({ style: { width: '' } });
      expect(secondary).toMatchObject({ style: { width: '50px' } });
    },

    assertPaneWidthChange(newJsx, expectedWidth, pane = 'first') {
      splitPane.rerender(newJsx);
      return assertPaneStyles({ width: expectedWidth }, pane);
    },
  };
}
