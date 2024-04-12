import { Types } from "mongoose";

export interface UserResponseDTO {
    _id: Types.ObjectId;
    firstName: string;
    lastName: string;
    email: string;
}