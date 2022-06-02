import { createServer } from "@graphql-yoga/node";
import express from "express";
import { context } from "./api/contextModule";
import { schema } from "./api/schema";
import cors from "cors";
import sessions from "express-session";

const PORT = process.env.PORT || 4000;

const app = express();
const graphQLServer = createServer({ schema, context });

app.use(
  cors({
    credentials: true,
  })
);

app.use(
  sessions({
    name: "qid",
    secret: process.env.SECRET ? process.env.SECRET : "12345567890",
    resave: false,
    saveUninitialized: true,
  })
);

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
