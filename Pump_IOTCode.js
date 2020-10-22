// IOT - PumpForm

var PUMP_FORM_ID = 25920;

var searchOptions = {
    job_template_id: PUMP_FORM_ID,
    export_type: 'json',
    job_status_ids: [3],
    date_from: new Date(new Date().setDate(new Date().getDate() -7)), // Dates to show results on the History Page - FORMAT: '2018-05-01 00:00:00',
    date_to: new Date(),  //  ^^
    select_fields: 'job_id,job_workflow_1461231,job_workflow_1461232,assigned_to_name',
    stop_double_json_encode: true
};

var result = Geopal.Api.get('api/jobreports/standardjobs', Geopal.Employee.getIoTEmployee().id, searchOptions);
var body = JSON.parse(result.body);

var jobs = body.standard_jobs;
var jobsPretty = [];
for (var i = 0; i < jobs.length; i++) {
    var info = {
        name: jobs[i].assigned_to_name,
        date: jobs[i].job_workflow_1461231,
        pressure: jobs[i].job_workflow_1461232
    };
    jobsPretty.push(info);
}
Geopal.Output.printJson({ status: true, data: jobsPretty});