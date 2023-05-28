import type { CodegenConfig } from "@graphql-codegen/cli";

const token = process.env.GITHUB_TOKEN;

const config: CodegenConfig = {
  overwrite: true,
  schema: {
    "https://api.github.com/graphql": {
      headers: {
        "user-agent": "node.js",
        Authorization: `Bearer ${token}`,
      },
    },
  },
  documents: [`src/app/graphql/ops/**/*.graphql`],
  generates: {
    "src/app/graphql/ops.ts": {
      plugins: ["typescript", "typescript-operations", "typed-document-node"],
    },
  },
};

export default config;
