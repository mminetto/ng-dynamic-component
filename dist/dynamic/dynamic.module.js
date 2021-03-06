/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { CommonModule } from '@angular/common';
import { ANALYZE_FOR_ENTRY_COMPONENTS, NgModule, } from '@angular/core';
import { COMPONENT_INJECTOR } from './component-injector';
import { ComponentOutletInjectorDirective } from './component-outlet-injector.directive';
import { DynamicAttributesDirective } from './dynamic-attributes.directive';
import { DynamicComponent } from './dynamic.component';
import { DynamicDirective } from './dynamic.directive';
import { RegisterService } from './component-registry';
export class DynamicModule {
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
function DynamicModule_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    DynamicModule.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    DynamicModule.ctorParameters;
}
//# sourceMappingURL=dynamic.module.js.map