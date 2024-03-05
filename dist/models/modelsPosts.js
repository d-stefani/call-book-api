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
const executePostsQuery = (sql, values, errorMsg) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield index_1.default.query({ sql, timeout: 5000, values });
        const result = res;
        return result;
        console.log('result', result);
    }
    catch (error) {
        console.error(errorMsg, error);
        throw error;
    }
    finally {
        index_1.default.end();
    }
});
const loginSql = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield executePostsQuery(`SELECT id, name FROM users WHERE email = ? AND password = ?`, [data.email, data.password], 'LOGIN SQL ERROR');
});
exports.loginSql = loginSql;
const insertPersonsSql = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield executePostsQuery('INSERT INTO persons SET ?', data, 'Error inserting person:');
    return result.insertId;
});
exports.insertPersonsSql = insertPersonsSql;
const insertVisitSql = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield executePostsQuery('INSERT INTO visits SET ?', data, 'Error inserting visit:');
    return result.insertId;
});
exports.insertVisitSql = insertVisitSql;
const searchPersonSql = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const searchResult = yield executePostsQuery(`SELECT *, DATE_FORMAT(persons.date, '%Y-%m-%d') AS call_date FROM persons 
    WHERE name LIKE CONCAT('%', ?, '%') 
    OR address LIKE CONCAT('%', ?, '%')
    OR territory LIKE CONCAT('%', ?, '%')`, [data.search, data.search, data.search], 'Error searching person:');
    if (Object.keys(searchResult).length === 0) {
        return false;
    }
    return searchResult;
});
exports.searchPersonSql = searchPersonSql;
//# sourceMappingURL=modelsPosts.js.map