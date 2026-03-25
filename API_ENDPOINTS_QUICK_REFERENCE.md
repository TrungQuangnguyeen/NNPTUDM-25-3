# 📋 API ENDPOINTS QUICK REFERENCE

## 🔐 ROLES

| # | Method | Endpoint | Description | Body |
|----|--------|----------|-------------|------|
| 1 | POST | `/api/v1/roles` | Create role | `{ "name": "Admin", "description": "..." }` |
| 2 | GET | `/api/v1/roles` | Get all roles | - |
| 3 | GET | `/api/v1/roles/:id` | Get role by ID | - |
| 4 | PUT | `/api/v1/roles/:id` | Update role | `{ "name": "...", "description": "..." }` |
| 5 | DELETE | `/api/v1/roles/:id` | Delete role | - |

**Sample Response:**
```json
{
  "_id": "66a1b2c3d4e5f6g7h8i9j0k4",
  "name": "Admin",
  "description": "Administrator role",
  "isDeleted": false,
  "createdAt": "2024-03-25T10:30:00.000Z"
}
```

---

## 📦 CATEGORIES

| # | Method | Endpoint | Description | Body |
|----|--------|----------|-------------|------|
| 1 | POST | `/api/v1/categories` | Create category | `{ "name": "Electronics", "image": "..." }` |
| 2 | GET | `/api/v1/categories` | Get all categories | - |
| 3 | GET | `/api/v1/categories/:id` | Get category by ID | - |
| 4 | PUT | `/api/v1/categories/:id` | Update category | `{ "name": "...", "image": "..." }` |
| 5 | DELETE | `/api/v1/categories/:id` | Delete category | - |

**Sample Response:**
```json
{
  "_id": "66a1b2c3d4e5f6g7h8i9j0k0",
  "name": "Electronics",
  "slug": "electronics",
  "image": "https://i.imgur.com/electronics.jpeg",
  "isDeleted": false,
  "createdAt": "2024-03-25T10:30:00.000Z"
}
```

---

## 🛍️ PRODUCTS

| # | Method | Endpoint | Description | Body |
|----|--------|----------|-------------|------|
| 1 | POST | `/api/v1/products` | Create product | `{ "title": "...", "price": 1200, "description": "...", "images": [...], "category": "..." }` |
| 2 | GET | `/api/v1/products` | Get all products | - |
| 3 | GET | `/api/v1/products?title=...&min=0&max=10000` | Filter products | - |
| 4 | GET | `/api/v1/products/:id` | Get product by ID | - |
| 5 | PUT | `/api/v1/products/:id` | Update product | `{ "price": 1149, "description": "..." }` |
| 6 | DELETE | `/api/v1/products/:id` | Delete product | - |

**Sample Response:**
```json
{
  "_id": "66a1b2c3d4e5f6g7h8i9j0k1",
  "title": "Laptop Dell XPS 13",
  "slug": "laptop-dell-xps-13",
  "price": 1200,
  "description": "High-performance laptop",
  "images": ["https://i.imgur.com/dell-xps.jpeg"],
  "category": "66a1b2c3d4e5f6g7h8i9j0k0",
  "isDeleted": false,
  "createdAt": "2024-03-25T10:35:00.000Z"
}
```

**✅ Auto Create Event:** Inventory được tự động tạo với (stock=0, reserved=0, soldCount=0)

---

## 📊 INVENTORY

| # | Method | Endpoint | Description | Body |
|----|--------|----------|-------------|------|
| 1 | GET | `/api/v1/inventories` | Get all inventories | - |
| 2 | GET | `/api/v1/inventories/:id` | Get inventory by ID | - |
| 3 | POST | `/api/v1/inventories/add-stock` | Add stock | `{ "product": "...", "quantity": 50 }` |
| 4 | POST | `/api/v1/inventories/remove-stock` | Remove stock | `{ "product": "...", "quantity": 10 }` |
| 5 | POST | `/api/v1/inventories/reservation` | Create reservation | `{ "product": "...", "quantity": 15 }` |
| 6 | POST | `/api/v1/inventories/sold` | Record sale | `{ "product": "...", "quantity": 15 }` |

**Sample Response (Detailed):**
```json
{
  "_id": "66a1b2c3d4e5f6g7h8i9j0k10",
  "product": {
    "_id": "66a1b2c3d4e5f6g7h8i9j0k1",
    "title": "Laptop Dell XPS 13",
    "slug": "laptop-dell-xps-13",
    "price": 1200,
    "description": "High-performance laptop for professionals",
    "images": ["https://i.imgur.com/dell-xps.jpeg"]
  },
  "stock": 25,
  "reserved": 0,
  "soldCount": 15,
  "createdAt": "2024-03-25T10:35:00.000Z",
  "updatedAt": "2024-03-25T10:50:00.000Z"
}
```

---

## 🔄 INVENTORY STATE TRANSITIONS

### Single Product Workflow

```
Step 1: Create Product
├─ POST /products → Auto Inventory Created
│  └─ stock: 0, reserved: 0, soldCount: 0

Step 2: Add Stock (quantity: 50)
├─ POST /inventories/add-stock
│  └─ stock: 0 + 50 = 50 ✅

Step 3: Remove Stock (quantity: 10)
├─ POST /inventories/remove-stock
│  └─ stock: 50 - 10 = 40 ✅

Step 4: Reservation (quantity: 15)
├─ POST /inventories/reservation
│  ├─ stock: 40 - 15 = 25 ✅
│  └─ reserved: 0 + 15 = 15 ✅

Step 5: Sold (quantity: 15)
├─ POST /inventories/sold
│  ├─ reserved: 15 - 15 = 0 ✅
│  └─ soldCount: 0 + 15 = 15 ✅

Final State:
├─ stock: 25 (Available for new orders)
├─ reserved: 0 (No pending orders)
└─ soldCount: 15 (Total sold)
```

### Multiple Products

```
Product 1: Laptop
├─ stock: 25
├─ reserved: 0
└─ soldCount: 15

Product 2: iPhone
├─ stock: 80
├─ reserved: 5
└─ soldCount: 15

Product 3: Headphones
├─ stock: 120
├─ reserved: 10
└─ soldCount: 0
```

---

## 📝 Request/Response Examples

### ✅ Success Response

```json
{
  "message": "Stock added successfully",
  "data": {
    "_id": "66a1b2c3d4e5f6g7h8i9j0k10",
    "product": "66a1b2c3d4e5f6g7h8i9j0k1",
    "stock": 50,
    "reserved": 0,
    "soldCount": 0,
    "createdAt": "2024-03-25T10:35:00.000Z",
    "updatedAt": "2024-03-25T10:40:00.000Z"
  }
}
```

### ❌ Error Response

```json
{
  "message": "Error removing stock",
  "error": "Insufficient stock. Available: 5"
}
```

---

## 🎯 Full Test Sequence (Copy & Paste Ready)

### 1️⃣ Create Category
```bash
POST http://localhost:3000/api/v1/categories
Content-Type: application/json

{
  "name": "Electronics",
  "image": "https://i.imgur.com/electronics.jpeg"
}
```

### 2️⃣ Create Product
```bash
POST http://localhost:3000/api/v1/products
Content-Type: application/json

{
  "title": "Laptop Dell XPS 13",
  "price": 1200,
  "description": "High-performance laptop",
  "images": ["https://i.imgur.com/dell-xps.jpeg"],
  "category": "CATEGORY_ID_HERE"
}
```

### 3️⃣ Get All Inventories
```bash
GET http://localhost:3000/api/v1/inventories
```

### 4️⃣ Add Stock
```bash
POST http://localhost:3000/api/v1/inventories/add-stock
Content-Type: application/json

{
  "product": "PRODUCT_ID_HERE",
  "quantity": 50
}
```

### 5️⃣ Remove Stock
```bash
POST http://localhost:3000/api/v1/inventories/remove-stock
Content-Type: application/json

{
  "product": "PRODUCT_ID_HERE",
  "quantity": 10
}
```

### 6️⃣ Reservation
```bash
POST http://localhost:3000/api/v1/inventories/reservation
Content-Type: application/json

{
  "product": "PRODUCT_ID_HERE",
  "quantity": 15
}
```

### 7️⃣ Sold
```bash
POST http://localhost:3000/api/v1/inventories/sold
Content-Type: application/json

{
  "product": "PRODUCT_ID_HERE",
  "quantity": 15
}
```

---

## 📊 Data Flow Diagram

```
┌─────────────────┐
│   Create Role   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Create Category │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Create Product  │
└────────┬────────┘
         │
    ✅ Auto Inventory Created (stock=0)
         │
         ▼
┌─────────────────────┐
│  Add Stock (50)     │ stock: 0 → 50
└────────┬────────────┘
         │
         ▼
┌─────────────────────┐
│ Remove Stock (10)   │ stock: 50 → 40
└────────┬────────────┘
         │
         ▼
┌─────────────────────────────┐
│  Reservation (15)           │ stock: 40 → 25
│  reserved: 0 → 15           │
└────────┬────────────────────┘
         │
         ▼
┌─────────────────────────────┐
│  Sold (15)                  │ reserved: 15 → 0
│  soldCount: 0 → 15          │
└─────────────────────────────┘
         │
    ✅ Final State: stock=25, reserved=0, soldCount=15
```

---

## 🚀 Tips & Tricks

1. **Always save IDs after creation** - Copy _id from response for next requests
2. **Use Postman Variables** - Store IDs in variables to avoid copy-paste
3. **Monitor in MongoDB Compass** - Watch changes in real-time
4. **Test error scenarios** - Try with invalid quantities
5. **Create multiple products** - Test with different inventory states

---

## ✨ Success Indicators

✅ All API endpoints respond with 200/201 status  
✅ Inventory auto-created when product created  
✅ Stock operations work correctly  
✅ Reservation decreases stock and increases reserved  
✅ Sold decreases reserved and increases soldCount  
✅ Error messages appear for invalid operations  

