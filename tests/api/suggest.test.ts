import { describe, it, expect, vi, beforeEach } from "vitest";
import { GET } from "@/app/api/suggest/route";

beforeEach(() => {
  process.env.TP_TOKEN = "test-token-123";
});

describe("/api/suggest", () => {
  it("should return empty array if query parameter is missing", async () => {
    const request = new Request("http://localhost:3000/api/suggest");
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBe(0);
  });

  it("should fetch suggestions from Travelpayouts API", async () => {
    const mockSuggestions = [
      { name: "London Heathrow", code: "LHR", city_name: "London" },
      { name: "London Gatwick", code: "LGW", city_name: "London" },
    ];

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockSuggestions,
    } as Response);

    const request = new Request("http://localhost:3000/api/suggest?q=London");
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(Array.isArray(data)).toBe(true);
    expect(data).toEqual(mockSuggestions);
  });

  it("should handle API errors", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
    } as Response);

    const request = new Request("http://localhost:3000/api/suggest?q=London");
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toBe("Failed to fetch autocomplete data");
  });
});
