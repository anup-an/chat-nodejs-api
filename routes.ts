import { IncomingMessage, ServerResponse } from "http";

const routes = [
  {
    method: "POST",
    path: "/register",
    type: "public",
    handler: (req: IncomingMessage, res: ServerResponse) => null,
  },
];

export default routes;
