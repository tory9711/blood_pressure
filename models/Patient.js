var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PatientSchema = new Schema(
    {
    first_name: {type: String, required: true, maxlength: 100},
    family_name: {type: String, required: true, maxlength: 100},
    date_of_birth: {type: Date},
    }
);

// Virtual for patient's full name
PatientSchema
.virtual('name')
.get(function () {

// To avoid errors in cases where an patient does not have either a family name or first name
// We want to make sure we handle the exception by returning an empty string for that case

    var fullname = '';
    if (this.first_name && this.family_name) {
    fullname = this.family_name + ', ' + this.first_name
    }
    if (!this.first_name || !this.family_name) {
    fullname = '';
    }

    return fullname;
});

// Virtual for patient's URL
PatientSchema
.virtual('url')
.get(function () {
    return '/catalog/patient/' + this._id;
});

//Export model
module.exports = mongoose.model('Patient', PatientSchema);