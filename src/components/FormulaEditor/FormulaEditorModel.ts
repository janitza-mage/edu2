import {FormulaNode} from "./FormulaNode";
import {StructuredFormulaCursorPosition} from "./cursor";

class FormulaEditorModel {

    formula: FormulaNode;
    position: StructuredFormulaCursorPosition;

    constructor(formula: FormulaNode, position: StructuredFormulaCursorPosition) {
        this.formula = formula;
        this.position = position;
    }
    
    moveLeft(): FormulaEditorModel {
        return this; // TODO
    }
    
    moveRight(): FormulaEditorModel {
        return this; // TODO
    }

    insert(what: FormulaNode): FormulaEditorModel {
        // TODO respect current position
    }

    deleteLeft(): FormulaEditorModel {
        return this; // TODO
    }

    deleteRight(): FormulaEditorModel {
        return this; // TODO
    }

}
