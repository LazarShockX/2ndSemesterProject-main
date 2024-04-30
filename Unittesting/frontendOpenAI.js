async function chatGPT_API_Completions(inputText, promt) {
    console.log(inputText)
    //Cache DOM elements to avoid unnecessary DOM traversals
    let responseElem = document.getElementById(`output-area`)
    console.log(responseElem)
    responseElem.innerText = "Working..."

    try {
        console.log("123")
        const response = await fetch("/gpt3_5/completion", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ record: inputText, promt: promt }),
        });
        const data = await response.json()
        
        console.log(data)

        if (response.status !== 200) {
            throw data.error || new Error(`Request failled with status ${response.status}`)
        }

        const responseText = data.choices[0].message.content
    
        responseElem.innerText = responseText
    } catch (error) {
        console.error(error);
        if (error instanceof Error) {
            responseElem.innerText = 'Error: ' + error.message;
        } else {
            responseElem.innerText = 'Error: ' + error;
        }
    }          
}

module.exports = {chatGPT_API_Completions};
