import { PrismaClient } from "@prisma/client";
import { Request } from "express";
const db = new PrismaClient();

export interface Context {
  db: PrismaClient;
  req: Request;
}
export const context = {
  db,
};
