const conversions = {
  int: (str: string): number => parseInt(str),
  flt: (str: string): number => parseFloat(str),
}

export const convert = function(value: string, type: string): any {
  if (conversions.hasOwnProperty(type)) {
    return conversions[type](value)
  } else return value
}