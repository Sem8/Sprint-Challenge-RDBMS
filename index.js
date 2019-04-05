const express = require("express");
const helmet = require("helmet");

const projectsRouter = require("./routers/projects-router");
const actionsRouter = require("./routers/actions-router");

const server = express();

server.use(express.json());
server.use(helmet());

server.get("/", (req, res) => {
  res.send(
    `Navigate to /api/projects to get projects and /api/projects/(a project number) to get it's specific actions and /api/actions to get a list of actions`
  );
});

server.use("/api/projects", projectsRouter);
server.use("/api/actions", actionsRouter);

const port = process.env.PORT || 5000;
server.listen(port, function() {
  console.log(`\n=== Web API listening on http://localhost:${port} ===\n`);
});
