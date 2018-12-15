/**
 * Returns the hash code for a string. This is a javascript implementation of Java's String.hashcode()
 * ref: https://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
 */
export const getHashCode = (value: string) => {
  let hash = 0
  let i = 0
  let chr
  if (value.length === 0) {
    return hash.toString()
  }

  for (i = 0; i < value.length; i++) {
    chr = value.charCodeAt(i)
    hash = (hash << 5) - hash + chr
    hash |= 0
  }

  return hash.toString()
}
