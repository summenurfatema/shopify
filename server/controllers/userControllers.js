import { UserModel } from "../models/index.js";

class UserController {
  /**
   * MEHTOD   -> GET
   * URI      -> /api/v1/user
   * @description index method will help us to get all user from the database
   */
  static async index(_, res) {
    try {
      const users = await UserModel.find();
      if (!users) return res.status(400).json({ message: "No user fund!" });
      res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ message: "Try again later./" });
    }
  }

  /**
   * MEHTOD   -> POST
   * URI      -> /api/v1/user
   * @description store method will help us to create a new user to the database
   */
  static async store(req, res) {
    const { name, email, password } = req.body;
    if (!email || !password)
      return res
        .status(400)
        .json({ message: "Email and Password is reqired!" });
    /**
     * TODO
     * hash your password using bcrypt js
     */
    try {
      const isUser = await UserModel.findOne({
        email,
      });

      if (isUser)
        return res.status(400).json({ message: "Email alread exits!" });

      const user = await UserModel.create({
        name,
        email,
        password, // should be replaced -> password: hashPassword
      });

      res.status(201).json({
        message: "Account created successfull!🎉",
        user,
      });
    } catch (error) {
      return res.status(500).json({ message: "Try again later./" });
    }
  }

  /**
   * TODO
   */
  static update() {}
  /**
   * TODO
   */
  static delete() {}
}

export default UserController;
