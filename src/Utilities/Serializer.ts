/**
 * Class to hold static methods for serialization.
 */
class Serializer {
  static serialize(value: any) : string {
    return "<" +  (typeof value) + ": " + value + ">";
  }
}

export {
  Serializer
}