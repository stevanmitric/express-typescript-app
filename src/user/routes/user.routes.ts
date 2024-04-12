import { Router } from "express";
import { create, getById } from "../controller/user.controller";
import { verifyToken } from "../../middleware/check-token";

export default (router: Router) => {
    /**
     * @swagger
     * /register:
     *   post:
     *     summary: Register a new user
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - username
     *               - password
     *             properties:
     *               username:
     *                 type: string
     *               password:
     *                 type: string
    *     responses:
    *       200:
    *         description: User registered successfully
    *         content:
    *           application/json:
    *             schema:
    *               type: object
    *               properties:
    *                 token:
    *                   type: string
    *                 userId:
    *                   type: string
     */
    router.post('/register', create);

    /**
     * @swagger
     * /user/{id}:
     *   get:
     *     summary: Get user by ID
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: User found
     */
    router.get('/user/:id', verifyToken, getById)
}