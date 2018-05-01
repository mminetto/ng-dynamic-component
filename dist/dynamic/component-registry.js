/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
export class RegisterService {
    /**
     * @param {?} type
     * @return {?}
     */
    static setType(type) {
        RegisterService.REGISTRY.set(type.name, type);
    }
    /**
     * @param {?} className
     * @return {?}
     */
    static getType(className) {
        return RegisterService.REGISTRY.get(className);
    }
}
RegisterService.REGISTRY = new Map();
function RegisterService_tsickle_Closure_declarations() {
    /** @type {?} */
    RegisterService.REGISTRY;
}
//# sourceMappingURL=component-registry.js.map