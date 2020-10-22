Geopal.Debug.setWebContentsDebuggingEnabled(true);



var Utils = {
    /**
     * Replaces {something} with the corresponding value in values.
     * So, if values is { something: "world" } and you call this method this way:
     * Utils.replacePlaceholders("Hello {something}!", { something: "world"})
     * You get in the output: "Hello world!"
     */
    replacePlaceholders: function (thestring, values) {
        var result = thestring;
        for (var key in values) {
            result = result.replace(new RegExp("\\{" + key + "\\}", "g"), values[key]);
        }
        return result;
    },
    /**
     * Gets the innerHTML of a given element, for use as in a template.
     */
    getTemplate: function (id) {
        var tpl = $(id).html();
        return tpl;
    },
    /**
     * Retrieves an HTML fragment from the page using it as a template, programmatically
     * replacing placeholders with the supplied values.
     * Very handy to avoid mixing HTML and JS in a JavaScript file (as mixing languages
     * together greatly reduces maintainability).
     */
    processTemplate: function (id, values) {
        var tpl = this.getTemplate(id);
        var result = "";
        if (!(values instanceof Array)) {
            values = [values];
        }
        for (var i = 0; i < values.length; i++) {
            result += this.replacePlaceholders(tpl, values[i]);
        }
        return result;
    },
    /**
     * Generates a unique ID.
     */
    id: function () {
        if (!this._id) {
            this._id = 0;
        }
        this._id++;
        return "id-" + this._id;
    }

};

var buildUiView = function (data) {

    for (var i = 0; i < 7; i++) {  //data.length; i++) {                                        // limit to 7 Days
        $('#demo tbody').append(Utils.processTemplate("#rowTemplate tbody", data[i]));
    }
}

function loadDoc() {
    //var xhttp = new XMLHttpRequest();
    //xhttp.onreadystatechange = function() {
    //       if (this.readyState == 4 && this.status == 200) {
    //          var reponseData = JSON.parse(this.responseText);
    //          console.log(this.responseText);
    //          $("#demo").html(reponseData.data);
    buildUiView(reponseData.data);
    Geopal.Dialog.hideProgressDialog();
}


// xhttp.open("GET", "https://iot.geopalsolutions.com/iot/c1225_getpumphistory", true);                // Change URL to match IoT call
// xhttp.send();

$.ajax({
    method: "GET",
    url: "https://iot.geopalsolutions.com/iot/c1225_getpumphistory",
    data: { name: "John", location: "Boston" }
})
    .done(function (responseText) {
        var reponseData = JSON.parse(this.responseText);
    });
}
});

$(document).ready(function () {

    Geopal.Dialog.showProgressDialog('Loading...');
    loadDoc();

    //Dynamic Calc - Average
    var sum = 0;
    console.info(sum);
    $('.allHours').each(function () {
        console.info(sum);
        console.info(Number($(this).textContent));
        sum += Number($(this).textContent);
        console.info(sum);
    });
    $('.ave').text(sum);

});

var table = $('#demo');

$('.sortMe th')
    .wrapInner('<span title="sort this column"/>')
    .each(function () {

        var th = $(this),
            thIndex = th.index(),
            inverse = false;

        th.click(function () {

            table.find('td').filter(function () {

                return $(this).index() === thIndex;

            }).sortElements(function (a, b) {

                if ($.text([a]) == $.text([b]))
                    return 0;

                return $.text([a]) > $.text([b]) ?
                    inverse ? -1 : 1
                    : inverse ? 1 : -1;

            }, function () {

                // parentNode is the element we want to move
                return this[removed];

            });

            inverse = !inverse;

        });

    });