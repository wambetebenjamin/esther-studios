import { NextResponse } from "next/server";
import { getGallery } from "@/lib/galleries";
import { sessionTypeName } from "@/lib/site";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const gallery = getGallery(slug);

  if (!gallery) {
    return NextResponse.json(
      { ok: false, error: "Gallery not found" },
      { status: 404 },
    );
  }

  return NextResponse.json({
    ok: true,
    gallery: {
      slug: gallery.slug,
      title: gallery.title,
      type: gallery.type,
      typeName: sessionTypeName(gallery.type),
      date: gallery.date,
      dateLabel: gallery.dateLabel,
      location: gallery.location,
      story: gallery.story,
      cover: gallery.cover,
      images: gallery.images,
      imageCount: gallery.images.length,
    },
  });
}
