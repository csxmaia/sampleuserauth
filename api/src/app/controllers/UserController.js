const { users } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class User {
  async signUp(req, res) {
    var { username, email, password, name, number } = req.body;

    await bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        console.log("erro " + err);
      } else {
        try {
          password = hash;

          const data = await users.create({
            username,
            email,
            password,
            name,
            number,
          });

          // data.password = undefined;

          res.status(200).json(data);
        } catch (error) {
          res.status(404).json(error);
        }
      }
    });
  }

  async login(req, res) {
    console.log(req.body);
    try {
      const { username, password } = req.body;

      const user = await users.findOne({
        where: {
          username: username,
        },
        attributes: ["id", "username", "password"],
      });

      if (user === null) {
        res.status(404).json("Usuario não encontrado no sistema");
      } else {
        bcrypt.compare(password, user.password, function (err, isMatch) {
          if (err) {
            throw err;
          } else {
            if (isMatch) {
              //AUTH JWT TOKEN
              let tokenData = {
                id: user.id,
                // role: "admin",
                username: user.username,
              };
              let generatedToken = jwt.sign(tokenData, process.env.JWT_KEY, {
                expiresIn: "10m",
              });

              res.json({
                msg: "Bem vindo " + user.username,
                token: generatedToken,
              });
            } else {
              res.status(400).json("Senha incorreta");
            }
          }
        });
      }
    } catch (error) {
      res.status(404).json("" + error);
    }
  }

  async getProfileInfo(req, res) {
    try {
      const { id } = res.locals.user;
      const data = await users.findByPk(id);
      // data.destroy()
      res.json({
        success: true,
        data,
      });
    } catch (error) {
      res.status(404).json(error);
    }
  }

  async updateProfileInfo(req, res) {
    try {
      const { id } = res.locals.user;
      const data = await users.findByPk(id);
      data.update({
        name: req.body.name,
        number: req.body.number,
      });
    } catch (error) {
      res.status(404).json(error);
    }
  }

  async getAll(req, res) {
    try {
      const data = await users.findAll();
      console.log(res.locals.userid);
      res.json({
        success: true,
        data,
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        error,
      });
    }
  }
}

module.exports = new User();
