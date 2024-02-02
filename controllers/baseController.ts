import { IncomingMessage, ServerResponse } from "http";
import Model from "../database/model";
import { getRequestBody, handleError, handleSuccess } from "../helpers";


class BaseController<T, K extends Model<T>> {
  constructor(private readonly model: K) {
    this.model = model;
  }

  async create(req: IncomingMessage, res: ServerResponse) {
    try {
      const data = await getRequestBody(req);
      const result = await this.model.create<T>(data as Partial<T>).save();
      handleSuccess(res, result);
    } catch (error) {
      handleError(error, res);
    }
  }
}

export default BaseController;
