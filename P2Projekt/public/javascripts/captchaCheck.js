window.onload = function () {
  if (sessionStorage.getItem('captchaVerified') !== 'true') {
    //redirecte brugeren til captcha verifikations siden

    window.location.href = "/";
  }
}