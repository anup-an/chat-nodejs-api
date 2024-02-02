import { ServerResponse } from "http";

export const handleError = (error: any, res: ServerResponse, statusCode = 500) => {
  res.setHeader("Content-Type", "application/json");
  const responseObject = {
    title: error.name || "ServerError",
    description: error.message || "Something went wrong. Please try again.",
    stack: process.env.NODE_ENV === "development" ? error.stack : {},
  };
  res.statusCode = statusCode;
};

export const handleSuccess = (res: ServerResponse, data: any = null) => {
  res.setHeader("Content-Type", "application/json");
  res.statusCode = 200;
  res.end(JSON.stringify({ data }));
};
