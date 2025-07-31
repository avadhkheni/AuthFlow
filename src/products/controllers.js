const Product = require("./model");

// Get all products
const getAll = async (req, res) => {

  try {
    const products = await Product.find();
   return res.status(200).json({
      data: products,
      msg: "All products",
    });

  } catch (error) {

    console.error(error);
    return res.status(500).json({
       msg: "Internal server error ",
      error: error
    });
  }
};

// Get one product by ID
const getOne = async (req, res) => {

  try {
    const id = req.params.id;
    const product = await Product.findById(id);

    if (!product) return res.status(404).json({ msg: "Product not found" });
    return res.json({ data: product, msg: "Product found" });

  }
  catch (error) {
    console.error(error);
    return res.status(200).json({ msg: "Internal server error" });
  }

};

// Create one product
const createOne = async (req, res) => {
  try {
    //  ratting, category, disconnect, createdAt, color
    const { name, price, desc } = req.body;

    if (!name || !price ) {
      return res.status(400).json({ msg: "Please provide all required fields" });
    }
      // ratting, category, disconnect, createdAt, color
    const product = await Product.create({ name, price, desc });
    res.status(201).json({ msg: "Product created", data: product });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

// Update one product
const updateOne = async (req, res) => {
  try {

    const id = req.params["id"];
    const product = await Product.findById(id);
    if (!product) return res.json({ msg: "Product not found" });
    // , ratting, category, disconnect, createdAt, color
    const { name, price, desc } = req.body;

    await Product.findOneAndUpdate(
      { _id: id },
      // , ratting, category, disconnect, createdAt, color
      { name, price, desc }
    );

    res.status(200).json({ msg: "Product updated successfully" });

  } catch (error) {
    console.error(error);
    return res.status(404).json({ msg: "failed to update" });
  }
};

// Delete one product
const deleteOne = async (req, res) => {
 try{

   const id = req.params["id"];
  const result = await Product.findByIdAndDelete(id);
  res.status(204).json({ msg: `Product deleted successfully, ${JSON.stringify(result)}` });

 }catch(error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal server error" });
  } 
};

module.exports = { getAll, getOne, createOne, updateOne, deleteOne };
