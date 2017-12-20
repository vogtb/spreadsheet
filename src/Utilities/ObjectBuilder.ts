/**
 * Utility class to help build objects programmatically. Basically this allows me to have source code where constants
 * are keys in objects.
 */
class ObjectBuilder {
  public o : Object = {};

  public static add(k, v) : ObjectBuilder {
    let m = new ObjectBuilder();
    m.o[k.toString()] = v;
    return m;
  }
  public add(k, v) : ObjectBuilder {
    this.o[k.toString()] = v;
    return this;
  }
  public build() : Object {
    return this.o;
  }
}

export {
  ObjectBuilder
}