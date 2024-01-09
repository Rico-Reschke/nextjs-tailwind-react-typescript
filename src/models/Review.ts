import mongoose, { Schema, models } from "mongoose";


const reviewSchema = new Schema({
    body: String,
    rating: Number,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    campground: {  // Add this field to link the review to a campground
        type: Schema.Types.ObjectId,
        ref: 'Campground'
    }
});

const Review = models.Review || mongoose.model("Review", reviewSchema);
export default Review;

