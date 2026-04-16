# Gender Classification API

## Endpoint
GET /api/classify?name={name}

## Description
Calls Genderize API and returns processed response.

## Example
/api/classify?name=john

## Response
{
  "status": "success",
  "data": {
    "name": "john",
    "gender": "male",
    "probability": 0.99,
    "sample_size": 1234,
    "is_confident": true,
    "processed_at": "ISO timestamp"
  }
}