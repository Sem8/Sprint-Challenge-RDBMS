const router = require("express").Router();
const knex = require("knex");

const knexConfig = {
  client: "sqlite3",
  useNullAsDefault: true,
  connection: {
    filename: "./data/lambdasprint.sqlite3"
  }
};

// const projectsdb = knex(knexConfig);
const projectsdb = require("../data/dbConfig");
const Projects = require("./helpers/projects-model");

// router.get("/", async (req, res) => {
//   try {
//     const projects = await projectsdb("projects");
//     res.status(200).json(projects);
//   } catch (error) {
//     res.status(500).json({ message: `Couldn't retrieve projects: ${error}` });
//   }
// });
router.get("/", (req, res) => {
  Projects.getProjects()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(error => {
      res.status(500).json({
        message: `The projects information could not be retrieved: ${error}`
      });
    });
});

// router.get("/:id", async (req, res) => {
//   try {
//     const project = await projectsdb("projects")
//       .where({ id: req.params.id })
//       .first();
//     res.status(200).json(project);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: `Error occurred while retrieving project: ${error}` });
//   }
// });

// router.get("/:id", (req, res) => {

//     Projects.getProject(req.params.id)
//       .then(project => {
//         res.status(200).json(project);
//       })
//       .catch(error => {
//         res
//           .status(500)
//           .json({ message: `Error occurred while retrieving dish: ${error}` });
//       });
//   });

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

router.get("/:id/actions", async (req, res) => {
  try {
    const actions = await Projects.getProjectActions(req.params.id);
    if (actions && actions.length > 0) {
      res.status(200).json(actions);
    } else {
      res.status(400).json({ message: "No actions for this post" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: `error getting the actions for this post: ${error}` });
  }
});

// router.get("/:id", async (req, res) => {
//   const { id } = req.params;
//   try {
//     const project = await Projects.getProject(id);
//     if (project) {
//       try {
//         const actions = await projectsdb("actions").where({
//           project_id: req.params.id
//         });
//         res.status(200).json(actions);
//       } catch (error) {
//         res.status(500).json(error);
//       }
//     }
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: `Error occurred while retrieving project: ${error}` });
//   }
// });

router.get('/:id', (req, res) => {
    projectsdb('projects').where(req.params).first()
    .then(project => {
        projectsdb('actions').where({ project_id: req.params.id })
        .then(actions => {
            project.actions = actions;
            res.status(200).json(actions);
        })
    })
    .catch(error => {
        res.status(500).json({ message: `Error occurred while getting projects: ${error}`})
    });
});

    

module.exports = router;

// router.get("/:id/actions", async (req, res) => {
//     try {
//       const actions = await Projects.getProjectActions(req.params.id);
//       if (actions && actions.length > 0) {
//         res.status(200).json(actions);
//       } else {
//         res.status(404).json({ message: "No actions for this post" });
//       }
//     } catch (error) {
//       res
//         .status(500)
//         .json({ message: `error getting the actions for this post: ${error}` });
//     }
//   });

// return db('actions')
// .where('project_id', projectId)
// .then(actions => actions.map(action => mappers.actionToBody(action)));
