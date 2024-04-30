document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('captchaform').addEventListener('submit', e => {
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
                if (!data.success)
                    alert(data.msg);
                if (data.success) {
                    // Sætter sæsion variable, der indikerer at captcha verification var succuesfuld
                    sessionStorage.setItem('captchaVerified', 'true');
                    // Redirecter brugeren til homepagen
                    window.location.href = "/Home";
                };
            });
    });
});
