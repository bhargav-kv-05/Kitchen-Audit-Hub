import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IRestaurant extends Document {
  name: string;
  cuisine: string;
  address: string;
  locality: string;
  city: string;
  grade: string;
  healthScore: number;
  lastInspectionDate: string;
  inspectionStatus: string;
  distance: number;
  image: string;
  violations: any[];
  inspectionHistory: any[];
  categories: any;
  mapPosition: { x: number; y: number };
}

const RestaurantSchema: Schema = new Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    cuisine: { type: String, required: true },
    address: { type: String, required: true },
    locality: { type: String },
    city: { type: String, default: 'Hyderabad' },
    grade: { type: String, required: true },
    healthScore: { type: Number, required: true },
    lastInspectionDate: { type: String },
    inspectionStatus: { type: String },
    distance: { type: Number },
    image: { type: String },
    violations: { type: Array, default: [] },
    inspectionHistory: { type: Array, default: [] },
    categories: { type: Schema.Types.Mixed },
    mapPosition: {
      x: { type: Number },
      y: { type: Number }
    }
  },
  { timestamps: true }
);

// Prevent compiling the model twice in development
const Restaurant: Model<IRestaurant> = mongoose.models.Restaurant || mongoose.model<IRestaurant>('Restaurant', RestaurantSchema);

export default Restaurant;
