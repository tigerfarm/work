declare class OfflineProductStorage {
    readonly id: string;
    constructor(id: string);
    static create(productPayload: any): OfflineProductStorage;
}
export { OfflineProductStorage };
