/** This step, while checking in the user, will also take data from specific
* asset fields of the attached asset and store them in job workflows. It also
* increments the Pour Number of the structure asset and sets the parent asset
* id into a job field
*
* @author: Brian Storrs
* @date:   22-09-2017
*
* */
// ************************************
// Taken from Job Template+AssetIn-Out
// ************************************
Geopal.Job.Current.forceCheckIn();
Geopal.setJobWorkflowValueByName('Hidden Check In', 'Complete');

let employeeId = Geopal.getJobEmployeeId();
let identifier = Geopal.getAssetIdentifier();
let assetName = Geopal.getAssetName();

let contract_number_field = 'Contract Number';

let contract_name_field = 'Contract Name';


let failed = function() {
  console.log(this);
  Geopal.showMessage('Data pull failed');
};

let getCompanyName = function(asset) {
  console.log('company: ' + asset.asset_customer.name);
  let companyName = asset.asset_customer.name;
  Geopal.setJobFieldValueByName('Customer', companyName);
  Geopal.setJobWorkflowValue('Complete');
};

let getAssetContractNumber = function(assetField) {
  console.log('contract no: ' +assetField.action_value_entered);
  let assetFieldValue = assetField.action_value_entered;
  Geopal.setJobFieldValueByName('Contract Number', assetFieldValue);
  Geopal.Asset.getByIdentifierAsync('getCompanyName', 'failed', identifier);
};

let getContractName = function(assetField) {
  console.log('contract: ' + assetField.action_value_entered);
  let contractName = assetField.action_value_entered;
  Geopal.setJobFieldValueByName('Contract Name', contractName);
  Geopal.Asset.getAssetFieldByNameAsync('getAssetContractNumber', 'failed', identifier, contract_number_field);
};

Geopal.setJobWorkflowValueByName('Employee ID', employeeId);
Geopal.setJobFieldValueByName('Asset Name', assetName);
Geopal.Asset.getAssetFieldByNameAsync('getContractName', 'failed', identifier, contract_name_field); // not passing through company - 4th param
