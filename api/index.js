export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  return res.status(200).json({
    status: "success",
    message: "Welcome to the Name Classification API 👋",
    version: "1.0.0",
    endpoints: [
      {
        method: "GET",
        route: "/api/classify",
        description: "Classify a name using Genderize API",
        query_params: {
          name: "string (required)"
        },
        example: "/api/classify?name=john"
      }
    ],
    usage_notes: [
      "Provide a valid name as a query parameter",
      "Returns structured gender prediction data",
      "Confidence is based on probability >= 0.7 AND sample size >= 100"
    ],
    author: "Your Name",
    timestamp: new Date().toISOString()
  });
}