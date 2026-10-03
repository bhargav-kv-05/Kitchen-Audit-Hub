import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IInspectionRecord extends Document {
  restaurantId: mongoose.Types.ObjectId;
  inspectionDate: Date;
  grade: 'A' | 'B' | 'C';
  score?: number;
  violations?: {
    code?: string;
    description?: string;
    critical?: boolean;
  }[];
  auditImages?: string[];
  inspectorId?: string;
}

const InspectionRecordSchema: Schema = new Schema(
  {
    restaurantId: { type: Schema.Types.ObjectId, ref: 'Restaurant', required: true },
    inspectionDate: { type: Date, required: true },
    grade: {
      type: String,
      enum: ['A', 'B', 'C'],
      required: true,
    },
    score: { type: Number },
    violations: [
      {
        code: { type: String },
        description: { type: String },
        critical: { type: Boolean, default: false },
      },
    ],
    auditImages: { type: [String], default: [] },
    inspectorId: { type: String },
  },
  { timestamps: true }
);

// Prevent compiling the model twice in development
const InspectionRecord: Model<IInspectionRecord> = mongoose.models.InspectionRecord || mongoose.model<IInspectionRecord>('InspectionRecord', InspectionRecordSchema);

export default InspectionRecord;
