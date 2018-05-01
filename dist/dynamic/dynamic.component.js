/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, ComponentFactoryResolver, Injector, Input, ReflectiveInjector, Type, ViewContainerRef } from '@angular/core';
import { RegisterService } from './component-registry';
export class DynamicComponent {
    /**
     * @param {?} _vcr
     * @param {?} _cfr
     */
    constructor(_vcr, _cfr) {
        this._vcr = _vcr;
        this._cfr = _cfr;
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes['ndcDynamicComponent'] || changes['ndcDynamicComponentName']) {
            this.createDynamicComponent();
        }
    }
    /**
     * @return {?}
     */
    createDynamicComponent() {
        this._vcr.clear();
        this.componentRef = null;
        if (this.ndcDynamicComponentName) {
            this.ndcDynamicComponent = RegisterService.getType(this.ndcDynamicComponentName);
        }
        if (this.ndcDynamicComponent) {
            this.componentRef = this._vcr.createComponent(this._cfr.resolveComponentFactory(this.ndcDynamicComponent), 0, this._resolveInjector(), this.ndcDynamicContent);
        }
    }
    /**
     * @return {?}
     */
    _resolveInjector() {
        let /** @type {?} */ injector = this.ndcDynamicInjector || this._vcr.parentInjector;
        if (this.ndcDynamicProviders) {
            injector = ReflectiveInjector.resolveAndCreate(this.ndcDynamicProviders, injector);
        }
        return injector;
    }
}
DynamicComponent.decorators = [
    { type: Component, args: [{
                selector: 'ndc-dynamic',
                template: ''
            },] },
];
/** @nocollapse */
DynamicComponent.ctorParameters = () => [
    { type: ViewContainerRef, },
    { type: ComponentFactoryResolver, },
];
DynamicComponent.propDecorators = {
    "ndcDynamicComponentName": [{ type: Input },],
    "ndcDynamicComponent": [{ type: Input },],
    "ndcDynamicInjector": [{ type: Input },],
    "ndcDynamicProviders": [{ type: Input },],
    "ndcDynamicContent": [{ type: Input },],
};
function DynamicComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    DynamicComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    DynamicComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    DynamicComponent.propDecorators;
    /** @type {?} */
    DynamicComponent.prototype.ndcDynamicComponentName;
    /** @type {?} */
    DynamicComponent.prototype.ndcDynamicComponent;
    /** @type {?} */
    DynamicComponent.prototype.ndcDynamicInjector;
    /** @type {?} */
    DynamicComponent.prototype.ndcDynamicProviders;
    /** @type {?} */
    DynamicComponent.prototype.ndcDynamicContent;
    /** @type {?} */
    DynamicComponent.prototype.componentRef;
    /** @type {?} */
    DynamicComponent.prototype._vcr;
    /** @type {?} */
    DynamicComponent.prototype._cfr;
}
//# sourceMappingURL=dynamic.component.js.map