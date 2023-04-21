import User, { IUser } from "../models/user.model";
import { CryptoHelper } from "../helpers/crypto.helper";

const getUserById = async (id) => {
    const user = await User.findById(id);
    return user;
};

const getUserByEmail = async (email: string): Promise<IUser | null> => {
    try {
        const user = await User.findOne({ email });
        return user;
    } catch (error) {
        throw new Error("Unable to retrieve user for email: " + email);
    }
};

const createUser = async ({ name, email, password, confirmPassword }) => {
    if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
    }

    const userExists = await getUserByEmail(email);

    if (userExists) {
        throw new Error("User already exists");
    }

    if (!name || !email || !password || !confirmPassword) {
        throw new Error("Please fill in all fields");
    }

    if (password.length < 8) {
        throw new Error("Password must be at least 8 characters");
    }

    const hashedPassword = await CryptoHelper.hash(password);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    });

    return user;
};

const loginUser = async ({ email, password }) => {
    const user = await getUserByEmail(email);

    if (!user) {
        throw new Error("User does not exist");
    }

    const hashedPassword = await CryptoHelper.hash(password);

    if (hashedPassword !== user.password) {
        throw new Error("Invalid credentials");
    }

    return user;
};

export default {
    getUserById,
    getUserByEmail,
    createUser,
    loginUser,
};