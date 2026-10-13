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

export const dynamic = 'force-dynamic'

type Props = { params: Promise<{ id: string }> }

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
    const latestAudit = restaurant.inspectionHistory?.[0] || {};
    const violations = (restaurant.violations || []).slice(0, 3).map((v: any) => v.title).join(", ");

    const systemPrompt = `You are a certified food safety auditor for Kitchen Audit Hub (Hyderabad).
Your mission is to translate dense official hygiene inspection records into a clear, trustworthy, 2 to 3 sentence summary for consumers choosing where to order food.
Keep your tone objective, professional, and accessible to everyday consumers. Max 60 words.`;

    const userPrompt = `
Analyze the official hygiene inspection for this establishment:
- Name: ${restaurant.name} (${restaurant.locality}, Hyderabad)
- Current Health Score: ${restaurant.healthScore}% (Grade ${restaurant.grade})
- Latest Audit Status: ${latestAudit.status || 'Completed'} (${latestAudit.date || 'Recent'})
- Key Audit Observations: ${violations || 'No critical violations noted. Fully compliant with food safety standards.'}

Format:
Sentence 1: Clear safety verdict and grade context for consumers.
Sentence 2: Summary of back-of-house hygiene standards or notable observations.
Sentence 3: Practical consumer takeaway so they can order with confidence.`;

    const completion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      model: "qwen/qwen3.8-27b",
      max_tokens: 120,
      temperature: 0.3,
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
