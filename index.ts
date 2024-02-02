import http, { IncomingMessage, ServerResponse } from "http";
import router from "./router";

const server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;
    res.end("success");
  }
);

server.listen(5000, () => {
  console.log("Server is listening on port 3000");
});
