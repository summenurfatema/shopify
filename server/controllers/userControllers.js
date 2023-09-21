import express from "express";

class UserController {
  /**
   * MEHTOD   -> GET
   * URI      -> /api/v1/user
   * @description index method will help us to get all user from the database
   */
  static async index(req, res) {
    try {
      // const users = await
    } catch (error) {
      return res.status(500).json({ message: "Try again later./" });
    }
  }

  /**
   * MEHTOD   -> POST
   * URI      -> /api/v1/user
   * @description store method will help us to create a new user to the database
   */
  static store() {}

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
