# Monorepo Template

A template to create a monorepo SST ❍ Ion project.

## Get started

1. Use this template to [create your own repo](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template).

2. Clone the new repo.

   ```bash
   git clone MY_APP
   cd MY_APP
   ```

3. Rename the files in the project to the name of your app.

   ```bash
   npx replace-in-file '/sst-notes/g' MY_APP **/*.* --verbose
   ```

   , and set the default profile for AWS to use in deploying

   ```
   set AWS_DEFAULT_PROFILE=sst-profile
   ```

4. Deploy!

   ```bash
   npm install
   npx sst dev
   npx sst deploy --stage production
   ```

5. Optionally, enable [_git push to deploy_](https://ion.sst.dev/docs/console/#autodeploy).

## Usage

This template uses [npm Workspaces](https://docs.npmjs.com/cli/v8/using-npm/workspaces). It has 3 packages to start with and you can add more it.

1. `core/`

   This is for any shared code. It's defined as modules. For example, there's the `Example` module.

   ```ts
   export module Example {
     export function hello() {
       return "Hello, world!";
     }
   }
   ```

   That you can use across other packages using.

   ```ts
   import { Example } from "@aws-monorepo/core/example";

   Example.hello();
   ```

2. `functions/`

   This is for your Lambda functions and it uses the `core` package as a local dependency.

3. `scripts/`

   This is for any scripts that you can run on your SST app using the `sst shell` CLI and [`tsx`](https://www.npmjs.com/package/tsx). For example, you can run the example script using:

   ```bash
   npm run shell src/example.ts
   ```

### Infrastructure

The `infra/` directory allows you to logically split the infrastructure of your app into separate files. This can be helpful as your app grows.

In the template, we have an `api.ts`, and `storage.ts`. These export the created resources. And are imported in the `sst.config.ts`.

---

Join the SST community over on [Discord](https://discord.gg/sst) and follow us on [Twitter](https://twitter.com/SST_dev).

### Sign Up User

```
 aws cognito-idp sign-up \
     --region <REGION> \
     --client-id <USER_POOL_ID> \
     --username <USER_NAME> \
     --password <USER_PASSWORD>
```

### Confirm Identity via Email

```
aws cognito-idp admin-confirm-sign-up \
    --region us-east-1 \
    --user-pool-id <USER_POOL_ID> \
    --username <USER_NAME>
```

### Make API Request with Authentication token

```
npx aws-api-gateway-cli-test \
  --username='<USER_NAME>' \
  --password='<USER_PASSWORD>' \
  --user-pool-id='<USER_POOL_ID>' \
  --app-client-id='<USER_POOL_CLIENT_ID>' \
  --cognito-region='<REGION>' \
  --identity-pool-id='<IDENTITY_POOL_ID>' \
  --invoke-url='<API_URL>' \
  --api-gateway-region='<AGW_REGION>'  \
  --path-template='/notes' \
  --method='POST' \
  --body='{"content":"hello world", "attachment":"hello.jpg"}'
```

Sample Response:

```
Making API request
{
status: 200,
statusText: 'OK',
data: {
  userId: 'us-east-1:e70e9f67-06c0-c50f-6290-a6491d6028b9',
  noteId: 'a0a64d70-9b5a-11ef-8933-45a637918570',
  content: 'hello world',
  attachment: 'hello.jpg',
  createdAt: 1730799901639
}
}
```
