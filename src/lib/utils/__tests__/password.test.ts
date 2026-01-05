import bcrypt from "bcryptjs";
import { saltAndHashPassword, verifyPassword } from "@/lib/utils/password";

describe("Password Utilities", () => {
  const plainPassword = "SecurePassword123!";

  describe("saltAndHashPassword", () => {
    it("should hash a password", async () => {
      const hashed = await saltAndHashPassword(plainPassword);

      expect(hashed).toBeDefined();
      expect(typeof hashed).toBe("string");
      expect(hashed).not.toBe(plainPassword);
      expect(hashed.length).toBeGreaterThan(0);
    });

    it("should generate different hashes for same password", async () => {
      const hash1 = await saltAndHashPassword(plainPassword);
      const hash2 = await saltAndHashPassword(plainPassword);

      expect(hash1).not.toBe(hash2);
    });

    it("should create bcrypt compatible hash", async () => {
      const hashed = await saltAndHashPassword(plainPassword);

      // Bcrypt hashes start with $2a$, $2b$, or $2y$
      expect(hashed).toMatch(/^\$2[aby]\$/);
    });
  });

  describe("verifyPassword", () => {
    it("should return true for matching password", async () => {
      const hashed = await saltAndHashPassword(plainPassword);
      const result = await verifyPassword(plainPassword, hashed);

      expect(result).toBe(true);
    });

    it("should return false for non-matching password", async () => {
      const hashed = await saltAndHashPassword(plainPassword);
      const result = await verifyPassword("WrongPassword123!", hashed);

      expect(result).toBe(false);
    });

    it("should be case sensitive", async () => {
      const hashed = await saltAndHashPassword(plainPassword);
      const result = await verifyPassword(plainPassword.toLowerCase(), hashed);

      expect(result).toBe(false);
    });

    it("should handle empty password comparison", async () => {
      const hashed = await saltAndHashPassword(plainPassword);
      const result = await verifyPassword("", hashed);

      expect(result).toBe(false);
    });

    it("should handle special characters", async () => {
      const specialPassword = "P@ssw0rd!#$%^&*()_+";
      const hashed = await saltAndHashPassword(specialPassword);
      const result = await verifyPassword(specialPassword, hashed);

      expect(result).toBe(true);
    });
  });

  describe("Integration", () => {
    it("should work with full registration flow", async () => {
      const userPassword = "UserPassword123!";

      // Simulate registration
      const hashedPassword = await saltAndHashPassword(userPassword);

      // Simulate login
      const isValid = await verifyPassword(userPassword, hashedPassword);

      expect(isValid).toBe(true);
    });

    it("should reject incorrect password in login flow", async () => {
      const userPassword = "UserPassword123!";
      const hashedPassword = await saltAndHashPassword(userPassword);

      const isValid = await verifyPassword("WrongPassword", hashedPassword);

      expect(isValid).toBe(false);
    });
  });
});
