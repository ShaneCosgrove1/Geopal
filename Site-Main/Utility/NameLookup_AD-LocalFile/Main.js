var users=[];
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
    getTemplate: function(templateId) {
        var tpl = $(templateId).html();
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

var onSelectValueChanged = function(event) {
    console.log(event);
    var id = this.id;
    console.log(id);
    var value =$('#' + id + '-checkbox').prop('checked');
    console.log(value);
    this.selected_value = value;
};




var buildView = function(users_associated){
    for (var i = 0; i < users_associated.length; i++) {
        var current_user = users_associated[i];
        current_user.id = i; //todo: get a better id
        console.log(current_user);
        $('#mainDiv').append(Utils.processTemplate("#part_row_template", current_user));
        $('#' + current_user.id + '-checkbox').prop('checked',current_user.selected_value);
        $('#' + current_user.id + '-checkbox').blur(onSelectValueChanged.bind(current_user));
        $('#' + current_user.id + '-checkbox').change(onSelectValueChanged.bind(current_user));
        
        
        
    }
}



//If there is no internet connection the webview will load in the file Active Directory and show the details to the user.
//TThis funticon will be called in the error of the getUsersData and then will use the funtion buildView to display data.
function getInfoFromFile(){
    var regexString = String.fromCharCode(13) + String.fromCharCode(10) + '|' + String.fromCharCode(10) +'|' + String.fromCharCode(13); //makes csv file readable and splits the columns
    var fileContent = Geopal.CompanyFile.getContentsByName("Active Directory");
    var myregex = new RegExp(regexString);
    var lineItems = fileContent.split(myregex);
   
    for (var i = 1; i < lineItems.length; i++) {

        var line = lineItems[i]; //reading the current line which is comma separated 
        //sample: 'id,test@test.com,Test User'

        //now we need to split this string into an array
        var lineArray = line.split(',');
        //result lineArray = ['id', 'test@test.com', 'Test User']

        //read the different parts of the array and create an object
        var identifier = lineArray[0];
        var mail = lineArray[1];
        var displayName = lineArray[2];

        //check that the identifier exists aka the line is not empty
        if (identifier) { 

            var userInfo = {
                "identifier": identifier,
                "Display Name": displayName,
                "Mail": mail
            };

            //push to an array
            users.push(userInfo);
        }
    }

    //call buildView function once you are outside the loop and 
    // have added all user info items
    buildView(users);  
};

function getUsersData() {
    var headers = {};
    headers['Content-Type'] = 'application/json';
    headers['Accept'] = 'application/json';
    
    $.ajax({
        url: 'https://iot.geopalsolutions.com/iot/c1163_searchactivedirectorystore',
        headers: headers,
        type: 'GET',
        
       
          error: function(){
          getInfoFromFile();
          
        },
        
   
        success: function(data, textStatus, jqXHR) {
            console.log(data.users_to_show);
            users = data.users_to_show;
            buildView(users);
        }
    });
    
}


//var asset_identifier = Geopal.getAssetIdentifier();

$(document).ready(function() {
    
    if (users && users != ''){
        buildView(JSON.parse(users));
        
    }
    else{
        getUsersData();
    }
});
//search bar filters table
$(document).ready(function(){
    $('#myInput').keyup(function(){
        search_table($(this).val());
    })
    function search_table(value){
        $('#users tr').each(function(){
            var found = 'false';
            $(this).each(function(){
                if($(this).text().toLowerCase().indexOf(value.toLowerCase())>0)
                {
                    found = 'true';
                }
                
            });
            if(found=='true'){
                $(this).show();
            }
            else{
                $(this).hide();
            }
        });
    }
})

function assignToMe(){
    var employee =Geopal.Employee.getLoggedInEmployee();
    var currentWorkflow  =Geopal.getJobWorkflowPosition();
    Geopal.showMessage("Test")
    Geopal.setJobWorkflowValue(employee.first_name+" "+employee.last_name);
    Geopal.setJobWorkflowValueByPosition(currentWorkflow + 1,employee.first_name+"."+mployee.last_name+'@wardandburke.com')
    Geopal.finish();
}

