const conversions = {
  int: parseInt,
  flt: parseFloat,
}

export const convert = function(value: String, type: String) {
  let converted = value

  if (typeof conversions[type] === 'function')
    converted = conversions[type](value)

  return converted
}