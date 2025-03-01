const Product = require("../models/Product");


// Ambil semua produk
const getAllProducts = async (req, res) => {
    try{
        const products = await Product.find();
        res.json(products);
    }catch (error){
        res.status(500).json({message: "Gagal Mengambil Produk!", error: error.message});
    }
};

// Ambil produk berdasarkan ID
const getProductById = async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: "Produk tidak ditemukan!" });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Terjadi kesalahan server!", error: error.message });
    }
  };
  
  const createProduct = async (req, res) => {  
    try {
      const { name,  price, stock, description, category } = req.body;
  
      // Cek semua field dikirim
      if (!name || !price || !stock || !description || !category) {
        return res.status(400).json({ message: "Semua field wajib diisi" });
      }
  
      // Simpan produk ke database
      const newProduct = new Product({ name, price, stock, description, category });
      await newProduct.save();
  
      res.status(201).json(newProduct);
    } catch (error) {
      console.error("Error di server:", error);
      res.status(500).json({ message: "Terjadi kesalahan server" });
    }
  };
  
  
  // Edit produk (Hanya Admin)
  const updateProduct = async (req, res) => {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedProduct) {
        return res.status(404).json({ message: "Produk tidak ditemukan!" });
      }
      res.json({ message: "Produk berhasil diperbarui!", product: updatedProduct });
    } catch (error) {
      res.status(500).json({ message: "Terjadi kesalahan server!", error: error.message });
    }
  };
  
  // Hapus produk (Hanya Admin)
  const deleteProduct = async (req, res) => {
    try {
      const deletedProduct = await Product.findByIdAndDelete(req.params.id);
      if (!deletedProduct) {
        return res.status(404).json({ message: "Produk tidak ditemukan!" });
      }
      res.json({ message: "Produk berhasil dihapus!" });
    } catch (error) {
      res.status(500).json({ message: "Terjadi kesalahan server!", error: error.message });
    }
  };

module.exports = { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct };
