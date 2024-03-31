const mongoose = require('mongoose');

const docSchema = mongoose.Schema({
    id : {
        type : String,
        required: true
    },
    data: {
        type : Object,
        required: true
    },
    members: [
        {
            type: String,
            required: true
        }
    ]
});

module.exports = mongoose.model("Document",docSchema);