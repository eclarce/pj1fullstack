document.addEventListener('DOMContentLoaded', function () {
  // Função para validar os campos de entrada
  // function validateInput() {
  //   const username = document.getElementById('username').value;
  //   const password = document.getElementById('password').value;
  //   const loginButton = document.getElementById('loginButton');

  //   // Habilita o botão de login se ambos os campos estiverem preenchidos
  //   if (username.trim() !== '' && password.trim() !== '') {
  //     loginButton.disabled = false;
  //   } else {
  //     loginButton.disabled = true;
  //   }
  // }

  // Função para realizar o login
  function login(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const messageDiv = document.getElementById('message');

    // Dados para enviar ao backend
    const data = {
      name: username, // Certifique-se de que o nome do campo corresponde ao esperado pelo backend
      password: password,
    };

    // Faz a requisição POST para o backend
    fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erro na requisição');
        }
        return response.json();
      })
      .then((data) => {
        // Exibe a mensagem de sucesso ou erro
        if (data.message === 'Login bem-sucedido!') {
          messageDiv.textContent = 'Login realizado com sucesso!';
          messageDiv.style.color = 'green';

          // Armazena o sessionId no localStorage (ou sessionStorage)
          localStorage.setItem('sessionId', data.sessionId);

          // Redireciona para a página PaginaBemVindo.html após o login
          window.location.href = 'PaginaBemVindo.html';
        } else {
          messageDiv.textContent = 'Erro no login: ' + data.error;
          messageDiv.style.color = 'red';
        }
      })
      .catch((error) => {
        console.error('Erro:', error);
        messageDiv.textContent = 'Erro ao conectar ao servidor.';
        messageDiv.style.color = 'red';
      });
  }

  // Adiciona o evento de submit ao formulário
  document.getElementById('loginForm').addEventListener('submit', login);

  // Adiciona o evento de input aos campos de usuário e senha
  document.getElementById('username').addEventListener('input', validateInput);
  document.getElementById('password').addEventListener('input', validateInput);
});

function validateInput() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const loginButton = document.getElementById('loginButton');

  // Habilita o botão de login se ambos os campos estiverem preenchidos
  if (username.trim() !== '' && password.trim() !== '') {
    loginButton.disabled = false;
  } else {
    loginButton.disabled = true;
  }
}