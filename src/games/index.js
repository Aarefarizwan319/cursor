import { createGame as createSnake } from './snake.js';
import { createGame as createFlappy } from './flappy.js';
import { createGame as create2048 } from './2048.js';
import { createGame as createPong } from './pong.js';
import { createGame as createBreakout } from './breakout.js';
import { createGame as createTTT } from './ttt.js';
import { createGame as createC4 } from './connect4.js';
import { createGame as createMemory } from './memory.js';
import { createGame as createRPS } from './rps.js';
import { createGame as createGuess } from './guess.js';
import { createGame as createHangman } from './hangman.js';
import { createGame as createRunner } from './runner.js';
import { createGame as createMole } from './mole.js';
import { createGame as createTiles } from './tiles.js';
import { createGame as createBalloon } from './balloon.js';
import { createGame as createSlide15 } from './slide15.js';
import { createGame as createDice } from './dice.js';
import { createGame as createFishing } from './fishing.js';
import { createGame as createDoodle } from './doodle.js';
import { createGame as createMath } from './math.js';
import { createGame as createGK } from './gk.js';
import { createGame as createMaze } from './maze.js';
import { createGame as createSpace } from './space.js';
import { createGame as createGallery } from './gallery.js';
import { createGame as createTrivia } from './trivia.js';
import { createGame as createTangram } from './tangram.js';
import { createGame as createBubble } from './bubble.js';
import { createGame as createJetpack } from './jetpack.js';
import { createGame as createScramble } from './scramble.js';
import { createGame as createDomino } from './domino.js';

function stub(title){
  return function createGame({ mount }){
    const d = document.createElement('div');
    d.style.color = 'white';
    d.style.display = 'grid';
    d.style.placeItems = 'center';
    d.style.height = '100%';
    d.textContent = `${title} coming soon`;
    mount.appendChild(d);
    return { pause(){}, resume(){}, destroy(){ mount.innerHTML=''; } };
  };
}

const registry = new Map([
  ['snake', createSnake],
  ['flappy', createFlappy],
  ['memory', createMemory],
  ['2048', create2048],
  ['pong', createPong],
  ['breakout', createBreakout],
  ['tic', createTTT],
  ['connect4', createC4],
  ['hangman', createHangman],
  ['scramble', createScramble],
  ['bubble', createBubble],
  ['break', createBreakout],
  ['runner', createRunner],
  ['helix', stub('Helix Jump')],
  ['mole', createMole],
  ['tiles', createTiles],
  ['balloon', createBalloon],
  ['slide15', createSlide15],
  ['dice', createDice],
  ['domino', createDomino],
  ['fishing', createFishing],
  ['doodle', createDoodle],
  ['math', createMath],
  ['gk', createGK],
  ['jetpack', createJetpack],
  ['maze', createMaze],
  ['space', createSpace],
  ['gallery', createGallery],
  ['tangram', createTangram],
  ['trivia', createTrivia],
  ['platformer', stub('Platformer Runner')],
  ['whack', stub('Whack-a-Mole')],
  ['scrabble', stub('Crossword/Scrabble')],
  ['rps', createRPS],
  ['guess', createGuess],
]);

export function getCreateGame(id){ return registry.get(id); }
export function listGameIds(){ return Array.from(registry.keys()); }


