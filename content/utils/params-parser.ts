export const paramsParser = (params: Record<string, any>): Record<string, boolean | number | null | string[] > => {
  const result: Record<string, boolean | number | null | string[] > = {}
  // eslint-disable-next-line guard-for-in
  for (const key in params) {
    // deserialize string joined by comma.
    if (typeof params[key] === 'string') {
      if (params[key]
      /**
           * Trim and replace quotes
           */
        .replace(/^"(.*)"$/, '$1')
        .length === 0) {
        continue
      }
      const values = params[key].split(',')
      if (values?.length > 1) {
        result[key] = values
        // parse values in the array to boolean, number or null if possible.
          .map((value: string) => {
            const lowerCaseValue = value.toLowerCase()
            // check for string 0 and 1.
            if (lowerCaseValue === 'true') {return true}
            if (lowerCaseValue === 'false') {return false}
            if (lowerCaseValue === 'null') {return null}
            if (lowerCaseValue === 'undefined') {return undefined}
            if (isNaN(Number(value))) {return value}
            return Number(value)
          })
      }
      else {
        result[key] = values
      }
    }
    // after deserialization, convert string to boolean if applicable.
    if (params[key].toLocaleString() === 'true') {result[key] = true}
    else if (params[key].toLocaleString() === 'false') {result[key] = false}
    // after boolean conversion, convert string to number if applicable.
    if (typeof params[key] === 'string') {
      const numberValue = Number(params[key])
      if (!isNaN(numberValue)) {result[key] = numberValue}
    }

    // after number conversion, convert string to null if applicable.
    if (typeof params[key] === 'string') {
      if (params[key].toLocaleString() === 'null') {result[key] = null}
    }
  }
  return result
}
