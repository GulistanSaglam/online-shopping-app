const Product = require('../models/product.model');

async function getAllProducts(req, res, next){
   try{
    const products = await Product.findAll();  
    res.render('auth/all-products', { products: products});
   }catch(error){
    next(error);
    return;
   } 
}


async function getProductDetails(req, res,next){
    try{
        const product = await Product.findById(req.params.id);
        res.render('auth/product-details', { product: product});
    }catch(error){
        next(error);
        return;
    }
    
}


module.exports = {
    getAllProducts: getAllProducts,
    getProductDetails: getProductDetails
};