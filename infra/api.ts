import { table, bucket } from "./storage";

export const myApi = new sst.aws.ApiGatewayV2("Api", {
  transform: {
    route: {
      handler: {
        link: [table],
      },
    },
  },
});

myApi.route("GET /notes/{id}", "packages/functions/src/get.main");
myApi.route("GET /notes", "packages/functions/src/list.main");
myApi.route("POST /notes", "packages/functions/src/create.main");
myApi.route("PUT /notes/{id}", "packages/functions/src/update.main");
myApi.route("DELETE /notes/{id}", "packages/functions/src/delete.main");
