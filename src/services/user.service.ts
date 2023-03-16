import User from "../models/user.model";
import { CryptoHelper } from "../helpers/crypto.helper";

const getUserById = async (id) => {
    const user = await User.findById(id);
    return user;
};

const getUserByEmail = async (email) => {
    const user = await User.find({ email });
    return user;
};

const createUser = async ({ name, email, password, confirmPassword }) => {
    if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
    }

    const userExists = await getUserByEmail(email);

    if (userExists.length > 0) {
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

export default {
    getUserById,
    getUserByEmail,
    createUser,
};