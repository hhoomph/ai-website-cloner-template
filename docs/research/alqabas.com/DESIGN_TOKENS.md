# Al-Qabas (القبس) Design Tokens

## Fonts
- **Primary Font Family:** AlQabas-Regular, AlQabas-Bold, AlQabas-Light
- **Fallback:** -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif
- **Weights Used:** Regular, Bold, Light
- **Font Loading:** Self-hosted (custom font, not Google Fonts)

## Colors

### Primary Palette
- **Primary Blue (Main Brand):** #005C9C
- **Primary Blue Light:** #00A3DA
- **Dark Text:** #1E1E1E
- **Dark Header BG:** #262626
- **White:** #FFFFFF
- **Light Gray BG:** #EFF3F5
- **Border Gray:** #DBDFE0
- **Gray Text (muted):** #D0D0D0

### Category Tag Gradients
- **محليات (Local News):** linear-gradient(to left bottom, #0282CB, #4FCFFF)
- **كتاب وآراء (Opinion):** linear-gradient(to left bottom, #0158A3, #4EA5F0)
- **أمن ومحاكم (Security/Courts):** linear-gradient(to left bottom, #DF1148, #FF5E95)
- **اقتصاد (Economy):** linear-gradient(to left bottom, #0158A3, #4EA5F0)
- **القبس الدولي (International):** linear-gradient(to left bottom, #0282CB, #4FCFFF)
- **لايت (Light):** linear-gradient(to left bottom, #0282CB, #4FCFFF)
- **القبس الثقافي (Cultural):** linear-gradient(to left bottom, #0282CB, #4FCFFF)
- **رياضة (Sports):** linear-gradient(to left bottom, #0282CB, #4FCFFF)
- **ماستر كلاس (Master Class):** linear-gradient(to left bottom, #0260AE, #4FADFB)
- **بودكاست (Podcast):** linear-gradient(to left bottom, #0158A3, #4EA5F0)
- **كتاب القبس (Authors):** linear-gradient(to left bottom, #588FDF, #A5DCFF)
- **معرض الصور (Gallery):** linear-gradient(to left bottom, #8358D5, #D0A5FF)
- **وفيات (Obituaries):** linear-gradient(to left bottom, #000000, #4D4D4D)

### Footer Social Icons
- **Dark (default):** #1E1E1E (fill)
- **Light (footer):** #FFFFFF (fill)

## Spacing
- Bootstrap 4 grid system (uses Bootstrap utilities)
- Standard spacing: 0.25rem increments (Bootstrap spacing scale)
- Common padding: 15px (Bootstrap default), 0.75rem-1rem

## Border Radius
- Tags: 15px-20px (pill shape)
- Cards: Subtle radius (from Bootstrap defaults)

## Shadows
- Category tags have solid borders (no shadows)
- No significant box shadows observed

## Layout
- **Direction:** RTL (Arabic)
- **Max Width:** Bootstrap container (~1140px)
- **Grid:** Bootstrap row/col system
- **Sticky Header:** Yes (top header bar)

## Breakpoints
- Bootstrap 4 defaults (xs: 0, sm: 576px, md: 768px, lg: 992px, xl: 1200px)