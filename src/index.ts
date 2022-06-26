import "dotenv/config";

import { httpServer } from "./http_server/index.js";
import { createWebsocketServer } from "./ws_server/server.js";

const HTTP_PORT = 3000;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

const WSS_PORT = process.env.PORT ?? 8080;

createWebsocketServer(Number(WSS_PORT));
