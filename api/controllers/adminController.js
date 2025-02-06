
const client = require('../../dbClient');
const jwt = require('jsonwebtoken');
const adminController = {
  login: async (req, res, next) => {
    const { email, password } = req.body;

    try {
      const result = await client.query("SELECT * FROM admins WHERE email = $1", [email]);
      const admin = result.rows[0];
      if (!admin) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      if (admin.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      if(admin.token && jwt.verify(admin.token, process.env.secret)){
        return res.json({
          admin: {
            name: admin.name,
            email: admin.email,
          },
          token : admin.token
        });
      }

      const token = jwt.sign({
        id: admin.adminid,
        role: admin.role
      }, process.env.secret, { expiresIn: '1h' });

      await client.query("UPDATE admins SET token = $1 WHERE adminid = $2", [token, admin.adminid]);
      return res.json({
        admin: {
          name: admin.name,
          email: admin.email,
        },
        token: token,
      });

    } catch (err) {
      console.log("Error in login:", err);
      return res.status(500).json({ message: "Internal server error" });

    }
  },
  createProduct : async (req,res,next) => {
    const {productName,productPrice,productCategory,productImg,productStock,productDescription} = req.body;
    if (!productName || !productPrice || !productCategory || !productImg || !productStock || !productDescription) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    try{
      const result = await client.query(
        `INSERT INTO products 
        (productname, productprice, productcategory, productimg, productstock, productdescription) 
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`, 
        [productName, productPrice, productCategory, productImg, productStock, productDescription])
      const insertedProduct = result.rows[0]
      return res.status(201).json({
        message: "Product created successfully!",
        product: {
          productName: insertedProduct.productname,
          productPrice: insertedProduct.productprice,
          productCategory: insertedProduct.productcategory,
          productImg: insertedProduct.productimg,
          productStock: insertedProduct.productstock,
          productDescription: insertedProduct.productdescription
        }
      });
    }
    catch(err){
      console.log("Error creating product")
      return res.status(500).json({ message: "Internal server error" });

    }
  },
  readProducts : async(req,res,next) => {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    try {
      const result = await client.query(`SELECT * FROM products LIMIT $1 OFFSET $2`, [limit, offset]);
      const products = result.rows;
      if (products.length === 0) {
        return res.status(404).json({ message: "No products found" });
      }
      return res.json({
        page: page,
        limit: limit,
        total: products.length, 
        products: products.map(product => ({
          productId: product.productid,
          productName: product.productname,
          productPrice: product.productprice,
          productCategory: product.productcategory,
          productImg: product.productimg,
          productStock: product.productstock,
          productDescription: product.productdescription
        }))
      });
    }
    catch(err){
      console.log("Error in fetching products:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  },
  updateProduct : async (req,res,next) => {
    const productId = req.params.productId;
    if (isNaN(productId) || productId <= 0) {
      return res.status(400).json({ message: "Invalid product ID" });
    }    
    const {productName,productPrice,productCategory,productImg,productStock,productDescription} = req.body;
    if (!productName || !productPrice || !productCategory || !productImg || !productStock || !productDescription) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    try{
      const result = await client.query(
        `UPDATE products 
        SET productname = $1, productprice = $2, productcategory = $3, productimg = $4, productstock = $5, productdescription = $6 
        WHERE productid = $7 
        RETURNING *`, 
        [productName, productPrice, productCategory, productImg, productStock, productDescription, productId])
      const insertedProduct = result.rows[0]
      return res.status(201).json({
        message: "Product updated successfully!",
        product: {
          productName: insertedProduct.productname,
          productPrice: insertedProduct.productprice,
          productCategory: insertedProduct.productcategory,
          productImg: insertedProduct.productimg,
          productStock: insertedProduct.productstock,
          productDescription: insertedProduct.productdescription
        }
      });
    }
    catch(err){
      console.log("Error updating product")
      return res.status(500).json({ message: "Internal server error" });
    }

  },
  deleteProduct: async (req, res, next) => {
    const productId = req.params.productId;
    if (isNaN(productId) || productId <= 0) {
      return res.status(400).json({ message: "Invalid product ID" });
    }
    try {
      const product = await client.query("SELECT * FROM products WHERE productid = $1", [productId]);
      if (product.rows.length === 0) {
        return res.status(404).json({ message: "Product not found" });
      }
      await client.query("DELETE FROM products WHERE productid = $1", [productId]);
      return res.status(200).json({ message: "Product deleted successfully" });
    } catch (err) {
      console.log("Error deleting product", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  },

  readUsers: async(req,res,next) => {
    try {
      const users = await client.query("SELECT userid, name, email FROM users");
      if (users.rows.length == 0) {
        return res.status(404).json({ message: "No users available" });
      }
      return res.status(200).json({
        message: "Users retrieved successfully",
        users: users.rows
      });

    }
    catch(err) {
      console.error("Error reading users:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  },

  

};

module.exports = adminController;