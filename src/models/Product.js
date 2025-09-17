const mongoose = require('mongoose');

// Define schema for products
const productSchema = new mongoose.Schema({
    // Product name (required, lowercase, trimmed) 
    productname: { type: String, required:true , lowercase:true, trim:true },

    // Product price (number only)
    price: { type: Number },

    // Product description
    desc: { type: String },

    // Rating with fixed allowed values (default: 0)
    ratting: { type: Number, enum:[0,0.5,1,1.2,2,2.5],default: 0 },

    // Product category (must be one of the given values)
    category: { type: String, enum: ['clothes', 'electronics', 'furniture'] },

    // Discount percentage or amount (default = 1)
    discount: { type: Number, default: 1 },

    // Date until the discount is valid
    discount_data: { type: Date, },

    // Available colors (array of strings)
    color: { type: [String] },

    // Reference to the user who created/owns this product
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    image:String
 });

 // Create model from schema
const Product = mongoose.model('Product', productSchema);

module.exports = Product;