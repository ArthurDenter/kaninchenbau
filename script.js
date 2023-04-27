/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
function myFunction() {
    var x = document.getElementById("myTopNav");

    if (x.className === "nav_bar") {
        x.className += " responsive";
    } else {
        x.className = "nav_bar";
    }
};

// add form elements: label, input, checkbox, button
var i = 0;
function addFormElementsLabelInput(label_for, label_text, input_placeholder, input_name, input_isrequired, parent_node, input_type) {
    
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
        const newLabelForCheckbox = document.createElement("label")
        newLabelForCheckbox.setAttribute("class", "checkbox");
        newFormFieldContainer.appendChild(newLabelForCheckbox);

        const newCheckbox = document.createElement("input");
        newCheckbox.setAttribute("type", "checkbox");
        newCheckbox.setAttribute("name", input_name);
        if (input_isrequired) newCheckbox.setAttribute("required", "");

        newLabelForCheckbox.appendChild(newCheckbox);

        const newSpanForCheckmark = document.createElement("span")
        newSpanForCheckmark.setAttribute("class", "checkmark");

        newLabelForCheckbox.appendChild(newSpanForCheckmark);
    };

    // create inner input field
    if (input_type == "inputfield") {
        const newInputField = document.createElement("input");
        newInputField.setAttribute("type", "text");
        newInputField.setAttribute("placeholder", input_placeholder);
        newInputField.setAttribute("name", input_name);
        if (input_isrequired) newInputField.setAttribute("required", "");

        newFormFieldContainer.appendChild(newInputField);
    };

    // create inner button
    if (input_type == "button") {
        i++;
        const newButton = document.createElement("button");
        newButton.setAttribute("type", "button");
        newButton.setAttribute("id", "plusBtn" + i);
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
        const lastButton = document.getElementById("plusBtn" + (i-1));
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
    addFormElementsLabelInput("firstname", "Vorname", "Vorname", "firstname", true, newFormElement, "inputfield");
    addFormElementsLabelInput("lastname", "Nachname", "Nachname", "lastname", true, newFormElement, "inputfield");
    addFormElementsLabelInput("nextday", "Frühstück", "", "nextday", false, newFormElement, "checkbox");
    addFormElementsLabelInput("recommendation", "Musikwunsch", "Interpret - Songname", "recommendation", false, newFormElement, "inputfield");
    addFormElementsLabelInput("", "", "", "", false, newFormElement, "button");

    //insert before submit button
    const child = document.getElementById("submit_container");
    const element = document.getElementById("register_form");
    element.insertBefore(newFormElement, child);
};

// form submit
const form = document.getElementsByClassName("register_form")
form[0].onsubmit = async (e) => {
    e.preventDefault();
    let response = await fetch('http://127.0.0.1:8081', {
        method: 'POST',
        body: new FormData(form[0])
    });

    let result = await response.text();

    console.log(result);
    alert(result);
};