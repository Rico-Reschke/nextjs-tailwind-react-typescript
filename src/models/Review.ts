import mongoose, { Schema, models } from "mongoose";


const reviewSchema = new Schema({
    body: String,
    rating: Number,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Review = models.Review || mongoose.model("Review", reviewSchema);
export default Review;

