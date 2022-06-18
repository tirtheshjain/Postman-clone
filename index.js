
let jsonBox = document.getElementById("jsonBox");
let paramsBox = document.getElementById("paramsBox");

// Hide the parameters box initially
paramsBox.style.display = 'none';


// display params box, hide the json box
let paramsRadio = document.getElementById("paramsRadio");
paramsRadio.addEventListener('click', () => {
    jsonBox.style.display = 'none';
    paramsBox.style.display = 'block';
});

// display json box, hide the params box
let jsonRadio = document.getElementById("jsonRadio");
jsonRadio.addEventListener('click', () => {
    paramsBox.style.display = 'none';
    jsonBox.style.display = 'flex';
});


//function to get DOM element from string
function getElementFromString(string) {
    let divElement = document.createElement('div');
    divElement.innerHTML = string;
    return divElement.firstElementChild;
}


// add more parameters
let addParams = function () {
    let paramsCount = 1;
    return function () {
        paramsCount++;
        let paramsString = `<div class="row mb-1">
                        <label for="param${paramsCount}" class="col-sm-2 col-form-label">Parameter ${paramsCount}</label>
                        <div class="col-md-3">
                            <input type="text" class="form-control paramKey" id="param${paramsCount}Key" placeholder="Enter key" required>
                        </div>
                        <div class="col-md-3">
                            <input type="text" class="form-control paramValue" id="param${paramsCount}Value" placeholder="Enter value" requird>
                        </div>
                        <div class="col-md-3">
                            <input type="button" class="btn btn-primary deleteParamsBtn" value="- ">
                        </div> 
                        </div>`;

        //string to DOM node
        let paramElement = getElementFromString(paramsString);
        paramsBox.appendChild(paramElement);
        
        // Add an event listener to remove the parameter on clicking '-' button
        let deleteParamsBtn = document.getElementsByClassName('deleteParamsBtn');

        if(paramsCount > 2)
            deleteParamsBtn[paramsCount-3].style.display = 'none';
        

        deleteParamsBtn[paramsCount-2].addEventListener('click', (e) => {
            paramElement.remove();
            paramsCount--;
            if(paramsCount > 1) deleteParamsBtn[paramsCount-2].style.display = 'block';
        })
    }
}();

let addParamsBtn = document.getElementById('addParamsBtn');
addParamsBtn.addEventListener('click', addParams);


// Add an event listener to fetch response on clicking submit button 
let submitBtn = document.getElementById('submitBtn');
let responseBox = document.getElementById('responseBox');

submitBtn.addEventListener('click', () => {
    responseBox.value = "fetching response.....";

    let url = document.getElementById('urlField').value;
    let requestType = document.querySelector('input[name="requestType"]:checked').value;
    let contentType = document.querySelector('input[name="contentType"]:checked').value;
    let data;

    if (contentType === 'JSON')
        data = document.getElementById('jsonText').value;
    else {
        let paramKeys = document.getElementsByClassName('paramKey');
        let paramValues = document.getElementsByClassName('paramValue');
        data = {};
        for (let i = 0; i < paramKeys.length; i++)
            data[paramKeys[i].value] = paramValues[i].value;

        data = JSON.stringify(data);
    }

    if (requestType === 'GET') {
        fetch(url, { method: 'GET' })
            .then(response => response.text())
            .then(text => { document.getElementById('responseBox').value = text; })
    }
    else {
        fetch(url, {
            method: 'POST',
            body: data,
            headers: { "Content-type" : 'application/json; charset=UTF-8'}
        })
            .then(response => response.text())
            .then((text) => { document.getElementById('responseBox').value = text; })
    }
});
