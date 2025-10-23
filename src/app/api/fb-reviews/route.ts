import { NextResponse } from "next/server";

type FbReview = {
  id?: string;
  review_text?: string;
  rating?: number;
  created_time?: string;
  reviewer?: { name?: string; id?: string; picture?: { data?: { url?: string } } };
};

// Simple in-memory cache (per server instance)
let cache: { reviews: FbReview[]; error?: string } | null = null;
let cacheAt = 0; // ms epoch
const TTL_MS = 30 * 60 * 1000; // 30 minutes

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const forceRefresh = searchParams.get("refresh") === "1";
  const pageId = process.env.FB_PAGE_ID;
  const token = process.env.FB_PAGE_ACCESS_TOKEN;

  if (!pageId || !token) {
    return NextResponse.json(
      { reviews: [], error: "Missing FB_PAGE_ID or FB_PAGE_ACCESS_TOKEN" },
      { status: 200 }
    );
  }

  try {
    // Serve from cache unless forced
    const now = Date.now();
    if (!forceRefresh && cache && now - cacheAt < TTL_MS) {
      return NextResponse.json(cache, { status: 200 });
    }

    const fields = [
      "review_text",
      "rating",
      "created_time",
      "reviewer{name,picture}" // picture returns nested data.url
    ].join(",");

    // Graph API endpoint for Page ratings/reviews (availability depends on permissions)
    const url = `https://graph.facebook.com/v19.0/${pageId}/ratings?fields=${encodeURIComponent(
      fields
    )}&limit=10&access_token=${encodeURIComponent(token)}`;

    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) {
      const body = await res.text();
      const payload = { reviews: [], error: `Facebook API error: ${res.status} ${body}` };
      // cache error payload briefly to avoid rapid retries
      cache = payload;
      cacheAt = now;
      return NextResponse.json(payload, { status: 200 });
    }

    const json: { data?: FbReview[] } = await res.json();
    const mapped = (json.data || [])
      .filter((r) => r.review_text || typeof r.rating === "number")
      .map((r) => ({
        name: r.reviewer?.name || "Facebook User",
        avatar: r.reviewer?.picture?.data?.url,
        content: r.review_text || "",
        rating: typeof r.rating === "number" ? r.rating : 5,
        date: r.created_time || "",
      }));

    const payload = { reviews: mapped };
    cache = payload;
    cacheAt = now;
    return NextResponse.json(payload, { status: 200 });
  } catch (e: unknown) {
    const payload = { reviews: [], error: (e as Error)?.message || "Unknown error" };
    cache = payload; // cache error briefly
    cacheAt = Date.now();
    return NextResponse.json(payload, { status: 200 });
  }
}


