
console.info("$₰€€₽");

//       CHANGE THESE VALUES ONLY
var startScore =    11 ; // Start of Scoring  
var endScore =      104 ; // End of Scoring
var incVal =        3  ; // Incrememnt value
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

startScore--;
endScore--;

var totalValue = 0;
var sub_standard = false;
var denominator = 0;

for (var i = startScore; i <= endScore; i=i+incVal){
    var currentValue = parseFloat(Geopal.getJobWorkflowValueByPosition(i));
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