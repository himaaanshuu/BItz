import mongoose from 'mongoose';

const menuItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    category: { type: String, required: true, trim: true },
    available: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const canteenSchema = new mongoose.Schema(
  {
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    timings: { type: String, required: true, trim: true },
    contactPhone: { type: String, required: true, trim: true },
    contactEmail: { type: String, required: true, trim: true, lowercase: true },
    menuItems: [menuItemSchema],
  },
  { timestamps: true }
);

const Canteen = mongoose.model('Canteen', canteenSchema);

export default Canteen;
