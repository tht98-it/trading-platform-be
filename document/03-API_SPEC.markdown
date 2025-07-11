# 📘 API SPEC – Realtime Investment Tracker Platform

---

## 🔐 Auth API

### `POST /api/auth/google`

> Exchange Google OAuth token → JWT

#### Request Body

```json
{
  "idToken": "string (Google OAuth token)"
}
```

#### Response

```json
{
  "accessToken": "jwt",
  "refreshToken": "jwt",
  "user": {
    "id": "uuid",
    "email": "string",
    "name": "string",
    "avatar": "string"
  }
}
```

---

### `POST /api/auth/refresh`

> Get new access token from refresh token

#### Request Body

```json
{
  "refreshToken": "string"
}
```

#### Response

```json
{
  "accessToken": "string"
}
```

---

## 👤 User API

### `GET /api/user/me`

> Lấy thông tin người dùng hiện tại (cần JWT)

#### Response

```json
{
  "id": "uuid",
  "email": "string",
  "name": "string",
  "avatar": "string"
}
```

### `PUT /api/user/me`

> Cập nhật thông tin người dùng (cần JWT)

#### Request Body

```json
{
  "name": "string" (optional),
  "avatar": "string" (optional)
}
```

#### Response

```json
{
  "id": "uuid",
  "email": "string",
  "name": "string",
  "avatar": "string"
}
```

---

## 💰 Asset API

### `GET /api/assets`

> Danh sách các tài sản

#### Response

```json
[
  {
    "id": "uuid",
    "symbol": "BTC",
    "name": "Bitcoin",
    "currentPrice": 63452.3
  }
]
```

### `GET /api/assets/price-history`

> Lấy lịch sử giá tài sản cho biểu đồ

#### Query Params

- `symbol`: string (required)
- `period`: "1h" | "24h" | "7d" (default "24h")

#### Response

```json
{
  "symbol": "BTC",
  "prices": [
    { "timestamp": "2025-07-11T09:00:00Z", "price": 63452.3 },
    { "timestamp": "2025-07-11T10:00:00Z", "price": 63500.5 }
  ]
}
```

---

## 📈 Order API

### `POST /api/orders`

> Đặt lệnh market mua/bán

#### Request Body

```json
{
  "assetSymbol": "BTC",
  "type": "BUY" | "SELL",
  "quantity": 0.1,
  "portfolio_id": "uuid" (optional)
}
```

#### Response

```json
{
  "orderId": "uuid",
  "status": "FILLED",
  "filledPrice": 63500.5,
  "createdAt": "ISO Date"
}
```

#### Errors

```json
{
  "statusCode": 400,
  "message": "Invalid quantity",
  "error": "Bad Request"
}
{
  "statusCode": 402,
  "message": "Insufficient funds",
  "error": "Payment Required"
}
```

---

### `GET /api/orders`

> Lấy danh sách lệnh của user hiện tại

#### Query Params

- `limit`: default 10
- `page`: default 1

#### Response

```json
[
  {
    "orderId": "uuid",
    "assetSymbol": "BTC",
    "type": "BUY",
    "quantity": 0.1,
    "filledPrice": 63500.5,
    "status": "FILLED",
    "createdAt": "ISO Date",
    "portfolio_id": "uuid"
  }
]
```

---

## 📊 Portfolio API

### `GET /api/portfolio`

> Tổng quan danh mục đầu tư người dùng

#### Query Params

- `portfolio_id`: default lấy danh mục chính của user

#### Response

```json
{
  "id": "uuid",
  "totalValue": 10532.3,
  "holdings": [
    {
      "assetSymbol": "BTC",
      "quantity": 0.2,
      "avgBuyPrice": 63000,
      "currentPrice": 63500.5,
      "value": 12700.1,
      "pnl": 500.1
    }
  ]
}
```

---

## 🧠 Feed API

### `GET /api/feed`

> Xem realtime feed các hoạt động giao dịch của cộng đồng

#### Response

```json
[
  {
    "userName": "Alice",
    "action": "BUY",
    "assetSymbol": "BTC",
    "quantity": 0.1,
    "price": 63500.5,
    "timestamp": "ISO Date"
  }
]
```

---

## 🔌 WebSocket Events

> Namespace: `/ws`

| Event              | Payload                             | Mô tả                        |
| ------------------ | ----------------------------------- | ---------------------------- |
| `price:update`     | `{ symbol: string, price: number }` | Cập nhật giá tài sản         |
| `feed:new`         | Feed event như REST `/api/feed`     | Giao dịch mới từ user khác   |
| `portfolio:update` | Holdings mới sau khi lệnh fill      | Cập nhật realtime cho client |
| `order.error`      | `{ message: string, orderId: uuid }`| Thông báo lỗi khi đặt lệnh   |

---

## ⛔ Errors (format chuẩn)

```json
{
  "statusCode": 401,
  "message": "Unauthorized",
  "error": "Unauthorized"
}
{
  "statusCode": 500,
  "message": "Internal server error",
  "error": "Internal Server Error"
}
```

---

## 👋 Authentication

- Route `/api/*` cần header: `Authorization: Bearer <token>`
- Socket.io client truyền token qua auth:

```ts
const socket = io("/ws", {
  auth: {
    token: "your_jwt",
  },
});
```