
//##### EDIT THESE LINES ONLY #############################
var questionFirst = 15; //use Job Template Question Number
var questionLast = 46;   // ^^          ^^          ^^
//  ^^  EDIT THESE LINES ONLY ^^  #########################

var validate = [];
questionFirst--;
questionLast--;
var totalValue = 0;
var sub_standard = false;
var denominator = 0;

console.info("Script Loaded : Calculate Score")

for (var i = questionFirst; i <= questionLast; i++){
    var currentValue = Geopal.getJobWorkflowValueByPosition(i);
    if (currentValue == undefined){
        validate.push(i);
        }
}

if (validate[0] >0 )                           // if set incomplete jump to question + ask to complete
{
    Geopal.showMessage('Please Complete the following ' + validate.length + ' questions to Calculate score');
    Geopal.gotoJobWorkflowByPosition(parseFloat(validate[0]));

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

