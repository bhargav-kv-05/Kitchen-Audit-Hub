import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Restaurant from '@/models/Restaurant';

export async function GET(request: Request) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const grade = searchParams.get('grade');
    const cuisine = searchParams.get('cuisine');

    // Build the query object dynamically
    const query: any = {};
    
    if (grade) {
      query.currentGrade = grade;
    }
    
    if (cuisine) {
      // Case-insensitive search for cuisine
      query.cuisine = { $regex: new RegExp(cuisine, 'i') };
    }

    const restaurants = await Restaurant.find(query).lean();

    return NextResponse.json(restaurants, { status: 200 });
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
