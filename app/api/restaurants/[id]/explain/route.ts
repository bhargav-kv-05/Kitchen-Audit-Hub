import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import connectToDatabase from '@/lib/mongodb';
import Restaurant from '@/models/Restaurant';
import InspectionRecord from '@/models/InspectionRecord';
import Groq from 'groq-sdk';

// Initialize Groq SDK (Requires GROQ_API_KEY in .env.local)
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid Restaurant ID' }, { status: 400 });
    }

    await connectToDatabase();
    
    // Fetch records to feed to the LLM (RAG context)
    const restaurant = await Restaurant.findById(id).lean();
    if (!restaurant) {
      return NextResponse.json({ error: 'Restaurant not found' }, { status: 404 });
    }
    
    const inspections = await InspectionRecord.find({ restaurantId: id })
      .sort({ inspectionDate: -1 })
      .limit(3) // Only feed the last 3 to keep the LLM fast and cheap
      .lean();

    // The base prompt that Member 4 will dial in later
    const prompt = `
      You are a food safety expert. Explain the following restaurant inspection data to a normal user in 2 simple sentences. 
      Restaurant: ${restaurant.name}
      Recent Inspections: ${JSON.stringify(inspections)}
    `;

    // Call Groq API (using Llama 3 for blazing fast speeds)
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt
        }
      ],
      model: "qwen/qwen3.8-27b",
    });

    const explanation = completion.choices[0]?.message?.content || "No explanation available.";

    return NextResponse.json({ explanation }, { status: 200 });

  } catch (error) {
    console.error('Groq API Error:', error);
    return NextResponse.json({ error: 'Failed to generate AI explanation' }, { status: 500 });
  }
}
