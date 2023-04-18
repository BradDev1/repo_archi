const form = document.getElementById("form");
const message = document.getElementById("message");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const email = document.getElementById("email").value.trim();

  if (!email) {
    message.textContent = 'Veuillez saisir une adresse e-mail valide';
    return;
  }

  const urlCheck = "check.php";
  const urlSend = "data.php";
  const params = "email=" + email;

  const xhr = new XMLHttpRequest();
  xhr.open("POST", urlCheck, true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  xhr.onload = function () {
    if (xhr.status === 200) {
      const response = JSON.parse(xhr.responseText);
      if (response.exists) {
        message.textContent = "Cet adresse email existe déjà dans la liste d'abonnement";
      } else {
        xhr.open("POST", urlSend, true);
        xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xhr.onload = function () {
          if (xhr.status === 200) {
            message.textContent = "Abonnement effectuer";
            document.getElementById('email').value = '';
          } else {
            message.textContent = "Erreur lors de l'abonnement, veuillez réssayez plus tard";
          }
        };
        xhr.send(params);
      }
    } else {
      message.textContent = "Erreur lors de l'abonnement, veuillez réssayez plus tard";
    }
  };
  xhr.send(params);
});
