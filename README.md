Coffee Logger is Embedded C/C++ Hardware connected to AWS for real time data storage. A React powered Next JS Application handles this Dashboard.

When a pot of coffee is brewed on my home machine an Arduino makes an HTTP request to an AWS API Gateway. Invoking Lambda, the data is stored in a DynamoDB. The frontend fetches the data and renders it here.