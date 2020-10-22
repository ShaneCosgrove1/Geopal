 // Check User input
// set the workflow field  to entered values or show message
/* Overview
Check ManualEntry
if !empty - use them > Quit
    else
    Check 400
    if selected - use it > Quit
        else
        Message nothing selected > remain
 */
var result;
var manualEntry = document.getElementById('manualEntry').value;
var manualNameEntry = document.getElementById('manualNameEntry').value;
var currentWorkflow  =Geopal.getJobWorkflowPosition();
if (manualEntry.length > 0 && manualNameEntry.length > 0) {
    Geopal.setJobWorkflowValue(manualNameEntry);
    Geopal.setJobWorkflowValueByPosition(currentWorkflow + 1,manualEntry);
    Geopal.finish();
} else {
    result = checkSelected();
}
if (result.found == true) {
    Geopal.setJobWorkflowValue(result.name);
    Geopal.setJobWorkflowValueByPosition(currentWorkflow + 1,result.email );
} else {
    // Geopal.showMessage('failed');
    Geopal.showMessage(
        'Nothing Selected Fill in Name and Email address or select a User From the list'
    );
}

function checkSelected() {
    var obj = {};
    for (var i = 0; i < users.length; i++) {
        if (users[i].selected_value == true) {
            obj = {
                name: users[i]['Display Name'],
                email: users[i].Mail,
                found: true,
            };
            break;
        }
    }
    // for loop complete
    if (obj.found === true) {
        return obj;
    } else {
        obj.found = false;
        return obj;
    }
}

Geopal.finish();




/*for(var i =0; i < users.length; i++){
   var email;
    if(users[i].selected_value ==true) {
         email=users[i].Mail;
         var name = users[i]['Display Name'];
         Geopal.setJobWorkflowValue(email)
         Geopal.setJobWorkflowValueByPosition(55,name);
         
     }
     var manualEntry = document.getElementById('manualEntry').value;
    var manualNameEntry = document.getElementById('manualNameEntry').value;
     if(manualEntry.length >0 ){
         Geopal.setJobWorkflowValue(manualEntry);
     }else{
         Geopal.setJobWorkflowValue(email);
     }
     if(manualNameEntry.length >0){
         Geopal.setJobWorkflowValueByPosition(55,manualNameEntry);
     }else{
        Geopal.setJobWorkflowValueByPosition(55,name);
     }
     
     
     
 }
 
 
 

 Geopal.finish();*/