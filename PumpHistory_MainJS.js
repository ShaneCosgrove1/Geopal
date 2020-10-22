Geopal.Debug.setWebContentsDebuggingEnabled(true);

var Utils = {
    /**
     * Replaces {something} with the corresponding value in values.
     * So, if values is { something: "world" } and you call this method this way:
     * Utils.replacePlaceholders("Hello {something}!", { something: "world"})
     * You get in the output: "Hello world!"
     */
    replacePlaceholders: function(thestring, values) {
        var result = thestring;
        for(var key in values) {
            result = result.replace(new RegExp("\\{" + key + "\\}", "g"), values[key]);
        }
        return result;
    },
    /**
     * Gets the innerHTML of a given element, for use as in a template.
     */
    getTemplate: function(id) {
        var tpl = $(id).html();
        return tpl;
    },
    /**
     * Retrieves an HTML fragment from the page using it as a template, programmatically
     * replacing placeholders with the supplied values.
     * Very handy to avoid mixing HTML and JS in a JavaScript file (as mixing languages
     * together greatly reduces maintainability).
     */
    processTemplate: function(id, values) {
        var tpl = this.getTemplate(id);
        var result = "";
        if(!(values instanceof Array)) {
            values = [ values ];
        }
        for(var i = 0; i < values.length; i++) {
            result += this.replacePlaceholders(tpl, values[i]);
        }
        return result;
    },
    /**
     * Generates a unique ID.
     */
    id: function() {
        if(!this._id) {
            this._id = 0;
        }
        this._id++;
        return "id-" + this._id;
    }
    
};

var buildUiView = function(data) {
    
    for (var i = 0; i < data.length; i++) {
        $('#demo tbody').append(Utils.processTemplate("#rowTemplate tbody", data[i]));
    }
}

function loadDoc() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var reponseData = JSON.parse(this.responseText);
            console.log(this.responseText);
            //$("#demo").html(reponseData.data);
            buildUiView(reponseData.data);
            Geopal.Dialog.hideProgressDialog();
        }
    };
    xhttp.open("GET", "https://iot.geopalsolutions.com/iot/c1163_getpumphistory", true);
    xhttp.send();
}

$(document).ready(function() {
    
    Geopal.Dialog.showProgressDialog('Loading...');
    loadDoc();
    
//Dynamic Calc - Average
    var sum = 0;
    $('.pressureNum').each(function() {
        sum += Number($(this).val());
    });
    $('.pressureNum').text(sum);
    
});