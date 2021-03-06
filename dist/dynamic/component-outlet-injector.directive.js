/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { NgComponentOutlet } from '@angular/common';
import { Directive, Host } from '@angular/core';
export class ComponentOutletInjectorDirective {
    /**
     * @param {?} componentOutlet
     */
    constructor(componentOutlet) {
        this.componentOutlet = componentOutlet;
    }
    /**
     * @return {?}
     */
    get componentRef() {
        return (/** @type {?} */ (this.componentOutlet))._componentRef;
    }
}
ComponentOutletInjectorDirective.decorators = [
    { type: Directive, args: [{
                selector: '[ngComponentOutlet]',
                exportAs: 'ndcComponentOutletInjector',
            },] },
];
/** @nocollapse */
ComponentOutletInjectorDirective.ctorParameters = () => [
    { type: NgComponentOutlet, decorators: [{ type: Host },] },
];
function ComponentOutletInjectorDirective_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    ComponentOutletInjectorDirective.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    ComponentOutletInjectorDirective.ctorParameters;
    /** @type {?} */
    ComponentOutletInjectorDirective.prototype.componentOutlet;
}
//# sourceMappingURL=component-outlet-injector.directive.js.map