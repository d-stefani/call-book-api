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
exports.updateVisitSql = exports.updateActivePersonSql = exports.updatePersonSql = void 0;
const index_1 = __importDefault(require("./index"));
const executePutQuery = (sqlStmt, values, errorMsg) => __awaiter(void 0, void 0, void 0, function* () {
    const pool = yield (0, index_1.default)();
    try {
        const [result] = yield pool.promise().query(sqlStmt, values);
        return result.affectedRows;
    }
    catch (error) {
        console.error(errorMsg, error);
        throw error;
    }
});
const updatePersonSql = (data) => executePutQuery(`UPDATE persons
    SET
      name = ?,
      address = ?,
      phone = ?,
      email = ?,
      territory = ?,
      environment = ?,
      notes = ?,
      active = ?
    WHERE id = ?`, [
    data.name,
    data.address,
    data.phone,
    data.email,
    data.territory,
    data.environment,
    data.notes,
    data.active,
    data.id,
], 'Error updating Person:');
exports.updatePersonSql = updatePersonSql;
const updateActivePersonSql = (data) => executePutQuery(`UPDATE persons
    SET
      active = ?
    WHERE id = ?`, [data.active, data.id], 'Error deactivating Person:');
exports.updateActivePersonSql = updateActivePersonSql;
const updateVisitSql = (data) => executePutQuery(`UPDATE visits
    SET
      person_id = ?,
      dateTime = ?,
      placement = ?,
      visit_type = ?,
      visit_notes = ?,
      created = ?
    WHERE id = ?`, [
    data.person_id,
    data.dateTime,
    data.placement,
    data.visit_type,
    data.visit_notes,
    data.created,
    data.id,
], 'Error updating Visit:');
exports.updateVisitSql = updateVisitSql;
//# sourceMappingURL=modelsPuts.js.map