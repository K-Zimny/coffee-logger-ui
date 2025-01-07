import { NextResponse } from "next/server";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";

const ddbClient = new DynamoDBClient({
  region: process.env.REGION,
});

const dynamoDB = DynamoDBDocumentClient.from(ddbClient);

export async function GET() {
  try {
    const params = {
      TableName: process.env.TABLE_NAME,
    };

    const data = await dynamoDB.send(new ScanCommand(params));

    return NextResponse.json(data.Items);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Error fetching data" }, { status: 500 });
  }
}
