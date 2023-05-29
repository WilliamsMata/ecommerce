import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import formidable from "formidable";

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

const saveFile = async (file: formidable.File) => {
  const data = fs.readFileSync(file.filepath);
  fs.writeFileSync(`./public/${file.originalFilename}`, data);
  fs.unlinkSync(file.filepath);
};

const parseFiles = async (req: NextApiRequest) => {
  const form = new formidable.IncomingForm();
  return new Promise((resolve, reject) => {
    form.parse(req, async (err, fields, files) => {
      console.log({ err, fields, files });

      if (err) return reject(err);

      await saveFile(files.file as formidable.File);

      resolve(true);
    });
  });
};

async function uploadFile(req: NextApiRequest, res: NextApiResponse<Data>) {
  await parseFiles(req);

  return res.status(200).json({ message: "Imagen subida" });
}
