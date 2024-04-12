import { Types } from 'mongoose';
import { createUser, getById } from '../../models/user/user.model';
import { CreateUserDto } from "../dtos/create-user.dto";
import { UserResponseDTO } from "../dtos/mongo-user-response.dto";
import * as jwt from 'jsonwebtoken';

export class UserService {
    public static async register(data: CreateUserDto): Promise<{ token: string, userId: Types.ObjectId }> {

        const response: UserResponseDTO = await createUser(data);
        const token = jwt.sign({ userId: response._id }, process.env.JWT_SECRET || '');

        return { token, userId: response._id };
    }

    public static async getUserById(id: string): Promise<UserResponseDTO | null> {
        try {
            return await getById(id);
        } catch (error: any) {
            console.error(`Error fetching user by ID: ${id}`, error);
            return error;
        }
    }
}
