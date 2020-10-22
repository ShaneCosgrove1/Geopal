
//looks up the assigned asset and a specifiec asset field
//splits the asset field values by a , and enters the values to the pecified workflows.
var asset = Geopal.getAssetIdentifier()
var assetField = Geopal.Asset.getAssetFieldByName(asset, "Daily Allocation Employees");
var valueEntered = assetField.action_value_entered;
var names = valueEntered.split(',');

for( var i = 0; i < names.length; i++){
    
    var saveNames = names[i];

    if(names[i]==null){
        Geopal.setJobWorkflowValueByName('Name' +i," ");
    }else{
        Geopal.setJobWorkflowValueByName('Name '+ i,saveNames);

    }
    
}