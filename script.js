/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
function navToggle() {
    var x = document.getElementById("myTopNav");

    if (x.className === "nav_bar") {
        x.className += " responsive";
    } else {
        x.className = "nav_bar";
    }
};

// regex test
function useRegexOnRecommendation(htmlElemID) {
    let regex = /^[A-Za-zäÄöÖüÜß]+\s-\s[A-Za-zäÄöÖüÜß]+$/g;
    let input = htmlElemID.value;
    console.log("value: " + input);
    if (regex.test(input)) htmlElemID.style = "background-color: white"
    else htmlElemID.style = "background-color: pink";
}

function useRegexOnName(htmlElemID) {
    let regex = /^[a-zA-ZäÄöÖüÜß]+$/g;
    let input = htmlElemID.value;
    console.log("value: " + input);
    if (regex.test(input)) htmlElemID.style = "background-color: white"
    else htmlElemID.style = "background-color: pink";
}


// add form elements: label, input, checkbox, button
var buttonCounter = 0;
var inputCounterFn = 0;
var inputCounterLn = 0;
var inputCounterRec = 0;
var checkboxCounter = 0;


function addFormElementsLabelInput(label_for, label_text, input_placeholder, input_name, input_isrequired, parent_node, input_type, regex) {

    // create inner div
    const newFormFieldContainer = document.createElement("div");
    newFormFieldContainer.setAttribute("class", "form_field_container");

    parent_node.appendChild(newFormFieldContainer);

    // create inner label
    const newLabelElement = document.createElement("label");
    newLabelElement.setAttribute("for", label_for);
    newFormFieldContainer.appendChild(newLabelElement);

    // create inner label-text
    const labelElementText = document.createTextNode(label_text);
    newLabelElement.appendChild(labelElementText);

    // create inner checkbox
    if (input_type == "checkbox") {
        checkboxCounter++;
        const newLabelForCheckbox = document.createElement("label")
        newLabelForCheckbox.setAttribute("class", "checkbox");
        newFormFieldContainer.appendChild(newLabelForCheckbox);

        const newCheckbox = document.createElement("input");
        newCheckbox.setAttribute("type", "checkbox");
        newCheckbox.setAttribute("name", input_name);
        newCheckbox.setAttribute("value", "yes");
        newCheckbox.setAttribute("id", "checkBox" + checkboxCounter);
        if (input_isrequired) newCheckbox.setAttribute("required", "");

        newLabelForCheckbox.appendChild(newCheckbox);

        const newHiddenInput = document.createElement("input");
        newHiddenInput.setAttribute("type", "hidden");
        newHiddenInput.setAttribute("name", input_name);
        newHiddenInput.setAttribute("value", "no");
        newHiddenInput.setAttribute("id", "forCheckboxHidden" + checkboxCounter);

        newLabelForCheckbox.appendChild(newHiddenInput);

        const newSpanForCheckmark = document.createElement("span")
        newSpanForCheckmark.setAttribute("class", "checkmark");

        newLabelForCheckbox.appendChild(newSpanForCheckmark);
    };

    // create inner input field
    if (input_type == "text") {
        const newInputField = document.createElement("input");
        newInputField.setAttribute("type", "text");
        newInputField.setAttribute("placeholder", input_placeholder);
        newInputField.setAttribute("pattern", regex);
        newInputField.setAttribute("name", input_name);
        switch (input_name) {
            case "firstname":
                inputCounterFn++;
                newInputField.setAttribute("id", input_name + inputCounterFn);
                newInputField.setAttribute("onkeyup", "useRegexOnName(" + input_name + inputCounterFn + ")");
                break;
            case "lastname":
                inputCounterLn++;
                newInputField.setAttribute("id", input_name + inputCounterLn);
                newInputField.setAttribute("onkeyup", "useRegexOnName(" + input_name + inputCounterLn + ")");
                break;
            case "recommendation":
                inputCounterRec++;
                newInputField.setAttribute("id", input_name + inputCounterRec);
                newInputField.setAttribute("onkeyup", "useRegexOnRecommendation(" + input_name + inputCounterRec + ")");
        };
        // newInputField.setAttribute("onkeyup", "useRegexOnName(" + input_name + ")");
        if (input_isrequired) newInputField.setAttribute("required", "");

        newFormFieldContainer.appendChild(newInputField);
    };

    // create inner button
    if (input_type == "button") {
        buttonCounter++;
        const newButton = document.createElement("button");
        newButton.setAttribute("type", "button");
        newButton.setAttribute("id", "plusBtn" + buttonCounter);
        newButton.setAttribute("onclick", "addFormSet()");

        newFormFieldContainer.appendChild(newButton);

        const newDivForSVG = document.createElement("div");
        newDivForSVG.setAttribute("class", "plusBtnSVG");

        newButton.appendChild(newDivForSVG);

        const newImgForButton = document.createElement("img");
        newImgForButton.setAttribute("src", "/Material/SVG/plus_button.svg");
        newImgForButton.setAttribute("width", "34px");
        newImgForButton.setAttribute("height", "34px");
        newImgForButton.setAttribute("alt", "");

        newDivForSVG.appendChild(newImgForButton);

        //disable last button
        const lastButton = document.getElementById("plusBtn" + (buttonCounter - 1));
        lastButton.style.display = "none";

    }
};

// add another set of form elements
function addFormSet() {
    // create outer div
    const newFormElement = document.createElement("div");
    newFormElement.setAttribute("class", "form_elements");
    newFormElement.setAttribute("id", "form_elements");

    //  create inner div plus elements
    addFormElementsLabelInput("firstname", "Vorname", "Vorname", "firstname", true, newFormElement, "text", "^[a-zA-ZäÄöÖüÜß]+$");
    addFormElementsLabelInput("lastname", "Nachname", "Nachname", "lastname", true, newFormElement, "text", "^[a-zA-ZäÄöÖüÜß]+$");
    addFormElementsLabelInput("nextday", "Frühstück", "", "nextday", false, newFormElement, "checkbox");
    addFormElementsLabelInput("recommendation", "Musikwunsch (Interpret - Titel)", "Interpret - Songname", "recommendation", false, newFormElement, "text", "^[A-Za-zäÄöÖüÜß]+\\s-\\s[A-Za-zäÄöÖüÜß]+$");
    addFormElementsLabelInput("", "", "", "", false, newFormElement, "button");

    //insert before submit button
    const child = document.getElementById("submit_container");
    const element = document.getElementById("register_form");
    element.insertBefore(newFormElement, child);
};

// ---send FormData to server (under construction)---


//collect data from form in formdata object

function getDataFromForm() {
    const form = document.getElementById("register_form");

    for (let i = 0; i <= checkboxCounter; i++) {
        //testen ob checkbox is checked if true => yes if false hidden input => no
        if (document.getElementById("checkBox" + i).checked) {
            document.getElementById('forCheckboxHidden' + i).disabled = true;
        };
    };

    let data = new FormData(form);
    return data;
};


//fetch data to server 

const response = function fetchDataToServer(dataFromForm) {
    return new promise((resolve, reject) => {

        if (dataFromForm) {
            resolve(() => {
                const url = 'http://node.kaninchenbau.online/post';
                //fetch data
                let fetchdata = {
                    method: "POST", // *GET, POST, PUT, DELETE, etc.
                    mode: "no-cors", // no-cors, *cors, same-origin
                    body: dataFromForm,
                    headers: new Headers()
                };
                const response = fetch(url, fetchData).then(console.log(response));
            });

        } else {
            reject(console.log("Verbindung kann nicht hergestellt werden, keine Daten aus der Form."));
        };

    });
};


function dataHandler() {
    try {
        // instruction here
        const newDataFromForm = getDataFromForm();
        console.log(newDataFromForm);
        fetchDataToServer(newDataFromForm);
    }

    catch (error) {
        // error management here
        console.log("Daten senden nicht möglich.");
    }
};


//tell user whats going on with his data: send completed / failed 
