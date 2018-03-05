var globAnswers = [];
var totalQuestions;

window.onload = function(){
    //Get submit button
    formElement=document.getElementById('htmlForm');
    formElement.onsubmit=function(){
        answersChecker();
    }

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
        questionHandler(this);
        }
    };
    xhttp.open("GET", "https://cdn.rawgit.com/simonjr90/asd/197b20ea/xml/XML.xml", true); 
    xhttp.send();
}

//checkText
function checkText(form, count){
    var actAnswer = form.elements[count*2+1];
    var result = false;
    if (actAnswer.value == "Default value") {
        return count;
    } else if(actAnswer.value == globAnswers[count][0].innerHTML) {
        result = true;
    }
    return result;
}

//checkSelect
function checkSelect(form, count) {
    var actAnswer = form.elements[count*2+1];
    var result = false;
    if (actAnswer.value == "Default") {
        return count;
    } else if(actAnswer.value == globAnswers[count][0].innerHTML) {
        result = true;
    }
    return result;
}

//checkMultiple
function checkMultiple(form, count) {
    var actAnswers = document.getElementById("htmlForm").elements[count*2+1].getElementsByTagName("option");
    var expectedAnswers = globAnswers[count];
    var optCount = actAnswers.length;
    var result = false;
    var selAnswers = 0;
    var aasas = expectedAnswers[0].innerHTML;
    for (var i=0; i<optCount; i++){
        actAnswer = actAnswers[i];
        auxFlag = false;
        if (actAnswer.selected == true) {
            if (actAnswer.innerHTML == "Default value") {
                return count;
            }
            selAnswers += 1;
            for (var j=0; j<expectedAnswers.length; j++) {
                if (actAnswer.value == expectedAnswers[j].innerHTML) {
                    var auxFlag = true;
                    break;
                }
            }
            if (auxFlag == false) {
                return auxFlag;
            }
        }
    }
    if (selAnswers != expectedAnswers.length) {
        return false; 
    } else {
	return true;
    }
}

//checkCheckbox
function checkCheckbox(formElement, count) {
    var actAnswers = document.getElementsByClassName("check_" + count);
    var expectedAnswers = globAnswers[count];
    var optCount = actAnswers.length;
    var selAnswers = 0;
    for (var i=0; i<optCount; i++){
        actAnswer = actAnswers[i];
        auxFlag = false;
        if (actAnswer.checked == true) {
            selAnswers += 1;
            for (var j=0; j<expectedAnswers.length; j++) {
                if (actAnswer.id == expectedAnswers[j].innerHTML) {
                    var auxFlag = true;
                    break;
                }
            }
            if (auxFlag == false) {
                return auxFlag;
            }
        }
    }
    if (selAnswers != expectedAnswers.length) {
        return false; 
    } else {
	return true;
    }
}

//checkRadio(formElement, i);
function checkRadio(formElement, count) {
    var actAnswers = document.getElementsByClassName("radio_" + count);
    var expectedAnswers = globAnswers[count];
    var optCount = actAnswers.length;
    var selAnswers = 0;
    for (var i=0; i<optCount; i++){
        actAnswer = actAnswers[i];
        auxFlag = false;
        if (actAnswer.checked == true) {
            selAnswers += 1;
            if (actAnswer.id == expectedAnswers[0].innerHTML) {
                continue;
            } else {
                return auxFlag;
            }
        }
    }
    if (selAnswers != expectedAnswers.length) {
        return false; 
    } else {
	return true;
    }
}

function answersChecker () {
    var mark = 0;
    var unaswered = [];
    for (var i=0; i<totalQuestions; i++){
        var auxMark = false;
        if (i>=0 && i<2) {
            auxMark = checkText(formElement, i);
            if (auxMark === true) {
                mark += 1;
            } else if (auxMark != false) {
                alert("No respondió todas las preguntas, por favor intente de nuevo.");
                return;
            }
        }else if (i>1 && i<4) {
            auxMark = checkSelect(formElement, i);
            if (auxMark === true) {
                mark += 1;
            } else if (auxMark != false) {
                alert("No respondió todas las preguntas, por favor intente de nuevo.");
                return;
            }
        }else if (i>3 && i<6) {
            auxMark = checkMultiple(formElement, i);
            if (auxMark === true) {
                mark += 1;
            } else if (auxMark != false) {
                alert("No respondió todas las preguntas, por favor intente de nuevo.");
                return;
            }
        }else if (i>5 && i<8) {
            auxMark = checkCheckbox(formElement, i);
            if (auxMark === true) {
                mark += 1;
            } else if (auxMark != false) {
                alert("No respondió todas las preguntas, por favor intente de nuevo.");
                return;
            }
        }else if (i>7 && i<10) {
            auxMark = checkRadio(formElement, i);    
            if (auxMark === true) {
                mark += 1;
            } else if (auxMark != false) {
                alert("No respondió todas las preguntas, por favor intente de nuevo.");
                return;
            }
        }
    }
    if (unaswered.length == 0) {
        alert("Tu nota final es: " + mark);
    }
}

//
//Data loader
//
//get title returns string
function getTitle (question) {
    var title = question.getElementsByTagName("title")[0].innerHTML;
    return title;
}
//get answers returns array
function getAnswers (question) {
    var answers = question.getElementsByTagName("answer");
    return answers;
}
//get options returns array
function getOptions (question) {
    var options = question.getElementsByTagName("option");
    return options;
}

//get working fieldset
function getWorkFieldset (count) {
    var fieldset = document.getElementsByTagName("fieldset")[count];
    return fieldset;
}

//textHandler
function textHandler (question, count) {
    var fieldset = getWorkFieldset(count);
    var actualTitle = getTitle(question);
    var expectedAnswers = question.getElementsByTagName("answer");
    globAnswers[count] = expectedAnswers;
    fieldset.getElementsByTagName("p")[0].innerHTML = actualTitle;

}

//selectHandler
function selectHandler (question, count) {
    var fieldset = getWorkFieldset(count);
    var actualTitle = getTitle(question);
    fieldset.getElementsByTagName("p")[0].innerHTML = actualTitle;
    var actualOptions = getOptions(question);
    var expectedAnswers = question.getElementsByTagName("answer");
    globAnswers[count] = expectedAnswers;
    for (var i=0; i<actualOptions.length; i++){
        var option = actualOptions[i];
        var a = 0;
        var rawOption = document.createElement("option");
        rawOption.text = option.innerHTML;
        rawOption.value = i + 1;
        document.getElementsByTagName("fieldset")[count].getElementsByTagName("select")[0].appendChild(rawOption);       
    }
}

//multipleHandler
function multipleHandler (question, count) {
    var fieldset = getWorkFieldset(count);
    var actualTitle = getTitle(question);
    fieldset.getElementsByTagName("p")[0].innerHTML = actualTitle;
    var actualOptions = getOptions(question);
    var expectedAnswers = question.getElementsByTagName("answer");
    globAnswers[count] = expectedAnswers;
    for (var i=0; i<actualOptions.length; i++){
        var option = actualOptions[i];
        var rawOption = document.createElement("option");
        rawOption.text = option.innerHTML;
        rawOption.value = i + 1;
        document.getElementsByTagName("fieldset")[count].getElementsByTagName("select")[0].appendChild(rawOption);
    }
}

//checkBoxHandler
function checkBoxHandler (question, count) {
    var fieldset = getWorkFieldset(count);
    var actualTitle = getTitle(question);
    fieldset.getElementsByTagName("p")[0].innerHTML = actualTitle;
    var actualOptions = getOptions(question);
    var expectedAnswers = question.getElementsByTagName("answer");
    globAnswers[count] = expectedAnswers;
    for (var i=0; i<actualOptions.length; i++){
        var option = actualOptions[i];
        var rawInput = document.createElement("input");
        var rawLabel = document.createElement("label");
        var rawBr = document.createElement("br");
        var rawLabelText = document.createTextNode(option.innerHTML);
        var auxCount = count*2+1;
	    var auxClass = "check_" + count;
        rawInput.setAttribute("type", "checkbox");
        rawInput.setAttribute("value", option.innerHTML);
	    rawInput.setAttribute("class", auxClass);
        rawInput.setAttribute("name", "cBox");
        rawInput.setAttribute("id", i + 1);
        rawLabel.setAttribute("for", "cBox_" + auxCount);
        rawLabel.appendChild(rawLabelText);
        document.getElementsByTagName("fieldset")[count].appendChild(rawInput);
        document.getElementsByTagName("fieldset")[count].appendChild(rawLabel);
        document.getElementsByTagName("fieldset")[count].appendChild(rawBr);
    }
}

//radioHandler
function radioHandler(question, count) {
    var fieldset = getWorkFieldset(count);
    var actualTitle = getTitle(question);
    fieldset.getElementsByTagName("p")[0].innerHTML = actualTitle;
    var actualOptions = getOptions(question);
    var expectedAnswers = question.getElementsByTagName("answer");
    globAnswers[count] = expectedAnswers;
    for (var i=0; i<actualOptions.length; i++){
        var option = actualOptions[i];
        var rawInput = document.createElement("input");
        var rawLabel = document.createElement("label");
        var rawLabelText = document.createTextNode(option.innerHTML);
        var rawBr = document.createElement("br");
        var rawInputText = document.createTextNode(option.innerHTML);
        var auxClass = "radio_" + count;
        rawInput.setAttribute("type", "radio");
        rawInput.setAttribute("name", actualOptions.length);
        rawInput.setAttribute("id", i + 1);
        rawInput.setAttribute("class", auxClass);
        rawInput.setAttribute("value", option.innerHTML);
        rawLabel.appendChild(rawLabelText);
        document.getElementsByTagName("fieldset")[count].appendChild(rawInput);
        document.getElementsByTagName("fieldset")[count].appendChild(rawLabel);
        document.getElementsByTagName("fieldset")[count].appendChild(rawBr);
    }
}

function questionHandler (xml) {
    var xmlDocument=xml.responseXML;
    var xmlQuestions = xmlDocument.getElementsByTagName("question");
    totalQuestions = xmlDocument.getElementsByTagName("question").length;
    for (var i=0;i<10;i++) {
        var question = xmlDocument.getElementsByTagName("question")[i];
        var type = question.getElementsByTagName("type")[0].innerHTML;
        switch (type) {
            case "text":
                textHandler(question, i);
                break;
            case "select":
                selectHandler(question, i);
                break;
            case "multiple":
                multipleHandler(question, i);
                break;
            case "checkbox":
                checkBoxHandler(question, i);
                break;
            case "radio":
                radioHandler(question, i);
                break;
        }
    }
}
