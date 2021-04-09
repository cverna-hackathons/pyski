import React from 'react';

import './grid.css';
import { PLAYER_MAP } from '../constants';

interface Props {
  grid: number[][];
  isInteractive: boolean;
  nextValue: number;
  onCellClick(x: number, y: number, value: number): void;
}

export const Grid: React.FC<Props> = ({
  grid,
  isInteractive,
  nextValue,
  onCellClick,
}) => {
  return (
    <div className="wrapper">
      <div>
        <table>
          <tbody>
            {grid.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((value, colIndex) => (
                  <td key={`td-${rowIndex}-${colIndex}`}>
                    {PLAYER_MAP[value]}
                    {isInteractive && value === 0 && (
                      <div
                        className="nextPlayerValue"
                        onClick={() =>
                          onCellClick(colIndex, rowIndex, nextValue)
                        }
                      >
                        {PLAYER_MAP[nextValue]}
                      </div>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
