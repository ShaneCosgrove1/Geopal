/** 
*   Original was for H&S Audit to calcuate average score in a sequence of questions
*   ie, Q 18 - 49
*  
*   @author: GeoPal 
* 
*   Update: added commenting and variables
*   @author:Franky Egan
*   @since: 01-05-18
* 
* */
// CHANGE THESE VALUES ONLY
var startScore =    10 ; // Start of Scoring  
var EndScore =      104 ; // End of Scoring
var incVal =        3  ; // Incrememnt value
//                  ^^

var totalValue = 0;
var sub_standard = false;
var denominator = 0;
for (var i = startScore; i <= EndScore; i+ incVal){
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

// if (sub_standard) {
//     Geopal.gotoJobWorkflowByName('Job Incomplete');
// }