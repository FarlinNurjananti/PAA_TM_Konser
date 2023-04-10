import { prisma } from "../../../../lib/prisma";

const handler = async (req, res) => {
  if (req.method === "PUT") {
    const { id, name, description } = req.body;

    if (!name || !description) {
      return res.status(404).json({ message: "Form is required!" });
    }

    const updateKonser = await prisma.konser.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        description: description,
      },
    });
    return res.status(200).json({ message: "Konser updated successfully!" });
  } else {
    return res.status(404).json({ message: "Konser could not be modified!" });
  }
};

export default handler;
