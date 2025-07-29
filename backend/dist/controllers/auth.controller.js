"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logOutUser = exports.logInUser = exports.registerUser = void 0;
const client_1 = require("@prisma/client");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const client = new client_1.PrismaClient();
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        const { firstName, lastName, userName, emailAddress, profileImage, passWord, } = req.body;
        if (!firstName || !lastName || !userName || !emailAddress || !passWord) {
            return res
                .status(400)
                .json({ message: "All required fields must be filled." });
        }
        const hashedPassword = yield bcryptjs_1.default.hash(passWord, 10);
        console.log(hashedPassword);
        const profileInitials = `${firstName[0]} ${lastName[0]}`.toUpperCase();
        const finalProfileImage = profileImage || profileInitials;
        yield client.user.create({
            data: {
                firstName,
                lastName,
                emailAddress,
                userName,
                profileImage: finalProfileImage,
                passWord: hashedPassword,
            },
        });
        res.status(201).json({ message: "User Created Successfully" });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.registerUser = registerUser;
const logInUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { identifier, passWord } = req.body;
        console.log("successful");
        if (!identifier || !passWord) {
            return res
                .status(400)
                .json({ message: "Please enter your email or username" });
        }
        const user = yield client.user.findFirst({
            where: {
                OR: [{ userName: identifier }, { emailAddress: identifier }],
            },
        });
        if (!user) {
            return res.status(400).json({ message: "Wrong Credentials" });
        }
        const matchPassword = yield bcryptjs_1.default.compare(passWord, user.passWord);
        if (!matchPassword) {
            return res.status(400).json({ message: " Wrong Credentials" });
        }
        const { passWord: userPassword, datejoined, updatedAt } = user, userDetails = __rest(user, ["passWord", "datejoined", "updatedAt"]);
        const payload = {
            id: user.id,
            userName: user.userName,
            email: user.emailAddress,
            profileImage: user.profileImage,
            firstName: user.firstName,
            lastName: user.lastName,
        };
        const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "2h",
        });
        return res
            .status(201)
            .json({ message: "Login Successful", token, userDetails: payload });
    }
    catch (e) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.logInUser = logInUser;
const logOutUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(`Logged out successfully`);
        return res.status(200).json({ message: "Logged out successfully" });
    }
    catch (e) {
        console.log("Error logging out", e);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.logOutUser = logOutUser;
