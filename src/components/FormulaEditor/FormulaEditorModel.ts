import {StructuredFormula} from "./StructuredFormula";
import {StructuredFormulaCursorPosition} from "./cursor";

class FormulaEditorModel {

    formula: StructuredFormula;
    position: StructuredFormulaCursorPosition;

    constructor(formula: StructuredFormula, position: StructuredFormulaCursorPosition) {
        this.formula = formula;
        this.position = position;
    }
    
    moveLeft(): FormulaEditorModel {
        return this; // TODO
    }
    
    moveRight(): FormulaEditorModel {
        return this; // TODO
    }

    insert(what: StructuredFormula): FormulaEditorModel {
        // TODO respect current position
    }

    deleteLeft(): FormulaEditorModel {
        return this; // TODO
    }

    deleteRight(): FormulaEditorModel {
        return this; // TODO
    }

}
