import { Request, Response } from 'express';
import { UserBusiness } from '../business/UserBusiness';

export class UserController {
    public signup = async (req: Request, res: Response) => {
        try {
            const userBusiness = new UserBusiness();
            const response = await userBusiness.signup({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            })

            res.status(201).send(response);
        } catch (error) {
            res.status(400).send({ error: error.message });
        }
    }

    public login = async (req: Request, res: Response) => {
        try {
            const userBusiness = new UserBusiness();
            const response = await userBusiness.login({
                email: req.body.email,
                password: req.body.password
            })

            res.status(200).send(response);
        } catch (error) {
            res.status(400).send({ error: error.message });
        }
    }

    public getUsers = async (req: Request, res: Response) => {
        try {
            const userBusiness = new UserBusiness();
            const response = await userBusiness.getUsers({
                token: req.headers.authorization,
                search: req.query.search,
                sort: req.query.sort,
                order: req.query.order,
                page: req.query.page,
                limit: req.query.limit            
            });

            res.status(200).send(response);
        } catch (error) {
            res.status(400).send({ error: error.message });
        }
    }

    public deleteUser = async (req: Request, res: Response) => {
        try {
            const userBusiness = new UserBusiness();
            const response = await userBusiness.deleteUser({
                token: req.headers.authorization,
                idToDelete: req.params.id
            })

            res.status(200).send(response);
        } catch (error) {
            res.status(400).send({ error: error.message });
        }
    }

}