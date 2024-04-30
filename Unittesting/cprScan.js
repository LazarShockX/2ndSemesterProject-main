function inputTextNoCPR(inputText) {
    const CPRpattern = /\d{10}|\d{6}-\d{4}/;
    while (CPRpattern.test(inputText)){
        const outputTextNoCPR = inputText.replace(CPRpattern, "XXXXXX-XXXX");
        inputText = outputTextNoCPR;
    }
    return inputText;
}


module.exports = inputTextNoCPR;