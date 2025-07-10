document.getElementById('register-form').addEventListener('submit', async function(e) {
  e.preventDefault();

  const user_id = document.getElementById('user_id').value;
  const password = document.getElementById('password').value;

  const messageDiv = document.getElementById('message');
  messageDiv.textContent = '登録処理中...';

  try {
    const response = await fetch('https://j3wxyxe4p8.execute-api.ap-southeast-1.amazonaws.com/Prod/proxy', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id, password })
    });
    
    const data = await response.json();

    if (data.result === 1) {
      messageDiv.style.color = "green";
      messageDiv.textContent = 'ユーザ登録が完了しました。';
      document.getElementById('register-form').reset();
    } else {
      messageDiv.style.color = "red";
      if (data.message === 'User already exists') {
        messageDiv.textContent = 'このユーザーIDは既に登録されています。';
      } else {
        messageDiv.textContent = `エラー: ${data.message}`;
  }
    }
  } catch (error) {
    console.error(error);
    messageDiv.textContent = 'ネットワークエラーが発生しました。';
  }
});
