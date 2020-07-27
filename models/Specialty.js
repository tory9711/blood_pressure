var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var SpecialtySchema = new Schema(
    {
    title: {type: String, required: true, maxlength: 100},
    }
);

SpecialtySchema
.virtual('url')
.get(function () {
    return '/catalog/specialty/' + this._id;
});

//Export model
module.exports = mongoose.model('Specialty', SpecialtySchema);