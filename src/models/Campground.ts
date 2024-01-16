import mongoose, { Schema, models } from "mongoose";

const campgroundSchema = new Schema(
  {
    title: String,
    location: String,
    price: Number,
    description: String,
    imageUrls: [String],
    creator: {
      type: mongoose.Schema.Types.ObjectId, // Referenz auf das Benutzermodell
      ref: 'User', // Nehmen Sie an, dass Ihr Benutzermodell 'User' heißt
      required: true,
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
