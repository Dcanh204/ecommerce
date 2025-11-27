Link git dashboard: https://github.com/Dcanh204/ecommerce-dashboard.git

Link git backend: https://github.com/Dcanh204/ecommerce-backend.git

# 🚀 EasyShop – Nền tảng Thương mại Điện tử 

EasyShop là hệ thống thương mại điện tử hoàn chỉnh gồm giao diện người dùng hiện đại, backend RESTful API, và Dashboard quản trị dành cho Người bán & Admin.  
Hỗ trợ duyệt sản phẩm, quản lý giỏ hàng, đánh giá, chat realtime và phân tích dữ liệu bán hàng trực quan.

---

## ✨ Tính năng nổi bật

### 🛍️ Tính năng cho Khách hàng
- 🔎 **Tìm kiếm nâng cao** theo từ khóa, danh mục, khoảng giá
- 🎯 **Lọc sản phẩm** theo Giá / Danh mục / Đánh giá
- 🛒 **Giỏ hàng**: thêm, sửa, xóa sản phẩm
- ⭐ **Đánh giá sản phẩm** (sao + bình luận)
- 💬 **Chat realtime** với người bán
- ❤️ **Wishlist** (tùy chọn)
- 💳 **Thanh toán đơn hàng (Checkout)**  
  - Tính tổng tiền  
  - Nhập thông tin nhận hàng  
  - Xác nhận và tạo đơn hàng  

## 🛒 Tính năng cho Người bán (Seller)
- 🏬Tạo & mở cửa hàng riêng (Open Store)
  - Cung cấp thông tin cửa hàng (tên, mô tả, địa chỉ, logo)  
  - Gửi yêu cầu phê duyệt mở cửa hàng  
  - Sau khi Admin duyệt, người bán có quyền đăng sản phẩm 
📦 Quản lý sản phẩm: thêm / sửa / xóa
- 📊 Dashboard bán hàng: doanh thu, đơn hàng, sản phẩm
- 📨 Chat trực tiếp với khách hàng
---

## 🛡️ Tính năng cho Admin
- 🧑‍💼 Quản lý người bán (Seller)
- 📑 Duyệt yêu cầu mở gian hàng
- 🛒 Quản lý đơn hàng toàn hệ thống
- 📦 Quản lý sản phẩm
- 📉 Biểu đồ thống kê doanh thu – đơn hàng – sản phẩm

## ⚙️ Công nghệ sử dụng

### 🎨 Frontend
- ReactJS  
- Redux Toolkit  
- TailwindCSS  
- React Router DOM  
- react-apexcharts 

### 🖥️ Backend
- Node.js  
- Express.js  
- Mongoose  
- JWT Authentication  

### 🔧 Khác
- Cloudinary (upload ảnh)  
- WebSocket (chat realtime)  
- Bcrypt  
- Mô hình MVC  

## 📦 Cài đặt & chạy dự án

### 1️⃣ Clone toàn bộ dự án
```bash
# Frontend
git clone https://github.com/Dcanh204/ecommerce.git

# Dashboard
git clone https://github.com/Dcanh204/ecommerce-dashboard.git

# Backend 
git clone https://github.com/Dcanh204/ecommerce-backend.git
```
### 3️⃣ Cài đặt Dependencies

```bash
# Backend
cd ecommerce-backend
npm install

# Frontend (Client)
cd ../ecommerce
npm install

# Dashboard (Admin & Seller)
cd ../ecommerce-dashboard
npm install
```

## Cấu hình biến môi trường (.env)

Tạo file `.env` trong thư mục `ecommerce-backend` và thêm các biến môi trường sau:

```env
PORT=5000
DB_USERNAME=your_database_username
DB_PASSWORD=your_database_password
DB_NAME=your_database_name
JWT_SECRET=your_jwt_secret
CLOUDINARY_NAME=your_cloudinary_name
API_KEY_CLOUDINARY=your_cloudinary_api_key
API_SECRET_CLOUDINARY=your_cloudinary_api_secret
```
### 4️⃣ Khởi chạy Server
Chạy lệnh sau để khởi động dự án:

```bash
cd ecommerce-backend
npm run dev
```