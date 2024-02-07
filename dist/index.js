"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
dotenv_1.default.config();
const music_1 = __importDefault(require("./routes/music"));
const dashboard_1 = __importDefault(require("./routes/dashboard"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const port = process.env.PORT || 3000;
(0, db_1.default)();
app.use('/api/music', music_1.default);
app.use('/api/dashboard', dashboard_1.default);
if (process.env.NODE_ENV == "production") {
    app.use(express_1.default.static(path_1.default.join(__dirname, "../client/dist")));
    app.get("/*", (req, res) => {
        res.sendFile(path_1.default.resolve(__dirname, "../client", "dist", "index.html"));
    });
}
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
