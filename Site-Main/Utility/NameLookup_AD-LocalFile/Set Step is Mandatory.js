
// show enter extended text box first.
var currentPosition = Geopal.getJobWorkflowPosition();
var enter = function(item) {
    Geopal.setJobWorkflowValue(item);

    if(item.length > 1){// if Item has text make the assignee steps mandatory
        Geopal.setJobWorkflowIsMandatoryByPosition(currentPosition +1,true)
        Geopal.setJobWorkflowIsMandatoryByPosition(currentPosition +2,true)
    }
    };
    
var cancel = function() {
    Geopal.showMessage('cancelled');
    };
    
    

    Geopal.showEnterNote('enter', 'cancel', 'default text', 'Snag', 'Description of Snag');


