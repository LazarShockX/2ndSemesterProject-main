const fetch = require('node-fetch');

async function openAIHandler(req, res, API_KEY) {
  const record = req.body.record || "";
  let systemText = `You're a GPT-based bot designed to enhance the readability and comprehensibility of medical records. The bot takes unstructured medical records as input and produces a refined version that is easier to read and understand. The bot's primary goal is to make medical records more accessible and user-friendly, improving patient outcomes and facilitating communication between healthcare providers. Furthermore if the input medical record does not appear to actually be a medical record, then request user to provide a proper medical record. Also the response has to be in the same language as the medical record provided.`
  let promt = req.body.promt

  if (!API_KEY) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured correctly"
      }
    });
    return;
  }

  if (record.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid health record"
      }
    })
    return;
  }

  try {
    const messages = [];

    messages.push({ role: "system", content: systemText });
    messages.push({ role: "user", content: promt });

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + API_KEY,
      },
      body: JSON.stringify({
        "model": "gpt-3.5-turbo",
        "messages": messages,
        "temperature": 0
      })
    });

    if (!response.ok) {
        throw new Error(`OpenAI API returned an error: ${response.statusText}`);
      }

    const responseJSON = await response.json()
    
    res.status(200).json(responseJSON);
  } catch (error) {
    res.status(500).json({
      error: {
        message: error.message
      }
    });
  }
}

module.exports = openAIHandler;