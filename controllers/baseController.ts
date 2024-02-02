import { IncomingMessage, ServerResponse } from "http";
import Model from "../database/model";
import {
  getRequestBody,
} from "../helpers";

class BaseController<T, K extends Model<T>> {
  constructor(private readonly model: K) {
    this.model = model;
  }

  async create(req: IncomingMessage, res: ServerResponse) {
      const data = await getRequestBody(req);
      const result = await this.model.create<T>(data as Partial<T>).save();
      return result
  }
}

export default BaseController;
