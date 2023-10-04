import { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import Campground from '../../models/Campground';
import { connectMongoDB } from "@/lib/mongodb";

type RequestBody = {
    title: string;
    location: string;
    price: number;
    description: string;
    image?: File | null;  // Optional, falls du Bilder unterstützen möchtest.
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Verbindung zur MongoDB herstellen, falls noch nicht verbunden
    if (mongoose.connection.readyState === 0) {
        await connectMongoDB();  // Verwende die gleiche Funktion zum Herstellen der Datenbankverbindung
    }

    // Fall: Abrufen aller Campgrounds mit der GET-Methode
    if (req.method === 'GET') {
        try {
            const campgrounds = await Campground.find();  // Alle Campgrounds abrufen
            return res.status(200).json(campgrounds);  // Änderung hier: direkt die Campgrounds zurückgeben
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Serverfehler beim Abrufen der Campgrounds' });
        }
    } 
    // Fall: Hinzufügen eines neuen Campgrounds mit der POST-Methode
    else if (req.method === 'POST') {
        const { title, location, price, description } = req.body as RequestBody;

        // Daten validieren (optional)
        if (!title || !location || price === undefined || !description) {
            return res.status(400).json({ message: 'Alle erforderlichen Felder müssen ausgefüllt werden' });
        }

        // Neuen Campground erstellen und in der Datenbank speichern
        try {
          const campground = new Campground({ title, location, price, description });
          await campground.save();

          // Erfolgsantwort zurückgeben
          return res.status(201).json({ message: 'Campground hinzugefügt', id: campground._id });
      } catch (error) {
          if (error instanceof Error) {  // Überprüfen, ob error eine Instanz von Error ist
              console.error(error.message);
              console.error(error.stack);
          } else {
              console.error(error);
          }
          return res.status(500).json({ message: 'Serverfehler beim Hinzufügen des Campgrounds', error: error instanceof Error ? error.message : 'Unknown error' });
      }
    }
    // Falls weder POST noch GET Methode
    else {
        res.status(405).json({ message: 'Nur POST und GET Anfragen werden akzeptiert' });  // Änderung hier: Anpassung der Fehlermeldung
    }
}