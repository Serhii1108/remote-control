import { RawData } from "ws";

export const wsMessageHandler = (rawData: RawData) => {
  console.log(rawData.toString());
};
