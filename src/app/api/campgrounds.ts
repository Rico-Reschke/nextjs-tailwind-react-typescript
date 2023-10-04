import { MongoClient } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

type RequestBody = {
  name: string;
  title?: string;
  role?: string;
  email: string;
  telephone?: string;
  imageUrl?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, title, role, email, telephone, imageUrl } = req.body as RequestBody;

    // Daten validieren (optional)
    if (!name || !email) {
      return res.status(400).json({ message: 'Name und Email sind erforderlich' });
    }

    // Verbindung zur MongoDB
    const client = await MongoClient.connect(process.env.MONGODB_URI!);
    const db = client.db('gtcoding');

    // Eintrag in die Datenbank hinzufügen
    const result = await db.collection('campgrounds').insertOne({
      name,
      title,
      role,
      email,
      telephone,
      imageUrl
    });

    client.close();

    // Erfolgsantwort zurückgeben
    return res.status(201).json({ message: 'Campground hinzugefügt', id: result.insertedId });
  }

  // Falls nicht POST-Methode
  res.status(405).json({ message: 'Nur POST-Anfragen werden akzeptiert' });
}