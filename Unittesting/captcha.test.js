
// captcha.test.js
const { JSDOM } = require('jsdom')
const { submitCaptcha } = require('./captcha');
const dom = new JSDOM(`<!DOCTYPE html><form id="captchaform"><input id="g-recaptcha-response"></form>`)
global.document = dom.window.document;
global.window = dom.window
global.window.alert = jest.fn();

global.fetch = jest.fn();

const sessionStorageMock = (() => {
    let store = {};
    return {
      getItem: (key) => store[key] || null,
      setItem: (key, value) => {
        store[key] = value.toString();
      },
      clear: () => {
        store = {};
      },
    };
  })();
  
  Object.defineProperty(window, 'sessionStorage', {
    value: sessionStorageMock,
  });

describe('submitCaptcha', () => {
  beforeEach(() => {
        fetch.mockClear()
      });
  test("captchaVerified item is set to 'false', if captcha-box is not checked", () => {
    document.querySelector('#g-recaptcha-response').value = false;
    const captcha = document.querySelector('#g-recaptcha-response').value;

    fetch.mockImplementationOnce(() =>
        Promise.resolve({
        json: () =>
            captcha == "true"
            ? Promise.resolve({ success: true, msg: '' })
            : Promise.resolve({ success: false, msg: 'Please select captcha' }),
        })
    );

    const e = { preventDefault: jest.fn() };
    const result = submitCaptcha(e, window);

    expect(e.preventDefault).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledWith('/gethomepage', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ captcha })
    });

    return result.then(() => {
        expect(window.sessionStorage.getItem('captchaVerified')).toBe('false');
    });
  });

    
  
  test("captchaVerified item is set to 'false', if captcha  verification was unsuccessful", () => {
    document.querySelector('#g-recaptcha-response').value = true;
    const captcha = document.querySelector('#g-recaptcha-response').value;

    fetch.mockImplementationOnce(() =>
        Promise.resolve({
        json: () =>
            captcha == "true"
            ? Promise.resolve({ success: false, msg: 'Failed captcha verification' })
            : Promise.resolve({ success: false, msg: 'Please select captcha' }),
        })
    );

    const e = { preventDefault: jest.fn() };
    const result = submitCaptcha(e, window);

    expect(e.preventDefault).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledWith('/gethomepage', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ captcha })
    });
    
    return result.then(() => {
        expect(window.sessionStorage.getItem('captchaVerified')).toBe('false');
    });
    });
  test("captchaVerified item is set to 'true', if captcha  verification was successful", () => {
    document.querySelector('#g-recaptcha-response').value = true;
    const captcha = document.querySelector('#g-recaptcha-response').value;

    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () =>
          captcha == "true"
            ? Promise.resolve({ success: true, msg: '' })
            : Promise.resolve({ success: false, msg: 'Please select captcha' }),
      })
    );

    const e = { preventDefault: jest.fn() };
    const result = submitCaptcha(e, window);

    expect(e.preventDefault).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledWith('/gethomepage', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ captcha })
    });

    return result.then(() => {
      expect(window.sessionStorage.getItem('captchaVerified')).toBe('true');
    });
  });

});