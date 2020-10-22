    /**
     * editable list of answers
     */
    var answers = ['RHL', 'LHL', 'FULL'];

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
