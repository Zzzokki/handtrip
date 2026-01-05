# Backend Testing

This project uses Jest for backend unit testing.

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## Test Structure

Tests are located in `__tests__` directories next to the code they test:

```
src/
  lib/
    utils/
      __tests__/
        jwt.test.ts          # JWT token generation and verification tests
        password.test.ts     # Password hashing and comparison tests
```

## Test Coverage

Current test coverage includes:

### JWT Utilities (`src/lib/utils/jwt.ts`)

- ✅ Token generation with valid payload
- ✅ Token includes payload data (id, role)
- ✅ Token expiration is set correctly
- ✅ Token verification with valid tokens
- ✅ Null return for invalid tokens
- ✅ Null return for expired tokens
- ✅ Null return for empty tokens
- ✅ Support for different role types (customer, company)

### Password Utilities (`src/lib/utils/password.ts`)

- ✅ Password hashing creates unique hashes
- ✅ Different hashes generated for same password (salt)
- ✅ Bcrypt compatible hash format
- ✅ Password verification returns true for matching passwords
- ✅ Password verification returns false for non-matching passwords
- ✅ Case sensitivity in password comparison
- ✅ Empty password handling
- ✅ Special characters support
- ✅ Full registration and login flow integration

## Test Configuration

### Jest Configuration (`jest.config.js`)

- **Test Environment**: Node.js
- **Preset**: ts-jest for TypeScript support
- **Test Pattern**: `**/__tests__/**/*.test.ts`
- **Module Aliases**: Configured to match tsconfig paths (@/...)
- **Coverage Threshold**: 50% for branches, functions, lines, and statements

### Setup (`jest.setup.js`)

Environment variables are mocked for testing:

- `JWT_SECRET`: Test JWT secret key
- `DATABASE_URL`: Mock database URL
- `STRIPE_SECRET_KEY`: Mock Stripe secret
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: Mock Stripe publishable key
- `STRIPE_WEBHOOK_SECRET`: Mock Stripe webhook secret

## Writing New Tests

### Example Test Structure

```typescript
import { functionToTest } from "@/path/to/function";

describe("Feature Name", () => {
  describe("functionToTest", () => {
    it("should do something specific", () => {
      const result = functionToTest(input);
      expect(result).toBe(expectedOutput);
    });

    it("should handle edge cases", () => {
      const result = functionToTest(edgeCase);
      expect(result).toBeDefined();
    });
  });
});
```

### Mocking Dependencies

```typescript
jest.mock("@/database");
const mockDb = db as jest.Mocked<typeof db>;

mockDb.query = {
  table: {
    findMany: jest.fn().mockResolvedValue(mockData),
  },
} as any;
```

## Best Practices

1. **Test file naming**: Use `.test.ts` extension
2. **Descriptive test names**: Clearly state what is being tested
3. **Arrange-Act-Assert**: Structure tests with setup, execution, and verification
4. **Mock external dependencies**: Database, APIs, etc.
5. **Test edge cases**: Empty inputs, null values, errors
6. **Keep tests isolated**: Each test should be independent
7. **Use beforeEach/afterEach**: Clean up between tests

## Coverage Goals

Maintain minimum coverage thresholds:

- **Branches**: 50%
- **Functions**: 50%
- **Lines**: 50%
- **Statements**: 50%

## Future Test Additions

Planned tests for:

- [ ] GraphQL resolvers (auth, orders, travels)
- [ ] API route handlers
- [ ] Database query functions
- [ ] Stripe integration
- [ ] File upload handling
- [ ] Webhook processing
