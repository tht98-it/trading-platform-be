# 📊 Entity-Relationship Diagram (ERD)

## User

- id (UUID, PK)
- email (string, unique)
- name (string)
- avatar (string)
- google_id (string, unique)
- created_at (datetime)

## Refresh Token

- id (UUID, PK)
- user_id (FK → users.id)
- token (string)
- expires_at (datetime)

## Assets

- id (UUID, PK)
- symbol (string, unique)
- name (string)
- created_at (datetime)

## Prices

- id (UUID, PK)
- asset_id (FK → assets.id)
- price (float)
- timestamp (datetime)

## Portfolios

- id (UUID, PK)
- user_id (FK → users.id)
- total_value (float)
- updated_at (datetime)

## Holdings

- id (UUID, PK)
- portfolio_id (FK → portfolios.id)
- asset_id (FK → assets.id)
- quantity (float)
- avg_buy_price (float)

## Orders

- id (UUID, PK)
- user_id (FK → users.id)
- portfolio_id (FK → portfolios.id, optional)
- asset_id (FK → assets.id)
- type ("BUY" | "SELL")
- quantity (float)
- filled_price (float)
- status ("FILLED" | "CANCELLED")
- created_at (datetime)

## Feed Logs

- id (UUID, PK)
- user_id (FK → users.id)
- asset_id (FK → assets.id)
- action ("BUY" | "SELL")
- quantity (float)
- price (float)
- timestamp (datetime)

## Notification

- id (UUID, PK)
- user_id (FK → users.id)
- message (string)
- type ("PRICE_ALERT" | "SYSTEM")
- created_at (datetime)
