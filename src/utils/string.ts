/* tslint:disable:no-empty-character-class */

// This code was copied from https://www.npmjs.com/package/decamelize/v/6.0.0 to fix ERR_REQUIRE_ESM
// That was caused by decamelize when this package was used in a project
const handlePreserveConsecutiveUppercase = (decamelized: string, separator: string) => {
  // Lowercase all single uppercase characters. As we
  // want to preserve uppercase sequences, we cannot
  // simply lowercase the separated string at the end.
  // `data_For_USACounties` → `data_for_USACounties`
  const result = decamelized.replace(
    /((?<![\p{Uppercase_Letter}\d])[\p{Uppercase_Letter}\d](?![\p{Uppercase_Letter}\d]))/gu,
    $0 => $0.toLowerCase()
  );

  // Remaining uppercase sequences will be separated from lowercase sequences.
  // `data_For_USACounties` → `data_for_USA_counties`
  return result.replace(
    /(\p{Uppercase_Letter}+)(\p{Uppercase_Letter}\p{Lowercase_Letter}+)/gu,
    (_, $1, $2) => $1 + separator + $2.toLowerCase()
  );
};

export function decamelize(text, { separator = '_', preserveConsecutiveUppercase = false } = {}) {
  if (!(typeof text === 'string' && typeof separator === 'string')) {
    throw new TypeError('The `text` and `separator` arguments should be of type `string`');
  }

  // Checking the second character is done later on. Therefore process shorter strings here.
  if (text.length < 2) {
    return preserveConsecutiveUppercase ? text : text.toLowerCase();
  }

  const replacement = `$1${separator}$2`;

  // Split lowercase sequences followed by uppercase character.
  // `dataForUSACounties` → `data_For_USACounties`
  // `myURLstring → `my_URLstring`
  const decamelized = text.replace(/([\p{Lowercase_Letter}\d])(\p{Uppercase_Letter})/gu, replacement);

  if (preserveConsecutiveUppercase) {
    return handlePreserveConsecutiveUppercase(decamelized, separator);
  }

  // Split multiple uppercase characters followed by one or more lowercase characters.
  // `my_URLstring` → `my_ur_lstring`
  return decamelized
    .replace(/(\p{Uppercase_Letter})(\p{Uppercase_Letter}\p{Lowercase_Letter}+)/gu, replacement)
    .toLowerCase();
}

export function humanizeString(value: string) {
  let localValue = value;

  if (typeof localValue !== 'string') {
    throw new TypeError('Expected a string');
  }

  localValue = decamelize(localValue);
  localValue = localValue
    .toLowerCase()
    .replace(/[_-]+/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim();
  localValue = localValue.charAt(0).toUpperCase() + localValue.slice(1);

  return localValue;
}

export function isNumeric(value: string) {
  if (typeof value !== 'string') return false; // we only process strings!

  return (
    !isNaN(value as any) && !isNaN(parseFloat(value)) // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
  ); // ...and ensure strings of whitespace fail
}
