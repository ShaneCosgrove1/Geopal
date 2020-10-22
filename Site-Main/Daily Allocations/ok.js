var employeeNameInputs = document.getElementsByClassName("name");

for(var i =0; i < employeeNameInputs.length; i++){


    Geopal.setJobWorkflowValueByName('Name ' + i,employeeNameInputs[i].value);
}

var employeeHoursInputs = document.getElementsByClassName("hours");

for(var i =0; i < employeeHoursInputs.length; i++){


    Geopal.setJobWorkflowValueByName('Hours ' + i,employeeHoursInputs[i].value);
}
var level0 = document.getElementsByClassName("level0");

for(var i =0; i < level0.length; i++){

    var level0Value = level0[i].options[level0[i].selectedIndex].text
    Geopal.setJobWorkflowValueByName('Level0 '+ i,level0Value);

    
}


var level1 = document.getElementsByClassName("level1");

for(var i =0; i < level1.length; i++){

    var level1Value = level1[i].options[level1[i].selectedIndex].text;
    Geopal.setJobWorkflowValueByName('Level1 '+ i,level1Value);

    
}

var level2 = document.getElementsByClassName("level2");

for(var i =0; i < level2.length; i++){

    var level2Value = level2[i].options[level2[i].selectedIndex].text;
    Geopal.setJobWorkflowValueByName('Level2 '+ i,level2Value);

    
}

var level3 = document.getElementsByClassName("level3");

for(var i =0; i < level3.length; i++){

    var level3Value = level3[i].options[level3[i].selectedIndex].text;
    Geopal.setJobWorkflowValueByName('Level3 '+ i,level3Value);

    
}
var level4 = document.getElementsByClassName("level4");

for(var i =0; i < level4.length; i++){

    var level4Value = level4[i].options[level4[i].selectedIndex].text;
    Geopal.setJobWorkflowValueByName('Level4 '+ i,level4Value);

    
}

Geopal.finish();

    
