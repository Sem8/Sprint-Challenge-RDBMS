const projectdb = require("../../data/dbConfig");

module.exports = {
    getProjects,
    getProject,
  getProjectActions
};

// function getAction(id) {
//   return projectdb("actions").where({ id }).first();
// }

function getProjects() {
    return projectdb('projects');
};

function getProject(id) {
    return projectdb('projects').where({ id }).first();
}

function getActions() {
    return projectdb('actions');
};

// function getProjectActions(projectId) {
//   return projectdb("actions")
//     .where("project_id", projectId)
//     .then(actions => actions.map(action => this.getAction(action)));
// }
function getProjectActions(projectId) {
    return projectdb("actions")
      .where("project_id", projectId)
      .then(actions => actions.map(action => action ));
  }

// function getProjectActions(projectId) {
//     return projectdb("actions")
//       .where("project_id", projectId).first();
//   }
