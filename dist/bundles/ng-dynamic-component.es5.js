import { InjectionToken, Directive, Host, Inject, Injector, Input, KeyValueDiffers, Optional, Renderer2, Component, ComponentFactoryResolver, ReflectiveInjector, ViewContainerRef, SimpleChange, ANALYZE_FOR_ENTRY_COMPONENTS, NgModule } from '@angular/core';
import { NgComponentOutlet, CommonModule } from '@angular/common';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var /** @type {?} */ COMPONENT_INJECTOR = new InjectionToken('ComponentInjector');
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var ComponentOutletInjectorDirective = (function () {
    /**
     * @param {?} componentOutlet
     */
    function ComponentOutletInjectorDirective(componentOutlet) {
        this.componentOutlet = componentOutlet;
    }
    Object.defineProperty(ComponentOutletInjectorDirective.prototype, "componentRef", {
        /**
         * @return {?}
         */
        get: function () {
            return ((this.componentOutlet))._componentRef;
        },
        enumerable: true,
        configurable: true
    });
    return ComponentOutletInjectorDirective;
}());
ComponentOutletInjectorDirective.decorators = [
    { type: Directive, args: [{
                selector: '[ngComponentOutlet]',
                exportAs: 'ndcComponentOutletInjector',
            },] },
];
/** @nocollapse */
ComponentOutletInjectorDirective.ctorParameters = function () { return [
    { type: NgComponentOutlet, decorators: [{ type: Host },] },
]; };
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DynamicAttributesDirective = (function () {
    /**
     * @param {?} renderer
     * @param {?} differs
     * @param {?} injector
     * @param {?} componentInjectorType
     * @param {?} componentOutletInjector
     */
    function DynamicAttributesDirective(renderer, differs, injector, componentInjectorType, componentOutletInjector) {
        this.renderer = renderer;
        this.differs = differs;
        this.injector = injector;
        this.componentInjectorType = componentInjectorType;
        this.componentOutletInjector = componentOutletInjector;
        this._attrsDiffer = this.differs.find({}).create();
        this._componentInjector = this.injector.get(this.componentInjectorType, null);
    }
    Object.defineProperty(DynamicAttributesDirective.prototype, "_attributes", {
        /**
         * @return {?}
         */
        get: function () {
            return (this.ndcDynamicAttributes || this.ngComponentOutletNdcDynamicAttributes);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DynamicAttributesDirective.prototype, "_compInjector", {
        /**
         * @return {?}
         */
        get: function () {
            return this.componentOutletInjector || this._componentInjector;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DynamicAttributesDirective.prototype, "_nativeElement", {
        /**
         * @return {?}
         */
        get: function () {
            return this._compInjector.componentRef.location.nativeElement;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DynamicAttributesDirective.prototype, "_compType", {
        /**
         * @return {?}
         */
        get: function () {
            return this._compInjector.componentRef.componentType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DynamicAttributesDirective.prototype, "_isCompChanged", {
        /**
         * @return {?}
         */
        get: function () {
            if (this._lastCompType !== this._compType) {
                this._lastCompType = this._compType;
                return true;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DynamicAttributesDirective.prototype.ngDoCheck = function () {
        var /** @type {?} */ isCompChanged = this._isCompChanged;
        var /** @type {?} */ changes = this._attrsDiffer.diff(this._attributes);
        if (changes) {
            this._lastAttrActions = this._changesToAttrActions(changes);
        }
        if (changes || (isCompChanged && this._lastAttrActions)) {
            this._updateAttributes(this._lastAttrActions);
        }
    };
    /**
     * @param {?} name
     * @param {?} value
     * @param {?=} namespace
     * @return {?}
     */
    DynamicAttributesDirective.prototype.setAttribute = function (name, value, namespace) {
        this.renderer.setAttribute(this._nativeElement, name, value, namespace);
    };
    /**
     * @param {?} name
     * @param {?=} namespace
     * @return {?}
     */
    DynamicAttributesDirective.prototype.removeAttribute = function (name, namespace) {
        this.renderer.removeAttribute(this._nativeElement, name, namespace);
    };
    /**
     * @param {?} actions
     * @return {?}
     */
    DynamicAttributesDirective.prototype._updateAttributes = function (actions) {
        var _this = this;
        Object.keys(actions.set).forEach(function (key) { return _this.setAttribute(key, actions.set[key]); });
        actions.remove.forEach(function (key) { return _this.removeAttribute(key); });
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    DynamicAttributesDirective.prototype._changesToAttrActions = function (changes) {
        var /** @type {?} */ attrActions = {
            set: {},
            remove: [],
        };
        changes.forEachAddedItem(function (r) { return (attrActions.set[r.key] = r.currentValue); });
        changes.forEachChangedItem(function (r) { return (attrActions.set[r.key] = r.currentValue); });
        changes.forEachRemovedItem(function (r) { return attrActions.remove.push(r.key); });
        return attrActions;
    };
    return DynamicAttributesDirective;
}());
DynamicAttributesDirective.decorators = [
    { type: Directive, args: [{
                selector: '[ndcDynamicAttributes],[ngComponentOutletNdcDynamicAttributes]',
                exportAs: 'ndcDynamicAttributes',
            },] },
];
/** @nocollapse */
DynamicAttributesDirective.ctorParameters = function () { return [
    { type: Renderer2, },
    { type: KeyValueDiffers, },
    { type: Injector, },
    { type: undefined, decorators: [{ type: Inject, args: [COMPONENT_INJECTOR,] },] },
    { type: ComponentOutletInjectorDirective, decorators: [{ type: Optional }, { type: Host },] },
]; };
DynamicAttributesDirective.propDecorators = {
    "ndcDynamicAttributes": [{ type: Input },],
    "ngComponentOutletNdcDynamicAttributes": [{ type: Input },],
};
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var RegisterService = (function () {
    function RegisterService() {
    }
    /**
     * @param {?} type
     * @return {?}
     */
    RegisterService.setType = function (type) {
        RegisterService.REGISTRY.set(type.name, type);
    };
    /**
     * @param {?} className
     * @return {?}
     */
    RegisterService.getType = function (className) {
        return RegisterService.REGISTRY.get(className);
    };
    return RegisterService;
}());
RegisterService.REGISTRY = new Map();
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DynamicComponent = (function () {
    /**
     * @param {?} _vcr
     * @param {?} _cfr
     */
    function DynamicComponent(_vcr, _cfr) {
        this._vcr = _vcr;
        this._cfr = _cfr;
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    DynamicComponent.prototype.ngOnChanges = function (changes) {
        if (changes['ndcDynamicComponent'] || changes['ndcDynamicComponentName']) {
            this.createDynamicComponent();
        }
    };
    /**
     * @return {?}
     */
    DynamicComponent.prototype.createDynamicComponent = function () {
        this._vcr.clear();
        this.componentRef = null;
        if (this.ndcDynamicComponentName) {
            this.ndcDynamicComponent = RegisterService.getType(this.ndcDynamicComponentName);
        }
        if (this.ndcDynamicComponent) {
            this.componentRef = this._vcr.createComponent(this._cfr.resolveComponentFactory(this.ndcDynamicComponent), 0, this._resolveInjector(), this.ndcDynamicContent);
        }
    };
    /**
     * @return {?}
     */
    DynamicComponent.prototype._resolveInjector = function () {
        var /** @type {?} */ injector = this.ndcDynamicInjector || this._vcr.parentInjector;
        if (this.ndcDynamicProviders) {
            injector = ReflectiveInjector.resolveAndCreate(this.ndcDynamicProviders, injector);
        }
        return injector;
    };
    return DynamicComponent;
}());
DynamicComponent.decorators = [
    { type: Component, args: [{
                selector: 'ndc-dynamic',
                template: ''
            },] },
];
/** @nocollapse */
DynamicComponent.ctorParameters = function () { return [
    { type: ViewContainerRef, },
    { type: ComponentFactoryResolver, },
]; };
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
function recordToChange(record, isFirstChange) {
    if (isFirstChange === void 0) { isFirstChange = false; }
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
    return function (record) { return setter(record, recordToChange(record, isFirstChanges)); };
}
/**
 * @param {?} isFirstChanges
 * @return {?}
 */
function getChangesRecords(isFirstChanges) {
    return function (changes) { return setChangeFromRecord(isFirstChanges, function (record, change) { return changes[record.key] = change; }); };
}
/**
 * @param {?} isFirstChanges
 * @return {?}
 */
function getNewChangesRecords(isFirstChanges) {
    return function (changes) { return setChangeFromRecord(isFirstChanges, function (record, change) {
        if (!changes[record.key]) {
            changes[record.key] = change;
        }
    }); };
}
var /** @type {?} */ defaultOpts = {
    isFirstChanges: false,
    onlyNewChanges: false,
};
/**
 * @param {?=} opts
 * @return {?}
 */
function changesFromRecord(opts) {
    if (opts === void 0) { opts = defaultOpts; }
    return opts.onlyNewChanges
        ? getNewChangesRecords(opts.isFirstChanges)
        : getChangesRecords(opts.isFirstChanges);
}
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var /** @type {?} */ recordToChanges = changesFromRecord({ isFirstChanges: true });
var /** @type {?} */ recordToNewChanges = changesFromRecord({ onlyNewChanges: true });
var DynamicDirective = (function () {
    /**
     * @param {?} _differs
     * @param {?} _injector
     * @param {?} _cfr
     * @param {?} _componentInjectorType
     * @param {?} _componentOutletInjector
     */
    function DynamicDirective(_differs, _injector, _cfr, _componentInjectorType, _componentOutletInjector) {
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
    Object.defineProperty(DynamicDirective.prototype, "_inputs", {
        /**
         * @return {?}
         */
        get: function () {
            return this.ndcDynamicInputs || this.ngComponentOutletNdcDynamicInputs;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DynamicDirective.prototype, "_outputs", {
        /**
         * @return {?}
         */
        get: function () {
            return this.ndcDynamicOutputs || this.ngComponentOutletNdcDynamicOutputs;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DynamicDirective.prototype, "_compInjector", {
        /**
         * @return {?}
         */
        get: function () {
            return this._componentOutletInjector || this._componentInjector;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DynamicDirective.prototype, "_compRef", {
        /**
         * @return {?}
         */
        get: function () {
            return this._compInjector.componentRef;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DynamicDirective.prototype, "_componentInst", {
        /**
         * @return {?}
         */
        get: function () {
            return this._compRef.instance;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DynamicDirective.prototype, "_componentInstChanged", {
        /**
         * @return {?}
         */
        get: function () {
            if (this._lastComponentInst !== this._componentInst) {
                this._lastComponentInst = this._componentInst;
                return true;
            }
            else {
                return false;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} changes
     * @return {?}
     */
    DynamicDirective.prototype.ngOnChanges = function (changes) {
        var /** @type {?} */ compChanged = this._componentInstChanged;
        if (compChanged || this._inputsChanged(changes)) {
            var /** @type {?} */ inputsChanges = this._getInputsChanges(this._inputs);
            if (inputsChanges) {
                this._updateInputChanges(inputsChanges);
            }
            this.updateInputs(compChanged || !this._lastInputChanges);
        }
        if (compChanged || this._outputsChanged(changes)) {
            this.bindOutputs();
        }
    };
    /**
     * @return {?}
     */
    DynamicDirective.prototype.ngDoCheck = function () {
        if (this._componentInstChanged) {
            this.updateInputs(true);
            this.bindOutputs();
            return;
        }
        var /** @type {?} */ inputs = this._inputs;
        if (!inputs) {
            return;
        }
        var /** @type {?} */ inputsChanges = this._getInputsChanges(this._inputs);
        if (inputsChanges) {
            var /** @type {?} */ isNotFirstChange = !!this._lastInputChanges;
            this._updateInputChanges(inputsChanges);
            if (isNotFirstChange) {
                this.updateInputs();
            }
        }
    };
    /**
     * @return {?}
     */
    DynamicDirective.prototype.ngOnDestroy = function () {
        this._disconnectOutputs();
    };
    /**
     * @param {?=} isFirstChange
     * @return {?}
     */
    DynamicDirective.prototype.updateInputs = function (isFirstChange) {
        if (isFirstChange === void 0) { isFirstChange = false; }
        if (isFirstChange) {
            this._updateCompFactory();
        }
        var /** @type {?} */ compInst = this._componentInst;
        var /** @type {?} */ inputs = this._inputs;
        if (!inputs || !compInst) {
            return;
        }
        inputs = this._resolveInputs(inputs);
        Object
            .keys(inputs)
            .forEach(function (p) { return compInst[p] = inputs[p]; });
        this.notifyOnInputChanges(this._lastInputChanges, isFirstChange);
    };
    /**
     * @return {?}
     */
    DynamicDirective.prototype.bindOutputs = function () {
        var _this = this;
        this._disconnectOutputs();
        var /** @type {?} */ compInst = this._componentInst;
        var /** @type {?} */ outputs = this._outputs;
        if (!outputs || !compInst) {
            return;
        }
        outputs = this._resolveOutputs(outputs);
        Object.keys(outputs)
            .filter(function (p) { return compInst[p]; })
            .forEach(function (p) { return compInst[p]
            .pipe(takeUntil(_this._outputsShouldDisconnect$))
            .subscribe(outputs[p]); });
    };
    /**
     * @param {?=} changes
     * @param {?=} forceFirstChanges
     * @return {?}
     */
    DynamicDirective.prototype.notifyOnInputChanges = function (changes, forceFirstChanges) {
        if (changes === void 0) { changes = {}; }
        // Exit early if component not interested to receive changes
        if (!this._componentInst.ngOnChanges) {
            return;
        }
        if (forceFirstChanges) {
            changes = this._collectFirstChanges();
        }
        this._componentInst.ngOnChanges(changes);
    };
    /**
     * @return {?}
     */
    DynamicDirective.prototype._disconnectOutputs = function () {
        this._outputsShouldDisconnect$.next();
    };
    /**
     * @param {?} inputs
     * @return {?}
     */
    DynamicDirective.prototype._getInputsChanges = function (inputs) {
        return this._inputsDiffer.diff(this._inputs);
    };
    /**
     * @param {?} differ
     * @return {?}
     */
    DynamicDirective.prototype._updateInputChanges = function (differ) {
        this._lastInputChanges = this._collectChangesFromDiffer(differ);
    };
    /**
     * @return {?}
     */
    DynamicDirective.prototype._collectFirstChanges = function () {
        var /** @type {?} */ changes = ({});
        var /** @type {?} */ inputs = this._inputs;
        Object.keys(inputs).forEach(function (prop) { return changes[prop] = createNewChange(inputs[prop]); });
        return this._resolveChanges(changes);
    };
    /**
     * @param {?} differ
     * @return {?}
     */
    DynamicDirective.prototype._collectChangesFromDiffer = function (differ) {
        var /** @type {?} */ changes = ({});
        differ.forEachAddedItem(recordToChanges(changes));
        differ.forEachItem(recordToNewChanges(changes));
        return this._resolveChanges(changes);
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    DynamicDirective.prototype._inputsChanged = function (changes) {
        return 'ngComponentOutletNdcDynamicInputs' in changes || 'ndcDynamicInputs' in changes;
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    DynamicDirective.prototype._outputsChanged = function (changes) {
        return 'ngComponentOutletNdcDynamicOutputs' in changes || 'ndcDynamicOutputs' in changes;
    };
    /**
     * @return {?}
     */
    DynamicDirective.prototype._resolveCompFactory = function () {
        try {
            try {
                return this._cfr.resolveComponentFactory(this._compRef.componentType);
            }
            catch (e) {
                // Fallback if componentType does not exist (happens on NgComponentOutlet)
                return this._cfr.resolveComponentFactory(this._compRef.instance.constructor);
            }
        }
        catch (e) {
            // Factory not available - bailout
            return null;
        }
    };
    /**
     * @return {?}
     */
    DynamicDirective.prototype._updateCompFactory = function () {
        this._compFactory = this._resolveCompFactory();
    };
    /**
     * @param {?} inputs
     * @return {?}
     */
    DynamicDirective.prototype._resolveInputs = function (inputs) {
        if (!this._compFactory) {
            return inputs;
        }
        return this._remapIO(inputs, this._compFactory.inputs);
    };
    /**
     * @param {?} outputs
     * @return {?}
     */
    DynamicDirective.prototype._resolveOutputs = function (outputs) {
        if (!this._compFactory) {
            return outputs;
        }
        return this._remapIO(outputs, this._compFactory.outputs);
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    DynamicDirective.prototype._resolveChanges = function (changes) {
        if (!this._compFactory) {
            return changes;
        }
        return this._remapIO(changes, this._compFactory.inputs);
    };
    /**
     * @param {?} io
     * @param {?} mapping
     * @return {?}
     */
    DynamicDirective.prototype._remapIO = function (io, mapping) {
        var _this = this;
        var /** @type {?} */ newIO = {};
        Object.keys(io)
            .forEach(function (key) {
            var /** @type {?} */ newKey = _this._findPropByTplInMapping(key, mapping) || key;
            newIO[newKey] = io[key];
        });
        return newIO;
    };
    /**
     * @param {?} tplName
     * @param {?} mapping
     * @return {?}
     */
    DynamicDirective.prototype._findPropByTplInMapping = function (tplName, mapping) {
        for (var _i = 0, mapping_1 = mapping; _i < mapping_1.length; _i++) {
            var map = mapping_1[_i];
            if (map.templateName === tplName) {
                return map.propName;
            }
        }
        return null;
    };
    return DynamicDirective;
}());
DynamicDirective.decorators = [
    { type: Directive, args: [{
                selector: '[ndcDynamicInputs],[ndcDynamicOutputs],[ngComponentOutletNdcDynamicInputs],[ngComponentOutletNdcDynamicOutputs]'
            },] },
];
/** @nocollapse */
DynamicDirective.ctorParameters = function () { return [
    { type: KeyValueDiffers, },
    { type: Injector, },
    { type: ComponentFactoryResolver, },
    { type: undefined, decorators: [{ type: Inject, args: [COMPONENT_INJECTOR,] },] },
    { type: ComponentOutletInjectorDirective, decorators: [{ type: Host }, { type: Optional },] },
]; };
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
var DynamicModule = (function () {
    function DynamicModule() {
    }
    /**
     * @param {?} components
     * @param {?=} componentInjector
     * @return {?}
     */
    DynamicModule.withComponents = function (components, componentInjector) {
        if (componentInjector === void 0) { componentInjector = DynamicComponent; }
        components.forEach(function (x) { return RegisterService.setType(x); });
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
    };
    return DynamicModule;
}());
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
