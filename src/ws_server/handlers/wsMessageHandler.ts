import { Duplex } from "stream";
import { RawData } from "ws";
import Jimp from "jimp";
import robot from "robotjs";

import { commands } from "../../constants.js";
import { swapRedAndBlueChannel } from "../utils/colors.js";
import { drawCircle, drawRectangle, drawSquare } from "../utils/drawFigures.js";
import LogService from "../utils/log.service.js";

export const wsMessageHandler = (
  wsStream: Duplex,
  rawData: RawData,
  logService: LogService
) => {
  const data = rawData.toString();
  const splitData = data.split(" ");

  const command = splitData[0];

  const arg1 = Number(splitData[1]);
  const arg2 = Number(splitData[2]);

  const mouseYPos = robot.getMousePos().y;
  const mouseXPos = robot.getMousePos().x;

  const defAnswer = `${command} \0`;

  try {
    switch (command) {
      case commands.MOUSE_POS: {
        const answer = `mouse_position ${mouseXPos},${mouseYPos} \0`;
        logService.log(command, answer);
        wsStream.write(answer);
        break;
      }
      case commands.MOUSE_UP: {
        robot.moveMouse(mouseXPos, mouseYPos - arg1);
        logService.log(command, defAnswer, true);
        wsStream.write(defAnswer);
        break;
      }
      case commands.MOUSE_DOWN: {
        robot.moveMouse(mouseXPos, mouseYPos + arg1);
        logService.log(command, defAnswer, true);
        wsStream.write(defAnswer);
        break;
      }
      case commands.MOUSE_LEFT: {
        robot.moveMouse(mouseXPos - arg1, mouseYPos);
        logService.log(command, defAnswer, true);
        wsStream.write(defAnswer);
        break;
      }
      case commands.MOUSE_RIGHT: {
        robot.moveMouse(mouseXPos + arg1, mouseYPos);
        logService.log(command, defAnswer, true);
        wsStream.write(defAnswer);
        break;
      }
      case commands.SQUARE: {
        drawSquare(mouseXPos, mouseYPos, arg1);
        logService.log(command, defAnswer);
        wsStream.write(defAnswer);
        break;
      }
      case commands.RECTANGLE: {
        drawRectangle(mouseXPos, mouseYPos, arg1, arg2);
        logService.log(command, defAnswer);
        wsStream.write(defAnswer);
        break;
      }
      case commands.CIRCLE: {
        drawCircle(mouseXPos, mouseYPos, arg1);
        logService.log(command, defAnswer);
        wsStream.write(defAnswer);
        break;
      }
      case commands.SCREEN: {
        const imgSize = 200;
        const bitmap = robot.screen.capture(
          mouseXPos - imgSize / 2,
          mouseYPos - imgSize / 2,
          imgSize,
          imgSize
        );

        swapRedAndBlueChannel(bitmap);

        const img = new Jimp({
          data: bitmap.image,
          width: bitmap.width,
          height: bitmap.height,
        });

        img.getBufferAsync(Jimp.MIME_PNG).then((buffer) => {
          const base64String = buffer.toString("base64");
          wsStream.write(`prnt_scrn ${base64String} \0`);
          logService.log(command, defAnswer);
        });
        break;
      }
      default:
        break;
    }
  } catch {
    logService.error();
  }
};
