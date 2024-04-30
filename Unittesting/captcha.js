// captcha.js
const submitCaptcha = (e, window) => {
    e.preventDefault();
    const captcha = document.querySelector('#g-recaptcha-response').value;
    return fetch('/gethomepage', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ captcha })
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if (data.success) {
                // Sætter sæsion variable, der indikerer at captcha verification var succuesfuld
                window.sessionStorage.setItem('captchaVerified', 'true');
            }
            else {
                window.sessionStorage.setItem('captchaVerified', 'false');
            }
        });
};


module.exports = { submitCaptcha };