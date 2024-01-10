import mongoose, { Schema, models } from "mongoose";


const reviewSchema = new Schema({
    body: String,
    rating: Number,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    campground: {
        type: Schema.Types.ObjectId,
        ref: 'Campground'
    }
});

const Review = models.Review || mongoose.model("Review", reviewSchema);
export default Review;

