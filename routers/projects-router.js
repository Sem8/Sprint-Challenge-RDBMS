const router = require("express").Router();
const knex = require("knex");

const knexConfig = {
  client: "sqlite3",
  useNullAsDefault: true,
  connection: {
    filename: "./data/lambdasprint.sqlite3"
  }
};

const projectsdb = knex(knexConfig);

router.get("/", async (req, res) => {
  try {
    const projects = await projectsdb("projects");
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: `Couldn't retrieve projects: ${error}` });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const project = await projectsdb("projects")
      .where({ id: req.params.id })
      .first();
    res.status(200).json(project);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error occurred while retrieving project: ${error}` });
  }
});

router.post("/", async (req, res) => {
  try {
    const [id] = await projectsdb("projects").insert(req.body);

    const project = await projectsdb("projects")
      .where({ id })
      .first();

    res.status(201).json(project);
  } catch (error) {
    res
      .status(500)
      .json({ message: `New project couldn't be added: ${error}` });
  }
});

module.exports = router;
