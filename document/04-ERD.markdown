# 📊 Entity-Relationship Diagram (ERD)

## User Table
- id (UUID, PK, index)
- Email (string, unique)
- Name (string)
- Avatar (string)
- Created_at (datetime)

## Refresh Token Table
- id (UUID, PK, index)
- user_id (FK → users.id, index)
- token (string)
- expires_at (datetime)

## Prices Table
- id (UUID, PK, index)
- asset_id (FK → assets.id, index)
- price (float)
- timestamp (datetime)

## Assets Table
- id (UUID, PK, index)
- symbol (string, unique)
- name (string)
- created_at (datetime)

## Portfolios Table
- id (UUID, PK, index)
- user_id (FK → users.id, index)
- total_value (float)
- updated_at (datetime)

## Holdings Table
- id (UUID, PK, index)
- portfolio_id (FK → portfolios.id, index)
- asset_symbol (string)
- quantity (float)
- avg_buy_price (float)

## Orders Table
- id (UUID, PK, index)
- user_id (FK → users.id, index)
- portfolio_id (FK → portfolios.id, index) (optional)
- asset_symbol (string)
- type ("BUY" | "SELL")
- quantity (float)
- filled_price (float)
- status ("FILLED" | "CANCELLED")
- created_at (datetime)

## Feed Logs Table
- id (UUID, PK, index)
- user_name (string)
- action ("BUY" | "SELL")
- asset_symbol (string)
- quantity (float)
- price (float)
- timestamp (datetime)