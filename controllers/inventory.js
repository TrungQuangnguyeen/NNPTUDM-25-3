let inventoryModel = require('../schemas/inventory')
let productModel = require('../schemas/products')

module.exports = {
    // Tạo inventory mới (được gọi khi tạo product)
    CreateInventory: async function (productId) {
        try {
            let newInventory = new inventoryModel({
                product: productId,
                stock: 0,
                reserved: 0,
                soldCount: 0
            });
            await newInventory.save();
            return newInventory;
        } catch (error) {
            throw error;
        }
    },

    // Lấy tất cả inventory
    GetAllInventories: async function () {
        try {
            return await inventoryModel.find().populate({
                path: 'product',
                select: 'title slug price description images category'
            });
        } catch (error) {
            throw error;
        }
    },

    // Lấy inventory theo ID (join với product)
    GetInventoryById: async function (id) {
        try {
            return await inventoryModel.findById(id).populate({
                path: 'product',
                select: 'title slug price description images category'
            });
        } catch (error) {
            throw error;
        }
    },

    // Tăng stock
    AddStock: async function (productId, quantity) {
        try {
            if (quantity <= 0) {
                throw new Error("Quantity must be greater than 0");
            }
            let inventory = await inventoryModel.findOne({ product: productId });
            if (!inventory) {
                throw new Error("Inventory not found for this product");
            }
            inventory.stock += quantity;
            await inventory.save();
            return inventory;
        } catch (error) {
            throw error;
        }
    },

    // Giảm stock
    RemoveStock: async function (productId, quantity) {
        try {
            if (quantity <= 0) {
                throw new Error("Quantity must be greater than 0");
            }
            let inventory = await inventoryModel.findOne({ product: productId });
            if (!inventory) {
                throw new Error("Inventory not found for this product");
            }
            if (inventory.stock < quantity) {
                throw new Error("Insufficient stock. Available: " + inventory.stock);
            }
            inventory.stock -= quantity;
            await inventory.save();
            return inventory;
        } catch (error) {
            throw error;
        }
    },

    // Reservation: giảm stock và tăng reserved
    Reservation: async function (productId, quantity) {
        try {
            if (quantity <= 0) {
                throw new Error("Quantity must be greater than 0");
            }
            let inventory = await inventoryModel.findOne({ product: productId });
            if (!inventory) {
                throw new Error("Inventory not found for this product");
            }
            if (inventory.stock < quantity) {
                throw new Error("Insufficient stock. Available: " + inventory.stock);
            }
            inventory.stock -= quantity;
            inventory.reserved += quantity;
            await inventory.save();
            return inventory;
        } catch (error) {
            throw error;
        }
    },

    // Sold: giảm reserved và tăng soldCount
    Sold: async function (productId, quantity) {
        try {
            if (quantity <= 0) {
                throw new Error("Quantity must be greater than 0");
            }
            let inventory = await inventoryModel.findOne({ product: productId });
            if (!inventory) {
                throw new Error("Inventory not found for this product");
            }
            if (inventory.reserved < quantity) {
                throw new Error("Insufficient reserved quantity. Available: " + inventory.reserved);
            }
            inventory.reserved -= quantity;
            inventory.soldCount += quantity;
            await inventory.save();
            return inventory;
        } catch (error) {
            throw error;
        }
    }
}
