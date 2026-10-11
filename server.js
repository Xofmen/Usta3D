const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 10000;
const BOT_TOKEN = process.env.BOT_TOKEN;
const ADMIN_CHAT_ID = process.env.ADMIN_CHAT_ID;
const WEB_APP_URL = process.env.WEB_APP_URL || 'https://usta3d.onrender.com';

// Хранилище статусов в памяти процесса (для обратной связи)
const memoryOrders = {};

let bot = null;
if (BOT_TOKEN) {
    try {
        bot = new TelegramBot(BOT_TOKEN, { polling: true });
        console.log('Telegram bot initialized successfully.');

        bot.onText(/\/start/, (msg) => {
            bot.sendMessage(msg.chat.id, 'Добро пожаловать в USTA 3D Store! 🚀', {
                reply_markup: {
                    inline_keyboard: [[
                        { text: '🚀 Открыть USTA 3D', web_app: { url: WEB_APP_URL } }
                    ]]
                }
            });
        });

        bot.on('callback_query', async (query) => {
            const data = query.data;
            if (data.startsWith('accept_')) {
                const orderId = data.replace('accept_', '');
                memoryOrders[orderId] = { status: 'accepted', statusText: '🟢 Принят в работу' };

                await bot.answerCallbackQuery(query.id, { text: 'Заказ принят в работу!' });
                await bot.editMessageText(`${query.message.text}\n\n✅ **СТАТУС: Принят в работу**`, {
                    chat_id: query.message.chat.id,
                    message_id: query.message.message_id,
                    parse_mode: 'Markdown'
                });
            }
        });
    } catch (e) {
        console.error('Ошибка инициализации бота:', e.message);
    }
}

// Эндпоинт отправки нового заказа
app.post('/api/order', async (req, res) => {
    const { id, total, contact, items } = req.body;
    
    memoryOrders[id] = { status: 'pending', statusText: '⏳ Ожидает подтверждения' };

    if (bot && ADMIN_CHAT_ID) {
        const messageText = `🛒 **НОВЫЙ ЗАКАЗ №${id}**\n\n` +
            `👤 Контакт: ${contact}\n` +
            `💰 Сумма: ${total} сум\n` +
            `📦 Состав: ${items.join(', ')}`;

        try {
            await bot.sendMessage(ADMIN_CHAT_ID, messageText, {
                parse_mode: 'Markdown',
                reply_markup: {
                    inline_keyboard: [[
                        { text: '✅ Принять в работу', callback_data: `accept_${id}` }
                    ]]
                }
            });
        } catch (err) {
            console.error('Ошибка отправки сообщения в Telegram:', err.message);
        }
    }
    res.json({ success: true, orderId: id });
});

// Эндпоинт проверки статусов
app.post('/api/check-orders', (req, res) => {
    const { ids } = req.body;
    const result = {};
    if (Array.isArray(ids)) {
        ids.forEach(id => {
            if (memoryOrders[id]) {
                result[id] = memoryOrders[id];
            }
        });
    }
    res.json(result);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
