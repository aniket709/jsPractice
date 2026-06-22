"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const urlshortner_route_1 = __importDefault(require("./route/urlshortner.route"));
const urlshortner_route_2 = __importDefault(require("./route/urlshortner.route"));
const express_rate_limit_1 = require("express-rate-limit");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
const limiter = (0, express_rate_limit_1.rateLimit)({
    windowMs: 15 * 60 * 1000,
    limit: 10,
    message: "Limit exceeds please try again 15 minutes"
});
app.use("/api/v1", limiter, urlshortner_route_1.default);
app.use("/", limiter, urlshortner_route_2.default);
// app.get("/",(req,res)=>{
//     console.log("server is running ")
//     res.json("hi from the server");
// })
const port = process.env.PORT || 3000;
app.get("/", limiter, ((req, res) => {
    res.json({
        msg: "hi checking rate"
    });
}));
app.listen(port, () => {
    console.log(`Server is running on the port ${port}`);
});
