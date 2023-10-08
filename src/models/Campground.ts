import mongoose, { Schema, models } from "mongoose";

const imageSchema = new Schema({
  url: String,
  filename: String,
});

const campgroundSchema = new Schema(
  {
    title: { 
      type: String, 
      required: true 
    },
    images: [imageSchema],
    geometry: {
      type: {
        type: String,
        enum: ['Point'],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    price: { 
      type: Number, 
      required: true 
    },
    description: { 
      type: String, 
      required: true 
    },
    location: { 
      type: String, 
      required: true 
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Review',
      }
    ],
  },
  { timestamps: true }
);

const Campground = models.Campground || mongoose.model("Campground", campgroundSchema);
export default Campground;