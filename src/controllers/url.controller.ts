import { FastifyReply, FastifyRequest } from "fastify";
import { UrlService } from "../services/url.service";

export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  public getAllUrl = async (request: FastifyRequest, reply: FastifyReply) => {
    const result = await this.urlService.findAll();
    reply.send({
      data: result,
    });
  };

  public shorten = async (
    request: FastifyRequest<{ Body: { url: string } }>,
    reply: FastifyReply
  ) => {
    const { url } = request.body;
    const hasUrl = await this.urlService.findByUrl(url);

    if (hasUrl) {
      return reply.send({
        message: "URL already shortened",
      });
    }

    const code = await this.urlService.generateUniqueCode();
    const data = await this.urlService.saveUrl(url, code);

    reply.send({
      data,
      message: "Success",
    });
  };

  public redirect = async (
    request: FastifyRequest<{ Params: { code: string } }>,
    reply: FastifyReply
  ) => {
    const { code } = request.params;

    const record = await this.urlService.findByCode(code);

    if (!record) {
      return reply.code(404).send({ message: "Short URL not found" });
    }

    await this.urlService.incrementClick(code);

    return reply.redirect(record.url);
  };
}
