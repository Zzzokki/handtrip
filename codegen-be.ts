import type { CodegenConfig } from "@graphql-codegen/cli";
import { defineConfig } from "@eddeee888/gcg-typescript-resolver-files";

const config: CodegenConfig = {
  overwrite: true,
  schema: "./src/app/api/graphql/schemas",
  generates: {
    "./src/app/api/graphql/types/generated": defineConfig({
      resolverGeneration: "disabled",
    }),
  },
};

export default config;
