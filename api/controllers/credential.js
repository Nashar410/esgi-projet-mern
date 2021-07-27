const db = require("../models");
const Credential = db.credential;
const User = db.users;
const config = require("../config/config");
const Op = db.Sequelize.Op;
const users = require("../controllers/user.js");
var jwt = require("jsonwebtoken");    

// Create and Save a Credentials By the User Id
exports.createByUser = (req, res) => {
  const id = req.params.id;

  // Validate request
  if (!id) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  User.findOne({ where: { id: id }, attributes:["id"]})
  .then(user => {
      console.log(user.id)

      const test = generateCredentials(user);
      console.log(test);

      res.send({message: user.id});
  })
  .catch(err => {
      res.status(500).send({
          message: "Error retrieving Users with id=" + id
      });
  });

  // Create a Credentials
  /*const credentials = {
    clientToken: credentials.clientToken,
    clientSecret: credentials.clientSecret,
  };

  // Save Tutorial in the database
  Credential.create(credentials)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });*/
};

// Retrieve all Credentials from the database.
exports.findAll = (req, res) => {

    Credential.findAll()
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message:
                  err.message || "Some error occurred while retrieving Users."
            });
        })

}

// Update a Users by the id in the request
exports.updateByUser = (req, res) => {
    const id = req.params.id;

    Credential.update(req.body, {
        where: { userId: id }, attributes:["clientToken", "clientSecret"], include: [{model: User, nested: true, as: "credential"}]
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Credentials was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Credentials with id=${id}. Maybe Credenital was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Credentials with id=" + id
            });
        });
};

// Delete a Credentials with the specified id in the request
exports.deleteByUser = (req, res) => {
    const id = req.params.id;
  
    Credential.destroy({
      where: { userId: id }, attributes:["clientToken", "clientSecret"], include: [{model: User, nested: true, as: "credential"}]
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Credentials was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Credentials with id=${id}. Maybe Credentials was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Credentials with id=" + id
        });
      });
  };


// Delete all Credentials from the database.
  
exports.deleteAll = (req, res) => {
    Tutorial.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Credentials were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Credentials."
        });
      });
  };

// Create and Save a new Users
exports.findByUser = (req, res) => {
    const id = req.params.id;

    Credential.findOne({ where: { userId: id }, attributes:["clientToken", "clientSecret"], include: [{model: User, nested: true, as: "credential"}] }).then(data =>{
        const credentials = {
            "clientToken": data.clientToken,
            "clientSecret": data.clientSecret,
        }
        res.send(credentials);
    }).catch(err => {
        console.log(err);
        res.status(500).send({
            message: "Error retrieving Credentials Users with id=" + id
        });
    });;
}

async function generateCredentials (user) {

  const clientToken = jwt.sign({id: `${user.id}`}, config.development.secret, {
      expiresIn: 86400 // 24 hours
  });
  const clientSecret = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 16);
  const credentials = await Credential.create({
      clientSecret,
      clientToken
  });
  await user.setCredential(credentials);
  await user.save();
  return await user.getCredential();
}
