import { InjectionToken, Directive, Host, Inject, Injector, Input, KeyValueDiffers, Optional, Renderer2, Component, ComponentFactoryResolver, ReflectiveInjector, ViewContainerRef, SimpleChange, ANALYZE_FOR_ENTRY_COMPONENTS, NgModule } from '@angular/core';
import { NgComponentOutlet, CommonModule } from '@angular/common';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const /** @type {?} */ COMPONENT_INJECTOR = new InjectionToken('ComponentInjector');

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ComponentOutletInjectorDirective {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DynamicAttributesDirective {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class RegisterService {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DynamicComponent {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @param {?} val
 * @return {?}
 */
function createNewChange(val) {
    return new SimpleChange(undefined, val, true);
}
/**
 * @param {?} record
 * @param {?=} isFirstChange
 * @return {?}
 */
function recordToChange(record, isFirstChange = false) {
    return isFirstChange
        ? createNewChange(record.currentValue)
        : new SimpleChange(record.previousValue, record.currentValue, false);
}
/**
 * @param {?} isFirstChanges
 * @param {?} setter
 * @return {?}
 */
function setChangeFromRecord(isFirstChanges, setter) {
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
const /** @type {?} */ defaultOpts = {
    isFirstChanges: false,
    onlyNewChanges: false,
};
/**
 * @param {?=} opts
 * @return {?}
 */
function changesFromRecord(opts = defaultOpts) {
    return opts.onlyNewChanges
        ? getNewChangesRecords(opts.isFirstChanges)
        : getChangesRecords(opts.isFirstChanges);
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const /** @type {?} */ recordToChanges = changesFromRecord({ isFirstChanges: true });
const /** @type {?} */ recordToNewChanges = changesFromRecord({ onlyNewChanges: true });
class DynamicDirective {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DynamicModule {
    /**
     * @param {?} components
     * @param {?=} componentInjector
     * @return {?}
     */
    static withComponents(components, componentInjector = DynamicComponent) {
        components.forEach(x => RegisterService.setType(x));
        return {
            ngModule: DynamicModule,
            providers: [
                {
                    provide: ANALYZE_FOR_ENTRY_COMPONENTS,
                    useValue: components,
                    multi: true,
                },
                { provide: COMPONENT_INJECTOR, useValue: componentInjector },
            ],
        };
    }
}
DynamicModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                declarations: [
                    DynamicComponent,
                    DynamicDirective,
                    ComponentOutletInjectorDirective,
                    DynamicAttributesDirective,
                ],
                exports: [
                    DynamicComponent,
                    DynamicDirective,
                    ComponentOutletInjectorDirective,
                    DynamicAttributesDirective,
                ],
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

export { DynamicModule, DynamicDirective, DynamicComponent, DynamicAttributesDirective, COMPONENT_INJECTOR as ɵa, ComponentOutletInjectorDirective as ɵb };
