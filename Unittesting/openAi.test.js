const openAIHandler = require('./openAI');
const fetch = require('node-fetch')

jest.mock('node-fetch');

describe('openAIHandler', () => {
  let req;
  let res;
  beforeEach(() => {
    req = {
      body: {}
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    mockAPIKey = 'mock-api-key'
  });

  test('returns a completion if the OpenAI API key is configured correctly and the record is not empty', async () => {
    req.body.record = "mock record";
    const mockCompletion = { choices: [{ text: "mock completion" }] };
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockCompletion)
    });

    await openAIHandler(req, res, mockAPIKey);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockCompletion);
  });

  test('returns an error if the OpenAI API key is not configured correctly', async () => {
    await openAIHandler(req, res,"");

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: {
        message: "OpenAI API key not configured correctly"
      }
    });
  });

  test('returns an error if an empty record is provided', async () => {
    req.body.record = "";

    await openAIHandler(req, res, mockAPIKey);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: {
        message: "Please enter a valid health record"
      }
    });
  });

  test('returns an error if the OpenAI API returns an error', async () => {
    req.body.record = "mock record";
    const mockError = { error: { message: "OpenAI API returned an error: mock status text" } };
    fetch.mockResolvedValueOnce({
      ok: false,
      statusText: "mock status text",
      json: () => Promise.resolve(mockError)
    });
  
    await openAIHandler(req, res, mockAPIKey);
  
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(mockError);
  });

  // Add more tests here...
});