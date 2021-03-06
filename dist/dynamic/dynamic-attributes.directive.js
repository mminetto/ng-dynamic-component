/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, Host, Inject, Injector, Input, KeyValueDiffers, Optional, Renderer2, } from '@angular/core';
import { COMPONENT_INJECTOR } from './component-injector';
import { ComponentOutletInjectorDirective } from './component-outlet-injector.directive';
/**
 * @record
 */
export function AttributesMap() { }
function AttributesMap_tsickle_Closure_declarations() {
    /* TODO: handle strange member:
    [key: string]: string;
    */
}
/**
 * @record
 */
function AttributeActions() { }
function AttributeActions_tsickle_Closure_declarations() {
    /** @type {?} */
    AttributeActions.prototype.set;
    /** @type {?} */
    AttributeActions.prototype.remove;
}
export class DynamicAttributesDirective {
    /**
     * @param {?} renderer
     * @param {?} differs
     * @param {?} injector
     * @param {?} componentInjectorType
     * @param {?} componentOutletInjector
     */
    constructor(renderer, differs, injector, componentInjectorType, componentOutletInjector) {
        this.renderer = renderer;
        this.differs = differs;
        this.injector = injector;
        this.componentInjectorType = componentInjectorType;
        this.componentOutletInjector = componentOutletInjector;
        this._attrsDiffer = this.differs.find({}).create();
        this._componentInjector = this.injector.get(this.componentInjectorType, null);
    }
    /**
     * @return {?}
     */
    get _attributes() {
        return (this.ndcDynamicAttributes || this.ngComponentOutletNdcDynamicAttributes);
    }
    /**
     * @return {?}
     */
    get _compInjector() {
        return this.componentOutletInjector || this._componentInjector;
    }
    /**
     * @return {?}
     */
    get _nativeElement() {
        return this._compInjector.componentRef.location.nativeElement;
    }
    /**
     * @return {?}
     */
    get _compType() {
        return this._compInjector.componentRef.componentType;
    }
    /**
     * @return {?}
     */
    get _isCompChanged() {
        if (this._lastCompType !== this._compType) {
            this._lastCompType = this._compType;
            return true;
        }
        return false;
    }
    /**
     * @return {?}
     */
    ngDoCheck() {
        const /** @type {?} */ isCompChanged = this._isCompChanged;
        const /** @type {?} */ changes = this._attrsDiffer.diff(this._attributes);
        if (changes) {
            this._lastAttrActions = this._changesToAttrActions(changes);
        }
        if (changes || (isCompChanged && this._lastAttrActions)) {
            this._updateAttributes(this._lastAttrActions);
        }
    }
    /**
     * @param {?} name
     * @param {?} value
     * @param {?=} namespace
     * @return {?}
     */
    setAttribute(name, value, namespace) {
        this.renderer.setAttribute(this._nativeElement, name, value, namespace);
    }
    /**
     * @param {?} name
     * @param {?=} namespace
     * @return {?}
     */
    removeAttribute(name, namespace) {
        this.renderer.removeAttribute(this._nativeElement, name, namespace);
    }
    /**
     * @param {?} actions
     * @return {?}
     */
    _updateAttributes(actions) {
        Object.keys(actions.set).forEach(key => this.setAttribute(key, actions.set[key]));
        actions.remove.forEach(key => this.removeAttribute(key));
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    _changesToAttrActions(changes) {
        const /** @type {?} */ attrActions = {
            set: {},
            remove: [],
        };
        changes.forEachAddedItem(r => (attrActions.set[r.key] = r.currentValue));
        changes.forEachChangedItem(r => (attrActions.set[r.key] = r.currentValue));
        changes.forEachRemovedItem(r => attrActions.remove.push(r.key));
        return attrActions;
    }
}
DynamicAttributesDirective.decorators = [
    { type: Directive, args: [{
                selector: '[ndcDynamicAttributes],[ngComponentOutletNdcDynamicAttributes]',
                exportAs: 'ndcDynamicAttributes',
            },] },
];
/** @nocollapse */
DynamicAttributesDirective.ctorParameters = () => [
    { type: Renderer2, },
    { type: KeyValueDiffers, },
    { type: Injector, },
    { type: undefined, decorators: [{ type: Inject, args: [COMPONENT_INJECTOR,] },] },
    { type: ComponentOutletInjectorDirective, decorators: [{ type: Optional }, { type: Host },] },
];
DynamicAttributesDirective.propDecorators = {
    "ndcDynamicAttributes": [{ type: Input },],
    "ngComponentOutletNdcDynamicAttributes": [{ type: Input },],
};
function DynamicAttributesDirective_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    DynamicAttributesDirective.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    DynamicAttributesDirective.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    DynamicAttributesDirective.propDecorators;
    /** @type {?} */
    DynamicAttributesDirective.prototype.ndcDynamicAttributes;
    /** @type {?} */
    DynamicAttributesDirective.prototype.ngComponentOutletNdcDynamicAttributes;
    /** @type {?} */
    DynamicAttributesDirective.prototype._attrsDiffer;
    /** @type {?} */
    DynamicAttributesDirective.prototype._componentInjector;
    /** @type {?} */
    DynamicAttributesDirective.prototype._lastCompType;
    /** @type {?} */
    DynamicAttributesDirective.prototype._lastAttrActions;
    /** @type {?} */
    DynamicAttributesDirective.prototype.renderer;
    /** @type {?} */
    DynamicAttributesDirective.prototype.differs;
    /** @type {?} */
    DynamicAttributesDirective.prototype.injector;
    /** @type {?} */
    DynamicAttributesDirective.prototype.componentInjectorType;
    /** @type {?} */
    DynamicAttributesDirective.prototype.componentOutletInjector;
}
//# sourceMappingURL=dynamic-attributes.directive.js.map