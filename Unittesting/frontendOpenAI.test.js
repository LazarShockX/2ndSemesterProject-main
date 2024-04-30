const { JSDOM } = require('jsdom');
const { chatGPT_API_Completions } = require('./frontendOpenAI')

const dom = new JSDOM(`<!DOCTYPE html><div id="output-area"></div>`);
global.document = dom.window.document;
global.fetch = jest.fn();

describe('chatGPT_API_Completions', () => {
    let inputText;
    let promt;
  
    beforeEach(() => {
      inputText = 'mock input text';
      promt = 'mock promt';
    });
  
    afterEach(() => {
      global.fetch.mockClear();
    });

    test('sets the responseElem element innerText to "Working..." before the fetch call', async () => {
        // Mock the global fetch function to return a promise that never resolves
        global.fetch = jest.fn(() => new Promise(() => {}));
    
        // Bruger ikke await i denne specifikke test, fordi vi kun tjekker for en egenskab "før" fetch callet, der er mocket til at returne en promise der aldrig resolver.
        chatGPT_API_Completions(inputText, promt);
    
        
        const responseElem = document.getElementById('output-area');
    
        expect(responseElem.innerText).toBe('Working...');

        global.fetch = jest.fn();
    });

    
  
    test('sends a POST request to the /gpt3_5/completion endpoint with the input data', async () => {
      await chatGPT_API_Completions(inputText, promt);
  
      expect(fetch).toHaveBeenCalledWith('/gpt3_5/completion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ record: inputText, promt: promt }),
      });
    });

    test('updates the responseElem element with the expected text when a successful response is received', async () => {
        const mockCompletion = { choices: [{ message: { content: 'mock completion' } }] };;
        fetch.mockResolvedValueOnce({
          status: 200,
          json: () => Promise.resolve(mockCompletion),
        });
      
        await chatGPT_API_Completions(inputText, promt);
      
        const responseElem = document.getElementById('output-area');
        expect(responseElem.innerText).toBe('mock completion');
      });

    test('updates the responseElem element with an error message when the fetch call fails', async () => {
        const mockError = new Error('mock network error');
        fetch.mockRejectedValueOnce(mockError);
      
        await chatGPT_API_Completions(inputText, promt);
      
        const responseElem = document.getElementById('output-area');
        expect(responseElem.innerText).toBe('Error: mock network error');
      });

    test('updates the responseElem element with an error message when the response status is not 200', async () => {
        fetch.mockResolvedValueOnce({
          status: 404,
          json: () => Promise.resolve({ error: 'mock error' }),
        });
      
        await chatGPT_API_Completions(inputText, promt);
      
        const responseElem = document.getElementById('output-area');
        expect(responseElem.innerText).toBe('Error: mock error');
      });
    // Add more tests here...
  });