# Mini Blog

A beautiful blog website powered by Blogs-For-Vercel with a glassmorphic design theme.

## Features

- ✨ Beautiful glassmorphic UI design
- 📝 Blog posts from Blogs-For-Vercel CMS
- 🎨 Responsive design for all devices
- ⚡ Server-side rendering with Next.js
- 🔄 Incremental Static Regeneration (ISR)

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
BLOGS_FOR_VERCEL_API_KEY=your_api_key_here
```

**To get your API key:**
1. Sign up at [https://blogsforvercel.com](https://blogsforvercel.com)
2. Navigate to **Dashboard** → **API Keys**
3. Create a new API key
4. Copy it to your `.env.local` file

### 3. Run the Development Server

```bash
npm run dev
```

The app will be available at [http://localhost:3006](http://localhost:3006)

## Project Structure

```
miniblog/
├── app/
│   ├── components/       # Glassmorphic UI components
│   ├── styles/           # CSS styles
│   ├── config/           # Configuration files
│   ├── blog/             # Blog pages
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Home page
│   └── globals.css       # Global styles
├── public/               # Static assets
├── .env.local            # Environment variables (create this)
└── package.json          # Dependencies
```

## Creating Blog Posts

1. Go to [https://blogsforvercel.com/dashboard/posts](https://blogsforvercel.com/dashboard/posts)
2. Click **New Post**
3. Write your content in Markdown
4. Add tags (optional)
5. Click **Publish**

Your posts will automatically appear on your blog!

## Customization

### Colors

Edit `app/config/colors.ts` to customize the color palette.

### Styles

Modify `app/styles/glassmorphic.css` to adjust glassmorphic effects.

### Components

All components are in `app/components/` and can be customized as needed.

## Deployment

### Option 1: Deploy with Vercel CLI

```bash
# Install Vercel CLI globally (if not already installed)
npm install -g vercel

# Deploy to Vercel
vercel

# For production deployment
vercel --prod
```

### Option 2: Deploy via GitHub Actions

GitHub Actions workflows are included in `.github/workflows/`:
- `deploy-vercel-official.yml` - Official Vercel deployment workflow

**Setup required:**
1. Add these secrets to your GitHub repository:
   - `VERCEL_TOKEN` - Get from [Vercel Settings → Tokens](https://vercel.com/account/tokens)
   - `VERCEL_ORG_ID` - Found in Vercel project settings
   - `VERCEL_PROJECT_ID` - Found in Vercel project settings
   - `BLOGS_FOR_VERCEL_API_KEY` - Your Blogs-For-Vercel API key

2. Push to GitHub - deployment will happen automatically!

### Option 3: Deploy via Vercel Dashboard

1. Push your code to GitHub
2. Import your repository in [Vercel Dashboard](https://vercel.com/new)
3. Add `BLOGS_FOR_VERCEL_API_KEY` in Environment Variables
4. Deploy!

The app is configured to run on port 3006 by default.

## License

MIT

