# ShareAPlate (SAP) — Master Food Rescue Platform

> **Tagline:** *"Share Food. Reduce Waste. Feed Hope."*  
> **Core Principle:** *"Good Food Deserves a Second Plate."*

---

## 🚀 Quick Start Guide

The project is already pre-configured with all dependencies installed.

### 1. Start the Development Server
Open PowerShell / Command Prompt inside this folder:
```bash
npm run dev
```
Then open your browser at:
👉 **[http://localhost:3000/](http://localhost:3000/)**

### 2. Build for Production
```bash
npm run build
```

---

## 🌟 Key Features Implemented

1. **Non-Marketplace Food Rescue Architecture:**
   - All food surplus is strictly **₹0.00 FREE**.
   - Transparent separation of food price vs nominal delivery charge (₹49).
2. **Time-Priority Claiming Engine:**
   - First-come, first-served queue (`claimTimestamp ASC`).
   - Dynamic safe consumption countdown timer.
3. **Compulsory NGO Logistics:**
   - Registered NGOs receive **compulsory platform delivery** (Self-pickup is disabled).
4. **Automated Animal Shelter Fallback:**
   - Unclaimed food nearing safe expiry window is autonomously redirected to partner animal shelters (*Happy Tails Shelter*, *Jeev Daya Foundation*).
5. **Dedicated "Celebrate & Share" Occasion Flow:**
   - 6-step guided donation flow for Birthdays, Weddings, and Anniversaries.
   - Custom packaging options: **Small** (1–2 meals), **Medium** (3–5 meals), **Large** (6–10 meals).
   - Personal printed occasion greeting card notes.
6. **Real-Time Delivery Tracking:**
   - Animated vector map tracking simulated driver movement.
   - Dual OTP security: **Pickup OTP** and **Delivery Release OTP**.
7. **Multi-Role Test Persona Switcher:**
   - Top bar allows 1-click preview as:
     - **Donor** (*Green Leaf Restaurant*)
     - **Individual Recipient** (*Pooja Kashyap*)
     - **Verified NGO** (*Helping Hands Foundation*)
     - **Animal Shelter** (*Happy Tails Shelter*)
     - **Platform Admin** (*ShareAPlate HQ*)
8. **Responsive Layouts:**
   - Full desktop sidebar & header navigation.
   - Mobile-first bottom navigation bar (*Home | Discover | Share | Claims | Profile*).
