import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  ///setup via env. variable
  const apikey =
    "mongodb+srv://kevinfuelm:SxZRRXuSojn9QWTf@moodlecode.zweplkq.mongodb.net/";
  const client = new MongoClient(apikey);
  await client.connect();
  const db = client.db("sample_mflix");

  switch (req.method) {
    case "GET":
      const data = await db
        .collection("movies")
        .find({})
        .sort({ metacritic: -1 })
        .limit(10)
        .toArray();
      res.status(200).json(data);
      res.json(data);
      break;
    case "POST":
      // Handle POST request
      break;
    case "PUT":
      // Handle PUT request
      break;
    case "DELETE":
      // Handle DELETE request
      break;
    default:
      res.status(405).json({ error: "Unsupported HTTP method" });
  }

  await client.close();
}
