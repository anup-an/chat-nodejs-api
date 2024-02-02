import http, { IncomingMessage, ServerResponse } from "http";
import router from "./router";
import { handleError, handleSuccess } from "./helpers";

const server = http.createServer(
  async (req: IncomingMessage, res: ServerResponse) => {
    try {
      const result = await router(req, res);
      handleSuccess(res, result);
    } catch (error) {
      handleError(error, res);
    }
  }
);

server.listen(5000, () => {
  console.log("Server is listening on port 3000");
});
