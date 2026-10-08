import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import connectToDatabase from '@/lib/mongodb';
import Restaurant from '@/models/Restaurant';
import InspectionRecord from '@/models/InspectionRecord';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await connectToDatabase();

    // Fetch Restaurant by string ID
    const restaurant = await Restaurant.findOne({ id }).lean();

    if (!restaurant) {
      return NextResponse.json({ error: 'Restaurant not found' }, { status: 404 });
    }

    return NextResponse.json({ restaurant, inspections: restaurant.inspectionHistory }, { status: 200 });
  } catch (error) {
    console.error('Error fetching restaurant details:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
