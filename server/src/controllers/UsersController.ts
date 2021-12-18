import { NextFunction, Request, Response } from 'express';
import jwt from "jsonwebtoken";
import Knex from 'knex';
import db from '../database/connection';

const secret = "w{ye4bA$,xRK)FKb6'4C5XFvZus3Ze3R(\e-xcre%MU]36WB`e";

export default class UsersController {

  async create(req: Request, res: Response)  {
    console.log(req.body)
    const {
      username,
      password,
      name,
      photo,
      age,
      bio,
      sexuality,
      location,
      github,
      facebook,
      instagram,
      linkedin,
      spotify,
      language
    } = req.body;

    console.log(req.body)

    const trx = await db.transaction();

    try {

      const insertedUsersIds = await trx('users').insert({
        username,
        password,
        name,
        photo,
        age,
        bio,
        sexuality,
        location,
        github,
        facebook,
        instagram,
        linkedin,
        spotify,
        language
      });
      const user_id = insertedUsersIds[0];

      await trx.commit();

      return res.status(201).send();
    } catch (err) {
      await trx.rollback();
      console.log(err)

      return res.status(400).json({
        error: 'Unexpected error while creating new user.'
      });
    }

  }

  async loggedUser(req: Request, res: Response) {
    const id = (req as any).loggedUserId;

      const user = await db('users').where({ id }).first();

      res.json(user);
  }

  async edit(req: Request, res: Response) {
    const id = (req as any).loggedUserId;

    try {
      await db('users').where({id}).update({id, ...req.body});
    } catch (error) {
      console.log(error)
    }

    // await db('users').where({id}).update({
    //   username: req.body["username"],
    //   password: req.body["password"],
    //   name: req.body["name"],
    //   photo: req.body["photo"],
    //   age: req.body["age"],
    //   bio: req.body["bio"],
    //   sexuality: req.body["sexuality"],
    //   github: req.body["github"],
    //   facebook: req.body["facebook"],
    //   instagram: req.body["instagram"],
    //   linkedin: req.body["linkedin"],
    //   location: req.body["location"],
    //   spotify: req.body["spotify"],
    //   language: req.body["language"]
    // });
  }

  async login(req: Request, res: Response) {

    const {username, password} = req.body;
    const user = await db('users').where({ username, password }).first()

    if(user){
      const token = jwt.sign({ id: user.id, username: user.username }, secret, {
        expiresIn: 3000000
      });
      return res.json({ auth: true, token: token });
    }

    res.status(401).json({message: 'Login inválido!'});
  }

  async index(req: Request, res: Response) {
    const filters = req.query;

    var users;
    var isGetAll = false;
    console.log(filters.preference)

    if (filters.preference == undefined){
        isGetAll = true
    }

    if (!isGetAll){

      // validate
      filters.preference = filters.preference == "Ambos"? "%e%": filters.preference
      filters.preference = filters.preference == ""? "%%": filters.preference
      filters.language = filters.language == ""? "%%": filters.language
      filters.city = filters.city == ""? "%%": "%" + filters.city + "%"

      filters.minAge = filters.minAge == ""? '0' : filters.minAge
      filters.maxAge = filters.maxAge == ""? '90' : filters.maxAge


      console.log(filters)

        users = await db('users')
          .whereExists(function() {
            this.select('users.*')
              .from('users')
              .andWhere('sexuality', 'like', filters.preference)
              .andWhere('language', 'like', filters.language)
              .andWhere('location', 'like', filters.city)
              .andWhere('age', '>', filters.minAge)
              .andWhere('age', '<', filters.maxAge)

            });
    } else{
      users = await db('users')
          .whereExists(function() {
            this.select('users.*')
              .from('users')
          });
    }

    console.log(users)
    console.log(req.headers.authorization);

    return res.json(users);

  }

  verifyJWT = (req: Request, res: Response, next: NextFunction) => {
    let token = req.headers.authorization;
    if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });

    if (token.startsWith('Bearer ')) {
      // Remove Bearer from string
      token = token.slice(7, token.length);
    }


    jwt.verify(token, secret, (err: any, decoded: any) => {
      console.log(err);
      if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });

      (req as any).loggedUserId = decoded.id;
      next();
    });
  }

}