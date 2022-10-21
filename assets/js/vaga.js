let applicationButton = document.getElementById('applicationButton')

applicationButton.addEventListener('click', () => {
  applicationButton.classList.add('sent');
  applicationButton.innerHTML = `
    <span>Currículo enviado!</span>
    <img src="./../assets/img/icons/whiteCheck.svg" alt="Checkmark symbol.">
  `
})