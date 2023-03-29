import React, {useState, useEffect, useCallback} from "react";
import Header from "./components/Header";
import Score from "./components/Score";
import Map from "./components/Map";
import Actions from "./components/Actions/index";

import {
  SNAKE_INITIAL_SPEED, ARROW_RIGHT, SPACE,
  ARROW_UP, ARROW_DOWN, ARROW_LEFT, SNAKE_DELTA_SPEED, SNAKE_LIMITED_SPEED,
} from './constants';
import { formatPosition } from './mixin/moving'
import { createFood } from './mixin/food'
import { gameOver } from './mixin/game'

const directionMap = {
  [ARROW_UP]: { x: 0, y: -1 },
  [ARROW_DOWN]: { x: 0, y: 1 },
  [ARROW_LEFT]: { x: -1, y: 0 },
  [ARROW_RIGHT]: { x: 1, y: 0 },
};

const defaultSnake = {
  head: { x: 2, y: 0},
  body: [
    { x: 1, y: 0},
    { x: 0, y: 0}
  ],
  curLength: 3,
  direction: ARROW_RIGHT,
  speed: SNAKE_INITIAL_SPEED,
};

const SankeGame = () => {
  const [snake, setSnake] = useState(defaultSnake);
  const [food, setFood] = useState(() => createFood());
  const [score, setScore] = useState(0);
  const [isStart, setIsStart] = useState(false);
  const [isPause, setIsPause] = useState(false);

  const isEatFood = snake.head.x === food.x && snake.head.y === food.y;
  const isGameOver = gameOver(snake);
  const maxScore = localStorage.getItem('maxScore') || 0;

  const handleKeydown = useCallback((event) => {
    const { code } = event;
    if(code === SPACE) {
      handleOnGamePause();
      return;
    }
    handleChangeDirection(code);
  }, [snake]);

  const handleOnGameStart = () => {
    setScore(0);
    setSnake(defaultSnake);
    setIsStart(true);
    if(isGameOver) {
      setFood(createFood());
    }
  }

  const handleOnGamePause = () => {
    if(isStart) setIsPause((pre) => !pre)
  }

  const handleChangeDirection = (directionKey) => {
    if (directionKey === ARROW_UP && snake.direction !== ARROW_DOWN) {
      setSnake((prevSnake) => ({
        ...prevSnake,
        direction: ARROW_UP,
      }));
    }
    if (directionKey === ARROW_DOWN && snake.direction !== ARROW_UP) {
      setSnake((prevSnake) => ({
        ...prevSnake,
        direction: ARROW_DOWN,
      }));
    }
    if (directionKey === ARROW_LEFT && snake.direction !== ARROW_RIGHT) {
      setSnake((prevSnake) => ({
        ...prevSnake,
        direction: ARROW_LEFT,
      }));
    }
    if (directionKey === ARROW_RIGHT && snake.direction !== ARROW_LEFT) {
      setSnake((prevSnake) => ({
        ...prevSnake,
        direction: ARROW_RIGHT,
      }));
    }
  };

  useEffect(() => {
    console.log(maxScore);
  })

  useEffect(() => {
    if(isGameOver) {
      setIsStart(false);
      if(score > maxScore) {
        localStorage.setItem('maxScore', score);
      }
    }
  }, [isGameOver])

  useEffect(() => {
    window.addEventListener('keydown', handleKeydown);
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [handleKeydown]);

  useEffect(() => {
    const gameIntervalId = setInterval(() => {
      if(!isStart || isPause) return;
      setSnake((prevSnake) => {
        const curX = formatPosition(prevSnake.head.x + directionMap[prevSnake.direction].x);
        const curY = formatPosition(prevSnake.head.y + directionMap[prevSnake.direction].y);
        const newBody = [
          prevSnake.head,
          ...prevSnake.body.slice(0, prevSnake.curLength - 2),
        ];
        return ({
          ...prevSnake,
          head: {
            x: curX,
            y: curY,
          },
          body: newBody,
        });
      });
    }, snake.speed);
    return () => {
      clearInterval(gameIntervalId);
    };
  }, [snake.speed, isStart, isPause]);

  useEffect(() => {
    if(isEatFood) {
      setFood(createFood());
      setScore((score) => score = score + 1);
      setSnake((snake) => ({
        ...snake,
        curLength: snake.curLength++,
        speed: Math.max((snake.speed - SNAKE_DELTA_SPEED), SNAKE_LIMITED_SPEED),
      }));
    }
  }, [isEatFood])

  return (
    <div className="bg-black flex justify-center min-h-screen">
      <div className="mt-[35px]">
        <Header></Header>
        <Score score={score} maxScore={maxScore}></Score>
        <Map snake={snake} food={food} isStart={isStart} isGameOver={isGameOver} handleOnGameStart={handleOnGameStart}></Map>
        <Actions handleChangeDirection={handleChangeDirection} handleOnGamePause={handleOnGamePause} isPause={isPause}></Actions>
      </div>
    </div>
  )
}

export default SankeGame;