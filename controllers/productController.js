const Product = require("../models/productModel");
const createProduct = async (req, res, next) => {
    const {
        type,
        name,
        beforPrice,
        afterPrice,
        description,
        avatar,
    } = req.body;

    try {
        let newProduct;
        
        if (type === 'library') {
            newProduct = new Product({
                userID: req.userId,
                type,
                name,
                beforPrice,
                afterPrice,
                description,
                avatar,
            });
        } else {
            const { descTeacher, notes } = req.body;
            newProduct = new Product({
                userID: req.userId,
                type,
                name,
                beforPrice,
                afterPrice,
                description,
                avatar,
                descTeacher,
                notes,
            });
        }

        await newProduct.save();
        res.status(201).json({ message: 'Create Product  successfully' });
    } catch (error) {
        next(error);
    }
};
const editProduct = async (req, res, next) => {
    try {
        const productId = req.params.productID;
        const userId = req.userId;

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        if (product.userID.toString() !== userId) {
            return res.status(403).json({ message: 'You are not authorized to edit this product' });
        }

        if (product.type === 'library') {
            product.name = req.body.name;
            product.beforPrice = req.body.beforPrice;
            product.afterPrice = req.body.afterPrice;
            product.description = req.body.description;
            product.avatar = req.body.avatar;
        } else {
            product.descTeacher = req.body.descTeacher;
            product.notes = req.body.notes;
        }

        await product.save();

        res.status(200).json({ message: 'The product has been successfully updated', data: product });
    } catch (err) {
        console.error('Error updating product:', err);
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};
const deleteProduct = async (req, res, next) => {
    try {
        const productId = req.params.productID;
        const userId = req.userId;

        const product = await Product.findById(productId);
        console.log(product);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        if (product.userID.toString() !== userId.toString()) {
            return res.status(403).json({ message: 'You are not authorized to delete this product' });
        }
        await product.deleteOne();

        res.status(200).json({ message: 'The product has been successfully deleted.' });
    } catch (error) {
        console.error('Error Delete product:', err);
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

const getProduct = async (req,res,next)=>{
    try {
        const productId = req.params.productID;

        const product = await Product.findById(productId)
            .populate({
                path: 'userID',
                select: 'name phone governorate city address avatar deliveryservice',
            })

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const response = {
            StoreName: product.userID.name,
            StorePhoto: product.userID.avatar,
            StorePhone: product.userID.phone,
            StoreGovernorate: product.userID.governorate,
            StoreCity: product.userID.city,
            StoreAddress: product.userID.address,
            Storedeliveryservice: product.userID.deliveryservice,
            name:product.name,
            beforPrice:product.beforPrice,
            afterprice:product.afterPrice,
            description:product.description,
            avatar:product.avatar,
            notes:product.notes,
            descTeacher:product.descTeacher,
        };
        res.status(200).json(response);
    } catch (error) {
        console.error('Error fetching Product:', error);
        res.status(500).json({ message: 'Error fetching Product-' });
        next(error);
    }
}
const ProductsStore = async (req, res, next) => {
    console.log(req.userId);

    try {
        const storeId = req.params.StoreID;

        const products = await Product.find({ userID: storeId })
            .populate({
                path: 'userID',
                select: 'name phone governorate city address avatar deliveryservice',
            });

        const productsWithStoreInfo = products.map(product => ({
            _id: product._id,
            Store: product.userID ? {
                StoreName: product.userID.name,
                StorePhoto: product.userID.avatar,
                StorePhone: product.userID.phone,
                StoreGovernorate: product.userID.governorate,
                StoreCity: product.userID.city,
                StoreAddress: product.userID.address,
            } : null,
            name: product.name,
            beforePrice: product.beforePrice,
            afterPrice: product.afterPrice,
            description: product.description,
            avatar: product.avatar,
            notes: product.notes,
            descTeacher: product.descTeacher,
        }));

        console.log(productsWithStoreInfo);
        res.status(200).json(productsWithStoreInfo);

    } catch (error) {
        console.error('Error fetching Products:', error);
        next(error);
    }
};

module.exports = {
    createProduct,
    editProduct,
    deleteProduct,
    getProduct,
    ProductsStore
};
