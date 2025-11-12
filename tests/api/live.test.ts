import { describe, it, expect, vi, beforeEach } from "vitest";
import { GET } from "@/app/api/live/route";
import { NextResponse } from "next/server";

// Mock environment variables
beforeEach(() => {
  process.env.TP_TOKEN = "test-token-123";
});

describe("/api/live", () => {
  it("should return 400 if origin is missing", async () => {
    const request = new Request("http://localhost:3000/api/live?destination=JFK&departure_date=2025-12-01");
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe("Missing required parameters");
  });

  it("should return 400 if destination is missing", async () => {
    const request = new Request("http://localhost:3000/api/live?origin=LHR&departure_date=2025-12-01");
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe("Missing required parameters");
  });

  it("should return 400 if departure_date is missing", async () => {
    const request = new Request("http://localhost:3000/api/live?origin=LHR&destination=JFK");
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe("Missing required parameters");
  });

  it("should return 400 for invalid IATA codes", async () => {
    const request = new Request("http://localhost:3000/api/live?origin=LONDON&destination=JFK&departure_date=2025-12-01");
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toContain("Invalid IATA codes");
  });

  it("should return 400 for invalid date format", async () => {
    const request = new Request("http://localhost:3000/api/live?origin=LHR&destination=JFK&departure_date=12/01/2025");
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe("Invalid date format. Use YYYY-MM-DD");
  });

  it("should return 400 for invalid return date format", async () => {
    const request = new Request("http://localhost:3000/api/live?origin=LHR&destination=JFK&departure_date=2025-12-01&return_date=invalid");
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe("Invalid return date format. Use YYYY-MM-DD");
  });

  it("should validate IATA codes correctly", async () => {
    const validRequest = new Request("http://localhost:3000/api/live?origin=LHR&destination=JFK&departure_date=2025-12-01");

    // Mock successful fetch
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ data: [] }),
    } as Response);

    const response = await GET(validRequest);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.origin).toBe("LHR");
    expect(data.destination).toBe("JFK");
  });

  it("should handle API errors gracefully", async () => {
    const request = new Request("http://localhost:3000/api/live?origin=LHR&destination=JFK&departure_date=2025-12-01");

    // Mock failed fetch
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 503,
      statusText: "Service Unavailable",
    } as Response);

    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(503);
    expect(data.error).toBe("Failed to fetch flight prices");
  });

  it("should include return date in response when provided", async () => {
    const request = new Request("http://localhost:3000/api/live?origin=LHR&destination=JFK&departure_date=2025-12-01&return_date=2025-12-08");

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ data: [] }),
    } as Response);

    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.returnDate).toBe("2025-12-08");
  });

  it("should use GBP as default currency", async () => {
    const request = new Request("http://localhost:3000/api/live?origin=LHR&destination=JFK&departure_date=2025-12-01");

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ data: [] }),
    } as Response);

    const response = await GET(request);
    const data = await response.json();

    expect(data.currency).toBe("GBP");
  });
});
