import { prismaClient } from "@prisma/client";
declare global {
  namespace globalThis {
    var prismadb: prismaClient;
  }
}

export interface Movie {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  genre: string;
  duration: string;
  timestamp?: number;
}
