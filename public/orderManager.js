// orderManager.js - Хранение заказов в LocalStorage клиента

function getSavedOrders() {
    try {
        const orders = localStorage.getItem('usta3d_orders');
        return orders ? JSON.parse(orders) : [];
    } catch (e) {
        console.error('Ошибка чтения заказов из localStorage:', e);
        return [];
    }
}

function saveNewOrder(order) {
    const orders = getSavedOrders();
    const newOrder = {
        id: order.id || Date.now().toString().slice(-6),
        date: new Date().toLocaleString('ru-RU'),
        items: order.items || [],
        total: order.total || 0,
        status: 'pending',
        statusText: '⏳ Ожидает подтверждения'
    };
    orders.unshift(newOrder);
    localStorage.setItem('usta3d_orders', JSON.stringify(orders));
}

function renderOrdersList(containerId = 'orders-list') {
    const container = document.getElementById(containerId);
    if (!container) return;

    const orders = getSavedOrders();

    if (orders.length === 0) {
        container.innerHTML = '<div style="text-align:center; padding: 20px; color: #888;">У вас пока нет заказов</div>';
        return;
    }

    container.innerHTML = orders.map(order => `
        <div style="background: #1c1c1e; border-radius: 12px; padding: 14px; margin-bottom: 10px; border: 1px solid #2c2c2e; color: #fff;">
            <div style="display:flex; justify-content:space-between; margin-bottom:6px;">
                <strong>Заказ №${order.id}</strong>
                <span style="font-size:12px; color:#8e8e93;">${order.date}</span>
            </div>
            <div style="font-size:14px; margin-bottom:6px;">
                Статус: <span style="color: ${order.status === 'accepted' ? '#34c759' : '#ff9500'}; font-weight:bold;">${order.statusText}</span>
            </div>
            <div style="font-size:13px; color:#ccc;">
                Сумма: <strong>${Number(order.total).toLocaleString()} сум</strong>
            </div>
        </div>
    `).join('');
}

async function checkOrdersStatus() {
    const orders = getSavedOrders();
    if (orders.length === 0) return;

    try {
        const res = await fetch('/api/check-orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ids: orders.map(o => o.id) })
        });
        if (res.ok) {
            const serverStatuses = await res.json();
            let updated = false;
            orders.forEach(o => {
                if (serverStatuses[o.id]) {
                    o.status = serverStatuses[o.id].status;
                    o.statusText = serverStatuses[o.id].statusText;
                    updated = true;
                }
            });
            if (updated) {
                localStorage.setItem('usta3d_orders', JSON.stringify(orders));
                renderOrdersList('orders-list');
            }
        }
    } catch (e) {
        console.log('Сервер временно недоступен, показываем локальную историю');
    }
}
