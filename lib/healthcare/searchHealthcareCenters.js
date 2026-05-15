export async function searchHealthcareCenters(
  lat,
  lng
) {
  const radius = 12000;

  const query = `
  [out:json][timeout:25];

  (
    node["amenity"="hospital"](around:${radius},${lat},${lng});
    way["amenity"="hospital"](around:${radius},${lat},${lng});

    node["amenity"="clinic"](around:${radius},${lat},${lng});
    way["amenity"="clinic"](around:${radius},${lat},${lng});

    node["amenity"="doctors"](around:${radius},${lat},${lng});
    way["amenity"="doctors"](around:${radius},${lat},${lng});

    node["healthcare"](around:${radius},${lat},${lng});
    way["healthcare"](around:${radius},${lat},${lng});
  );

  out center tags;
  `;

  const response = await fetch(
    "https://overpass-api.de/api/interpreter",
    {
      method: "POST",
      body: query,
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch centers");
  }

  const data = await response.json();

  const seen = new Set();

  return data.elements
    .map((item) => {
      const lat =
        item.lat || item.center?.lat;

      const lng =
        item.lon || item.center?.lon;

      const name =
        item.tags?.name ||
        "Healthcare Center";

      const type =
        item.tags?.amenity ||
        item.tags?.healthcare ||
        "medical";

      return {
        id: item.id,
        name,
        type,
        lat,
        lng,
      };
    })
    .filter((item) => {
      if (!item.lat || !item.lng) {
        return false;
      }

      const key = `${item.name}-${item.lat}-${item.lng}`;

      if (seen.has(key)) {
        return false;
      }

      seen.add(key);

      return true;
    });
}