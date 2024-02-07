import {
    brainTreePaymentController,
    brainTreeTokenController,
    categoryProductController,
    createProductController,
    deleteProductController,
    filterProductController,
    getProductController,
    getSingleProductController,
    productCountController,
    productListController,
    productPhotoController,
    relatedProductController,
    searchProductController,
    updateProductController
} from "../controllers/productController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import ExpressFormidable from "express-formidable";

import express from "express";
const router = express.Router();


// routes of create product

router.post('/create-product', requireSignIn, isAdmin, ExpressFormidable(), createProductController)
// routes of update product

router.put('/update-product/:pid', requireSignIn, isAdmin, ExpressFormidable(), updateProductController)
//get products
router.get("/get-product", getProductController);
//single product
router.get("/get-product/:slug", getSingleProductController);
//get photo
router.get("/product-photo/:pid", productPhotoController);
//delete rproduct
router.delete("/delete-product/:pid", deleteProductController);
//Filter product
router.post("/product-filter", filterProductController);
// product count
router.get("/product-count", productCountController);
// product per page
router.get("/product-list/:page", productListController);
// product search
router.get("/search/:keyword", searchProductController);
//Similar product  
router.get("/related-product/:pid/:cid", relatedProductController);
//category  product  
router.get("/product-category/:slug", categoryProductController);
//Payment  route , token 
router.get("/braintree/token", brainTreeTokenController);
//payments
router.post("/braintree/payment", requireSignIn, brainTreePaymentController);

//export
export default router;