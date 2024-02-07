import express from "express";
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js'
import {
    CategoriesController,
    createCategoryController,
    deleteCategoryController,
    singleCategoryController,
    updateCategoryController
} from "../controllers/categoryController.js";


const router = express.Router();

//routes
//Create
router.post('/create-category', requireSignIn, isAdmin, createCategoryController)
//Update
router.put('/update-category/:id', requireSignIn, isAdmin, updateCategoryController)
//getAllCategory
router.get('/get-categories', CategoriesController)
//single category
router.get('/single-category/:slug', singleCategoryController)
//delete category
router.delete("/delete-category/:id",requireSignIn ,isAdmin , deleteCategoryController);


export default router;