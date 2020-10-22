/** This step, while checking in the user, will also take data from specific
 * asset fields of the attached asset and store them in job workflows. It also
 * increments the Pour Number of the structure asset and sets the parent asset
 * id into a job field
 *
 * @author: Brian Storrs
 * @date:   22-09-2017
 *
 * */

Geopal.Debug.setWebContentsDebuggingEnabled(true)
  ? Geopal.showMessage('::: Enabled Debug :::')
  : Geopal.showMessage('::: FAILED Enabling Debug :::');

Geopal.Job.Current.forceCheckIn();
Geopal.setJobWorkflowValueByName('Hidden Check In', 'Complete');

var employeeId = Geopal.getJobEmployeeId();
var identifier = 'C588';
var assetName = 'Midlands Framework';
var customer = 'Irish Water321';
var contract_number_field = 'Contract Number';
var contractName = 'Contract Name';

Geopal.setJobFieldValueByName('Customer', customer);
Geopal.setJobWorkflowValue('Complete');
Geopal.setJobFieldValueByName('Contract Number', identifier);
Geopal.setJobFieldValueByName('Contract Name', contractName);
Geopal.setJobWorkflowValueByName('Employee ID', employeeId);
Geopal.setJobFieldValueByName('Asset Name', assetName);

var SOLASJobIDValue = Geopal.getBoundAssetFieldValueByAssetCompanyFieldName(
  'SOLASJobID',
);
Geopal.setJobWorkflowValueByName('SOLASJobID', SOLASJobIDValue);

Action2Value = [
  'Form Type',
  'Structure_Name',
  'Contract_Number',
  'Customer',
  'User_Name',
  'Email',
  'SOLASFolder',
  'Filename Template',
];
Action2Value.forEach(copyPresetCats);
function copyPresetCats(input01) {
  Geopal.setJobWorkflowValueByName(
    input01,
    Geopal.getJobWorkflowActionValueByName(input01),
  );
}
