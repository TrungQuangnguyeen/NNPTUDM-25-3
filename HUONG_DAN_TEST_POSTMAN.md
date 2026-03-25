# 📖 Hướng Dẫn Test Inventory API Bằng Postman

## 🚀 Chuẩn Bị

1. **Mở Postman**
2. **Import Collection:**
   - Vào `File` → `Import`
   - Chọn file `Inventory_API_Testing.postman_collection.json`
   - Hoặc copy paste từ file collection

3. **Đảm bảo MongoDB và server đang chạy:**
   ```bash
   npm start
   ```

---

## 📋 6 Bước Test Chi Tiết

### **1️⃣ Tạo Product (Inventory Tự Động Được Tạo)**

**Method:** `POST`  
**URL:** `http://localhost:3000/api/v1/products`

**Request Body:**
```json
{
  "title": "Laptop Dell XPS 13",
  "price": 1200,
  "description": "High-performance laptop for professionals",
  "images": ["https://i.imgur.com/laptop.jpeg"],
  "category": "YOUR_CATEGORY_ID"
}
```

**Headers:**
- `Content-Type: application/json`

**Bước thực hiện:**
1. Mở tab mới trong Postman
2. Chọn method `POST`
3. Paste URL vào
4. Tab `Body` → chọn `raw` → `JSON`
5. Paste request body
6. Thay `YOUR_CATEGORY_ID` bằng category ID thực tế
7. Click `Send`

**Response (Lưu lại Product ID):**
```json
{
  "_id": "66a1b2c3d4e5f6g7h8i9j0k1",  // ← LƯU LẠI ID NÀY
  "title": "Laptop Dell XPS 13",
  "slug": "laptop-dell-xps-13",
  "price": 1200,
  "description": "High-performance laptop for professionals",
  "images": ["https://i.imgur.com/laptop.jpeg"],
  "category": "YOUR_CATEGORY_ID",
  "isDeleted": false,
  "createdAt": "2024-03-25T10:30:00.000Z",
  "updatedAt": "2024-03-25T10:30:00.000Z",
  "__v": 0
}
```

**✅ Kết quả:** Product được tạo, Inventory tương ứng cũng tự động được tạo

---

### **2️⃣ Lấy Tất Cả Inventories**

**Method:** `GET`  
**URL:** `http://localhost:3000/api/v1/inventories`

**Bước thực hiện:**
1. Mở tab mới trong Postman
2. Chọn method `GET`
3. Paste URL
4. Click `Send`

**Response (Lưu lại Inventory ID):**
```json
[
  {
    "_id": "66a1b2c3d4e5f6g7h8i9j0k2",  // ← LƯU LẠI ID NÀY
    "product": {
      "_id": "66a1b2c3d4e5f6g7h8i9j0k1",
      "title": "Laptop Dell XPS 13",
      "slug": "laptop-dell-xps-13",
      "price": 1200,
      "description": "High-performance laptop for professionals",
      "images": ["https://i.imgur.com/laptop.jpeg"]
    },
    "stock": 0,
    "reserved": 0,
    "soldCount": 0,
    "createdAt": "2024-03-25T10:30:00.000Z",
    "updatedAt": "2024-03-25T10:30:00.000Z",
    "__v": 0
  }
]
```

**✅ Kết quả:** Xem tất cả inventory (stock = 0, reserved = 0, soldCount = 0)

---

### **3️⃣ Lấy Inventory Theo ID (Join Product)**

**Method:** `GET`  
**URL:** `http://localhost:3000/api/v1/inventories/66a1b2c3d4e5f6g7h8i9j0k2`

**Bước thực hiện:**
1. Mở tab mới trong Postman
2. Chọn method `GET`
3. Paste URL và thay Inventory ID từ bước 2
4. Click `Send`

**Response:**
```json
{
  "_id": "66a1b2c3d4e5f6g7h8i9j0k2",
  "product": {
    "_id": "66a1b2c3d4e5f6g7h8i9j0k1",
    "title": "Laptop Dell XPS 13",
    "slug": "laptop-dell-xps-13",
    "price": 1200,
    "description": "High-performance laptop for professionals",
    "images": ["https://i.imgur.com/laptop.jpeg"]
  },
  "stock": 0,
  "reserved": 0,
  "soldCount": 0
}
```

**✅ Kết quả:** Xem chi tiết inventory kèm thông tin product

---

### **4️⃣ Tăng Stock (Add Stock)**

**Method:** `POST`  
**URL:** `http://localhost:3000/api/v1/inventories/add-stock`

**Request Body:**
```json
{
  "product": "66a1b2c3d4e5f6g7h8i9j0k1",
  "quantity": 50
}
```

**Bước thực hiện:**
1. Mở tab mới trong Postman
2. Chọn method `POST`
3. Paste URL
4. Tab `Body` → `raw` → `JSON`
5. Paste request body, thay Product ID từ bước 1
6. Click `Send`

**Response:**
```json
{
  "message": "Stock added successfully",
  "data": {
    "_id": "66a1b2c3d4e5f6g7h8i9j0k2",
    "product": "66a1b2c3d4e5f6g7h8i9j0k1",
    "stock": 50,        // ← Tăng từ 0 → 50
    "reserved": 0,
    "soldCount": 0
  }
}
```

**✅ Kết quả:** stock = 50

---

### **5️⃣ Giảm Stock (Remove Stock)**

**Method:** `POST`  
**URL:** `http://localhost:3000/api/v1/inventories/remove-stock`

**Request Body:**
```json
{
  "product": "66a1b2c3d4e5f6g7h8i9j0k1",
  "quantity": 10
}
```

**Bước thực hiện:**
1. Mở tab mới trong Postman
2. Chọn method `POST`
3. Paste URL
4. Tab `Body` → `raw` → `JSON`
5. Paste request body
6. Click `Send`

**Response:**
```json
{
  "message": "Stock removed successfully",
  "data": {
    "_id": "66a1b2c3d4e5f6g7h8i9j0k2",
    "product": "66a1b2c3d4e5f6g7h8i9j0k1",
    "stock": 40,        // ← Giảm từ 50 → 40
    "reserved": 0,
    "soldCount": 0
  }
}
```

**✅ Kết quả:** stock = 40 (50 - 10)

---

### **6️⃣ Đặt Hàng (Reservation)**

**Method:** `POST`  
**URL:** `http://localhost:3000/api/v1/inventories/reservation`

**Request Body:**
```json
{
  "product": "66a1b2c3d4e5f6g7h8i9j0k1",
  "quantity": 15
}
```

**Bước thực hiện:**
1. Mở tab mới trong Postman
2. Chọn method `POST`
3. Paste URL
4. Tab `Body` → `raw` → `JSON`
5. Paste request body
6. Click `Send`

**Response:**
```json
{
  "message": "Reservation created successfully",
  "data": {
    "_id": "66a1b2c3d4e5f6g7h8i9j0k2",
    "product": "66a1b2c3d4e5f6g7h8i9j0k1",
    "stock": 25,        // ← Giảm từ 40 → 25
    "reserved": 15,     // ← Tăng từ 0 → 15
    "soldCount": 0
  }
}
```

**✅ Kết quả:**
- stock = 25 (40 - 15)
- reserved = 15

---

### **7️⃣ Xác Nhận Bán (Sold)**

**Method:** `POST`  
**URL:** `http://localhost:3000/api/v1/inventories/sold`

**Request Body:**
```json
{
  "product": "66a1b2c3d4e5f6g7h8i9j0k1",
  "quantity": 15
}
```

**Bước thực hiện:**
1. Mở tab mới trong Postman
2. Chọn method `POST`
3. Paste URL
4. Tab `Body` → `raw` → `JSON`
5. Paste request body
6. Click `Send`

**Response:**
```json
{
  "message": "Sale recorded successfully",
  "data": {
    "_id": "66a1b2c3d4e5f6g7h8i9j0k2",
    "product": "66a1b2c3d4e5f6g7h8i9j0k1",
    "stock": 25,
    "reserved": 0,      // ← Giảm từ 15 → 0
    "soldCount": 15     // ← Tăng từ 0 → 15
  }
}
```

**✅ Kết quả:**
- reserved = 0 (15 - 15)
- soldCount = 15

---

## 📊 Tóm Tắt Trạng Thái Sau Các Bước

| Bước | stock | reserved | soldCount | Hành động |
|------|-------|----------|-----------|-----------|
| Tạo Product | 0 | 0 | 0 | Tạo inventory |
| Add Stock 50 | 50 | 0 | 0 | Tăng stock |
| Remove Stock 10 | 40 | 0 | 0 | Giảm stock |
| Reservation 15 | 25 | 15 | 0 | Đặt hàng |
| Sold 15 | 25 | 0 | 15 | Xác nhận bán |

---

## 🐛 Xử Lý Lỗi

### Lỗi 1: "Insufficient stock"
```json
{
  "message": "Error removing stock",
  "error": "Insufficient stock. Available: 5"
}
```
**Giải pháp:** Giảm quantity hoặc thêm stock trước

### Lỗi 2: "Inventory not found"
```json
{
  "message": "Error ...",
  "error": "Inventory not found for this product"
}
```
**Giải pháp:** Kiểm tra lại Product ID

### Lỗi 3: "product and quantity are required"
```json
{
  "message": "product and quantity are required"
}
```
**Giải pháp:** Thêm đủ field `product` và `quantity` trong body

---

## 💡 Tips Postman

1. **Lưu ID để tái sử dụng:** Nếu bạn muốn không phải copy-paste, dùng Environment Variables
2. **Test Multiple Times:** Có thể test lại bươc 4-7 với số lượng khác
3. **Kiểm tra Database:** Dùng MongoDB Compass để quan sát thay đổi trong database

---

## ✨ Hoàn Tất!

Bạn đã test thành công 6 chức năng Inventory Management!
