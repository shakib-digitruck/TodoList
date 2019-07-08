const mongoose = require('mongoose');

var Todo = mongoose.model('Todo', {
    name: { type: String },
    duration: { type: Number },
    status: { type: String }
});

module.exports = { Todo };
