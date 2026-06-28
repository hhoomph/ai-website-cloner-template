# Al-Qabas (القبس) Page Topology

## Overall Layout
- **Direction:** RTL (Arabic)
- **Scroll Direction:** Vertical (no smooth scroll library detected)
- **Page Container:** `.page_pageContainer__fY2h2.homePage_homePage__ea0MG`

## Section Map (Top to Bottom)

### 1. Side Menu / Editors Bar (Top Bar)
- **Sticky:** Yes (top of page)
- **Container:** `.sideMenu_sidenav__23bO3.sideMenu_sidenavClose__3EdOc`
- **Sub-sections:**
  - **Editors Content:** Shows "رئيس التحرير: وليد عبداللطيف النصف" and "نائب رئيس التحرير: عبدالله غازي المضف"
  - **Social Media Icons:** Twitter/X, WhatsApp, Telegram, Instagram, Facebook, YouTube, Snapchat, TikTok (in both inline and responsive containers)
  - **Archive Link:** "عرض أرشيف الأعداد" (Show Archives)
  - **Newsletter Icon**
  - **Close Button (X)** with white icon

### 2. Mid Header
- **Container:** `.sideMenu_midHeader__EeUfw`
- **Sub-sections:**
  - **Close Icon:** SVG X icon
  - **Podcast Link:** Link to `/categories/64746/`
  - **Auth/User Section:** "الاشتراكات" (Subscriptions) button + "تسجيل الدخول" (Login) text

### 3. Mobile Side Menu Content
- **Container:** `#mobile-side-menu-content`
- **Category Tag Buttons:** Grid of 2-column pill buttons:
  - عدد اليوم (Today's Issue) 
  - ماستر كلاس (Master Class) - blue gradient
  - وفيات (Obituaries) - black gradient
  - معرض الصور (Gallery) - purple gradient
  - كتاب القبس (Authors) - blue gradient
  - أرشيف القبس (Archive) - blue gradient
  - بودكاست (Podcast) - blue gradient
- **Category Links (2-column grid):**
  - محليات (Local) - blue teal gradient
  - كتاب وآراء (Opinion) - blue gradient
  - أمن ومحاكم (Security/Courts) - red gradient
  - اقتصاد (Economy) - blue gradient
  - القبس الدولي (International) - blue teal gradient
  - لايت (Light) - blue teal gradient
  - القبس الثقافي (Cultural) - blue teal gradient
  - رياضة (Sports) - blue teal gradient

### 4. Side Menu Footer
- **Container:** `.sideMenu_sideMenuFooter__Oiij0.footer_footerContainer__1jmnK`
- **Content:** Footer logo, social media icons

### 5. Top Header Bar (Main Site)
- **Sticky:** Yes (visible at top)
- **Components:**
  - **Hamburger Menu:** SVG menu icon (3 horizontal lines)
  - **Logo:** SVG logo (https://dqnxlhsgmg1ih.cloudfront.net/logos/1721913224175_osUcD.svg)
  - **Right Section:** 
    - Search icon
    - PDF download icon + link
    - Premium/Live badge (SVG with blue dot)
    - User icon + subscription/login

### 6. Header Tabs / Navigation
- **Tabs:** Dynamic category tabs (visible in header)

### 7. Bottom Header (Category Nav)
- **Navigation bar** with arrow dropdown indicators
- **Category links** with dropdown chevrons

### 8. Main Content Area

#### 8a. Pinned/Featured Articles Section
- **Large article cards** with full-width images
- **Share button** (SVG share icon)
- **Video badge:** Play button overlay on highlighted video
- **3 Featured Articles** with large images

#### 8b. Highlighted Video Section
- Background image with video play overlay

#### 8c. Side Widget with Numbered Tabs
- **Numbered articles** (1-10) with thumbnail images
- Each has an absolute-positioned number overlay
- Tab navigation for switching article sets

#### 8d. Article Cards Grid
- Standard news article cards with images, titles

#### 8e. Newsletter Signup Section
- SVG logo "القبس"
- Share button
- Input for email subscription

#### 8f. Image Widget / Promotional Section
- Full-width image promotion

### 9. Footer
- **Container:** `.footer_footerContainer__1jmnK`
- **Content:**
  - Footer logo (same SVG as header)
  - Social media icons (dark variant on light, light variant on dark backgrounds)
  - Multiple link columns

## Key Observations
1. Full RTL layout with Bootstrap grid
2. Multiple sticky header layers
3. Heavy use of gradient backgrounds for category tags
4. Custom AlQabas font family throughout
5. News article cards are the primary content unit
6. Numbered sidebar widget shows most-read articles
7. All images served from CloudFront CDN
8. Site has premium/subscription features (paywalled content)