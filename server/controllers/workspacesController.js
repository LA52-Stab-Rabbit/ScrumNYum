const db = require('../models/models.js');

const workspacesController = {};

const createErr = (errInfo) => {
  const { method, type, err } = errInfo;
  return {
    log: `workspacesController.${method} ${type}: ERROR: ${typeof err === 'object' ? JSON.stringify(err) : err
      }`,
    message: {
      err: `workspacesController.${method}: Incorrect data received`,
    },
  };
};

// adding workspace to workspace table but not returning anything
// post request to api/workspaces without returning any data - WORKS
workspacesController.addWorkspace = (req, res, next) => {
  console.log('in workspacesController.addWorkspace');
  const query = `
    INSERT INTO workspaces (id, workspace_password) 
    VALUES ($1, $2) 
    ON CONFLICT (id) DO NOTHING`;
  // ON CONFLICT DO WE WANT TO ALERT THE USER THAT IT'S A DUPE?
  console.log('request body', req.body)

  // to do - check to see if this matches front end req.body
  // REMIND JAVI/AUTUMN THAT WS-NAME NEEDS TO BE WS_NAME
  db.query(query, [req.body.ws_name, req.body.ws_pw])
    .then(() => { return next() })
    .catch((err) => {
      return next(
        createErr({
          method: 'addWorkspace',
          type: 'middleware error',
          err: err,
        })
      );
    });
}

// deleting workspace from workspace table but not returning anything
// delete request to api/workspaces without returning any data - WORKS
workspacesController.deleteWorkspace = (req, res, next) => {
  console.log('in workspacesController.deleteWorkspace');
  const query = 'DELETE FROM workspaces WHERE workspaces.id = $1';
  // does second arg in query method need to be an array even if just one element??
  console.log('this my req name', req.body.ws_name)
  db.query(query, [req.body.ws_name])
    .then(() => { return next() })
    .catch((err) => {
      return next(
        createErr({
          method: 'deleteWorkspace',
          type: 'middleware error',
          err: err,
        })
      );
    });
}

// getting workspace from workspace table and returning it
// get request to api/workspaces and returning data - WORKS
workspacesController.getWorkspaces = (req, res, next) => {
  console.log('in workspacesController.getWorkspaces');
  const query = 'SELECT * FROM workspace';
  db.query(query)
    .then((data) => {
      res.locals.workspaces = data.rows;
      return next();
    })
    .catch((err) => {
      return next(
        createErr({
          method: 'getWorkspaces',
          type: 'middleware error',
          err: err,
        })
      );
    });
}

// saving the current state of the workspace
// put request to api/saveworkspace and rewrite the db 
workspacesController.saveWorkspace = (req, res, next) => {
  console.log('in .saveWorkspace');
  const query = 'UPDATE workspace SET workspace = $1 WHERE id = $2'
  db.query(query, [req.body.workspace, req.body.id])
   .then((data) => {
    res.locals.workspaces = data.rows;
    return next();
   })
   .catch((err) => {
    return next(
      createErr({
        method:'saveWorkspace',
        type: 'middleware error',
        err:err,
      })
    );
   });
}


// update workspace in workspace table but not returning anything
// workspacesController.updateWorkspace = (req, res, next) => {

// }

module.exports = workspacesController;
