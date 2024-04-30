
function inputTextNoCPR(){
    let inputText = document.getElementById("input-text").value;
    const CPRpattern = /\d{10}|\d{6}-\d{4}/;
    while (CPRpattern.test(inputText)){
        const outputTextNoCPR = inputText.replace(CPRpattern, "XXXXXX-XXXX");
        inputText = outputTextNoCPR;
    }
    return inputText;
}

function outputText() {
    return document.getElementById('output-area').innerText
}

function rephrase() {
    if (outputText() === "Working...") {
        alert("Please don't click this button while we're working on an answer")
        return 
    }
    let inputText = inputTextNoCPR()
    let promt = `Write a detailed explanation of the following medical record for uneducated people. This description must also explain medical methods, techniques, operations, or other treatment options and treatment  courses mentioned in the record. Medical Record: "${inputText}". The response has to be in the same language as the medical record is written in and it must be written in the same format as the given medical record. Dont repeat the actual record and just give the explanation` 
    chatGPT_API_Completions(inputText, promt)
}

function regenerateResponse() {
    if (outputText() === "Working...") {
        alert("Please don't click this button while we're working on an answer")
        return 
    }
    let inputText = outputText()
    let promt = `Explain the following medical record, that has already been rephrased, in another way to help the patient understand it "${inputText}". Your response has to be in the same language as the medical record provided` 
    chatGPT_API_Completions(inputText, promt)
}


async function chatGPT_API_Completions(inputText, promt) {
    //Cache DOM elements to avoid unnecessary DOM traversals
    let responseElem = document.getElementById(`output-area`)
    responseElem.innerText = "Working..."
    try {
        const response = await fetch("/gpt3_5/completion", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ record: inputText, promt: promt }),
        });
        const data = await response.json()

        if (response.status !== 200) {
            throw data.error || new Error(`Request failled with status ${response.status}`)
        }

        const responseText = data.choices[0].message.content
    
        typeSentence(responseText, responseElem, data, true);
    } catch (error) {
        console.error(error);
        console.error(error);
        responseElem.innerText = 'Error: ' + error.message;
    } 
}
async function typeSentence(sentence, elementReference, data, delay = 30) {
    elementReference.innerText = "";
    if (sentence === "HTTP ERROR: 401") {
        sentence += " — Please make sure that your Open AI API Key has been set properly.";
    }
    const letters = sentence.split("");
    console.log(letters)
    let i = 0;
    while (i < letters.length) {
        await waitForMs(delay);
        elementReference.append(letters[i]);
        i++
    }
    return;
}

function waitForMs(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}


