import robot from "robotjs";

export const drawSquare = (
  mouseXPos: number,
  mouseYPos: number,
  arg1: number
) => {
  let currXPos = mouseXPos;
  let currYPos = mouseYPos;

  robot.mouseToggle("down");

  robot.moveMouseSmooth(currXPos, (currYPos -= arg1));
  robot.moveMouseSmooth((currXPos += arg1), currYPos);
  robot.moveMouseSmooth(currXPos, (currYPos += arg1));
  robot.moveMouseSmooth((currXPos -= arg1), currYPos);

  robot.mouseToggle("up");
};

export const drawRectangle = (
  mouseXPos: number,
  mouseYPos: number,
  arg1: number,
  arg2: number
) => {
  let currXPos = mouseXPos;
  let currYPos = mouseYPos;

  robot.mouseToggle("down");

  robot.moveMouseSmooth(currXPos, (currYPos -= arg1));
  robot.moveMouseSmooth((currXPos += arg2), currYPos);
  robot.moveMouseSmooth(currXPos, (currYPos += arg1));
  robot.moveMouseSmooth((currXPos -= arg2), currYPos);

  robot.mouseToggle("up");
};

export const drawCircle = (
  mouseXPos: number,
  mouseYPos: number,
  arg1: number
) => {
  const radius = arg1;
  robot.mouseToggle("down");

  const STEP = 0.01;
  for (let i = 0; i <= Math.PI * 2; i += STEP) {
    const x = mouseXPos + radius * Math.cos(i) - radius;
    const y = mouseYPos + radius * Math.sin(i);
    robot.dragMouse(x, y);
  }
  robot.mouseToggle("up");
};
