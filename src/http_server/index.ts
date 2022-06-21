import * as fs from "fs";
import * as http from "http";
import * as path from "path";

import { statusCodes } from "../constants.js";

export const httpServer = http.createServer(function (req, res) {
  const __dirname = path.resolve(path.dirname(""));
  const filePath =
    __dirname + (req.url === "/" ? "/front/index.html" : "/front" + req.url);
  fs.readFile(filePath, function (err, data) {
    if (err) {
      res.writeHead(statusCodes.NOT_FOUND);
      res.end(JSON.stringify(err));
      return;
    }
    res.writeHead(statusCodes.SUCCESS);
    res.end(data);
  });
});
