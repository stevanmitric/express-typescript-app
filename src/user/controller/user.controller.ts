import { Request, Response } from "express"
import { CreateUserDto } from "../dtos/create-user.dto"
import { UserService } from "../service/user.service";
import { getUserByEmail } from "../../models/user/user.model";

export async function create(req: Request<{}, {}, CreateUserDto>, res: Response) {
    try {

        const { firstName, lastName, email, password } = req.body;

        if (!firstName || !lastName || !email || !password) {
            return res.sendStatus(422);
        }

        const user = await getUserByEmail(req.body.email);

        if (user) return res.sendStatus(409);

        const response = await UserService.register(req.body);

        return res.send(response);
    } catch (error: any) {
        return res.send(error.message);
    }
}

export async function getById(req: Request, res: Response) {
    try {
        const id = req.params.id;
        const user = await UserService.getUserById(id)

        return res.send(user);
    } catch (error: any) {
        return res.send(error.message)
    }
}