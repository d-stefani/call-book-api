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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchPersonSql = exports.insertVisitSql = exports.insertPersonsSql = exports.loginSql = void 0;
const index_1 = __importDefault(require("./index"));
const executePostsQuery = (sqlStmt, values, errorMsg) => __awaiter(void 0, void 0, void 0, function* () {
    const pool = yield (0, index_1.default)();
    try {
        const [result] = yield pool.promise().query({
            sql: sqlStmt,
            timeout: 5000,
            values: values,
        });
        if (!result || (Array.isArray(result) && result.length === 0)) {
            throw new Error(errorMsg);
        }
        return result;
    }
    catch (error) {
        console.error(errorMsg, error);
        throw error;
    }
});
const loginSql = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield executePostsQuery(`SELECT id, name, email FROM users WHERE email = ? AND password = ?`, [data.email, data.password], 'LOGIN SQL ERROR');
    return result[0];
});
exports.loginSql = loginSql;
const insertPersonsSql = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield executePostsQuery('INSERT INTO persons SET ?', data.data, 'Error inserting person:');
    return result[0].insertId;
});
exports.insertPersonsSql = insertPersonsSql;
const insertVisitSql = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield executePostsQuery('INSERT INTO visits SET ?', data.data, 'Error inserting visit:');
    return result[0].insertId;
});
exports.insertVisitSql = insertVisitSql;
const searchPersonSql = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const searchResult = yield executePostsQuery(`SELECT DISTINCT id, name, address, phone, email, territory, environment, notes, active, dateTime
    FROM persons
    WHERE name LIKE ?
    OR address LIKE ?
    OR territory LIKE ?
    LIMIT 50`, [`%${data.search}%`, `%${data.search}%`, `%${data.search}%`], 'Error searching person:');
    if (!searchResult || searchResult.length === 0) {
        return 0;
    }
    return searchResult[0];
});
exports.searchPersonSql = searchPersonSql;
//# sourceMappingURL=modelsPosts.js.map