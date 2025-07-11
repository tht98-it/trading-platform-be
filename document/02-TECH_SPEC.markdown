# 📄 Technical Specification (Microservices Architecture)

## 🧱 1. Kiến trúc tổng quan

### Kiểu hệ thống

- Kiến trúc: Microservices (scalable, tách module rõ ràng)
- Giao tiếp client-server: REST + WebSocket
- Giao tiếp giữa services: HTTP (REST) + Redis Pub/Sub (event-driven)
- Realtime: WebSocket qua Gateway + Redis channel
- Mỗi service có database riêng (DB per service pattern)

---

## 📦 2. Danh sách services chính

| Service                  | Chức năng chính                       |
| ------------------------ | ------------------------------------- |
| **gateway-service**      | Entry point cho REST & WebSocket      |
| **auth-service**         | Google OAuth2, JWT, Refresh token     |
| **user-service**         | Profile người dùng                    |
| **asset-service**        | Quản lý asset + cập nhật giá realtime |
| **order-service**        | Xử lý order market, lưu lịch sử       |
| **portfolio-service**    | Tính danh mục nắm giữ của user        |
| **feed-service**         | Emit realtime feed sự kiện (pub/sub)  |
| **notification-service** | Cảnh báo giá, thông báo hệ thống      |

---

## ⚙️ 3. Tech Stack

| Layer        | Stack                                                        |
| ------------ | ------------------------------------------------------------ |
| **Frontend** | Next.js (App Router), TailwindCSS, Zustand, socket.io-client |
| **Backend**  | NestJS (microservices), PostgreSQL, Redis                    |
| **Auth**     | Google OAuth2, JWT Access/Refresh                            |
| **Realtime** | WebSocket (socket.io), Redis Pub/Sub                         |
| **DevOps**   | Docker, GitHub Actions, Railway / Vercel                     |

---

## 🔌 4. Giao tiếp giữa các service

- **REST API**: Gateway ↔ các service (proxy)
- **Redis Pub/Sub**: order → portfolio, order → feed
- **gRPC** _(optional v2)_: service ↔ service
- **WebSocket**: gateway giữ kết nối với client

---

## 🧩 5. Mô tả chi tiết các service

### 5.1 gateway-service

- Route REST API tới các backend service
- WebSocket Gateway: giữ kết nối, emit event
- Middleware xác thực JWT
- Xử lý reconnect và timeout cho WebSocket

### 5.2 auth-service

- Google OAuth2 + exchange token
- JWT generation + Refresh token
- Bảo mật route bằng guard

### 5.3 user-service

- CRUD profile
- Lưu thông tin Google user
- Cập nhật avatar, display name

### 5.4 asset-service

- Danh sách các tài sản (BTC, ETH, AAPL...)
- Lấy giá từ cron mock trong MVP
- Emit giá realtime qua WebSocket
- Cung cấp lịch sử giá cho biểu đồ

### 5.5 order-service

- Xử lý lệnh mua/bán (market)
- Tính giá tại thời điểm đặt lệnh
- Emit event:
  - 🔁 Gửi về portfolio-service để update holdings
  - 🔁 Gửi về feed-service để stream ra frontend

### 5.6 portfolio-service

- Quản lý tài sản user đang nắm giữ
- API: GET /portfolio, tính tổng NAV
- Lắng nghe event từ order-service → cập nhật holdings

### 5.7 feed-service

- Lưu lại event hoạt động gần đây
- Emit ra WebSocket → feed người dùng

---

## 🛢 6. Database Schema (tổng quan)

| Service           | Table chính                     |
| ----------------- | ------------------------------- |
| auth-service      | users, sessions, refresh_tokens |
| asset-service     | assets, prices                  |
| order-service     | orders                          |
| portfolio-service | portfolios, holdings            |
| feed-service      | feed_logs                       |

👉 Sơ đồ chi tiết: `docs/04-ERD.drawio` (đã cập nhật)

---

## 🚀 7. Realtime Flow

1. User đặt lệnh BUY BTC
2. `order-service` tạo order, emit `order.created`
3. `portfolio-service` lắng nghe → cập nhật holdings
4. `feed-service` lắng nghe → emit feed → `gateway-service` → WebSocket tới client
5. `frontend` hiển thị realtime update
6. (Thất bại) Emit `order.error` nếu có lỗi

---

## 📚 8. Tài liệu liên quan

| Tài liệu                | File                       |
| ----------------------- | -------------------------- |
| Yêu cầu nghiệp vụ (PRD) | `01-PRD.md`                |
| Sơ đồ hệ thống          | `05-SYSTEM_DIAGRAM.drawio` |
| Sơ đồ DB                | `04-ERD.drawio`            |
| API Contract            | `03-API_SPEC.md`           |

---

## ✅ 9. Triển khai ban đầu

1. Init các service NestJS dạng monorepo (Nx hoặc Turbo)
2. Viết Dockerfile cho mỗi service
3. Dùng `docker-compose` để local dev environment:
   - PostgreSQL (với replica)
   - Redis (với Sentinel)
   - Gateway + auth + order + portfolio + asset

---

📌 **Lưu ý**:

- MVP bắt đầu với 5 service: `gateway`, `auth`, `order`, `portfolio`, `asset`
- Các service khác (feed, notification) bổ sung theo phase
- Thêm cơ chế retry và failover cho Redis Pub/Sub