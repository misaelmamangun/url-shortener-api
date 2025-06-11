import { PrismaClient } from "@prisma/client";

export interface IUrlService {
  findAll(): Promise<any[]>;
  findByUrl(url: string): Promise<any | null>;
  findByCode(code: string): Promise<any | null>;
  saveUrl(url: string, code: string): Promise<any>;
  generateUniqueCode(): Promise<string>;
  incrementClick(code: string): Promise<any>;
}
