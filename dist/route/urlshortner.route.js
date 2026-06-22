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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const nanoid_1 = require("nanoid");
const router = (0, express_1.Router)();
router.post('/url', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { url } = req.body;
    if (!url) {
        console.log("please provide url");
        throw new Error('url not provided');
    }
    try {
        const shortCode = (0, nanoid_1.nanoid)(6);
        const result = yield prisma.url.create({
            data: {
                originalUrl: url,
                shortCode,
            },
        });
        res.json({
            shortCode: result.shortCode,
            shortUrl: `http://localhost:3000/${result.shortCode}`,
        });
    }
    catch (error) {
        console.log("error", error);
        res.status(500).json({
            msg: "server crashed"
        });
    }
}));
router.get("/:code", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code } = req.params;
    const record = yield prisma.url.findUnique({
        where: { shortCode: code },
    });
    if (!record) {
        return res.status(404).json({ message: "Not found" });
    }
    const now = new Date();
    const createdAt = record.createdAt;
    const diffInMinutes = (now.getTime() - createdAt.getTime()) / (1000 * 60);
    if (diffInMinutes > 10) {
        yield prisma.url.update({
            where: { shortCode: code },
            data: { isExpired: true },
        });
        return res.status(410).json({ message: "URL expired" });
    }
    yield prisma.url.update({
        where: { shortCode: code },
        data: {
            clicks: { increment: 1 },
        },
    });
    return res.redirect(record.originalUrl);
}));
exports.default = router;
