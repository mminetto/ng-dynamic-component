/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { SimpleChange } from '@angular/core';
/**
 * @param {?} val
 * @return {?}
 */
export function createNewChange(val) {
    return new SimpleChange(undefined, val, true);
}
/**
 * @param {?} record
 * @param {?=} isFirstChange
 * @return {?}
 */
export function recordToChange(record, isFirstChange = false) {
    return isFirstChange
        ? createNewChange(record.currentValue)
        : new SimpleChange(record.previousValue, record.currentValue, false);
}
/**
 * @param {?} isFirstChanges
 * @param {?} setter
 * @return {?}
 */
export function setChangeFromRecord(isFirstChanges, setter) {
    return (record) => setter(record, recordToChange(record, isFirstChanges));
}
/**
 * @param {?} isFirstChanges
 * @return {?}
 */
function getChangesRecords(isFirstChanges) {
    return (changes) => setChangeFromRecord(isFirstChanges, (record, change) => changes[record.key] = change);
}
/**
 * @param {?} isFirstChanges
 * @return {?}
 */
function getNewChangesRecords(isFirstChanges) {
    return (changes) => setChangeFromRecord(isFirstChanges, (record, change) => {
        if (!changes[record.key]) {
            changes[record.key] = change;
        }
    });
}
export const /** @type {?} */ defaultOpts = {
    isFirstChanges: false,
    onlyNewChanges: false,
};
/**
 * @param {?=} opts
 * @return {?}
 */
export function changesFromRecord(opts = defaultOpts) {
    return opts.onlyNewChanges
        ? getNewChangesRecords(opts.isFirstChanges)
        : getChangesRecords(opts.isFirstChanges);
}
//# sourceMappingURL=util.js.map