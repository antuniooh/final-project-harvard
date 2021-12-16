import { Request, Response } from 'express';

import db from '../database/connection';

interface ScheduleItem {
  week_day: number;
  from: string;
  to: string;
}

export default class UsersController {
  async create(req: Request, res: Response)  {
    const {
      name,
      photo,
      age,
      bio,
      subject,
      cost
    } = req.body;

    console.log(req.body)

    const trx = await db.transaction();

    try {

      const insertedUsersIds = await trx('users').insert({
        name,
        photo,
        age,
        bio,
      });
      console.log(insertedUsersIds)

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

  async index(req: Request, res: Response) {
    const filters = req.query;

    const users = await db('users')
      .whereExists(function() {
        this.select('users.*')
          .from('users')
      });


    console.log(users)
    return res.json(users);

  }

}