import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import cloudinary from "@/server/cloudinary";

type Data = {
  message: string;
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "POST":
      return uploadFile(req, res);

    default:
      return res.status(400).json({ message: "Bad request" });
  }
}

const saveFile = async (file: formidable.File): Promise<string> => {
  // const data = fs.readFileSync(file.filepath);
  // fs.writeFileSync(`./public/${file.originalFilename}`, data);
  // fs.unlinkSync(file.filepath);

  const { secure_url } = await cloudinary.uploader.upload(file.filepath, {
    folder: "Teslo-shop",
  });

  return secure_url;
};

const parseFiles = async (req: NextApiRequest): Promise<string> => {
  const form = new formidable.IncomingForm();
  return new Promise((resolve, reject) => {
    form.parse(req, async (err, fields, files) => {
      if (err) return reject(err);

      const filePath = await saveFile(files.file as formidable.File);

      resolve(filePath);
    });
  });
};

async function uploadFile(req: NextApiRequest, res: NextApiResponse<Data>) {
  const imageUrl = await parseFiles(req);

  return res.status(200).json({ message: imageUrl });
}
