var asset = Geopal.getAssetIdentifier().toLowerCase();  //eg C614_J
var emailModifier = Geopal.getJobFieldValueByName('EmailModifier').toLowerCase(); //contained in asset [optional]

if (asset.length > 4){
    //asset = asset.substring(0,5);
    asset = asset.replace(/\_.+/g, '');  //match '_'followed by a letter and everything after, replace with blanks
}

var template_name = Geopal.getJobTemplateName().replace(/[^a-zA-Z]*/g, '').toLowerCase();

var email = asset + emailModifier + template_name + '@elink.wardandburke.com';

Geopal.setJobWorkflowValueByName('PDF Email', email);

Geopal.setJobWorkflowValueByName('Hidden Check Out', 'Complete');
Geopal.setJobWorkflowValue('Complete');
Geopal.Job.Current.forceCheckOut();
Geopal.finish();