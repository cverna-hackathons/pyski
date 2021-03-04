/**
 * Arbiter is a module that
 *
 * - Observes and publishes match events
 *  + start { MatchOptions, players }
 *  + end { MatchResults, players }
 *
 * - Observes and publishes game events
 *  + progress { GameOptions, playerIdx, move }
 *  + end { GameResult, MatchResult }
 *
 * This should probably be emitted via pub/sub >> redis to allow for
 * multi server architecture
 *
 * Design:
 * Match is started (match:start), server persists match options
 * and initial state. UI receives notification (sockets) of new match.
 * This could lead to UI start displaying list of ongoing matches.
 * Game starts (game:progress) and UI receives notification to display
 * board and results or prompt for next move. If algo players
 * participate, arbiter loads and prompts algo move.
 */

import { EventEmitter } from 'events'
import { GameResult } from '.';
import { MatchOptions, MatchResults } from '../match';

export const GAME_PROGRESS = 'game:progress';
export const GAME_END = 'game:end';
export const MATCH_START = 'match:start';
export const MATCH_END = 'match:end';
export const arbiter = new EventEmitter({
  captureRejections: true,
});

arbiter.on(MATCH_START, (_options: MatchOptions) => {
  // handle match start comms
  // sockets.emit(MATCH_START, options);
})
arbiter.on(MATCH_END, (_result: MatchResults) => {
  // handle match start comms
  // sockets.emit(MATCH_END, options);
})
arbiter.on(GAME_PROGRESS, (/* gameOptions, grid, nextPlayerIndex, move */) => {
  // handle game move comms
  // sockets.emit(MATCH_START, options);
})
arbiter.on(GAME_END, (_result: GameResult) => {
  // handle game end comms
  // sockets.emit(MATCH_END, options);
})
