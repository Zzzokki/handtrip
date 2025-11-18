import type { CodegenConfig } from "@graphql-codegen/cli";

const schemaUrl = "http://localhost:3000/api/graphql";

const config: CodegenConfig = {
  schema: [schemaUrl],
  documents: ["./src/graphql/*.graphql"],
  generates: {
    "./src/types/generated/index.ts": {
      config: {
        reactApolloVersion: 3,
        withHooks: true,
      },
      plugins: ["typescript", "typescript-operations", "typescript-react-apollo"],
    },
  },
  overwrite: true,
};

export default config;
