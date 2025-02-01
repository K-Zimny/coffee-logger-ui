# Coffee Logger

This embedded C/C++ micro-controller connected to AWS for real-time data storage with Next.js for retrieval and rendering.
             
When coffee is brewed, an Arduino sends data to an AWS API Gateway, invoking a Lambda function and storing data in a DynamoDB table. This React-powered dashboard application then fetches and displays the data, delivering insightful coffee metrics.