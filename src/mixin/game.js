
export const gameOver = (snake) => {
  return snake.body.find((item) => item.x === snake.head.x && item.y === snake.head.y);
};
