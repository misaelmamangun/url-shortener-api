import { nanoid } from "nanoid";

export const generateNanoId = (length: number = 6) => {
  return nanoid(length);
};
