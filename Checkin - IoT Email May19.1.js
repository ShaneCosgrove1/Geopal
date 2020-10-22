/** This step, while checking in the user, will also take data from specific 
* asset fields of the attached asset and store them in job workflows. It also 
* increments the Pour Number of the structure asset and sets the parent asset
* id into a job field
* 
* @author: Brian Storrs
* @date:   22-09-2017
* 
* */

/* 
  *Assett info required  \ Line Number
    * Contract Name     #54
    * Contract Number   #47
    * Asset Name        #26
    * Customer          #40
    * SOLASJobID        #59
*/

Geopal.showMessage('isADBEnabled : ' + Geopal.Debug.isADBEnabled());
Geopal.showMessage(
    'isDebuggerConnected : ' + Geopal.Debug.isDebuggerConnected()
);
Geopal.showMessage('...........Enabling Debug:::::::::::');
if (Geopal.Debug.isWebContentsDebuggingEnabled()) {
  Geopal.showMessage(
      'isWebContentsDebuggingEnabled : ' +
      Geopal.Debug.isWebContentsDebuggingEnabled()
  );
}
{
  Geopal.Debug.setWebContentsDebuggingEnabled(true)
    ? Geopal.showMessage('::: Enabled Debug :::')
    : Geopal.showMessage('::: FAILED Enabling Debug :::');
}


Geopal.Job.Current.forceCheckIn();
Geopal.setJobWorkflowValueByName('Hidden Check In', 'Complete');

var employeeId = Geopal.getJobEmployeeId();
var identifier = Geopal.getAssetIdentifier();
var assetName = Geopal.getAssetName();

var contract_number_field = 'Contract Number';

var contract_name_field = 'Contract Name';


var failed = function(){
    console.log(this);
    Geopal.showMessage('Data pull failed');
}

var getCompanyName = function(asset){
    console.log('company: ' + asset.asset_customer.name);
    var companyName = asset.asset_customer.name;
    Geopal.setJobFieldValueByName('Customer', companyName);
    Geopal.setJobWorkflowValue('Complete');
}

var getAssetContractNumber = function(assetField) {
    console.log('contract no: ' +assetField.action_value_entered);
    var assetFieldValue = assetField.action_value_entered;
    Geopal.setJobFieldValueByName('Contract Number', assetFieldValue);
    Geopal.Asset.getByIdentifierAsync('getCompanyName', 'failed', identifier);
};

var getContractName = function(assetField) {
    console.log('contract: ' + assetField.action_value_entered);
    var contractName = assetField.action_value_entered;
    Geopal.setJobFieldValueByName('Contract Name', contractName);
    Geopal.Asset.getAssetFieldByNameAsync('getAssetContractNumber', 'failed', identifier, contract_number_field);
}
// Set Job ID, taken from Asset to Custom Fields
let SOLASJobID = Geopal.getBoundAssetFieldValueByAssetCompanyFieldName('SOLASJobID');
console.log('SOLASJobID',SOLASJobID);
Geopal.setJobFieldValueByName('SOLASJobID', SOLASJobID);
//Geopal.setJobWorkflowValueByName('SOLASJobID', SOLASJobID);

// Set folder, from Custom Fields to Workflow Value
let SOLASFolder = Geopal.getJobFieldValueByName('SOLASFolder {input}')
console.log('SOLASFolder ',SOLASFolder);
Geopal.setJobWorkflowValueByName('SOLASFolder', SOLASFolder);

Geopal.setJobWorkflowValueByName('Employee ID', employeeId);
Geopal.setJobFieldValueByName('Asset Name', assetName);
Geopal.Asset.getAssetFieldByNameAsync('getContractName', 'failed', identifier, contract_name_field); //not passing through company - 4th param
