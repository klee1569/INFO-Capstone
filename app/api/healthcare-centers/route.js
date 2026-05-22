import { searchHealthcareCenters } from "../../../lib/healthcare/searchHealthcareCenters";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const lat = Number(searchParams.get("lat"));
    const lng = Number(searchParams.get("lng"));

    if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
      return Response.json(
        { error: "Valid lat and lng query parameters are required." },
        { status: 400 }
      );
    }

    const centers = await searchHealthcareCenters(lat, lng);

    return Response.json(centers);
  } catch (error) {
    console.error("Healthcare centers route error:", error);

    return Response.json(
      { error: "Unable to load healthcare centers right now." },
      { status: 500 }
    );
  }
}
