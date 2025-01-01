/** Types generated for queries found in "src/self/api/author/respondDeleteUnit.ts" */

/** 'GetUnitSql' parameters type */
export interface IGetUnitSqlParams {
  unitId: number;
}

/** 'GetUnitSql' return type */
export interface IGetUnitSqlResult {
  courseId: number;
  index: number;
}

/** 'GetUnitSql' query type */
export interface IGetUnitSqlQuery {
  params: IGetUnitSqlParams;
  result: IGetUnitSqlResult;
}

/** 'DeleteUnitSql' parameters type */
export interface IDeleteUnitSqlParams {
  unitId: number;
}

/** 'DeleteUnitSql' return type */
export type IDeleteUnitSqlResult = void;

/** 'DeleteUnitSql' query type */
export interface IDeleteUnitSqlQuery {
  params: IDeleteUnitSqlParams;
  result: IDeleteUnitSqlResult;
}

/** 'MoveOtherUnitsSql' parameters type */
export interface IMoveOtherUnitsSqlParams {
  courseId: number;
  index: number;
}

/** 'MoveOtherUnitsSql' return type */
export type IMoveOtherUnitsSqlResult = void;

/** 'MoveOtherUnitsSql' query type */
export interface IMoveOtherUnitsSqlQuery {
  params: IMoveOtherUnitsSqlParams;
  result: IMoveOtherUnitsSqlResult;
}

