const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const CONFIG_FILE = path.join(__dirname, 'config.json');
const ORDERS_FILE = path.join(__dirname, 'orders.json');

let config = {
  botToken: process.env.BOT_TOKEN || '',
  adminChatId: process.env.ADMIN_CHAT_ID || ''
};

if (fs.existsSync(CONFIG_FILE)) {
  try {
    const saved = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'));
    config = { ...config, ...saved };
  } catch (e) {}
}

let orders = [];
if (fs.existsSync(ORDERS_FILE)) {
  try {
    orders = JSON.parse(fs.readFileSync(ORDERS_FILE, 'utf8'));
  } catch (e) {}
}

const saveOrders = () => {
  fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2), 'utf8');
};

const saveConfig = () => {
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2), 'utf8');
};

let bot = null;
const initBot = (token) => {
  if (!token) return;
  try {
    if (bot) {
      bot.stopPolling();
    }
    bot = new TelegramBot(token, { polling: true });

    bot.onText(/\/start/, (msg) => {
      const chatId = msg.chat.id;
      bot.sendMessage(chatId, "🛠 Добро пожаловать в USTA 3D! Нажмите кнопку ниже, чтобы открыть каталог и сделать заказ:", {
        reply_markup: {
          inline_keyboard: [
            [
              { text: "🚀 Открыть USTA 3D", web_app: { url: process.env.WEB_APP_URL || "https://usta-3d.vercel.app" } }
            ]
          ]
        }
      });
    });

    bot.on('callback_query', async (query) => {
      const data = query.data;
      const chatId = query.message.chat.id;
      const messageId = query.message.message_id;

      if (data.startsWith('accept_')) {
        const orderId = Number(data.replace('accept_', ''));
        const order = orders.find(o => o.id === orderId);

        if (order) {
          order.status = 'Принят в работу';
          saveOrders();

          const originalText = query.message.text || '';
          const cleanText = originalText.replace(/🟡.*$/, '').trim();

          try {
            await bot.editMessageText(cleanText + '\n\n🟢 *Статус: Принят в работу*', {
              chat_id: chatId,
              message_id: messageId,
              parse_mode: 'Markdown',
              reply_markup: { inline_keyboard: [] }
            });
            await bot.answerCallbackQuery(query.id, { text: 'Заказ принят в работу!' });
          } catch (err) {
            console.error('Error updating telegram message:', err);
          }
        }
      }
    });

    console.log('Telegram bot initialized successfully.');
  } catch (e) {
    console.error('Failed to initialize bot:', e);
  }
};

if (config.botToken) {
  initBot(config.botToken);
}

app.get('/api/orders', (req, res) => {
  const userId = req.query.userId;
  if (!userId || userId === 'guest') {
    return res.json(orders);
  }
  const userOrders = orders.filter(o => String(o.userId) === String(userId));
  res.json(userOrders);
});

app.post('/api/orders', async (req, res) => {
  const newOrder = req.body;
  orders.unshift(newOrder);
  saveOrders();

  if (bot && config.adminChatId) {
    try {
      const itemsList = newOrder.items.map(i => {
        const title = typeof i.title === 'object' ? (i.title.ru || i.title.uz) : i.title;
        return `- ${title} (x${i.qty}) — ${(i.price * i.qty).toLocaleString()} сум`;
      }).join('\n');

      const deliveryInfo = newOrder.deliveryMode === 'yandex' 
        ? `🚕 Яндекс Доставка: ${newOrder.deliveryAddress}` 
        : `📦 BTS Express (${newOrder.btsRegion}): ${newOrder.btsBranch}`;

      const text = `🔥 *НОВЫЙ ЗАКАЗ #${newOrder.id}*\n\n` +
                   `👤 *Имя:* ${newOrder.name}\n` +
                   `📞 *Телефон:* ${newOrder.phone}\n` +
                   `${deliveryInfo}\n` +
                   `💳 *Оплата:* ${newOrder.paymentMethod.toUpperCase()}\n\n` +
                   `🛒 *Товары:*\n${itemsList}\n\n` +
                   `💰 *Итого:* *${newOrder.total.toLocaleString()} сум*\n` +
                   `📅 *Дата:* ${newOrder.date}\n` +
                   `🟡 *Статус: Заявка отправлена*`;

      await bot.sendMessage(config.adminChatId, text, {
        parse_mode: 'Markdown',
        reply_markup: {
          inline_keyboard: [
            [
              { text: '✅ Принять в работу', callback_data: `accept_${newOrder.id}` }
            ]
          ]
        }
      });
    } catch (err) {
      console.error('Telegram notification error:', err);
    }
  }

  res.json({ success: true, order: newOrder });
});

app.post('/api/config', (req, res) => {
  const { botToken, adminChatId } = req.body;
  if (botToken) config.botToken = botToken;
  if (adminChatId) config.adminChatId = adminChatId;
  saveConfig();
  if (botToken) {
    initBot(botToken);
  }
  res.json({ success: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
