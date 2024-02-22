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
exports.updateCallDetails = exports.updateInvite = void 0;
const index_1 = __importDefault(require("./index"));
const executePutQuery = (sqlStmt, values, errorMsg) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield index_1.default
        .query({ sql: sqlStmt, timeout: 500000, values })
        .catch((error) => {
        index_1.default.end();
        console.error(errorMsg, error);
        return error;
    });
    const result = res;
    return result.affectedRows;
});
const updateInvite = (data) => executePutQuery(`UPDATE call_invites SET 
    accepted = ?,
    response_notes = ?,
    invite_notes = ?,
    visit_date = ?,
    visit_time = ?
    WHERE id = ?`, [
    data.accepted,
    data.response_notes,
    data.invite_notes,
    data.visit_date,
    data.visit_time,
    data.id,
], 'Error inserting invite:');
exports.updateInvite = updateInvite;
const updateCallDetails = (data) => executePutQuery(`UPDATE call_details SET 
    invite_id = ?,
    assistant_id = ?,
    notes = ?,
    action_items = ?,
    location_held = ?
    WHERE id = ?`, [
    data.invite_id,
    data.assistant_id,
    data.call_notes,
    data.action_items,
    data.location_held,
    data.call_id,
], 'Error updating call details:');
exports.updateCallDetails = updateCallDetails;
//# sourceMappingURL=modelsPut.js.map