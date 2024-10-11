const Listing = require("../models/listing");
const Review = require("../models/review");
const ExpressError = require("../utils/ExpressError");


module.exports.createReview = async(req, res, next)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);


    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;

    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success", "New Review Added");
    res.redirect(`/listings/${id}`)

    console.log("Review saved successfully");

    return next();
}

module.exports.destroyReview = async(req, res, next)=>{
    let {id, reviewId} = req.params;
    await Listing.findOneAndUpdate({id : {$pull: {reviews : reviewId } } } );
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review deleted");
    res.redirect(`/listings/${id}`);

    return next();
}