import { makeSchema } from "nexus";
import { join } from "path";
import NexusPrismaScalars from "nexus-prisma/scalars";
import * as types from "./graphql/index";

export const schema = makeSchema({
  types: [NexusPrismaScalars, types],
  outputs: {
    typegen: join(__dirname, "..", "nexus-typegen.ts"),
    schema: join(__dirname, "..", "schema.graphql"),
  },
  contextType: {
    module: join(__dirname, "./contextModule.ts"),
    export: "Context",
  },
  sourceTypes: {
    modules: [
      {
        module: "@prisma/client",
        alias: "prisma",
      },
    ],
  },
});
