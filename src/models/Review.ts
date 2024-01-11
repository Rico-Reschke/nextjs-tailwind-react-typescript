import mongoose, { Schema, models } from "mongoose";


const reviewSchema = new Schema({
    content: String,
    rating: Number,
    author: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    campground: {
        type: Schema.Types.ObjectId,
        ref: 'Campground'
    },
},
    { timestamps: true }
);

const Review = models.Review || mongoose.model("Review", reviewSchema);
export default Review;

