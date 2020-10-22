// IOT - PumpForm

var PUMP_FORM_ID = 24749;                                                               // Job Template ID
var reportRange = 27;                                                                   // number of days to report back on
var assetID = Geopal.Input.request('assetID');                                          // expects input variable from Form
//var pumpHours = Geopal.Input.request('pumpHours'); // job_workflow_1391433
//var pumpAmps = Geopal.Input.request('pumpAmps');  job_workflow_1391434

//var fieldsList =["job_id","assigned_to_name","job_workflow_1391568","asset_identifier","job_workflow_1391433","job_workflow_1391434"]//pumpAmps,pumpHours];



var searchOptions = {
    job_template_id: PUMP_FORM_ID,
    export_type: 'json',
    job_status_ids: [3],
    date_from: new Date(new Date().setDate(new Date().getDate() - reportRange)).toISOString().slice(0,10) + ' 00:00:00',                                                       // Dates to show results on the History Page - FORMAT: '2018-05-01 00:00:00',
    date_to: new Date().toISOString().slice(0,10) + ' 00:00:00',
    select_fields:  'job_id,assigned_to_name,job_workflow_1391568,asset_identifier,job_workflow_1391433,job_workflow_1391434',    // Change values to match form inputs 1 of 2 - ORIG 'job_id,job_workflow_1391433,job_workflow_1391434,assigned_to_name',  
    stop_double_json_encode: true,
    asset_identifier: assetID,
};
//Array.prototype.map.call(fieldsList , function(item) { return item; }).join(","),

var result = Geopal.Api.get('api/jobreports/standardjobs', Geopal.Employee.getIoTEmployee().id, searchOptions);
var body = JSON.parse(result.body);

var jobs = body.standard_jobs;
var jobsPretty = [];
for (var i = 0; i < jobs.length; i++) {
    var info = {
        name: jobs[i].assigned_to_name,
        asset: jobs[i].asset_identifier,
        date: jobs[i].job_workflow_1391568,
        hours: jobs[i].job_workflow_1391433 ? jobs[i].job_workflow_1391433 :'Not Entered' ,                                                 // Change values to match form inputs 2 of 2
        amps: jobs[i].job_workflow_1391434  ? jobs[i].job_workflow_1391434 :'Not Entered' ,
    };
    jobsPretty.push(info);
}
Geopal.Output.printJson({ status: true, data: jobsPretty});