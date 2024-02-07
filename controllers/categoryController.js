import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";

export const createCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(401).send({ message: "Name is Required" });
        }
        const existinCategory = await categoryModel.findOne({ name })

        if (existinCategory) {
            return res.status(409).send({
                success: true,
                message: "This Category already exists."
            })
        }
        const category = await new categoryModel({ name, slug: slugify(name) }).save()
        res.status(201).send({
            success: true,
            message: 'new category Created',
            category
        })
    } catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            err,
            message: 'Error in Category'
        })
    }

}

//update 
export const updateCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;
        const category = await categoryModel.findByIdAndUpdate(
            id,
            { name, slug: slugify(name) },
            { new: true });
        res.status(201).send({
            success: true,
            message: ' Category Updated Successfully',
            category,
        })
    } catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            err,
            message: " Error in Updating Category"
        })
    }
}

//get All Category
export const CategoriesController = async (req, res) => {
    try {
        const category = await categoryModel.find({})
        res.status(200).send({
            success: true,
            message: " All Categories List",
            category
        })
    } catch (err) {
        console.log(err);
        return res.status(500).send({
            success: false,
            err,
            message: "Error in getting all Categories"
        })
    }
}

// get Single cat
export const singleCategoryController = async (req, res) => {
    try {
        const category = await categoryModel.findOne({ slug: req.params.slug });
        res.status(200).send({
            status: true,
            message: " Get Category Successfully",
            category,
        })
    } catch (err) {
        console.log(err);
        return res.status(404).send({
            success: false,
            err,
            message: "Category not found"
        })
    }
}

//delete cat 
export const deleteCategoryController = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const category = await categoryModel.findByIdAndDelete(id);
        res.status(201).send({
            success: true,
            message: ' Category Delete Successfully',
            name: name,
            category,
        })
    } catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            err,
            message: " Error in Delete Category"
        })
    }
}