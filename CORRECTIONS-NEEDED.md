# Landing Page Corrections Needed

Based on CLAUDE.md and payment-system.md documentation review.

## ❗ CRITICAL Corrections

### 1. Pricing - WRONG!
**Current (INCORRECT):**
- Hero Section: "$0.10 per page"
- Pricing Section: "$0.10 per page"
- Calculator showing wrong amounts

**Should Be:**
- **$0.01 per page** (1 credit = $0.01, 1 credit per page)

**Files to Update:**
- `index.html` - Line ~568 (pricing section)
- `main.js` - Line ~40 (`const pricePerPage = 0.10;` → `0.01`)

---

## 📝 Content Corrections

### 2. Pricing Section - Add Actual Packages

**Current:** Simple "$0.10 per page" card

**Should Show:** Actual credit packages with bonus structure:

| Package | Price | Credits | Bonus | Total | Badge |
|---------|-------|---------|-------|-------|-------|
| Tester | $1 | 10 | 0 | 10 | - |
| Starter | $10 | 100 | 0 | 100 | - |
| Growth | $45 | 500 | +50 | 550 | BEST VALUE |
| Pro | $85 | 1,000 | +150 | 1,150 | - |
| Enterprise | $400 | 5,000 | +1,000 | 6,000 | - |

**What's Included (Same for All):**
- Unlimited flows
- Unlimited team members
- AI field discovery
- CSV exports
- API & webhook access
- Email triggers
- Auto-recharge with spend limits
- Direct database queries (JSONB)

### 3. Email Integration - Expand Details

**Current:** "Forward emails to your Tavnit address"

**Should Be:**
```
Email Integration
Forward emails to your unique organization address:
your-org@process.tavnit.com

✓ Automatic attachment processing
✓ Replies with extracted data
✓ Zero-setup integration
✓ Supports any email client
```

### 4. Features Section - Add Missing Features

**Currently Missing:**
- Auto-recharge with credit thresholds
- Monthly spend caps for cost control
- Direct JSONB database queries
- Real-time Supabase subscriptions

**Feature Cards to Update:**

**Credit-Based Billing** (enhance existing):
```
Credit-Based Billing
$0.01 per page. Auto-recharge when low. Monthly spend caps.

✓ 1 credit = 1 page = $0.01
✓ Auto-recharge at custom threshold
✓ Monthly spend limits
✓ Transparent, predictable costs
```

**Real-Time Dashboard** (enhance existing):
```
Real-Time Dashboard
Track usage, flows, and pages with live updates powered by Supabase.

✓ Real-time Supabase subscriptions
✓ Track documents, flows, pages
✓ Live status updates
✓ Usage analytics & reports
```

**Developer-Friendly APIs** (enhance existing):
```
Developer-Friendly APIs
REST API, webhooks, email triggers, and direct JSONB queries.

✓ REST API with API keys
✓ Webhooks for automation
✓ Email triggers
✓ Direct JSONB database queries
```

### 5. How It Works - Clarify Workflow

**Step 2 "AI Extracts Data" should mention:**
```
AI Extracts Data
GPT-4 Vision analyzes document structure

✓ Upload 1-5 sample PDFs
✓ AI discovers fields automatically
✓ Review and customize field definitions
✓ Process unlimited documents
```

### 6. Authentication - Specify Google OAuth Only

**Currently says:** "No credit card required" (vague about signup)

**Should Say:**
```
Sign up with Google (OAuth)
No email/password needed. Secure Google authentication only.
```

---

## 🎯 Technical Accuracy Updates

### 7. Use Cases - Clarify Workflow Steps

**Each use case should follow actual workflow:**

1. **Create Flow** (via Flutter app)
2. **Upload Samples** (1-5 PDFs)
3. **AI Field Discovery** (Flask analyzes structure)
4. **Review/Edit Fields** (user customizes)
5. **Activate Flow**
6. **Process Documents** (upload PDFs)
7. **Extract Data** (Flask + OpenAI)
8. **Store Results** (Supabase `runs.output_json` JSONB column)
9. **Export/Query** (CSV, API, direct SQL queries)

### 8. Integration Section - Add Details

**API Integration - Add Code Example:**
```bash
# Create run in Supabase (via Flutter/API)
POST /api/runs
{
  "org_id": "uuid",
  "flow_id": "uuid",
  "filename": "invoice.pdf"
}

# Upload PDF for processing (to Flask AI service)
POST /api/runs/{run_id}/process
{
  "run_id": "uuid",
  "pdf_file": <binary>
}

# Retrieve results (from Supabase)
GET /api/runs/{run_id}
# Returns: output_json (JSONB with extracted data)
```

### 9. Architecture Clarity

**Add Technical Details Section (Optional):**
```
Built on Modern Architecture

Supabase: PostgreSQL database with Row-Level Security, Google OAuth, real-time subscriptions
Flask: AI services (OpenAI GPT-4 Vision) for field discovery and extraction
Flutter: Cross-platform UI with direct database access

Results stored in JSONB columns for instant queries
Real-time updates via Supabase subscriptions
```

---

## 🏷️ Branding Question

### 10. Product Name Clarification Needed

**Documentation uses both:**
- "Tavnit" (in architecture docs, repository name)
- "Ogen" (in payment system docs, Flutter app)

**Current Landing Page:** "Tavnit" everywhere

**Question for User:** Should landing page use "Tavnit" or "Ogen"?
- If "Ogen": Update all instances of "Tavnit" in landing page
- If "Tavnit": Keep as is (documentation may have legacy references to "Ogen")

---

## 📊 Priority Order

### Must Fix Immediately:
1. ✅ Pricing: $0.10 → $0.01 per page
2. ✅ Calculator: Update to use correct price
3. ✅ Pricing section: Show actual credit packages

### Should Fix:
4. ✅ Email integration: Expand details
5. ✅ Features: Add auto-recharge, spend caps, JSONB queries
6. ✅ Authentication: Specify Google OAuth only

### Nice to Have:
7. ✅ Use cases: Add detailed workflow steps
8. ✅ API examples: Show actual endpoints
9. ✅ Technical architecture: Add details section

### Clarify:
10. ❓ Product name: "Tavnit" or "Ogen"?

---

## 🔧 Quick Fix Commands

### Fix Pricing (Critical):

**In `index.html` (Line ~568):**
```html
<!-- OLD -->
<span class="price">0.10</span>
<span class="unit">per page</span>

<!-- NEW -->
<span class="price">0.01</span>
<span class="unit">per page</span>
```

**In `main.js` (Line ~40):**
```javascript
// OLD
const pricePerPage = 0.10;

// NEW
const pricePerPage = 0.01;
```

### Update Calculator Default (index.html):
```javascript
// Update initial calculation to show correct values
// Old: 1000 pages × $0.10 = $100
// New: 1000 pages × $0.01 = $10
```

---

## ✅ What's Already Correct

- Architecture description (3-layer: Supabase + Flask + Flutter)
- Flask = AI services only
- CSV exports
- Webhooks
- Team collaboration (owner, admin, member, viewer)
- Flow builder concept
- Document extraction workflow
- PDF-to-table animation concept

---

**Next Steps:**
1. Confirm product name ("Tavnit" or "Ogen")
2. Fix critical pricing error
3. Enhance content with missing features
4. Add actual credit package details
5. Test calculator with correct pricing

Would you like me to make these corrections now?
