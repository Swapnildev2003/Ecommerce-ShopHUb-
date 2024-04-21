
import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import jwt from 'jsonwebtoken';
import path from 'path';
import cors from 'cors';
import { constants } from 'buffer';
const app = express();
const port = 4000;
app.use(express.json());
app.use(cors());
// Allow Cross-Origin Resource Sharing (CORS)

//databave connection

// mongoose.connect("mongodb+srv://swapnilsks123ss:rkQYXQ5xszk8OE64@cluster0.4egkvfz.mongodb.net/Ecommerce")
mongoose.connect("mongodb+srv://swapnilsks123ss:rkQYXQ5xszk8OE64@cluster0.4egkvfz.mongodb.net/Ecommerce", { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function () {
    console.log('Connected to MongoDB Atlas');
});

//Api Creation

app.get('/', (req, res) => {
    res.send('Hello World!')
})



//Image Storage Engine
var storage = multer.diskStorage({
    destination: './upload/images', // Folder to store the uploaded files in  
    filename: function (req, file, cb) {
        // Generate a unique file name using file's original name with the extension
        return cb(null, `${file.filename}_$(Date.now())_${path.extname(file.originalname)}`);
    }
})

const upload = multer({ storage: storage });

//Creating Upload Endpoint for image
app.use('/images', express.static('upload/images'))
app.post("/upload", upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    })
})

//Schema for creating products

const Product = mongoose.model("Product", {
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    category: {
        type: String,

    },
    new_price: {
        type: Number,
        required: true
    },
    old_price: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    available: {
        type: Boolean,
        default: true
    }
})

// Add Product

app.post("/addProduct", async (req, res) => {
    let products = await Product.find({});
    let id;
    if (products.length > 0) {
        let last_products_array = products.slice(-1);
        let last_product = last_products_array[0];
        id = last_product.id + 1;
    }
    else {
        id = 1;
    }
    const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
        available: true
    })
    console.log(product)
    await product.save()
    console.log("saved")
    res.json({
        succsess: true,
        name: req.body.name
    })
})

//Schema for creating user model
const User = mongoose.model('User', {
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    cartData: {
        type: Object,
    },
    date: {
        type: Date,
        default: Date.now(),
    }
});

//creating api to delete product

app.post('/removeProduct', async (req, res) => {
    await Product.findOneAndDelete({ id: req.body.id });
    console.log("removed")
    res.json({
        succsess: true,
        name: req.body.name
    })
})
app.get('/allProds', async (req, res) => {
    const data = await Product.find();
    console.log("All products fetched")
    res.send(data)
})
//Creating Endpoint for registering the user
app.post('/signup', async (req, res) => {
    let check = await User.findOne({ email: req.body.email })
    if (check) {
        return res.status(400).json({ success: false, errors: "existing user" })
    }
    let cart = {}
    for (let i = 0; i < 300; i++) {
        cart[i] = 0;

    }
    const user = new User({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
        cartData: cart,
    })
    await user.save();
    const data = {
        user: {
            id: user.id,
        }
    }
    const token = jwt.sign(data, 'secret_ecom');
    res.json({ success: true, token })
})
app.post('/login', async (req, res) => {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        const passCompare = req.body.password === user.password;
        if (passCompare) {
            const data = {
                user: {
                    id: user.id,
                }
            }
            const token = jwt.sign(data, 'secret_ecom')
            res.json({ success: true, token: 'Bearer ' + token })
        }
        else {
            res.json({ success: false, errors: "Wrong Password" });
        }
    }
    else {
        res.status(400).json({ success: false, errors: "Wrong Email id" });
    }
})
app.get('/newcollections', async (req, res) => {
    let products = await Product.find({})
    let newcollection = products.slice(1).slice(-8);
    console.log("NewCollection Fetched")
    res.send(newcollection);

})

app.get("/popularinwomen", async (req, res) => {
    let products = await Product.find({ category: "women" })
    let popular_in_women = products.slice(0, 4);
    console.log("Popular in women fetched")
    res.send(popular_in_women)
})
const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token')
    if (!token) {
        return res.status(401).json({ msg: 'No Token Provided' })
    } else {
        try {
            const verifiedToken = jwt.verify(token, 'secret_ecom');
            req.user = verifiedToken;
            next();
        } catch (err) {
            res.status(401).json({ msg: 'Token is not Valid' })
        }
    }
}
app.post('/addtocart', fetchUser, async (req, res) => {
    // setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
    // console.log(cartItems)
    console.log("Added", req.body.itemId)
    let userData = await Users.findOne({ _id: req.user.id });
    if (userData.cartData[req.body.itemId] > 0)
        userData.cartData[req.body.itemId] += 1;
    await User.findByIdAndUpdate({ _id: req.user.id }, { cartData: userData.cartData })
    res.status(200)("Removed")

})

app.post('/getcart', fetchUser, async (req, res) => {
    console.log("Getcart")
    let userData = await Users.findOne({ _id: req.user.id })
    res.json(userData.cartData)

})

app.post("/removefromcart", fetchUser, async (req, res) => {
    console.log("removed", req.body.itemId)
    let userData = await Users.findOne({ _id: req.user.id });
    userData.cartData[req.body.itemId] -= 1;
    await User.findByIdAndUpdate({ _id: req.user.id }, { cartData: userData.cartData })
    // app.post('/addtocart', fetchUser,)
})
app.listen(port, (error) => {
    if (!error) {
        console.log(`Server is running on ${port}`)
    } else {
        console.log(`Error : ${error}`);
    }
});
