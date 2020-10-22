var photoLimit = 100

var photosTaken = parseInt(Geopal.getJobWorkflowValue());
if (isNaN(photosTaken)){
    photosTaken = 0
}

var success = function(path) {
    photosTaken++
    console.log(path);
    var stepValue = ' Photo Taken';
    if (photosTaken > 1){
        stepValue = ' Photos Taken';
    }
    console.log("Photo " + photosTaken);
    var stepName = "Pre Condition Survey Image " + photosTaken;
    Geopal.setWorkflowFileByName(stepName, path);
    Geopal.setJobWorkflowValueByName(stepName, 'Photo Taken');
    Geopal.setJobWorkflowValue(photosTaken + stepValue);
}

var cancel = function() {
   
}

var ok = function(){
    
}

var options = {
    "annotate": false,
    "overwrite": true
}

options['name'] = "photo_" + photosTaken;

if (photosTaken < photoLimit){
    Geopal.Job.Current.takePhoto("success", "cancel", options) ;
}
else{
    Geopal.showText('ok','You have taken ' + photoLimit + ' photos. You cannot store any more photos against this job.','Limit Reached');
}