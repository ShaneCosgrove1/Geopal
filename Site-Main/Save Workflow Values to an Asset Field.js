var start=9;
var finish=161;

var increment = 8;

start--;
finish--;
var namesList=" ";

for(var i = start; i <=finish; i=i+increment){
    
    var names =  Geopal.getJobWorkflowValueByPosition(i);
if(names[i]==" "){
    Geopal.setJobWorkflowValueByPosition(i," ");
    namesList = namesList+names+",";

        }
 else{
    namesList = namesList+names+",";
 }

    }
    
    

Geopal.showMessage(namesList);
Geopal.setJobWorkflowValue("Complete");
Geopal.setJobWorkflowValueByName("Names List", namesList)