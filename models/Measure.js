var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var MeasureSchema = new Schema(
    {
    title: {type: String, required: true},
    patient: {type: Schema.Types.ObjectId, ref: 'Patient', required: true},
    summary: {type: String, required: true},
    isbn: {type: String, required: true},
    specialty: [{type: Schema.Types.ObjectId, ref: 'Specialty'}]
    }
);

// Virtual for book's URL
MeasureSchema
.virtual('url')
.get(function () {
    return '/catalog/measure/' + this._id;
});

//Export model
module.exports = mongoose.model('Measure', MeasureSchema);