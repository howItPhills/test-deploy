import { Request } from "express";

export type RequestWithUriType<T> = Request<T>;
export type RequestWithBodyType<T> = Request<{}, {}, T>;
export type RequestWithQueryType<T> = Request<{}, {}, {}, T>;
export type RequestWithUriAndBodyType<T, B> = Request<T, {}, B>;
