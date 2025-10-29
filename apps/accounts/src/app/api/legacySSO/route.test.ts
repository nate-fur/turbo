import { NextRequest } from "next/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { POST } from "./route";

// Mock dependencies
vi.mock("next/headers", () => ({
  cookies: vi.fn(),
}));

vi.mock("@/libs/Env", () => ({
  Env: {
    STRAPI_URL: "https://test-strapi.com",
  },
}));

vi.mock("@/utils/CookieConfig", () => ({
  COOKIE_NAMES: {
    ACCESS_TOKEN: "sb_access",
  },
  getAuthCookieOptions: vi.fn(() => ({
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 86400,
  })),
}));

vi.mock("jose", () => ({
  decodeJwt: vi.fn(),
}));

// Mock fetch globally
const mockFetch = vi.fn();
globalThis.fetch = mockFetch;

// Test constants
const MOCK_VALID_JWT_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

describe("Legacy SSO Route", () => {
  let mockCookieStore: any;

  beforeEach(async () => {
    mockCookieStore = {
      get: vi.fn(),
      set: vi.fn(),
    };

    // Mock the cookies function to return our mockCookieStore
    vi.mocked((await import("next/headers")).cookies).mockResolvedValue(
      mockCookieStore,
    );

    // Reset mocks
    vi.clearAllMocks();
    mockFetch.mockClear();

    // Reset decodeJwt mock to default behavior
    const { decodeJwt } = await import("jose");
    (decodeJwt as any).mockReset();

    // Cookies is already mocked at module level
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("POST /api/legacySSO", () => {
    it("should return success HTML when user is already authenticated", async () => {
      const { decodeJwt } = await import("jose");
      (decodeJwt as any).mockReturnValue({
        exp: Math.floor(Date.now() / 1000) + 3600, // Valid token
      });

      mockCookieStore.get.mockReturnValue({
        value: "valid-token",
      });

      const request = new NextRequest("http://localhost/api/legacySSO", {
        method: "POST",
        body: JSON.stringify({ legacyToken: "test-token" }),
      });

      const response = await POST(request);
      const html = await response.text();

      expect(response.status).toBe(200);
      expect(html).toContain("Already authenticated");
      expect(html).toContain("window.close()");
      expect(mockFetch).not.toHaveBeenCalled();
    });

    it("should authenticate with legacy token when not already authenticated", async () => {
      const { decodeJwt } = await import("jose");
      (decodeJwt as any).mockImplementation((token: string) => {
        if (token === MOCK_VALID_JWT_TOKEN) {
          return { exp: Math.floor(Date.now() / 1000) + 3600 };
        }
        throw new Error("Invalid token");
      });

      mockCookieStore.get.mockReturnValue(null);

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ jwt: MOCK_VALID_JWT_TOKEN }), // valid JWT
      });

      const request = new NextRequest("http://localhost/api/legacySSO", {
        method: "POST",
        body: JSON.stringify({ legacyToken: "legacy-token-123" }),
      });

      const response = await POST(request);
      const html = await response.text();

      expect(mockFetch).toHaveBeenCalledWith(
        "https://test-strapi.com/api/auth/legacySSO",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ legacyToken: "legacy-token-123" }),
        },
      );

      expect(mockCookieStore.set).toHaveBeenCalledWith(
        "sb_access",
        MOCK_VALID_JWT_TOKEN,
        expect.any(Object),
      );

      expect(response.status).toBe(200);
      expect(html).toContain("Login Successful");
      expect(html).toContain("window.close()");
    });

    it("should return 400 when legacyToken is missing", async () => {
      mockCookieStore.get.mockReturnValue(null);

      const request = new NextRequest("http://localhost/api/legacySSO", {
        method: "POST",
        body: JSON.stringify({}),
      });

      const response = await POST(request);
      const html = await response.text();

      expect(response.status).toBe(400);
      expect(html).toContain("Invalid request");
      expect(mockFetch).not.toHaveBeenCalled();
    });

    it("should return 401 when legacy authentication fails", async () => {
      mockCookieStore.get.mockReturnValue(null);

      mockFetch.mockResolvedValueOnce({
        ok: false,
      });

      const request = new NextRequest("http://localhost/api/legacySSO", {
        method: "POST",
        body: JSON.stringify({ legacyToken: "invalid-token" }),
      });

      const response = await POST(request);
      const html = await response.text();

      expect(response.status).toBe(401);
      expect(html).toContain("Authentication failed");
    });

    it("should return 500 when an error occurs", async () => {
      mockCookieStore.get.mockReturnValue(null);

      mockFetch.mockRejectedValueOnce(new Error("Network error"));

      const request = new NextRequest("http://localhost/api/legacySSO", {
        method: "POST",
        body: JSON.stringify({ legacyToken: "test-token" }),
      });

      const response = await POST(request);
      const html = await response.text();

      expect(response.status).toBe(500);
      expect(html).toContain("Internal server error");
    });

    it("should continue authentication when existing token is expired", async () => {
      const { decodeJwt } = await import("jose");
      (decodeJwt as any).mockReturnValue({
        exp: Math.floor(Date.now() / 1000) - 3600, // Expired token
      });

      mockCookieStore.get.mockReturnValue({
        value: "expired-token",
      });

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ jwt: "new-jwt-token" }),
      });

      const request = new NextRequest("http://localhost/api/legacySSO", {
        method: "POST",
        body: JSON.stringify({ legacyToken: "legacy-token-123" }),
      });

      await POST(request);

      expect(mockFetch).toHaveBeenCalled();
      expect(mockCookieStore.set).toHaveBeenCalledWith(
        "sb_access",
        "new-jwt-token",
        expect.any(Object),
      );
    });

    it("should return 500 when JWT is missing from response", async () => {
      mockCookieStore.get.mockReturnValue(null);

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          /* no jwt field */
        }),
      });

      const request = new NextRequest("http://localhost/api/legacySSO", {
        method: "POST",
        body: JSON.stringify({ legacyToken: "test-token" }),
      });

      const response = await POST(request);
      const html = await response.text();

      expect(response.status).toBe(500);
      expect(html).toContain("Invalid authentication response");
      expect(mockCookieStore.set).not.toHaveBeenCalled();
    });

    it("should return 500 when JWT is not a string", async () => {
      mockCookieStore.get.mockReturnValue(null);

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ jwt: 12345 }), // number instead of string
      });

      const request = new NextRequest("http://localhost/api/legacySSO", {
        method: "POST",
        body: JSON.stringify({ legacyToken: "test-token" }),
      });

      const response = await POST(request);
      const html = await response.text();

      expect(response.status).toBe(500);
      expect(html).toContain("Invalid authentication response");
      expect(mockCookieStore.set).not.toHaveBeenCalled();
    });

    it("should return 500 when JWT is invalid", async () => {
      mockCookieStore.get.mockReturnValue(null);

      // Mock decodeJwt to throw for invalid tokens
      const { decodeJwt } = await import("jose");
      (decodeJwt as any).mockImplementation((token: string) => {
        if (token === "invalid.jwt.token") {
          throw new Error("Invalid JWT");
        }
        return { exp: Math.floor(Date.now() / 1000) + 3600 };
      });

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ jwt: "invalid.jwt.token" }),
      });

      const request = new NextRequest("http://localhost/api/legacySSO", {
        method: "POST",
        body: JSON.stringify({ legacyToken: "test-token" }),
      });

      const response = await POST(request);
      const html = await response.text();

      expect(response.status).toBe(500);
      expect(html).toContain("Invalid token received");
      expect(mockCookieStore.set).not.toHaveBeenCalled();
    });
  });
});
