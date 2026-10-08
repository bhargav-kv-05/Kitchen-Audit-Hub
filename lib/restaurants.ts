import { gradeFromScore, statusFromGrade } from './grades'
import type {
  CategoryScores,
  Cuisine,
  Inspection,
  InspectionOutcome,
  InspectionType,
  Restaurant,
  Violation,
  ViolationStatus,
} from './types'

interface Seed {
  id: string
  name: string
  cuisine: Cuisine
  street: string
  locality: string
  distance: number
  image: string
  history: Array<[date: string, type: InspectionType, score: number, violations: number]>
  violations: Array<[title: string, description: string, status: ViolationStatus, date: string]>
  mapPosition: { x: number; y: number }
}

const INSPECTORS = ['R. Sharma', 'A. Reddy', 'K. Iyer', 'S. Khan', 'M. Rao']

const seeds: Seed[] = [
  {
    id: 'green-harvest-cafe',
    name: 'The Green Harvest Cafe',
    cuisine: 'Healthy',
    street: 'Road No. 12',
    locality: 'Banjara Hills',
    distance: 1.2,
    image: '/images/green-harvest.png',
    history: [
      ['2026-09-26', 'Routine', 98, 1],
      ['2026-06-14', 'Routine', 94, 2],
      ['2026-03-02', 'Follow-up', 91, 3],
    ],
    violations: [
      ['Minor Food Storage Issue', 'Dry goods stored less than 6 inches off the floor.', 'Resolved', '2026-09-26'],
      ['Improper Temperature Recording', 'Walk-in cooler log missed two entries.', 'Resolved', '2026-06-14'],
      ['Cleaning Documentation', 'Daily sanitation checklist incomplete.', 'Resolved', '2026-03-02'],
    ],
    mapPosition: { x: 38, y: 52 },
  },
  {
    id: 'noodle-bistro',
    name: 'Noodle Bistro',
    cuisine: 'Asian',
    street: 'Cyber Towers Lane',
    locality: 'Hitech City',
    distance: 4.8,
    image: '/images/noodle-bistro.png',
    history: [
      ['2026-09-18', 'Routine', 92, 2],
      ['2026-05-30', 'Routine', 89, 3],
      ['2026-02-11', 'Routine', 90, 2],
    ],
    violations: [
      ['Hand Wash Station Blocked', 'Hand sink partially obstructed by equipment.', 'Resolved', '2026-09-18'],
      ['Food Label Missing', 'Two prepared sauces missing date labels.', 'Resolved', '2026-09-18'],
    ],
    mapPosition: { x: 18, y: 38 },
  },
  {
    id: 'bistro-etoile',
    name: 'Bistro Étoile',
    cuisine: 'French',
    street: 'Road No. 36',
    locality: 'Jubilee Hills',
    distance: 2.4,
    image: '/images/bistro-etoile.png',
    history: [
      ['2026-10-02', 'Routine', 96, 1],
      ['2026-07-08', 'Routine', 95, 1],
      ['2026-03-21', 'Routine', 93, 2],
    ],
    violations: [
      ['Thermometer Calibration', 'Probe thermometer not calibrated this month.', 'Resolved', '2026-10-02'],
    ],
    mapPosition: { x: 30, y: 46 },
  },
  {
    id: 'spice-route',
    name: 'Spice Route',
    cuisine: 'Indian',
    street: 'Ayyappa Society',
    locality: 'Madhapur',
    distance: 3.9,
    image: '/images/spice-route.png',
    history: [
      ['2026-09-10', 'Routine', 88, 3],
      ['2026-06-02', 'Follow-up', 84, 4],
      ['2026-04-19', 'Complaint', 78, 6],
    ],
    violations: [
      ['Cross-Contamination Risk', 'Raw poultry stored above ready-to-eat items.', 'Resolved', '2026-09-10'],
      ['Grease Trap Maintenance', 'Grease trap service overdue by two weeks.', 'Open', '2026-09-10'],
      ['Food Handler Certificate', 'One staff member certificate expired.', 'Resolved', '2026-06-02'],
    ],
    mapPosition: { x: 24, y: 44 },
  },
  {
    id: 'urban-grill',
    name: 'Urban Grill',
    cuisine: 'Continental',
    street: 'Botanical Garden Road',
    locality: 'Kondapur',
    distance: 6.1,
    image: '/images/urban-grill.png',
    history: [
      ['2026-08-28', 'Routine', 84, 4],
      ['2026-05-12', 'Routine', 86, 3],
      ['2026-01-25', 'Routine', 82, 4],
    ],
    violations: [
      ['Hot Holding Temperature', 'Gravy held at 55°C, below the 60°C requirement.', 'Open', '2026-08-28'],
      ['Ceiling Tile Damage', 'Water-damaged ceiling tile above prep area.', 'Open', '2026-08-28'],
      ['Cleaning Documentation', 'Weekly deep-clean log not signed.', 'Resolved', '2026-05-12'],
    ],
    mapPosition: { x: 12, y: 30 },
  },
  {
    id: 'fresh-bowl-kitchen',
    name: 'Fresh Bowl Kitchen',
    cuisine: 'Healthy',
    street: 'DLF Cyber City',
    locality: 'Gachibowli',
    distance: 7.3,
    image: '/images/fresh-bowl.png',
    history: [
      ['2026-09-30', 'Routine', 97, 1],
      ['2026-06-21', 'Routine', 96, 1],
      ['2026-03-09', 'Routine', 95, 2],
    ],
    violations: [
      ['Glove Use Reminder', 'Staff reminded to change gloves between tasks.', 'Resolved', '2026-09-30'],
    ],
    mapPosition: { x: 10, y: 56 },
  },
  {
    id: 'curry-leaf-house',
    name: 'Curry Leaf House',
    cuisine: 'Indian',
    street: 'Road No. 2',
    locality: 'Banjara Hills',
    distance: 1.8,
    image: '/images/curry-leaf.png',
    history: [
      ['2026-09-05', 'Routine', 91, 2],
      ['2026-05-27', 'Routine', 88, 3],
      ['2026-02-15', 'Follow-up', 85, 3],
    ],
    violations: [
      ['Pest Prevention Gap', 'Small gap under rear door needs sealing.', 'Resolved', '2026-09-05'],
      ['Improper Temperature Recording', 'Chiller log entries incomplete.', 'Resolved', '2026-05-27'],
    ],
    mapPosition: { x: 42, y: 60 },
  },
  {
    id: 'the-healthy-table',
    name: 'The Healthy Table',
    cuisine: 'Healthy',
    street: 'Film Nagar Road',
    locality: 'Jubilee Hills',
    distance: 2.9,
    image: '/images/healthy-table.png',
    history: [
      ['2026-10-05', 'Routine', 99, 0],
      ['2026-07-01', 'Routine', 98, 1],
      ['2026-03-28', 'Routine', 97, 1],
    ],
    violations: [
      ['Allergen Signage', 'Allergen menu signage updated after review.', 'Resolved', '2026-07-01'],
    ],
    mapPosition: { x: 34, y: 38 },
  },
  {
    id: 'garden-plate',
    name: 'Garden Plate',
    cuisine: 'Italian',
    street: 'Image Gardens Road',
    locality: 'Madhapur',
    distance: 4.2,
    image: '/images/garden-plate.png',
    history: [
      ['2026-08-19', 'Follow-up', 76, 6],
      ['2026-07-22', 'Routine', 72, 8],
      ['2026-03-14', 'Routine', 81, 4],
    ],
    violations: [
      ['Cold Storage Temperature', 'Prep fridge measured at 9°C (limit 5°C).', 'Open', '2026-08-19'],
      ['Cutting Board Condition', 'Deeply scored cutting boards in use.', 'Open', '2026-08-19'],
      ['Food Handler Hygiene', 'Staff without hair restraints in kitchen.', 'Resolved', '2026-07-22'],
      ['Cleaning Documentation', 'Sanitizer concentration not tested.', 'Resolved', '2026-07-22'],
    ],
    mapPosition: { x: 22, y: 50 },
  },
  {
    id: 'street-wok',
    name: 'Street Wok',
    cuisine: 'Asian',
    street: 'Kothaguda Junction',
    locality: 'Kondapur',
    distance: 5.6,
    image: '/images/street-wok.png',
    history: [
      ['2026-09-22', 'Complaint', 65, 9],
      ['2026-06-10', 'Routine', 74, 6],
      ['2026-02-04', 'Routine', 79, 5],
    ],
    violations: [
      ['Evidence of Pests', 'Rodent droppings found in dry storage area.', 'Critical', '2026-09-22'],
      ['No Hot Water at Hand Sink', 'Hand wash station lacked hot water supply.', 'Critical', '2026-09-22'],
      ['Raw Food Storage', 'Uncovered raw meat in walk-in cooler.', 'Open', '2026-09-22'],
      ['Grease Build-up', 'Excessive grease on hood filters.', 'Open', '2026-06-10'],
    ],
    mapPosition: { x: 15, y: 42 },
  },
  {
    id: 'saffron-kitchen',
    name: 'Saffron Kitchen',
    cuisine: 'Indian',
    street: 'Road No. 10',
    locality: 'Jubilee Hills',
    distance: 2.1,
    image: '/images/saffron-kitchen.png',
    history: [
      ['2026-09-14', 'Routine', 94, 2],
      ['2026-06-06', 'Routine', 93, 2],
      ['2026-02-27', 'Routine', 92, 2],
    ],
    violations: [
      ['Minor Food Storage Issue', 'Spice containers missing lids.', 'Resolved', '2026-09-14'],
      ['Cleaning Documentation', 'Tandoor cleaning log incomplete.', 'Resolved', '2026-06-06'],
    ],
    mapPosition: { x: 36, y: 44 },
  },
  {
    id: 'harvest-and-co',
    name: 'Harvest & Co.',
    cuisine: 'Continental',
    street: 'Telecom Nagar',
    locality: 'Gachibowli',
    distance: 6.8,
    image: '/images/harvest-co.png',
    history: [
      ['2026-08-30', 'Routine', 82, 4],
      ['2026-05-18', 'Routine', 85, 3],
      ['2026-01-30', 'Routine', 87, 3],
    ],
    violations: [
      ['Date Marking', 'Several prepared items not date-marked.', 'Open', '2026-08-30'],
      ['Dishwasher Temperature', 'Final rinse below required temperature.', 'Resolved', '2026-08-30'],
      ['Improper Temperature Recording', 'Freezer log gaps over weekend.', 'Resolved', '2026-05-18'],
    ],
    mapPosition: { x: 8, y: 48 },
  },
]

const clamp = (n: number) => Math.max(40, Math.min(100, Math.round(n)))

function buildCategories(score: number, offset: number): CategoryScores {
  const o = [0, -1, -3, 1, 2, -2].map((d, i) => d + ((offset + i) % 3) - 1)
  return {
    foodHandling: clamp(score + o[0]),
    kitchenHygiene: clamp(score + o[1]),
    temperatureControl: clamp(score + o[2]),
    foodStorage: clamp(score + o[3]),
    pestControl: clamp(score + o[4] + (score < 70 ? -12 : 0)),
    employeeHygiene: clamp(score + o[5]),
  }
}

function outcome(score: number): InspectionOutcome {
  if (score >= 80) return 'Passed'
  if (score >= 70) return 'Conditional'
  return 'Failed'
}

const NOTES: Record<InspectionOutcome, string> = {
  Passed: 'Establishment meets food safety standards. Minor observations discussed with the manager on site.',
  Conditional: 'Several violations noted. Corrective actions required and a follow-up inspection has been scheduled.',
  Failed: 'Critical violations observed that pose a risk to public health. Immediate corrective action ordered.',
}

export const restaurants: Restaurant[] = seeds.map((seed, index) => {
  const inspectionHistory: Inspection[] = seed.history.map(([date, type, score, violations], i) => {
    const status = outcome(score)
    return {
      id: `${seed.id}-insp-${i}`,
      date,
      type,
      score,
      grade: gradeFromScore(score),
      violations,
      status,
      inspector: INSPECTORS[(index + i) % INSPECTORS.length],
      notes: NOTES[status],
    }
  })
  const latest = inspectionHistory[0]
  const grade = gradeFromScore(latest.score)
  const violations: Violation[] = seed.violations.map(([title, description, status, date], i) => ({
    id: `${seed.id}-v-${i}`,
    title,
    description,
    status,
    date,
  }))

  return {
    id: seed.id,
    name: seed.name,
    cuisine: seed.cuisine,
    address: `${seed.street}, ${seed.locality}`,
    locality: seed.locality,
    city: 'Hyderabad',
    grade,
    healthScore: latest.score,
    lastInspectionDate: latest.date,
    inspectionStatus: statusFromGrade(grade),
    distance: seed.distance,
    image: seed.image,
    violations,
    inspectionHistory,
    categories: buildCategories(latest.score, index),
    mapPosition: seed.mapPosition,
  }
})

export const CUISINES: Cuisine[] = ['Indian', 'Asian', 'Italian', 'French', 'Healthy', 'Continental']

export const LOCALITIES = ['Banjara Hills', 'Jubilee Hills', 'Hitech City', 'Gachibowli', 'Madhapur', 'Kondapur']

export function getRestaurant(id: string) {
  return restaurants.find((r) => r.id === id)
}

export function getTopRestaurants(count = 6) {
  return [...restaurants].sort((a, b) => b.healthScore - a.healthScore).slice(0, count)
}

export const CATEGORY_LABELS: Record<keyof CategoryScores, string> = {
  foodHandling: 'Food Handling',
  kitchenHygiene: 'Kitchen Hygiene',
  temperatureControl: 'Temperature Control',
  foodStorage: 'Food Storage',
  pestControl: 'Pest Control',
  employeeHygiene: 'Employee Hygiene',
}
