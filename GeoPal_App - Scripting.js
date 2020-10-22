

if (!String.prototype.startsWith) {
    String.prototype.startsWith = function(searchString, position){
      return this.substr(position || 0, searchString.length) === searchString;
  };
}
/**
 * Scriptable Steps Geopal API.<br/>
 *
 * @class Geopal
 * @module Geopal
 * @for Geopal
 * @main Geopal
 */
var Geopal = {

    /**
     * Dummy id for asset search fields
     */
    DUMMY_ID: -99,

    /*
     * @class Geopal.Dialog
     * @module Geopal
     * @for Dialog
     * @category Dialog
     * @namespace Dialog
     * @main Dialog
     */
    Dialog : {
        /**
         * Shows user date dialog with ok and cancel options. defaults to current date. Date is returned as a string in a yyyy-mm-dd format
         *
         * @for Geopal.Dialog
         * @category Dialog
         * @param {String} callbackSuccess callback if date selected.
         * @param {String} callbackCancel callback if cancel selected
         * @param {JsonObject} json object containing - type{String} can be date, time or datetime which determines view type, date{Date}, ok_label{String} and cancel_label{String}
         * @method showDate
         * @example
         *     var cancelDate = function() {
         *         Geopal.setJobWorkflowValue('Date capture cancelled');
         *      }
         *
         *      var okDate = function(value) {
         *           Geopal.setJobWorkflowValue('Date ok pressed '+value);
         *      }
         *
         *       var options = {
         *           "type":"date",
         *           "date": new Date("2015-03-25")
         *           "ok_label":"Yes",
         *           "cancel_label":"No"
         *       }
         *
         *      Geopal.Dialog.showDate("okDate","cancelDate", options);
         * @since 1.39.xxx
         */
        showDate: function(callbackSuccess, callbackFail, options){
            options.type =options.type == 'time' || options.type == 'datetime'? options.type :'date' ;
            options.date = options.date || new Date();
            options.ok_label = options.ok_label || null;
            options.cancel_label = options.cancel_label || null;

            var date = options.date;

            GeopalDialogsInternal.showDateTime(callbackSuccess, callbackFail, options.type, date.getDate(), date.getMonth(), date.getFullYear(), date.getHours(), date.getMinutes(), options.ok_label, options.cancel_label);
        },

        /**
         * Shows user list dialog with ok and cancel options. Based on options passed
         *
         * @for Geopal.Dialog
         * @category Dialog
         * @param {String} callbackSuccess callback if list item(s) selected.
         * @param {String} callbackCancel callback if cancel selected
         * @param {JsonObject} json object containing - type{String} can be single or multi (defaults to single) which determines view type, title{String}, message{String},
         * values{Array} array list of string values, selected{String/Array} pre-select value or values, ok_label{String} and cancel_label{String}
         * @method showList
         * @example
         *     var cancelList = function() {
         *         Geopal.setJobWorkflowValue('failed '+Geopal.getJobWorkflowValue());
         *      }
         *
         *      var okList = function(value) {
         *           Geopal.setJobWorkflowValue('ok pressed '+item+Geopal.getJobWorkflowValue());
         *      }
         *      var options = {
         *          "title":"this is a title"
         *          "message":"this is a message"
         *          "values":["one","two","three"],
         *          "selected":"one",//can be string or array of strings for multi type
         *          "type":"single",//only accepts single or multi. defaults to single
         *          "ok_label":"Yes",//defaults to ok
         *          "cancel_label":"Do Nothing"//defaults to cancel
         *       }
         *
         *     Geopal.Dialog.showList("okList","cancelList",options)
         * @since 1.39.xxx
         */
        showList: function(callBackEnter, callBackCancel, options) {
            options.type = options.type == 'single'? options.type:'multi' ;
            options.title = options.title || '';
            options.message = options.message || '';
            options.values = options.values || [];
            options.selected = options.selected || '';
            options.ok_label = options.ok_label || null;
            options.cancel_label = options.cancel_label || null;

            var valueString = options.values.toString();
            var selectedString = JSON.stringify(options.selected);

            GeopalDialogsInternal.showList(callBackEnter,callBackCancel,options.type, options.title, options.message, valueString, selectedString, options.ok_label, options.cancel_label)
        },

        /**
         * Shows user enter dialog with ok and cancel options. Based on options passed
         *
         * @for Geopal.Dialog
         * @category Dialog
         * @param {String} callbackSuccess callback if list item(s) selected.
         * @param {String} callbackCancel callback if cancel selected
         * @param {JsonObject} json object containing - type{String} can be number,note or single-line which determines view type, title{String}, message{String},
         * defaultText{String}, validation{JsonObject} optional value only for number type must contain range_from and range_to, ok_label{String} and cancel_label{String}
         * @method showEnterText
         * @example
         *     var cancelEnterText = function() {
         *         Geopal.setJobWorkflowValue('failed '+Geopal.getJobWorkflowValue());
         *      }
         *
         *      var okEnterText = function(value) {
         *           Geopal.setJobWorkflowValue('ok pressed '+item+Geopal.getJobWorkflowValue());
         *      }
         *      var options = {
         *          "title":"this is a title",
         *          "message":"this is a message",
         *          "defaultText":3,
         *          "validation":{"range_from":0,"range_to":10},
         *          "type":"number",
         *          "ok_label":"Yes",
         *          "cancel_label":"Do Nothing"
         *       }
         *
         *     Geopal.Dialog.showEnterText("okEnterText","cancelEnterText",options)
         * @since 1.39.xxx
         */
        showEnterText: function(callBackEnter, callBackCancel, options) {
            options.type =options.type == 'number' || options.type == 'note'? options.type :'single-line' ;
            options.title = options.title || '';
            options.message = options.message || '';
            options.default_text = options.default_text || null;
            options.validation = options.validation || '';
            options.ok_label = options.ok_label || null;
            options.cancel_label = options.cancel_label || null;

            GeopalDialogsInternal.showEnterText(callBackEnter,callBackCancel, options.type, options.title, options.message,
                options.default_text, JSON.stringify(options.validation), options.ok_label, options.cancel_label)
        },

        /**
         * Shows user dialog for displaying text only with ok, maybe and cancel options. Based on options passed
         *
         * @for Geopal.Dialog
         * @category Dialog
         * @param {String} callbackSuccess callback if ok selected.
         * @param {String} callbackNeutral callback if maybe selected. Optional field
         * @param {String} callbackCancel callback if cancel selected. Optional field
         * @param {JsonObject} json object containing - title{String}, text{String},
         * ok_label{String}, neutral_label{String} and cancel_label{String}
         * @method showText
         * @example
         *     var cancelShowText = function() {
         *         Geopal.setJobWorkflowValue('failed '+Geopal.getJobWorkflowValue());
         *      }
         *
         *      var maybeShowText = function() {
         *         Geopal.setJobWorkflowValue('maybe '+Geopal.getJobWorkflowValue());
         *      }
         *      var okShowText = function(value) {
         *           Geopal.setJobWorkflowValue('ok pressed '+item+Geopal.getJobWorkflowValue());
         *      }
         *      var options = {
         *          "title":"this is a title",
         *          "text":"once upon a time",
         *          "ok_label":"Yes",
         *          "neutral_label":"maybe",
         *          "cancel_label":"Do Nothing"
         *       }
         *
         *     Geopal.Dialog.showText("okShowText","maybeShowText","cancelShowText",options)
         * @since 1.39.xxx
         */
        showText: function(arg1, arg2, arg3, arg4) {
            switch(arguments.length){
                case 4://arg1 enter, agr2 neutral, arg3 cancel, arg4 options
                    arg4.title = arg4.title || '';
                    arg4.text = arg4.text || '';
                    arg4.ok_label = arg4.ok_label || null;
                    arg4.neutral_label = arg4.neutral_label || null;
                    arg4.cancel_label = arg4.cancel_label || null;

                    GeopalDialogsInternal.showText(arg1, arg2, arg3, arg4.title, arg4.text, arg4.ok_label, arg4.neutral_label, arg4.cancel_label);
                    break;
                case 3://arg1 enter, agr2 cancel, arg3 options
                    arg3.title = arg3.title || '';
                    arg3.text = arg3.text || '';
                    arg3.ok_label = arg3.ok_label || null;
                    arg3.neutral_label = arg3.neutral_label || null;
                    arg3.cancel_label = arg3.cancel_label || null;

                    GeopalDialogsInternal.showText(arg1, null, arg2, arg3.title, arg3.text, arg3.ok_label, arg3.neutral_label, arg3.cancel_label);
                    break;
                case 2://arg1 enter, arg2 options
                    arg2.title = arg2.title || '';
                    arg2.text = arg2.text || '';
                    arg2.ok_label = arg2.ok_label || null;
                    arg2.neutral_label = arg2.neutral_label || null;
                    arg2.cancel_label = arg2.cancel_label || null;

                    GeopalDialogsInternal.showText(arg1, null, null, arg2.title, arg2.text, arg2.ok_label, arg2.neutral_label, arg2.cancel_label);
                    break;
            }
        },



        /**
         * Shows dialog box for signature input and saves the signature in a file. The white background will become
         * transparent.
         *
         * @example
         *     var ok = function(filepath) {
         *         Geopal.showMessage(filepath);
         *     };
         *     var cancel = function() {
         *         Geopal.showMessage('Operation canceled');
         *     };
         *     Geopal.showSignatureDialog('ok','cancel','sign this','this is a disclaimer');
         *
         * @method showSignatureDialog
         * @since 1.39.xxx
         * @param {String} callBackOK The name of a callback function to call when the operation is confirmed. The function
         *                            must live in the window scope.
         * @param {String} callBackCancel The name of a callback function to call when the operation is canceled. The
         *                                function must live in the window scope.
         * @param {String} title title of dialog box shown
         * @param {String} disclaimer disclaimer shown above signature area
         */
        showSignatureDialog: function(callBackOK, callBackCancel, title, disclaimer) {
            Geopal.showSignatureDialog(callBackOK, callBackCancel, title, disclaimer);
        },

        /**
         * Show progress dialog with message
         * @for Geopal.Dialog
         * @category Dialog
         * <h4>Remarks</h4>
         * Only one progress dialog may be open at any time.
         *
         * @example
         *     Geopal.Dialog.showProgressDialog('Loading...');
         *     // do some operation that may take a while
         *     Geopal.Dialog.hideProgressDialog();
         *
         * @method showProgressDialog
         * @since 1.39.xxx
         * @param {String} message Optional. Defaults to "processing..."
         */
        showProgressDialog: function(message) {
            message = message || '';
            Geopal.showProgressDialog(message);
        },

        /**
         * Hides current progress dialog.
         * @for Geopal.Dialog
         * @category Dialog
         * @example
         *     Geopal.Dialog.showProgressDialog('Loading...');
         *     // do some operation that may take a while
         *     Geopal.Dialog.hideProgressDialog();
         * @method hideProgressDialog
         * @since 1.39.xxx
         */
        hideProgressDialog: function() {
            Geopal.hideProgressDialog();
        }
    },

    /*
     * @class Geopal.Job
     * @module Geopal
     * @for Job
     * @category Job
     * @namespace Job
     * @main Job
     */
    Job : {

        /**
         * Creates a new job based on parameters passed. If the json passed does not contain an employee key then the job is assigned to the current employee.
         * If the employee key is null the job is created as an unassigned job. Json parameters passed must contain a template_id.
         * Since unassigned jobs cannot have workflows or fields set if the json contains workflows or fields and the employee is null an error will be thrown.
         * Workflows can be passed as an array of json objects with the step name as the key and the set value as the value. Same for fields.
         * Parts can be passed as an array of json objects with the identifier and amount as the key value
         *
         * @for Geopal.Job
         * @category Jobs
         * @param {String} callbackSuccess
         * @param {String} callbackFail
         * @param {JsonObject} json json containing parameters (identifier,status,customer_id,person_id,asset,address,date,time,workflows,fields,parts) for creating a job. Must contain template_id
         * @method create
         * @example
         *        var template = Geopal.getJobTemplateId();
         var status = 1;
         var json = {
                                 "template_id":template,
                                 "status":status,//Only allows some statuses like assigned(1), accepted(6) and completed(3) throws error if passed other statuses
                                 "identifier":"Tara is testing",
                                 "workflows":{"Checkin":"value added","Script Get Job Details":"value added 1"},
                                 "fields":{"Field By Name":"value added","Field By Position":"value added 1"},//same as job workflows
                                 "asset":"P10006",
                                 "date":"2012-10-09",
                                 "time":"11:22",
                                 "address":{//can be lat and long or id but not both
                                    lat:53.349119,
                                    lng:-6.260070,
                                     },
                                 "customer_id":14714,
                                 "person_id":32366,
                                 "parts": {
                                     "P10006":7
                                    }
                                }
         Geopal.Job.create("success", "failed", json);
         */
        create: function(callbackSuccess, callbackFail, json){
            json.identifier = json.identifier || '';
            json.status = json.status || 1;//defaults to status accepted
            json.customer_id = json.customer_id || -1;
            json.person_id = json.person_id || -1;
            json.asset = json.asset || '';
            json.address = json.address || {};
            json.date = json.date || null;
            json.time = json.time || null;
            json.workflows = json.workflows || {};
            json.fields = json.fields || {};
            json.parts = json.parts || {};

            if(!json.hasOwnProperty('employee')){
                json.employee = -1;
            }else if(json.employee == null){
                json.employee = -2;
            }

            GeopalJobCreateInternal.createJob(callbackSuccess,callbackFail,
                json.template_id,
                json.status,
                json.identifier,
                json.date,
                json.time,
                json.address.id,
                json.address.lat,
                json.address.lng,
                json.customer_id,
                json.person_id,
                json.asset,
                JSON.stringify(json.workflows),
                JSON.stringify(json.fields),
                JSON.stringify(json.parts),
                json.employee);
        },

        /**
         * Gets the geopal job template id based on the template name.
         *
         * @for Geopal.Job
         * @category Jobs
         * @param {String} name job template name
         * @method getJobTemplateIdByName
         * @example
         *      Geopal.Job.getJobTemplateIdByName("1 Test");
         * @return {Number} job template id or 0 if not found
         */
        getJobTemplateIdByName: function(name) {
            return GeopalTemplateInternal.getJobTemplateIdByName(name);
        },

        /**
         * Gets the geopal job template id based on the template name.
         *
         * @for Geopal.Job
         * @category Jobs
         * @param {String} callback if successful
         * @param {String} callback if error occurred
         * @param {String} name job template name
         * @method getJobTemplateIdByNameAsync
         * @example
         *      var success = function(template_id) {
         *
         *      };
         *      var fail = function(errorMessage) {
         *         Geopal.showMessage('failed because '+errorMessage);
         *      };
         *      Geopal.Job.getJobTemplateIdByNameAsync('success','fail',"1 Test");
         * @return {Number} job template id or 0 if not found
         * @since 1.39.xxx
         */
        getJobTemplateIdByNameAsync: function(successCallback, failCallback, name) {
            var fn = window[successCallback];
            var template_id = null
            try{
                template_id = GeopalTemplateInternal.getJobTemplateIdByName(name);
            } catch(err) {
                var fn_fail = window[failCallback];
                fn_fail(err);
                return;
            }
            fn(template_id);
        },

        /**
         * Spelling mistake fixed in 1.27.300 see getJobTemplateIdByName for more details
         */
        getJobTemaplateIdByName: function(name) {
            return GeopalTemplateInternal.getJobTemplateIdByName(name);
        },

        /*
         * @class Actions
         * @module Geopal
         * @for Job
         * @category Job
         * @namespace Actions
         */
        Actions : {

            /**
             *
             * @for Geopal.Job.Actions
             * @since 1.38.410
             * @category Job
             * @method takeSignature
             * @param {String} callback for signature taken
             * @param {String} callback for signature failed
             * @param {JsonObject} json object containing the options for the signature. Such as the job identifier and jobworkflow name. A disclaimer can be added by using an optional "disclaimer" key
             * Note: If the job has been created offline it is assigned a temporary identifier and its server id is 0 that will change when synced causing a job not found message to be thrown if old values are used
             * @example
             *      //By jobworkflow name
             *       var options = {
             *          "identifier":"97792",
             *          "jobworkflow_name": "Signature",
             *          "filename": "testing"
             *        }
             *        Geopal.Job.Actions.takeSignature('console.log','console.log',options)
             *
             *      //By jobworkflow position
             *       var options = {
             *          "identifier":"97792",
             *          "jobworkflow_position": 2,
             *          "filename": "testing"
             *        }
             *        Geopal.Job.Actions.takeSignature('console.log','console.log',options)
             *
             *      //By jobworkflow template id
             *        var options = {
             *          "identifier":"97792",
             *          "jobworkflow_template_id": 907886,
             *          "filename": "testing"
             *        }
             *        Geopal.Job.Actions.takeSignature('console.log','console.log',options);
             *
             *      //By jobworkflow name with disclaimer
             *       var   jobIdentifier = Geopal.getJobIdentifier();
             *       var options = {
             *          "identifier":jobIdentifier,
             *          "jobworkflow_name": "Signature",
             *          "filename": "testing",
             *          "disclaimer":"this is from a script"
             *        }
             *        Geopal.Job.Actions.takeSignature('console.log','console.log',options)
             *
             *
             * @throws {Error} An error if there is a query exception
             */
            takeSignature: function(callbackSuccess, callbackFailure, options) {
                options.identifier = options.identifier || '';
                options.server_id = options.server_id || 0;
                options.id = options.id || 0;
                options.jobworkflow_name = options.jobworkflow_name || '';
                options.jobworkflow_position = options.jobworkflow_position || -1;
                options.jobworkflow_template_id = options.jobworkflow_template_id || -1;
                options.filename = options.filename || '';
                options.disclaimer = options.disclaimer || '';

                GeopalJobActionsInternal.takeSignature(callbackSuccess, callbackFailure,
                    options.identifier,options.server_id,options.id,
                    options.jobworkflow_name, options.jobworkflow_position, options.jobworkflow_template_id, options.filename, options.disclaimer);
            },

            setValue: function(options) {
                options.identifier = options.identifier || '';
                options.server_id = options.server_id || 0;
                options.id = options.id || 0;
                options.jobworkflow_name = options.jobworkflow_name || '';
                options.jobworkflow_position = options.jobworkflow_position || -1;
                options.jobworkflow_template_id = options.jobworkflow_template_id || -1;
                options.value = options.value || '';

                GeopalJobActionsInternal.setValue(options.identifier,options.server_id,options.id,
                    options.jobworkflow_name, options.jobworkflow_position, options.jobworkflow_template_id,
                    options.value);

            },

            setFileValue: function(options) {
                if(options.hasOwnProperty('value')){
                    options.identifier = options.identifier || '';
                    options.server_id = options.server_id || 0;
                    options.id = options.id || 0;
                    options.jobworkflow_name = options.jobworkflow_name || '';
                    options.jobworkflow_position = options.jobworkflow_position || -1;
                    options.jobworkflow_template_id = options.jobworkflow_template_id || -1;

                    GeopalJobActionsInternal.setFileValue(options.identifier,options.server_id,options.id,
                        options.jobworkflow_name, options.jobworkflow_position, options.jobworkflow_template_id,
                        options.value);
                }else{
                    throw 'json object must contain a value';
                }

            }

        },

        /*
         * @class Current
         * @module Geopal
         * @for Job
         * @category Job
         * @namespace Current
         */
        Current : {

            /**
             * Gets the jobworkflows as an array of json objects based on the jobworkflows order number between to and from.
             * Gets the job workflows by position.
             *
             * @for Geopal.Job.Current
             * @since 1.15.x
             * @category Job
             * @method getJobWorkflowsByPosition
             * @param {Number} start postion of job workflow order number. zero indexed
             * @param {Number} end position of job workflow order number. zero indexed
             * @example
             *      Geopal.Job.Current.getJobWorkflowsByPosition(0,5);
             * @throws {Error} An error if there is a query exception
             * @return {JsonArray} Json array of json objects containing - done{Boolean}, done_at{Number}, action_values{String}, id{Number},  nested_workflow_id{Number}, optional{Boolean}, name{String}, dirty{Boolean}, action{String}, sent_on{Number}, updated_on{Number}, active{Boolean}, template_workflow_id{Number}, job_id{Number}
             */
            getJobWorkflowsByPosition: function(from, to) {
                return Geopal.response(GeopalJobInternal.getJobWorkflowsByPosition(from, to));
            },

            /**
             * Gets the jobworkflows as an array of json objects based on the jobworkflows template id
             *
             * @for Geopal.Job.Current
             * @since 1.15.x
             * @category Job
             * @method getJobWorkflowsByTemplateIds
             * @param {Array} templateIds array template workflow ids
             * @example
             *      var array = [368022,368027];
             *      Geopal.Job.Current.getJobWorkflowsByTemplateIds(array);
             * @throws {Error} An error if there is a query exception
             * @return {JsonArray} Json array of json objects containing - done{Boolean}, done_at{Number}, action_values{String}, id{Number},  nested_workflow_id{Number}, optional{Boolean}, name{String}, dirty{Boolean}, action{String}, sent_on{Number}, updated_on{Number}, active{Boolean}, template_workflow_id{Number}, job_id{Number}
             */
            getJobWorkflowsByTemplateIds: function(templateIds) {
                var str = JSON.stringify(templateIds);
                return Geopal.response(GeopalJobInternal.getJobWorkflowsByTemplateIds(str));

            },

            /**
             * Gets the jobworkflows as an array of json objects based on the jobworkflows name
             * Gets the job workflows by names.
             *
             * @for Geopal.Job.Current
             * @since 1.15.x
             * @category Job
             * @method getJobWorkflowsByNames
             * @param {Array} names array of jobworkflow names
             * @example
             *      var array = ['Checkin (Not a script)','By Status Id, Set By Name','By Template Id'];
             *      Geopal.Job.Current.getJobWorkflowsByNames(array);
             * @throws {Error} An error if there is a query exception.
             * @return {JsonArray} Json array of json objects containing - done{Boolean}, done_at{Number}, action_values{String}, id{Number},  nested_workflow_id{Number}, optional{Boolean}, name{String}, dirty{Boolean}, action{String}, sent_on{Number}, updated_on{Number}, active{Boolean}, template_workflow_id{Number}, job_id{Number}
             */
            getJobWorkflowsByNames: function(names) {
                var str = JSON.stringify(names);
                return Geopal.response(GeopalJobInternal.getJobWorkflowsByNames(str));
            },

            /**
             * Gets the count of jobworkflows on the device<br/>
             * <br/>
             * @for Geopal.Job.Current
             * @since 1.15.x
             * @category Job
             * @method getCountOfJobWorkflows
             * @example
             *      Geopal.Job.Current.getCountOfJobWorkflows();
             * @throws {Error} An error if there is a query exception
             * @return {Number} number count of workflow steps
             */
            getCountOfJobWorkflows: function() {
                return GeopalJobInternal.getCountOfJobWorkflows();
            },

            /**
             * Checks into  current job. Sets status of job to inprogress
             * Updates time view to time of first workflow step done at
             * @for Geopal.Job.Current
             * @category Job
             * @since 1.19.210
             * @method forceCheckIn
             * @example
             *      Geopal.Job.Current.forceCheckIn();
             */
            forceCheckIn: function() {
                GeopalJobInternal.forceCheckIn();
            },

            /**
             * Checks out of current job. Sets status of job to completed
             * @for Geopal.Job.Current
             * @category Job
             * @method forceCheckOut
             * @since 1.19.210
             * @example
             *      Geopal.Job.Current.forceCheckOut();
             */
            forceCheckOut: function() {
                GeopalJobInternal.forceCheckOut();
            },

            /**
             * Get the lat lng of the current address associated to the current job.
             * Returns 0.0 if no lat lng. The address of the job may not be the location of the user see Geopal.Device.GPS.getLastKnownLocation(); for users location
             * @for Geopal.Job.Current
             * @category Jobs
             * @method getLatLng
             * @since 1.20.910
             * @return {JsonObject} Json Object containing - lat{Number}, lng{Number}. Where lat and lng default to 0.0 if not set
             */
            getLatLng: function() {
                return Geopal.response(GeopalJobInternal.getJobAddressLatLng());
            },

            /**
             * Get the employee associated to the current job
             * @for Geopal.Job.Current
             * @category Jobs
             * @method getEmployee
             * @since 1.33.520
             * @return {JsonObject} Json Object containing -  last_name{String}, id{Number}, first_name{String}, company_id{Number}, title{String}
             */
            getEmployee: function() {
                return Geopal.response(GeopalJobInternal.getJobEmployee());
            },

            /**
             * Bind an asset to the current job. Launches asset search activity
             * @for Geopal.Job.Current
             * @category Jobs
             * @method bindAsset
             * @param {String} identifier identifier of asset
             * @example
             *      var success = function(item) {
             *           try{
             *               Geopal.Job.Current.bindAsset(item);
             *           }catch(e){
             *               Geopal.showMessage(e);
             *           }
             *      };
             *      var fail = function() {
             *
             *      }
             *
             *      Geopal.Scan.scanAsset("success", "fail");
             * @since 1.33.520
             * @return true if successful otherwise throws an error
             */
            bindAsset: function(identifier) {
                return Geopal.response(GeopalJobInternal.bindAsset(identifier));
            },

            /**
             * Take a photo using the phones camera app and uses options to decide next action.
             * If file name is not set then the file return is name as Photo_(time in milliseconds).jpg e.g Photo_1332882000.jpg
             * If file name exists and overwrite flag is not set then datetime in milliseconds is appended to the filename.
             * The original file taken is saved to the jobs steps directory
             * @for Geopal.Job.Current
             * @category Jobs
             * @method takePhoto
             * @param {String} successCallback success callback string
             * @param {String} cancelCallback cancelled callback string
             * @param {JsonObject} json object containing option for "name":{String}, "annotate":{boolean} and "overwrite":{boolean}
             * @example
             *     var success = function(path) {
             *          Geopal.setWorkflowFileByName("Sample Name", path);
             *          Geopal.setJobWorkflowValue('Photo saved');
             *      }
             *
             *      var cancel = function() {
             *         Geopal.setJobWorkflowValue('Photo cancel pressed ');
             *      }
             *
             *      var options = {
             *                           "name":"testing",
             *                           "annotate": true,
             *                           "overwrite": true
             *
             *                        }
             *       Geopal.Job.Current.takePhoto("success", "cancel", options) ;
             *
             * @since 1.36.500
             */
            takePhoto: function(successCallback, failCallback, options) {
                options = options || {
                        "name":"",
                        "annotate": false,
                        "overwrite": false
                    }
                options.name = options.name || '';
                options.annotate = options.annotate || false;
                options.overwrite = options.overwrite || false;
                GeopalScanInternal.takePhoto(successCallback, failCallback, options.name, options.annotate, options.overwrite);
            },

            /*
             * @class JobAssets
             * @module Geopal
             * @for Current
             * @category Job
             * @namespace JobAssets
             */
            JobAssets : {

                /**
                 * Gets all of the parts (job assets) associated with the current job as a json array
                 * @for Geopal.Job.Current.JobAssets
                 * @category Jobs
                 * @method getAll
                 * @example
                 *      Geopal.Job.Current.JobAssets.getAll();
                 * @return {JsonArray} Json array of json objects containing - created_by{Number}, amount{Number}, id{Number}, total_without_tax{Number}, asset{String}, cost_price{Number}, total_with_tax{Number}, created_on{Number}, sales_tax_rate{Number}, selling_price{Number}, updated_by{Number}, updated_on{Number}, selling_price_with_tax{Number} or an empty json array [] if no parts (job assets) found
                 */
                getAll: function() {
                    return Geopal.response(GeopalJobAssetInternal.getAll());
                },

                /**
                 * Get json of the part (job asset) with asset identifier associated with the current job
                 * @for Geopal.Job.Current.JobAssets
                 * @category Jobs
                 * @method get
                 * @example
                 *      Geopal.Job.Current.JobAssets.get("P10006");
                 * @param {String} identifier The string identifier of the asset.
                 * @return {JsonObject} json object containing - created_by{Number}, amount{Number}, id{Number},  total_without_tax{Number}, asset{String}, cost_price{Number}, total_with_tax{Number}, created_on{Number}, sales_tax_rate{Number}, selling_price{Number}, updated_by{Number}, updated_on{Number}, selling_price_with_tax{Number}
                 * @throws {Exception} if asset is not found
                 */
                get: function(identifier) {
                    return Geopal.response(GeopalJobAssetInternal.get(identifier));
                },

                /**
                 * Add the part (job asset) with asset identifier to the current job with the amount passed
                 * @for Geopal.Job.Current.JobAssets
                 * @category Jobs
                 * @method add
                 * @param {String} identifier The string identifier of the asset.
                 * @param {Number} amount The amount of the job asset
                 * @example
                 *      Geopal.Job.Current.JobAssets.add("P10006", 8);
                 * @return {JsonObject} json object containing - created_by{Number}, amount{Number}, id{Number}, total_without_tax{Number}, asset{String}, cost_price{Number}, total_with_tax{Number}, created_on{Number}, sales_tax_rate{Number}, selling_price{Number}, updated_by{Number}, updated_on{Number}, selling_price_with_tax{Number}
                 * @throws {Exception} if asset already exists
                 */
                add: function(identifier, amount) {
                    return Geopal.response(GeopalJobAssetInternal.add(identifier, amount));
                },

                /**
                 * Removes the part (job asset) with asset identifier associated with the current job from the job
                 * @for Geopal.Job.Current.JobAssets
                 * @category Jobs
                 * @method remove
                 * @param {String} identifier The string identifier of the asset.
                 * @example
                 *      Geopal.Job.Current.JobAssets.remove("P10006");
                 * @return {Boolean} true if job asset deleted
                 * @throws {Exception} if sql exception or asset not found
                 */
                remove: function(identifier) {
                    return Geopal.response(GeopalJobAssetInternal.remove(identifier));
                },

                /**
                 * Updates the part (job asset) amount if it is associated with the current job
                 * @for Geopal.Job.Current.JobAssets
                 * @category Jobs
                 * @method update
                 * @param {String} identifier The string identifier of the asset.
                 * @param {Number} amount The amount of the job asset
                 * @example
                 *      Geopal.Job.Current.JobAssets.update("P10006",8);
                 * @return {JsonObject} json object containing - created_by{Number}, amount{Number}, id{Number}, total_without_tax{Number}, asset{String}, cost_price{Number}, total_with_tax{Number}, created_on{Number}, sales_tax_rate{Number}, selling_price{Number}, updated_by{Number}, updated_on{Number}, selling_price_with_tax{Number}
                 * @throws {Exception} if sql exception or job asset not found
                 */
                update: function(identifier, amount) {
                    return Geopal.response(GeopalJobAssetInternal.update(identifier, amount));
                },

                /**
                 * Updates the job asset amount or adds job asset if job asset is not associated with job
                 * @for Geopal.Job.Current.JobAssets
                 * @category Jobs
                 * @method replace
                 * @param {String} identifier The string identifier of the asset.
                 * @param {Number} amount The amount of the job asset
                 * @example
                 *      Geopal.Job.Current.JobAssets.replace("P10006",8);
                 * @return {JsonObject} json object containing - created_by{Number}, amount{Number}, id{Number}, total_without_tax{Number}, asset{String}, cost_price{Number}, total_with_tax{Number}, created_on{Number}, sales_tax_rate{Number}, selling_price{Number}, updated_by{Number}, updated_on{Number}, selling_price_with_tax{Number}
                 * @throws {Exception} if sql exception or asset not found
                 */
                replace: function(identifier, amount) {
                    return Geopal.response(GeopalJobAssetInternal.replace(identifier, amount));
                }
            },
        },
    },

    /*
     * @class Asset
     * @category Asset
     * @module Geopal
     * @namespace Geopal
     */
    Asset : {
        /**
         * Gets a json object of the asset details by identifier
         *
         * @for Geopal.Asset
         * @category Assets
         * @method getByIdentifier
         * @param {String} identifier The string identifier of the asset.
         * @example
         *      Geopal.Asset.getByIdentifier(" TMP:52370GR8ZN");
         * @throws {Error} An error if there is a query exception or asset is not found
         * @return {JsonObject} json object containing - is_deleted{Boolean}, created_on{Number}, updated_on{Number}, identifier{String}, action_value_entered{String}, id{Number}, name{String}, asset_fields{JsonArray}, asset_customer{JsonObject}, asset_company_status{JsonObject}, asset_triggers{JsonArray}, asset_template{JsonObject}
         */
        getByIdentifier: function(assetIdentifier) {
            return Geopal.response(GeopalAssetInternal.getAssetByIdentifier(assetIdentifier));
        },

        /**
         * Gets a json object of the asset details by identifier
         *
         * @for Geopal.Asset
         * @category Assets
         * @since 1.39.xxx
         * @method getByIdentifierAsync
         * @param {String} callback if successful
         * @param {String} callback if error occurred
         * @param {String} identifier The string identifier of the asset.
         * @example
         *      var success = function(asset) {
         *
         *      };
         *      var fail = function(errorMessage) {
         *         Geopal.showMessage('failed because '+errorMessage);
         *      };
         *      Geopal.Asset.getByIdentifier('success', 'fail', " TMP:52370GR8ZN");
         * @throws {Error} An error if there is a query exception or asset is not found
         * @return {JsonObject} json object containing - is_deleted{Boolean}, created_on{Number}, updated_on{Number}, identifier{String}, action_value_entered{String}, id{Number}, name{String}, asset_fields{JsonArray}, asset_customer{JsonObject}, asset_company_status{JsonObject}, asset_triggers{JsonArray}, asset_template{JsonObject}
         */
        getByIdentifierAsync: function(successCallback, failCallback, assetIdentifier) {
            var fn = window[successCallback];
            var asset = null
            try{
                asset =  Geopal.response(GeopalAssetInternal.getAssetByIdentifier(assetIdentifier));
            } catch(err) {
                var fn_fail = window[failCallback];
                fn_fail(err);
                return;
            }
            fn(asset);
        },


        /**
         * Gets a json object of the asset field by name and asset identifier. Queries for first non-deleted asset field with matching name
         *
         * @for Geopal.Asset
         * @category Assets
         * @method getAssetFieldByName
         * @param {String} identifier The string identifier of the asset.
         * @param {String} company field name of the asset field.
         * @since 1.37.200
         * @example
         *      var assetField = Geopal.Asset.getAssetFieldByName(" TMP:52370GR8ZN", "Asset Field 1");
         *      var valueEntered = assetField.action_value_entered;
         *      Geopal.setJobWorkflowValue(valueEntered);
         * @throws {Error} An error if there is a query exception or asset is not found
         * @return {JsonObject} json object example -
         {
         "id":14800,
         "updated_on":1428935326,
         "s3file_id":0,
         "name":"Address",
         "action_value_entered":"",
         "created_on":1428935326,
         "asset_company_field":{
                  "id":872,
                  "is_deleted":false,
                  "created_on":1399540812,
                  "mandatory":false,
                  "name":"Address",
                  "action":"entertext",
                  "updated_on":1399540812,
                  "action_value_entered":"",
                  "required":false,
                  "action_values":""
             }
         }
         */
        getAssetFieldByName: function(assetIdentifier, name) {
            return Geopal.response(GeopalAssetInternal.getAssetFieldByName(assetIdentifier, name));
        },

        /**
         * Gets a json object of the asset field by name and asset identifier. Queries for first non-deleted asset field with matching name
         *
         * @for Geopal.Asset
         * @category Assets
         * @method getAssetFieldByNameAsync
         * @param {String} callback if successful
         * @param {String} callback if error occurred
         * @param {String} identifier The string identifier of the asset.
         * @param {String} company field name of the asset field.
         * @since 1.39.xxx
         * @example
         *      var success = function(assetField) {
         *          var valueEntered = assetField.action_value_entered;
         *          Geopal.setJobWorkflowValue(valueEntered);
         *      };
         *      var fail = function(errorMessage) {
         *         Geopal.showMessage('failed because '+errorMessage);
         *      };
         *      Geopal.Asset.getAssetFieldByName('success', 'fail'," TMP:52370GR8ZN", "Asset Field 1");
         *
         * @throws {Error} An error if there is a query exception or asset is not found
         * @return {JsonObject} see getAssetFieldByName
         */
        getAssetFieldByNameAsync: function(successCallback, failCallback, assetIdentifier, name) {
            var fn = window[successCallback];
            var asset_field = null
            try{
                asset_field =  Geopal.response(GeopalAssetInternal.getAssetFieldByName(assetIdentifier, name));
            } catch(err) {
                var fn_fail = window[failCallback];
                fn_fail(err);
                return;
            }
            fn(asset_field);
        },
        /**
         * Gets a json object of the asset field by  company field id and asset identifier. Queries for first non-deleted asset field
         *
         * @for Geopal.Asset
         * @category Assets
         * @method getAssetFieldByCompanyId
         * @param {String} identifier The string identifier of the asset.
         * @param {Number} company field id of the asset field.
         * @since 1.37.200
         * @example
         *      var assetField = Geopal.Asset.getAssetFieldByCompanyId(" TMP:52370GR8ZN",6);
         *      var valueEntered = assetField.action_value_entered;
         *      Geopal.setJobWorkflowValue(valueEntered);
         * @throws {Error} An error if there is a query exception or asset is not found
         * @return {JsonObject} json object example - see getAssetFieldByName
         */
        getAssetFieldByCompanyId: function(assetIdentifier, id) {
            return Geopal.response(GeopalAssetInternal.getAssetFieldByCompanyId(assetIdentifier, id));
        },

        /**
         * Gets a json object of the asset field by  company field id and asset identifier. Queries for first non-deleted asset field
         *
         * @for Geopal.Asset
         * @category Assets
         * @method getAssetFieldByCompanyIdAsync
         * @param {String} callback if successful
         * @param {String} callback if error occurred
         * @param {String} identifier The string identifier of the asset.
         * @param {Number} company field id of the asset field.
         * @since 1.39.xxx
         * @example
         *      var success = function(assetField) {
         *          var valueEntered = assetField.action_value_entered;
         *          Geopal.setJobWorkflowValue(valueEntered);
         *      };
         *      var fail = function(errorMessage) {
         *         Geopal.showMessage('failed because '+errorMessage);
         *      };
         *      Geopal.Asset.getAssetFieldByCompanyIdAsync('success', 'fail'," TMP:52370GR8ZN",6);
         * @throws {Error} An error if there is a query exception or asset is not found
         * @return {JsonObject} json object example - see getAssetFieldByName
         */
        getAssetFieldByCompanyIdAsync: function(successCallback, failCallback,assetIdentifier, id) {
            var fn = window[successCallback];
            var asset_field = null
            try{
                asset_field =  Geopal.response(GeopalAssetInternal.getAssetFieldByCompanyId(assetIdentifier, id));
            } catch(err) {
                var fn_fail = window[failCallback];
                fn_fail(err);
                return;
            }
            fn(asset_field);
        },

        /**
         * Gets all asset company statuses on device. May not match with the website if device is not fully synced

         * @for Geopal.Asset
         * @category Assets
         * @method getCompanyAssetStatuses
         * @example
         *      Geopal.Asset.getCompanyAssetStatuses();
         * @throws {Error} An error if there is a query exception
         * @return {JsonObject} json object containing - asset_company_statuses{JsonArray} which contains json objects containing - id{Number}, updated_on{Number}, is_deleted{Boolean}, created_on{Number}, color_code{String}, name{string}
         */
        getCompanyAssetStatuses: function(){
            return Geopal.response(GeopalAssetInternal.getCompanyAssetStatuses());
        },

        /**
         * Gets all asset company statuses on device. May not match with the website if device is not fully synced

         * @for Geopal.Asset
         * @category Assets
         * @method getCompanyAssetStatusesAsync
         * @param {String} callback if successful
         * @param {String} callback if error occurred
         * @since 1.39.xxx
         * @example
         *      var success = function(assetField) {
         *
         *      };
         *      var fail = function(errorMessage) {
         *         Geopal.showMessage('failed because '+errorMessage);
         *      };
         *      Geopal.Asset.getCompanyAssetStatusesAsync('success', 'fail');
         * @throws {Error} An error if there is a query exception
         * @return {JsonObject} json object containing - asset_company_statuses{JsonArray} which contains json objects containing - id{Number}, updated_on{Number}, is_deleted{Boolean}, created_on{Number}, color_code{String}, name{string}
         */
        getCompanyAssetStatusesAsync: function(successCallback, failCallback){
            var fn = window[successCallback];
            var asset_statuses = null
            try{
                asset_statuses =  Geopal.response(GeopalAssetInternal.getCompanyAssetStatuses());
            } catch(err) {
                var fn_fail = window[failCallback];
                fn_fail(err);
                return;
            }
            fn(asset_statuses);
        },

        /**
         * Gets all asset company fields on device. May not match with the website if device is not fully synced
         *
         * @for Geopal.Asset
         * @category Assets
         * @method getCompanyAssetFields
         * @throws {Error} An error if there is a query exception
         * @example
         *      Geopal.Asset.getCompanyAssetFields();
         * @return {JsonObject} json object containing - asset_company_fields{JsonArray} which contains json objects containing - id{Number}, is_deleted{Boolean}, created_on{Number}, mandatory{Boolean}, name{String}, action{String}, updated_on{Number}, action_value_entered{String}, required{Boolean}, action_values{String}
         */
        getCompanyAssetFields: function(){
            return Geopal.response(GeopalAssetInternal.getCompanyAssetFields());
        },

        /**
         * Gets all asset company fields on device. May not match with the website if device is not fully synced
         *
         * @for Geopal.Asset
         * @category Assets
         * @method getCompanyAssetFieldsAsync
         * @since 1.39.xxx
         * @param {String} callback if successful
         * @param {String} callback if error occurred
         * @throws {Error} An error if there is a query exception
         * @example
         *      var success = function(assetField) {
         *
         *      };
         *      var fail = function(errorMessage) {
         *         Geopal.showMessage('failed because '+errorMessage);
         *      };
         *      Geopal.Asset.getCompanyAssetFields('success', 'fail');
         * @return {JsonObject} json object containing - asset_company_fields{JsonArray} which contains json objects containing - id{Number}, is_deleted{Boolean}, created_on{Number}, mandatory{Boolean}, name{String}, action{String}, updated_on{Number}, action_value_entered{String}, required{Boolean}, action_values{String}
         */
        getCompanyAssetFieldsAsync: function(successCallback, failCallback){
            var fn = window[successCallback];
            var asset_fields = null
            try{
                asset_fields = Geopal.response(GeopalAssetInternal.getCompanyAssetFields());
            } catch(err) {
                var fn_fail = window[failCallback];
                fn_fail(err);
                return;
            }
            fn(asset_fields);
        },

        /**
         * Sets the asset field value of the asset by the asset field company id to the value passed.
         *
         * @for Geopal.Asset
         * @category Assets
         * @method setAssetFieldActionValueEnteredByAssetCompanyFieldId
         * @param {String} identifier The string identifier of the asset.
         * @param {Number} id company field id
         * @param {String} value new value
         * @example
         *      Geopal.Asset.setAssetFieldActionValueEnteredByAssetCompanyFieldId(" TMP:52370GR8ZN", 6, "value to enter");
         * @return {Boolean} true if successful
         * @throws {Error} An error if there is a query exception or asset is not found
         */
        setAssetFieldActionValueEnteredByAssetCompanyFieldId: function(assetIdentifier, companyFieldId, value) {
            return Geopal.response(GeopalAssetInternal.setAssetFieldActionValueEnteredByAssetCompanyFieldId(assetIdentifier, companyFieldId, value));
        },

        /**
         * Sets the asset address by the identifier of the asset.
         *
         * @for Geopal.Asset
         * @category Assets
         * @method setAddressByIdentifier
         * @param {String} identifier The string identifier of the asset.
         * @param {String} addressLine1 The string addressLine1 of the asset.
         * @param {String} addressLine2 The string addressLine2 of the asset.
         * @param {String} addressLine3 The string addressLine3 of the asset.
         * @param {String} city The string city of the asset.
         * @param {String} post_code The string post_code of the asset.
         * @param {int} countryId The id of the country of the asset. WARNING NOT USED
         * @param {String} lat The string lat of the asset.
         * @param {String} lng The string lat of the asset.
         * @example
         *      Geopal.Asset.setAddressByIdentifier(identifier, "1 made up lane", "Made up Road", "Made up town", "Make believe City", "D22", 0,-6.164274615471, 39.1989659518));
         * @return {Boolean}  true if successful
         * @throws {Error} An error if there is a query exception or asset is not found
         */
        setAddressByIdentifier: function(identifier, addressLine1, addressLine2, addressLine3, city, post_code, countryId, lat, lng) {
            return Geopal.response(GeopalAssetInternal.setAssetAddressByIdentifier(identifier, addressLine1, addressLine2, addressLine3, city, post_code, countryId, lat, lng));
        },

        /**
         * Sets the asset status by asset company status id.
         *
         * @for Geopal.Asset
         * @category Assets
         * @method setStatusByIdentifier
         * @param {String} identifier The string identifier of the asset.
         * @param {String} id asset company status id
         * @example
         *      Geopal.Asset.setStatusByIdentifier(" TMP:52370GR8ZN", 6);
         * @return {Boolean} true if successful
         * @throws {Error} An error if there is a query exception or asset is not found
         */
        setStatusByIdentifier: function(assetIdentifier, assetCompanyStatusId) {
            return Geopal.response(GeopalAssetInternal.setAssetStatusByIdentifier(assetIdentifier, assetCompanyStatusId));
        },

        /**
         * Get a json array of categories synced to the mobile device
         *
         * @for Geopal.Asset
         * @category Assets
         * @method getAssetCategories
         * @example
         *      Geopal.Asset.getAssetCategories();
         * @return {JSONArray} array of json objects containing - id{Number}, updated_on{Number}, created_on{Number}, name{String}
         */
        getAssetCategories: function() {
            return Geopal.response(GeopalAssetInternal.getAssetCategories());
        },

        /**
         * Asynchronously get a json array of categories synced to the mobile device.
         *
         * @for Geopal.Asset
         * @category Assets
         * @param {String} callback if successful
         * @param {String} callback if error occurred
         * @category Assets
         * @method getAssetCategoriesAsync
         * @since 1.39.xxx
         * @example
         *      var success = function(categories) {
         *         var firstCat = categories[0];
         *      };
         *      var fail = function(errorMessage) {
         *         Geopal.showMessage('failed because '+errorMessage);
         *      };
         *      Geopal.Asset.getAssetCategories('success', 'fail');
         * @return {JSONArray} array of json objects containing - id{Number}, updated_on{Number}, created_on{Number}, name{String}
         */
        getAssetCategoriesAsync: function(successCallback, failCallback) {
            var fn = window[successCallback];
            var asset_categories = null
            try{
                asset_categories = Geopal.response(GeopalAssetInternal.getAssetCategories())
            } catch(err) {
                var fn_fail = window[failCallback];
                fn_fail(err);
                return;
            }
            fn(asset_categories);
        },

        /**
         * Get a json array of subcategories synced to the mobile device by category id
         *
         * @for Geopal.Asset
         * @category Assets
         * @method getSubcategoriesByCategoryId
         * @param {Number} id category id
         * @example
         *      Geopal.Asset.getSubcategoriesByCategoryId(189);
         * @return {JSONArray} array of json objects containing - id{Number}, updated_on{Number}, created_on{Number}, name{String}, asset_category_id{Number}
         */
        getSubcategoriesByCategoryId: function(assetCategoryId) {
            return Geopal.response(GeopalAssetInternal.getSubcategoriesByCategoryId(assetCategoryId));
        },

        /**
         * Asynchronously get subcategories synced to the mobile device by category id.
         *
         * @for Geopal.Asset
         * @category Assets
         * @param {String} callback if successful
         * @param {String} callback if error occurred
         * @category Assets
         * @method getSubcategoriesByCategoryIdAsync
         * @since 1.39.xxx
         * @example
         *      var success = function(sub_categories) {
         *         var firstSubCat = sub_categories[0];
         *      };
         *      var fail = function(errorMessage) {
         *         Geopal.showMessage('failed because '+errorMessage);
         *      };
         *      Geopal.Asset.getSubcategoriesByCategoryId('success', 'fail', assetCategoryId);
         * @return {JSONArray} array of json objects containing - id{Number}, updated_on{Number}, created_on{Number}, name{String}, asset_category_id{Number}
         */
        getSubcategoriesByCategoryIdAsync: function(successCallback, failCallback, assetCategoryId) {
            var fn = window[successCallback];
            var asset_sub_categories = null
            try{
                asset_sub_categories = Geopal.response(GeopalAssetInternal.getSubcategoriesByCategoryId(assetCategoryId))
            } catch(err) {
                var fn_fail = window[failCallback];
                fn_fail(err);
                return;
            }
            fn(asset_sub_categories);
        },

        /**
         * Get a json array of templates synced to the mobile device
         *
         * @for Geopal.Asset
         * @category Assets
         * @method getAssetTemplates
         * @example
         *      Geopal.Asset.getAssetTemplates();
         * @return {JSONArray} array of json objects containing - id{Number}, is_deleted{Boolean}, is_part{Boolean}, scan_action{String}, created_on{Number}, icon_uri{String}, name{String}, updated_on{Number}, scan_action_params{String}
         */
        getAssetTemplates: function() {
            return Geopal.response(GeopalAssetInternal.getAssetTemplates());
        },

        /**
         * Get a json array of templates synced to the mobile device
         *
         * @for Geopal.Asset
         * @category Assets
         * @param {String} callback if successful
         * @param {String} callback if error occurred
         * @since 1.39.xxx
         * @method getAssetTemplatesAsync
         * @example
         *      var success = function(templates) {
         *         var firstTemplate = templates[0];
         *      };
         *      var fail = function(errorMessage) {
         *         Geopal.showMessage('failed because '+errorMessage);
         *      };
         *      Geopal.Asset.getAssetTemplatesAsync('success', 'fail');
         * @return {JSONArray} array of json objects containing - id{Number}, is_deleted{Boolean}, is_part{Boolean}, scan_action{String}, created_on{Number}, icon_uri{String}, name{String}, updated_on{Number}, scan_action_params{String}
         */
        getAssetTemplatesAsync: function(successCallback, failCallback) {
            var fn = window[successCallback];
            var asset_templates = null
            try{
                asset_templates = Geopal.response(GeopalAssetInternal.getAssetTemplates());
            } catch(err) {
                var fn_fail = window[failCallback];
                fn_fail(err);
                return;
            }
            fn(asset_templates);
        },

        /**
         * Get a json array of templates synced to the mobile device by subcategory id
         *
         * @for Geopal.Asset
         * @category Assets
         * @method getAssetTemplatesBySubcategoryId
         * @param {Number} id subcategory id
         *  @example
         *      Geopal.Asset.getAssetTemplatesBySubcategoryId(367);
         * @return {JSONArray} array of json objects containing - id{Number}, is_deleted{Boolean}, is_part{Boolean}, scan_action{String}, created_on{Number}, icon_uri{String}, name{String}, updated_on{Number}, scan_action_params{String}
         */
        getAssetTemplatesBySubcategoryId: function(subcategoryId) {
            return Geopal.response(GeopalAssetInternal.getAssetTemplatesBySubcategoryId(subcategoryId));
        },


        /**
         * Get a json array of templates synced to the mobile device by subcategory id
         *
         * @for Geopal.Asset
         * @category Assets
         * @method getAssetTemplatesBySubcategoryIdAsync
         * @param {String} callback if successful
         * @param {String} callback if error occurred
         * @param {Number} id subcategory id
         * @since 1.39.xxx
         * @example
         *      var success = function(templates) {
         *         var firstTemplate = templates[0];
         *      };
         *      var fail = function(errorMessage) {
         *         Geopal.showMessage('failed because '+errorMessage);
         *      };
         *      Geopal.Asset.getAssetTemplatesBySubcategoryIdAsync('success', 'fail', subcategoryId);
         * @return {JSONArray} array of json objects containing - id{Number}, is_deleted{Boolean}, is_part{Boolean}, scan_action{String}, created_on{Number}, icon_uri{String}, name{String}, updated_on{Number}, scan_action_params{String}
         */
        getAssetTemplatesBySubcategoryIdAsync: function(successCallback, failCallback, subcategoryId) {
            var fn = window[successCallback];
            var asset_templates = null
            try{
                asset_templates = Geopal.response(GeopalAssetInternal.getAssetTemplatesBySubcategoryId(subcategoryId));
            } catch(err) {
                var fn_fail = window[failCallback];
                fn_fail(err);
                return;
            }
            fn(asset_templates);
        },

        /**
         * Get a json array of companies with assets associated to them synced to the mobile device
         *
         * @for Geopal.Asset
         * @category Assets
         * @method getAssetCustomers
         * @example
         *      Geopal.Asset.getAssetCustomers();
         * @return {JSONArray}  array of json objects containing - id{Number}, updated_on{Number}, server_id{Number}, identifier{String}, name{String}
         */
        getAssetCustomers: function() {
            return Geopal.response(GeopalAssetInternal.getAssetCustomers());
        },

        /**
         * Get a json array of companies with assets associated to them synced to the mobile device
         *
         * @for Geopal.Asset
         * @category Assets
         * @since 1.39.xxx
         * @param {String} callback if successful
         * @param {String} callback if error occurred
         * @method getAssetCustomersAsync
         * @example
         *      var success = function(customers) {
        *         var firstCustomer = customers[0];
        *      };
         *      var fail = function(errorMessage) {
        *         Geopal.showMessage('failed because '+errorMessage);
        *      };
         *      Geopal.Asset.getAssetCustomersAsync('success', 'fail');
         * @return {JSONArray}  array of json objects containing - id{Number}, updated_on{Number}, server_id{Number}, identifier{String}, name{String}
         */
        getAssetCustomersAsync: function(successCallback, failCallback) {
            var fn = window[successCallback];
            var asset_customers = null
            try{
                asset_customers = Geopal.response(GeopalAssetInternal.getAssetCustomers());
            } catch(err) {
                var fn_fail = window[failCallback];
                fn_fail(err);
                return;
            }
            fn(asset_customers);
        },

        /**
         * search for assets match parameters passed
         *
         * @for Geopal.Asset
         * @category Assets
         * @method searchAssets
         * @param {JSONObject} searchObject json containing - search_terms{String}, category_id{Number}, subcategory_id{Number}, type_id{Number}, status_id{Number}, customer_id{Number}, parts{Boolean} (where type_id is the id of the asset template)
         * @param {Number} limit
         * @param {String} orderBy order by 'name' or 'identifier' defaults to 'identifier'
         * @param {boolean} ascending order by ascending
         * @example
         *     var categories = Geopal.Asset.getAssetCategories();
         *     var subcategories = Geopal.Asset.getSubcategoriesByCategoryId(categories[0].id);
         *     var templates = Geopal.Asset.getAssetTemplatesBySubcategoryId(subcategories[0].id);
         *     var customers = Geopal.Asset.getAssetCustomers();
         *     var statuses = Geopal.Asset.getCompanyAssetStatuses().asset_company_statuses;
         *     var searchTerms = '';
         *
         *     var json =
         *         {"search_terms":searchTerms,
         *         "category_id":categories[0].id,
         *         "subcategory_id":subcategories[0].id,
         *         "type_id":templates[0].id,
         *         "status_id":+statuses[0].id,
         *         "customer_id":customers[0].id,
         *         "parts_only":false
         *         }
         *
         *     var assets = Geopal.Asset.searchAssets(json,9,'name',false);
         *
         * @return {JSONArray} json array of json objects containing - is_deleted{Boolean}, created_on{Number}, updated_on{Number}, identifier{String}, action_value_entered{String}, id{Number}, name{String}, asset_fields{JsonArray}, asset_customer{JsonObject}, asset_company_status{JsonObject}, asset_triggers{JsonArray}, asset_template{JsonObject}
         */
        searchAssets: function(searchObject, limit, orderBy, ascending) {
            searchObject = searchObject || {"search_terms":"",
                    "parts_only": false
                }
            searchObject.search_terms = searchObject.search_terms || '';
            searchObject.category_id = searchObject.category_id || Geopal.DUMMY_ID;
            searchObject.subcategory_id = searchObject.subcategory_id || Geopal.DUMMY_ID;
            searchObject.type_id = searchObject.type_id || Geopal.DUMMY_ID;
            searchObject.status_id = searchObject.status_id || Geopal.DUMMY_ID;
            searchObject.customer_id = searchObject.customer_id ||Geopal.DUMMY_ID;
            limit = limit || 100;
            orderBy = orderBy || 'identifier';
            ascending = ascending || true; //so it matches the asset search page

            return Geopal.response(GeopalAssetInternal.
            searchAssets(searchObject.search_terms, searchObject.category_id, searchObject.subcategory_id,
                searchObject.type_id, searchObject.status_id, searchObject.customer_id, searchObject.parts_only, limit, orderBy, ascending));
        },

        /**
         * search for assets match parameters passed
         *
         * @for Geopal.Asset
         * @category Assets
         * @method searchAssetsAsync
         * @since 1.39.xxx
         * @param {String} callback if successful
         * @param {String} callback if error occurred
         * @param {JSONObject} searchObject json containing - search_terms{String}, category_id{Number}, subcategory_id{Number}, type_id{Number}, status_id{Number}, customer_id{Number}, parts{Boolean} (where type_id is the id of the asset template)
         * @param {Number} limit
         * @param {String} orderBy order by 'name' or 'identifier' defaults to 'identifier'
         * @param {boolean} ascending order by ascending
         * @example
         *      var success = function(assets) {
         *
         *      };
         *      var fail = function(errorMessage) {
         *         Geopal.showMessage('failed because '+errorMessage);
         *      };
         *     var json =
         *         {"search_terms":searchTerms,
         *         "category_id":categories[0].id,
         *         "subcategory_id":subcategories[0].id,
         *         "type_id":templates[0].id,
         *         "status_id":+statuses[0].id,
         *         "customer_id":customers[0].id,
         *         "parts_only":false
         *         }
         *
         *     var assets = Geopal.Asset.searchAssetsAsync('success','fail',json,9,'name',false);
         *
         * @return {JSONArray} json array of json objects containing - is_deleted{Boolean}, created_on{Number}, updated_on{Number}, identifier{String}, action_value_entered{String}, id{Number}, name{String}, asset_fields{JsonArray}, asset_customer{JsonObject}, asset_company_status{JsonObject}, asset_triggers{JsonArray}, asset_template{JsonObject}
         */
        searchAssetsAsync: function(successCallback, failCallback, searchObject, limit, orderBy, ascending) {
            searchObject = searchObject || {"search_terms":"",
                    "parts_only": false
                }
            searchObject.search_terms = searchObject.search_terms || '';
            searchObject.category_id = searchObject.category_id || Geopal.DUMMY_ID;
            searchObject.subcategory_id = searchObject.subcategory_id || Geopal.DUMMY_ID;
            searchObject.type_id = searchObject.type_id || Geopal.DUMMY_ID;
            searchObject.status_id = searchObject.status_id || Geopal.DUMMY_ID;
            searchObject.customer_id = searchObject.customer_id ||Geopal.DUMMY_ID;
            limit = limit || 100;
            orderBy = orderBy || 'identifier';
            ascending = ascending || true; //so it matches the asset search page

            var fn = window[successCallback];
            var assets = null
            try{
                assets = Geopal.response(GeopalAssetInternal.
                searchAssets(searchObject.search_terms, searchObject.category_id, searchObject.subcategory_id,
                    searchObject.type_id, searchObject.status_id, searchObject.customer_id, searchObject.parts_only, limit, orderBy, ascending));
            } catch(err) {
                var fn_fail = window[failCallback];
                fn_fail(err);
                return;
            }
            fn(assets);
        },

        /**
         * Go to the asset search page on the mobile device
         *
         * @for Geopal.Asset
         * @category Assets
         * @method gotoAssetSearch
         * @example
         *     Geopal.Asset.gotoAssetSearch();
         */
        gotoAssetSearch: function(searchObject) {
            searchObject = searchObject || {
                    "search_terms":"",
                    "parts_only": false,
                    "template_name":"",
                    "status_name":"",
                    "customer_name":""
                }
            searchObject.search_terms = searchObject.search_terms || '';
            searchObject.category_id = searchObject.category_id || Geopal.DUMMY_ID;
            searchObject.subcategory_id = searchObject.subcategory_id || Geopal.DUMMY_ID;
            searchObject.type_id = searchObject.type_id || Geopal.DUMMY_ID;
            searchObject.template_id = searchObject.template_id || Geopal.DUMMY_ID;
            searchObject.status_id = searchObject.status_id || Geopal.DUMMY_ID;
            searchObject.customer_id = searchObject.customer_id || Geopal.DUMMY_ID;
            searchObject.customer_id = searchObject.customer_id || Geopal.DUMMY_ID;
            searchObject.parts_only = searchObject.parts_only || false;
            searchObject.status_name = searchObject.status_name || '';
            searchObject.customer_name = searchObject.customer_name || '';
            GeopalAssetInternal.gotoAssetSearch(searchObject.search_terms,
                searchObject.category_id,
                searchObject.subcategory_id,
                searchObject.type_id,
                searchObject.template_id,
                searchObject.status_id,
                searchObject.customer_id,
                searchObject.parts_only,
                searchObject.customer_name,
                searchObject.template_name,
                searchObject.status_name);
        },

        /**
         * Go to the asset fields page on the mobile device if the asset exists
         *
         * @for Geopal.Asset
         * @category Assets
         * @method gotoAssetFields
         * @param {String} asset_identifier Identifier of asset
         * @example
         *     Geopal.Asset.gotoAssetFields(identifier);
         */
        gotoAssetFields: function(identifier) {
            return Geopal.response(GeopalAssetInternal.gotoAssetFields(identifier));
        },

        /**
         * Only sets the assets name. Requires identifier, address.lat, address.lng and name keys everything else is ignored. Throws an error if the asset doesn't exist
         *
         * @for Geopal.Asset
         * @category Assets
         * @method set
         * @example
         *     var assetJson = Geopal.Asset.getByIdentifier(identifier);
         *     assetJson.name = 'New Asset Name';
         *     Geopal.Asset.set(assetJson);
         * @since 1.33.520
         * @return true if successful otherwise throws an error
         */
        set: function(assetJson) {
            assetJson.name = assetJson.name || null;
            assetJson.address = assetJson.address || {}
            assetJson.address.lat = assetJson.address.lat || 0;
            assetJson.address.lng = assetJson.address.lng || 0;
            assetJson.asset_company_status = assetJson.asset_company_status ||{}
            assetJson.asset_company_status.id = assetJson.asset_company_status.id || Geopal.DUMMY_ID;
            return Geopal.response(GeopalAssetInternal.setAssetDetails(assetJson.identifier, assetJson.name, assetJson.address.lat, assetJson.address.lng, assetJson.asset_company_status.id));
        }
    },

    /*
     * @class Scan
     * @category Scan
     * @module Geopal
     * @namespace Geopal
     */
    Scan : {
        /**
         * Launches external application to scan barcode. If no app for reading barcodes is found shows message.
         *
         * @example
         *     var success = function(item) {
         *         Geopal.showMessage('barcode: '+item);
         *     };
         *     var fail = function() {
         *         Geopal.showMessage('failed');
         *     };
         *     Geopal.Scan.scanBarcode('success','fail');
         *
         * @for Geopal.Scan
         * @method scanBarcode
         * @since 1.10.x(CHANGE)
         * @param {String} callbackSuccess The name of a callback function to call when the operation succeed. The function
         *                                 must live in the window scope.
         * @param {String} callbackFailure The name of a callback function to call when the operation is cancelled by the user. The function
         *                                 must live in the window scope.
         * @return {String} barcode string
         */
        scanBarcode: function(callbackSuccess, callbackFailure) {
            GeopalScanInternal.scanBarcode(callbackSuccess, callbackFailure);
        },

        /**
         * Opens activity for reading nfc tags.
         * Shows user message if nfc is not available and returns an error message to fail callback
         *
         * @example
         *     var success = function(item) {
         *         Geopal.showMessage('TAG: '+item);
         *     };
         *     var fail = function(errorMessage) {
         *         Geopal.showMessage('failed because '+errorMessage);
         *     };
         *     Geopal.Scan.scanNFC('success','fail');
         *     //optionally the question parameter can be set to show a message in the nfc activity
         *     //Geopal.Scan.scanNFC('success','fail','Please Scan the closest tag');
         *
         * @for Geopal.Scan
         * @method scanNFCTag
         * @since 1.10.x(CHANGE)
         * @param {String} callbackSuccess The name of a callback function to call when the operation succeed. The function
         *                                 must live in the window scope.
         * @param {String} callbackFailure The name of a callback function to call when the operation is cancelled by the user or nfc not available. The function
         *                                 must live in the window scope.
         * @param {String} question the title of the scan nfc activity
         * @return {String} nfc tag id
         */
        scanNFC: function(callbackSuccess, callbackFailure, question) {
            GeopalScanInternal.scanNFC(callbackSuccess, callbackFailure, question);
        },
        /**
         *  Opens activity for scanning for an asset. fields defaulted parameters passed. Returns asset identifier string to success callback.
         *
         * @for Geopal.Asset
         * @category Assets
         * @method scanAsset
         * @param {String} successCallback success callback string
         * @param {String} cancelCallback canceled callback string
         * @param {JSONObject} searchObject json containing - search_terms{String}, category_id{Number}, subcategory_id{Number}, type_id{Number}, status_id{Number}, customer_id{Number}, parts{Boolean} (where type_id is the id of the asset template)
         * @example
         *      var success = function(item) {
         *         Geopal.showMessage('Asset Identifier: '+item);
         *     };
         *     var fail = function() {
         *         Geopal.showMessage('failed');
         *     };
         *
         *     var searchTerms = '';
         *
         *     var json =
         *         {
         *         "search_terms":searchTerms,
         *         "category_id":Geopal.DUMMY_ID,
         *         "subcategory_id":Geopal.DUMMY_ID,
         *         "type_id":Geopal.DUMMY_ID ,
         *         "template_id":Geopal.DUMMY_ID ,
         *         "status_id":Geopal.DUMMY_ID ,
         *         "customer_id":Geopal.DUMMY_ID ,
         *         "type_name":templates[0].id,
         *         "status_name":statuses[0].id,
         *         "customer_name":customers[0].id,
         *         "parts_only":false
         *         }
         *
         *     var assets = Geopal.Scan.scanAsset(json);
         *
         */
        scanAsset: function(callbackSuccess, callbackFailure, searchObject) {
            searchObject = searchObject || {
                    "search_terms":"",
                    "parts_only": false,
                    "template_name":"",
                    "status_name":"",
                    "customer_name":""
                }
            searchObject.search_terms = searchObject.search_terms || '';
            searchObject.category_id = searchObject.category_id || Geopal.DUMMY_ID;
            searchObject.subcategory_id = searchObject.subcategory_id || Geopal.DUMMY_ID;
            searchObject.type_id = searchObject.type_id || Geopal.DUMMY_ID;
            searchObject.template_id = searchObject.template_id || Geopal.DUMMY_ID;
            searchObject.status_id = searchObject.status_id || Geopal.DUMMY_ID;
            searchObject.customer_id = searchObject.customer_id || Geopal.DUMMY_ID;
            searchObject.template_name = searchObject.template_name || '';
            searchObject.status_name = searchObject.status_name || '';
            searchObject.customer_name = searchObject.customer_name || '';

            GeopalScanInternal.scanAsset(callbackSuccess, callbackFailure,
                searchObject.search_terms,
                searchObject.category_id,
                searchObject.subcategory_id,
                searchObject.type_id,
                searchObject.template_id,
                searchObject.status_id,
                searchObject.customer_id,
                searchObject.parts_only,
                searchObject.customer_name,
                searchObject.template_name,
                searchObject.status_name);
        }
    },

    /*
     * @class LocalStorage
     * @category LocalStorage
     * @module Geopal
     * @namespace Geopal
     */
    LocalStorage : {

        /**
         * Check if devices storage contains key
         *
         * @category LocalStorage
         * @method contains
         * @for Geopal.LocalStorage
         * @since 1.18.380
         * @param {String} key key to check for
         * @example
         *     Geopal.LocalStorage.contains('Unique Key');
         * @return true if a value for key is stored on the device
         */
        contains: function(key) {
            return Geopal.response(GeopalLocalStorage.contains(key));
        },

        /**
         * Gets the value associated with the key or returns defaultValue
         *
         * @category LocalStorage
         * @method get
         * @for Geopal.LocalStorage
         * @since 1.18.380
         * @param {String} key key to check for
         * @param {String} defaultValue value to be returned if no value found
         * @example
         *     Geopal.LocalStorage.get('Unique Key','Not Found');
         * @return value or default value if no value found
         */
        get: function(key, defaultValue) {
            if (this.contains(key)) {
                return Geopal.response(GeopalLocalStorage.get(key));
            } else {
                return defaultValue;
            }
        },

        /**
         * Sets the value associated with the key
         *
         * @category LocalStorage
         * @method set
         * @for Geopal.LocalStorage
         * @since 1.18.380
         * @param {String} key key to check for
         * @param {String} value value to set
         * @example
         *     Geopal.LocalStorage.set('Unique Key','Value');
         * @return true if successful
         */
        set: function(key, value) {
            return Geopal.response(GeopalLocalStorage.set(key, value+''));
        },

        /**
         * Removes the value associated with the key
         *
         * @category LocalStorage
         * @method remove
         * @for Geopal.LocalStorage
         * @since 1.18.380
         * @param {String} key key to remove
         * @example
         *     Geopal.LocalStorage.remove('Unique Key');
         * @return true if successful
         */
        remove: function(key) {
            if (this.contains(key)) {
                return Geopal.response(GeopalLocalStorage.remove(key));
            } else {
                return false;
            }
        },

        /**
         * Get all storage keys. Note: values for the keys are not returned. To get the value Geopal.LocalStorage.get(key, defaultValue) should be called
         *
         * @category LocalStorage
         * @method getAll
         * @for Geopal.LocalStorage
         * @since 1.18.380
         * @example
         *     Geopal.LocalStorage.getAll();
         * @return {JSONArray} a json array of keys e.g {"Unique Key 1","Unique Key 2","Unique Key 3","Unique Key 4"}
         */
        getAll: function() {
            return Geopal.response(GeopalLocalStorage.getAll());
        }
    },

    /*
     * @class CompanyFile
     * @category CompanyFile
     * @module Geopal
     * @namespace Geopal
     */
    CompanyFile : {
        /**
         * search for company file uploads matching parameters passed
         *
         * @for Geopal.CompanyFile
         * @category CompanyFile
         * @method searchCompanyFiles
         * @param {JSONObject} json object containing - category{String}, name{String}, offset{Number}, limit{Number}. Where offset is defaulted to 0 and limit defaults to 50
         * @since 1.23.160
         * @example
         *     var category = "test";
         *     var name = "Geopal";
         *     var offset = 5;
         *     var limit = 10;
         *
         *     var json =
         *         {"name":name ,"category":category,
             *          "offset":offset ,"limit":limit}
         *
         *     var files = Geopal.CompanyFile.searchCompanyFiles(json);
         *
         * @return {JSONArray} json array of json objects containing - id{Number}, filepath{String}, company_id{Number}, is_deleted{Boolean}, category{String}, created_on{Number}, name{String}, updated_on{Number}, s3file_id{Number}
         */
        searchCompanyFiles: function(searchObject) {
            searchObject = searchObject || {
                    "name":"" ,
                    "category":""
                }
            searchObject.name = searchObject.name || "";
            searchObject.category = searchObject.category || "";
            searchObject.offset = searchObject.offset || 0;
            searchObject.limit = searchObject.limit ||  50;
            return Geopal.response(
                GeopalCompanyFileInternal.
                searchCompanyFiles(searchObject.name, searchObject.category, searchObject.offset, searchObject.limit));
        },

        /**
         * search for company file uploads matching parameters passed
         *
         * @for Geopal.CompanyFile
         * @category CompanyFile
         * @method searchCompanyFilesAsync
         * @param {String} callback if successful
         * @param {String} callback if error occurred
         * @param {JSONObject} json object containing - category{String}, name{String}, offset{Number}, limit{Number}. Where offset is defaulted to 0 and limit defaults to 50
         * @since 1.39.xxx
         * @example
         *      var success = function(company_files) {
             *
             *      };
         *      var fail = function(errorMessage) {
             *         Geopal.showMessage('failed because '+errorMessage);
             *      };
         *     var category = "test";
         *     var name = "Geopal";
         *     var offset = 5;
         *     var limit = 10;
         *
         *     var json =
         *         {"name":name ,"category":category,
             *          "offset":offset ,"limit":limit}
         *
         *     Geopal.CompanyFile.searchCompanyFilesAsync('success','fail',json);
         *
         */
        searchCompanyFilesAsync: function(successCallback, failCallback, searchObject) {
            searchObject = searchObject || {
                    "name":"" ,
                    "category":""
                }
            searchObject.name = searchObject.name || "";
            searchObject.category = searchObject.category || "";
            searchObject.offset = searchObject.offset || 0;
            searchObject.limit = searchObject.limit ||  50;

            var fn = window[successCallback];
            var files = null
            try{
                files =  Geopal.response(
                    GeopalCompanyFileInternal.
                    searchCompanyFiles(searchObject.name, searchObject.category, searchObject.offset, searchObject.limit));
            } catch(err) {
                var fn_fail = window[failCallback];
                fn_fail(err);
                return;
            }
            fn(files);
        },

        /**
         * Get company file  upload by id
         *
         * @category CompanyFile
         * @method getById
         * @param {Number} id of company file upload id
         * @for Geopal.CompanyFile
         * @since 1.23.160
         * @example
         *     Geopal.CompanyFile.getById(9);
         * @return {JsonObject}json object containing - id{Number}, filepath{String}, company_id{Number}, is_deleted{Boolean}, category{String}, created_on{Number}, name{String}, updated_on{Number}, s3file_id{Number}
         */
        getById: function(id) {
            return Geopal.response(
                GeopalCompanyFileInternal.
                getById(id));
        },

        /**
         * Get company file  upload by id
         *
         * @category CompanyFile
         * @method getByIdAsync
         * @param {String} callback if successful
         * @param {String} callback if error occurred
         * @param {Number} id of company file upload id
         * @for Geopal.CompanyFile
         * @since 1.39.xxx
         * @example
         *      var success = function(company_file) {
             *
             *      };
         *      var fail = function(errorMessage) {
             *         Geopal.showMessage('failed because '+errorMessage);
             *      };
         *     Geopal.CompanyFile.getByIdAsync('success','fail',9);
         * @return {JsonObject}json object containing - id{Number}, filepath{String}, company_id{Number}, is_deleted{Boolean}, category{String}, created_on{Number}, name{String}, updated_on{Number}, s3file_id{Number}
         */
        getByIdAsync: function(successCallback, failCallback, id) {
            var fn = window[successCallback];
            var file = null
            try{
                file = Geopal.response(GeopalCompanyFileInternal.getById(id));
            } catch(err) {
                var fn_fail = window[failCallback];
                fn_fail(err);
                return;
            }
            fn(file);
        },

        /**
         * Get first company file upload matching name
         *
         * @category CompanyFile
         * @method getByName
         * @param {String} name of company file upload
         * @for Geopal.CompanyFile
         * @since 1.23.160
         * @example
         *     Geopal.CompanyFile.getByName("corrputed");
         * @return {JsonObject}json object containing - id{Number}, filepath{String}, company_id{Number}, is_deleted{Boolean}, category{String}, created_on{Number}, name{String}, updated_on{Number}, s3file_id{Number}
         */
        getByName: function(name) {
            return Geopal.response(
                GeopalCompanyFileInternal.
                getByName(name));
        },

        /**
         * Get first company file upload matching name
         *
         * @category CompanyFile
         * @method getByNameAsync
         * @param {String} callback if successful
         * @param {String} callback if error occurred
         * @param {String} name of company file upload
         * @for Geopal.CompanyFile
         * @since 1.39.xxx
         * @example
         *      var success = function(company_files) {
             *
             *      };
         *      var fail = function(errorMessage) {
             *         Geopal.showMessage('failed because '+errorMessage);
             *      };
         *     Geopal.CompanyFile.getByNameAsync('success','fail',"corrputed");
         * @return {JsonObject}json object containing - id{Number}, filepath{String}, company_id{Number}, is_deleted{Boolean}, category{String}, created_on{Number}, name{String}, updated_on{Number}, s3file_id{Number}
         */
        getByNameAsync: function(successCallback, failCallback, name) {
            var fn = window[successCallback];
            var file = null
            try{
                file = Geopal.response(GeopalCompanyFileInternal.getByName(name));
            } catch(err) {
                var fn_fail = window[failCallback];
                fn_fail(err);
                return;
            }
            fn(file);
        },

        /**
         * Get contents as string from company file  upload by id
         *
         * @category CompanyFile
         * @method getContentsById
         * @for Geopal.CompanyFile
         * @since 1.23.160
         * @param {String} id of company file upload
         * @param {String} charset defaults to 'UTF-8'
         * @param {bool} flag defaults to false. True uses the string buffer to read file contents, false uses the Scanner object
         * @example
         *     Geopal.CompanyFile.getContentsById(9);
         *     or Geopal.CompanyFile.getContentsById(9, 'UTF-16');
         * @return {String} file contents as string
         */
        getContentsById: function(id, charset, flag) {
            charset = charset || "UTF-8";
            flag = flag || false;
            return Geopal.response(
                GeopalCompanyFileInternal.
                getContentsById(id, charset, flag));
        },
        /**
         * Get contents as string from company file  upload by id
         *
         * @category CompanyFile
         * @method getContentsByIdAsync
         * @for Geopal.CompanyFile
         * @since 1.39.xxx
         * @param {String} callback if successful
         * @param {String} callback if error occurred
         * @param {String} id of company file upload
         * @param {String} charset defaults to 'UTF-8'
         * @param {bool} flag defaults to false. True uses the string buffer to read file contents, false uses the Scanner object
         * @example
         *      var success = function(contents) {
             *
             *      };
         *      var fail = function(errorMessage) {
             *         Geopal.showMessage('failed because '+errorMessage);
             *      };
         *     Geopal.CompanyFile.getContentsByIdAsync('success','fail',9);
         *     or Geopal.CompanyFile.getContentsByIdAsync('success','fail',9, 'UTF-16');
         * @return {String} file contents as string
         */
        getContentsByIdAsync: function(successCallback, failCallback, id, charset, flag) {
            charset = charset || "UTF-8";
            flag = flag || false;
            var fn = window[successCallback];
            var contents = null
            try{
                contents = Geopal.response(GeopalCompanyFileInternal.getContentsById(id, charset, flag));
            } catch(err) {
                var fn_fail = window[failCallback];
                fn_fail(err);
                return;
            }
            fn(contents);
        },

        /**
         * Get contents as string from first company file upload matching name
         *
         * @category CompanyFile
         * @method getContentsByName
         * @param {String} name of company file upload
         * @param {String} charset defaults to 'UTF-8'
         * @param {bool} flag defaults to false. True uses the string buffer to read file contents, false uses the Scanner object
         * @for Geopal.CompanyFile
         * @since 1.23.160
         * @example
         *     Geopal.CompanyFile.getContentsByName("corrputed");
         *     or Geopal.CompanyFile.getContentsByName("corrputed", 'UTF-16');
         * @return {String} file contents as string
         */
        getContentsByName: function(name, charset, flag) {
            charset = charset || "UTF-8";
            flag = flag || false;
            return Geopal.response(
                GeopalCompanyFileInternal.
                getContentsByName(name, charset, flag));
        },

        /**
         * Get contents as string from first company file upload matching name
         *
         * @category CompanyFile
         * @method getContentsByNameAsync
         * @param {String} callback if successful
         * @param {String} callback if error occurred
         * @param {String} name of company file upload
         * @param {String} charset defaults to 'UTF-8'
         * @param {bool} flag defaults to false. True uses the string buffer to read file contents, false uses the Scanner object
         * @for Geopal.CompanyFile
         * @since 1.39.xxx
         * @example
         *      var success = function(contents) {
             *
             *      };
         *      var fail = function(errorMessage) {
             *         Geopal.showMessage('failed because '+errorMessage);
             *      };
         *     Geopal.CompanyFile.getContentsByNameAsync('success','fail',"corrputed");
         *     or Geopal.CompanyFile.getContentsByNameAsync('success','fail'."corrputed", 'UTF-16');
         * @return {String} file contents as string
         */
        getContentsByNameAsync: function(successCallback, failCallback, name, charset, flag) {
            charset = charset || "UTF-8";
            flag = flag || false;
            var fn = window[successCallback];
            var contents = null
            try{
                contents = Geopal.response(GeopalCompanyFileInternal.getContentsByName(name, charset, flag));
            } catch(err) {
                var fn_fail = window[failCallback];
                fn_fail(err);
                return;
            }
            fn(contents);
        }
    },

    /*
     * @class Employee
     * @category Employee
     * @module Geopal
     * @namespace Geopal
     */
    Employee : {
        /**
         * Get all employees of the current employees' company
         *
         * @category Employee
         * @method getAll
         * @for Geopal.Employee
         * @example
         *  var json = Geopal.Employee.getAll();
         *
         *  Result:
         *  [
         *      {
         *          "last_name":"Brazil",
         *          "id":11665,
         *          "first_name":"Benjamin",
         *          "company_id":2,
         *          "title":""
         *      },
         *      {
         *          "last_name":"Fennell",
         *          "id":11469,
         *          "first_name":"Tara",
         *          "company_id":2,
         *          "title":""
         *      }
         *  ]
         * @since 1.22.xxx
         * @return {JsonArray} json array of employees
         */
        getAll: function() {
            return Geopal.response(GeopalEmployeeInternal.getAll());
        },

        /**
         * Get all employees of the current employees' company
         *
         * @category Employee
         * @method getAllAsync
         * @param {String} callback if successful
         * @param {String} callback if error occurred
         * @for Geopal.Employee
         * @example
         *      var success = function(employees) {
         *
         *      };
         *      var fail = function(errorMessage) {
         *         Geopal.showMessage('failed because '+errorMessage);
         *      };
         *      Geopal.Employee.getAll('success','fail');
         * @since 1.39.xxx
         * @return {JsonArray} json array of employees
         */
        getAllAsync: function(successCallback, failCallback) {
            var fn = window[successCallback];
            var employees = null
            try{
                employees = Geopal.response(GeopalEmployeeInternal.getAll());
            } catch(err) {
                var fn_fail = window[failCallback];
                fn_fail(err);
                return;
            }
            fn(employees);
        },

        /**
         * Get currently logged in employee
         *
         * @category Employee
         * @method getLoggedInEmployee
         * @for Geopal.Employee
         * @example
         *  var json = Geopal.Employee.getLoggedInEmployee();
         *
         *  Result:
         *  {
         *      "last_name":"Brazil",
         *      "id":11665,
         *      "first_name":"Benjamin",
         *      "company_id":2,
         *      "title":""
         *  }
         *
         * @since 1.22.xxx
         * @return {JsonObject} json object of logged in employee
         */
        getLoggedInEmployee: function() {
            return Geopal.response(GeopalEmployeeInternal.getLoggedInEmployee());
        },

        /**
         * Get currently logged in employee
         *
         * @category Employee
         * @method getLoggedInEmployeeAsync
         * @for Geopal.Employee
         * @param {String} callback if successful
         * @param {String} callback if error occurred
         * @example
         *      var success = function(employee) {
         *
         *      };
         *      var fail = function(errorMessage) {
         *         Geopal.showMessage('failed because '+errorMessage);
         *      };
         *  var json = Geopal.Employee.getLoggedInEmployeeAsync('success','fail');
         *
         * @since 1.39.xxx
         * @return {JsonObject} json object of logged in employee
         */
        getLoggedInEmployeeAsync: function(successCallback, failCallback) {
            var fn = window[successCallback];
            var employee = null
            try{
                employee = Geopal.response(GeopalEmployeeInternal.getLoggedInEmployee());
            } catch(err) {
                var fn_fail = window[failCallback];
                fn_fail(err);
                return;
            }
            fn(employee);
        },

        /**
         * Get employee by id
         *
         * @category Employee
         * @method getById
         * @for Geopal.Employee
         * @example
         *  var id = 11665;
         *  var json = Geopal.Employee.getById(id);
         *
         *  Result:
         *  {
         *      "last_name":"Brazil",
         *      "id":11665,
         *      "first_name":"Benjamin",
         *      "company_id":2,
         *      "title":""
         *  }
         *
         * @since 1.22.xxx
         * @param {Number} id
         * @return {JsonObject} json object of logged in employee
         */
        getById: function(id) {
            return Geopal.response(GeopalEmployeeInternal.getById(id));
        },

        /**
         * Get employee by id
         *
         * @category Employee
         * @method getByIdAsync
         * @for Geopal.Employee
         * @param {String} callback if successful
         * @param {String} callback if error occurred
         * @example
         *  var id = 11665;
         *      var success = function(employee) {
         *
         *      };
         *      var fail = function(errorMessage) {
         *         Geopal.showMessage('failed because '+errorMessage);
         *      };
         *  var json = Geopal.Employee.getByIdAsync('success','fail', id);
         * @since 1.39.xxx
         * @param {Number} id
         * @return {JsonObject} json object of logged in employee
         */
        getByIdAsync: function(successCallback, failCallback, id) {
            var fn = window[successCallback];
            var employee = null
            try{
                employee = Geopal.response(GeopalEmployeeInternal.getById(id));
            } catch(err) {
                var fn_fail = window[failCallback];
                fn_fail(err);
                return;
            }
            fn(employee);
        }

    },

    /*
     * @class Device
     * @category Device
     * @module Geopal
     * @namespace Geopal
     */
    Device : {
        /* @class GPS
         * @module Geopal
         * @category Device
         * @namespace GPS
         */
        GPS : {

            /**
             * When getting the current location make accuracy priority
             *
             * @property PRIORITY_HIGH_ACCURACY
             * @for Geopal.Device.GPS
             * @type Number
             */
            PRIORITY_HIGH_ACCURACY: 0x00000064,
            /**
             * When getting the current location balance between accuracy and battery performance
             *
             * @property PRIORITY_BALANCED_POWER_ACCURACY
             * @for Geopal.Device.GPS
             * @type Number
             */
            PRIORITY_BALANCED_POWER_ACCURACY: 0x00000066,
            /**
             * When getting the current location battery performance is more important than accuracy
             *
             * @property PRIORITY_LOW_POWER
             * @for Geopal.Device.GPS
             * @type Number
             */
            PRIORITY_LOW_POWER: 0x00000068,
            /**
             * When getting the current location use little to no battery power
             *
             * @property PRIORITY_NO_POWER
             * @for Geopal.Device.GPS
             * @type Number
             */
            PRIORITY_NO_POWER: 0x00000069,

            /**
             * Gets device last known location
             * @category Device
             * @method getLastKnownLocation
             * @for Geopal.Device.GPS
             * @example
             *  var json = Geopal.Device.GPS.getLastKnownLocation();
             *
             *  //Result
             *  //{
              * //     "lat":2.877,
              * //     "lng::-6.292,
              * //     "accuracy":17,
              * //     "time":09239889,
              * //     "provider":"gps"
              * // }
             *
             * @since 1.27.300
             * @deprecated This method is deprecated since 2.2.410 and may not work in future versions please do not use. Use getLastKnownLocationAsync instead
             * @return {JsonObject} json object containing lat, lng, accuracy, time and provider
             */
            getLastKnownLocation: function() {
                return Geopal.response(GeopalLocationInternal.getLastKnownLocation());
            },
            /**
             * Gets device last known location
             * @category Device
             * @method getLastKnownLocationAsync
             * @for Geopal.Device.GPS
             * @example
             *     var successCallback = function(jsonObject){
             *          //Do success work here
             *          // jsonObject would be like
             *          {
             *              "lat":2.877,
             *              "lng::-6.292,
             *              "accuracy":17,
             *              "time":09239889,
             *              "provider":"gps"
             *          }
             *      }
             *
             *      var failCallback = function(){
             *
             *       }
             *  var json = Geopal.Device.GPS.getLastKnownLocationAsync("success", "fail");
             *
             *
             * @since 2.2.410
             */
            getLastKnownLocationAsync: function(successCallback, failCallback) {
                 GeopalLocationInternal.getLastKnownLocationAsync(successCallback, failCallback);
            },

            /**
             * Gets device current location from the location manager
             * @category Device
             * @method getCurrentLocation
             * @for Geopal.Device.GPS
             * @param {Number} timeout timeout in milliseconds of when the search current location should stop
             * @param {Number} displacement displacement in meters how much distance from last location triggers location update
             * @param {Number} accuracy accuracy limit in meters on how accurate the location returned should be. Caution this may result in no location returning
             * @param {Number} priority priority of search, higher the priority more battery performance is affected (PRIORITY_HIGH_ACCURACY, PRIORITY_BALANCED_POWER_ACCURACY, PRIORITY_LOW_POWER, PRIORITY_NO_POWER)
             * @example
             *     var successCallback = function(jsonObject){
             *          //Do success work here
             *          // jsonObject would be like
             *          //{
             *          //    "lat":2.877,
             *          //    "lng::-6.292,
             *          //    "accuracy":17,
             *          //    "time":09239889,
             *          //    "provider":"gps"
             *          //}
             *      }
             *
             *      var failCallback = function(){
             *
             *       }
             *      var timeout = 300000;
             *      var displacement = 1;
             *      var accuracy = 100;
             *      Geopal.Device.GPS.getCurrentLocation("successCallback", "failCallback", timeout, displacement, accuracy, Geopal.Device.GPS.PRIORITY_HIGH_ACCURACY);
             *
             * @since 1.27.300
             * @return success function {JsonObject} json object containing lat, lng, accuracy, time and provider or fail function is called
             */
            getCurrentLocation: function(callbackSuccess, callbackFail, timeout, displacement, accuracy, priority) {
                GeopalLocationInternal.getCurrentLocation(callbackSuccess, callbackFail, timeout, displacement, accuracy, priority);
            },

            /**
             * Gets device current location from the location manager
             * @category Device
             * @method getCurrentLocation
             * @for Geopal.Device.GPS
             * @param {Number} timeout timeout in milliseconds of when the search current location should stop
             * @param {Number} displacement displacement in meters how much distance from last location triggers location update
             * @param {Number} accuracy accuracy limit in meters on how accurate the location returned should be. Caution this may result in no location returning
             * @param {Number} priority priority of search, higher the priority more battery performance is affected (PRIORITY_HIGH_ACCURACY, PRIORITY_BALANCED_POWER_ACCURACY, PRIORITY_LOW_POWER, PRIORITY_NO_POWER)
             * @example
             *     var successCallback = function(jsonObject){
             *          //Do success work here
             *          // jsonObject would be like
             *          {
             *              "lat":2.877,
             *              "lng::-6.292,
             *              "accuracy":17,
             *              "time":09239889,
             *              "provider":"gps"
             *          }
             *      }
             *
             *      var failCallback = function(){
             *
             *       }
             *      var timeout = 300000;
             *      var displacement = 1;
             *      var accuracy = 100;
             *      Geopal.Device.GPS.getCurrentLocationAsync("successCallback", "failCallback", timeout, displacement, accuracy, Geopal.Device.GPS.PRIORITY_HIGH_ACCURACY);
             *
             * @since 1.39.xxx
             * @return success function {JsonObject} json object containing lat, lng, accuracy, time and provider or fail function is called
             */
            getCurrentLocationAsync: function(callbackSuccess, callbackFail, timeout, displacement, accuracy, priority) {
                GeopalLocationInternal.getCurrentLocation(callbackSuccess, callbackFail, timeout, displacement, accuracy, priority);
            },

            /**
             * Check if gps is enabled
             * @category Device
             * @method isGPSEnabled
             * @for Geopal.Device.GPS
             * @example
             *      Geopal.Device.GPS.isGPSEnabled();
             *
             * @since 1.27.300
             * @return true if gps is available
             */
            isGPSEnabled: function() {
                return GeopalLocationInternal.isGPSEnabled();
            }
        }
    },

    /*
     * @class Tracks
     * @category Tracks
     * @module Geopal
     * @namespace Geopal
     */
    Tracks : {
        /**
         * Gets the last track object saved to the device, using geopal's tracking system. May return 0.0,0.0 if no last known location found
         * @category Tracks
         * @method getLastKnownLocation
         * @for Geopal.Tracks
         * @example
         *  var json = Geopal.Tracks.getLastKnownLocation();
         *
         *  Result:
         *  {
          *      "lat":2.877,
          *      "lng::-6.292,
          *      "accuracy":17,
          *      "time":09239889
          *  }
         *
         * @since 1.27.300
         * @return {JsonObject} json object containing lat, lng, accuracy, time (Return the UTC time of this fix, in milliseconds since January 1, 1970) and provider(null if it has not been set)
         */
        getLastKnownLocation: function() {
            return Geopal.response(GeopalLocationInternal.getLastKnownTrackLocation());
        }

    },
    /*
     * @class Bluetooth
     * @category Bluetooth
     * @module Geopal
     * @namespace Geopal
     */
    Bluetooth : {
        /**
         * Bluetooth state off
         *
         * @property STATE_OFF
         * @for Geopal.Bluetooth
         * @type Number
         */
        STATE_OFF: 10,

        /**
         * Bluetooth state turning off
         *
         * @property STATE_TURNING_OFF
         * @for Geopal.Bluetooth
         * @type Number
         */
        STATE_TURNING_OFF: 13,

        /**
         * Bluetooth state on
         *
         * @property STATE_ON
         * @for Geopal.Bluetooth
         * @type Number
         */
        STATE_ON: 12,

        /**
         * Bluetooth state turning on
         *
         * @property STATE_TURNING_ON
         * @for Geopal.Bluetooth
         * @type Number
         */
        STATE_TURNING_ON: 11,

        /**
         * Bluetooth state
         *
         * @property STATE_LOST_CONNECTION
         * @for Geopal.Bluetooth
         * @type Number
         */
        STATE_LOST_CONNECTION: 5,

        /**
         * Bluetooth state
         *
         * @property STATE_FAILED_TO_CONNECT
         * @for Geopal.Bluetooth
         * @type Number
         */
        STATE_FAILED_TO_CONNECT: 4,

        /**
         * Bluetooth state
         *
         * @property STATE_CONNECTED
         * @for Geopal.Bluetooth
         * @type Number
         */
        STATE_CONNECTED: 3,

        /**
         * Bluetooth state
         *
         * @property STATE_CONNECTING
         * @for Geopal.Bluetooth
         * @type Number
         */
        STATE_CONNECTING: 2,

        /**
         * Bluetooth state
         *
         * @property STATE_LISTEN
         * @for Geopal.Bluetooth
         * @type Number
         */
        STATE_LISTEN: 1,

        /**
         * Bluetooth state
         *
         * @property STATE_NONE
         * @for Geopal.Bluetooth
         * @type Number
         */
        STATE_NONE: 0,

        /**
         * Bluetooth pairing state
         *
         * @property BOND_BONDED
         * @for Geopal.Bluetooth
         * @type Number
         */
        BOND_BONDED: 12,

        /**
         * Bluetooth pairing state
         *
         * @property BOND_BONDED
         * @for Geopal.Bluetooth
         * @type Number
         */
        BOND_BONDING: 11,

        /**
         * Bluetooth pairing state
         *
         * @property BOND_BONDED
         * @for Geopal.Bluetooth
         * @type Number
         */
        BOND_NONE: 10,

        /**
         * Check if bluetooth is enabled
         * @category Bluetooth
         * @method isEnabled
         * @for Geopal.Bluetooth
         * @example
         *        if(Geopal.Bluetooth.isEnabled()){
          *           var devices = Geopal.Bluetooth.getPairedDevices();
          *           //show list to user etc...
          *        }else{
          *             Geopal.Bluetooth.enable("success","failed");
          *        }
         * @since 1.30.470
         * @return true if enabled
         */
        isEnabled: function() {
            return GeopalBluetoothInternal.isEnabled();
        },

        /**
         * Request user to enable bluetooth
         * @category Bluetooth
         * @method enable
         * @for Geopal.Bluetooth
         * @param {String} callbackSuccess name of callback success function
         * @param {String} callbackFailed name of callback failed function
         * @example
         *     var success = function() {
          *         var devices = Geopal.Bluetooth.getPairedDevices();
          *             //show list to user etc...
          *
          *     }
         *     var failed= function() {
          *
          *     }
         *     Geopal.Bluetooth.enable("success","failed");
         * @since 1.30.470
         */
        enable: function(callbackSuccess, callbackFailed) {
            GeopalBluetoothInternal.enable(callbackSuccess, callbackFailed);
        },

        /**
         * Makes the bluetooth visible to devices that are scanning
         * @category Bluetooth
         * @method makeDiscoverable
         * @for Geopal.Bluetooth
         * @param {Number} duration duration in seconds for device visibility. Currently the default duration is 120 seconds, and maximum duration is capped at 300 seconds for each request.
         * @example
         *     Geopal.Bluetooth.makeDiscoverable(300);
         * @since 1.30.470
         */
        makeDiscoverable: function(duration) {
            duration = duration || 120;
            GeopalBluetoothInternal.makeDiscoverable(duration);
        },

        /**
         * Disables the devices bluetooth
         * @category Bluetooth
         * @method disable
         * @for Geopal.Bluetooth
         * @example
         *     Geopal.Bluetooth.disable();
         * @since 1.30.470
         */
        disable: function() {
            GeopalBluetoothInternal.disable();
        },

        /**
         * Get a list of all paired bluetooth devices
         * @category Bluetooth
         * @method getPairedDevices
         * @for Geopal.Bluetooth
         * @example
         *     var devices = Geopal.Bluetooth.getPairedDevices();
         * @since 1.30.470
         * @return json array of json objects containing name{String}, address{String}, is_paired{Boolean}
         */
        getPairedDevices: function() {
            return Geopal.response(GeopalBluetoothInternal.getPairedDevices());
        },

        /**
         * Scans for visible bluetooth connections and calls callback with json array of devices when complete
         * @category Bluetooth
         * @method scanForDevices
         * @for Geopal.Bluetooth
         * @param {String} callbackScanComplete name of callback scan finished function
         * @example
         *     var scanCompleted= function(devicesFound) {
          *         //do something with devicesFound. devicesFound may be empty
          *     }
         *     Geopal.Bluetooth.scanForDevices("scanCompleted");
         * @since 1.30.470
         * @return json array of json objects containing name{String}, address{String}, is_paired{Boolean}
         */
        scanForDevices: function(callbackScanComplete) {
            GeopalBluetoothInternal.scanForDevices(callbackScanComplete);
        },

        /**
         * Attempt connect to a bluetooth device by address
         * @category Bluetooth
         * @method connect
         * @for Geopal.Bluetooth
         * @param {String} uuid optional value for uuid connection string changes the uuid for secure or insecure based on boolean value passed.
         * @param {String} address address of bluetooth device
         * @param {Boolean} secure secure connection type (Note:secure prompts user to confirm pairing)
         * @example
         *     var stateChanged = function(state) {
          *       if(state===Geopal.Bluetooth.STATE_CONNECTED){
          *           //you are now connected
          *           Geopal.Bluetooth.send('hello');
          *       }
          *
          *       if(state === Geopal.Bluetooth.STATE_FAILED_TO_CONNECT){
          *           //try again
          *           Geopal.Bluetooth.connect(device.address, false)
          *       }
          *     }
         *
         *     Geopal.Bluetooth.connect(device.address, false)
         * @since 1.30.470
         */
        connect: function(arg0, arg1, arg2, arg3) {
            switch(arguments.length){
                case 2:
                    GeopalBluetoothInternal.connect("", arg0, arg1, true);//arg0 = device, arg1 = secure
                    break;
                case 3:
                    GeopalBluetoothInternal.connect(arg0, arg1, arg2, true);
                    break;
                case 4:
                    GeopalBluetoothInternal.connect(arg0, arg1, arg2, arg3);
                    break;
            }

        },

        /**
         * Check if bluetooth state is connected
         * @category Bluetooth
         * @method isConnected
         * @for Geopal.Bluetooth
         * @example
         *     if(!Geopal.Bluetooth.isConnected()){
          *         //connect
          *    }else{
          *         //send message
          *         Geopal.Bluetooth.send('you are connected');
          *    }
         * @since 1.30.470
         * @return true if connected
         */
        isConnected: function() {
            return GeopalBluetoothInternal.isBluetoothConnected();
        },

        /**
         * send message to connected device
         * @category Bluetooth
         * @method send
         * @for Geopal.Bluetooth
         * @example
         *     if(Geopal.Bluetooth.isConnected()){
          *         Geopal.Bluetooth.send('you are connected');
          *     }
         * @since 1.30.470
         */
        send: function(message) {
            GeopalBluetoothInternal.send(message);
        },

        /**
         * read messages from the connected device
         * @category Bluetooth
         * @method read
         * @for Geopal.Bluetooth
         * @param {String} callback callback function to call when receiving incoming messages
         * @example
         *       var readMessages = function(message) {
          *          Geopal.showMessage(message);
          *       }
         *
         *       if(Geopal.Bluetooth.isConnected()){
          *          Geopal.Bluetooth.read('readMessages');
          *       }
         * @since 1.30.470
         */
        read: function(callback) {
            GeopalBluetoothInternal.read(callback);
        },

        /**
         * Get a json object with the details of the connected device
         * @category Bluetooth
         * @method getConnectionDetails
         * @for Geopal.Bluetooth
         * @example
         *     var details = Geopal.Bluetooth.getConnectionDetails();
         * @since 1.30.470
         * @return json object containing name{String}, address{String}, state{Number}
         */
        getConnectionDetails: function() {
            return Geopal.response(GeopalBluetoothInternal.getConnectionDetails());
        },

        /**
         * disconnect from bluetooth connection
         * @category Bluetooth
         * @method disconnect
         * @for Geopal.Bluetooth
         * @example
         *     Geopal.Bluetooth.disconnect();
         * @since 1.30.470
         */
        disconnect: function() {
            return GeopalBluetoothInternal.disconnect();
        },

        /**
         * allow for devices to connect
         * @category Bluetooth
         * @method listenForIncomingConnections
         * @for Geopal.Bluetooth
         * @example
         *     Geopal.Bluetooth.listenForIncomingConnections();
         * @since 1.30.470
         */
        listenForIncomingConnections: function(keepAlive) {
            keepAlive =  keepAlive || true;
            return GeopalBluetoothInternal.listenForIncomingConnections(keepAlive);
        },

        /**
         * Get bluetooth address
         * @category Bluetooth
         * @method getAddress
         * @for Geopal.Bluetooth
         * @example
         *    var address = Geopal.Bluetooth.getAddress();
         * @since 1.30.470
         * @return mac address of bluetooth
         */
        getAddress: function() {
            return GeopalBluetoothInternal.getAddress();
        },

        /**
         * set the state changed callback function
         * @category Bluetooth
         * @method addStateChangeCallback
         * @param {String} callback function name
         * @for Geopal.Bluetooth
         * @example
         *     var stateChanged = function(state) {
          *       if(state===Geopal.Bluetooth.STATE_CONNECTED){
          *           //you are now connected
          *           Geopal.Bluetooth.send('hello');
          *       }
          *
          *       if(state === Geopal.Bluetooth.STATE_FAILED_TO_CONNECT){
          *           //try again
          *           Geopal.Bluetooth.connect("stateChanged", device.address, false)
          *       }
          *     }
         *
         *     Geopal.Bluetooth.addStateChangeCallback("stateChanged");
         * @since 1.30.470
         */
        addStateChangeCallback: function(callbackStateChange) {
            return GeopalBluetoothInternal.addStateChangeCallback(callbackStateChange);
        },

        /**
         * remove the state changed callback function
         * @category Bluetooth
         * @method removeStateChangeCallback
         * @param {String} callback function name
         * @for Geopal.Bluetooth
         * @example
         *     Geopal.Bluetooth.removeStateChangeCallback("stateChanged");
         * @since 1.30.470
         */
        removeStateChangeCallback: function(callbackStateChange) {
            return GeopalBluetoothInternal.removeStateChangeCallback(callbackStateChange);
        },

        /**
         * clear all state change callbacks
         * @category Bluetooth
         * @method clearStateChangeCallbacks
         * @for Geopal.Bluetooth
         * @example
         *     Geopal.Bluetooth.clearStateChangeCallbacks();
         * @since 1.30.470
         */
        clearStateChangeCallbacks: function() {
            return GeopalBluetoothInternal.clearStateChangeCallbacks();
        },

        /**
         * request pair or unpair bluetooth device. if android version is too low it will bring the user to the bluetooth settings
         * @category Bluetooth
         * @method requestDeviceBondChange
         * @param {String} callback callback for bond changes
         * @param {String} address device bluetooth address
         * @param {Boolean} pair if true pair else unpair
         * @for Geopal.Bluetooth
         * @example
         * var bondChangeCallback = function(state, prevState) {
          *       if (state == Geopal.Bluetooth.BOND_BONDED && prevState == Geopal.Bluetooth.BOND_BONDING) {
          *         Geopal.showMessage("Paired");
          *       } else if (state == Geopal.Bluetooth.BOND_NONE && prevState == Geopal.Bluetooth.BOND_BONDED){
          *         Geopal.showMessage("Unpaired");
          *       }
          *
          *     }
         *     //request pair
         *     Geopal.Bluetooth.requestDeviceBondChange("bondChangeCallback",device.address, true);
         * @since 1.30.470
         */
        requestDeviceBondChange: function(callback, address, pair) {
            return GeopalBluetoothInternal.requestDeviceBondChange(callback, address, pair);
        },

        /**
         * Check if bluetooth is paired with other device
         * @category Bluetooth
         * @method isPaired
         * @for Geopal.Bluetooth
         * @example
         *        if(Geopal.Bluetooth.isPaired(device.address)){
          *           var devices = Geopal.Bluetooth.getPairedDevices();
          *           //show list to user etc...
          *        }else{
          *             Geopal.Bluetooth.enable("success","failed");
          *        }
         * @since 1.30.470
         * @return true if enabled
         */
        isPaired: function(address) {
            return GeopalBluetoothInternal.isPaired(address);
        },

        /**
         * Set the insecure connections uuid
         * @category Bluetooth
         * @method setUUIDInsecure
         * @param {String} uuid devices uuid
         * @for Geopal.Bluetooth
         * @example
         *        Geopal.Bluetooth.setUUIDInsecure("00001101-0000-1000-8000-00805f9b34fb");
         * @since 1.38.810
         */
        setUUIDInsecure: function(uuid) {
            GeopalBluetoothInternal.setUUIDInsecure(uuid);
        },

        /**
         * Set the secure connections uuid
         * @category Bluetooth
         * @method uuid
         * @param {String} uuid devices uuid
         * @for Geopal.Bluetooth
         * @example
         *     Geopal.Bluetooth.setUUIDSecure("00001101-0000-1000-8000-00805f9b34fb");
         * @since 1.38.810
         */
        setUUIDSecure: function(uuid) {
            GeopalBluetoothInternal.setUUIDSecure(uuid);
        },

        /**
         * Gets the available uuids (if any) from the remote device only available from api 15 (ice cream sandwich 4.0.3) and higher
         * @category Bluetooth
         * @method getUuids
         * @param {String} remote devices address
         * @for Geopal.Bluetooth
         * @example
         *     var array = Geopal.Bluetooth.getUUIDs("58:52:00:00:10:01");
         * @since 1.38.810
         * @return list of uuid strings. May be empty.
         * @throws exception if api version too low or bluetooth not turned on or available
         */
        getUUIDs: function(address) {
            return Geopal.response(GeopalBluetoothInternal.getUuids(address));
        },

    },

    /*
     * @class Bluetooth
     * @category Bluetooth
     * @module Geopal
     * @namespace Geopal
     */
    BluetoothLE : {

        /**
         * Initialize Bluetooth on the device. Must be called before anything else. Callback will continuously be used whenever Bluetooth is enabled or disabled.
         * Note: Although Bluetooth initialization could initially be successful, there's no guarantee whether it will stay enabled.
         * @category BluetoothLE
         * @method scanForDevices
         * @for Geopal.BluetoothLE
         * @param {String} startScanSuccess callback for scanning started and scan result found.
         * @param {String} scanError callback for failed start scan
         * @example
         *
         *
         * @since 2.1.xxx
         */
        initialize: function(initializeResult, params) {
            params = params || {}
            params.request = params.request || false
            params.statusReceiver = params.statusReceiver || true
            params.restoreKey = params.restoreKey || "GeoPalBluetoothLowEnergy"
            GeopalBluetoothLEInternal.initialize(initializeResult, params.request,
                params.statusReceiver, params.restoreKey);
        },

        /**
         * Scans for visible bluetooth low energy connections. Returns scan result to success function as json object with status, name, address and advertisement.
         * The advertisement object contains localName, txPowerLevel and serviceUuids. Other keys may also be included for parity with other services
         * @category BluetoothLE
         * @method scanForDevices
         * @for Geopal.BluetoothLE
         * @param {String} startScanSuccess callback for scanning started and scan result found.
         * @param {String} scanError callback for failed start scan
         * @example
         * var scanResult= function(bledevice) {
         *     if(bledevice.hasOwnProperty("status")){
         *         if(bledevice.status === "scanStarted"){
         *              //this is where you could show message to the user
         *              //or change the 'Start Scanning' button to 'Stop Scanning'
         *              //or other ui notifications
         *         }
         *
         *         if(bledevice.status === "scanResult"){
         *             //set device list in html
         *             if(bledevice.advertisement.hasOwnProperty("localName")){
         *                 device_list += '<li name="'+bledevice.address+'">' + bledevice.advertisement.localName+ '</li>';
         *                 console.log(JSON.stringify(bledevice))
         *
         *                 $('#list_devices').html(device_list).listview("refresh");
         *              }
         *         }
         *     }
         * }
         *
         * var scanError = function() {
         *     //show message about scan error or retry read (with max retries)
         *     //add check for bluetooth disabled / permissions
         * }
         * Geopal.BluetoothLE.startScan("scanResult", "scanError");
         *
         * @since 2.1.xxx
         */
        startScan: function(startScanSuccess, startScanError, params) {
            startScanError = startScanError || "console.log"
            params = params || {}
            params.scanMode = params.scanMode || -1
            params.matchMode = params.matchMode || -1
            params.matchNum = params.matchNum || -1
            params.services = params.services || ""
            GeopalBluetoothLEInternal.scanForDevices(startScanSuccess, startScanError,
                params.scanMode, params.matchMode, params.matchNum, params.services);
        },

        /**
         * Stops scanning for visible bluetooth connections.
         * Scanning for BLE connections is battery intensive and is advisable to stop scanning after required conditions (i.e. device found) have been met
         * @category BluetoothLE
         * @method stopScan
         * @for Geopal.BluetoothLE
         * @param {String} scanStopped success callback
         * @param {String} scanError error callback
         * @example
         * var scanError = function() {
         *     //show message about scan error
         *     //add check for bluetooth disabled / permissions
         * }
         * Geopal.BluetoothLE.stopScan("scanStopped", "scanError");
         * @since 2.1.xxx
         */
        stopScan: function(stopScanSuccess, stopScanError) {
            GeopalBluetoothLEInternal.stopScan(stopScanSuccess, stopScanError);
        },

        /**
         * Connect with a BLE device via its address. Returns to success method if connected or disconnected.
         * @category BluetoothLE
         * @method connect
         * @for Geopal.BluetoothLE
         * @param {String} connectSuccess
         * @param {String} connectError
         * @param {JsonObject} Json object contain an address key for connecting to
         * @example
         *
         * var connected= function(connection_info) {
         *      if(connection_info.status === "connected"){
         *          $.mobile.changePage('#bluetooth_read');
         *          readBank1();
         *      }else{
         *          //status is disconnected - show warning, try reconnecting or go back to scan mode
         *      }
         *  }
         *
         *  var connectFail = function() {
         *      //Warn user
         *  }
         *  var info = {
         *      "address":"00:A0:50:37:06:84"
         *  }
         *
         * Geopal.BluetoothLE.connect("connected", "connectFail",info);
         *
         * @since 2.1.xxx
         */
        connect: function(connectSuccess, connectErrorString, params) {
             GeopalBluetoothLEInternal.connect(connectSuccess, connectErrorString, params.address);
        },

        /**
         * Check if already connected with a BLE device
         * @category BluetoothLE
         * @method isConnected
         * @for Geopal.BluetoothLE
         * @param {String} isConnectedSuccess
         * @param {String} isConnectedError
         * @example
         *
         *
         *
         *
         *
         * @since 2.1.xxx
         */
        isConnected: function(isConnectedSuccess, isConnectedError, params) {
             GeopalBluetoothLEInternal.isConnected(isConnectedSuccess, isConnectedError, params.address);
        },

        /**
         * Read characteristic from a connected BLE device.
         * @category BluetoothLE
         * @method read
         * @for Geopal.BluetoothLE
         * @param {String} readSuccess
         * @param {String} readError
         * @param {JsonObject} json object containing service and characteristic uuids
         * @example
         * var readVendBank1= function(message) {
         *       console.log("read bank 1 success");
         *       var hexstring =  base64toHEX(message.value);
         *       units1to10 = hextoUint16Array(hexstring);
         *
         *       for(var i = 0; i < units1to10.length; i++){
         *          $("#bank1_value_"+(i+1)).text(units1to10[i]); ;
         *          console.log("text changed "+ units1to10[i])
         *       }
         *
         *   }
         *
         *   var readVendBank1Error = function() {
         *       //show message about read error or retry read (with max retries)
         *       //add check for lost connection or bluetooth disabled
         *  }
         *  var bank1Json =
         *     {
         *       "service": service_uuid,
         *       "characteristic": bank_1_uuid
         *     }
         *
         *     Geopal.BluetoothLE.read("readVendBank1", "readVendBank1Error", bank1Json)
         * @since 2.1.xxx
         */
        read: function(readSuccess, readError, params){
            GeopalBluetoothLEInternal.read(readSuccess, readError, params.service, params.characteristic)
        },

        /**
         * Read characteristic descriptor from a connected BLE device.
         * @category BluetoothLE
         * @method readDescriptor
         * @for Geopal.BluetoothLE
         * @param {String}
         * @param {String}
         * @param {Json Object}
         * @example
         * var readVendBankDescriptor1= function(message) {
         *       var hexstring =  base64toHEX(message.value);
         *
         *  }
         *
         *  var readVendBankDescriptor1Error = function() {
         *       //show message about read error or retry read (with max retries)
         *       //add check for lost connection or bluetooth disabled
         *  }
         *  var bankDescriptor1Json =
         *  {
         *       "service": service_uuid,
         *       "characteristic": bank_1_uuid,
         *       "descriptor": bank_1_descriptor_uuid
         *  }
         *
         *  Geopal.BluetoothLE.readDescriptor("readVendBankDescriptor1", "readVendBankDescriptor1Error", bankDescriptor1Json)
         *
         *
         *
         *
         * @since 2.1.xxx
         */
        readDescriptor: function(readSuccess, readError, params){
            GeopalBluetoothLEInternal.readDescriptor(readSuccess, readError, params.service, params.characteristic, params.descriptor)
        },

        /**
         * write for visible bluetooth connections
         * @category BluetoothLE
         * @method write
         * @for Geopal.BluetoothLE
         * @param {String}
         * @example
         * var clearUnitFromBank1Success = function(writeInfo) {
         *    readBank1();
         * }
         *
         * var clearUnitError = function() {
         *
         * }
         *
         * var clearUnit1Json =
         *    {
         *      "service": service_uuid,
         *      "characteristic": command_register_uuid,
         *      "value":"BQA="
         *    }
         *
         *     Geopal.BluetoothLE.write("clearUnitFromBank1Success", "clearUnitError", clearUnit1Json);
         * @since 2.1.xxx
         */
        write: function(writeSuccess, writeError, params){
            GeopalBluetoothLEInternal.write(writeSuccess, writeError, params.service, params.characteristic, params.value)
        },

        /**
         * enable for visible bluetooth connections
         * @category BluetoothLE
         * @method enable
         * @for Geopal.BluetoothLE
         * @param {String}
         * @example
         * var enableSuccess= function() {
         *     //Bluetooth is enabled
         * }
         *
         * var enableFail= function() {
         *     //Bluetooth was not enabled
         * }
         *
         * Geopal.BluetoothLE.enable("enableSuccess", "enableFail");
         * @since 2.1.xxx
         */
        enable: function(callbackSuccess, callbackFailed) {
            GeopalBluetoothInternal.enable(callbackSuccess, callbackFailed);
        },

        /**
         * enable for visible bluetooth connections
         * @category BluetoothLE
         * @method isEnabled
         * @for Geopal.BluetoothLE
         * @param {String}
         * @example
         * var isEnabledSuccess= function(info) {
         *      if(info.isEnabled){
         *          //Bluetooth is enabled
         *      }else{
         *          //Bluetooth is disabled
         *      }
         * }
         *
         * Geopal.BluetoothLE.isEnabled("isEnabledSuccess");
         *
         * @since 2.1.xxx
         */
        isEnabled: function(callbackSuccess) {
         var fn = window[callbackSuccess];
            fn(GeopalBluetoothInternal.isEnabled());
        },

        /**
         * Disconnect from BLE device.
         * @category BluetoothLE
         * @method disconnect
         * @for Geopal.BluetoothLE
         * @param {String} success callback
         * @param {String} fail callback
         * @param {JsonObject} json object with address of device to disconnect from.
         * @example
         * var disconnectSuccess= function(connection_info) {
         *      if(connection_info.status === "disconnected"){
         *
         *      }
         *  }
         *
         *  var disconnectError = function() {
         *      //Warn user
         *  }
         *  var info = {
         *      "address":"00:A0:50:37:06:84"
         *  }
         *
         * Geopal.BluetoothLE.disconnect("disconnectSuccess", "disconnectError",info);
         * @since 2.1.xxx
         */
        disconnect: function(disconnectSuccess, disconnectError, params){
            GeopalBluetoothLEInternal.disconnect(disconnectSuccess, disconnectError, params.address)
        },

        /**
         * Discover services from BLE device.
         * @category BluetoothLE
         * @method discover
         * @for Geopal.BluetoothLE
         * @param {String} success callback return json contain services and details
         * @param {String} fail callback
         * @param {JsonObject} json object with address of device to discover from.
         * @example
         * var discoverSuccess= function(services) {
         *
         *  }
         *
         *  var discoverError = function() {
         *      //Warn user
         *  }
         *  var info = {
         *      "address":"00:A0:50:37:06:84"
         *  }
         *
         * Geopal.BluetoothLE.disconnect("discoverSuccess", "discoverError",info);
         * @since 2.1.xxx
         */
        discover: function(discoverSuccess, discoverError, params){
            params.address = params.address || "";
            params.clearCache = params.clearCache || false;
            GeopalBluetoothLEInternal.discoverServices(discoverSuccess, discoverError, params.address, params.clearCache);
        }

    },

    /*
     * @class Debug
     * @category Debug
     * @module Geopal
     * @namespace Geopal
     */
    Debug : {
        /**
         * Check if web contents debugging has been enabled. Defaults to false. This will return false if the device is running 4.3 or below
         * @category Debug
         * @method isWebContentsDebuggingEnabled
         * @for Geopal.Debug
         * @example
         *     Geopal.Debug.isWebContentsDebuggingEnabled()
         * @since
         * @return true if webview is now debuggable from chrome
         */
        isWebContentsDebuggingEnabled: function() {
            return GeopalDebugInternal.isWebContentsDebuggingEnabled();
        },

        /**
         * Check if debugger is connected. This is if a debugger is attached to Android process from an ide e.g Android Studio
         * @category Debug
         * @method isDebuggerConnected
         * @for Geopal.Debug
         * @example
         *     Geopal.Debug.isDebuggerConnected()
         * @since
         * @return true if attached
         */
        isDebuggerConnected: function() {
            return GeopalDebugInternal.isDebuggerConnected();
        },

        /**
         * Check if the device settings has the usb debugging enabled. This is found under the developer options on the device the checkbox 'USB debugging'
         * @category Debug
         * @method isADBEnabled
         * @for Geopal.Debug
         * @example
         *     Geopal.Debug.isADBEnabled()
         * @since
         * @return true if connected
         */
        isADBEnabled: function() {
            return GeopalDebugInternal.isADBEnabled();
        },

        /**
         * Only available for 4.4 and above. Defaults to false. Allows for remote debugging of webviews from chrome applies to all webviews across the app.
         * see https://developer.chrome.com/devtools/docs/remote-debugging for setting up chrome. This sould only ever be set for debugging and is bad pratice to allow for it to be always set
         * @category Debug
         * @method setWebContentsDebuggingEnabled
         * @for Geopal.Debug
         * @example
         *     $('#enable').on("click", function() {
          *          Geopal.Debug.setWebContentsDebuggingEnabled(true);
          *      });
         *
         *      $('#disable').on("click", function() {
          *          Geopal.Debug.setWebContentsDebuggingEnabled(false);
          *      });
         * @since
         *
         */
        setWebContentsDebuggingEnabled: function(enable) {
            return GeopalDebugInternal.setWebContentsDebuggingEnabled(enable);
        }
    },

    /*
     * @class Sync
     * @category Sync
     * @module Geopal
     * @namespace Geopal
     */
    Sync : {
        /**
         * Sync all
         *
         * @property SYNC_ALL
         * @for Geopal.Sync
         * @type Number
         */
        SYNC_ALL: 1,

        /**
         * Retry all offline syncing
         *
         * @property SYNC_RETRY
         * @for Geopal.Sync
         * @type Number
         */
        SYNC_RETRY: 2,

        /**
         * Sync new jobs
         *
         * @property SYNC_NEWJOBS
         * @for Geopal.Sync
         * @type Number
         */
        SYNC_NEWJOBS: 3,

        /**
         * Sync assets
         *
         * @property SYNC_ASSETS
         * @for Geopal.Sync
         * @type Number
         */
        SYNC_ASSETS: 4,

        /**
         * Sync templates
         *
         * @property SYNC_TEMPLATES
         * @for Geopal.Sync
         * @type Number
         */
        SYNC_TEMPLATES: 5,

        /**
         * Sync all offline syncing and assets
         *
         * @property SYNC_RETRY_AND_ASSETS
         * @for Geopal.Sync
         * @type Number
         */
        SYNC_RETRY_AND_ASSETS: 6,

        /**
         * Sync forms
         *
         * @property SYNC_FORMTEMPLATES
         * @for Geopal.Sync
         * @type Number
         */
        SYNC_FORMTEMPLATES: 8,

        /**
         * Sync offline changes to assets
         *
         * @property SYNC_ASSETS
         * @for Geopal.Sync
         * @type Number
         */
        SYNC_ASSETS_RETRYER: 9,

        /**
         * Sync offline changes to jobs
         *
         * @property SYNC_JOBS
         * @for Geopal.Sync
         * @type Number
         */
        SYNC_JOBS: 10,

        /**
         * Sync lone worker events
         *
         * @property SYNC_LONE_WORKER_EVENTS
         * @for Geopal.Sync
         * @type Number
         */
        SYNC_LONE_WORKER_EVENTS: 11,

        /**
         * Sync employees
         *
         * @property SYNC_ALL_EMPLOYEES
         * @for Geopal.Sync
         * @type Number
         */
        SYNC_ALL_EMPLOYEES: 12,

        /**
         * Sync shifts
         *
         * @property SYNC_ALL_SHIFTS
         * @for Geopal.Sync
         * @type Number
         */
        SYNC_ALL_SHIFTS: 13,

        /**
         * Call Sync on a section or sections based on sync type id
         * @category Sync
         * @method doSync
         * @for Geopal.Sync
         * @example
         *
         * @since
         *
         */
        doSync: function(syncType, completedSyncCallback, failedSyncCallback) {
            completedSyncCallback = completedSyncCallback || "";
            failedSyncCallback = failedSyncCallback || "";
            GeopalSyncInternal.doSync(syncType, completedSyncCallback, failedSyncCallback);
        },

        /*
         * @class Asset
         * @category Asset
         * @for Geopal.Sync
         * @module Geopal
         * @namespace Geopal
         */
        Asset : {
            /**
             * Gets Asset details from server and saves to the device
             * @category Sync
             * @method sync
             * @for Geopal.Sync.Asset
             * @example
             *
             * @since
             *
             */
            sync: function(identifier, completedSyncCallback, failedSyncCallback) {
                completedSyncCallback = completedSyncCallback || "";
                failedSyncCallback = failedSyncCallback || "";
                GeopalSyncInternal.syncAssetByIdentifier(identifier, completedSyncCallback, failedSyncCallback);
            },

            /**
             * Send asset details to server.
             * @category Sync
             * @method send
             * @for Geopal.Sync.Asset
             * @example
             *
             * @since
             *
             */
            send: function(identifier, completedSyncCallback, failedSyncCallback) {
                completedSyncCallback = completedSyncCallback || "";
                failedSyncCallback = failedSyncCallback || "";
                GeopalSyncInternal.sendAssetByIdentifier(identifier, completedSyncCallback);
            }

        }
    },

    /*
     * @class File
     * @category File
     * @module Geopal
     * @namespace Geopal
     */
    File : {
        /**
         * launches intent from webview.
         *
         * @category File
         * @for Geopal.File
         * @param {String} uri
         * @method launchIntent
         * @example
         *     Geopal.File.view("/storage/emulated/0/Android/data/com.edm.geopal/files/geopal/geopal1.39.400/files/32517237.jpeg");
         */
        view: function (uri) {
            var path = "file://";
            path+= uri;
            var ext = path.substr(path.lastIndexOf('.') + 1);
            var mimetypeObject  = MimeTypesHelper.lookupByExtension(ext);

            GeopalInternal.launchIntent("android.intent.action.VIEW", path, mimetypeObject.mimetype, null, null);
        },
    },

    /*
     * @class Interop
     * @category Interop
     * @module Geopal
     * @namespace Geopal
     */
    Interop : {
        /**
         *
         * launches intent from webview.
         *
         * @category Interop
         * @for Geopal.Interop
         *
         * @param jsonObject JSON object containing action, data, package, class_name.
         *
         * @method execute
         * @example
         *      //Sample for opening a web page
         *       var json = {
         *          "action":"android.intent.action.VIEW",
         *          "data":"http://www.example.com"
         *       }
         *       Geopal.Interop.execute(json);
         *
         *      //Sample for opening the Geopal PDF app
         *      var jsonData = {
         *          "action":"android.intent.action.MAIN",
         *          "package":"com.edm.geodox",
         *          "class_name":"MainActivity"
         *      };
         *      Geopal.Interop.execute(jsonData);
         *
         * @since 2.5.xxx
         */
        execute: function (jsonObject) {
            jsonObject.data = jsonObject.data || null
            jsonObject.type = jsonObject.type || null
            jsonObject.package = jsonObject.package || null
            jsonObject.class_name = jsonObject.class_name || null
            GeopalInternal.launchIntent(jsonObject.action, jsonObject.data, jsonObject.type, jsonObject.package, jsonObject.class_name);
        },
    },

    /*
     * @class Integrations
     * @category Integrations
     * @module Geopal
     * @namespace Geopal
     */
    Integrations : {

        Firebase: {
            connect: function (databaseUrl, apiKey, gcmSenderId, storageBucket) {
                var firebase = new Firebase();
                firebase.connect(databaseUrl, apiKey, gcmSenderId, storageBucket);
                return firebase;
            }
        }
    },

    /**
     * checks the status of result. If status equals false throws error with error message
     * @param {result} json result
     */
    response: function (result) {
        try{
            var res = JSON.parse(result);
            if (res['status']) {
                if (Geopal.isString(res['result'])) {
                    try {
                        res['result'] = JSON.parse(res['result']);
                    } catch(e){
                        //ignore
                    }
                }
                return res['result'];
            } else {
                throw res['error_msg'];
            }
        } catch(e){
            throw e;
        }
    },

    /**
     * checks the param is a string
     * @param {str} string
     */
    isString: function(str) {
        return (typeof str == 'string' || str instanceof String);
    },

    /**
     * returns the filepath of the job field file by name as a parameter passed to the success callback
     *
     * @for Geopal
     * @param {String} callbackSuccess name of callback success function
     * @param {String} callbackFailed name of callback failed function
     * @param {String} name of jobfield (returns first match)
     * @example
     *     var success = function(filepath) {
     *         Geopal.showMessage(filepath);
     *         Geopal.setJobWorkflowValue(filepath);
     *     };
     *
     *     var cancel = function() {
     *         Geopal.showMessage('canceled');
     *     };
     *     Geopal.getJobfieldFileByName('success', 'cancel', 'JobField 1');
     * @method getJobfieldFileByName
     */
    getJobfieldFileByName : function (callbackSuccess, callbackFailed, name) {
        return GeopalInternal.getJobfieldFileByName(callbackSuccess, callbackFailed, name);
    },

    /**
     * returns the filepath of the job field file by template Id as a parameter passed to the success callback
     * @param {String} callbackSuccess name of callback success function
     * @param {String} callbackFailed name of callback failed function
     * @param {Number} templateId Template Id of jobfield
     * @example
     *     var success = function(filepath) {
     *         Geopal.showMessage(filepath);
     *         Geopal.setJobWorkflowValue(filepath);
     *     };
     *
     *     var cancel = function() {
     *         Geopal.showMessage('failed');
     *     };
     *     Geopal.getJobfieldFileByTemplateId('success', 'cancel', 12134)
     *
     * @method getJobfieldFileByTemplateId
     */
    getJobfieldFileByTemplateId : function (callbackSuccess, callbackFailed, templateId) {
        return GeopalInternal.getJobfieldFileByTemplateId(callbackSuccess, callbackFailed, templateId);
    },

    /**
     * returns the filepath of the job field file by position as a parameter passed to the success callback
     * @param {String} callbackSuccess name of callback success function
     * @param {String} callbackFailed name of callback failed function
     * @param {Number} position position of jobfield
     * @method getJobfieldFileByPosition
     * @example
     *     var success = function(filepath) {
     *         Geopal.showMessage(filepath);
     *         Geopal.setJobWorkflowValue(filepath);
     *     };
     *
     *     var cancel = function() {
     *         Geopal.showMessage('failed');
     *     };
     *     Geopal.getJobfieldFileByPosition('success', 'cancel', 1)
     */
    getJobfieldFileByPosition : function (callbackSuccess, callbackFailed, position) {
        return GeopalInternal.getJobfieldFileByPosition(callbackSuccess, callbackFailed, position);
    },

    /**
     * exits the current screen. Does not change job status
     * @method finish
     * @example
     *     Geopal.finish();
     */
    finish: function () {
        return GeopalInternal.finish();
    },

    /**
     * launches youtube video
     * @param {String} videoId video id of youtube video
     * @method launchYoutube
     * @example
     *     Geopal.launchYoutube('lFarE1hH0ss');
     */
    launchYoutube: function (videoId) {
        return GeopalInternal.launchYoutube(videoId);
    },

    /**
     * launches url in webview
     * @param {String} url url to go to
     * @method launchUrl
     * @example
     *     Geopal.launchUrl('https://ejf.io/android/build_system/');
     */
    launchUrl: function (url) {
        return GeopalInternal.launchUrl(url);
    },

    /**
     * get the file contents as a string and escapes EcmaScript defaulted to charset UTF-8
     * @param {String} callbackSuccessName callback for success returns string
     * @param {String} callbackFailName callback if file not found
     * @param {String} filepath filepath of file to be parsed
     * @param {String} charset character encoding of file. defaults to 'UTF-8'
     * @method getStringFromFile
     * @example
     *     var success = function(contents) {
     *         Geopal.setJobWorkflowValue(contents);
     *     };
     *
     *     var cancel = function() {
     *         Geopal.showMessage('failed');
     *     };
     *     Geopal.getStringFromFile('success', 'cancel', filepath, 'UTF-8')
     */
    getStringFromFile: function (callbackSuccessName, callbackFailName, filepath, charset) {
        switch(arguments.length){
            case 3:
                return GeopalInternal.getStringFromFile( callbackSuccessName,callbackSuccessName, filepath) ;
            case 4:
                return GeopalInternal.getStringFromFile( callbackSuccessName,callbackSuccessName, filepath, charset) ;
        }

    },

    /**
     * replaces "&lt;?xml version=\"1.0\" encoding=\"UTF-16\" standalone=\"no\"?&gt;" with ""
     *
     */
    replaceEscapedUtfString: function (input) {
        return GeopalInternal.replaceEscapedUtfString(input) ;
    },

    /**
     * unescapes ECMAScript
     *
     * @method unescapeECMAScript
     * @example
     *    Geopal.unescapeECMAScript('\nTest\n');
     *    it will turn a sequence of '\' and 'n' into a newline character, unless the '\' is preceded by another '\'.
     * @return {String} unescaped string
     */
    unescapeECMAScript: function (input) {
        return GeopalInternal.unescapeECMAScript(input) ;
    },

    /**
     * Gets the job server id for the job. If the job has not been synced yet to the server then it is 0.
     *
     * @example
     *    Geopal.getJobId();
     *
     * @category Jobs
     * @method getJobId
     *
     * @return {Number} the current job server id
     */
    getJobId: function () {
        return GeopalInternal.getJobId();
    },

    /**
     * Gets the geopal job identifier for the job.
     *
     * @category Jobs
     * @method getJobIdentifier
     * @example
     *    Geopal.getJobIdentifier();
     * @return {String} the current job identifier
     */
    getJobIdentifier: function() {
        return GeopalInternal.getJobIdentifier();
    },

    /**
     * Gets the geopal job template name for the job.
     *
     * @category Jobs
     * @method getJobTemplateName
     * @example
     *    Geopal.getJobTemplateName();
     * @return {String} name of the jobs template
     */
    getJobTemplateName: function() {
        return GeopalInternal.getJobTemplateName();
    },

    /**
     * Gets the geopal job template id for the job.
     *
     * @category Jobs
     * @method getJobTemplateId
     * @example
     *    Geopal.getJobTemplateId();
     * @return {Number} id of the jobs template
     */
    getJobTemplateId: function() {
        return GeopalInternal.getJobTemplateId();
    },

    /**
     * Gets the first three lines of address of the job
     *
     * @example
     *    Geopal.getJobAddress();
     *
     * @category Jobs
     * @method getJobAddress
     *
     * @return {String} first three lines of the address as a string
     */
    getJobAddress: function() {
        return GeopalInternal.getJobAddress();
    },

    /**
     * Gets the address server id of the job
     *
     * @example
     *    Geopal.getJobAddressId();
     *
     * @category Jobs
     * @method getJobAddressId
     * @return {Number} address server id or -1 if not found
     */
    getJobAddressId: function() {
        try{
            return GeopalInternal.getJobAddressId();
        }catch(e){
            return -1;
        }
    },

    /**
     * Gets the customer identifier
     *
     * @category Jobs
     * @method getJobCustomerIdentifier
     * @example
     *    Geopal.getJobCustomerIdentifier();
     * @return {String} the customer identifier or ''
     */
    getJobCustomerIdentifier: function() {
        return GeopalInternal.getJobCustomerIdentifier();
    },

    /**
     * Gets the customer server id
     *
     * @category Jobs
     * @method getJobCustomerId
     * @example
     *    Geopal.getJobCustomerId();
     * @return {Number} customer server id or 0
     */
    getJobCustomerId: function() {
        return GeopalInternal.getJobCustomerId();
    },

    /**
     * Gets the customer name
     *
     * @category Jobs
     * @method getJobCustomerName
     * @example
     *    Geopal.getJobCustomerName();
     * @return {String} customers name or ""
     */
    getJobCustomerName: function() {
        return GeopalInternal.getJobCustomerName();
    },

    /**
     * Gets the assigned to employee's full name
     *
     * @category Jobs
     * @method getJobEmployeeFullName
     * @example
     *    Geopal.getJobEmployeeFullName();
     * @return {String} string of first and last name of currently logged in employee
     */
    getJobEmployeeFullName: function() {
        return GeopalInternal.getJobEmployeeFullName();
    },

    /**
     * Gets the assigned to employee's id
     *
     * @category Jobs
     * @method getJobEmployeeId
     * @example
     *    Geopal.getJobEmployeeId();
     * @return {Number} currently logged in employee's id or 0 if employee not found
     */
    getJobEmployeeId: function() {
        return GeopalInternal.getJobEmployeeId();
    },

    /**
     * Gets the job persons identifier. In the UI its called Contact.
     *
     * @category Jobs
     * @method getJobPersonIdentifier
     * @example
     *    Geopal.getJobPersonIdentifier();
     * @return {String} the job persons identifier  or '' if no person found
     */
    getJobPersonIdentifier: function() {
        return GeopalInternal.getJobPersonIdentifier();
    },

    /**
     * Gets the job persons server id. In the UI its called Contact.
     *
     * @category Jobs
     * @method getJobPersonId
     * @example
     *    Geopal.getJobPersonId();
     * @return {Number} the job persons server id or 0
     */
    getJobPersonId: function() {
        return GeopalInternal.getJobPersonId();
    },

    /**
     * Gets the job persons first name. In the UI its called Contact.
     *
     * @category Jobs
     * @method getJobPersonFirstName
     * @example
     *    Geopal.getJobPersonFirstName();
     * @return {String} job persons first name or '' if no person found
     */
    getJobPersonFirstName: function() {
        return GeopalInternal.getJobPersonFirstName();
    },

    /**
     * Gets the job persons last name. In the UI its called Contact.
     *
     * @category Jobs
     * @method getJobPersonLastName
     * @example
     *    Geopal.getJobPersonLastName();
     * @return {String} job persons last name or '' if no person found
     */
    getJobPersonLastName: function() {
        return GeopalInternal.getJobPersonLastName();
    },

    /**
     * Gets the job persons full name. In the UI its called Contact.
     *
     * @category Jobs
     * @method getJobPersonFullName
     * @example
     *    Geopal.getJobPersonFullName();
     * @return {String} first and last name of person or '' if no person found
     */
    getJobPersonFullName: function() {
        return GeopalInternal.getJobPersonFullName();
    },

    /**
     * Gets the job persons mobile number. In the UI its called Contact.
     *
     * @category Jobs
     * @method getJobPersonMobileNumber
     * @example
     *    Geopal.getJobPersonMobileNumber();
     * @return {String} the job persons mobile number or empty string if job has no contact
     */
    getJobPersonMobileNumber: function() {
        return GeopalInternal.getJobPersonMobileNumber();
    },

    /**
     * Gets the job's status id. You can see all job statuses via api/jobs/statuses.
     *
     * @category Jobs
     * @method getJobStatusId
     * @example
     *    Geopal.getJobStatusId();
     * @return {Number}  UNASSIGNED(0), ASSIGNED(1), REJECTED(2), COMPLETED(3), DELETED(4), INPROGRESS(5), ACCEPTED(6), INCOMPLETE(7), REVIEW(8), ARCHIVE(9), LINKED(10), CANCELLED(11), PENDING(12), PLANNED(4), PAUSED(15);
     */
    getJobStatusId: function() {
        return GeopalInternal.getJobStatusId();
    },

    /**
     * Gets the job's start date as year-month-day String e.g. 2014-09-18.
     *
     * @category Jobs
     * @method getJobStartDate
     * @example
     *    Geopal.getJobStartDate();
     * @return {String} A string representing a date, formatted in format YYYY-MM-DD
     */
    getJobStartDate: function() {
        return GeopalInternal.getJobStartDate();
    },

    /**
     * Gets the job's start time as hour:minute:second String e.g. 15:09:00
     *
     * @category Jobs
     * @method getJobStartTime
     * @example
     *    Geopal.getJobStartTime();
     * @return {String}  A string representing a time, formatted in format HH:MM:SS
     */
    getJobStartTime: function() {
        return GeopalInternal.getJobStartTime();
    },

    /**
     * Gets a job field value by name.<br/>
     * <br/>
     * Please note that it's entirely possible to have multiple fields with the same name. In such case, this function
     * will return the value of the first field encountered.
     *
     * @example
     *     Geopal.getJobFieldValueByName('Enter Customer Id');
     *
     * @category Job Fields
     * @method getJobFieldValueByName
     * @param {String} jobFieldName
     * @return {String} The value of the field. If multiple fields are found, returns the value of the first one.
     */
    getJobFieldValueByName: function(jobFieldName) {
        return GeopalInternal.getJobFieldValueByName(jobFieldName);
    },

    /**
     * Gets a job field value by their position in the list.<br/>
     * <br/>
     * The index must be between 0 and the number of fields minus one.
     *
     * @example
     *     Geopal.getJobFieldValueByPosition(0);
     *
     * @category Job Fields
     * @method getJobFieldValueByPosition
     * @param {Number} position The Job Field position, starting from 0
     * @return {String} The value of the job field at the specified position or an empty string if the index is too big
     */
    getJobFieldValueByPosition: function(position) {
        return GeopalInternal.getJobFieldValueByPosition(position);
    },

    /**
     * Gets a job field value by their template id. You can find the template id of job with the api
     * api/jobtemplates/get call.
     *
     * @example
     *     Geopal.getJobFieldValueByTemplateId(999);
     *
     * @category Job Fields
     * @method getJobFieldValueByTemplateId
     * @param {Number} templateId The Job Field Template Id
     * @return {String} The value of the job field with matching template id or an empty string if no job field found
     *
     */
    getJobFieldValueByTemplateId: function(templateId) {
        return GeopalInternal.getJobFieldValueByTemplateId(templateId);
    },

    /**
     * Sets a Job Field value by name.
     *
     * @category Job Fields
     * @method setJobFieldValueByName
     *
     * @example
     *     Geopal.setJobFieldValueByName('Enter Customer Id', 'Customer Id');
     *
     * @param {String} jobFieldName The name of the job field
     * @param {String} jobFieldValue The value to assign to the field
     */
    setJobFieldValueByName: function(jobFieldName, jobFieldValue) {
        GeopalInternal.setJobFieldValueByName(jobFieldName, jobFieldValue);
    },

    /**
     * Sets a Job Field value by position.
     *
     * @example
     *     Geopal.setJobFieldValueByPosition(1, 'new value');
     *
     * @category Job Fields
     * @method setJobFieldValueByPosition
     * @param {Number} position The position of the field to set, starting from 0.
     * @param {String} jobFieldValue The value to assign to the field
     */
    setJobFieldValueByPosition: function(position, jobFieldValue) {
        GeopalInternal.setJobFieldValueByPosition(position, jobFieldValue)
    },

    /**
     * Sets a Job Field value by template id.
     *
     * @example
     *     Geopal.setJobFieldValueByTemplateId(999, 'new value');
     *
     * @category Job Fields
     * @method setJobFieldValueByTemplateId
     * @param {Number} templateId The id of the template
     * @param {String} jobFieldValue The value to assign to the field
     */
    setJobFieldValueByTemplateId: function(templateId, jobFieldValue) {
        GeopalInternal.setJobFieldValueByTemplateId(templateId, jobFieldValue);
    },

    /**
     * Downloads job field file by name. Executes a callback once the download has finished, whether correctly or with
     * an error.<br/>
     * <br/>
     * The functions used as callbacks must live in the window scope (accessible with window['funcname']). Such
     * functions will be passed an argument upon calling. The argument is either the path of the file or a string
     * representing the error message.
     *
     * @example
     *     var successFileFound = function(filepath) {
     *         Geopal.showMessage(filepath);
     *     };
     *
     *     var failedFileNotFound = function(error) {
     *         Geopal.showMessage(error);
     *     };
     *
     *     Geopal.downloadJobfieldFileByName('successFileFound','failedFileNotFound','readme.txt');
     *
     * @category Job Field Files
     * @since 1.7.x
     * @method downloadJobfieldFileByName
     * @param {String} callbackSuccessName The name of a callback function to call in case of success. The function
     *                                     must live in the window scope.
     * @param {String} callbackFailName The name of a callback function to call in case of failure. The function must
     *                                  live in the window scope.
     * @param {String} filename The name of the file to download.
     */
    downloadJobfieldFileByName: function(callbackSuccessName, callbackFailName, filename) {
        GeopalInternal.downloadJobfieldFileByName(callbackSuccessName, callbackFailName, filename);
    },

    /**
     * Downloads job field file by templateId. Executes a callback once the download has finished, whether correctly or with
     * an error.<br/>
     * <br/>
     * The functions used as callbacks must live in the window scope (accessible with window['funcname']). Such
     * functions will be passed an argument upon calling. The argument is either the path of the file or a string
     * representing the error message.
     *
     * @example
     *     var successFileFound = function(filepath) {
     *         Geopal.showMessage(filepath);
     *     };
     *
     *     var failedFileNotFound = function(error) {
     *         Geopal.showMessage(error);
     *     };
     *
     *     Geopal.downloadJobfieldFileByTemplateId('successFileFound','failedFileNotFound',12);
     *
     * @category Job Field Files
     * @since 1.7.x
     * @method downloadJobfieldFileByTemplateId
     * @param {String} callbackSuccessName The name of a callback function to call in case of success. The function
     *                                     must live in the window scope.
     * @param {String} callbackFailName The name of a callback function to call in case of failure. The function must
     *                                  live in the window scope.
     * @param templateId The template Id
     */
    downloadJobfieldFileByTemplateId: function(callbackSuccessName, callbackFailName, templateId) {
        GeopalInternal.downloadJobfieldFileByTemplateId(callbackSuccessName, callbackFailName, templateId);
    },

    /**
     * Downloads job field file by position. Executes a callback once the download has finished, whether correctly or with
     * an error.<br/>
     * <br/>
     * The functions used as callbacks must live in the window scope (accessible with window['funcname']). Such
     * functions will be passed an argument upon calling. The argument is either the path of the file or a string
     * representing the error message.
     *
     * @example
     *     var successFileFound = function(filepath) {
     *         Geopal.showMessage(filepath);
     *     };
     *
     *     var failedFileNotFound = function(error) {
     *         Geopal.showMessage(error);
     *     };
     *
     *     Geopal.downloadJobfieldFileByPosition('successFileFound','failedFileNotFound',0);
     *
     * @category Job Field Files
     * @since 1.7.x
     * @method downloadJobfieldFileByPosition
     * @param {String} callbackSuccessName The name of a callback function to call in case of success. The function
     *                                     must live in the window scope.
     * @param {String} callbackFailName The name of a callback function to call in case of failure. The function must
     *                                  live in the window scope.
     * @param position The position, starting from 0
     */
    downloadJobfieldFileByPosition: function(callbackSuccessName, callbackFailName, position) {
        GeopalInternal.downloadJobfieldFileByPosition(callbackSuccessName, callbackFailName, position);
    },

    /**
     * Gets the current job workflow name
     *
     * @category Job Workflow
     * @method getJobWorkflowName
     *
     * @example
     *     Geopal.getJobWorkflowName();
     *
     * @return {String} A string representing the workflow name
     */
    getJobWorkflowName: function() {
        return GeopalInternal.getJobWorkflowName();
    },

    /**
     * Gets the current job workflow position.
     *
     * @category Job Workflow
     * @method getJobWorkflowPosition
     *
     * @example
     *     Geopal.getJobWorkflowPosition();
     *
     * @return {Number} An integer number representing the current position, starting from 0.
     */
    getJobWorkflowPosition: function() {
        return GeopalInternal.getJobWorkflowPosition();
    },

    /**
     * Gets the current job workflow value
     *
     * @example
     *     Geopal.getJobWorkflowValue();
     *
     * @category Job Workflow
     * @method getJobWorkflowValue
     * @return {String} current job workflow value or undefined if not done
     */
    getJobWorkflowValue: function() {
        return GeopalInternal.getJobWorkflowValue();
    },

    /**
     * Gets a job workflow value by name.
     *
     * @example
     *     Geopal.getJobWorkflowValueByName('Pick From List');
     *
     * @example
     *     Geopal.setJobWorkflowValue(10 * Geopal.getJobWorkflowValueByName('Enter Number'));
     *
     * @example
     *     var number = Geopal.getJobWorkflowValueByName('Enter Number1');
     *
     * @category Job Workflow
     * @method getJobWorkflowValueByName
     * @param {String} workflowName The Job Workflow Name
     * @return {String} first job workflow value matching name or undefined if not done
     */
    getJobWorkflowValueByName: function(workflowName) {
        return GeopalInternal.getJobWorkflowValueByName(workflowName);
    },

    /**
     * Gets a job workflow value by position.
     *
     * @example
     *     Geopal.getJobWorkflowValueByPosition(15);
     *
     * @category Job Workflow
     * @method getJobWorkflowValueByPosition
     * @param {Number} position The Job Workflow Position
     * @return {String} first job workflow value matching position or undefined if not done
     */
    getJobWorkflowValueByPosition: function(position) {
        return GeopalInternal.getJobWorkflowValueByPosition(position);
    },

    /**
     * Gets a job workflow value by template id.
     *
     * @example
     *     Geopal.getJobWorkflowValueByTemplateId(999);
     *
     * @category Job Workflow
     * @method getJobWorkflowValueByTemplateId
     * @param {Number} templateId The Job Workflow Template Id
     * @return {String}
     */
    getJobWorkflowValueByTemplateId: function(templateId) {
        return GeopalInternal.getJobWorkflowValueByTemplateId(templateId);
    },

    /**
     * Gets a job workflow values by name.
     *
     * @example
     *     Geopal.getJobWorkflowActionValueByName('Pick From List');
     *
     * @category Job Workflow
     * @method getJobWorkflowActionValueByName
     * @param {String} workflowName The Job Workflow Name
     * @return {String} job workflow value or undefined if not done
     */
    getJobWorkflowActionValueByName: function(workflowName) {
        return GeopalInternal.getJobWorkflowActionValueByName(workflowName);
    },

    /**
     * Gets a job workflow value by position.
     *
     * @example
     *     Geopal.getJobWorkflowActionValueByPosition(15);
     *
     * @category Job Workflow
     * @method getJobWorkflowActionValueByPosition
     * @param {Number} position The position, starting from 0.
     * @return {String} job workflow action value by position in template
     */
    getJobWorkflowActionValueByPosition: function(position) {
        return GeopalInternal.getJobWorkflowActionValueByPosition(position);
    },

    /**
     * Gets a job workflow value by template id
     *
     * @example
     *     Geopal.getJobWorkflowActionValueByTemplateId(999);
     *
     * @category Job Workflow
     * @method getJobWorkflowActionValueByTemplateId
     * @param {Number} templateId The template Id
     * @return {String} job workflow action value by template id
     */
    getJobWorkflowActionValueByTemplateId: function(templateId) {
        return GeopalInternal.getJobWorkflowActionValueByTemplateId(templateId);
    },

    /**
     * Gets the current job workflow is active(clickable)
     *
     * @category Job Workflow
     * @method getJobWorkflowIsActive
     *
     * @example
     *     Geopal.getJobWorkflowIsActive();
     *
     * @return {boolean} true if step can be done by user
     */
    getJobWorkflowIsActive: function() {
        return GeopalInternal.getJobWorkflowIsActive();
    },

    /**
     * Gets the job workflow is active(clickable) by position
     *
     * @category Job Workflow
     * @method getJobWorkflowIsActiveByPosition
     * @param {Number} position
     * @example
     *     Geopal.getJobWorkflowIsActiveByPosition(3);
     * @return {boolean} true if step can be done by user, will return false if step not found
     */
    getJobWorkflowIsActiveByPosition: function(position) {
        return GeopalInternal.getJobWorkflowIsActiveByPosition(position);
    },

    /**
     * Gets the current job workflow is active by template id
     *
     * @category Job Workflow
     * @method getJobWorkflowIsActiveByTemplateId
     * @param {Number} templateId
     * @example
     *     Geopal.getJobWorkflowIsActiveByTemplateId(38443);
     * @return {boolean} true if step can be done by user, will return false if step not found
     */
    getJobWorkflowIsActiveByTemplateId: function(templateId) {
        return GeopalInternal.getJobWorkflowIsActiveByTemplateId(templateId);
    },

    /**
     * Gets the current job workflow is active by name
     *
     * @category Job Workflow
     * @method getJobWorkflowIsActiveByName
     * @param {String} workflowName
     * @example
     *     Geopal.getJobWorkflowIsActiveByName('Step 1');
     * @return {boolean} true if step can be done by user, will return false if step not found
     */
    getJobWorkflowIsActiveByName: function(workflowName) {
        return GeopalInternal.getJobWorkflowIsActiveByName(workflowName);
    },

    /**
     * Gets the current job workflow filepath by name.
     *
     * @example
     *     Geopal.getWorkflowFilePathByName('Signature PDF Signed');
     *
     * @category Job Workflow
     * @method getWorkflowFilePathByName
     * @since 1.7.x
     * @param {String} workflowName
     * @example
     *     Geopal.getWorkflowFilePathByName('Step 1');
     * @return {String} job workflow filepath e.g "/storage/emulated/0/Android/data/com.edm.geopal/files/geopal/geopal1.23.160/jobs/351/photos/steps/25440/Signature_144914021000075.jpg"
     */
    getWorkflowFilePathByName: function(workflowName) {
        return GeopalInternal.getWorkflowFilePathByName(workflowName);
    },

    /**
     * Gets the current job workflow filepath by TemplateId
     *
     * @example
     *     Geopal.getWorkflowFilePathByTemplateId(512);
     *
     * @category Job Workflow
     * @method getWorkflowFilePathByTemplateId
     * @since 1.7.x
     * @param {Number} templateId
     * @return {String} job workflow filepath e.g "/storage/emulated/0/Android/data/com.edm.geopal/files/geopal/geopal1.23.160/jobs/351/photos/steps/25440/Signature_144914021000075.jpg"
     */
    getWorkflowFilePathByTemplateId: function(templateId) {
        return GeopalInternal.getWorkflowFilePathByTemplateId(templateId);
    },

    /**
     * Gets the  job workflow filepath by position.
     *
     * @example
     *     Geopal.getWorkflowFilePathByPosition(6);
     *
     * @category Job Workflow
     * @method getWorkflowFilePathByPosition
     * @since 1.7.x
     * @param {Number} position The position, starting from 0.
     * @return {String} job workflow filepath e.g "/storage/emulated/0/Android/data/com.edm.geopal/files/geopal/geopal1.23.160/jobs/351/photos/steps/25440/Signature_144914021000075.jpg"
     */
    getWorkflowFilePathByPosition: function(position) {
        //note spelling error in path
        return GeopalInternal.getWorkflowFilPatheByPosition(position);
    },

    /**
     * Goes to a job workflow by name. Note: Does not work in scriptable webview
     *
     * @example
     *     Geopal.gotoJobWorkflowByName('Annotate Picture');
     *
     * @category Job Workflow
     * @method gotoJobWorkflowByName
     * @param {String} workflowName
     */
    gotoJobWorkflowByName: function(workflowName) {
        GeopalInternal.gotoJobWorkflowByName(workflowName);
    },

    /**
     * Goes to a job workflow by position Note: Does not work in scriptable webview
     *
     * @example
     *     Geopal.gotoJobWorkflowByPosition(10);
     *
     * @category Job Workflow
     * @method gotoJobWorkflowByPosition
     * @param {Number} position The position, starting from 0.
     */
    gotoJobWorkflowByPosition: function(position) {
        GeopalInternal.gotoJobWorkflowByPosition(position);
    },

    /**
     * Goes to a job workflow by template id Note: Does not work in scriptable webview
     *
     * @example
     *     Geopal.gotoJobWorkflowByTemplateId(10);
     *
     * @category Job Workflow
     * @method gotoJobWorkflowByTemplateId
     * @param {Number} templateId
     */
    gotoJobWorkflowByTemplateId: function(templateId) {
        GeopalInternal.gotoJobWorkflowByTemplateId(templateId);
    },

    /**
     * Goes to a job by job id.<br/>
     * <br/>
     * Due to the nature of the API bridge between JavaScript and Java, the signature of this
     * method is unconventional when compared to typical JavaScript functions, as the meaning of the arguments depends
     * on the actual number of arguments supplied.<br/>
     * <br/>
     * The function can be used as follows:
     *
     *     Geopal.gotoJobById(jobId);   // case 1
     *     Geopal.gotoJobById(jobId, autoAccept); // case 2
     *     Geopal.gotoJobById(jobId, startTab, autoAccept); // case 3
     *
     * <em>Case 1:</em> The user is redirected to the specified jobId, with <strong>autoAccept=false</strong> and
     * <strong>startTab=0</strong><br/>
     * <em>Case 2:</em> The user is redirected to the specified jobId, with <strong>autoAccept</strong> set to the value
     * specified and <strong>startTab=0</strong><br/>
     * <em>Case 3:</em> The user is redirected to the specified jobId, with <strong>autoAccept</strong> and
     * <strong>startTab</strong> set as specified.<br/>
     * <br/>
     * startTab values:<br/>
     * TAB_STEPS = 0;<br/>
     * TAB_MAPS = 1;<br/>
     * TAB_DETAILS = 2;<br/>
     * TAB_ASSET = 3;<br/>
     * TAB_CRM = 4;<br/>
     *
     * <h4>Remarks:</h4>
     * The available tabs are affected by configuration options and the above number only represent the tab index. If
     *  a tab is removed from within the configuration, all indexes will shift accordingly. This may cause the wrong
     *  tab to be opened or "index out of bound" errors to occur.
     *
     * @category Job Workflow
     * @method gotoJobById
     * @since 1.7.x
     * @param {Number} jobId The jobId
     * @param {Boolean|Number} arg1 Either the value of <strong>autoAccept</strong> if arg2 is not specified or the
     *                              value of <strong>startTab</strong> otherwise
     * @param {Boolean} arg2 Either not specified or the value of <strong>autoAccept</strong>
     */

    gotoJobById: function(jobId, startTab, autoAccept) {
        switch(arguments.length){
            case 1:
                GeopalInternal.gotoJobById(jobId);
                break;
            case 2:
                GeopalInternal.gotoJobById(jobId, startTab);
                break;
            case 3:
                GeopalInternal.gotoJobById(jobId, startTab, autoAccept);
                break;
        }
    },

    /**
     * Goes to a job by job identifier.<br/>
     * <br/>
     * Due to the nature of the API bridge between JavaScript and Java, the signature of this
     * method is unconventional when compared to typical JavaScript functions, as the meaning of the arguments depends
     * on the actual number of arguments supplied.<br/>
     * <br/>
     * The function can be used as follows:
     *
     *     Geopal.gotoJobByIdentifier(jobIdentifier);   // case 1
     *     Geopal.gotoJobByIdentifier(jobIdentifier, autoAccept); // case 2
     *     Geopal.gotoJobByIdentifier(jobIdentifier, startTab, autoAccept); // case 3
     *
     * <em>Case 1:</em> The user is redirected to the specified jobIdentifier, with <strong>autoAccept=false</strong>
     * and <strong>startTab=0</strong><br/>
     * <em>Case 2:</em> The user is redirected to the specified jobIdentifier, with <strong>autoAccept</strong> set to
     * the value specified and <strong>startTab=0</strong><br/>
     * <em>Case 3:</em> The user is redirected to the specified jobIdentifier, with <strong>autoAccept</strong> and
     * <strong>startTab</strong> set as specified.<br/>
     * <br/>
     * startTab values:<br/>
     * TAB_STEPS = 0;<br/>
     * TAB_MAPS = 1;<br/>
     * TAB_DETAILS = 2;<br/>
     * TAB_ASSET = 3;<br/>
     * TAB_CRM = 4;<br/>
     *
     * <h4>Remarks:</h4>
     * The available tabs are affected by configuration options and the above number only represent the tab index. If
     *  a tab is removed from within the configuration, all indexes will shift accordingly. This may cause the wrong
     *  tab to be opened or "index out of bound" errors to occur.
     *
     * @category Job Workflow
     * @method gotoJobByIdentifier
     * @since 1.7.x
     * @param {String} jobIdentifier The Job Identifier
     * @param {Boolean|Number} arg1 Either the value of <strong>autoAccept</strong> if arg2 is not specified or the
     *                              value of <strong>startTab</strong> otherwise
     * @param {Boolean} arg2 Either not specified or the value of <strong>autoAccept</strong>
     */
    gotoJobByIdentifier: function(jobId, startTab, autoAccept) {
        switch(arguments.length){
            case 1:
                GeopalInternal.gotoJobByIdentifier(jobId);
                break;
            case 2:
                GeopalInternal.gotoJobByIdentifier(jobId, startTab);
                break;
            case 3:
                GeopalInternal.gotoJobByIdentifier(jobId, startTab, autoAccept);
                break;
        }
    },
    /**
     * Goes to job list.
     *
     * @category Job Workflow
     * @method gotoJobList
     * @since 1.7.x
     *
     * @example
     *     Geopal.gotoJobList();
     *
     */
    gotoJobList: function() {
        GeopalInternal.gotoJobList();
    },

    /**
     * Sets the current job workflow value
     *
     * @category Job Workflow
     * @method setJobWorkflowValue
     * @param {String} workflowValue
     *
     * @example
     *     Geopal.setJobWorkflowValue('Value');
     *
     */
    setJobWorkflowValue: function(workflowValue) {
        GeopalInternal.setJobWorkflowValue(workflowValue)
    },

    /**
     * Sets a job workflow value by name
     *
     * @example
     *     Geopal.setJobWorkflowValueByName('Pick From a List', 'new value');
     *
     * @category Job Workflow
     * @method setJobWorkflowValueByName
     * @param {String} workflowName The name of the workflow for which to set the value
     * @param {String} workflowValue The new value of the workflow item
     *
     * @example
     *     Geopal.setJobWorkflowValueByName('Step Name', 'Value');
     *
     */
    setJobWorkflowValueByName: function(workflowName, workflowValue) {
        GeopalInternal.setJobWorkflowValueByName(workflowName, workflowValue);
    },

    /**
     * Sets a job workflow value by position
     *
     * @example
     *     Geopal.setJobWorkflowValueByPosition(12, 'new value');
     *
     * @category Job Workflow
     * @method setJobWorkflowValueByPosition
     * @param {Number} position
     * @param {String} workflowValue
     */
    setJobWorkflowValueByPosition: function(position, workflowValue) {
        GeopalInternal.setJobWorkflowValueByPosition(position, workflowValue);
    },

    /**
     * Sets a job workflow value by template id
     *
     * @example
     *     Geopal.setJobWorkflowValueByTemplateId(999, 'new value');
     *
     * @category Job Workflow
     * @method setJobWorkflowValueByTemplateId
     * @param {Number} templateId
     * @param {String} workflowValue
     */
    setJobWorkflowValueByTemplateId: function(templateId, workflowValue) {
        GeopalInternal.setJobWorkflowValueByTemplateId(templateId, workflowValue);
    },

    /**
     * Sets a job workflow action value by name
     * Action values are used to add details to steps.
     * For example List steps action values are the comma separated string, Show text steps action value would be the text to show etc.
     *
     * @example
     *     Geopal.setJobWorkflowActionValueByName('Pick From a List', 'new value,new options,new everthing');
     *
     * @category Job Workflow
     * @method setJobWorkflowActionValueByName
     * @param {String} workflowName
     * @param {String} workflowActionValue
     */
    setJobWorkflowActionValueByName: function(workflowName, workflowActionValue) {
        GeopalInternal.setJobWorkflowActionValueByName(workflowName, workflowActionValue);
    },

    /**
     * Sets a job workflow action value by position
     * Action values are used to add details to steps.
     * For example List steps action values are the comma separated list
     *
     * @example
     *     Geopal.setJobWorkflowValueByPosition(12, 'new value,new options,new everthing');
     *
     * @category Job Workflow
     * @method setJobWorkflowActionValueByPosition
     * @param {Number} position
     * @param {String} workflowActionValue
     */
    setJobWorkflowActionValueByPosition: function(position, workflowActionValue) {
        GeopalInternal.setJobWorkflowActionValueByPosition(position, workflowActionValue);
    },

    /**
     * Sets a job workflow action value by template id
     * Action values are used to add details to steps.
     * For example List steps action values are the comma separated list
     *
     * @example
     *     Geopal.setJobWorkflowValueByTemplateId(999, 'new value');
     *
     * @category Job Workflow
     * @method setJobWorkflowActionValueByTemplateId
     * @param {Number} templateId
     * @param {String} workflowActionValue
     */
    setJobWorkflowActionValueByTemplateId: function(templateId, workflowActionValue) {
        GeopalInternal.setJobWorkflowActionValueByTemplateId(templateId, workflowActionValue);
    },

    /**
     * Sets the current job workflow value to be active(clickable)
     *
     * @example
     *     Geopal.setJobWorkflowIsActive(true);
     *
     * @category Job Workflow
     * @method setJobWorkflowIsActive
     * @param {Boolean} isActive
     */
    setJobWorkflowIsActive: function(isActive) {
        GeopalInternal.setJobWorkflowIsActive(isActive);
    },

    /**
     * Sets a job workflow value to be active(clickable)
     *
     * @example
     *     Geopal.setJobWorkflowIsActive('Step Nameâ€™,true);
     *
     * @category Job Workflow
     * @method setJobWorkflowIsActiveByName
     * @since 1.14.x
     * @param {String} workflowName
     * @param {Boolean} isActive
     */
    setJobWorkflowIsActiveByName: function(workflowName, isActive) {
        GeopalInternal.setJobWorkflowIsActiveByName(workflowName, isActive);
    },

    /**
     * Sets a job workflow value to be active(clickable) by position
     *
     * @example
     *     Geopal.setJobWorkflowIsActiveByPosition(12,true);
     *
     * @category Job Workflow
     * @method setJobWorkflowIsActiveByPosition
     * @param {Number} position
     * @param {Boolean} isActive
     */
    setJobWorkflowIsActiveByPosition: function(position, isActive) {
        GeopalInternal.setJobWorkflowIsActiveByPosition(position, isActive);
    },

    /**
     * Sets a job workflow value to be active(clickable) by template id
     *
     * @example
     *     Geopal.setJobWorkflowIsActiveByTemplateId(999, true);
     *
     * @category Job Workflow
     * @method setJobWorkflowIsActiveByTemplateId
     * @param {Number} templateId
     * @param {Boolean} isActive
     */
    setJobWorkflowIsActiveByTemplateId: function(templateId, isActive) {
        GeopalInternal.setJobWorkflowIsActiveByTemplateId(templateId, isActive);
    },

    /**
     * Sets a job workflow value to be mandatory by name
     * This requires the user to complete the step before the next step or leaving the job
     *
     * @example
     *     Geopal.setJobWorkflowIsMandatoryByName('Pick From a List', true);
     *
     * @category Job Workflow
     * @method setJobWorkflowIsMandatoryByName
     * @param {String} workflowName
     * @param {Boolean} isMandatory
     */
    setJobWorkflowIsMandatoryByName: function(workflowName, isMandatory) {
        GeopalInternal.setJobWorkflowIsMandatoryByName(workflowName, isMandatory);
    },

    /**
     * Get if a job workflow is mandatory by name
     *
     * @example
     *     Geopal.getJobWorkflowIsMandatoryByName('Pick From a List');
     *
     * @category Job Workflow
     * @method getJobWorkflowIsMandatoryByName
     * @param {String} workflowName
     */
    getJobWorkflowIsMandatoryByName: function(workflowName) {
        return GeopalInternal.getJobWorkflowIsMandatoryByName(workflowName);
    },

    /**
     * Sets a job workflow value to be mandatory
     * This requires the user to complete the step before the next step or leaving the job
     * Warning: if the job workflow value or active value is not set the user will be unable to continue past the current step
     *
     * @example
     *     Geopal.setJobWorkflowIsMandatory(true);
     *
     * @category Job Workflow
     * @method setJobWorkflowIsMandatory
     * @param {Boolean} isMandatory
     */
    setJobWorkflowIsMandatory: function(isMandatory) {
        GeopalInternal.setJobWorkflowIsMandatory(isMandatory);
    },

    /**
     * Gets if a job workflow value is mandatory
     *
     * @example
     *     Geopal.getJobWorkflowIsMandatory();
     *
     * @category Job Workflow
     * @method getJobWorkflowIsMandatory
     */
    getJobWorkflowIsMandatory: function() {
        return GeopalInternal.getJobWorkflowIsMandatory();
    },

    /**
     * Sets a job workflow value to be mandatory by position
     * This requires the user to complete the step before the next step or leaving the job
     *
     * @example
     *     Geopal.setJobWorkflowIsMandatoryByPosition(12,true);
     *
     * @category Job Workflow
     * @method setJobWorkflowIsMandatoryByPosition
     * @param {Number} position
     * @param {Boolean} isMandatory
     */
    setJobWorkflowIsMandatoryByPosition: function(position, isMandatory) {
        GeopalInternal.setJobWorkflowIsMandatoryByPosition(position, isMandatory)

    },

    /**
     * Gets if a job workflow is mandatory by position
     *
     * @example
     *     Geopal.getJobWorkflowIsMandatoryByPosition(12);
     *
     * @category Job Workflow
     * @method getJobWorkflowIsMandatoryByPosition
     * @param {Number} position
     */
    getJobWorkflowIsMandatoryByPosition: function(position) {
        return GeopalInternal.getJobWorkflowIsMandatoryByPosition(position);
    },

    /**
     * Sets a job workflow value to be mandatory by template id
     * This requires the user to complete the step before the next step or leaving the job
     *
     * @example
     *     Geopal.setJobWorkflowIsMandatoryByTemplateId(999, true);
     *
     * @category Job Workflow
     * @method setJobWorkflowIsMandatoryByTemplateId
     * @param {Number} templateId
     * @param {Boolean} isMandatory
     */
    setJobWorkflowIsMandatoryByTemplateId: function(templateId, isMandatory) {
        GeopalInternal.setJobWorkflowIsMandatoryByTemplateId(templateId, isMandatory);

    },

    /**
     * Gets if a job workflow is mandatory by template id
     *
     * @example
     *     Geopal.getJobWorkflowIsMandatoryByPosition(999);
     *
     * @category Job Workflow
     * @method getJobWorkflowIsMandatoryByTemplateId
     * @param {Number} templateId
     */
    getJobWorkflowIsMandatoryByTemplateId: function(templateId) {
        return GeopalInternal.getJobWorkflowIsMandatoryByTemplateId(templateId);
    },

    /**
     * Sets a job workflow file by name
     *
     * @example
     *     Geopal.setWorkflowFileByName('Signature PDF Signed', '/sdcard/example.txt');
     *
     * @category Job Workflow
     * @method setWorkflowFileByName
     * @since 1.7.x
     * @param {String} workflowName
     * @param {String} workflowFilePath
     */
    setWorkflowFileByName: function(workflowName, workflowFilePath) {
        if(workflowFilePath.startsWith("file://")){
            workflowFilePath = workflowFilePath.replace("file://", "");
        }
        GeopalInternal.setWorkflowFileByName(workflowName, workflowFilePath);

    },

    /**
     * Sets a job workflow file by template id
     *
     * @example
     *     Geopal.setWorkflowFileByTemplateId(512, '/sdcard/example.txt');
     *
     * @category Job Workflow
     * @method setWorkflowFileByTemplateId
     * @since 1.7.x
     * @param {Number} templateId
     * @param {String} workflowFilePath
     */
    setWorkflowFileByTemplateId: function(templateId, workflowFilePath) {
        if(workflowFilePath.startsWith("file://")){
            workflowFilePath = workflowFilePath.replace("file://", "");
        }
        GeopalInternal.setWorkflowFileByTemplateId(templateId, workflowFilePath);
    },

    /**
     * Sets a job workflow file by position
     *
     * @example
     *     Geopal.setWorkflowFileByPosition(2, '/sdcard/example.txt');
     *
     * @category Job Workflow
     * @method setWorkflowFileByPosition
     * @since 1.7.x
     * @param {Number} position
     * @param {String} workflowFilePath
     */
    setWorkflowFileByPosition: function(position, workflowFilePath) {
        if(workflowFilePath.startsWith("file://")){
            workflowFilePath = workflowFilePath.replace("file://", "");
        }
        GeopalInternal.setWorkflowFileByPosition(position, workflowFilePath);

    },

    /**
     * Checks out of current job. Sets status of job to completed. Note: Does not work in scriptable webview
     *
     * @category Job Workflow
     * @method forceCheckOut
     * @deprecated This method is deprecated and will not work in future versions please do not use. Use Geopal.Job.Current.forceCheckOut() instead
     * @since 1.7.x
     */
    forceCheckOut: function() {
        GeopalInternal.forceCheckOut();

    },

    /**
     * Gets the current job asset(asset that is bound to job) identifier. Returns empty String if none found
     *
     * @example
     *     Geopal.getAssetIdentifier();
     *
     * @category Job Assets
     * @method getAssetIdentifier
     * @return {String} A string representing the asset identifier bound to the current job. Empty String if none can be found.
     */
    getAssetIdentifier: function() {
        return GeopalInternal.getAssetIdentifier();
    },

    /**
     * Gets the current job asset(asset that is bound to job) name. Returns empty String if none found
     *
     * @example
     *     Geopal.getAssetName();
     *
     * @category Job Assets
     * @method getAssetName
     * @return {string} A string representing the asset name bound to the current job. Empty String if none can be found.
     */
    getAssetName: function() {
        return GeopalInternal.getAssetName();
    },

    /**
     * Gets the current job asset(asset that is bound to job) field value by asset company field id. Returns empty String if none found.
     *
     * @example
     *     Geopal.getBoundAssetFieldValueByAssetCompanyFieldId(12);
     *
     * @category Job Assets
     * @method getBoundAssetFieldValueByAssetCompanyFieldId
     * @param {Number} companyFieldId
     * @return {String} value stored asset in field or empty string
     */
    getBoundAssetFieldValueByAssetCompanyFieldId: function(companyFieldId) {
        return GeopalInternal.getBoundAssetFieldValueByAssetCompanyFieldId(companyFieldId);
    },

    /**
     * Gets the current job asset(asset that is bound to job) field value by asset company field name. Returns empty String if none found.
     *
     * @example
     *     Geopal.getBoundAssetFieldValueByAssetCompanyFieldName('Asset Field Name');
     *
     * @category Job Assets
     * @method getBoundAssetFieldValueByAssetCompanyFieldName
     * @param {String} companyFieldName
     * @return {String} value stored in asset field or empty string
     */
    getBoundAssetFieldValueByAssetCompanyFieldName: function(companyFieldName) {
        return GeopalInternal.getBoundAssetFieldValueByAssetCompanyFieldName(companyFieldName);
    },


    /**
     * Launches Pdf Application on device if a pdf application is available.
     *
     * @example
     *     var failed = function(failedMsg) {
     *         Geopal.showMessage(failedMsg);
     *     };
     *
     *     var openPDF = function() {
     *         GeopalPDF.openPDFApplication('failed',signaturePDFURL);
     *     };
     *
     * @method openPDFApplication
     * @since 1.7.x
     * @param {String} callbackFailName
     * @param {String} pdfFilePath
     */
    openPDFApplication: function(callbackFailName, pdfFilePath) {
        GeopalInternal.openPDFApplication(callbackFailName, pdfFilePath);
    },

    /**
     * Shows a notification message
     *
     * <h4>Remarks</h4>
     * The displayed message is a notification not requiring interaction and will fade away in a short time. Use this
     *  method for low-priority information only. If you need the information to stick, use the showText method instead.
     *
     * @example
     *     Geopal.showMessage('hi');
     *
     * @method showMessage
     * @param {String} message The message to show
     */
    showMessage: function(message) {
        GeopalInternal.showMessage(message);
    },

    /**
     * Shows a single choice list
     *
     * @example
     *     var success = function(item) {
     *         Geopal.showMessage(item+' was picked!');
     *         Geopal.setJobWorkflowValue(item);
     *     };
     *
     *     var cancel = function() {
     *         Geopal.showMessage('canceled');
     *     };
     *
     *     Geopal.showSingleChoiceList('success', 'cancel', 'High, Medium, Low', 'Remaining risk from this hazard','Continue','Go Back');
     *     //or Geopal.showSingleChoiceList('success', 'cancel', 'High, Medium, Low', 'Remaining risk from this hazard');
     *
     * @method showSingleChoiceList
     * @since 1.4.x
     * @param {String} callBackEnter The name of a callback function to call when the operation is confirmed. The
     *                               function must live in the window scope.
     * @param {String} callBackCancel The name of a callback function to call when the operation is canceled. The
     *                                function must live in the window scope.
     * @param {String} commaSepString A comma-separated list of choices. The selected entry will be passed as argument
     *                                to the callback.
     * @param {String} title title of dialog box shown
     * @param {String} okButtonText Optional. Set to 'OK' if not required
     * @param {String} cancelButtonText Optional. Set to 'Cancel' if not required
     * @deprecated This method is deprecated and will not work in future versions please do not use. Use Geopal.Dialog.showSingleChoiceList(...)  instead
     */
    showSingleChoiceList: function(callBackEnter, callBackCancel, commaSepString, title, okButtonText, cancelButtonText) {
        switch(arguments.length){
            case 4:
                GeopalInternal.showSingleChoiceList(callBackEnter, callBackCancel, commaSepString, title);
                break;
            case 5:
                GeopalInternal.showSingleChoiceList(callBackEnter, callBackCancel, commaSepString, title);
                break;
            case 6:
                GeopalInternal.showSingleChoiceList(callBackEnter, callBackCancel, commaSepString, title, okButtonText, cancelButtonText);
                break;
        }
    },
    /**
     * Shows a multiple choice list
     * Selected items are returned as an array of strings
     *
     * @example
     *     var success = function(items) {
     *         for(var i = 0;i<items.length;i++){
     *             Geopal.showMessage(items[i] + ' was picked!');
     *         }
     *     };
     *
     *     var cancel = function() {
     *         Geopal.showMessage('nothing was picked');
     *     };
     *
     *     Geopal.showMultiChoiceList('success', 'cancel', '1,2,3', 'Pick some numbers','Continue','Go Back');
     *     //or Geopal.showMultiChoiceList('success', 'cancel', '1,2,3', 'Pick some numbers',' ');
     *     //NOTE: the last parameter in showMultiChoiceList('success', 'cancel', '1,2,3', 'Pick some numbers',' '); is not used but necessary
     *
     * @method showMultiChoiceList
     * @since 1.6.126
     * @param {String} callBackEnter The name of a callback function to call when the operation is confirmed. The
     *                               function must live in the window scope.
     * @param {String} callBackCancel The name of a callback function to call when the operation is canceled. The
     *                                function must live in the window scope.
     * @param {String} commaSepString A comma-separated list of choices. The selected entry will be passed as argument
     *                                to the callback.
     * @param {String} title
     * @param {String} okButtonText Optional. Set to ' ' if not required
     * @param {String} cancelButtonText Optional. Set to ' ' if not required
     * @deprecated This method is deprecated and will not work in future versions please do not use. Use Geopal.Dialog.showMultiChoiceList(...)  instead
     */
    showMultiChoiceList: function(callBackEnter, callBackCancel, commaSepString, title, okButtonText, cancelButtonText) {
        switch(arguments.length){
            case 4:
                GeopalInternal.showMultiChoiceList(callBackEnter, callBackCancel, commaSepString, title);
                break;
            case 5:
                GeopalInternal.showMultiChoiceList(callBackEnter, callBackCancel, commaSepString, title);
                break;
            case 6:
                GeopalInternal.showMultiChoiceList(callBackEnter, callBackCancel, commaSepString, title, okButtonText, cancelButtonText);
                break;
        }
    },

    /**
     * Shows a yes/no dialog
     *
     * @example
     *     var yes = function() {
     *         Geopal.showMessage('yes selected');
     *     };
     *
     *     var no = function() {
     *         Geopal.showMessage('no selected');
     *     };
     *     Geopal.showYesNoDialog('yes', 'no', 'Yes No Selector', 'Please pick yes or no', 'yes text', 'no text');
     *
     * @method showYesNoDialog
     * @since 1.5.x
     * @param {String} callBackYes The name of a callback function to call when the 'Yes' button is pressed. The
     *                             function must live in the window scope.
     * @param {String} callBackNo The name of a callback function to call when the 'No' button is pressed. The
     *                            function must live in the window scope.
     * @param {String} title
     * @param {String} message
     * @param {String} yesText
     * @param {String} noText
     * @deprecated This method is deprecated and will not work in future versions please do not use. Use Geopal.Dialog.showYesNoDialog(...)  instead
     */
    showYesNoDialog: function(callBackYes, callBackNo, title, message, yesText, noText) {
        GeopalInternal.showYesNoDialog(callBackYes, callBackNo, title, message, yesText, noText);
    },

    /**
     * Shows a yes/no/maybe dialog
     *
     * @example
     *     var yes = function() {
     *         Geopal.showMessage('yes selected');
     *     };
     *     var no = function() {
     *         Geopal.showMessage('no selected');
     *     };
     *     var maybe = function() {
     *         Geopal.showMessage('maybe selected');
     *     };
     *     Geopal.showYesNoMaybeDialog('yes', 'no', 'maybe', 'Title', 'Call me maybe?', 'yes text', 'no text', 'maybe text');
     *
     * @method showYesNoMaybeDialog
     * @since 1.5.x
     * @param {String} callBackYes The name of a callback function to call when the 'Yes' button is pressed. The
     *                             function must live in the window scope.
     * @param {String} callBackNo The name of a callback function to call when the 'No' button is pressed. The
     *                            function must live in the window scope.
     * @param {String} callBackMaybe
     * @param {String} title
     * @param {String} message
     * @param {String} yesText
     * @param {String} noText
     * @param {String} maybeText
     * @deprecated This method is deprecated and will not work in future versions please do not use. Use Geopal.Dialog.showYesNoMaybeDialog(...) instead
     */
    showYesNoMaybeDialog: function(callBackYes, callBackNo, callBackMaybe, title, message, yesText, noText, maybeText) {
        GeopalInternal.showYesNoMaybeDialog(callBackYes, callBackNo, callBackMaybe, title, message, yesText, noText, maybeText);
    },

    /**
     * Shows a enter text dialog
     *
     * @example
     *     var enter = function(item) {
     *         Geopal.showMessage('text entered'+item);
     *     };
     *     var cancel = function() {
     *         Geopal.showMessage('cancelled');
     *     };
     *     Geopal.showEnterText('enter', 'cancel', 'default text', 'Please enter something', 'your message','Enter','Back');
     *
     * @method showEnterText
     * @since 1.5.x
     * @param {String} callBackEnter The name of a callback function to call when the operation is confirmed. The
     *                               function must live in the window scope.
     * @param {String} callBackCancel The name of a callback function to call when the operation is canceled. The
     *                                function must live in the window scope.
     * @param {String} defaultText
     * @param {String} title
     * @param {String} message
     * @param {String} okButtonText
     * @param {String} cancelButtonText
     * @deprecated This method is deprecated and will not work in future versions please do not use. Use Geopal.Dialog.showEnterText(...) instead
     */
    showEnterText: function(callBackEnter, callBackCancel, defaultText, title, message, okButtonText, cancelButtonText) {
        switch(arguments.length){
            case 5:
                GeopalInternal.showEnterText(callBackEnter, callBackCancel, defaultText, title, message);
                break;
            case 7:
                GeopalInternal.showEnterText(callBackEnter, callBackCancel, defaultText, title, message, okButtonText, cancelButtonText);
                break;
        }

    },
    /**
     * Shows a enter note dialog
     *
     * @example
     *     var enter = function(item) {
     *         Geopal.showMessage('note entered'+item);
     *     };
     *     var cancel = function() {
     *         Geopal.showMessage('cancelled');
     *     };
     *     Geopal.showEnterNote('enter', 'cancel', 'default text', 'Please enter something', 'your message', 'Enter Comment', 'Cancel Comment');
     *
     * @method showEnterNote
     * @since 1.5.x
     * @param {String} callBackEnter The name of a callback function to call when the operation is confirmed. The
     *                               function must live in the window scope.
     * @param {String} callBackCancel The name of a callback function to call when the operation is canceled. The
     *                                function must live in the window scope.
     * @param {String} defaultText
     * @param {String} title
     * @param {String} message
     * @param {String} okButtonText
     * @param {String} cancelButtonText
     */

    showEnterNote: function(callBackEnter, callBackCancel, defaultText, title, message, okButtonText, cancelButtonText) {
        switch(arguments.length){
            case 5:
                GeopalInternal.showEnterNote(callBackEnter, callBackCancel, defaultText, title, message);
                break;
            case 7:
                GeopalInternal.showEnterNote(callBackEnter, callBackCancel, defaultText, title, message, okButtonText, cancelButtonText);
                break;
        }
    },

    /**
     * Shows a enter number box with a number pad shows message 'Invalid entry, Try again' if value entered is not a
     * number or if the number is not in the range specified e.g 0-10.
     *
     * @example
     *     var yes = function(data) {
     *         Geopal.showMessage(data);
     *     };
     *     var no = function() {
     *         Geopal.showMessage('no selected');
     *     };
     *     Geopal.showEnterNumber('yes', 'no', '5', 'title 0-10', 'message', 0,10);
     *
     * @method showEnterNumber
     * @since 1.5.x
     * @param {String} callBackEnter The name of a callback function to call when the operation is confirmed. The
     *                               function must live in the window scope.
     * @param {String} callBackCancel The name of a callback function to call when the operation is canceled. The
     *                                function must live in the window scope.
     * @param {String} defaultText
     * @param {String} title
     * @param {String} message
     * @param {Number} rangeFrom
     * @param {Number} rangeTo
     */
    showEnterNumber: function(callBackEnter, callBackCancel, defaultText, title, message, rangeFrom, rangeTo) {
        GeopalInternal.showEnterNumber(callBackEnter, callBackCancel, defaultText, title, message, rangeFrom, rangeTo);
    },

    /**
     * Shows scrollable text in a dialog with an okay button. (Note: callbacks data will always return 'Text Shown')
     *
     * @example
     *     var yes = function(data) {
     *         Geopal.showMessage(data);
     *     };
     *     Geopal.showText('yes', 'show this text', 'title');
     *
     * @method showText
     * @since 1.5.x
     * @param {String} callBackEnter The name of a callback function to call when the operation is confirmed. The
     *                               function must live in the window scope.
     * @param {String} showText text to show user
     * @param {String} title title of dialog box shown
     */
    showText: function(callBackEnter, showText, title) {
        GeopalInternal.showText(callBackEnter, showText, title);
    },

    /**
     * Shows scrollable text with html style tags  in a dialog with an okay button (Note: callbacks data will always
     * return 'Text Shown')
     *
     * @example
     *     var yes = function(data) {
     *         Geopal.showMessage(data);
     *     };
     *     Geopal.showHTMLText('yes', '<h2>Title</h2><br><p>Description here</p>', 'title');
     *
     * @method showHTMLText
     * @since 1.5.x
     * @param {String} callBackEnter The name of a callback function to call when the operation is confirmed. The
     *                               function must live in the window scope.
     * @param {String} showText The HTML to show
     * @param {String} title
     */
    showHTMLText: function(callBackEnter, showText, title) {
        GeopalInternal.showHTMLText(callBackEnter, showText, title);
    },

    /**
     * Shows phone number in Phone Dialer.
     *
     * <h4>Remarks:</h4>
     * Android application's architecture normally allow only for one Activity to be running at a given time, with the
     * Activity being an application's screen. As a result, calling this method effectively ends the execution of the
     * javascript.
     *
     * @method startPhoneDialer
     * @since 1.6.205
     * @param {String} callbackFailed The name of a callback function to call when the operation fails. The function
     *                               must live in the window scope.
     * @param {String} phoneNumber The phone number to input in the phone dialer
     * @example
     *      var failed = function() {
     *         Geopal.setJobWorkflowValue('Phone Dialer failed '+"\n"+Geopal.getJobWorkflowValue());
     *      }
     *      Geopal.startPhoneDialer("failed","0000000000");
     */
    startPhoneDialer: function(callbackFailed, phoneNumber) {
        GeopalInternal.startPhoneDialer(callbackFailed, phoneNumber);
    },

    /**
     * Shows dialog box for signature input and saves the signature in a file. The white background will become
     * transparent.
     *
     * @example
     *     var ok = function(filepath) {
     *         Geopal.showMessage(filepath);
     *     };
     *     var cancel = function() {
     *         Geopal.showMessage('Operation canceled');
     *     };
     *     Geopal.showSignatureDialog('ok','cancel','sign this','this is a disclaimer');
     *
     * @method showSignatureDialog
     * @since 1.7.x
     * @param {String} callBackOK The name of a callback function to call when the operation is confirmed. The function
     *                            must live in the window scope.
     * @param {String} callBackCancel The name of a callback function to call when the operation is canceled. The
     *                                function must live in the window scope.
     * @param {String} title title of dialog box shown
     * @param {String} disclaimer disclaimer shown above signature area
     */
    showSignatureDialog: function(callBackOK, callBackCancel, title, disclaimer) {
        GeopalInternal.showSignatureDialog(callBackOK, callBackCancel, title, disclaimer);
    },

    /**
     * Show progress dialog
     *
     * <h4>Remarks</h4>
     * Only one progress dialog may be open at any time.
     *
     * @example
     *     Geopal.showProgressDialog(); //message defaults to "processing..."
     *     // do some operation that may take a while
     *     Geopal.hideProgressDialog();
     *
     * @method showProgressDialog
     * @since 1.7.x
     */
    showProgressDialog: function() {
        GeopalInternal.showProgressDialog();
    },

    /**
     * Show progress dialog with message
     *
     * <h4>Remarks</h4>
     * Only one progress dialog may be open at any time.
     *
     * @example
     *     Geopal.showProgressDialog('Loading...');
     *     // do some operation that may take a while
     *     Geopal.hideProgressDialog();
     *
     * @method showProgressDialog
     * @since 1.7.x
     * @param {String} message Optional. Defaults to "processing..."
     */
    showProgressDialog: function(message) {
        GeopalInternal.showProgressDialog(message);
    },

    /**
     * Hides current progress dialog.
     * @example
     *     Geopal.showProgressDialog('Loading...');
     *     // do some operation that may take a while
     *     Geopal.hideProgressDialog();
     * @method hideProgressDialog
     * @since 1.7.x
     */
    hideProgressDialog: function() {
        GeopalInternal.hideProgressDialog();
    },

    /**
     * Retrys sending http parameters if offline.
     *
     * @example
     *     Geopal.httpSender('http://geopal-solutions.com','username=12345&password=12345');
     *
     * @method httpSender
     * @deprecated This method is deprecated and will not work in future versions please do not use
     * @since 1.7.x
     * @param url
     * @param post_params
     * @return {Boolean} true if successful
     */
    httpSender: function(url, post_params) {
        return GeopalInternal.httpSender(url, post_params);
    },

    /**
     * Retrys sending http parameters with  if offline.
     *
     * @example
     *     Geopal.httpSenderWithGeopalPostParams('http://geopal-solutions.com','data=12345');
     *
     * @method httpSenderWithGeopalPostParams
     * @deprecated This method is deprecated and will not work in future versions please do not use
     * @since 1.7.x
     * @param url
     * @param post_params
     * @return {Boolean} true if created
     */
    httpSenderWithGeopalPostParams: function(url, post_params) {
        return GeopalInternal.httpSenderWithGeopalPostParams(url, post_params);
    }


};

/**
 * @deprecated Use `Geopal.Scan` instead
 * @class GeopalBarcode
 * @module GeopalBarcode
 * @main GeopalBarcode
 */
var GeopalBarcode = {

    /**
     * @deprecated Use `Geopal.Scan.scanBarcode(callbackSuccess, callbackFailure)` instead.
     *
     * Lanches external application to scan barcode. If no app for reading barcodes is found shows message.
     *
     * @example
     *     var success = function(item) {
     *         Geopal.showMessage('barcode: '+item);
     *     };
     *     var fail = function() {
     *         Geopal.showMessage('failed');
     *     };
     *     GeopalBarcode.scanBarcode('success','fail');
     *
     * @method scanBarcode
     * @since 1.10.x
     * @param {String} callbackSuccess The name of a callback function to call when the operation succeed. The function
     *                                 must live in the window scope.
     * @param {String} callbackFailure The name of a callback function to call when the operation is cancelled by the user. The function
     *                                 must live in the window scope.
     * @return {String}
     */
    scanBarcode: function(callbackSuccess, callbackFailure) {
        GeopalBarcodeInternal.scanBarcode(callbackSuccess, callbackFailure);
    }
}

/**
 *
 * @class GeopalJobCreate
 * @module GeopalJobCreate
 * @main GeopalJobCreate
 */
var GeopalJobCreate = {

    /**
     * Creates a job with current date and time
     *
     * @example
     *     GeopalJobCreate.createSimpleJob('success','failed',templateId);
     *
     * @category Create Job
     * @method createSimpleJob
     * @since 1.7.x
     * @param {String} callbackSuccessName The name of a callback function to call in case of success. The function
     *                                     must live in the window scope.
     * @param {String} callbackFailName The name of a callback function to call in case of failure. The function must
     *                                  live in the window scope.
     * @param {Number} jobTemplateId
     */
    createSimpleJob: function(callbackSuccessName, callbackFailName, jobTemplateId) {
        GeopalJobCreateInternal.createSimpleJob(callbackSuccessName, callbackFailName, jobTemplateId);
    },

    /**
     * Creates a job with options.
     *
     * @example
     *     var templateId = Geopal.Job.getJobTemplateIdByName('1 Geopal Test');
     *
     *     var currentDate = new Date(1388844300000);
     *     var date = currentDate.getFullYear()+'-'+(currentDate.getMonth()+1)+'-'+currentDate.getDate();
     *     var time = currentDate.getHours()+':'+currentDate.getMinutes();
     *
     *     var jobIdentifier ='tara is testing';
     *     var address = 1478;
     *     var customer = 9987;
     *     var person = 394;
     *     var asset = 'Test201310228';
     *
     *     GeopalJobCreate.createAdvancedJob('success','failed', date, time, jobIdentifier, templateId, address, customer, person, asset);
     *
     * @category Create Job
     * @method createAdvancedJob
     * @since 1.7.x
     * @param {String} callbackSuccessName The name of a callback function to call in case of success. The function
     *                                     must live in the window scope.
     * @param {String} callbackFailName The name of a callback function to call in case of failure. The function must
     *                                  live in the window scope.
     * @param {String} jobDate The date of the job. Must be formatted as Y-m-d. Can be null.
     * @param {String} jobTime The time of the job. Must be formatted as H:i. Can be null.
     * @param {String} jobIdentifier An identifier to assign to the job, useful for other calls. Can be null.
     * @param {Number} jobTemplateId The id of the Job Template to use during creation.
     * @param {Number} jobAddressId The id of the Address to use during creation. Can be null.
     * @param {Number} jobCustomerId The id of the Customer to use during creation. Can be null.
     * @param {Number} jobPersonId The id of the Person to use during creation as referee. Can be null.
     * @param {String} jobAssetIdentifier The string identifier of the asset involve in the job. Can be null.
     * @param {boolean} jobToBeSetAsCompleted Boolean if set to true will mark created job as completed, defaults to false. Can be null;
     */
    createAdvancedJob: function(callbackSuccessName, callbackFailName, jobDate, jobTime, jobIdentifier, jobTemplateId, jobAddressId, jobCustomerId, jobPersonId, jobAssetIdentifier, jobToBeSetAsCompleted) {
        jobToBeSetAsCompleted = typeof jobToBeSetAsCompleted === 'boolean' ? jobToBeSetAsCompleted : false;
        GeopalJobCreateInternal.createAdvancedJob(callbackSuccessName, callbackFailName, jobDate, jobTime, jobIdentifier, jobTemplateId, jobAddressId, jobCustomerId, jobPersonId, jobAssetIdentifier, jobToBeSetAsCompleted);
    },

    /**
     * Creates a job with options
     *
     * @example
     *     var templateId = Geopal.Job.getJobTemplateIdByName('1 Geopal Test');
     *
     *     var currentDate = new Date(1388844300000);
     *     var date = currentDate.getFullYear()+'-'+(currentDate.getMonth()+1)+'-'+currentDate.getDate();
     *     var time = currentDate.getHours()+':'+currentDate.getMinutes();
     *     var jobIdentifier ='tara is testing';
     *     var address = 1478;
     *     var customer = 9987;
     *     var person = 394;
     *     var asset = 'Test201310228';
     *     var workflows = '{"List Select 1":"test 1","List Select 2":"test 2","List Select 3":"test 3"}';
     *     var fields = '{"testField1":"test field 1","testField2":"test field 2"}';
     *     GeopalJobCreate.createAdvancedJobWithFields('success','failed', null, null, jobIdentifier, templateId, address, customer, person, asset, workflows, fields);
     *
     * @category Create Job
     * @method createAdvancedJobWithFields
     * @since 1.7.x
     * @param {String} callbackSuccessName The name of a callback function to call in case of success. The function
     *                                     must live in the window scope.
     * @param {String} callbackFailName The name of a callback function to call in case of failure. The function must
     *                                  live in the window scope.
     * @param {String} jobDate The date of the job. Must be formatted as Y-m-d. Can be null.
     * @param {String} jobTime The time of the job. Must be formatted as H:i. Can be null.
     * @param {String} jobIdentifier An identifier to assign to the job, useful for other calls. Can be null.
     * @param {Number} jobTemplateId The id of the Job Template to use during creation.
     * @param {Number} jobAddressId The id of the Address to use during creation. Can be null.
     * @param {Number} jobCustomerId The id of the Customer to use during creation. Can be null.
     * @param {Number} jobPersonId The id of the Person to use during creation as referee. Can be null.
     * @param {String} jobAssetIdentifier The string identifier of the asset involve in the job. Can be null.
     * @param {String} jobWorkflows json formatted string with workflow name as key and value to be inputted as value
     * @param {String} jobFields json formatted string with field name as key and value to be inputted as value
     * @param {boolean} jobToBeSetAsCompleted Boolean if set to true will mark created job as completed, defaults to false. Can be null;
     */
    createAdvancedJobWithFields: function(callbackSuccessName, callbackFailName, jobDate, jobTime, jobIdentifier, jobTemplateId, jobAddressId, jobCustomerId, jobPersonId, jobAssetIdentifier, jobWorkflows, jobFields, jobToBeSetAsCompleted) {
        jobToBeSetAsCompleted = typeof jobToBeSetAsCompleted === 'boolean' ? jobToBeSetAsCompleted : false;
        GeopalJobCreateInternal.createAdvancedJobWithFields(callbackSuccessName, callbackFailName, jobDate, jobTime, jobIdentifier, jobTemplateId, jobAddressId, jobCustomerId, jobPersonId, jobAssetIdentifier, jobWorkflows, jobFields, jobToBeSetAsCompleted);
    }
}

/**
 *
 * @class GeopalJob
 * @module GeopalJob
 * @main GeopalJob
 */
var GeopalJob = {

    /**
     * Gets the count of jobs on the device by status id.<br/>
     * <br/>
     * This only returns jobs visible on the device and assigned to the currently logged in user.<br/>
     * It also can potentially not match with results on the website.<br/>
     * <br/>
     * <h4>statusId values:</h4>
     * ASSIGNED = 1;<br/>
     * ACCEPTED = 6;<br/>
     * INPROGRESS = 5;<br/>
     * COMPLETED = 3;<br/>
     * INCOMPLETE = 7;<br/>
     * REJECTED = 2;<br/>
     *
     * @example
     *     //sets the value of the count of jobs in assigned status to the current step
     *     var statId = 1;
     *     var value = GeopalJob.getCountOfJobsByStatusIdOnClient(statId);
     *     Geopal.setJobWorkflowValue(value);
     *
     * @category Jobs
     * @since 1.14.x
     * @method getCountOfJobsByStatusIdOnClient
     * @param {Number} statusId UNASSIGNED(0), ASSIGNED(1), REJECTED(2), COMPLETED(3), DELETED(4), INPROGRESS(5), ACCEPTED(6), INCOMPLETE(7), REVIEW(8), ARCHIVE(9), LINKED(10), CANCELLED(11), PENDING(12), PLANNED(4), PAUSED(15);
     * @return {Number} count of jobs based on status
     */
    getCountOfJobsByStatusIdOnClient: function(statusId) {
        return GeopalJobInternal.getCountOfJobsByStatusIdOnClient(statusId);
    },

    /**
     * Gets the count of jobs on the device by status id.
     * @param {String} callback if successful
     * @param {String} callback if error occurred
     * @example
     *     //sets the value of the count of jobs in assigned status to the current step
     *     var statId = 1;
     *      var success = function(value) {
     *
     *      };
     *      var fail = function(errorMessage) {
     *         Geopal.showMessage('failed because '+errorMessage);
     *      };
     *     GeopalJob.getCountOfJobsByStatusIdOnClientAsync('success','fail',statId);
     *
     * @category Jobs
     * @since 1.39.xxx
     * @method getCountOfJobsByStatusIdOnClientAsync
     * @param {Number} statusId
     * @return {Number}  see getCountOfJobsByStatusIdOnClient
     */
    getCountOfJobsByStatusIdOnClientAsync: function(successCallback, failCallback, statusId) {
        var fn = window[successCallback];
        var count = null
        try{
            count = GeopalJobInternal.getCountOfJobsByStatusIdOnClient(statusId);
        } catch(err) {
            var fn_fail = window[failCallback];
            fn_fail(err);
            return;
        }
        fn(count);
    },

    /**
     * Gets the count of jobs on the device by template id.<br/>
     * <br/>
     * This only returns jobs visible on the device and assigned to the currently logged in user.<br/>
     * It also can potentially not match with results on the website.
     *
     * @example
     *     //sets the value of the count of jobs with the same template id to the current step regardless of the status
     *     var tempId = Geopal.getJobTemplateId();
     *     var value = GeopalJob.getCountOfJobsByTemplateIdOnClient(tempId);
     *     Geopal.setJobWorkflowValue(value);
     *
     * @category Jobs
     * @since 1.39.xxx
     * @method getCountOfJobsByTemplateIdOnClient
     * @param {Number} templateId
     * @return {Number} count of jobs
     */
    getCountOfJobsByTemplateIdOnClient: function(templateId) {
        return GeopalJobInternal.getCountOfJobsByTemplateIdOnClient(templateId);
    },

    /**
     * Gets the count of jobs on the device by template id.
     * @example
     *     //sets the value of the count of jobs with the same template id to the current step regardless of the status
     *     var tempId = Geopal.getJobTemplateId();
     *      var success = function(count) {
     *
     *      };
     *      var fail = function(errorMessage) {
     *         Geopal.showMessage('failed because '+errorMessage);
     *      };
     *     var value = GeopalJob.getCountOfJobsByTemplateIdOnClientAsync('success','fail',tempId);
     *     Geopal.setJobWorkflowValue(value);
     *
     * @category Jobs
     * @since 1.39.xxx
     * @method getCountOfJobsByTemplateIdOnClientAsync
     * @param {String} callback if successful
     * @param {String} callback if error occurred
     * @param {Number} templateId
     * @return {Number} count of jobs
     */
    getCountOfJobsByTemplateIdOnClientAsync: function(successCallback, failCallback, templateId) {
        var fn = window[successCallback];
        var count = null
        try{
            count =  GeopalJobInternal.getCountOfJobsByTemplateIdOnClient(templateId);
        } catch(err) {
            var fn_fail = window[failCallback];
            fn_fail(err);
            return;
        }
        fn(count);
    },

    /**
     * Gets the count of jobs on the device by template id and by status id.<br/>
     * <br/>
     * This only returns jobs visible on the device and assigned to the currently logged in user.
     * It also can potentially not match with results on the website.<br/>
     *
     * statusId values:
     * ASSIGNED = 1;
     * ACCEPTED = 6;
     * INPROGRESS = 5;
     * COMPLETED = 3;
     * INCOMPLETE = 7;
     * REJECTED = 2;
     *
     * @example
     *     //sets the value of the count of jobs in assigned status and of the same template to the current step
     *     var tempId = Geopal.getJobTemplateId();
     *     var statId = 1;
     *     var value = GeopalJob.getCountOfJobsByTemplateIdAndStatusIdOnClient(tempId,statId);
     *     Geopal.setJobWorkflowValue(value);
     *
     * @category Jobs
     * @since 1.14.x
     * @method getCountOfJobsByTemplateIdAndStatusIdOnClient
     * @param {Number} templateId
     * @param {Number} statusId
     * @return {Number} count of jobs
     */
    getCountOfJobsByTemplateIdAndStatusIdOnClient: function(templateId, statusId) {
        return GeopalJobInternal.getCountOfJobsByTemplateIdAndStatusIdOnClient(templateId, statusId);
    },

    /**
     * Gets the count of jobs on the device by template id and by status id.
     * @example
     *     //sets the value of the count of jobs in assigned status and of the same template to the current step
     *     var tempId = Geopal.getJobTemplateId();
     *     var statId = 1;
     *      var success = function(count) {
     *
     *      };
     *      var fail = function(errorMessage) {
     *         Geopal.showMessage('failed because '+errorMessage);
     *      };
     *     GeopalJob.getCountOfJobsByTemplateIdAndStatusIdOnClientAsync('success','fail', tempId,statId);
     *
     * @category Jobs
     * @since 1.39.xxx
     * @method getCountOfJobsByTemplateIdAndStatusIdOnClientAsync
     * @param {String} callback if successful
     * @param {String} callback if error occurred
     * @param {Number} templateId
     * @param {Number} statusId
     * @return {Number} count of jobs
     */
    getCountOfJobsByTemplateIdAndStatusIdOnClientAsync: function(successCallback, failCallback,templateId, statusId) {
        var fn = window[successCallback];
        var count = null
        try{
            count = GeopalJobInternal.getCountOfJobsByTemplateIdAndStatusIdOnClient(templateId, statusId);
        } catch(err) {
            var fn_fail = window[failCallback];
            fn_fail(err);
            return;
        }
        fn(count);
    },

    /**
     * Gets the count of jobs on the device by template name.<br/>
     * <br/>
     * This only returns jobs visible on the device and assigned to the currently logged in user.<br/>
     * It also can potentially not match with results on the website.
     *
     * @example
     *     //sets the value of the count of jobs with the template name '1 Geopal Test' to the current step
     *     var tempName = '1 Geopal Test';
     *     var value = GeopalJob.getCountOfJobsByTemplateNameOnClient(tempName);
     *     Geopal.setJobWorkflowValue(value);
     *
     * @category Jobs
     * @since 1.39.xxx
     * @method getCountOfJobsByTemplateNameOnClient
     * @param {String} templateName
     * @return {Number} count of jobs
     */
    getCountOfJobsByTemplateNameOnClient: function(templateName) {
        return GeopalJobInternal.getCountOfJobsByTemplateNameOnClient(templateName);
    },

    /**
     * Gets the count of jobs on the device by template name.
     * @example
     *     //sets the value of the count of jobs with the template name '1 Geopal Test' to the current step
     *     var tempName = '1 Geopal Test';
     *     var success = function(count) {
     *
     *      };
     *     var fail = function(errorMessage) {
     *         Geopal.showMessage('failed because '+errorMessage);
     *      };
     *     GeopalJob.getCountOfJobsByTemplateNameOnClientAsync('success','fail', tempName);
     *
     * @category Jobs
     * @since 1.39.xxx
     * @method getCountOfJobsByTemplateNameOnClientAsync
     * @param {String} callback if successful
     * @param {String} callback if error occurred
     * @param {String} templateName
     * @return {Number} count of jobs
     */
    getCountOfJobsByTemplateNameOnClientAsync: function(successCallback, failCallback, templateName) {
        var fn = window[successCallback];
        var count = null
        try{
            count = GeopalJobInternal.getCountOfJobsByTemplateNameOnClient(templateName);
        } catch(err) {
            var fn_fail = window[failCallback];
            fn_fail(err);
            return;
        }
        fn(count);
    },

    /**
     * Gets the count of jobs on the device by template id and by status id.<br/>
     * <br/>
     * This only returns jobs visible on the device and assigned to the currently logged in user.<br/>
     * It also can potentially not match with results on the website.
     *
     * @example
     *     //sets the value of the count of jobs with the template name '1 Geopal Test' and the status of
     *     // assigned to the current step
     *     var tempName = '1 Geopal Test';
     *     var statId = 1;
     *     var value = GeopalJob.getCountOfJobsByTemplateNameAndStatusIdOnClient(tempName,statId);
     *     Geopal.setJobWorkflowValue(value);
     *
     * @category Jobs
     * @since 1.14.x
     * @method getCountOfJobsByTemplateNameAndStatusIdOnClient
     * @param {String} templateName
     * @param {Number} statusId
     * @return {Number} count of jobs
     */
    getCountOfJobsByTemplateNameAndStatusIdOnClient: function(templateName, statusId) {
        return GeopalJobInternal.getCountOfJobsByTemplateNameAndStatusIdOnClient(templateName, statusId);
    },

    /**
     * Gets the count of jobs on the device by template id and by status id.<br/>
     * <br/>
     * This only returns jobs visible on the device and assigned to the currently logged in user.<br/>
     * It also can potentially not match with results on the website.
     *
     * @example
     *     //sets the value of the count of jobs with the template name '1 Geopal Test' and the status of
     *     // assigned to the current step
     *     var tempName = '1 Geopal Test';
     *     var statId = 1;
     *      var success = function(employee) {
     *
     *      };
     *      var fail = function(errorMessage) {
     *         Geopal.showMessage('failed because '+errorMessage);
     *      };
     *     GeopalJob.getCountOfJobsByTemplateNameAndStatusIdOnClientAsync('success','fail', tempName,statId);
     *
     * @category Jobs
     * @since 1.39.xxx
     * @method getCountOfJobsByTemplateNameAndStatusIdOnClient
     * @param {String} callback if successful
     * @param {String} callback if error occurred
     * @param {String} templateName
     * @param {Number} statusId
     * @return {Number} count of jobs
     */
    getCountOfJobsByTemplateNameAndStatusIdOnClientAsync: function(successCallback, failCallback, templateName, statusId) {
        var fn = window[successCallback];
        var count = null
        try{
            count = GeopalJobInternal.getCountOfJobsByTemplateNameAndStatusIdOnClient(templateName, statusId);
        } catch(err) {
            var fn_fail = window[failCallback];
            fn_fail(err);
            return;
        }
        fn(count);
    }
}

/**
 *
 * @class GeopalTemplate
 * @module GeopalTemplate
 * @main GeopalTemplate
 */
var GeopalTemplate = {

    /**
     * Gets the geopal job template id based on the template name.
     *
     * @example
     *      GeopalTemplate.getJobTemplateIdByName("1 Test");
     *
     * @deprecated Use `Geopal.Job.getJobTemplateIdByName(name)` instead.
     * @category Jobs
     * @param {String} templateName
     * @method getJobTemplateIdByName
     * @return {Number}
     */
    getJobTemplateIdByName: function(name) {
        return GeopalTemplateInternal.getJobTemplateIdByName(name);
    },

    /**
     * Spelling mistake fixed in 1.27.300
     */
    getJobTemaplateIdByName: function(name) {
        return GeopalTemplateInternal.getJobTemplateIdByName(name);
    }

}

/**
 *
 * @class GeopalAsset
 * @module GeopalAsset
 * @main GeopalAsset
 */
var GeopalAsset = {

    /**
     * Updates the asset status id.
     * @deprecated Use `Geopal.Asset.setAssetStatusByIdentifier(assetIdentifier, assetCompanyStatusId)` instead.
     * @category Assets
     * @method updateAssetStatus
     *
     * @example
     *      GeopalAsset.updateAssetStatus("Identifier", 3);
     *
     * @param {String} assetIdentifier The string identifier of the asset.
     * @param {Number} assetStatusId The id of the new status for the asset.
     * @return {Boolean} success
     */
    updateAssetStatus: function(assetIdentifier, assetStatusId) {
        GeopalAssetInternal.updateAssetStatus(assetIdentifier, assetStatusId);
    }
}

/**
 *
 * @class GeopalPrint
 * @module GeopalPrint
 * @main GeopalPrint
 */
var GeopalPrint = {

    /**
     * Coverts string to hex string then calls printHex(printString). Note: Requires the bluetooth device to be paired with the mobile device first
     * @example
     *      var printCommand = "This is a test for printing";
     *      GeopalPrint.printString(stringtoPrint);
     *
     * @category Print
     * @method printString
     * @param {String} string
     */
    printString: function(string) {
        GeopalPrintInternal.printString(string);
    },

    /**
     *  Opens activity showing paired devices and prints a hex string to a bluetooth connected printer. Note: Requires the bluetooth device to be paired with the mobile device first
     * @example
     *      var printCommand = "This is a test for printing | Is this on a new line?";
     *      var stringtoPrint = GeopalPrint.getPrintString(printCommand);
     *      GeopalPrint.printHex(stringtoPrint);
     *
     * @category Print
     * @method printHex
     * @param {String} string
     */
    printHex: function(string) {
        GeopalPrintInternal.printHex(string);
    },

    /**
     * Splits a string based on regularExpression
     * If no regularExpression found then spilt on | char
     * append hex string to each split
     * If no append found then add "0D0A"
     * Returns hex encoded string
     *
     * @example
     *      var printCommand = "This is a test for printing | Is this on a new line?";
     *      var stringtoPrint = GeopalPrint.getPrintString(printCommand);
     *      GeopalPrint.printHex(stringtoPrint);
     *
     *
     * Note:append is not converted to hex so must be a hex encoded string
     * @category Print
     * @param {String} stringtoPrint string to be converted to hex
     * @param {String} encoding of the string
     * @param {String} regularExpression to split
     * @param {String} append hex string to append to the end of each split
     * @method getPrintString
     */
    getPrintString: function(stringtoPrint, encoding, regularExpression, append) {
        switch(arguments.length){
            case 1:
                return GeopalPrintInternal.getPrintString(stringtoPrint);
                break;
            case 2:
                return GeopalPrintInternal.getPrintString(stringtoPrint, encoding);
                break;
            case 3:
                return GeopalPrintInternal.getPrintString(stringtoPrint, encoding, regularExpression);
                break;
            case 4:
                return GeopalPrintInternal.getPrintString(stringtoPrint, encoding, regularExpression, append);
                break;
        }
    }

}
/**
 * Firebase Object
 *
 */
var Firebase = function() {
    this.connectionKey = null;

    /**
     * connects to an open firebase db. Note does not sign user in
     */
    this.connect = function(databaseUrl, apiKey, gcmSenderId, storageBucket) {
        this.connectionKey = Geopal.response(GeopalWrapper.Firebase.initializeApp(databaseUrl, apiKey, gcmSenderId, storageBucket));
    };

    /**
     * Get the value stored under a child key e.g. samples could be location/country, team/employee, age etc.
     */
    this.get = function(key, successCallback, cancelCallback) {
        GeopalWrapper.Firebase.get(this.connectionKey, key, successCallback, cancelCallback);
    };

    /**
     * Set the value by child key e.g. samples could be key: location/country value: Ireland, key:team/employee value: {"name":"Tara"}, key: age value: 12 etc.
     */
    this.setValue = function(key, value) {
        GeopalWrapper.Firebase.setValue(this.connectionKey, key, value);
    };
    /**
     * Set a listener to be called when events to a key occurs such as a child added, moved, edited and deleted. options can include the ordering and filtering that applies
     */
    this.addChildEventListener = function(key, childAdded, childChanged, childRemoved, childMoved, cancelled, options) {
        GeopalWrapper.Firebase.addChildEventListener(this.connectionKey, key, childAdded, childChanged, childRemoved, childMoved, cancelled, options);
    };
    /**
     * remove child listener
     */
    this.removeChildEventsListener = function(key){
        GeopalWrapper.Firebase.removeChildEventsListener(key);
    };
    /**
     * Set a listener to be called when the value of a child is changed
     */
    this.addValueEventListener = function(key, dataChangedCallback, cancelledCallback, options) {
        GeopalWrapper.Firebase.addValueEventListener(this.connectionKey, key, dataChangedCallback, cancelledCallback, options);
    };
    /**
     * remove value listener
     */
    this.removeValueEventsListener = function(key){
        GeopalWrapper.Firebase.removeValueEventsListener(this.connectionKey, connectionKey, key);
    };

    /*
     * Update the value stored under child
     */
    this.updateChildren = function(key, value) {
        GeopalWrapper.Firebase.updateChildren(this.connectionKey, key, value);
    };

    /**
     * remove the child and its value
     */
    this.remove = function(key) {
        GeopalFirebaseInternal.remove(this.connectionKey, key);
    };
    /**
     * add a timebased child key to the value being pushed to firebase e.g. the value 2 would go under the child 12AYDHV798 or something similar
     */
    this.push = function(key, value) {
        GeopalFirebaseInternal.push(this.connectionKey, key, value);
    };
}

var GeopalWrapper = {

    Firebase : {

        initializeApp: function(databaseUrl, apiKey,  gcmSenderId, storageBucket) {
            apiKey = apiKey || "";
            gcmSenderId = gcmSenderId || "";
            storageBucket = storageBucket || "";
            return GeopalFirebaseInternal.initializeApp(databaseUrl, "", apiKey, gcmSenderId, storageBucket);
        },

        get: function(connectionKey, key, successCallback, cancelCallback) {
            GeopalFirebaseInternal.get(connectionKey, key, successCallback, cancelCallback);
        },

        setValue: function(connectionKey, key, value) {
            GeopalFirebaseInternal.setValue(connectionKey, key, JSON.stringify(value));
        },

        addChildEventListener: function(connectionKey, key, childAdded, childChanged, childRemoved, childMoved, cancelled, options) {
            options = options || {
                    "orderBy":"" ,
                    "limitToFirst":0,
                    "limitToLast":0,
                    "startAt":"",
                    "endAt":"",
                    "equalTo":""
                }
            options.orderBy = options.orderBy || "";
            options.limitToFirst = options.limitToFirst || 0;
            options.limitToLast = options.limitToLast || 0;
            options.startAt = options.startAt ||  "";
            options.endAt = options.endAt ||  "";
            options.equalTo = options.equalTo ||  "";

            if(typeof options.orderBy === 'object'){
                options.orderBy = JSON.stringify(options.orderBy);
            }

            if(typeof options.startAt === 'object'){
                options.startAt = JSON.stringify(options.startAt);
            }

            if(typeof options.endAt === 'object'){
                options.endAt = JSON.stringify(options.endAt);
            }

            if(typeof options.equalTo === 'object'){
                options.equalTo = JSON.stringify(options.equalTo);
            }

            GeopalFirebaseInternal.addChildEventListener(connectionKey, key, childAdded, childChanged, childRemoved, childMoved, cancelled,
                options.orderBy, options.limitToFirst, options.limitToLast,
                options.startAt, options.endAt,  options.equalTo);
        },

        removeChildEventsListener: function(connectionKey, key){
            GeopalFirebaseInternal.removeChildEventsListener(connectionKey, key);
        },

        addValueEventListener: function(connectionKey, key, dataChangedCallback, cancelledCallback, options) {
            options = options || {
                    "orderBy":"" ,
                    "limitToFirst":0,
                    "limitToLast":0,
                    "startAt":"",
                    "endAt":"",
                    "equalTo":""
                }
            options.orderBy = options.orderBy || "";
            options.limitToFirst = options.limitToFirst || 0;
            options.limitToLast = options.limitToLast || 0;
            options.startAt = options.startAt ||  "";
            options.endAt = options.endAt ||  "";
            options.equalTo = options.equalTo ||  "";

            if(typeof options.orderBy === 'object'){
                options.orderBy = JSON.stringify(options.orderBy);
            }

            if(typeof options.startAt === 'object'){
                options.startAt = JSON.stringify(options.startAt);
            }

            if(typeof options.endAt === 'object'){
                options.endAt = JSON.stringify(options.endAt);
            }

            if(typeof options.equalTo === 'object'){
                options.equalTo = JSON.stringify(options.equalTo);
            }

            GeopalFirebaseInternal.addValueEventListener(connectionKey, key, dataChangedCallback, cancelledCallback,
                options.orderBy, options.limitToFirst, options.limitToLast, options.startAt, options.endAt, options.equalTo);
        },

        removeValueEventsListener: function(connectionKey, key){
            GeopalFirebaseInternal.removeValueEventsListener(connectionKey, key);
        },


        updateChildren: function(connectionKey, key, value) {
            GeopalFirebaseInternal.updateChildren(connectionKey, key, JSON.stringify(value));
        },

        remove: function(connectionKey, key) {
            GeopalFirebaseInternal.remove(connectionKey, key);
        },

        push: function(connectionKey, key, value) {
            GeopalFirebaseInternal.push(connectionKey, key, value);
        }
    }
}

