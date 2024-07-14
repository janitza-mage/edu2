/** Types generated for queries found in "src/self/api/author/respondCreateUnitAfter.ts" */
export type Json = null | boolean | number | string | Json[] | { [key: string]: Json };

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

/** 'CreateUnitSql' parameters type */
export interface ICreateUnitSqlParams {
  courseId: number;
  description: string;
  exerciseDefinition: Json;
  exerciseScript: string;
  contentUrl?: string | null | void;
  index: number;
  title: string;
}

/** 'CreateUnitSql' return type */
export interface ICreateUnitSqlResult {
  id: number;
}

/** 'CreateUnitSql' query type */
export interface ICreateUnitSqlQuery {
  params: ICreateUnitSqlParams;
  result: ICreateUnitSqlResult;
}

