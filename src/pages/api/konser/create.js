import { prisma } from "../../../../lib/prisma";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { userId, name, description } = req.body;

    if (!name || !description) {
      return res.status(404).json({ message: "Form is required!" });
    }

    const createKonser = await prisma.konser.create({
      data: {
        userId: userId,
        name: name,
        description: description,
      },
    });

    return res.status(200).json({ message: "Konser added successfully!" });
  } else {
    return res.status(404).json({ message: "Your request is not allowed!" });
  }
};

export default handler;
