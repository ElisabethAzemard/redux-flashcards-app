import { SUBMIT_FORM, RESET_FORM, FILL_FORM, COMPLETE_FORM } from '../actions/actions';

const initialForm = {
    question: '',
    answer: '',
    allFieldsFilled: false,
    submitted: false,
    message: '',
    addButtonDisabled: true
};

function setFormState(form = initialForm, action) {
    switch (action.type) {
        case SUBMIT_FORM:
            return {
                ...form,
                submitted: true,
                message: "Card successfully created!",
            };

        case RESET_FORM:
            return initialForm;

        case FILL_FORM:
            return {
                ...form,
                question: action.question,
                answer: action.answer,
            };

        case COMPLETE_FORM:
            return {
                ...form,
                question: action.question,
                answer: action.answer,
                allFieldsFilled: true,
                addButtonDisabled: false
            };

        default:
            return form;
    };
}

export default setFormState;
