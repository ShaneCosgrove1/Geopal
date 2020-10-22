
//   var answers = ['Yes', 'No'];
//	 var answers = ['Yes', 'No', 'N\\A'];
//   var answers = ['Carried Out - Satisfactory', 'Carried Out - Un-Satisfactory', 'Not Carried Out'];
//   var answers = ['LHL', 'RHL', 'FULL'];
    /**
     * editable list of answers
     */
    var answers = ['Carried Out - Satisfactory', 'Carried Out - Un-Satisfactory', 'Not Carried Out'];

    /**
     * do not edit below this line
     */
    var answerIndex = answers.indexOf(Geopal.getJobWorkflowValue());
    
    /**
     * -1 is if the answer is not found
     * if not found defaults to first answer
     * else it gets the next answer
     */
    if (answerIndex == -1) {
        answerIndex = 0;
    } else {
        answerIndex = (answerIndex + 1) % answers.length;
    }

    Geopal.setJobWorkflowValue(answers[answerIndex]);
