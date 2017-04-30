/**
 * Class to hold static methods for serialization.
 */
class Serializer {
  static serialize(value: any) : string {
    var t = typeof value;
    return "<" +  t + ": " + value + ">";
  }
}

export {
  Serializer
}