import mongoose, { Schema, models } from "mongoose";

const campgroundSchema = new Schema(
  {
    title: { 
      type: String, 
      required: true 
    },
    location: { 
      type: String, 
      required: true 
    },
    price: { 
      type: Number, 
      required: true 
    },
    description: { 
      type: String, 
      required: true 
    },
  },
  { timestamps: true },
);

const Campground = models.Campground || mongoose.model("Campground", campgroundSchema);
export default Campground;