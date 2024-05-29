import { Bucket, StackContext, Table } from "sst/constructs";

export function StorageStack({ stack }: StackContext) {
  // const bucket = new Bucket(stack, "Uploads");
  // Create the DynamoDB table
  const table = new Table(stack, "RM-table", {
    fields: {
      pid: "string",
      sid: "string",
      type: "string",
      address: "string",
      mobileNumber: "string",
      altMobileNumber: "string",
      email: "string",
      avatar: "string",
      paymentId: "string",
    },
    primaryIndex: { partitionKey: "pid", sortKey: "sid" },
  });

  return {
    // bucket,
    table,
  };
}
