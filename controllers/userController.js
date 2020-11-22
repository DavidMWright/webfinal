var User = require('../models/userModel');
var async = require('async');

// Display User details
exports.user_detail = function(req, res) {
    async.parallel({
        user: function(callback) {
            User.findById(req.params.id)
              .exec(callback)
        }
    }, function(err, results) {
        if (err) { return next(err); } // Error in API usage.
        if (results.author==null) { // No results.
            var err = new Error('User not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render.
        res.render('user_detail', { title: 'User Profile', user: results.user } );
    });
};
