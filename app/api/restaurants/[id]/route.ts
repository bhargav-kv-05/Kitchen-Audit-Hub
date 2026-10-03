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

    // Static Test Check: Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid Restaurant ID' }, { status: 400 });
    }

    await connectToDatabase();

    // Fetch Restaurant
    const restaurant = await Restaurant.findById(id).lean();

    if (!restaurant) {
      return NextResponse.json({ error: 'Restaurant not found' }, { status: 404 });
    }

    // Fetch Inspection History
    const inspections = await InspectionRecord.find({ restaurantId: id })
      .sort({ inspectionDate: -1 }) // Newest first
      .lean();

    return NextResponse.json({ restaurant, inspections }, { status: 200 });
  } catch (error) {
    console.error('Error fetching restaurant details:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
