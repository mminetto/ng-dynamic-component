/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { ComponentFactoryResolver, Directive, Host, Inject, Injector, Input, KeyValueDiffers, Optional, } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { COMPONENT_INJECTOR } from './component-injector';
import { ComponentOutletInjectorDirective } from './component-outlet-injector.directive';
import { changesFromRecord, createNewChange } from './util';
const /** @type {?} */ recordToChanges = changesFromRecord({ isFirstChanges: true });
const /** @type {?} */ recordToNewChanges = changesFromRecord({ onlyNewChanges: true });
export class DynamicDirective {
    /**
     * @param {?} _differs
     * @param {?} _injector
     * @param {?} _cfr
     * @param {?} _componentInjectorType
     * @param {?} _componentOutletInjector
     */
    constructor(_differs, _injector, _cfr, _componentInjectorType, _componentOutletInjector) {
        this._differs = _differs;
        this._injector = _injector;
        this._cfr = _cfr;
        this._componentInjectorType = _componentInjectorType;
        this._componentOutletInjector = _componentOutletInjector;
        this._componentInjector = this._injector.get(this._componentInjectorType, null);
        this._lastComponentInst = this._componentInjector;
        this._inputsDiffer = this._differs.find({}).create();
        this._compFactory = null;
        this._outputsShouldDisconnect$ = new Subject();
    }
    /**
     * @return {?}
     */
    get _inputs() {
        return this.ndcDynamicInputs || this.ngComponentOutletNdcDynamicInputs;
    }
    /**
     * @return {?}
     */
    get _outputs() {
        return this.ndcDynamicOutputs || this.ngComponentOutletNdcDynamicOutputs;
    }
    /**
     * @return {?}
     */
    get _compInjector() {
        return this._componentOutletInjector || this._componentInjector;
    }
    /**
     * @return {?}
     */
    get _compRef() {
        return this._compInjector.componentRef;
    }
    /**
     * @return {?}
     */
    get _componentInst() {
        return this._compRef.instance;
    }
    /**
     * @return {?}
     */
    get _componentInstChanged() {
        if (this._lastComponentInst !== this._componentInst) {
            this._lastComponentInst = this._componentInst;
            return true;
        }
        else {
            return false;
        }
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        const /** @type {?} */ compChanged = this._componentInstChanged;
        if (compChanged || this._inputsChanged(changes)) {
            const /** @type {?} */ inputsChanges = this._getInputsChanges(this._inputs);
            if (inputsChanges) {
                this._updateInputChanges(inputsChanges);
            }
            this.updateInputs(compChanged || !this._lastInputChanges);
        }
        if (compChanged || this._outputsChanged(changes)) {
            this.bindOutputs();
        }
    }
    /**
     * @return {?}
     */
    ngDoCheck() {
        if (this._componentInstChanged) {
            this.updateInputs(true);
            this.bindOutputs();
            return;
        }
        const /** @type {?} */ inputs = this._inputs;
        if (!inputs) {
            return;
        }
        const /** @type {?} */ inputsChanges = this._getInputsChanges(this._inputs);
        if (inputsChanges) {
            const /** @type {?} */ isNotFirstChange = !!this._lastInputChanges;
            this._updateInputChanges(inputsChanges);
            if (isNotFirstChange) {
                this.updateInputs();
            }
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._disconnectOutputs();
    }
    /**
     * @param {?=} isFirstChange
     * @return {?}
     */
    updateInputs(isFirstChange = false) {
        if (isFirstChange) {
            this._updateCompFactory();
        }
        const /** @type {?} */ compInst = this._componentInst;
        let /** @type {?} */ inputs = this._inputs;
        if (!inputs || !compInst) {
            return;
        }
        inputs = this._resolveInputs(inputs);
        Object
            .keys(inputs)
            .forEach(p => compInst[p] = inputs[p]);
        this.notifyOnInputChanges(this._lastInputChanges, isFirstChange);
    }
    /**
     * @return {?}
     */
    bindOutputs() {
        this._disconnectOutputs();
        const /** @type {?} */ compInst = this._componentInst;
        let /** @type {?} */ outputs = this._outputs;
        if (!outputs || !compInst) {
            return;
        }
        outputs = this._resolveOutputs(outputs);
        Object.keys(outputs)
            .filter(p => compInst[p])
            .forEach(p => compInst[p]
            .pipe(takeUntil(this._outputsShouldDisconnect$))
            .subscribe(outputs[p]));
    }
    /**
     * @param {?=} changes
     * @param {?=} forceFirstChanges
     * @return {?}
     */
    notifyOnInputChanges(changes = {}, forceFirstChanges) {
        // Exit early if component not interested to receive changes
        if (!this._componentInst.ngOnChanges) {
            return;
        }
        if (forceFirstChanges) {
            changes = this._collectFirstChanges();
        }
        this._componentInst.ngOnChanges(changes);
    }
    /**
     * @return {?}
     */
    _disconnectOutputs() {
        this._outputsShouldDisconnect$.next();
    }
    /**
     * @param {?} inputs
     * @return {?}
     */
    _getInputsChanges(inputs) {
        return this._inputsDiffer.diff(this._inputs);
    }
    /**
     * @param {?} differ
     * @return {?}
     */
    _updateInputChanges(differ) {
        this._lastInputChanges = this._collectChangesFromDiffer(differ);
    }
    /**
     * @return {?}
     */
    _collectFirstChanges() {
        const /** @type {?} */ changes = /** @type {?} */ ({});
        const /** @type {?} */ inputs = this._inputs;
        Object.keys(inputs).forEach(prop => changes[prop] = createNewChange(inputs[prop]));
        return this._resolveChanges(changes);
    }
    /**
     * @param {?} differ
     * @return {?}
     */
    _collectChangesFromDiffer(differ) {
        const /** @type {?} */ changes = /** @type {?} */ ({});
        differ.forEachAddedItem(recordToChanges(changes));
        differ.forEachItem(recordToNewChanges(changes));
        return this._resolveChanges(changes);
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    _inputsChanged(changes) {
        return 'ngComponentOutletNdcDynamicInputs' in changes || 'ndcDynamicInputs' in changes;
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    _outputsChanged(changes) {
        return 'ngComponentOutletNdcDynamicOutputs' in changes || 'ndcDynamicOutputs' in changes;
    }
    /**
     * @return {?}
     */
    _resolveCompFactory() {
        try {
            try {
                return this._cfr.resolveComponentFactory(this._compRef.componentType);
            }
            catch (/** @type {?} */ e) {
                // Fallback if componentType does not exist (happens on NgComponentOutlet)
                return this._cfr.resolveComponentFactory(this._compRef.instance.constructor);
            }
        }
        catch (/** @type {?} */ e) {
            // Factory not available - bailout
            return null;
        }
    }
    /**
     * @return {?}
     */
    _updateCompFactory() {
        this._compFactory = this._resolveCompFactory();
    }
    /**
     * @param {?} inputs
     * @return {?}
     */
    _resolveInputs(inputs) {
        if (!this._compFactory) {
            return inputs;
        }
        return this._remapIO(inputs, this._compFactory.inputs);
    }
    /**
     * @param {?} outputs
     * @return {?}
     */
    _resolveOutputs(outputs) {
        if (!this._compFactory) {
            return outputs;
        }
        return this._remapIO(outputs, this._compFactory.outputs);
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    _resolveChanges(changes) {
        if (!this._compFactory) {
            return changes;
        }
        return this._remapIO(changes, this._compFactory.inputs);
    }
    /**
     * @param {?} io
     * @param {?} mapping
     * @return {?}
     */
    _remapIO(io, mapping) {
        const /** @type {?} */ newIO = {};
        Object.keys(io)
            .forEach(key => {
            const /** @type {?} */ newKey = this._findPropByTplInMapping(key, mapping) || key;
            newIO[newKey] = io[key];
        });
        return newIO;
    }
    /**
     * @param {?} tplName
     * @param {?} mapping
     * @return {?}
     */
    _findPropByTplInMapping(tplName, mapping) {
        for (const /** @type {?} */ map of mapping) {
            if (map.templateName === tplName) {
                return map.propName;
            }
        }
        return null;
    }
}
DynamicDirective.decorators = [
    { type: Directive, args: [{
                selector: '[ndcDynamicInputs],[ndcDynamicOutputs],[ngComponentOutletNdcDynamicInputs],[ngComponentOutletNdcDynamicOutputs]'
            },] },
];
/** @nocollapse */
DynamicDirective.ctorParameters = () => [
    { type: KeyValueDiffers, },
    { type: Injector, },
    { type: ComponentFactoryResolver, },
    { type: undefined, decorators: [{ type: Inject, args: [COMPONENT_INJECTOR,] },] },
    { type: ComponentOutletInjectorDirective, decorators: [{ type: Host }, { type: Optional },] },
];
DynamicDirective.propDecorators = {
    "ndcDynamicInputs": [{ type: Input },],
    "ngComponentOutletNdcDynamicInputs": [{ type: Input },],
    "ndcDynamicOutputs": [{ type: Input },],
    "ngComponentOutletNdcDynamicOutputs": [{ type: Input },],
};
function DynamicDirective_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    DynamicDirective.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    DynamicDirective.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    DynamicDirective.propDecorators;
    /** @type {?} */
    DynamicDirective.prototype.ndcDynamicInputs;
    /** @type {?} */
    DynamicDirective.prototype.ngComponentOutletNdcDynamicInputs;
    /** @type {?} */
    DynamicDirective.prototype.ndcDynamicOutputs;
    /** @type {?} */
    DynamicDirective.prototype.ngComponentOutletNdcDynamicOutputs;
    /** @type {?} */
    DynamicDirective.prototype._componentInjector;
    /** @type {?} */
    DynamicDirective.prototype._lastComponentInst;
    /** @type {?} */
    DynamicDirective.prototype._lastInputChanges;
    /** @type {?} */
    DynamicDirective.prototype._inputsDiffer;
    /** @type {?} */
    DynamicDirective.prototype._compFactory;
    /** @type {?} */
    DynamicDirective.prototype._outputsShouldDisconnect$;
    /** @type {?} */
    DynamicDirective.prototype._differs;
    /** @type {?} */
    DynamicDirective.prototype._injector;
    /** @type {?} */
    DynamicDirective.prototype._cfr;
    /** @type {?} */
    DynamicDirective.prototype._componentInjectorType;
    /** @type {?} */
    DynamicDirective.prototype._componentOutletInjector;
}
//# sourceMappingURL=dynamic.directive.js.map