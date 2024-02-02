import pluralize from "pluralize";
import { omitFields, pascalToSnakeCase } from "../utils";
import DB from ".";

export default class Model<T> {
  id?: number;

  readonly table = pluralize(pascalToSnakeCase(this.constructor.name));

  created_at = "NOW()";

  updated_at = "NOW()";

  async save(): Promise<T> {
    let queryText: string;
    let modelObject = omitFields(this, this.id ? ["table"]: ["table", "id"]);
    modelObject = { ...modelObject, updated_at: "NOW()" };

    if (!this.id) {
      modelObject = { ...modelObject, created_at: "NOW()" };
    }

    const keys = Object.keys(modelObject);
    const values = Object.values(modelObject);
      const valueRefs = values.map((_value, index) => `$${index + 1}`);
    if (this.id) {
      queryText = `UPDATE ${this.table} SET (${keys}) = (${valueRefs}) WHERE id=${this.id} RETURNING *;`;
    } else {
      queryText = `INSERT INTO ${this.table} (${keys}) VALUES (${valueRefs}) RETURNING *;`;
    }
    
    const query = { text: queryText, values };
    return DB.query(query).then((response) => response.rows[0] as T);
  }

  create<T>(props: Partial<T>): Model<T> {
    const instance = this;
    Object.assign(instance, props);
    return instance as unknown as Model<T>;
  }
}
