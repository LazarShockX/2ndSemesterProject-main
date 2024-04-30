
 document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".copy-area-container").forEach(copyTextContainer => {
        const textField = copyTextContainer.querySelector(".copy-area-field");
        const copyButton = copyTextContainer.querySelector(".copy-text-button");
        const copyMessage = copyTextContainer.querySelector(".copy-message");
        
    
        copyButton.addEventListener("click", () => {
            const text = textField.innerText;

            navigator.clipboard.writeText(text)
            .then(() => {
                console.log("Text copied to clipboard");
                copyMessage.innerText = "Copied!";
                setTimeout(() => {
                    copyMessage.innerText = "";
                }, 1500)
            })
            .catch(error => {
                console.error("Error copying text: ", error);
            })
        })
    });

    document.querySelectorAll(".paste-area-container").forEach(pasteTextContainer => {
        const textField = pasteTextContainer.querySelector(".paste-area-field");
        const pasteButton = pasteTextContainer.querySelector(".paste-text-button");
      
        pasteButton.addEventListener("click", () => {
          navigator.clipboard.readText().then(clipText => {
            console.log("Text pasted");
            textField.value = clipText;
          }).catch(error => {
            console.error("Error pasting text: ", error);
          })
        })
    });


  }); 

