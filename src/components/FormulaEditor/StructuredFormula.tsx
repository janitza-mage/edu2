export type StructuredFomulaType = "atom" | "sequence" | "sumLike" | "cursor";

export interface StructuredFormulaBase {
    type: StructuredFomulaType;
}

export interface StructuredFormulaAtom extends StructuredFormulaBase {
    type: "atom";
    content: string;
}

export interface StructuredFormulaSequence extends StructuredFormulaBase {
    type: "sequence";
    elements: StructuredFormula[];
}

export interface StructuredFormulaSumLike extends StructuredFormulaBase {
    type: "sumLike";
    bottom: StructuredFormula;
    top: StructuredFormula;
    content: StructuredFormula;
}

export interface StructuredFormulaCursor extends StructuredFormulaBase {
    type: "cursor";
}

export type StructuredFormula =
    | StructuredFormulaAtom
    | StructuredFormulaSequence
    | StructuredFormulaSumLike
    | StructuredFormulaCursor
    ;
