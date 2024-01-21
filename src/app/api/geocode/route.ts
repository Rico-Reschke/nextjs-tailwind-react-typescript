import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const location = req.nextUrl.searchParams.get('location');
    if (!location) {
      return new NextResponse(JSON.stringify({ error: 'Location parameter is missing' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  
    const mapboxAccessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN as any;
    try {
      const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=${mapboxAccessToken}`);
      if (!response.ok) {
        throw new Error(`Error from Mapbox API: ${response.statusText}`);
      }
      const data = await response.json();
  
      return new NextResponse(JSON.stringify(data), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error(error);
      return new NextResponse(JSON.stringify({ error: 'Server error' }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  }