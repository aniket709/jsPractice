"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const urlshortner_route_1 = __importDefault(require("./route/urlshortner.route"));
const urlshortner_route_2 = __importDefault(require("./route/urlshortner.route"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api/v1", urlshortner_route_1.default);
app.use("/", urlshortner_route_2.default);
// app.get("/",(req,res)=>{
//     console.log("server is running ")
//     res.json("hi from the server");
// })
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on the port ${port}`);
});
