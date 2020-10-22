var success = function(item){
    if(item=='Haulage'){
        Geopal.setJobWorkflowValue(item);
        Geopal.setJobWorkflowIsActiveByPosition(9,false);
      
         
     }
    else{
        Geopal.setJobWorkflowValue(item);
        Geopal.setJobWorkflowIsActiveByPosition(2,false);
       
         
        
     
     }
     }
     
     var cancel = function(){
     
     
     }
     
     Geopal.showSingleChoiceList('success','cancel','Haulage,Concrete','Select report Type','What is the type of Report?');
     