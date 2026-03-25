var express = require('express');
var router = express.Router();
let inventoryController = require('../controllers/inventory');

// GET all inventories
router.get('/', async function (req, res, next) {
    try {
        let result = await inventoryController.GetAllInventories();
        res.send(result);
    } catch (error) {
        res.status(500).send({
            message: "Error fetching inventories",
            error: error.message
        });
    }
});

// GET inventory by ID (join với product)
router.get('/:id', async function (req, res, next) {
    try {
        let id = req.params.id;
        let result = await inventoryController.GetInventoryById(id);
        if (!result) {
            res.status(404).send({
                message: "Inventory not found"
            });
        } else {
            res.send(result);
        }
    } catch (error) {
        res.status(404).send({
            message: "Error fetching inventory",
            error: error.message
        });
    }
});

// POST: Add stock
router.post('/add-stock', async function (req, res, next) {
    try {
        let { product, quantity } = req.body;
        if (!product || !quantity) {
            return res.status(400).send({
                message: "product and quantity are required"
            });
        }
        let result = await inventoryController.AddStock(product, quantity);
        res.send({
            message: "Stock added successfully",
            data: result
        });
    } catch (error) {
        res.status(400).send({
            message: "Error adding stock",
            error: error.message
        });
    }
});

// POST: Remove stock
router.post('/remove-stock', async function (req, res, next) {
    try {
        let { product, quantity } = req.body;
        if (!product || !quantity) {
            return res.status(400).send({
                message: "product and quantity are required"
            });
        }
        let result = await inventoryController.RemoveStock(product, quantity);
        res.send({
            message: "Stock removed successfully",
            data: result
        });
    } catch (error) {
        res.status(400).send({
            message: "Error removing stock",
            error: error.message
        });
    }
});

// POST: Reservation (giảm stock, tăng reserved)
router.post('/reservation', async function (req, res, next) {
    try {
        let { product, quantity } = req.body;
        if (!product || !quantity) {
            return res.status(400).send({
                message: "product and quantity are required"
            });
        }
        let result = await inventoryController.Reservation(product, quantity);
        res.send({
            message: "Reservation created successfully",
            data: result
        });
    } catch (error) {
        res.status(400).send({
            message: "Error creating reservation",
            error: error.message
        });
    }
});

// POST: Sold (giảm reserved, tăng soldCount)
router.post('/sold', async function (req, res, next) {
    try {
        let { product, quantity } = req.body;
        if (!product || !quantity) {
            return res.status(400).send({
                message: "product and quantity are required"
            });
        }
        let result = await inventoryController.Sold(product, quantity);
        res.send({
            message: "Sale recorded successfully",
            data: result
        });
    } catch (error) {
        res.status(400).send({
            message: "Error recording sale",
            error: error.message
        });
    }
});

module.exports = router;
