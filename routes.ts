import BaseController from "./controllers/baseController";
import User from "./models/user";

const routes = [
  {
    method: "POST",
    path: "/register",
    type: "public",
    handler: new BaseController(new User()).create.bind(new BaseController(new User())),
  },
];

export default routes;
