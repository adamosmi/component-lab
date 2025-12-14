const getMultiSelectFormData = async () => {
    const form = document.querySelector('[data-js-type=multiselect-form]') as HTMLFormElement;
    if (form === null) {
        throw new Error('currentTarget missing');
    }
    const formData = new FormData(form);
    const payload = {'multi-select': formData.getAll('multi-select')}
    const response = await fetch('/api/multiselect-submit', {method: 'POST', body: JSON.stringify(payload), headers: {'Content-Type': 'application/json'}});
    console.log(await response.json());
}

const handleMultiSelectOption = async (event: MouseEvent) => {
    console.log('handleMultiSelectOption');
    const clickedElement = event.target as HTMLElement;
    if (clickedElement === null) {
        throw new Error('currentTarget missing');
    }
    if (!clickedElement.dataset) {
        throw new Error('Missing property: dataset');
    }
    const parent = clickedElement.parentElement;
    if (parent === null) {
        throw new Error('Missing parent');
    }
    const grandParent = parent.parentElement;
    if (grandParent === null) {
        throw new Error('Missing parent');
    }
    const multiSelectForm = grandParent.querySelector('[data-js-type=multiselect-form]');
    if (multiSelectForm === null) {
        throw new Error('Missing: [data-js-type=multiselect-form]');
    }
    const multiSelectFormOptions = multiSelectForm.querySelectorAll('option') as NodeListOf<HTMLOptionElement>;
    if (multiSelectFormOptions.length === 0) {
        throw new Error('Missing: option');
    }
    if (clickedElement.dataset.js === 'unselected') {
        clickedElement.dataset.js = 'selected'
        if (!clickedElement.dataset.jsValue) {
            throw new Error('Missing property: dataset.jsValue');
        }
        multiSelectFormOptions.forEach(option => {
            if (option.value === clickedElement.dataset.jsValue) {
                console.log(clickedElement.dataset.jsValue);
                option.selected = true;
            }
        })
    } else if (clickedElement.dataset.js === 'selected') {
        clickedElement.dataset.js = 'unselected'
        if (!clickedElement.dataset.jsValue) {
            throw new Error('Missing property: dataset.jsValue');
        }
        multiSelectFormOptions.forEach(option => {
            if (option.value === clickedElement.dataset.jsValue) {
                console.log(clickedElement.dataset.jsValue);
                option.selected = false;
            }
        })
    } else {
        throw new Error(`Unexpected value: ${clickedElement.dataset.js}`);
    }
    await getMultiSelectFormData()
}

const handleMultiSelectDropdown = (event: MouseEvent) => {
    console.log('handleMultiSelectDropdown');
    const clickedElement = event.target as HTMLElement;
    if (clickedElement === null) {
        throw new Error('currentTarget missing');
    }
    if (!clickedElement.dataset) {
        throw new Error('Missing property: dataset');
    }
    const parent = clickedElement.parentElement;
    if (parent === null) {
        throw new Error('Missing parent');
    }
    const multiSelectOptionContainer = parent.querySelector('[data-js-type=multiselect-option-container]');
    if (multiSelectOptionContainer === null) {
        throw new Error('Missing: [data-js-type=multiselect-option-container]');
    }
    multiSelectOptionContainer.classList.toggle('hidden');
}

const handleMultiSelect = async (event: MouseEvent) => {
    const clickedElement = event.target as HTMLElement;
    if (clickedElement === null) {
        throw new Error('currentTarget missing');
    }
    if (!clickedElement.dataset) {
        throw new Error('Missing property: dataset');
    }
    if (clickedElement.dataset.jsType === 'multiselect-dropdown') {
        handleMultiSelectDropdown(event);
    } else if (clickedElement.dataset.jsType === 'multiselect-option') {
        await handleMultiSelectOption(event);
    } else {
        console.log(clickedElement.dataset);
    }
}

const initializeMultiSelect = () => {
    const multiSelects = document.querySelectorAll('[data-js-type=multiselect]') as NodeListOf<HTMLElement>;
    if (multiSelects.length === 0) {
        throw new Error('Missing: [data-js-type=multiselect]');
    }
    multiSelects.forEach(multiSelect => {
        multiSelect.addEventListener('click', async (event: MouseEvent) => {
            await handleMultiSelect(event);
        })
    })
}

const initialize = () => {
    initializeMultiSelect();
}

document.addEventListener('DOMContentLoaded', initialize);
