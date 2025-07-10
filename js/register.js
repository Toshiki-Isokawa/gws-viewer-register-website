document.getElementById('register-form').addEventListener('submit', async function(e) {
  e.preventDefault();

  const user_id = document.getElementById('user_id').value;
  const password = document.getElementById('password').value;

  const messageDiv = document.getElementById('message');
  messageDiv.textContent = '登録処理中...';

  try {
    const response = await fetch('https://your-api-gateway-endpoint/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id, password })
    });

    if (response.ok) {
      messageDiv.textContent = '登録が完了しました。';
    } else {
      const errorData = await response.json();
      messageDiv.textContent = `エラー: ${errorData.message || response.statusText}`;
    }
  } catch (error) {
    console.error(error);
    messageDiv.textContent = 'ネットワークエラーが発生しました。';
  }
});
