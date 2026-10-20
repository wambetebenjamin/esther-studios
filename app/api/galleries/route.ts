import { NextResponse } from "next/server";
import { GALLERIES, galleriesByType } from "@/lib/galleries";
import { SESSION_TYPES, isSessionTypeId } from "@/lib/site";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");

  if (type && type !== "all" && !isSessionTypeId(type)) {
    return NextResponse.json(
      {
        ok: false,
        error: "Unknown session type",
        allowed: ["all", ...SESSION_TYPES.map((t) => t.id)],
      },
      { status: 400 },
    );
  }

  const galleries = galleriesByType(type ?? "all");

  return NextResponse.json({
    ok: true,
    type: type ?? "all",
    count: galleries.length,
    total: GALLERIES.length,
    galleries: galleries.map((gallery) => ({
      slug: gallery.slug,
      title: gallery.title,
      type: gallery.type,
      date: gallery.date,
      dateLabel: gallery.dateLabel,
      location: gallery.location,
      cover: gallery.cover,
      coverAlt: gallery.coverAlt,
      story: gallery.story,
      imageCount: gallery.images.length,
      url: `/galleries/${gallery.slug}`,
    })),
  });
}
