import {Log} from '../utils/EndpointsLogger';

export class SearchCondition {
  field: string
  operator: string
  query: string

  constructor(field: string, operator: string, query: string) {
    this.field = field
    this.operator = operator
    this.query = query
  }

  static fromJSON(request: SearchRequest): SearchCondition[] {
    const conditions: SearchCondition[] = []


    for (const condition of request.conditions) {
      // if any of the first two fields are missing, throw an error
      if (!condition.field || !condition.operator) {
        throw new Error(`Invalid search condition ${JSON.stringify(condition)}`)
      }
      /**
       * if the query is missing or too short, ignore it.
       * No error is thrown, in order to be error-tolerant when it comes to providing invalid queries such as blank or space string.
       * Only throw errors at the end after all conditions have been processed.
       */
      if (condition.query && condition.query.trim().length >= 2) {
        conditions.push(new SearchCondition(condition.field, condition.operator, condition.query))
      }
    }

    /**
     * After all conditions have been processed, if there is no valid condition, throw an error.
     */
    if (conditions.length === 0) {
      throw new Error(`No valid search conditions: ${JSON.stringify(request)}`)
    }
    Log('valid search conditions after filtering',  conditions)
    return conditions;


  }
}

export interface SearchRequest {
  conditions: SearchCondition[]
  joinMode?: 'ANY' | 'ALL'
}
