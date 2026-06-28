# DesignDrop — Database Schema & ER Diagram
*Step 2 of project documentation — /docs folder*

---

## Entity Relationship Overview

```
USER ──────────── DESIGNER_PROFILE  (1 to 0..1)
USER ──────────── COMPANY_PROFILE   (1 to 0..1)
USER ──────────── LISTING           (1 to many, as seller)
USER ──────────── ORDER             (1 to many, as buyer)
USER ──────────── CART              (1 to 1)
CATEGORY ──────── LISTING           (1 to many)
LISTING ────────  CART_ITEM         (1 to many)
LISTING ────────  ORDER_ITEM        (1 to many)
CART ───────────  CART_ITEM         (1 to many)
ORDER ──────────  ORDER_ITEM        (1 to many)
```

---

## Tables

### 1. USER
Central table for all platform users. Role determines what each user can do.

| Column | Type | Notes |
|---|---|---|
| user_id | INT (PK) | Auto-increment |
| email | VARCHAR(255) | Unique, not null |
| password_hash | VARCHAR(255) | Bcrypt hashed |
| role | ENUM | designer, company, customer, admin |
| created_at | DATETIME | Default: now() |

**Notes:**
- One table covers all roles — the `role` field controls permissions in the backend
- Admin accounts created manually, not through public registration

---

### 2. DESIGNER_PROFILE
Extended profile for users with role = designer. Linked 1-to-1 with USER.

| Column | Type | Notes |
|---|---|---|
| profile_id | INT (PK) | Auto-increment |
| user_id | INT (FK → USER) | Unique |
| display_name | VARCHAR(100) | Public-facing name |
| bio | TEXT | Designer description |
| profile_picture | VARCHAR(500) | Image URL/path |

---

### 3. COMPANY_PROFILE
Extended profile for users with role = company. Linked 1-to-1 with USER.

| Column | Type | Notes |
|---|---|---|
| company_id | INT (PK) | Auto-increment |
| user_id | INT (FK → USER) | Unique |
| company_name | VARCHAR(150) | Not null |
| description | TEXT | About the company |
| logo | VARCHAR(500) | Image URL/path |

---

### 4. CATEGORY
Simple lookup table for grouping listings (e.g. streetwear, minimalist, abstract, vintage).

| Column | Type | Notes |
|---|---|---|
| category_id | INT (PK) | Auto-increment |
| name | VARCHAR(100) | Unique, not null |

---

### 5. LISTING
Core table — covers both listing types (design and stock).

| Column | Type | Notes |
|---|---|---|
| listing_id | INT (PK) | Auto-increment |
| seller_id | INT (FK → USER) | Not null |
| category_id | INT (FK → CATEGORY) | Not null |
| title | VARCHAR(200) | Not null |
| description | TEXT | |
| price | DECIMAL(10,2) | Not null |
| listing_type | ENUM | design (print-on-demand), stock (ready-made) |
| stock_quantity | INT | Nullable — only applies to stock listings |
| status | ENUM | pending, approved, rejected, active |
| image_url | VARCHAR(500) | Design/product image |
| created_at | DATETIME | Default: now() |

**Notes:**
- `listing_type = design` → goes through admin originality review before `status` changes to approved
- `listing_type = stock` → can also require review, or auto-approve (admin decision)
- `stock_quantity` is NULL for design listings (printed on demand, no pre-made stock)

---

### 6. CART
One cart per user. Created automatically at registration.

| Column | Type | Notes |
|---|---|---|
| cart_id | INT (PK) | Auto-increment |
| user_id | INT (FK → USER) | Unique |

---

### 7. CART_ITEM
Individual items inside a cart.

| Column | Type | Notes |
|---|---|---|
| cart_item_id | INT (PK) | Auto-increment |
| cart_id | INT (FK → CART) | Not null |
| listing_id | INT (FK → LISTING) | Not null |
| quantity | INT | Default: 1 |

---

### 8. ORDER
A completed purchase. Created from a cart at checkout.

| Column | Type | Notes |
|---|---|---|
| order_id | INT (PK) | Auto-increment |
| buyer_id | INT (FK → USER) | Not null |
| total_amount | DECIMAL(10,2) | Snapshot at time of purchase |
| status | ENUM | placed, processing, delivered |
| created_at | DATETIME | Default: now() |

---

### 9. ORDER_ITEM
Individual items within an order.

| Column | Type | Notes |
|---|---|---|
| order_item_id | INT (PK) | Auto-increment |
| order_id | INT (FK → ORDER) | Not null |
| listing_id | INT (FK → LISTING) | Not null |
| quantity | INT | Not null |
| price_at_purchase | DECIMAL(10,2) | Snapshot — saves price at time of buying, so price changes don't affect old orders |

---

## Key Design Decisions

| Decision | Reason |
|---|---|
| Single USER table for all roles | Simpler auth and session management; role field controls permissions |
| Separate DESIGNER_PROFILE and COMPANY_PROFILE | Different fields for different roles; keeps USER table clean |
| listing_type ENUM on LISTING | Avoids two separate listing tables; one query covers both types |
| price_at_purchase on ORDER_ITEM | Seller can change price later — order history stays accurate |
| CART as separate table | Cart persists across sessions; separates shopping state from order history |
| status on LISTING | Enables admin review/approval flow before a listing goes public |

---

## Next Step
→ Step 3: Wireframes / Page Flow
