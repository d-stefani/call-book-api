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
exports.getVisitSql = exports.listPersonVisits = exports.getPerson = exports.listActivePersons = void 0;
const index_1 = __importDefault(require("./index"));
const executeGetsQuery = (sqlStmt, values) => __awaiter(void 0, void 0, void 0, function* () {
    const pool = yield (0, index_1.default)();
    try {
        const [result] = yield pool.promise().query(sqlStmt, values);
        return result;
    }
    catch (error) {
        console.error('Query execution error:', error);
        throw error;
    }
});
const listActivePersons = (id, page = 1, limit = 50) => __awaiter(void 0, void 0, void 0, function* () {
    return executeGetsQuery(`SELECT id, name, address, phone, email, territory, environment, notes, active, dateTime 
    FROM persons 
    WHERE persons.user_id = ?
    AND persons.active = 1
    ORDER BY dateTime ASC
    LIMIT ? OFFSET ?`, [id, limit, (page - 1) * limit]);
});
exports.listActivePersons = listActivePersons;
const getPerson = (person_id) => __awaiter(void 0, void 0, void 0, function* () {
    return executeGetsQuery(`SELECT id, name, address, phone, email, territory, environment, notes, active, dateTime
    FROM persons 
    WHERE persons.id = ?`, [person_id]);
});
exports.getPerson = getPerson;
const listPersonVisits = (person_id) => __awaiter(void 0, void 0, void 0, function* () {
    return executeGetsQuery(`SELECT id, person_id, dateTime, placement, visit_type, visit_notes, created
    FROM visits 
    WHERE person_id = ? 
    ORDER BY dateTime DESC`, [person_id]);
});
exports.listPersonVisits = listPersonVisits;
const getVisitSql = (visit_id) => __awaiter(void 0, void 0, void 0, function* () {
    return executeGetsQuery(`SELECT id, person_id, dateTime, placement, visit_type, visit_notes, created
    FROM visits 
    WHERE id = ? 
    ORDER BY dateTime ASC`, [visit_id]);
});
exports.getVisitSql = getVisitSql;
//# sourceMappingURL=modelsGets.js.map