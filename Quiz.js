var score = 0; //Global Varaible to keep track of score
//get answers
var question1 = Geopal.getJobWorkflowValueByName('test question 1 ');
var question2 = Geopal.getJobWorkflowValueByPosition(3);
var question3= Geopal.getJobWorkflowValueByPosition(4);
var question4 = Geopal.getJobWorkflowValueByPosition(5);
var question5 = Geopal.getJobWorkflowValueByPosition(6);
//check if answers are correct, if correct increase score by 1
if(question1=="Answer1"){
    score += 1

}

if(question2=="Answer1"){
    score += 1
}

if(question3=="Answer1"){
    score += 1
}
if(question4=="Answer1"){
    score +=1
}
if(question5=="Answer1"){
    score +=1
}
//Set result == to the final score
var result = score;
//Pass criteria if below a certain number saves a fail message
//above criteria saves a pass message.
if(result < 3){
    Geopal.showMessage("You have Failed");
    Geopal.setJobWorkflowValueByName('Result','You have failed.Your result is:'+result+'/5');
    
}else{
    Geopal.showMessage("You have Passed");
    Geopal.setJobWorkflowValueByName('Result','You have Passed.Your result is:'+result+'/5');
}

