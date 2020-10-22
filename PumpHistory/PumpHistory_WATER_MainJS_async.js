Geopal.Debug.setWebContentsDebuggingEnabled(true);
    var pumpNo = 1;
    var assetID = Geopal.getAssetIdentifier();
    var pumpHoursVar = 'job_workflow_1391433';     // Pump 1 Hours
    var pumpAmpsVar = 'job_workflow_1391434';      // Pump 1 Amps
    var hourString = "pumpHours=";
    var ampString = "pumpAmps=";

$(document).ready(function() {
    $('H1').html("Pump " + pumpNo);
    
    navigator.onLine ? loadDoc(showMessage): errorActions() ;
    
});

function errorActions() {
    $('#demo').hide();
    Geopal.showMessage ('No Connection - History not Available');
    
}
    
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
    
    for (var i = 0; i < 7; i++ ){  //data.length; i++) {                                        // limit to 7 Days
        $('#demo tbody').append(Utils.processTemplate("#rowTemplate tbody", data[i]));
    }
}

//Begin xHTML
var xhttp = new XMLHttpRequest();
function loadDoc(callback) {
    Geopal.Dialog.showProgressDialog('Loading History...');
    xhttp.open("GET", "https://iot.geopalsolutions.com/iot/c1225_getpumphistory?assetID=" + assetID  + '&' +  hourString + pumpHoursVar  + '&' +  ampString + pumpAmpsVar, true);                // Change URL to match IoT call

    xhttp.timeout = 5000; // time in milliseconds

    xhttp.ontimeout = function () {
        Geopal.Dialog.hideProgressDialog();
        console.log("Message " + message + " Response Text: " + this.responseText);
        Geopal.showText ('No Internet Connection - Please Use the Manual Entry Buttons');
        //xhttp.abort();
    }; 
    xhttp.onload = function() {
        if (xhttp.readyState === 4) {
            if (xhttp.status === 200) {
                callback.apply(xhttp);
            } else {
                console.error(xhttp.statusText);
            }
        }
    };

    xhttp.send();
    
    };
console.error("91");
function showMessage (message) {
    console.log("Message " + message + " Response Text: " + this.responseText);
            var reponseData = JSON.parse(xhttp.responseText);

            buildUiView(reponseData.data);
            Geopal.Dialog.hideProgressDialog();
            //Geopal.showMessage (assetID);
            //crunchNumber();
}



function crunchNumber() {
var sum = 0;
 console.info(sum);
    $('.allHours').each(function() {
        console.info(sum);
        console.info(Number($(this).textContent));
        sum += Number($(this).textContent);
        console.info(sum);
    });
    $('.ave').text(sum);
}