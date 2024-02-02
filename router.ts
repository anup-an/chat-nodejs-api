import { IncomingMessage, ServerResponse } from "http"
import routes from "./routes"
import { NotFoundError } from "./helpers";

const router = async (req: IncomingMessage, res: ServerResponse) => {
    const route = routes.find((route) => route.method === req.method && route.path === req.url)

    if (route) {
        return route.handler(req, res);
    }
    throw new NotFoundError('Endpoint not found')
}

export default router