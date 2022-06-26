import robot from "robotjs";

export default class LogService {
  log(command: string, answer: string, logMouseCoord?: boolean) {
    console.log(`\n[LOG] Command: ${command}`);
    console.log(`[LOG] Answer: ${answer}`);
    console.log(`[LOG] Status: success`);

    if (logMouseCoord) {
      const { x, y } = robot.getMousePos();
      console.log(`[LOG] New mouse coords: ${x}, ${y}`);
    }
  }

  wsListeningMessage(port: number) {
    console.log(`\nWebsocket server start on the ${port} port!`);
    console.log("Waiting for connection...");
  }

  wsConnectedMessage() {
    console.log("Websocket connected!");
  }

  error() {
    console.error(`\n[ERROR] Unexpected error`);
  }
}
