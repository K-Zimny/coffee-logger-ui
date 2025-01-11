import { NextResponse } from "next/server";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

// Create the low-level client
const client = new DynamoDBClient({
  region: process.env.REGION,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID || "",
    secretAccessKey: process.env.SECRET_ACCESS_KEY || "",
  },
});

// Wrap it in DocumentClient for convenience
const dynamoDB = DynamoDBDocumentClient.from(client);

export async function GET() {
  try {
    const data = await dynamoDB.scan({
      TableName: process.env.TABLE_NAME,
    });
    return NextResponse.json(data.Items);
  } catch (err) {
    console.error("DynamoDB Error:", err);
    return NextResponse.json({ error: "Error fetching data" }, { status: 500 });
  }
}
