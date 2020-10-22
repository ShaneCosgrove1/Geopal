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
 *
 *
 *
 *  UPDATED - Will now create folder structure based off parent folder specified as ecmFolderName string, acquired from the Form itself.
 *  Searches in order for monthFolder, yearFolder, ecmFolderName - at each step it will create the required folders
 *  ie, create month folder if year folder is found etc.
 *  Update - Now Checks name of folder against search results and picks matching one.
 *
 *  @author: Franky
 *  @date: 04.09.2019
 *
 *
 */

// ////////////////////
// MAIN EXECUTION
// ///////////////////
const AUTHENTICATION_KEY = 'Basic UmVwb3J0c0BnZW9wYWw6NyNMUk5CQ05AYW9XVlRUTGsyIUd1M2Vk';
var FORMAT_WORKFLOW = 'Filename Template';
var format_to_parse = '%JOB_TEMPLATE_NAME% for %ASSET_IDENTIFIER% by  %ASSIGNED_TO_NAME% - Geopal %JOB_IDENTIFIER%';

var logme3 = '';
var logme5 = '';
var use_default_text = true;

var jobData = JSON.parse(Geopal.Input.request('job-data'));
var jobID = jobData.identifier;
Geopal.Log.setExtraField2('Job: ' + jobID);

var job = Geopal.Job.getJobByIdentifier(jobID);
var job_dataB_ID = job.id;

var job_wfs = job.job_workflows;
var template_id = job.template_id;
// log5('template_id', template_id);
// log5('job templateId:', job.template_id);
var assigned_to_name = job.assigned_to.first_name + '_' + job.assigned_to.last_name;

var SOLASJobIDValue;
var ecmFolderName; // = 'Ga2 Form'; //  << TEMP set, revert to blank for Prod.
var assetIdentifier;
var dateCompleted;

for (var i = 0; i < job_wfs.length; i++) {
    if (job_wfs[i].name === 'Date') {
        dateCompleted = job_wfs[i].action_value_entered; // eg '2019-08-09'
    }
    if (job_wfs[i].name === 'SOLASFolder') {
        ecmFolderName = job_wfs[i].action_value_entered ? job_wfs[i].action_value_entered : job_wfs[i].action_values;
    }
    if (job_wfs[i].name === 'SOLASJobId') {
        SOLASJobIDValue = job_wfs[i].action_values;
    }
    if (job_wfs[i].name === 'Job Name' || job_wfs[i].name === 'Job Name (for PDF)') {
        assetIdentifier = job_wfs[i].action_value_entered;
        // log5('JobName',assetIdentifier);
        assetIdentifier = assetIdentifier.match(/c\d\d\d/i);
        assetIdentifier = assetIdentifier[0];
        // log5('JobCode', assetIdentifier);
    }
    if (job_wfs[i].name == FORMAT_WORKFLOW) {
        if (job_wfs[i].action_values) {
            // format_to_parse = job_wfs[i].action_values;
            // Change - allows you to change the Filename Template after the Form has been through Runbook
            // will use default for unchanged forms
            format_to_parseA = job_wfs[i].action_values;
            format_to_parseAV = job_wfs[i].action_value_entered;
            format_to_parseAV == '' ? (format_to_parse = format_to_parseA) : (format_to_parse = format_to_parseAV);
            use_default_text = false;
        }
    }
}

// Date Extraction for Search
const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];
// dateCompleted = new Date('2018-07-09');  // Test Dates Override
dateCompleted = new Date(dateCompleted);
var dateCompletedYear = dateCompleted.getFullYear();
var dateCompletedMonth = monthNames[dateCompleted.getMonth()];
//
// Naming Formats for Searched \ Created Folders
//
var yearFolder = [dateCompletedYear, '-', ecmFolderName].join(' ');
var monthFolder = [
    (dateCompleted.getMonth() < 9 ? '0' : '') + (dateCompleted.getMonth() + 1),
    dateCompletedMonth,
    dateCompletedYear,
    '-',
    ecmFolderName,
].join(' ');

// var yearFolder = [dateCompletedYear, '-', ['[', ']'].join(ecmFolderName)].join(' ');
// var monthFolder = [dateCompletedMonth, dateCompletedYear, '-', ['[', ']'].join(ecmFolderName)].join(' ');

var getFileParentFolderId = function(assetIdentifier, ecmFolderName) {
    // var mainData = {};
    // var projectName;
    // var projectID;
    // assetIdentifier = JOB Code
    // -------------- FIRST HTTP CALL ------------- //
    // API Search for Job Code eg, 'C588' & Project Folders only
    var url = 'https://ecm.wardandburke.com/otcs/cs.exe/api/v2/search?where=OTSubType:202%20and%20' + assetIdentifier;

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

    /* --------SEARCH monthFolder ----------
     *  API Search for Destination Folder
     *  format: 08 August 2019 - [Form Name]
     */
    var url2 =
        'https://ecm.wardandburke.com/otcs/cs.exe/api/v2/search?where=OTSubType:0%20and%20"' +
        encodeURIComponent(monthFolder) +
        '"%20and%20OTOwnerID:' +
        info.ownerID;
    // Need owner id before this line

    // Search Folder + YEAR + MONTH
    var httpRes2 = Geopal.HttpClient.post(url2, params, headers);

    if (processResponse2(httpRes2) == true) {
        
        projects = JSON.parse(httpRes2.body).results;
        foundMonthFolderID = filterFolders(projects, monthFolder);
        log5('Found Folder', foundMonthFolderID);
        info.mainData = httpRes2.results;
        info.projectID = foundMonthFolderID; // projects[0].data.properties.id;
        return info;
    } else {
        log5('Not Found (monthFolder)', monthFolder);
        /* --------SEARCH yearFolder ----------
         *  API Search for Destination Folder
         *  format: 2019 - [Form Name]
         */
        var url2 =
            'https://ecm.wardandburke.com/otcs/cs.exe/api/v2/search?where=OTSubType:0%20and%20"' +
            encodeURIComponent(yearFolder) +
            '"%20and%20OTOwnerID:' +
            info.ownerID;

        httpRes3 = Geopal.HttpClient.post(url2, params, headers);

        if (processResponse2(httpRes3) == true) {
            // httpRes3 Folder + Year Found >> Create Month, get ID, move along

            projects = JSON.parse(httpRes3.body).results;
            // eg results[0-4]: [{"data":{"properties":{"container":true,"container_size":1,"create_date":"2019-09-04T12:13:19Z","create_user_id":3

            foundYearFolderID = filterFolders(projects, yearFolder);
            log3('[foundYearFolderID]', foundYearFolderID);

            // var foundYearFolderID = projects[0].data.properties.id; // ID of found YEAR folder
            createdMonthFolder = createFolder(
                // ecmFolderName + ' ' + dateCompletedMonth,
                monthFolder,
                foundYearFolderID
            );
            info.mainData = projects; // JSON.parse(httpRes4.body).results;
            info.projectID = createdMonthFolder;
            // log5('httpRes3: createdMonthFolder', createdMonthFolder);
            return info;
        } else {
            log5('Not Found (yearFolder)', yearFolder);
            /* --------SEARCH ecmFolderName ----------
             *  API Search for Destination Folder
             *  format: [Form Name]
             */
            var url2 =
                'https://ecm.wardandburke.com/otcs/cs.exe/api/v2/search?where=OTSubType:0%20and%20"' +
                encodeURIComponent(ecmFolderName) +
                '"%20and%20OTOwnerID:' +
                info.ownerID;

            httpRes4 = Geopal.HttpClient.post(url2, params, headers);

            if (processResponse2(httpRes4) == true) {
                // httpRes4 Folder Found >> >> Create Month + Year, get ID, move along
                // log5('httpRes4', httpRes4);

                projects = JSON.parse(httpRes4.body).results;

                for (var j = 0; j < projects.length; j++) {
                    var ancestors = projects[j].links.ancestors;

                    for (var k = 0; k < ancestors.length; k++) {
                        if (ancestors[k].name !== '01 Tender' && ancestors[k].name === '02 Contract') {
                            info.mainData = projects[j];
                            info.projectID = projects[j].data.properties.id;
                            // log5('projectID', info.projectID);
                            // log5('mainData', info.mainData);
                        }

                        // TODO: else, Break Error! Folder not Found!
                        // add success situation where 01 Tender\*folder* does not exist
                    }
                }
                // folderNameFolder = filterFolders(projects,ecmFolderName)
                folderNameFolder = info.projectID; // ID of FolderName folder
                createdYearFolder = createFolder(yearFolder, folderNameFolder);
                log3('[httpRes4: createdYearFolder]', createdYearFolder);
                createdMonthFolder = createFolder(monthFolder, createdYearFolder);
                log3('[httpRes4: createdMonthFolder]', createdMonthFolder);
                info.mainData = projects; // JSON.parse(httpRes4.body).results;
                info.projectID = createdMonthFolder;
                return info;
            } else {
                log5('Not Found (ecmFolderName)', ecmFolderName);
                throw new Error('Error httpRes4: ' + ecmFolderName + ' not found in Job ' + info.ownerID);
            }
        }
    }

    /**
     * Check name matches, if search has multiple folder results
     * @param {object} arr array or project results found from http.req
     * @param {string} parentFolder name of parent to search
     * @return {int}  ID of correct parent folder
     */
    // Add Parent Name Check Here
    function filterFolders(arr, parentFolder) {
        var resultFF;
        // arr = mmYYNameList.results; // expects object
        for (key in arr) {
            if ({}.hasOwnProperty.call(arr, key)) {
                r = arr[key].data.properties;
                log3('[parentFolder]', parentFolder);
                log3('[ff r.name]', r.name);

                //if (parentFolder.localeCompare(r.name, undefined, { sensitivity: 'accent' }) === 0) {
                    if (parentFolder.toLocaleLowerCase() === r.name.toLocaleLowerCase() ) {
                    resultFF = r.id;
                    log5('ff result', resultFF);
                    break;
                } else {
                    // throw new Error('Error filterFolders: ' + r.name + ' not found in Search Results ');
                }
            }
        }
        
        if (resultFF) {

            return resultFF;
        } else {
            throw new Error('Error filterFolders: ' + r.name + ' not found in Search Results ');
        }
    }

    /**
     * Check name matches, if search has multiple folder results
     * @param {object} input http response object
     * @return {boolean}
     */
    function processResponse2(input) {
        var test = JSON.parse(input.body).collection.paging.total_count;
        // log5('processResponse2', test);
        if (test === 0) {
            //  throw new Error('Error [processResponse2]:No results found in Search Results ');
            return false;
        } else {
            projects = JSON.parse(httpRes2.body).results;
            return true;
        }
        // log5('projects',projects);
    }
    // function processResponse(input) {
    //     var projects = JSON.parse(input.body).results;
    //     log5('projects', projects);
    //     if (
    //         Object.keys(projects).length === 0 &&
    //         projects.constructor === Object
    //     ) {
    //         return false;
    //     } else {
    //         return projects;
    //     }
    //     // log5('projects',projects);
    // }
};
/**
 * create folder on ECM via Rest API
 * @param {string} name
 * @param {int} parent
 * @return {int}  ID of created folder
 */
function createFolder(name, parent) {
    // log5('createFolder inputs', name + ' ' + parent);
    var paramsCreate = {
        // type: 0, // parent_id:parent, // name: name,
    };
    var headers = {
        Authorization: AUTHENTICATION_KEY,
    };
    // var httpRes = Geopal.HttpClient.post(url, params, headers);
    // var results = JSON.parse(httpRes.body).results;
    var url =
        'https://ecm.wardandburke.com/otcs/cs.exe/api/v1/nodes/?type=0&parent_id=' +
        parent +
        '&name=' +
        encodeURIComponent(name);
    results = Geopal.HttpClient.post(url, paramsCreate, headers);
    results = JSON.parse(results.body);
    // log5('createFolder results', results);
    return results.id;
}

var getTemplateName = function(templateId) {
    var all_templates = Geopal.Api.get('api/jobtemplates/all', Geopal.Employee.getIoTEmployee().id, {});
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
var sendToPDF = function(jobDB_id, jobIdentifier, templateID, parentID, fileName, jobCode) {
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

    var result = Geopal.Api.post('api/jobreports/singlecustompdf', Geopal.Employee.getIoTEmployee().id, params);
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
    // var templateId = 30678; // Testing - Set to static

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
log5('assetIdentifier', assetIdentifier);

if (assetIdentifier) {
    var fileFolderInfo = getFileParentFolderId(assetIdentifier, ecmFolderName);

    var template_name = getTemplateName(template_id);

    var fileName = format_to_parse;
    log5('fileName:', fileName);

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
    // log5('fileFolderInfo', fileFolderInfo)
    // ///////////////////////
    // SEND FILE
    // //////////////////////

    var latestTemplate = returnLatestTemplate(template_id);

    var sendPDF = sendToPDF(job_dataB_ID, jobID, latestTemplate, projID, fileN, assetIdentifier);
    // log5('sendPDF', vartx = [job_dataB_ID, jobID, latestTemplate, projID, fileN, assetIdentifier]);
    result.pdf_sent = sendPDF;
    Geopal.Log.setExtraField1('PDF Result: ' + JSON.stringify(result.pdf_sent));
    // Geopal.Output.printJson(result);
} else {
    throw new Error('No Project Found');
}

// log5 (255 Char limit)
function log5(text, varName) {
    if (typeof varName === 'object') {
        varName = JSON.stringify(varName);
    }
    logme3 != '' ? (logme3 += '\n' + text + ': ' + varName) : (logme3 += text + ': ' + varName);
    Geopal.Log.setExtraField5(logme3);
}

// log5 (255 Char limit)
function log3(text, varName) {
    if (typeof varName === 'object') {
        varName = JSON.stringify(varName);
    }
    logme5 != '' ? (logme5 += '\n' + text + ': ' + varName) : (logme5 += text + ': ' + varName);
    Geopal.Log.setExtraField3(logme5);
}
