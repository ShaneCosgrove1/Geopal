Geopal.Debug.setWebContentsDebuggingEnabled(true);
var Utils = {
    /**
     * Replaces {something} with the corresponding value in values.
     * So, if values is { something: "world" } and you call this method this way:
     * Utils.replacePlaceholders("Hello {something}!", { something: "world"})
     * You get in the output: "Hello world!"
     */
    replacePlaceholders: function(thestring, values) {
        var result = thestring;
        for(var key in values) {
            result = result.replace(new RegExp("\\{" + key + "\\}", "g"), values[key]);
        }
        return result;
    },
    /**
     * Gets the innerHTML of a given element, for use as in a template.
     */
    getTemplate: function(templateId) {
        var tpl = $(templateId).html();
        return tpl;
    },
    /**
     * Retrieves an HTML fragment from the page using it as a template, programmatically
     * replacing placeholders with the supplied values.
     * Very handy to avoid mixing HTML and JS in a JavaScript file (as mixing languages
     * together greatly reduces maintainability).
     */
    processTemplate: function(id, values) {
        var tpl = this.getTemplate(id);
        var result = "";
        if(!(values instanceof Array)) {
            values = [ values ];
        }
        for(var i = 0; i < values.length; i++) {
            result += this.replacePlaceholders(tpl, values[i]);
        }
        return result;
    },
    /**
     * Generates a unique ID.
     */
    id: function() {
        if(!this._id) {
            this._id = 0;
        }
        this._id++;
        return "id-" + this._id;
    }
    
};


var buildView = function(parts_associated){
    
    var level0Values=[];
    var level1Values=[];
    var level2Values=[];
    var level3Values=[];
    var level4Values=[];
    
    for (var i = 0; i < parts_associated.length; i++) {
     
    level0Values.push(parts_associated[i].Level0);
    level1Values.push(parts_associated[i].Level1);
    level2Values.push(parts_associated[i].Level2);
    level3Values.push(parts_associated[i].Level3);
    level4Values.push(parts_associated[i].Level4);
        
    }
  //level 0  
   var uniqueLevel0 = level0Values.filter(function(elem, index, self) {
    return index === self.indexOf(elem);
    })
   
    for (var i = 0; i < uniqueLevel0.length; i++){
      
        var level0=document.getElementById('level0')
        var option = document.createElement("option");
        option.value=uniqueLevel0[i];
        option.text=uniqueLevel0[i];
        level0.add(option);
    }
 //level 1    
   var uniqueLevel1 = level1Values.filter(function(elem, index, self) {
    return index === self.indexOf(elem);
    })
   
    for (var i = 0; i < uniqueLevel1.length; i++){
      
        var level1=document.getElementById('level1')
        var option1 = document.createElement("option");
        option1.value=uniqueLevel1[i];
        option1.text=uniqueLevel1[i];
        level1.add(option1);
    }
     //level 2   
   var uniqueLevel2 = level2Values.filter(function(elem, index, self) {
    return index === self.indexOf(elem);
    })
   
    for (var i = 0; i < uniqueLevel2.length; i++){
      
        var level2=document.getElementById('level2')
        var option2 = document.createElement("option");
        option2.value=uniqueLevel2[i];
         option2.text=uniqueLevel2[i];
        level2.add(option2);
    }
     //level 3   
   var uniqueLevel3 = level3Values.filter(function(elem, index, self) {
    return index === self.indexOf(elem);
    })
   
    for (var i = 0; i < uniqueLevel3.length; i++){
      
        var level3=document.getElementById('level3')
        var option3 = document.createElement("option");
        option3.value=uniqueLevel3[i];
        option3.text=uniqueLevel3[i];
        level3.add(option3);
    }
     //level 4  
   var uniqueLevel4 = level4Values.filter(function(elem, index, self) {
    return index === self.indexOf(elem);
    })
   
    for (var i = 0; i < uniqueLevel4.length; i++){
      
        var level4=document.getElementById('level4')
        var option4 = document.createElement("option");
        option4.value=uniqueLevel4[i];
        option4.text=uniqueLevel4[i];
        level4.add(option4);
    }
    
       
       
}




function getPartsData(assetIdentifier) {
    var headers = {};
    headers['Content-Type'] = 'application/json';
    headers['Accept'] = 'application/json';
    
    $.ajax({
        url: 'https://iot.geopalsolutions.com/iot/c1163_dailyallocations',
        data: {
            asset_identifier: assetIdentifier
        },
        headers: headers,
        type: 'GET',
        
        error: function(e) {
            return Geopal.showText('yes', 'Error: ' + JSON.stringify(e.message) , 'Error');
        },
        success: function(data, textStatus, jqXHR) {
            console.log(data.parts_to_show);
            myParts = data.parts_to_show;
            buildView(myParts);
            
            
        }
        

    

    });
    
}

var myParts = Geopal.getJobWorkflowValueByName('Parts JSON');
var asset_identifier = Geopal.getAssetIdentifier();
$(document).ready(function() {
    
    if (myParts && myParts != ''){
        myParts = JSON.parse(myParts)
        console.log(myParts);
        buildView(myParts);
        
    }
    else{
        getPartsData(asset_identifier);
    }
});

  var counter = 0;
		function myFunction() {
		var clickLimit=19;
		if(counter>=clickLimit){
				Geopal.showMessage("Limit reached");
				}
				else{
                      var itm = document.getElementsByClassName("newEntry")[0];
					  var cln = itm.cloneNode(true);
					  document.getElementsByClassName("mainDiv")[0].appendChild(cln);
					  counter++;
					  return true;
  }
  }




