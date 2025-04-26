# AI Summarizer SaaS - Backend

A FastAPI-based backend service for an AI text summarization SaaS application. The system provides AI-powered text summary generation with subscription-based pricing and user management.

## Features

- **Text Summarization**: Generate concise summaries of texts with customizable formats and lengths
- **User Authentication**: Secure authentication via Clerk
- **Subscription Management**: Tiered subscription plans via Paystack payment integration
- **Credit System**: Token-based usage tracking for API calls
- **Essay Generation**: AI-powered essay generation capability

## Getting Started

### Prerequisites

- Python 3.8+
- PostgreSQL
- Clerk account for authentication
- Paystack account for payments
- Google AI (Gemini) API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/ai-summarizer-saas.git
cd ai-summarizer-saas/backend
```

2. Create and activate a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies
```bash
pip install -r requirements.txt
```

4. Create a .env file based on .env.example:
```bash
DATABASE_URL=postgresql+asyncpg://user:password@localhost:5432/db_name
DATABASE_URL_MIGRATION=postgresql://user:password@localhost:5432/db_name
GOOGLE_API_KEY=your_google_api_key
CLERK_BACKEND_URL=https://api.clerk.dev/v1
CLERK_SECRET_KEY=your_clerk_secret_key
CORS_ORIGINS=http://localhost:3000,https://your-frontend-domain.com
PAYSTACK_BACKEND_URL=https://api.paystack.co
PAYSTACK_SECRET_KEY=your_paystack_secret_key
```

5. Run locally
```bash
uvicorn app.main:app --reload --workers 1 --host 0.0.0.0 --port 8080
```
Production deployment
```bash
uvicorn app.main:app --workers 4 --host 0.0.0.0 --port 8080
```

### API Documentation
Once the application is running, you can access the auto-generated API documentation:

- Swagger UI: http://localhost:8080/docs
- ReDoc: http://localhost:8080/redoc
#### Key Components
User Management
The system handles user registration, authentication, and profile management through integration with Clerk and local database storage.

##### Subscription Plans
The application offers multiple subscription tiers:

- PLN_3vep38hsat9s4tf: Monthly plan (250 credits)
- PLN_5rwu5dp0li059aj: Annual plan (3000 credits)
- PLN_bgmrx6f11sac6em: Pro Monthly plan (520 credits)
- PLN_7qf7zrmkygc363k: Pro Annual plan (6240 credits)

##### AI Services
- Text Summarization: Generate summaries in paragraph or bullet point format with variable length options
- Essay Generation: Create essays based on specified topics, styles, and structures


### Database Migrations
Database migrations are managed with Alembic. To create and apply migrations:

#### Create a migration
```bash
alembic revision --autogenerate -m "Description of changes"
```

#### Apply migrations
```bash
alembic upgrade head
```

### Background Tasks
The application runs periodic tasks to clean up expired subscriptions.