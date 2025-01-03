import { NextResponse } from "next/server";
import AWS from "aws-sdk";

// DynamoDB DocumentClient
const dynamoDB = new AWS.DynamoDB.DocumentClient({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

export async function GET() {
  try {
    const data = await dynamoDB.scan("MYTABLENAME").promise();
    return NextResponse.json(data.Items);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      {
        error: "Error fetching data",
      },
      { status: 500 }
    );
  }
}
