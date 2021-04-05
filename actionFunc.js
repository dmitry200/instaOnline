const { ipcRenderer } = require('electron');


function findButtonbyTextContent(text) {
    var buttons = document.querySelectorAll('button');
    for (var i=0, l=buttons.length; i<l; i++) {
        if (buttons[i].firstChild.nodeValue == text)
            return buttons[i];
    }  
}

ipcRenderer.on('clickObjByText', (event, selector, timeout) => {

    var exec = function() {
        const element = findButtonbyTextContent(selector);
        if (element) {
            // element.value = message;
            console.log(element);
            element.click();
            // element.dispatchEvent(new Event("change"));
        }
    }
    if (timeout !== undefined && Number.isInteger(timeout)) {
        setTimeout(function() { exec(); }, timeout);
    } else {
        exec();
    }
})

ipcRenderer.on('replaceMsg', (event, selector, message, timeout) => {

    var exec = function() {
        const element = document.getElementsByName(selector)[0];
        if (element) {
            element.value = message;
            console.log(element);
            // element.dispatchEvent(new Event("change"));
        }
    }
    if (timeout !== undefined && Number.isInteger(timeout)) {
        setTimeout(function() { exec(); }, timeout);
    } else {
        exec();
    }
})

  ipcRenderer.on("clickObj", (event, selector, timeout) => {
    if (timeout !== undefined && Number.isInteger(timeout)) {
        setTimeout(function() {  
            const element = document.getElementsByName(selector);
            if (element) {
                window.setTimeout(function () { 
                    document.getElementsByName(selector); 
                }, 0); 
                element.click(); 
            }
        }, timeout);
    } else {
        const element = document.getElementsByName(selector);
        if (element) element.click(); 
    }
})  

ipcRenderer.on("combobox", (event, selector, index, timeout) => {
    if (timeout !== undefined && Number.isInteger(timeout)) {
        setTimeout(function() {  
            const element = document.getElementsByName(selector);
            if (element) {
                window.setTimeout(function () { 
                    document.getElementsByName(selector);
                }, 0); 
                element.selectedIndex = index;
                element.dispatchEvent(new Event("change"));
                // element.dispatchEvent(new Event("change"));
            }
                
        }, timeout);
    } else {
        const element = document.getElementsByName(selector);
        if (element) element.value = message;
    }
})

