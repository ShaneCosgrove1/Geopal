/* eslint-disable no-var */
/* eslint-disable camelcase */
// var jobID = 4235;

/**
 *  iot project to make http calls to get parent folder ID of an asset and find a specific project folder ID and info.
 *
 *  replace default data with field and workflow values of the project
 *
 *  create a pdf with the data and send to next iot project to send to the client's system.
 *
 *  @author: EJ McVey
 *  @date: 29.04.2019
 */


// ////////////////////
// MAIN EXECUTION
// ///////////////////
var logme = '';
var use_default_text = true;

var jobData = JSON.parse(Geopal.Input.request('job-data'));
var jobID = jobData.identifier;
// Geopal.Log.setExtraField2('Job: ' + jobID);

var job = Geopal.Job.getJobByIdentifier(jobID);
var job_dataB_ID = job.id;

var job_wfs = job.job_workflows;
var template_id = job.template_id;
logger('template_id', template_id);
// logger('job templateId:', job.template_id);
var assigned_to_name =
  job.assigned_to.first_name + '_' + job.assigned_to.last_name;


var SOLASJobIDValue;
var ecmFolderName;
var assetIdentifier;

for (var i = 0; i < job_wfs.length; i++) {
    if (job_wfs[i].name === 'SOLASFolder') {
        ecmFolderName = job_wfs[i].action_values;
    }
    if (job_wfs[i].name === 'SOLASJobId') {
        SOLASJobIDValue = job_wfs[i].action_values;
    }
    if (job_wfs[i].name === 'Job Name') {
        assetIdentifier = job_wfs[i].action_value_entered;
        // logger('JobName',assetIdentifier);
        assetIdentifier = assetIdentifier.match(/c\d\d\d/i);
        assetIdentifier = assetIdentifier[0];
    // logger('JobCode', assetIdentifier);
    }
    if (job_wfs[i].name == FORMAT_WORKFLOW) {
        if (job_wfs[i].action_values) {
            format_to_parse = job_wfs[i].action_values;
            use_default_text = false;
        }
    }
}

// logme += 'assetIdentifier: ' + assetIdentifier
// + '\nSolasFolder: ' + ecmFolderName //JSON.stringify(assetIdentifier));

// Geopal.Log.setExtraField5(logme)
// Geopal.Log.setExtraField3('Solas Folder: ' + ecmFolderName);

const AUTHENTICATION_KEY =
  'Basic UmVwb3J0c0BnZW9wYWw6NyNMUk5CQ05AYW9XVlRUTGsyIUd1M2Vk';
var FORMAT_WORKFLOW = 'Filename Template';
var format_to_parse =
  '%JOB_TEMPLATE_NAME% for %ASSET_IDENTIFIER% by  %ASSIGNED_TO_NAME% - Geopal %JOB_IDENTIFIER%';

var getFileParentFolderId = function(assetIdentifier, ecmFolderName) {
    // assetIdentifier = JOB Code
    // -------------- FIRST HTTP CALL ------------- //
    var url =
    'https://ecm.wardandburke.com/otcs/cs.exe/api/v2/search?where=OTSubType:202%20and%20' +
    assetIdentifier;
    // logger('firstcall',assetIdentifier);

    var headers = {
        Authorization: AUTHENTICATION_KEY,
    };
    var params = {};

    var httpRes = Geopal.HttpClient.post(url, params, headers);

    var results = JSON.parse(httpRes.body).results;

    var data = results[0].data.properties;

    var info = {
    // ownerID: data.id,
        name: data.name,
    };

    // Grab SOLASJobID from Asset OR use specified value from Query to ECM
    Geopal.Log.setExtraField4('SOLASJobIDValue: ' + JSON.stringify(SOLASJobIDValue));

    if (SOLASJobIDValue) {
        info.ownerID = SOLASJobIDValue.action_value_entered;
    } else {
        info.ownerID = data.id; // JobID eg 2223229 Midlands
    }
    // logger('info.ownerID', info.ownerID);
    // --------SECOND HTTP CALL---------- //
    var encodedEcmFolderName = encodeURIComponent(ecmFolderName);
    var url2 =
    'https://ecm.wardandburke.com/otcs/cs.exe/api/v2/search?where=OTSubType:0%20and%20"' +
    encodedEcmFolderName +
    '"%20and%20OTOwnerID:' +
    info.ownerID;
    // Need owner id before this line
    // logger('ecmFolderName',ecmFolderName);
    var httpRes2 = Geopal.HttpClient.post(url2, params, headers);

    var projects = JSON.parse(httpRes2.body).results;
    if (Object.keys(projects).length === 0 && projects.constructor === Object) {
        throw new Error(ecmFolderName + ' not found in Job ' + info.ownerID );
    }
    logger('projects',projects);
    var mainData = {};
    var projectName;
    var projectID;

    for (var j = 0; j < projects.length; j++) {
        var ancestors = projects[j].links.ancestors;

        for (var k = 0; k < ancestors.length; k++) {
            if (
                ancestors[k].name !== '01 Tender' &&
        ancestors[k].name === '02 Contract'
            ) {
                mainData = projects[j];
                projectID = mainData.data.properties.id;
            }
            // TODO: else, Break Error! Folder not Found!
            // add success situation where 01 Tender\*folder* does not exist
        }
    }
    if (projectID == null || projectID == '') {
        throw new Error(ecmFolderName + ' not found in Job ' + info.ownerID );
    }
    // logger('projectID',projectID);
    info.mainData = mainData;
    info.projectID = projectID;

    return info;
};

var getTemplateName = function(templateId) {
    var all_templates = Geopal.Api.get(
        'api/jobtemplates/all',
        Geopal.Employee.getIoTEmployee().id,
        {}
    );
    all_templates = JSON.parse(all_templates.body).job_templates;

    var template_name = '';

    for (var i = 0; i < all_templates.length; i++) {
        if (all_templates[i].job_template_id == templateId) {
            template_name = all_templates[i].name;
        }
    }
    return template_name;
};

var getStepNames = function(matches) {
    var namesToFind = [];
    for (var i = 0; i < matches.length; i++) {
        var current_name = matches[i].slice(1, -1);
        namesToFind.push(current_name);
    }

    return namesToFind;
};

var createNameValues = function(steps, values2find) {
    var values2names = {};

    for (var i = 0; i < steps.length; i++) {
        var step_name = steps[i].name;
        var step_value = steps[i].action_value_entered;
        for (var j = 0; j < values2find.length; j++) {
            current_field = values2find[j];
            if (step_name == current_field) {
                values2names[current_field] = step_value;
            }
        }
    }

    return values2names;
};
//   callback_url: 'https://iot.geopalsolutions.com/iot/c1154_ecmpdfsend',

// var sendPDF = sendToPDF(job_dataB_ID, jobID,   latestTemplate, projID,   fileN,     assetIdentifier);
//                        jobDB_id,  jobIdentifier, templateID,   parentID,  fileName,  jobCode
var sendToPDF = function(
    jobDB_id,
    jobIdentifier,
    templateID,
    parentID,
    fileName,
    jobCode
) {
    var params = {

        job_id: jobDB_id, // Geopal.Job.getJobByIdentifier(jobID);
        template_report_id: templateID,
        // callback_url: 'https://GeoPal.Danielle:1NqPxnpK94ix@ecm.wardandburke.com/otcs/cs.exe/api/v1/nodes',
        // callback_url: 'https://app.geopalsolutions.com/iot/c1163_showpdfdata',
        callback_url: 'https://iot.geopalsolutions.com/iot/c1154_ecmpdfsend',
        callback_params: {
            job: jobIdentifier,
            parent_id: parentID,
            name: fileName,
            type: 144,
            job_Code: jobCode,
        },
    };

    var result = Geopal.Api.post(
        'api/jobreports/singlecustompdf',
        Geopal.Employee.getIoTEmployee().id,
        params
    );
    var body = JSON.parse(result.body);
    return body;
};

function returnLatestTemplate(templateId) {
    const result = Geopal.Api.get(
        'api/jobreports/templatereports',
        Geopal.Employee.getIoTEmployee().id,
        {}
    // returns the list of all available job statuses
    );

    const apicallinfo = JSON.parse(result.body);
    var statuses = apicallinfo.template_reports;
    var currentTemplate = [];

    // cant use map or => or let
    for (var i = 1, len = statuses.length; i < len; i++) {
        if (statuses[i].template_id == templateId) {
            // template_id
            currentTemplate.push({
                id: statuses[i].id,
                template_id: statuses[i].template_id,
            });
        }
    }
    // Geopal.Output.printString(
    //   '::::currentTemplate ' + JSON.stringify(currentTemplate)
    // );

    arr = currentTemplate;
    var min = arr[0];
    var max = arr[0];

    for (var i = 1, len = arr.length; i < len; i++) {
        var v = arr[i];
        min = v.id < min.id ? v : min;
        max = v.id > max.id ? v : max;
    }
    // Geopal.Output.printString('\n ::::min/Max:' + [min.id, max.id]);
    return max.id;
}
// Geopal.Output.printString('\n ::::Returned Value :' + returnLatestTemplate())

// ///////////////////////
// CHANGING FILE NAME
// //////////////////////

if (assetIdentifier) {
    var fileFolderInfo = getFileParentFolderId(assetIdentifier, ecmFolderName);

    var template_name = getTemplateName(template_id);

    var fileName = format_to_parse;

    if (!use_default_text) {
    // check for field values (anything within {})
        var workflows_regex = /\{(.*?)\}/gm;
        var workflow_matches = format_to_parse.match(workflows_regex);

        if (workflow_matches) {
            var workflows2find = getStepNames(workflow_matches);
            var workflowValues = createNameValues(job_wfs, workflows2find);

            for (var name in workflowValues) {
                fileName = fileName.replace('{' + name + '}', workflowValues[name]);
            }
        }

        // check for field values (anything within [])
        var fields = job.job_fields;
        var fields_regex = /\[(.*?)\]/gm;
        var field_matches = format_to_parse.match(fields_regex);

        if (field_matches) {
            var fields2find = getStepNames(field_matches);
            var fieldValues = createNameValues(fields, fields2find);

            for (var name in fieldValues) {
                fileName = fileName.replace('[' + name + ']', fieldValues[name]);
            }
        }
    }

    /* %JOB_TEMPLATE_NAME% for %ASSET_IDENTIFIER% by  %ASSIGNED_TO_NAME% - Geopal %JOB_IDENTIFIER%*/
    // check for template name
    fileName = fileName.replace('%JOB_TEMPLATE_NAME%', template_name);
    // check for job identifier name
    fileName = fileName.replace('%JOB_IDENTIFIER%', jobID);

    // check for asset identifier name

    if (assetIdentifier) {
        fileName = fileName.replace('%ASSET_IDENTIFIER%', assetIdentifier);
    } else {
    // else remove the complete section
        fileName = fileName.replace(' for %ASSET_IDENTIFIER%', '');
    }
    // check for assigned to name
    fileName = fileName.replace('%ASSIGNED_TO_NAME%', assigned_to_name);

    Geopal.Log.setExtraField4('File Name: ' + fileName);

    var result = {
        string: format_to_parse,
        file_name: fileName,
        file_info: fileFolderInfo,
    };


    var projID = fileFolderInfo.projectID;
    // result.file_info.projectID;
    var fileN = result.file_name;
    // logger('fileFolderInfo', fileFolderInfo)
    // ///////////////////////
    // SEND FILE
    // //////////////////////
    logger('assetIdentifier', assetIdentifier);
    var latestTemplate = returnLatestTemplate(template_id);
    var sendPDF = sendToPDF(job_dataB_ID, jobID, latestTemplate, projID, fileN, assetIdentifier);
    Geopal.Log.setExtraField2('SendPDF: ' + [job_dataB_ID, jobID, latestTemplate, projID, fileN, assetIdentifier].join(','));
    result.pdf_sent = sendPDF;
    Geopal.Log.setExtraField1('PDF Result: ' + JSON.stringify(result.pdf_sent));
    // Geopal.Output.printJson(result);
} else {
    throw new Error('No Project Found');
}
// Logger (255 Char limit)
function logger(text, varName){
    if (typeof varName === 'object') { varName = JSON.stringify(varName)
    }
    logme != '' ? logme += '\n' + text +': ' + varName:
        logme += text +': ' + varName;
    Geopal.Log.setExtraField5(logme);
}