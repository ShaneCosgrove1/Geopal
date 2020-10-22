// Headers Defining start and end
var auditStart =  'Audit Questions' ;
var auditFinish =  'Audit Questions Complete' ;
var questionFirst,questionLast
// Guess maximum workflows in Form, change to desired
var workflowList =  Geopal.Job.Current.getJobWorkflowsByPosition(0,200); 
// iterate each workflow, find the position of start and finish audit 
for (var i = 0; i < workflowList.length; i++) {
    
    if (workflowList[i].name === auditStart ) {
        console.log(workflowList[i].name,i)
        questionFirst = i;
    }
    if (workflowList[i].name  === auditFinish ) {
         console.log(workflowList[i].name,i)
        questionLast = i;
         break;
    }
}
// adjust position relative to start finish markers
questionFirst++;
questionLast--;
/* //the old analog way 
var questionFirst = 23; //use Job Template #
var questionLast = 51; 
questionFirst--;
questionLast--;
*/

var validate = [];

var totalValue = 0;
var sub_standard = false;
var denominator = 0;

console.info("Script Loaded : Calculate Score")

for (var i = questionFirst; i <= questionLast; i++){
    var currentValue = Geopal.getJobWorkflowValueByPosition(i);
        if (currentValue == undefined || !(currentValue < 6) ) { Geopal.setJobWorkflowValueByPosition(i,5)}

    if (currentValue == undefined){
        validate.push(i);
        }
}

if (validate[0] >0 )                           // if set incomplete jump to question + ask to complete
{
    Geopal.showMessage('Please Complete all questions to Calculate score');
    Geopal.gotoJobWorkflowByPosition(parseFloat(validate));

    validate.length = 0;
}
else{

    for (var i = questionFirst; i <= questionLast; i++){
        var currentValue = parseFloat(Geopal.getJobWorkflowValueByPosition(i));
        if (!currentValue || isNaN(currentValue)){
            currentValue = 0;
        }
        else{
            denominator += 5; //if valid answer, increase the denominator by 5 points
        }
        if (currentValue == 1){
            sub_standard = true;
        }
        totalValue += currentValue;
    
    }

    var percentage = ((totalValue / denominator) * 100).toFixed(2) + '%';
    Geopal.setJobWorkflowValue(percentage);

    if (sub_standard){
        Geopal.gotoJobWorkflowByName('Job Incomplete');
    }

}

