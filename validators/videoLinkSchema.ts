import { z } from "zod";

export const videoLinkSchema = z.object({
  videoLink: z
    .string()
    .regex(/^https:\/\/www\.youtube\.com/, "Please provide a valid YouTube link"),
});
