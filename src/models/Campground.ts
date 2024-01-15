import mongoose, { Schema, models } from "mongoose";

const campgroundSchema = new Schema(
  {
    title: String,
    location: String,
    price: Number,
    description: String,
    imageUrls: [String],
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
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

const Campground = models.Campground || mongoose.model("Campground", campgroundSchema);
export default Campground;
