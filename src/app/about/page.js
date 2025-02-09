import Image from "next/image";
import Link from "next/link";

export default function About() {
  return (
    <>
      <div id="about">
        <h1>About</h1>
        <Link href={"/"} className="mb-4">
          Back to Dashboard
        </Link>
        <div>
          <h2>Summary</h2>
          <p>
            Coffee Logger is an embedded C/C++ microcontroller project that
            integrates with AWS for real-time data storage and retrieval using a
            Next.js dashboard. The system detects coffee brewing events using an
            Arduino ESP32 and a contactless water level sensor. Data is sent to
            an AWS API Gateway, processed via a Lambda function, and stored in
            DynamoDB. The Next.js-based React dashboard then retrieves and
            displays insightful coffee metrics.
          </p>
          <hr />

          <Image
            src="/coffee-logger-architecture.svg"
            width={950}
            height={1200}
            alt="Coffee Logger Architecture"
            className="mt-8"
          />

          <h2>System Overview</h2>

          <h3>Data Collection and Transmission</h3>
          <div className="content">
            <p>
              An <strong>Arduino ESP32</strong> is connected to a{" "}
              <strong>contactless water level sensor</strong>, attached to the
              back of a coffee machine. When brewing starts, the water level in
              the coffee pot drops, triggering the sensor to send a{" "}
              <strong>5V signal</strong> to the Arduino.
            </p>
            <ul>
              <li>
                The Arduino detects this voltage change and executes a function
                that posts a brew event to AWS.
              </li>
              <li>
                It constructs and sends an <strong>HTTP POST request</strong>{" "}
                with an API key to an <strong>AWS API Gateway endpoint</strong>.
              </li>
            </ul>
          </div>

          <h3>Data Processing and Storage</h3>
          <div className="content">
            <p>When the Arduino's request reaches the API Gateway:</p>
            <ol>
              <li>
                The API Gateway triggers an <strong>AWS Lambda function</strong>{" "}
                to process the incoming data.
              </li>
              <li>
                The Lambda function assumes an <strong>IAM role</strong> with
                least privileges, allowing it to store data in{" "}
                <strong>DynamoDB</strong>.
              </li>
              <li>The processed data is inserted into the DynamoDB table.</li>
            </ol>
          </div>

          <h3>Data Retrieval and Display</h3>
          <div className="content">
            <p>
              When a user accesses the website to view coffee metrics, they
              interact with a <strong>Next.js React application</strong>. On
              page load:
            </p>
            <ol>
              <li>
                The client sends a request to a server-side API route in
                Next.js.
              </li>
              <li>
                The server, which holds necessary credentials, makes an{" "}
                <strong>HTTP GET request</strong> to another AWS API Gateway.
              </li>
              <li>
                The API Gateway triggers a <strong>Lambda function</strong> to
                assume the required IAM role and scan the database.
              </li>
              <li>
                The retrieved coffee data is returned to the frontend and
                displayed in the application.
              </li>
            </ol>
            <hr />
          </div>

          <h2>Key Features</h2>

          <h3>Rate Limiting</h3>
          <div className="content">
            <p>
              Both API Gateways implement rate and burst limits to prevent
              excessive costs or disruptions due to misconfigurations or
              malicious activity.
            </p>
          </div>

          <h3>CloudWatch Monitoring</h3>
          <div className="content">
            <p>
              AWS CloudWatch logs interactions and reports anomalies for system
              monitoring and debugging.
            </p>
          </div>

          <h3>Zero Trust & Least Privilege</h3>
          <div className="content">
            <ul>
              <li>
                Uses <strong>IAM roles</strong>, not user credentials, for
                temporary permissions.
              </li>
              <li>
                Each role is restricted to specific resources and allowed
                actions.
              </li>
              <li>
                If compromised, exposure is limited to the role's specific
                permissions.
              </li>
            </ul>
          </div>
          <hr />

          <h2>Areas for Improvement</h2>

          <h3>Handling Missed Coffee Events</h3>
          <div className="content">
            <ul>
              <li>
                Store missed coffee events in <strong>EEPROM</strong> on the
                Arduino in case of WiFi or AWS connection failures.
              </li>
              <li>
                Currently, any connection issue results in lost data points.
              </li>
            </ul>
          </div>

          <h3>Database Optimization</h3>
          <div className="content">
            <ul>
              <li>
                Improve record storage and response format to reduce frontend
                data processing.
              </li>
              <li>
                Enhance query efficiency for faster data retrieval and display.
              </li>
            </ul>
          </div>
          <hr />

          <div className="content">
            <p>
              This project demonstrates a robust integration between embedded
              hardware and cloud computing, ensuring reliable and secure
              real-time coffee monitoring. Future improvements will enhance
              resilience and performance.
            </p>
          </div>
        </div>
        <Link href={"/"} className="mt-28">
          Back to Dashboard
        </Link>
      </div>
    </>
  );
}
