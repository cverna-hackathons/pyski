enum CONVERSION {
  INT = 'int',
  FLT = 'flt'
}

type Conversions = {
  [index in CONVERSION]: (str: string) => number;
}

const conversions: Conversions = {
  int: (str) => parseInt(str),
  flt: (str) => parseFloat(str),
}

export function convert(value: string, type: CONVERSION): string | number {
  if (conversions.hasOwnProperty(type)) {
    return conversions[type](value)
  } else return value
}