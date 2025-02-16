import {FormulaNode} from "./FormulaNode";

/**
 * The result will be interpreted by our own math lib, so we can use # instead of \ for Latex control sequences,
 * and §cursor to insert a cursor.
 */
export function convertStructuredFormulaToLatex(structuredFormula: FormulaNode): string {
    switch (structuredFormula.type) {
        
        case "atom":
            return structuredFormula.content;
        
        case "sequence":
            return structuredFormula.elements.map(convertStructuredFormulaToLatex).join("");
            
        case "sumLike": {
            const bottom = convertStructuredFormulaToLatex(structuredFormula.bottom);
            const top = convertStructuredFormulaToLatex(structuredFormula.top);
            const content = convertStructuredFormulaToLatex(structuredFormula.content);
            return `#sum_{${bottom}^{${top}(${content})`;
        }
        
        case "cursor":
            return "§cursor";

        default:
            return "???";

    }
}
