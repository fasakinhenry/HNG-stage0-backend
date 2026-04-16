export default async function handler(req, res) {
  // CORS (REQUIRED)
  res.setHeader("Access-Control-Allow-Origin", "*");

  try {
    const { name } = req.query;

    // 1. Validate: missing name
    if (!name) {
      return res.status(400).json({
        status: "error",
        message: "Name parameter is required"
      });
    }

    // 2. Validate: must be string
    if (typeof name !== "string") {
      return res.status(422).json({
        status: "error",
        message: "Name must be a string"
      });
    }

    // 3. Call Genderize API
    const response = await fetch(
      `https://api.genderize.io?name=${encodeURIComponent(name)}`
    );

    if (!response.ok) {
      return res.status(502).json({
        status: "error",
        message: "Upstream service failure"
      });
    }

    const data = await response.json();

    const { gender, probability, count } = data;

    // 4. Edge case
    if (!gender || count === 0) {
      return res.status(422).json({
        status: "error",
        message: "No prediction available for the provided name"
      });
    }

    const sample_size = count;

    // 5. Confidence logic
    const is_confident =
      probability >= 0.7 && sample_size >= 100;

    // 6. Timestamp
    const processed_at = new Date().toISOString();

    // 7. Success response
    return res.status(200).json({
      status: "success",
      data: {
        name: name.toLowerCase(),
        gender,
        probability,
        sample_size,
        is_confident,
        processed_at
      }
    });

  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error"
    });
  }
}