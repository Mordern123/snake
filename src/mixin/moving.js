import { GRID_SIZE } from "../constants";

export const formatPosition = (position) => {
  if (position > GRID_SIZE - 1) {
    return 0;
  }
  if (position < 0) {
    return GRID_SIZE - 1;
  }
  return position;
};
