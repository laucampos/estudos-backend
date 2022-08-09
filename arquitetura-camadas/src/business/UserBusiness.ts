import { UserDatabase } from "../database/UserDatabase";
import { User, USER_ROLES } from "../models/User";
import { Authenticator, ITokenPayload } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";

export class UserBusiness {
    public signup = async (input: any) => {
        const name = input.name;
        const email = input.email;
        const password = input.password;

        if (!name || !email || !password) {
            throw new Error('Missing input');
        }

        if (typeof name !== "string") {
            throw new Error('name must be a string');
        }

        if (typeof email !== "string") {
            throw new Error('Email must be a string');
        }

        if (typeof password !== "string") {
            throw new Error('Password must be a string');
        }

        if (name.length < 3 || name.length > 20) {
            throw new Error('name must be between 3 and 20 characters');
        }

        if (password.length < 6 || password.length > 20) {
            throw new Error('Password must be between 6 and 20 characters');
        }

        if (!email.includes('@') || !email.includes('.com')) {
            throw new Error('Email must be a valid email');
        }

        const idGenerator = new IdGenerator()
        const id = idGenerator.generate();

        const hashManager = new HashManager();
        const hashPassword = await hashManager.hash(password);

        const user = new User(
            id,
            name,
            email,
            hashPassword,
            USER_ROLES.NORMAL
        )

        const userDatabase = new UserDatabase();
        await userDatabase.createUser(user);

        const payload: ITokenPayload = {
            id: user.getId(),
            role: user.getRole()
        }

        const authenticator = new Authenticator()
        const token = authenticator.generateToken(payload)

        const response = {
            message: 'User created successfully',
            token
        }

        return response;
    }

    public login = async (input: any) => {
        const email = input.email
        const password = input.password

        if (!email || !password) {
            throw new Error('Missing input');
        }

        if (typeof email !== "string") {
            throw new Error('Email must be a string');
        }

        if (typeof password !== "string") {
            throw new Error('Password must be a string');
        }

        if (password.length < 6) {
            throw new Error('Password must be at least 6 characters');
        }

        if (!email.includes('@') || !email.includes('.com')) {
            throw new Error('Email must be a valid email');
        }

        const userDatabase = new UserDatabase();
        const userDB = await userDatabase.findByEmail(email);

        if (!userDB) {
            throw new Error('User not found');
        }

        const user = new User(
            userDB.id,
            userDB.name,
            userDB.email,
            userDB.password,
            userDB.role
        )

        const hashManager = new HashManager();
        const isPasswordCorrect = await hashManager.compare(
            password,
            user.getPassword()
        );

        if (!isPasswordCorrect) {
            throw new Error('Invalid password');
        }

        const payload: ITokenPayload = {
            id: user.getId(),
            role: user.getRole()
        }

        const authenticator = new Authenticator()
        const token = authenticator.generateToken(payload)

        const response = {
            message: 'User logged in successfully',
            token
        }

        return response;
    }

    public getUsers = async (input: any) => {
        const token = input.token
        const search = input.search || ''
        const sort = input.sort || 'asc'
        const page = Number(input.page) || 1
        const limit = Number(input.limit) || 10
        const offset = (page - 1) * limit


        if (!token) {
            throw new Error('Missing token');
        }

        const authenticator = new Authenticator()
        const payload = authenticator.getTokenPayload(token)

        if (!payload) {
            throw new Error('Invalid token')
        }

        const userDatabase = new UserDatabase()
        const users = await userDatabase.getUsers(search, sort, limit, offset);

        const response = {
            users
        }

        return response;
    }

    public deleteUser = async (input: any) => {
        const token = input.token
        const idToDelete = input.idToDelete

        if (!token) {
            throw new Error('Missing token')
        }

        const authenticator = new Authenticator()
        const payload = authenticator.getTokenPayload(token)

        if (!payload) {
            throw new Error('Invalid token')
        }

        if (payload.role !== USER_ROLES.ADMIN) {
            throw new Error('You are not authorized to do this action')
        }

        const userDatabase = new UserDatabase()
        const userDB = await userDatabase.findById(idToDelete)

        if (!userDB) {
            throw new Error('User not found')
        }

        const userToDelete = new User(
            userDB.id,
            userDB.name,
            userDB.email,
            userDB.password,
            userDB.role
        )

        await userDatabase.deleteUserById(userToDelete.getId())

        const response = {
            message: 'User deleted successfully'
        }

        return response

    }
}