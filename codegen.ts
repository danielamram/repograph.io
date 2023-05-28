import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: {
    "https://api.github.com/graphql": {
      headers: {
        "user-agent": "node.js",
        Authorization: "bearer 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",
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
