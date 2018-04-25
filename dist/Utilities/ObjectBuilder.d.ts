/**
 * Utility class to help build objects programmatically. Basically this allows me to have source code where constants
 * are keys in objects.
 */
declare class ObjectBuilder {
    o: Object;
    static add(k: any, v: any): ObjectBuilder;
    add(k: any, v: any): ObjectBuilder;
    build(): Object;
}
export { ObjectBuilder };
