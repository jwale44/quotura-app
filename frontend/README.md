# Quotura - AI Summarizer SaaS
Quotura is an AI-powered summarization and essay generation platform that helps users write smarter and read faster. This web application provides intelligent content summarization with customizable options for length, format, and tone.

### Project Overview
Quotura transforms the way users handle written communication by providing:

- AI-powered content summarization
- Essay generation capabilities
- Customizable output formats and lengths
- Team and individual subscription options

The application includes a comprehensive user journey from signup through onboarding to the main dashboard where users can access the summarizer tools.

### Features
- AI Summarization: Generate intelligent summaries from provided text with length controls
- User Authentication: Secure login with OAuth providers via Clerk
- Onboarding Flow: Guided setup for new users with account type selection
- Dashboard Interface: Clean, intuitive interface for accessing tools
- Subscription Management: Tiered pricing plans with different feature sets
- Responsive Design: Works across desktop and mobile devices
- Copy & Format Controls: Various output formatting options

### Tech Stack
- Frontend Framework: Next.js 14 with App Router
- Language: TypeScript
- Authentication: Clerk
- Styling: TailwindCSS with custom theme configuration
- State Management: React Context API & React Query
- HTTP Client: Axios
- Payment Processing: Paystack
- Animation: Motion
- Markdown Rendering: Markdown with syntax highlighting

### Project Structure
```
frontend/
├── public/            # Static assets
├── src/
│   ├── app/           # Next.js App Router pages
│   │   ├── a/         # Authenticated routes
│   │   │   ├── board/ # Dashboard views
│   │   │   └── onboard/ # Onboarding flow
│   │   └── page.tsx   # Landing page
│   ├── components/    # Reusable UI components
│   ├── views/         # Feature-specific view components
│   ├── _api/          # API service layer
│   ├── lib/           # Utility libraries 
│   └── utils/         # Helper functions
└── ...config files
```

### Getting Started
Prerequisites
- Node.js 18.0 or later
- Yarn, npm, or pnpm package manager
- Environment variables (see below)

Environment Setup

Create a .env.local file in the root directory with the following variables:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/a/board
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/a/onboard
NEXT_PUBLIC_API_BASE_URL=your_backend_api_url
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=your_paystack_public_key
```

### Installation
1. Clone the repository
2. Go to frontend folder
3. Install the dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

5. Open http://localhost:3000 with your browser to see the application.

### User Flow
1. Users land on the homepage with product information and pricing
2. After signup/signin, new users go through the onboarding process
3. Users are then directed to the main dashboard
4. The summarizer board allows users to input text and generate summaries
5. Users can manage subscriptions in the plans section


### Deployment
The application is configured for deployment on Vercel:

1. Push your code to a Git repository
2. Import the project into Vercel
3. Configure environment variables
4. Deploy