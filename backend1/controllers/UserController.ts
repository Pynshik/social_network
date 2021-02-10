import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel, UserModelDocumentInterface, UserModelInterface } from "../models/UserModel";
import {isValidObjectId} from '../utils/isValidObjectId';

export const saltRounds = 10;

class UserController {
  async index(
    _: any,
    res: express.Response
  ): Promise<void> {
    try {
      const users = await UserModel.find({}).exec();

      res.json({
        status: "success",
        data: users,
      });
    } catch (error) {
      res.status(400).json({
        status: "error",
        message: error,
      });
    }
  }

  async show(req: express.Request, res: express.Response): Promise<void> {
    try {
      const userId = req.params.id;

      console.log(userId);

      if (!isValidObjectId(userId)) {
        res.status(404).send();
        return;
      }

      const user = await UserModel.findById(userId).exec();

      console.log(user);

      if (!user) {
        res.status(404).send();
        return;
      }

      res.json({
        status: "success",
        data: user,
      });

    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error,
      });
    }
  }

  async create(req: express.Request, res: express.Response): Promise<void> {
    try {
      const newPassword: string = await bcrypt.hash(
        req.body.password,
        saltRounds
      );

      if (!newPassword) {
        res.status(400).send();
        return;
      }

      const data: UserModelInterface = {
        email: req.body.email,
        fullname: req.body.fullname,
        username: req.body.username,
        password: newPassword,
      };

      const user = await UserModel.create(data);
      res.status(201).json({
        status: "success",
        data: user,
      });
    } catch (error) {
      res.status(400).json({
        status: "error",
        message: error,
      });
    }
  }

  async afterLogin(req: express.Request, res: express.Response): Promise<void> {
    try {
      const user = req.user ? (req.user as UserModelDocumentInterface).toJSON() : undefined;
      res.json({
        status: "success",
        data: {
          ...user,
          token: jwt.sign({data: req.user}, '26hgKWUB6kdbSjS', 
            {expiresIn: '30 days'}),
        },
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error,
      });
    }
  }

  async getUserInfo(req: express.Request, res: express.Response): Promise<void> {
    try {
      const user = req.user ? (req.user as UserModelDocumentInterface).toJSON(): undefined;
      res.json({
        status: "success",
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error,
      });
    }
  }
}

export const UserCntrl = new UserController();
