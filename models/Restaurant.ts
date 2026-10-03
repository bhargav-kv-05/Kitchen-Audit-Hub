import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IRestaurant extends Document {
  name: string;
  address: string;
  location: {
    type: string;
    coordinates: number[]; // [longitude, latitude]
  };
  cuisine?: string;
  currentGrade?: 'A' | 'B' | 'C' | 'Pending';
  badges?: string[];
}

const RestaurantSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
      },
      coordinates: {
        type: [Number], // Array of numbers
        required: true,
      },
    },
    cuisine: { type: String },
    currentGrade: {
      type: String,
      enum: ['A', 'B', 'C', 'Pending'],
      default: 'Pending',
    },
    badges: { type: [String], default: [] },
  },
  { timestamps: true }
);

// Enable geospatial queries based on distance if we ever need it (e.g. for the Filter Sidebar)
RestaurantSchema.index({ location: '2dsphere' });

// Prevent compiling the model twice in development
const Restaurant: Model<IRestaurant> = mongoose.models.Restaurant || mongoose.model<IRestaurant>('Restaurant', RestaurantSchema);

export default Restaurant;
