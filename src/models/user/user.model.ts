import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { CreateUserDto } from '../../user/dtos/create-user.dto';

const userSchema = new mongoose.Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true, select: false }
    },
    {
        timestamps: true
    }
);

userSchema.pre('save', async function (next) {
    if(!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);

    const hash = bcrypt.hashSync(this.password, salt);

    this.password = hash;

    return next();
});

userSchema.methods.comparePassword = async function(userPassword: string) {
    return bcrypt.compare(userPassword, this.password).catch(() => false)
}

const User = mongoose.model('User', userSchema);

export const getById = (id: string) => User.findOne({ _id: id }).select({ firstName: 1, lastName: 1 });

export const getUserByEmail = (email: string) => User.findOne({ email })

export const createUser = (values: CreateUserDto) => new User(values).save()

export default User;


