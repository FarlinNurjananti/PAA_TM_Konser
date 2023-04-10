import { prisma } from "../../../../lib/prisma";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { id } = req.body;

    const deleteKonser = await prisma.konser.delete({
      where: {
        id: id,
      },
    });

    return res.status(200).json({ message: "Konser has been deleted!" });
  } else {
    return res.status(404).json({ message: "Your request is not allowed!" });
  }
};

export default handler;
