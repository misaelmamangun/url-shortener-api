import { FastifyInstance } from "fastify";
import { UrlController } from "../controllers/url.controller";
import { UrlService } from "../services/url.service";
import prisma from "../utils/prisma.util";

export class URLRoute {
  private controller: UrlController;

  constructor() {
    const urlService = new UrlService(prisma);
    this.controller = new UrlController(urlService);
  }

  public register = async (app: FastifyInstance) => {
    app.get("/", this.controller.getAllUrl.bind(this.controller));
    app.post("/shorten", this.controller.shorten.bind(this.controller));
    app.get("/:code", this.controller.redirect.bind(this.controller));
  };
}
