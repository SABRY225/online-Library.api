const mongoose = require('mongoose');
const CardPaymantSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            required: true,
            enum:['library','Academy','Book store'],
        },
        OneMon: {
            type: Number,
            required: true,
            default:0
        },
        TwoMon: {
            type: Number,
            required: true,
            default:0
        },
        ThreeMon: {
            type: Number,
            required: true,
            default:0
        },
    },
    { timestamps: true }
);

const CardPaymant = mongoose.model('CardPaymant', CardPaymantSchema);

module.exports = CardPaymant;