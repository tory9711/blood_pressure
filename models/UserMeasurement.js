var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserMeasurementSchema = new Schema(
    {
    measure: { type: Schema.Types.ObjectId, ref: 'Measure', required: true }, //reference to the associated book
    systolic: {type: Number, required: true},
    dyastolic: {type:Number, required: true},
    pulse: {type:Number, required: true},
    height: {type:Number, required:true},
    weight: {type:Number, required: true},
    status: {type: String, required: true, enum: ['Available', 'Maintenance', 'Loaned', 'Reserved'], default: 'Maintenance'},
    data_measure: {type: Date, default: Date.now}
    }
);

// Virtual for bookinstance's URL
UserMeasurementSchema
.virtual('url')
.get(function () {
    return '/catalog/usermeasurement/' + this._id;
});

UserMeasurementSchema
.virtual('Результат измерения давления')
.get(function () {
    var first_degree = 'Степень 1';
    var second_degree = 'Степень 2';
    var third_degree = 'Степень 3';
    var normal_degree = 'Нормальное давление';
    var low_pressure = 'Низкое давление';
    if (this.systolic >=140 && this.dyastolic >=90) {
    return first_degree;
    }
    else 
        if (this.systolic >=160 && this.dyastolic >=100) {
            return second_degree;
    }
    else 
        if (this.systolic >=180 && this.dyastolic >=110) {
            return third_degree;
        }
    else 
        if (this.systolic <=139 && this.dyastolic <=89) {
            return normal_degree;
        }
    else 
        if (this.systolic <=109 && this.dyastolic <=69) {
            return low_pressure;
        }
});

UserMeasurementSchema
.virtual('Индекс массы тела')
.get(function () {
    var IMT;
    var low_weight = 'Дефицит массы тела';
    var normal_weight = 'Нормальная масса тела';
    var excess_weight = 'Повышенная масса тела';
    var first_obesity = 'Первая степень ожирения';
    var second_obesity = 'Вторая степень ожирения';
    var third_obesity = 'Третья степень ожирения';
    IMT = (this.weight/(this.height**2))*10000;
    if ( IMT<18,5){
        return IMT + ',' + low_weight;
    }
    else 
        if ( IMT>=18,5 && IMT<=24,9) {
            return IMT + ',' + normal_weight;
        }
    else 
        if ( IMT>=25 && IMT<=29,9) {
            return IMT + ','+ excess_weight;
        }
    else 
        if ( IMT>=30 && IMT<=34,9) {
            return IMT + ','+ first_obesity;
        }   
    else 
        if ( IMT>=35 && IMT<=39,9) {
            return IMT + ','+ second_obesity;
        }
    else 
        if ( IMT>=40 ) {
            return IMT + ','+ third_obesity;
        }
});

//Export model
module.exports = mongoose.model('UserMeasurement', UserMeasurementSchema);