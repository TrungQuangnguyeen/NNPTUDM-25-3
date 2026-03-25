# 📚 COMPLETE API TESTING GUIDE - Categories to Inventory

## 🎯 Tổng Quan

Hướng dẫn test toàn bộ API:
1. **Roles** - Quản lý roles (Admin, User, etc)
2. **Categories** - Quản lý danh mục sản phẩm
3. **Products** - Quản lý sản phẩm (tự động tạo Inventory)
4. **Inventory** - Quản lý kho hàng (Stock, Reserved, Sold)

---

## 🚀 Chuẩn Bị

### Import Collection vào Postman
```
File → Import → Chọn: Complete_API_Testing.postman_collection.json
```

### Ensure MongoDB & Server Running
```bash
npm start
```

---

## 📋 TEST PLAN - Thứ Tự Thực Hiện

### Phase 1: Tạo Role (Tùy Chọn)
```
1️⃣ POST /api/v1/roles

Request Body:
{
  "name": "Admin",
  "description": "Administrator role with full permissions"
}

Response:
{
  "_id": "ROLE_ID_HERE",
  "name": "Admin",
  "description": "Administrator role with full permissions",
  "isDeleted": false,
  "createdAt": "2024-03-25T10:30:00.000Z"
}

✅ Lưu lại: ROLE_ID_HERE
```

---

### Phase 2: Tạo Category

#### **Step 1: Create Category**
```
POST http://localhost:3000/api/v1/categories

Headers:
Content-Type: application/json

Request Body:
{
  "name": "Electronics",
  "image": "https://i.imgur.com/electronics.jpeg"
}

Response:
{
  "_id": "66a1b2c3d4e5f6g7h8i9j0k0",  ← LƯU LẠI
  "name": "Electronics",
  "slug": "electronics",
  "image": "https://i.imgur.com/electronics.jpeg",
  "isDeleted": false,
  "createdAt": "2024-03-25T10:30:00.000Z"
}

✅ Lưu lại: CATEGORY_ID = 66a1b2c3d4e5f6g7h8i9j0k0
```

#### **Step 2: Get All Categories**
```
GET http://localhost:3000/api/v1/categories

Response:
[
  {
    "_id": "66a1b2c3d4e5f6g7h8i9j0k0",
    "name": "Electronics",
    "slug": "electronics",
    "image": "https://i.imgur.com/electronics.jpeg"
  }
]
```

#### **Step 3: Get Category By ID**
```
GET http://localhost:3000/api/v1/categories/66a1b2c3d4e5f6g7h8i9j0k0

Response:
{
  "_id": "66a1b2c3d4e5f6g7h8i9j0k0",
  "name": "Electronics",
  "slug": "electronics",
  "image": "https://i.imgur.com/electronics.jpeg"
}
```

#### **Step 4: Update Category (Optional)**
```
PUT http://localhost:3000/api/v1/categories/66a1b2c3d4e5f6g7h8i9j0k0

Request Body:
{
  "name": "Laptop & Computers",
  "image": "https://i.imgur.com/laptops.jpeg"
}

Response:
{
  "_id": "66a1b2c3d4e5f6g7h8i9j0k0",
  "name": "Laptop & Computers",
  "slug": "laptop-computers",
  "image": "https://i.imgur.com/laptops.jpeg"
}
```

---

### Phase 3: Tạo Product (Auto Inventory)

#### **Step 1: Create Product 1**
```
POST http://localhost:3000/api/v1/products

Headers:
Content-Type: application/json

Request Body:
{
  "title": "Laptop Dell XPS 13",
  "price": 1200,
  "description": "High-performance laptop for professionals",
  "images": ["https://i.imgur.com/dell-xps.jpeg"],
  "category": "66a1b2c3d4e5f6g7h8i9j0k0"
}

Response:
{
  "_id": "66a1b2c3d4e5f6g7h8i9j0k1",  ← LƯU LẠI: PRODUCT_ID_1
  "title": "Laptop Dell XPS 13",
  "slug": "laptop-dell-xps-13",
  "price": 1200,
  "category": "66a1b2c3d4e5f6g7h8i9j0k0",
  "createdAt": "2024-03-25T10:35:00.000Z"
}

✅ Lưu lại:
   - PRODUCT_ID_1 = 66a1b2c3d4e5f6g7h8i9j0k1
   - Inventory được tự động tạo với: stock=0, reserved=0, soldCount=0

🎯 Kiểm tra: Get All Inventories để lấy Inventory ID
```

#### **Step 2: Create Product 2**
```
POST http://localhost:3000/api/v1/products

Request Body:
{
  "title": "iPhone 15 Pro Max",
  "price": 1099,
  "description": "Latest Apple smartphone with advanced features",
  "images": ["https://i.imgur.com/iphone15.jpeg"],
  "category": "66a1b2c3d4e5f6g7h8i9j0k0"
}

Response:
{
  "_id": "66a1b2c3d4e5f6g7h8i9j0k2",  ← PRODUCT_ID_2
  "title": "iPhone 15 Pro Max",
  "price": 1099,
  "category": "66a1b2c3d4e5f6g7h8i9j0k0"
}

✅ Lưu lại: PRODUCT_ID_2 = 66a1b2c3d4e5f6g7h8i9j0k2
```

#### **Step 3: Create Product 3**
```
POST http://localhost:3000/api/v1/products

Request Body:
{
  "title": "Sony WH-1000XM5 Headphones",
  "price": 399,
  "description": "Premium noise-canceling wireless headphones",
  "images": ["https://i.imgur.com/sony-headphones.jpeg"],
  "category": "66a1b2c3d4e5f6g7h8i9j0k0"
}

Response:
{
  "_id": "66a1b2c3d4e5f6g7h8i9j0k3",  ← PRODUCT_ID_3
  "title": "Sony WH-1000XM5 Headphones",
  "price": 399,
  "category": "66a1b2c3d4e5f6g7h8i9j0k0"
}

✅ Lưu lại: PRODUCT_ID_3 = 66a1b2c3d4e5f6g7h8i9j0k3
```

#### **Step 4: Get All Products**
```
GET http://localhost:3000/api/v1/products

Response:
[
  {
    "_id": "66a1b2c3d4e5f6g7h8i9j0k1",
    "title": "Laptop Dell XPS 13",
    "price": 1200,
    "category": { "_id": "66a1b2c3d4e5f6g7h8i9j0k0", "name": "Electronics" }
  },
  {
    "_id": "66a1b2c3d4e5f6g7h8i9j0k2",
    "title": "iPhone 15 Pro Max",
    "price": 1099,
    "category": { "_id": "66a1b2c3d4e5f6g7h8i9j0k0", "name": "Electronics" }
  },
  {
    "_id": "66a1b2c3d4e5f6g7h8i9j0k3",
    "title": "Sony WH-1000XM5 Headphones",
    "price": 399,
    "category": { "_id": "66a1b2c3d4e5f6g7h8i9j0k0", "name": "Electronics" }
  }
]
```

#### **Step 5: Get Products with Filter**
```
GET http://localhost:3000/api/v1/products?title=laptop&min=500&max=2000

Response:
[
  {
    "_id": "66a1b2c3d4e5f6g7h8i9j0k1",
    "title": "Laptop Dell XPS 13",
    "price": 1200,
    "category": { "_id": "66a1b2c3d4e5f6g7h8i9j0k0", "name": "Electronics" }
  }
]
```

#### **Step 6: Get Product By ID**
```
GET http://localhost:3000/api/v1/products/66a1b2c3d4e5f6g7h8i9j0k1

Response:
{
  "_id": "66a1b2c3d4e5f6g7h8i9j0k1",
  "title": "Laptop Dell XPS 13",
  "slug": "laptop-dell-xps-13",
  "price": 1200,
  "description": "High-performance laptop for professionals",
  "images": ["https://i.imgur.com/dell-xps.jpeg"],
  "category": "66a1b2c3d4e5f6g7h8i9j0k0",
  "isDeleted": false
}
```

#### **Step 7: Update Product (Optional)**
```
PUT http://localhost:3000/api/v1/products/66a1b2c3d4e5f6g7h8i9j0k1

Request Body:
{
  "price": 1149,
  "description": "Updated description - High-performance laptop for professionals"
}

Response:
{
  "_id": "66a1b2c3d4e5f6g7h8i9j0k1",
  "title": "Laptop Dell XPS 13",
  "price": 1149,
  "description": "Updated description - High-performance laptop for professionals"
}
```

---

### Phase 4: Test Inventory Management

#### **Step 1: Get All Inventories**
```
GET http://localhost:3000/api/v1/inventories

Response:
[
  {
    "_id": "66a1b2c3d4e5f6g7h8i9j0k10",  ← INVENTORY_ID_1
    "product": {
      "_id": "66a1b2c3d4e5f6g7h8i9j0k1",
      "title": "Laptop Dell XPS 13",
      "slug": "laptop-dell-xps-13",
      "price": 1200,
      "description": "High-performance laptop for professionals",
      "images": ["https://i.imgur.com/dell-xps.jpeg"]
    },
    "stock": 0,
    "reserved": 0,
    "soldCount": 0,
    "createdAt": "2024-03-25T10:35:00.000Z"
  },
  {
    "_id": "66a1b2c3d4e5f6g7h8i9j0k11",  ← INVENTORY_ID_2
    "product": {
      "_id": "66a1b2c3d4e5f6g7h8i9j0k2",
      "title": "iPhone 15 Pro Max",
      "price": 1099
    },
    "stock": 0,
    "reserved": 0,
    "soldCount": 0
  },
  {
    "_id": "66a1b2c3d4e5f6g7h8i9j0k12",  ← INVENTORY_ID_3
    "product": {
      "_id": "66a1b2c3d4e5f6g7h8i9j0k3",
      "title": "Sony WH-1000XM5 Headphones",
      "price": 399
    },
    "stock": 0,
    "reserved": 0,
    "soldCount": 0
  }
]

✅ Lưu lại:
   - INVENTORY_ID_1 = 66a1b2c3d4e5f6g7h8i9j0k10
   - INVENTORY_ID_2 = 66a1b2c3d4e5f6g7h8i9j0k11
   - INVENTORY_ID_3 = 66a1b2c3d4e5f6g7h8i9j0k12
```

#### **Step 2: Get Inventory By ID**
```
GET http://localhost:3000/api/v1/inventories/66a1b2c3d4e5f6g7h8i9j0k10

Response:
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
  "stock": 0,
  "reserved": 0,
  "soldCount": 0
}
```

---

## 🎬 INVENTORY WORKFLOW - Detailed Steps

### Product: Laptop Dell XPS 13 (PRODUCT_ID_1)

#### **Timeline:**

| Step | Action | Request | stock | reserved | soldCount | Notes |
|------|--------|---------|-------|----------|-----------|-------|
| 1 | Initial | Create Product | 0 | 0 | 0 | Auto Inventory |
| 2 | Add Stock | +50 | **50** | 0 | 0 | Warehouse received |
| 3 | Remove Stock | -10 | **40** | 0 | 0 | Damaged items |
| 4 | Reservation | -15 | **25** | **15** | 0 | Customer ordered |
| 5 | Sold | -15 from reserved | 25 | **0** | **15** | Order shipped |

---

### Add Stock - Increase Stock

```
POST http://localhost:3000/api/v1/inventories/add-stock

Headers:
Content-Type: application/json

Request Body:
{
  "product": "66a1b2c3d4e5f6g7h8i9j0k1",
  "quantity": 50
}

Response:
{
  "message": "Stock added successfully",
  "data": {
    "_id": "66a1b2c3d4e5f6g7h8i9j0k10",
    "product": "66a1b2c3d4e5f6g7h8i9j0k1",
    "stock": 50,        ← 0 + 50
    "reserved": 0,
    "soldCount": 0,
    "createdAt": "2024-03-25T10:35:00.000Z",
    "updatedAt": "2024-03-25T10:40:00.000Z"
  }
}

✅ Result: stock = 50
```

---

### Remove Stock - Decrease Stock

```
POST http://localhost:3000/api/v1/inventories/remove-stock

Request Body:
{
  "product": "66a1b2c3d4e5f6g7h8i9j0k1",
  "quantity": 10
}

Response:
{
  "message": "Stock removed successfully",
  "data": {
    "_id": "66a1b2c3d4e5f6g7h8i9j0k10",
    "product": "66a1b2c3d4e5f6g7h8i9j0k1",
    "stock": 40,        ← 50 - 10
    "reserved": 0,
    "soldCount": 0
  }
}

✅ Result: stock = 40
   
❌ Error Scenario:
If quantity > stock:
{
  "message": "Error removing stock",
  "error": "Insufficient stock. Available: 40"
}
```

---

### Reservation - Order Placed

```
POST http://localhost:3000/api/v1/inventories/reservation

Request Body:
{
  "product": "66a1b2c3d4e5f6g7h8i9j0k1",
  "quantity": 15
}

Response:
{
  "message": "Reservation created successfully",
  "data": {
    "_id": "66a1b2c3d4e5f6g7h8i9j0k10",
    "product": "66a1b2c3d4e5f6g7h8i9j0k1",
    "stock": 25,        ← 40 - 15 (Tính năng: Not available for other orders)
    "reserved": 15,     ← 0 + 15 (Đã được đặt hàng)
    "soldCount": 0
  }
}

✅ Result:
   - stock: 40 → 25 (Giảm do đã được đặt)
   - reserved: 0 → 15 (Tăng do customer đặt hàng)

📊 Inventory Status:
   - Available for sale: 25 units
   - Reserved (pending): 15 units
   - Total: 40 units
```

---

### Sold - Order Confirmed

```
POST http://localhost:3000/api/v1/inventories/sold

Request Body:
{
  "product": "66a1b2c3d4e5f6g7h8i9j0k1",
  "quantity": 15
}

Response:
{
  "message": "Sale recorded successfully",
  "data": {
    "_id": "66a1b2c3d4e5f6g7h8i9j0k10",
    "product": "66a1b2c3d4e5f6g7h8i9j0k1",
    "stock": 25,
    "reserved": 0,      ← 15 - 15 (Không còn đặt hàng)
    "soldCount": 15     ← 0 + 15 (Đã bán)
  }
}

✅ Result:
   - reserved: 15 → 0 (Hoàn thành đơn hàng)
   - soldCount: 0 → 15 (Tăng số lượng đã bán)

📊 Final Inventory:
   - In Stock (Available for sale): 25 units
   - Already Sold: 15 units
   - Total Original Stock: 40 units
```

---

## 💾 Data Summary - All IDs

```
ROLES:
  ROLE_ID = "66a1b2c3d4e5f6g7h8i9j0k4"

CATEGORIES:
  CATEGORY_ID = "66a1b2c3d4e5f6g7h8i9j0k0"

PRODUCTS:
  PRODUCT_ID_1 = "66a1b2c3d4e5f6g7h8i9j0k1"  (Laptop)
  PRODUCT_ID_2 = "66a1b2c3d4e5f6g7h8i9j0k2"  (iPhone)
  PRODUCT_ID_3 = "66a1b2c3d4e5f6g7h8i9j0k3"  (Headphones)

INVENTORIES:
  INVENTORY_ID_1 = "66a1b2c3d4e5f6g7h8i9j0k10"  (Laptop Inventory)
  INVENTORY_ID_2 = "66a1b2c3d4e5f6g7h8i9j0k11"  (iPhone Inventory)
  INVENTORY_ID_3 = "66a1b2c3d4e5f6g7h8i9j0k12"  (Headphones Inventory)
```

---

## 🐛 Common Errors & Solutions

### Error 1: "ID NOT FOUND"
```json
{
  "message": "ID NOT FOUND"
}
```
**Solution:** Check that you're using the correct ID format

---

### Error 2: "Insufficient stock"
```json
{
  "message": "Error removing stock",
  "error": "Insufficient stock. Available: 25"
}
```
**Solution:** Add more stock using Add Stock endpoint first

---

### Error 3: "product and quantity are required"
```json
{
  "message": "product and quantity are required"
}
```
**Solution:** Make sure both fields exist in request body

---

### Error 4: "Quantity must be greater than 0"
```json
{
  "message": "Error adding stock",
  "error": "Quantity must be greater than 0"
}
```
**Solution:** Use positive quantity only

---

## ✅ Checklist - Complete Testing

- [ ] Create Role (Optional)
- [ ] Create Category
- [ ] Get All Categories
- [ ] Get Category By ID
- [ ] Create Product 1 (Laptop) - Auto Inventory Created
- [ ] Create Product 2 (iPhone) - Auto Inventory Created
- [ ] Create Product 3 (Headphones) - Auto Inventory Created
- [ ] Get All Products
- [ ] Get Products with Filter
- [ ] Get Product By ID
- [ ] Get All Inventories
- [ ] Get Inventory By ID
- [ ] Add Stock (50)
- [ ] Remove Stock (10)
- [ ] Reservation (15)
- [ ] Sold (15)
- [ ] Verify Final State: stock=25, reserved=0, soldCount=15

---

## 🎓 Learning Outcomes

✅ Understand API structure and endpoints  
✅ Learn request/response format  
✅ Practice using Postman  
✅ Understand inventory management flow  
✅ Handle error scenarios  

---

## 📞 Notes

- All IDs are examples - replace with actual IDs from your responses
- MongoDB must be running on localhost:27017
- Server must be running on port 3000
- Use MongoDB Compass to verify data changes in real-time
