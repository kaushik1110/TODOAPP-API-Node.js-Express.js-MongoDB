const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({

    task : {
        type: String,
        required: true
    },
    complete:{
        type:Boolean,
        default: false
    },
    date:{
        type: Date,
        default: Date.now()
    }

});

module.exports = mongoose.model('list', todoSchema);