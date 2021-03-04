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

export const arbiter = new EventEmitter({
  captureRejections: true,
})
