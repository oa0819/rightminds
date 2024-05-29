import AWS from "aws-sdk";
import * as uuid from "uuid";
import { APIGatewayProxyEvent } from "aws-lambda";

import { Table } from "sst/node/table";

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export async function main(event: APIGatewayProxyEvent) {
  let data, params;
  console.log(event);

  if (event.body) {
    data = JSON.parse(event.body);
    params = {
      TableName: Table["RM-table"].tableName,
      Item: {
        pid: "u001",
        sid: uuid.v1(),
        type: data.type,
        // address: data.address,
        // mobileNumber: data.mobileNumber,
        altMobileNumber: data.altMobileNumber,
        email: data.email,
      },
    };
  } else {
    return {
      statusCode: 404,
      body: JSON.stringify({ error: true }),
    };
  }

  try {
    await dynamoDb.put(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify(params.Item),
    };
  } catch (error) {
    let message;
    if (error instanceof Error) {
      message = error.message;
    } else {
      message = String(error);
    }
    return {
      statusCode: 500,
      body: JSON.stringify({ error: message }),
    };
  }
}
