import { Router, Response } from "express";
import { IControllerRoute } from "./route.interface";
import { inject, injectable } from "inversify";
import { ILogger } from "../logger/logger.interface";

@injectable()
export abstract class BaseController {
  private readonly _router: Router;
  constructor(private readonly logger: ILogger) {
    this._router = Router();
  }
  get router() {
    return this._router;
  }

  public send<T>(res: Response, code: number, message: T) {
    res.type('application/json')
    return res.status(code).json(message);
  }

  public ok<T>(res: Response, message: T) {
    this.send<T>(res, 200, message);
  }

  protected bindRoutes(routes: IControllerRoute[]) {
    for (const route of routes) {
      this.logger.log(`[${route.method}] ${route.path}`);
      const handler = route.func.bind(this);
      this.router[route.method](route.path, handler);
    }
  }
}
