function trim(str) {
    return str.replace(/^\s*|\s*$/g, "");
}

function isValidEmail(str) {
    var emailpattern = /^([a-z0-9\'])+([\.a-z0-9_\-\'])*@([a-z0-9])+([\.a-z0-9_\-])*(\.[a-z0-9_\-]+)+$/i;
    return (emailpattern.test(str));
}

function ValidateTextField(strFieldID, strMessage) {
    var objInput = $(strFieldID);
    if ((trim(objInput.value) == "")) {
        alert(strMessage);
        objInput.focus();
        return false;
    }
    return true;
}

function ValidateCheckboxField(strFieldID, strMessage) {
    var objInput = $(strFieldID);
    if (!objInput.checked) {
        alert(strMessage);
        objInput.focus();
        return false;
    }
    return true;
}

function ValidateRadioField(strFieldName, strMessage) {
    //var form = $('frmReg');
    //console.log(form);
    var buttons = document.getElementsByName(strFieldName);
    //console.log(buttons);
    //console.log(buttons.length);
    for (var i = 0; i < buttons.length; i++) {
        //console.log(buttons[i]);
        if (buttons[i].checked)
            return true;
    }
    alert(strMessage);
    buttons[0].focus();
    return false;
}

function ValidateSelect(strFieldID, strMessage) {
    return ValidateSelectField(strFieldID, strMessage);
}

function ValidateSelectField(strFieldID, strMessage) {
    var objInput = $(strFieldID);
    if ((trim(objInput.value) == "")) {
        alert(strMessage);
        objInput.focus();
        return false;
    }
    return true;
}

function ValidateEmailField(strFieldID, strMessage) {
    var objInput = $(strFieldID);
    var strValue = trim(objInput.value);
    if ((strValue != "") && (!isValidEmail(strValue))) {
        alert(strMessage);
        objInput.focus();
        return false;
    }
    return true;
}

