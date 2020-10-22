/** This step, while checking in the user, will also take data from specific 
* asset fields of the attached asset and store them in job workflows. It also 
* increments the Pour Number of the structure asset and sets the parent asset
* id into a job field
* 
* @author: Brian Storrs
* @date:   22-09-2017
*
* @amendment Updated for Routine Instrument Check Form Asset by
* @author: Franky Egan
* @date:   29-03-2018
* 
* */
// fields are filled out in a callback chain, one calls back to the next - failure stops all further

Geopal.Job.Current.forceCheckIn();
Geopal.setJobWorkflowValueByName('Hidden Check In', 'Complete');

var employeeId = Geopal.getJobEmployeeId();
var identifier = Geopal.getAssetIdentifier();
var assetName = Geopal.getAssetName();


var TypeInstrument = 'Type of Instrument';
var AllowDisc = 'Allowable Discrepancy';
var refNo = 'Reference Number';


var failed = function(){   //callback
    console.log(this);
    Geopal.showMessage('Data pull failed');
}


var getAssetrefNo = function(assetField) { //create function
    console.log('Reference Number: ' +assetField.action_value_entered);
    var assetFieldValue = assetField.action_value_entered;  //assign value from Asset
    Geopal.setJobFieldValueByName( refNo, assetFieldValue);  //put value on form by input name
    Geopal.setJobWorkflowValue('Complete'); 
	Geopal.showMessage('Data Pull Completed');
	
};

var getAssetAllowDisc = function(assetField) { //create function
    console.log('Allowable Discrepancy: ' +assetField.action_value_entered);
    var assetFieldValue = assetField.action_value_entered;  //assign value from Asset
    Geopal.setJobFieldValueByName( AllowDisc, assetFieldValue);  //put value on form by input name
    Geopal.Asset.getAssetFieldByNameAsync('getAssetrefNo', 'failed', identifier, refNo);  // (success, fail, identifier )
};

var getAssetInsType = function(assetField) { //create function
    console.log('Type of Instrument: ' +assetField.action_value_entered);
    var assetFieldValue = assetField.action_value_entered;  //assign value from Asset
    Geopal.setJobFieldValueByName( TypeInstrument, assetFieldValue);  //put value on form by input name
    Geopal.Asset.getAssetFieldByNameAsync('getAssetAllowDisc', 'failed', identifier, AllowDisc);  // (success, fail, identifier )
};


Geopal.setJobWorkflowValueByName('Employee ID', employeeId);
Geopal.setJobFieldValueByName('Asset Name', assetName);
Geopal.Asset.getAssetFieldByNameAsync('getAssetInsType', 'failed', identifier, TypeInstrument); //not passing through company - 4th param
