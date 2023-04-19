import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/utils/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "GET") {
      return res.status(405).end();
    }
    const { movieId } = req.query;
    const movie = await prismadb.movie.findUnique({
      where: { id: movieId as string },
    });
    return res.status(200).json(movie);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}
