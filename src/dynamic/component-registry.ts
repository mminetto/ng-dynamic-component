
export class RegisterService {

    static REGISTRY = new Map<string, any>();

    public static setType(type: any) {
        RegisterService.REGISTRY.set(type.name, type);
    }

    public static getType(className: string): any {
        return RegisterService.REGISTRY.get(className);
    }
}