let mongoose = require('mongoose');

let inventorySchema = mongoose.Schema({
    product: {
        type: mongoose.Types.ObjectId,
        ref: 'product',
        required: [true, "product ID is required"],
        unique: true
    },
    stock: {
        type: Number,
        min: [0, "stock cannot be negative"],
        default: 0
    },
    reserved: {
        type: Number,
        min: [0, "reserved cannot be negative"],
        default: 0
    },
    soldCount: {
        type: Number,
        min: [0, "soldCount cannot be negative"],
        default: 0
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('inventory', inventorySchema)
