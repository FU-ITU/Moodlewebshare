import multer from "multer";
import path from "path";
import fs from "fs/promises";
import { promisify } from "util";

const storage = multer.diskStorage({
  destination: path.join(process.cwd(), "public", "images"),
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage }).single("image");

export const config = {
  api: {
    bodyParser: false,
  },
};

const fsRename = promisify(fs.rename);

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      await promisify(upload)(req, res);

      // Multer places the file information in req.file
      const { file } = req;
      
      if (!file) {
        res.status(400).json({ error: "No file uploaded." });
        return;
      }

      const oldPath = file.path;
      const newPath = path.join(process.cwd(), "public", "images", file.originalname);

      await fsRename(oldPath, newPath);

      res.status(200).json({ imagePath: `/images/${file.originalname}` });
    } catch (error) {
      console.error("Error uploading file:", error);
      res.status(500).json({ error: "Error uploading image" });
    }
    return;
  }

  res.status(405).end();
}