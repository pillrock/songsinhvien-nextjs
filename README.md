# 🚀 Songsinhvien Next.js

Ứng dụng quản lý phòng và người dùng cho sinh viên, xây dựng với Next.js & PostgreSQL.

![Build](https://img.shields.io/badge/build-passing-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)

## 📖 Giới thiệu

- Quản lý user và phòng theo quan hệ N-1
- Hỗ trợ xác thực JWT và phân quyền
- CRUD API với Next.js + PostgreSQL
- Giao diện hiện đại, dễ sử dụng

## 🛠️ Công nghệ sử dụng

- **Frontend**: [Next.js](https://nextjs.org/) (React, SSR/ISR)
- **Backend**: [Next.js](https://nextjs.org/) (API routes)
- **Database**: PostgreSQL by [Neon](https://neon.com/)
- **No ORM**: Using raw query SQL by [postgres](https://www.npmjs.com/package/postgres)
- **Authentication**: JSON Web Token (JWT) by [jose](https://www.npmjs.com/package/jose)
- **Rate Limit API**: @upstash/ratelimit using Redis [upstash](https://upstash.com)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Deployment**: [Vercel](https://vercel.com/) / [Docker](https://www.docker.com/)
- **Dev Tools**: ESLint, Prettier

## ✨ Tính năng

- Đăng ký / Đăng nhập
- Tạo phòng, thêm thành viên
- Phân quyền người dùng (Admin, Member)
- Tiện ích (theo phòng):
  - Mua sắm
  - ... (mở rộng theo dự án)

## 📂 Cấu trúc thư mục

```
├── src/
│   ├── lib/         # Kết nối DB, tiện ích..
│   ├── app/         # API routes & pages frontend
│   └── components/  # UI components
│   └── middleware/  # Các luồng xác thực
├── public/          # Tài nguyên tĩnh
└── README.md
```

## ⚙️ Cài đặt

```bash
git clone https://github.com/pillrock/songsinhvien-nextjs.git
cd songsinhvien-nextjs
npm install
```

## ▶️ Chạy dự án

```bash
# Phát triển
npm run dev

# Build
npm run build

# Khởi động production
npm start
```

## 🔧 Cấu hình

Tạo file `.env` với nội dung:

```
PGHOST =
PGDATABASE =
PGUSER =
PGPASSWORD =

JWT_SECRET =

UPSTASH_REDIS_REST_URL =
UPSTASH_REDIS_REST_TOKEN =

```

## 📡 API Endpoints

### 🔐 Auth

- `POST /api/sign-up` → Đăng ký tài khoản
- `POST /api/sign-in` → Đăng nhập

### 🛠 Dev

- `GET /api/ping` → Kiểm tra server hoạt động
- `GET /api/dev/db-check` → Kiểm tra kết nối database
- `GET /api/dev/create-table` → Tạo bảng (test/dev)
- `GET /api/dev/insert-data` → Thêm dữ liệu mẫu (test/dev)

### 🏠 Room

- `GET /api/room/:roomId` → Lấy phòng theo id
- `GET /api/room/get-users/:roomId` → Lấy danh sách users trong phòng
- `POST /api/room/create-room` → Tạo phòng mới
- `POST /api/room/join-room` → Tham gia phòng
- `POST /api/room/leave-room` → Rời khỏi phòng
- `PUT /api/room/update-room` → Cập nhật thông tin phòng
- `DELETE /api/room/delete-room` → Xóa phòng
- `GET /api/room/me` → Lấy thông tin phòng của user hiện tại

### 🛒 Shopping / Transaction

- `POST /api/shopping/create-transaction` → Tạo giao dịch
- `GET /api/shopping/get-all-transaction` → Lấy toàn bộ giao dịch
- `GET /api/shopping/get-transaction-by-room` → Lấy giao dịch theo phòng
- `DELETE /api/shopping/delete-transaction` → Xóa giao dịch

### 👤 User

- `PUT /api/user/change-password` → Đổi mật khẩu

## 🖼️ Screenshot

![Trang đăng nhập](./docs/login.png)

## 🧪 Testing

```bash
npm run test
```

## 🤝 Đóng góp

PRs welcome! Mọi góp ý xin mở issue hoặc liên hệ trực tiếp.

## 📜 License

MIT © 2025
