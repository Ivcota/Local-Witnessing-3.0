import { createServer } from "@graphql-yoga/node";
import express from "express";
import { context } from "./api/contextModule";
import { schema } from "./api/schema";

const PORT = process.env.PORT || 4000;

const app = express();
const graphQLServer = createServer({ schema, context });

app.get("/", (req, res) => {
  res.json({
    version: 1,
    message: "Welcome to Local Witnessing 3.0",
  });
});

app.use("/graphql", graphQLServer);

app.listen(PORT, () => {
  console.log(`Server running at  http://localhost:${PORT}`);
});
