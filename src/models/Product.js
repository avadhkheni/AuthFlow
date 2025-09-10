const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productname: { type: String, required:true , lowercase:true, trim:true },
    price: { type: Number },
    desc: { type: String },
    ratting: { type: Number, enum:[0,0.5,1,1.2,2,2.5],default: 0 },
    category: { type: String, enum: ['clothes', 'electronics', 'furniture'] },
    discount: { type: Number, default: 1 },
    discount_data: { type: Date, },
    color: { type: [String] },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    image:String
 });

const Product = mongoose.model('Product', productSchema);

module.exports = Product ;