export type Grade = 'A' | 'B' | 'C' | 'FAILED'

export type InspectionStatus = 'Excellent' | 'Good' | 'Needs Improvement' | 'Critical'

export type Cuisine = 'Indian' | 'Asian' | 'Italian' | 'French' | 'Healthy' | 'Continental'

export type ViolationStatus = 'Resolved' | 'Open' | 'Critical'

export type InspectionType = 'Routine' | 'Follow-up' | 'Complaint'

export type InspectionOutcome = 'Passed' | 'Conditional' | 'Failed'

export interface Violation {
  id: string
  title: string
  description: string
  status: ViolationStatus
  date: string
}

export interface Inspection {
  id: string
  date: string
  type: InspectionType
  score: number
  grade: Grade
  violations: number
  status: InspectionOutcome
  inspector: string
  notes: string
}

export interface CategoryScores {
  foodHandling: number
  kitchenHygiene: number
  temperatureControl: number
  foodStorage: number
  pestControl: number
  employeeHygiene: number
}

export interface Restaurant {
  id: string
  name: string
  cuisine: Cuisine
  address: string
  locality: string
  city: string
  grade: Grade
  healthScore: number
  lastInspectionDate: string
  inspectionStatus: InspectionStatus
  distance: number
  image: string
  violations: Violation[]
  inspectionHistory: Inspection[]
  categories: CategoryScores
  mapPosition: { x: number; y: number }
}
