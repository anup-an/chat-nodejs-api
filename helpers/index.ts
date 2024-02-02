import { IncomingMessage, ServerResponse } from "http";

export class NotFoundError extends Error {
  statusCode: number;
  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
    this.statusCode = 404;
  }
}

export class ServerError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ServerError";
  }
}

export const handleError = (
  error: any,
  res: ServerResponse,
  statusCode = 500
) => {
  res.setHeader("Content-Type", "application/json");
  const errorResponseObject = {
    title: error.name || "ServerError",
    description: error.message || "Something went wrong. Please try again.",
    stack: process.env.NODE_ENV === "development" ? error.stack : {},
  };
  res.statusCode = error.statusCode || statusCode;
  res.end(JSON.stringify(errorResponseObject));
};

export const handleSuccess = (res: ServerResponse, data: any = null) => {
  res.setHeader("Content-Type", "application/json");
  res.statusCode = 200;
  res.end(JSON.stringify({ data }));
};

export const getRequestBody = (req: IncomingMessage) => {
  return new Promise((resolve, reject) => {
    try {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });

      req.on("end", () => {
        resolve(JSON.parse(body));
      });
    } catch (e) {
      reject(e);
    }
  });
};
