import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { DetailHero } from '@/components/restaurant-detail/detail-hero'
import { HealthSection } from '@/components/restaurant-detail/health-section'
import { InspectionHistory } from '@/components/restaurant-detail/inspection-history'
import { ViolationsList } from '@/components/restaurant-detail/violations-list'
import { RestaurantCard } from '@/components/restaurant-card'
import { restaurants } from '@/lib/restaurants'
import connectToDatabase from '@/lib/mongodb'
import RestaurantModel from '@/models/Restaurant'
import { Sparkles } from 'lucide-react'
import Groq from 'groq-sdk'

type Props = { params: Promise<{ id: string }> }

export function generateStaticParams() {
  return restaurants.map((r) => ({ id: r.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  await connectToDatabase()
  const r = await RestaurantModel.findOne({ id }).lean() as any
  if (!r) return { title: 'Restaurant not found' }
  return {
    title: `${r.name} · Grade ${r.grade === 'FAILED' ? 'F' : r.grade}`,
    description: `${r.name} in ${r.locality}, ${r.city} scored ${r.healthScore}% on its latest health inspection.`,
  }
}

async function getAiExplanation(restaurant: any) {
  if (!process.env.GROQ_API_KEY) return "AI Summary is temporarily unavailable (Missing API Key).";
  
  try {
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
    const inspections = (restaurant.inspectionHistory || []).slice(0, 3);
    const prompt = `
      You are a food safety expert. Explain the following restaurant inspection data to a normal user in 2 simple sentences. 
      Restaurant: ${restaurant.name}
      Recent Inspections: ${JSON.stringify(inspections)}
    `;
    
    const completion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "qwen/qwen3.8-27b",
    });
    
    return completion.choices[0]?.message?.content || "No explanation available.";
  } catch (e) {
    console.error("Groq generation error:", e);
    return "AI Summary is temporarily unavailable.";
  }
}

export default async function RestaurantDetailPage({ params }: Props) {
  const { id } = await params
  
  await connectToDatabase()
  const restaurant = await RestaurantModel.findOne({ id }).lean() as any
  
  if (!restaurant) notFound()
  
  const aiSummary = await getAiExplanation(restaurant)

  const similar = restaurants
    .filter((r) => r.id !== restaurant.id && (r.cuisine === restaurant.cuisine || r.locality === restaurant.locality))
    .slice(0, 3)

  return (
    <div className="flex flex-col gap-8">
      <DetailHero restaurant={restaurant} />
      
      <section className="rounded-3xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="size-5 text-primary" />
          <h2 className="text-xl font-bold">AI Health Summary</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed">
          {aiSummary}
        </p>
      </section>

      <HealthSection restaurant={restaurant} />
      <div className="grid gap-8 xl:grid-cols-[1.4fr_1fr]">
        <InspectionHistory history={restaurant.inspectionHistory} />
        <ViolationsList violations={restaurant.violations} />
      </div>
      {similar.length > 0 && (
        <section aria-labelledby="similar-heading">
          <h2 id="similar-heading" className="mb-5 text-2xl font-extrabold">
            Nearby &amp; Similar
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {similar.map((r) => (
              <RestaurantCard key={r.id} restaurant={r} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
