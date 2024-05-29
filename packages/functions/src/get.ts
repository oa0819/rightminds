import { Table } from "sst/node/table";
import { APIGatewayProxyEvent } from "aws-lambda";
import AWS from "aws-sdk";

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export async function main(event: APIGatewayProxyEvent) {
  let result;

  await dynamoDb
    .get({
      TableName: Table["RM-table"].tableName,
      Key: {
        pid: "u001",
        sid: event?.queryStringParameters?.sid,
      },
    })
    .promise()
    .then((res) => {
      console.log(res.Item);
      result = JSON.stringify(res.Item);
    })
    .catch((err) => {
      throw new Error("Item not found.");
    });

  return result;
}
