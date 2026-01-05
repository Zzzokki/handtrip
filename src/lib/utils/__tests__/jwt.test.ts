import jwt from "jsonwebtoken";
import { generateToken, verifyToken } from "@/lib/utils/jwt";

describe("JWT Utilities", () => {
  const testPayload = {
    id: 1,
    role: "customer" as const,
  };

  describe("generateToken", () => {
    it("should create a valid JWT token", () => {
      const token = generateToken(testPayload);

      expect(token).toBeDefined();
      expect(typeof token).toBe("string");
      expect(token.split(".")).toHaveLength(3); // JWT has 3 parts
    });

    it("should include payload data in token", () => {
      const token = generateToken(testPayload);
      const decoded = jwt.decode(token) as any;

      expect(decoded.id).toBe(testPayload.id);
      expect(decoded.role).toBe(testPayload.role);
    });

    it("should set expiration time", () => {
      const token = generateToken(testPayload);
      const decoded = jwt.decode(token) as any;

      expect(decoded.exp).toBeDefined();
      expect(decoded.exp).toBeGreaterThan(Math.floor(Date.now() / 1000));
    });
  });

  describe("verifyToken", () => {
    it("should verify and decode a valid token", () => {
      const token = generateToken(testPayload);
      const result = verifyToken(token);

      expect(result).toBeDefined();
      expect(result?.id).toBe(testPayload.id);
      expect(result?.role).toBe(testPayload.role);
    });

    it("should return null for invalid token", () => {
      const result = verifyToken("invalid.token.here");

      expect(result).toBeNull();
    });

    it("should return null for expired token", () => {
      const expiredToken = jwt.sign(
        testPayload,
        process.env.JWT_SECRET!,
        { expiresIn: "-1h" } // Expired 1 hour ago
      );

      const result = verifyToken(expiredToken);

      expect(result).toBeNull();
    });

    it("should return null for empty token", () => {
      const result = verifyToken("");

      expect(result).toBeNull();
    });

    it("should handle different role types", () => {
      const roles = ["customer", "company"] as const;

      roles.forEach((role) => {
        const token = generateToken({ id: 1, role });
        const result = verifyToken(token);

        expect(result?.role).toBe(role);
      });
    });
  });
});
