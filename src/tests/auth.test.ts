import {expect} from "chai";
import request from "supertest";
import {app} from "../index";
import User from "../models/user.model";
import { generateToken } from "src/helpers/jwt.helpers";

describe("POST /api/register", () => {
    before(async () => {
        await User.deleteMany({});
    });

    it("should return 400 BAD REQUEST", async () => {
        const res = await request(app)
            .post("/api/register")
            .send({
                name: "test",
                email: "something@gmail.com",
                password: "123456"
            });
        
        expect(res.status).to.equal(400);
        expect(JSON.stringify(res.body)).to.equal(JSON.stringify({
            "error": true,
            "message": "All fields are required",
            "data": null
        }));
    });

    it("should return 201 CREATED", async () => {
        const res = await request(app)
            .post("/api/register")
            .send({
                "name": "Srinandan",
                "email": "srinandankomanduri@gmail.com",
                "password": "password",
                "confirmPassword": "password"
            });
        
        expect(res.status).to.equal(201);
        expect(JSON.stringify(res.body)).to.equal(JSON.stringify({
            "error": false,
            "message": "User created successfully",
            "data": {
                "email": "srinandankomanduri@gmail.com",
                "token": generateToken({
                    "email": "srinandankomanduri@gmail.com",
                })
            }
        }));
    });

    it("should return 400 User Already Exists", async () => {
        const res = await request(app)
            .post("/api/register")
            .send({
                "name": "Srinandan",
                "email": "srinandankomanduri@gmail.com",
                "password": "password",
                "confirmPassword": "password"
            });
        
        expect(res.status).to.equal(400);
        expect(JSON.stringify(res.body)).to.equal(JSON.stringify({
            "error": true,
            "message": "User already exists",
            "data": null
        }));
    });

    it("should return 400 Passwords don't match", async () => {
        const res = await request(app)
            .post("/api/register")
            .send({
                "name": "Srinandan",
                "email": "srinandankomanduri@gmail.com",
                "password": "password",
                "confirmPassword": "password1"
            });
        
        expect(res.status).to.equal(400);
        expect(JSON.stringify(res.body)).to.equal(JSON.stringify({
            "error": true,
            "message": "Passwords do not match",
            "data": null
        }));
    });
});

describe("POST /api/login", () => {
    it("should return 400 BAD REQUEST", async () => {
        const res = await request(app)
            .post("/api/login")
            .send({
                email: "",
                password: ""
            });
        
        expect(res.status).to.equal(400);
        expect(JSON.stringify(res.body)).to.equal(JSON.stringify({
            "error": true,
            "message": "All fields are required",
            "data": null
        }));
    });

    it("should return 400 Invalid credentials", async () => {
        const res = await request(app)
            .post("/api/login")
            .send({
                email: "srinandan@gmail.com",
                password: "pp"
            });

        expect(res.status).to.equal(400);
        expect(JSON.stringify(res.body)).to.equal(JSON.stringify({
            "error": true,
            "message": "Invalid credentials",
            "data": null
        }));
    });

    it("should return 200 OK", async () => {
        const res = await request(app)
            .post("/api/login")
            .send({
                email: "srinandankomanduri@gmail.com",
                password: "password"
            });

        expect(res.status).to.equal(200);
        expect(JSON.stringify(res.body)).to.equal(JSON.stringify({
            "error": false,
            "message": "User logged in successfully",
            "data": {
                "email": "srinandankomanduri@gmail.com",
                "token": generateToken({
                    "email": "srinandankomanduri@gmail.com"
                })
            }
        }));
    });
});