import { IUrlService } from "../interfaces/url.interface";
import { PrismaClient } from "@prisma/client";
import { generateNanoId } from "../utils/nano.util";

export class UrlService implements IUrlService {
  constructor(private readonly prisma: PrismaClient) {}

  public findAll = async () => {
    return this.prisma.url.findMany({
      omit: {
        id: true,
      },
    });
  };

  public saveUrl = async (url: string, code: string) => {
    return this.prisma.url.create({
      data: {
        url,
        code,
        click: 0,
      },
    });
  };

  public findByUrl = async (url: string) => {
    return this.prisma.url.findUnique({
      where: {
        url,
      },
    });
  };

  public findByCode = async (code: string) => {
    return this.prisma.url.findUnique({
      where: {
        code,
      },
    });
  };

  public generateUniqueCode = async (): Promise<string> => {
    let code: string;
    do {
      code = await generateNanoId(6);
    } while (await this.findByCode(code));

    return code;
  };

  public incrementClick = async (code: string) => {
    return this.prisma.url.update({
      where: {
        code,
      },
      data: {
        click: {
          increment: 1,
        },
      },
    });
  };
}
