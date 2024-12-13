import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

import BasicHorizontal from './BasicHorizontal';
import BasicNested from './BasicNested';
import BasicStep from './BasicStep';
import BasicVertical from './BasicVertical';
import InlineStyles from './InlineStyles';
import MultipleHorizontal from './MultipleHorizontal';
import MultipleVertical from './MultipleVertical';
import NestedHorizontal from './NestedHorizontal';
import NestedVertical from './NestedVertical';
import PercentageHorizontal from './PercentageHorizontal';
import PercentageVertical from './PercentageVertical';
import SnapToPosition from './SnapToPosition';
import Subcomponent from './Subcomponent';

function App() {
  const [{ fixture: Fixture }, setFixture] = useState({
    fixture: BasicHorizontal,
  });

  return (
    <>
      <nav>
        <ul>
          <li>
            <button onClick={() => setFixture({ fixture: BasicHorizontal })}>
              BasicHorizontal
            </button>
          </li>
          <li>
            <button onClick={() => setFixture({ fixture: BasicNested })}>
              BasicNested
            </button>
          </li>
          <li>
            <button onClick={() => setFixture({ fixture: BasicStep })}>
              BasicStep
            </button>
          </li>
          <li>
            <button onClick={() => setFixture({ fixture: BasicVertical })}>
              BasicVertical
            </button>
          </li>
          <li>
            <button onClick={() => setFixture({ fixture: InlineStyles })}>
              InlineStyles
            </button>
          </li>
          <li>
            <button onClick={() => setFixture({ fixture: MultipleHorizontal })}>
              MultipleHorizontal
            </button>
          </li>
          <li>
            <button onClick={() => setFixture({ fixture: MultipleVertical })}>
              MultipleVertical
            </button>
          </li>
          <li>
            <button onClick={() => setFixture({ fixture: NestedHorizontal })}>
              NestedHorizontal
            </button>
          </li>
          <li>
            <button onClick={() => setFixture({ fixture: NestedVertical })}>
              NestedVertical
            </button>
          </li>
          <li>
            <button
              onClick={() => setFixture({ fixture: PercentageHorizontal })}
            >
              PercentageHorizontal
            </button>
          </li>
          <li>
            <button onClick={() => setFixture({ fixture: PercentageVertical })}>
              PercentageVertical
            </button>
          </li>
          <li>
            <button onClick={() => setFixture({ fixture: SnapToPosition })}>
              SnapToPosition
            </button>
          </li>
          <li>
            <button onClick={() => setFixture({ fixture: Subcomponent })}>
              Subcomponent
            </button>
          </li>
        </ul>
      </nav>

      <div id="fixture">{Fixture && <Fixture />}</div>
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
