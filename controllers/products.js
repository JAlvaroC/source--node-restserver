const { response } = require("express");
const { Product } = require("../models");

const getProducts = async (req, res = response) => {
  const { limit = 5, since = 0 } = req.query;
  const query = { state: true };

  const [overall, products] = await Promise.all([
    Product.countDocuments(query),
    Product.find(query)
      .populate("user", "name")
      .populate("categorie", "name")
      .skip(Number(since))
      .limit(Number(limit)),
  ]);

  res.json({ overall, products });
};
const getProduct = async (req, res = response) => {
  const { id } = req.params;
  const product = await Product.findById(id)
        .populate("user", "name")
        .populate('categorie','name');
  res.json(product);
};

const createProducts = async (req, res = response) => {
  const { state, user, ...body } = req.body;

  const productDB = await Product.findOne({ name: body.name });
  if (productDB) {
    return res.status(400).json({
      msg: `La categoria ${productDB.name} ,ya existe`,
    });
  }

  //generar  la data a guardar
  const data = {
    ...body,
    name: body.name.toUpperCase(),
    user: req.user._id,
  };
  const product = new Product(data);
  //guardar DB
  await product.save();

  // const Product=new Product(req.body)
  // console.log(Product)
  res.status(201).json({
    product,
  });
};
const actualizarProducts = async (req, res = response) => {
  const { id } = req.params;
  const { state, user, ...data } = req.body;
  if (data.name) {
    data.name = data.name.toUpperCase();
  }

  data.user = req.user._id;
  const product = await Product.findByIdAndUpdate(id, data, { new: true });
  res.json(product);
};
const deleteProduct = async (req, res = response) => {
  const { id } = req.params;
  const productDelete = await Product.findByIdAndUpdate(
    id,
    { state: false },
    { new: true }
  );
  res.json(productDelete);
};

module.exports = {
  getProducts,
  getProduct,
  createProducts,
  actualizarProducts,
  deleteProduct,
};
