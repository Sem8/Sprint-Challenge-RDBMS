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
  return projectdb("projects");
}

function getProject(id) {
  return projectdb("projects")
    .where({ id })
    .first();
}

function getActions() {
  return projectdb("actions");
}

// function getProjectActions(projectId) {
//   return projectdb("actions")
//     .where("project_id", projectId)
//     .then(actions => actions.map(action => this.getAction(action)));
// }
function getProjectActions(projectId) {
  return projectdb("actions")
    .where("project_id", projectId)
    .then(actions => actions.map(action => action));
}

// function getProjectActions(projectId) {
//     return projectdb("actions")
//       .where("project_id", projectId).first();
//   }

// function getProjectActions(projectId) {
//     return projectdb('actions')
//       .join('projects', 'projects.id', 'actions.project_id')
//       .select('actions.id', 'actions.description', 'actions.notes', 'projects.name')
//       .where('actions.project_id', projectId);
//   }

//   function getUserPosts(userId) {
//     return db('posts as p')
//       .join('users as u', 'u.id', 'p.user_id')
//       .select('p.id', 'p.text', 'u.name as postedBy')
//       .where('p.user_id', userId);
//   }
