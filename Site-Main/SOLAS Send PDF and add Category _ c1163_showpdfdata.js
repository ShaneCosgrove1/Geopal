
/**
 *   
 *   iot project to check if file has been uploaded and then post the files to the Client
 *   
 *   @author: EJ McVey
 *   @date: 29.04.2019
 *
*/
const BASE_URL = 'https://ecm.wardandburke.com/otcs/cs.exe/api/v2/nodes/';

var SENDFILE_URL = 'https://ecm.wardandburke.com/otcs/cs.exe/api/v1/nodes';
const AUTHENTICATION_KEY = 'Basic UmVwb3J0c0BnZW9wYWw6NyNMUk5CQ05AYW9XVlRUTGsyIUd1M2Vk';
const CATEGORY_ID = '5506675';

// get and return category data for a given job
var job
function getCategoryData(jobIdentifier){
    
    var jobIdentifier = jobIdentifier;
    job = Geopal.Job.getJobByIdentifier(jobIdentifier);
        
    var wflows = job.job_workflows;
    
    var categoryData = {};
    
    
// get job created date first
var dateCreated = job.created_on;
// var newdate = new Date(dateCreated);
// var date_created_value = newdate.toISOString();


//FE - change in cat attributes source, taken from asset now not form 04-07-19.
var mapping = {
    'Form Type': '5506675_4',
    'Structure_Name': '5506675_5',
    'Contract_Number': '5506675_6',
    'Customer': '5506675_10', 
    'User_Name': '5506675_7',
    'Email': '5506675_8',
    'Date_Created': '5506675_9',
    'Date': '5506675_2' 
};

var assigned_to_name =
  job.assigned_to.first_name + '.' + job.assigned_to.last_name;
  
    categoryData[mapping['Structure_Name']] = '';
categoryData[mapping['Contract_Number']] = job.asset.identifier;
categoryData[mapping['Customer']] = job.asset.name;
categoryData[mapping['User_Name']] = assigned_to_name;
categoryData[mapping['Email']] = assigned_to_name + '@wardandburke.com';
categoryData[mapping['Date_Created']] = dateCreated;

    // loop through workflows and get values for our categoryData object
    var length = wflows.length;
    for(var i = 0; i < length; i++){
        
        var wflow = wflows[i];
        var name = wflow.name;
        var value = wflow.action_value_entered;
        
        if(mapping.hasOwnProperty(name)) {
            
            if(name == 'Date'){
                
                value = value + 'T00:00:00Z';
                categoryData[mapping[name]] = value;
                
            }else {
                categoryData[mapping[name]] = value;
            }
        }
    }
    return categoryData;
}

/////////////////////////
// MAIN EXECUTION
/////////////////////////

var headers = {
    'Authorization': AUTHENTICATION_KEY
};

if (Geopal.Input.isFileUploadSuccessful('file')) {
    
    var parentId = Geopal.Input.request('parent_id');
    var fileName = Geopal.Input.request('name');
    var type = Geopal.Input.request('type');
    var jobIdentifier = Geopal.Input.request('job');
    
    Geopal.Log.setExtraField2('params inputted');
    Geopal.Log.setExtraField3('File Folder: ' + parentId);
    
    
    var params = {
        parent_id: parentId,
        name: fileName,
        type: type
    };
    
    
    var fileUploads = {
        'file' : {
            type: 'uploadedfile',
            key: 'file'
        }
    };
    
    //send pdf file to SOLAS
    var response = Geopal.HttpClient.postFiles(SENDFILE_URL, params, fileUploads, headers);
    
    Geopal.IoTField.set('raw_data',response.body);
    
    var body = JSON.parse(response.body);
    
    if(!body.hasOwnProperty('error')) {
        
        //add category information for the file
        var fileId = body.id;
        Geopal.Log.setExtraField4('File: ' + fileId);
        
        categoryData = getCategoryData(jobIdentifier); 
         
         // todo: remove sample categoryData before go live 
        //categoryData = {"5506675_2":"2019-06-01T00:00:00","5506675_9":"Date_Created","5506675_8":"Email","5506675_6":"C000","5506675_4":"Form Type","5506675_5":"Structure_Name","5506675_7":"User_Name"};
        
        categoryData = JSON.stringify(categoryData);
        Geopal.Log.setExtraField5(categoryData);
        
        // Geopal.IoTField.set('category_data',response.body.category_data);// todo add categorydata (after it has been stringified) to the extra field, to see what is in it.
        categoryData = encodeURIComponent(categoryData);
        // category update rest uri
        var category_uri = BASE_URL + fileId + 
                            "/categories/?id=" + fileId + 
                            "&category_id=" + CATEGORY_ID + 
                            '&body=' + categoryData;
        
        
        var response = Geopal.HttpClient.post(category_uri, {}, headers);
        Geopal.IoTField.set('category_data', response.body);
        //Geopal.Output.printString(response.body);
    
    }
    else {
        throw new Error(body.error);
    }
}

else{
    throw new Error('No File Uploaded');
}


