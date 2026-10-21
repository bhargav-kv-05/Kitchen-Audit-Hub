import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Restaurant from '@/models/Restaurant';
import { restaurants } from '@/lib/restaurants';

export async function GET() {
  try {
    await connectToDatabase();
    
    // Clear out the old MVP mock data
    await Restaurant.deleteMany({});
    
    // Insert all the new UI-compatible mock data
    const newRestaurants = await Restaurant.insertMany(restaurants);
    
    return NextResponse.json({ 
      message: 'Database perfectly seeded with UI mock data!', 
      count: newRestaurants.length 
    }, { status: 200 });
  } catch (error) {
    console.error('Error seeding database:', error);
    return NextResponse.json({ error: 'Failed to seed database' }, { status: 500 });
  }
}
