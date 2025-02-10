import Image from 'next/image'
import Link from 'next/link'

export default function About() {
  return (
    <>
      <div id="about">
        <h1>About</h1>
        <Link href={'/'} className="mb-12">
          Back to Dashboard
        </Link>
        <div>
          <h2>Summary</h2>
          <p>
            Coffee Logger is an embedded C/C++ microcontroller project that
            integrates with AWS for real-time data storage and retrieval using a
            React Next.js application dashboard. The system detects coffee
            brewing events using an Arduino ESP32 and a contactless water level
            sensor. Data is sent to an AWS API Gateway, processed via a Lambda
            function, and stored in DynamoDB. The Next.js-based React dashboard
            then retrieves and displays insightful coffee metrics.
          </p>
          <hr />
          <h2>Architecture</h2>
          <Image
            src="/coffee-logger-architecture.svg"
            width={950}
            height={1200}
            alt="Coffee Logger Architecture"
            className="mt-8 mb-16 mx-auto border-2 border-black"
          />
          <hr />
          <h2>System Overview</h2>
          <h3>Data Collection and Transmission</h3>
          <div className="content">
            <p>
              An <strong>Arduino ESP32</strong>, a Wi-Fi-enabled
              microcontroller, is connected to a contactless water level sensor
              attached to the back of my coffee machine. When brewing starts,
              the water level in the coffee pot drops, triggering the sensor to
              send a 5V signal to the Arduino. The Arduino detects this change,
              constructs, and then sends an HTTP POST request with an API key to
              an <strong>AWS API Gateway endpoint</strong>.
            </p>
          </div>
          <h3>Data Processing and Storage</h3>
          <div className="content">
            <p>
              When the Arduino&apos;s request reaches the API Gateway, an{' '}
              <strong>AWS Lambda function</strong> is triggered and begins
              processing the incoming data. The Lambda function assumes an{' '}
              <strong>IAM role</strong> with least privilege, allowing it to
              store the processed data in <strong>DynamoDB</strong>.
            </p>
          </div>
          <h3>Data Retrieval and Display</h3>
          <div className="content">
            <p>
              When a user accesses the website to view coffee metrics, they
              interact with a <strong>Next.js React application</strong>. On
              page load, the client sends a request to a server-side API route
              in Next.js, which holds the necessary credentials to make an HTTP
              GET request to another AWS API Gateway. The API Gateway triggers a
              Lambda function as before and assumes the required IAM role to
              scan the database. The retrieved coffee data response is returned
              to the frontend and displayed in the application.
            </p>
            <hr />
          </div>
          <h2>Key Features</h2>
          <div className="content">
            <p>
              Both API Gateways enforce rate and burst limits to mitigate
              excessive costs and disruptions, while AWS CloudWatch logs
              interactions and reports anomalies for monitoring and debugging.
              The system follows a Zero Trust model, using IAM roles instead of
              user credentials for temporary permissions, ensuring least
              privilege access to specific resources and actions, minimizing
              exposure in case of compromise.
            </p>
          </div>
          <hr />
          <h2>Areas for Improvement</h2>
          <div className="content">
            <p>
              To prevent data loss from Wi-Fi or AWS connection failures, missed
              coffee events could be stored in EEPROM on the Arduino.
              Additionally, optimizing database storage and response formats
              would reduce frontend processing, improving query efficiency for
              faster data retrieval and display. These enhancements will further
              strengthen the system&apos;s resilience and performance.
            </p>
          </div>
        </div>
        <Link href={'/'} className="mt-28">
          Back to Dashboard
        </Link>
      </div>
    </>
  )
}
