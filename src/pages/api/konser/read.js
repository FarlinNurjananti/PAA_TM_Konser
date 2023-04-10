import { prisma } from "../../../../lib/prisma";

const handler = async (req, res) => {
  if (req.method === "GET") {
    const allKonser = await prisma.konser.findMany();

    return res.status(200).json(allKonser);
  }
};

export default handler;
