const review = require("../models/reviews");
const asyncHandler = require('express-async-handler')
const { body, validationResult } = require("express-validator");


// Handle review create on POST.
exports.review_create_post = [
    // Validate and sanitize the name field.
    body("review", "review must contain at least 3 characters")
        .trim()
        .isLength({ min: 3 })
        .escape(),

    // Process request after validation and sanitization.
    asyncHandler(async (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a review object with escaped and trimmed data.
        const review_instance = new review({ review_number: req.body.number, review_text: req.body.review });
        if (!errors.isEmpty()) {
            // There are errors. Render the form again with sanitized values/error messages.
            res.render("index", {
                title: "'Electronic Health Record Translaton'",
                errors: errors.array(),
            });
            return;
        } else {
            // Data from form is valid.
            // Check if Genre with same name already exists.
            await review_instance.save();
            // New genre saved. Redirect to genre detail page.
            res.redirect('back');
        }
    }),
];

