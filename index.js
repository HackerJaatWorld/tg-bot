const fetch = require('node-fetch');

const BOT_TOKEN = '8082461510:AAEqrtSE6t7acTfHmVHIkYynw4Xe0LmAS3E';
const TELEGRAM_API_URL = `https://api.telegram.org/bot${BOT_TOKEN}`;

// Function to handle incoming updates
async function handleUpdate(update) {
  const chatId = update.message.chat.id;
  const message = update.message.text;

  // Basic response
  let responseText;
  if (message === '/start') {
    responseText = 'Hello! Welcome to my Telegram bot!';
  } else {
    responseText = `You said: ${message}`;
  }

  // Send a message back
  await fetch(`${TELEGRAM_API_URL}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text: responseText,
    }),
  });
}

// Main function to check for updates
async function checkUpdates() {
  let lastUpdateId = 0;

  setInterval(async () => {
    const response = await fetch(
      `${TELEGRAM_API_URL}/getUpdates?offset=${lastUpdateId + 1}`
    );
    const data = await response.json();

    data.result.forEach((update) => {
      handleUpdate(update);
      lastUpdateId = update.update_id;
    });
  }, 1000);
}

checkUpdates();
