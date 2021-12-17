import { Request, Response } from 'express';

import db from '../database/connection';

interface ScheduleItem {
  week_day: number;
  from: string;
  to: string;
}

export default class UsersController {
  async create(req: Request, res: Response)  {
    console.log(req.body)
    const {
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
    return res.json(users);

  }

}