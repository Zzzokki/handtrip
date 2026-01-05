// Setup environment variables for testing
process.env.JWT_SECRET = "test-jwt-secret-key-for-testing-only";
process.env.DATABASE_URL = "postgresql://test:test@localhost:5432/test";
process.env.STRIPE_SECRET_KEY = "sk_test_mock_key";
process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY = "pk_test_mock_key";
process.env.STRIPE_WEBHOOK_SECRET = "whsec_test_mock_secret";
