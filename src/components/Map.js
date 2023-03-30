import React from 'react';
import '../styles/Map.css';
import { GRID_SIZE } from '../constants';

const Map = ({ snake, food, isStart, isGameOver, handleOnGameStart }) => {
  const squares = Array(GRID_SIZE).fill(0).map((_, index) => index);
  const { head, body } = snake;
  console.log(body)
  return (
    <div className="main-map relative mb-3">
      {
        squares.map((row) => squares.map((column) => {
          const isSnake = [head, ...body].find((item) => item.x === column && item.y === row);
          const isHead = head.x === column && head.y === row;
          const isFood = food.x === column && food.y === row;
          return (
            <div style={{background: isSnake?'#ffffff':'#161616'}} key={`${row}_${column}`} data-x={column} data-y={row}>
              { isHead && (<div className='bg-lime-300 w-full h-full rounded-full'></div>) }
              { isFood && (<div className='food bg-red-700 w-full h-full rounded-full'></div>) }
            </div>
          )
        }))
      }
      {
        !isStart && (
        <div className='flex flex-col justify-center items-center w-full h-full bg-indigo-500 opacity-75 absolute'>
           { isGameOver && (<div className='font-bold mb-2'>Game Over</div>)}
          <div className='border border-solid rounded-md px-5 py-1 bg-white cursor-pointer font-bold' onClick={() => handleOnGameStart()}>
            { isGameOver ? 'Restart' : 'Start'}
          </div>
        </div>
        )
      }
    </div>
  );
};

export default Map;