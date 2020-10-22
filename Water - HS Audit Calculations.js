

var totalValue = 0;
var sub_standard = false;
var denominator = 0;
for (var i = 15; i <= 46; i++){
    var currentValue = parseFloat(Geopal.getJobWorkflowValueByPosition(i - 1));
    if (!currentValue || isNaN(currentValue)){
        currentValue = 0;
    }
    else{
        denominator += 5; //if valid answer, increase the denominator by 5 points
    }
    if (currentValue == 1){
        sub_standard = true
    }
    totalValue += currentValue;
}

var percentage = ((totalValue / denominator) * 100).toFixed(2) + '%';

Geopal.setJobWorkflowValue(percentage);

if (sub_standard){
    Geopal.gotoJobWorkflowByName('Job Incomplete');
}