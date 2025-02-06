const client = require('../../dbClient');
const bcrypt = require('bcryptjs');
const userController = {
    register : async (req,res,next) => {

        const {name, email, password} = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Name, email, and password are required!" });
        }
        // 1 Uppercase , 1 Lower, 1 digit, 1 speciaal character, and minimum 8 length
        passwordChecker = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^A-Za-z0-9]).{8,}$/
        if (!passwordChecker.test(password)) {
            return res.status(400).json({ message : 'Password must containt at least 1 Uppercase , 1 Lower, 1 digit, 1 speciaal character, and minimum 8 character length'})
        }
        try {
            const result = await client.query("SELECT email FROM users WHERE email = $1" , [email]);
            if (result.rows.length > 0) {
                return res.status(400).json({ message: "Email already in use!" });
            }
            const hashedPassword = await bcrypt.hash(password,10)
            const newUserInserted = await client.query(
                "INSERT INTO Users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
                [name, email, hashedPassword]
              );
            const newUser = newUserInserted.rows[0];
            // Also create the cart for the user
            await client.query("INSERT INTO carts (userid) VALUES ($1)", [newUser.userid])
            return res.status(201).json({
                message: "User registered successfully!",
                user: {
                  userId: newUser.userid,
                  name: newUser.name,
                  email: newUser.email
                }
              });
        }
        catch(err) {
            console.log("Error in User Registration:", err);
            return res.status(500).json({ message: "Internal server error" });

        }
    },
    login : async (req,res,next) => {
        const {email,password} = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email, and password are required!" });
        }
        try {
            const result = await client.query("SELECT * FROM Users WHERE email = $1", [email]);
            const user = result.rows[0];
            if (!user) {
                return res.status(401).json({ message: "Invalid credentials!" });
            }
            const passwordChecker = await bcrypt.compare(password, user.password);
            if (!passwordChecker) {
                return res.status(401).json({ message: "Invalid credentials!" });
            }

            if(user.token && jwt.verify(user.token, process.env.secret)){
                return res.json({
                    user: {
                        name : user.name,
                        email : user.email,
                    },
                    token : user.token
                })
            }

            const token = jwt.sign({
                id: user.userid,
            },process.env.secret, {expiresIn: '1h'});

            await client.query("UPDATE users SET token $1 WHERE userid = $2", [token,userid])
            return res.json({
                message: "Login successful!",
                user: {
                    name: user.name,
                    email: user.email,
                },
                token: token
            });
        }
        catch(err){
            console.log("Error in User Login:", err);
            return res.status(500).json({ message: "Internal server error" });

        }
    },
  listProduct: async(req,res,next) => {

    try {  
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;
        const {productcategory, productname} = req.query
        let query = "SELECT * FROM products"
        const params = []
        const conditions = []
        
        if (productcategory) {
          conditions.push(`productcategory = $${params.length + 1}`)
          params.push(productcategory)
        }
        if (productname) {
          conditions.push(`productname ILIKE $${params.length + 1}`)
          params.push(`%${productname}%`)
        
        }
        if (conditions.length > 0) {
            query += " WHERE " + conditions.join(" OR ");
        }
        query += ` LIMIT $${params.length + 1} OFFSET $${params.length + 2}`        
        params.push(limit, offset);
        const result = await client.query(query, params);
        if (result.rows.length === 0) {
          return res.status(200).json({
            message: "No products found",
            products: [],
          });
        }
        return res.status(200).json({
            message: "Products retrieved successfully",
            products: result.rows,
        });   
    }   
    catch(err){
        console.error("Error retrieving products:", err);
        return res.status(500).json({ message: "Internal server error" });

    }
  },
  getProductByid : async(req,res,next) => {
    const productId = req.params.productId;
    if (isNaN(productId) || productId <= 0) {
        return res.status(400).json({ message: "Invalid product ID" });
      }  
    try {
        const product = await client.query(`SELECT * FROM products WHERE productid = $1`, [productId])
        if (product.rows.length === 0) {
            return res.status(404).json({ message: "Product not found" });
          } 
        return res.status(200).json({
        message: "Product retrieved successfully",
        product: product.rows[0],
        });
    }
    catch(err){
        console.error("Error retrieving product:", err);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
  },
  // TODO : TRY TO USE SESSIONID 
  addToCart : async(req,res,next) => {
    const { productId, userId , qty} = req.body;
    try {
        const result = await client.query(`SELECT cartid FROM carts WHERE userid = $1`, [userId])
        const cartId = result.rows[0].cartid;

        const resCreateCartItems = await client.query(`INSERT INTO cartitems (cartid, productid, qty) VALUES ($1, $2, $3) RETURNING *`, [cartId, productId, qty])
        const createdCartItems = resCreateCartItems.rows[0]
        return res.status(201).json({
            message: "Product successfully added to the cart",
            cartId: cartId,
            productId: createdCartItems.productid,
            quantity: createdCartItems.qty
          });
    }
    catch(err){
        console.log("Error adding products to cart : " , err);
        return res.status(500).json({ message: "Internal server error" });
    }
  },
  submitOrder : async(req,res,next) => {
    const {userId, date, cartId, address} = req.body 
    try {
        const result = await client.query('INSERT INTO orders (userid,date,status,cartid,address) VALUES ($1 , $2, $3, $4, $5) RETURNING *', [userId, date, "Pending", cartId, address])
        const createdOrder = result.rows[0]
        await client.query(
            'DELETE FROM cartitems WHERE cartid = $1',
            [cartId]
        );
        return res.status(201).json({
            message: "Order successfully created",
            orderid: createdOrder.orderid,
            userid: createdOrder.userid,
            date: createdOrder.date,
            status: createdOrder.status,
            cartid: createdOrder.cartid,
            address: createdOrder.address,
        })
    }
    catch(err){
        console.log("Error Submitting Order: ", err);
        return res.status(500).json({ message: "Internal server error" }); 
    }

  }

}

module.exports = userController;


