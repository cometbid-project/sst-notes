/// <reference path="./.sst/platform/config.d.ts" />

import { identityPool, userPoolClient } from "./infra/auth";

export default $config({
  app(input) {
    return {
      name: "sst-notes",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
    };
  },
  async run() {
    await import("./infra/storage");
    const api = await import("./infra/api");
    const auth = await import("./infra/auth");

    return {
      UserPool: auth.userPool.id,
      Region: aws.getRegionOutput().name,
      IdentityPool: auth.identityPool.id,
      UserPoolClient: auth.userPoolClient.id,
      api: api.myApi.url,
    };
  },
});
