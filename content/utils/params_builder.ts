export const paramBuilder = (params: Record<string, any>): Record<string, string> => {
  const result: Record<string, string> = {}
  for (const key in params) {

    /**
       * if the length is zero, then it is an empty array, ignore it.
       */
    if (params[key]?.length === 0) {continue}

    // serialize array to string joined by comma.
    if (Array.isArray(params[key])) {
      result[key] = params[key]
        .map((value: any []) => {
          // check for null and undefined.
          if (value === null) {return 'null'}
          if (value === undefined) {return 'undefined'}
          return value.toString()
        }).join(',')
    }

    else if (params[key] !== null && params[key] !== undefined) { result[key] = params[key].toString() }
    // ignore null and undefined
  }
  return result
}

