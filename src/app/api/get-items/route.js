import { NextResponse } from "next/server";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { ScanCommand } from "@aws-sdk/lib-dynamodb";

function getCredentials() {
  if (process.env.ACCESS_KEY_ID && process.env.SECRET_ACCESS_KEY) {
    return {
      accessKeyId: process.env.ACCESS_KEY_ID,
      secretAccessKey: process.env.SECRET_ACCESS_KEY,
    };
  }
  return undefined;
}

const client = new DynamoDBClient({
  region: process.env.REGION || "",
  credentials: getCredentials(),
});

export async function GET() {
  try {
    const params = {
      TableName: process.env.TABLE_NAME,
    };

    const data = await client.send(new ScanCommand(params));

    return NextResponse.json(data.Items ?? []);
  } catch (err) {
    console.error("Scan error:", err);

    return NextResponse.json(
      { error: "Error fetching items" },
      { status: 500 }
    );
  }
}
