# Instalytics | Instagram Analytics Dashboard

Professional Instagram Analytics Dashboard integrated with n8n workflows to visualize engagement metrics, content performance, and profile growth.

![Instalytics Dashboard](https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop)

## 🚀 Features

- **Profile Intelligence**: Detailed breakdown of followers, following, media count, and calculated engagement scores.
- **Visual Analytics**: 
  - Engagement Trend Area Charts
  - Likes vs Comments Bar Charts
  - "Top Performing Post" Highlight with video/image previews.
- **Content Gallery**: 
  - Filterable grid (All, Photo, Video, Carousel).
  - Sortable by Date, Likes, Comments, or Engagement.
  - Video thumbnails with hover-to-play functionality.
- **Theme Support**: Fully responsive Dark and Light modes.
- **Export Ready**: Built-in "Print to PDF" styling for generating reports.
- **Robust Error Handling**: Graceful fallbacks for network errors and missing media.

## 🛠 Tech Stack

- **Framework**: React 19 (TypeScript)
- **Styling**: Tailwind CSS
- **Visualization**: Recharts
- **Icons**: Lucide React
- **Data Integration**: n8n Webhooks (via `fetch` API)

## 📂 Project Structure

```bash
/
├── components/
│   ├── dashboard/       # specific dashboard widgets (Charts, Grid, Profile)
│   ├── ui/              # reusable UI elements (Card, Button)
│   ├── Dashboard.tsx    # Main dashboard container
│   └── LandingPage.tsx  # Search entry point
├── services/
│   ├── api.ts           # n8n integration logic & data transformation
│   └── mockData.ts      # Fallback data for demos
├── types.ts             # TypeScript interfaces (InstagramPost, Profile, etc.)
├── App.tsx              # Main routing and state management
└── index.html           # Entry point with Tailwind CDN configuration
```

## ⚙️ Configuration & Setup

### 1. API Configuration
The application relies on an n8n webhook to fetch live data. You need to configure the endpoint in `services/api.ts`.

```typescript
// services/api.ts

// Update these constants with your active n8n tunnel details
const NGROK_URL = 'https://your-tunnel-url.ngrok-free.app';
const WEBHOOK_PATH = '/webhook/your-webhook-uuid';
```

> **Note**: If the API connection fails (or times out after 10 minutes), the app automatically falls back to `mockData.ts` to ensure the UI remains functional for testing.

### 2. Running Locally

Since this project uses ES Modules and direct imports (via `importmap` in `index.html`), it is best run with a modern dev server like Vite.

```bash
npm install
npm run dev
```

### 3. Demo Mode
Type **`demo`** or **`mock`** in the search bar on the landing page to instantly load the dashboard with sample data without hitting the API.

## 🎨 Customization

The theme colors are defined in the `tailwind.config` script within `index.html`. You can customize the brand palette here:

```javascript
colors: {
  brand: {
    ruby: '#9a031e',
    purple: '#5f0f40',
    orange: '#fb8b24',
    teal: '#0f4c5c',
    // ...
  }
}
```

## 📄 License
Private / Proprietary
