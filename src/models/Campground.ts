import mongoose, { Schema } from "mongoose";

const campgroundSchema = new Schema(
  {
    title: String,
    location: String,
    price: Number,
    description: String,
    imageUrls: [String],
    geometry: {
      type: {
        type: String,
        enum: ["Point"],
        required: false,
      },
      coordinates: {
        type: [Number],
        required: false,
      },
    },
  },
  {
    timestamps: true,
  },
);

const Campground =
  mongoose.models.Campground || mongoose.model("Campground", campgroundSchema);
export default Campground;
