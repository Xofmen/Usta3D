import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, Home, FileText, Search, Plus, Minus, Trash2, 
  CheckCircle, ArrowLeft, Camera, Send, Sparkles, 
  Settings, Edit, Save, X, Upload, MapPin, CreditCard, Lock, ShieldCheck, 
  ChevronLeft, ChevronRight, Key, Bell, GripVertical, ArrowUp, ArrowDown, Heart
} from 'lucide-react';

const INITIAL_PRODUCTS = [
  {
    id: 1,
    title: { ru: "Подставка для ручек USTA", uz: "USTA ruchkalar stendi" },
    category: "Для дома",
    price: 49000,
    images: [
      "https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&w=600&q=80"
    ],
    tags: { ru: ["PLA пластик", "Прочный", "Стильный"], uz: ["PLA plastik", "Mustahkam", "Zamonaviy"] },
    description: { 
      ru: "Стильный и практичный аксессуар для вашего рабочего стола с качественной 3D-печатью.",
      uz: "Yuqori sifatli 3D bosib chiqarilgan ish stolingiz uchun zamonaviy va amaliy aksessuar."
    }
  },
  {
    id: 2,
    title: { ru: "Чаша-дуршлаг с циркуляцией воды", uz: "Suv aylanishi bilan idish-suvso'rgich" },
    category: "Для дома",
    price: 86000,
    images: [
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=600&q=80"
    ],
    tags: { ru: ["Уникальный", "Для ягод и фруктов"], uz: ["Noyob", "Mevalar uchun"] },
    description: {
      ru: "Промывка под проточной водой, вода циркулирует внутри чаши.",
      uz: "Oqova suv ostida yuvish, suv idish ichida aylanadi."
    }
  },
  {
    id: 3,
    title: { ru: "Фигурка Дракона (Articulated)", uz: "Ajdarho figurasi (Harakatlanuvchi)" },
    category: "Подарки",
    price: 120000,
    images: [
      "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80"
    ],
    tags: { ru: ["Гибкий", "Премиум"], uz: ["Moslashuvchan", "A'lo sifat"] },
    description: {
      ru: "Детализированная подвижная фигурка мифического существа.",
      uz: "Mifologik mavjudotning mufassal harakatlanuvchi figurasi."
    }
  }
];

const INITIAL_CATEGORIES = ["Для дома", "Авто", "Подарки", "Детали", "Офис"];

const BTS_REGIONS_AND_BRANCHES = [
  { region: "Ташкент", branches: ["0101 | YAKKASAROY", "0103 | SHAYXONTOHUR", "0107 | SERGELI", "0108 | YUNUSOBOD", "0112 | QO'YLIQ", "0134 | TASHKENT INDEX"] },
  { region: "Самаркандская область", branches: ["SAMARKAND | SOGDIANA", "SAMARKAND | REGISTAN", "BULUNGUR | FILIAL", "AKDARYA | FILIAL"] },
  { region: "Бухарская область", branches: ["BUKHARA | CENTR", "BUKHARA | 5-MKR", "GIDUVON | FILIAL"] },
  { region: "Навоийская область & Зарафшан", branches: ["ZARAFSHAN | 13-MIKRARAYON", "NAVOI | CENTR", "KARMANA | FILIAL"] },
  { region: "Кашкадарьинская область", branches: ["KARSHI | CENTR", "SHAKHRISABZ | FILIAL", "KASAN | FILIAL"] },
  { region: "Сурхандарьинская область", branches: ["TERMEZ | CENTR", "DENAU | FILIAL"] },
  { region: "Андижанская область", branches: ["ANDIJON | CENTR", "ASAKA | FILIAL", "PAYTUG | FILIAL"] },
  { region: "Наманганская область", branches: ["NAMANGAN | CENTR", "CHUST | FILIAL", "KASANSAY | FILIAL"] },
  { region: "Ферганская область", branches: ["FERGANA | CENTR", "KOKAND | FILIAL", "MARGILAN | FILIAL"] },
  { region: "Хорезмская область & Нукус", branches: ["URGENCH | CENTR", "NUKUS | CENTR"] },
  { region: "Джизак & Сырдарья", branches: ["JIZZAKH | CENTR", "GULISTAN | CENTR"] }
];

const TRANSLATIONS = {
  ru: {
    slogan: "Siz o'ylang — biz yaratamiz",
    bannerTitle: "Ваши идеи в реальность!",
    bannerSub: "Создаем уникальные модели, декор и детали любой сложности.",
    customOrderBtn: "Индивидуальный заказ",
    searchPlaceholder: "Найти товары или модели...",
    allProducts: "Все товары",
    sum: "сум",
    addToCart: "В корзину",
    backToCatalog: "Назад в каталог",
    buyNow: "Купить сейчас",
    cartTitle: "Корзина",
    emptyCart: "Ваша корзина пуста",
    emptyCartSub: "Добавьте модели из каталога, чтобы сделать заказ.",
    openCatalog: "Открыть каталог",
    checkoutTitle: "Оформить заказ",
    recipientName: "Имя получателя",
    namePlaceholder: "Ваше имя",
    phone: "Телефон",
    deliveryType: "Способ доставки",
    deliveryYandex: "Яндекс Доставка (Курьер до двери)",
    deliveryBts: "BTS Express (Почтовые отделения по всему Узбекистану)",
    selectRegion: "Выберите регион:",
    selectBranch: "Выберите отделение BTS:",
    deliveryAddress: "Адрес доставки (улица, дом, квартира)",
    addressPlaceholder: "ул. Амира Темура, д. 10, кв. 5",
    paymentMethod: "Способ оплаты",
    payClick: "Click / Payme (Онлайн)",
    payUzum: "Uzum Pay",
    totalPrice: "Итого к оплате:",
    confirmOrder: "Подтвердить заказ",
    orderSuccess: "Заказ успешно оформлен!",
    orderSuccessSub: "Информация отправлена в Telegram. Менеджер свяжется с вами.",
    customTitle: "Индивидуальный заказ",
    customSub: "По вашим чертежам, эскизам или фото.",
    uploadPhoto: "Загрузить фото или STL файл",
    uploadSub: "PNG, JPG, STL до 50MB",
    taskDesc: "Описание задачи и пожелания",
    taskPlaceholder: "Опишите размеры, цвет пластика (PLA, PETG) и количество...",
    sendRequest: "Отправить на оценку",
    requestSent: "Запрос отправлен!",
    requestSentSub: "Мы изучим чертеж/фото и свяжемся с вами для расчета стоимости.",
    ordersTitle: "Мои заказы",
    noOrders: "Заказов пока нет",
    noOrdersSub: "Здесь появятся ваши заказы, статусы и трек-номера.",
    orderStatus: "Заявка отправлена",
    acceptedStatus: "Принят в работу",
    navCatalog: "Каталог",
    navFavorites: "Избранное",
    navCart: "Корзина",
    navOrders: "Заказы",
    favoritesTitle: "Избранные товары",
    emptyFavorites: "В избранном пока ничего нет",
    emptyFavoritesSub: "Нажмите на сердечко на товаре, чтобы добавить его сюда.",
    adminTitle: "Панель администратора (ALPHA)",
    adminProtected: "Вход для разработчика",
    pinPrompt: "Введите секретный PIN-код:",
    enterPin: "Введите PIN",
    wrongPin: "Неверный PIN-код!",
    addNewProduct: "Добавить новый товар",
    editProduct: "Редактировать товар",
    titleRu: "Название (RU)",
    titleUz: "Название (UZ)",
    category: "Категория",
    price: "Цена (сум)",
    imageUrls: "Ссылки на фото (по одной на строку)",
    uploadImageFile: "Загрузить фото с устройства",
    descRu: "Описание (RU)",
    descUz: "Описание (UZ)",
    tagsRu: "Теги RU (через запятую)",
    tagsUz: "Теги UZ (через запятую)",
    categoriesManage: "Управление категориями",
    newCategoryName: "Новая категория",
    addCategoryBtn: "Добавить",
    settingsTab: "Настройки Telegram и PIN",
    botTokenLabel: "Telegram Bot Token",
    chatIdLabel: "Admin Chat ID",
    newPinLabel: "Новый PIN-код админа",
    saveSettings: "Сохранить настройки",
    settingsSaved: "Настройки сохранены!",
    save: "Сохранить",
    cancel: "Отмена",
    delete: "Удалить",
    reorderGallery: "Порядок картинок в карточке (Drag & Drop):",
    reorderCards: "Порядок карточек в каталоге (Drag & Drop):"
  },
  uz: {
    slogan: "Siz o'ylang — biz yaratamiz",
    bannerTitle: "G'oyalaringizni voqelikka aylantiramiz!",
    bannerSub: "Noyob modellar, dekoratsiyalar va har qanday murakkablikdagi qismlarni yaratamiz.",
    customOrderBtn: "Individual buyurtma",
    searchPlaceholder: "Mahsulotlar yoki modellarni izlash...",
    allProducts: "Barcha mahsulotlar",
    sum: "so'm",
    addToCart: "Savatga",
    backToCatalog: "Katalogga qaytish",
    buyNow: "Hozir xarid qilish",
    cartTitle: "Savat",
    emptyCart: "Savat xali bo'sh",
    emptyCartSub: "Buyurtma berish uchun katalogdan modellarni qo'shing.",
    openCatalog: "Katalogni ochish",
    checkoutTitle: "Buyurtmani rasmiylashtirish",
    recipientName: "Qabul qiluvchining ismi",
    namePlaceholder: "Ismingiz",
    phone: "Telefon",
    deliveryType: "Yetkazib berish turi",
    deliveryYandex: "Yandeks Yetkazib berish (Kuryer eshikgacha)",
    deliveryBts: "BTS Express (O'zbekiston bo'ylab pochta filiallari)",
    selectRegion: "Viloyat / Regionni tanlang:",
    selectBranch: "BTS filialini tanlang:",
    deliveryAddress: "Yetkazib berish manzili (ko'cha, uy, xonadon)",
    addressPlaceholder: "Amir Temur ko'chasi, 10-uy, 5-xonadon",
    paymentMethod: "To'lov usuli",
    payClick: "Click / Payme (Onlayn)",
    payUzum: "Uzum Pay",
    totalPrice: "Jami to'lov:",
    confirmOrder: "Buyurtmani tasdiqlash",
    orderSuccess: "Buyurtma muvaffaqiyatli rasmiylashtirildi!",
    orderSuccessSub: "Ma'lumot Telegramga yuborildi. Menejer bog'lanadi.",
    customTitle: "Individual buyurtma",
    customSub: "Chizmalaringiz, eskizlaringiz yoki fotolaringiz bo'yicha.",
    uploadPhoto: "Foto yoki STL faylni yuklash",
    uploadSub: "PNG, JPG, STL 50MB gacha",
    taskDesc: "Vazifa tavsifi va xohishlar",
    taskPlaceholder: "O'lchamlari, plastik rangi (PLA, PETG) va miqdorini tasvirlang...",
    sendRequest: "Baholashga yuborish",
    requestSent: "So'rov yuborildi!",
    requestSentSub: "Chizma/fotonizni o'rganib chiqib, narxini hisoblash uchun bog'lanamiz.",
    ordersTitle: "Mening buyurtmalarim",
    noOrders: "Hozircha buyurtmalar yo'q",
    noOrdersSub: "Bu yerda buyurtmalaringiz, maqomlari va trek-raqamlari paydo bo'ladi.",
    orderStatus: "Ariza yuborildi",
    acceptedStatus: "Qabul qilindi",
    navCatalog: "Katalog",
    navFavorites: "Saralangan",
    navCart: "Savat",
    navOrders: "Buyurtmalar",
    favoritesTitle: "Saralangan mahsulotlar",
    emptyFavorites: "Saralanganlar hozircha bo'sh",
    emptyFavoritesSub: "Bu yerga qo'shish uchun mahsulotdagi yurakchani bosing.",
    adminTitle: "Admin paneli (ALPHA)",
    adminProtected: "Dasturchi uchun kirish",
    pinPrompt: "Maxfiy PIN-kodni kiriting:",
    enterPin: "PIN kiriting",
    wrongPin: "Noto'g'ri PIN-kod!",
    addNewProduct: "Yangi mahsulot qo'shish",
    editProduct: "Mahsulotni tahrirlash",
    titleRu: "Nomi (RU)",
    titleUz: "Nomi (UZ)",
    category: "Kategoriya",
    price: "Narxi (so'm)",
    imageUrl: "Rasm havolalari (har bir qatorda bittadan)",
    uploadImageFile: "Qurilmadan rasm yuklash",
    descRu: "Tavsifi (RU)",
    descUz: "Tavsifi (UZ)",
    tagsRu: "Teglar RU (vergul bilan)",
    tagsUz: "Teglar UZ (vergul bilan)",
    categoriesManage: "Kategoriyalarni boshqarish",
    newCategoryName: "Yangi kategoriya",
    addCategoryBtn: "Qo'shish",
    settingsTab: "Telegram va PIN sozlamalari",
    botTokenLabel: "Telegram Bot Token",
    chatIdLabel: "Admin Chat ID",
    newPinLabel: "Yangi admin PIN-kodi",
    saveSettings: "Sozlamalarni saqlash",
    settingsSaved: "Sozlamalar saqlandi!",
    save: "Saqlash",
    cancel: "Bekor qilish",
    delete: "O'chirish",
    reorderGallery: "Rasm tartibini o'zgartirish (Drag & Drop):",
    reorderCards: "Katalogda kartochkalar tartibi (Drag & Drop):"
  }
};

export default function App() {
  const [activeTab, setActiveTab] = useState('catalog');
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('usta3d_products_alpha');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem('usta3d_categories_alpha');
    return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
  });

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('usta3d_favorites_alpha');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [orders, setOrders] = useState([]);
  
  const [tgUser, setTgUser] = useState(null);
  const [botToken, setBotToken] = useState(() => localStorage.getItem('usta3d_bot_token') || '');
  const [adminChatId, setAdminChatId] = useState(() => localStorage.getItem('usta3d_chat_id') || '');
  const [adminPin, setAdminPin] = useState(() => localStorage.getItem('usta3d_pin') || '7777');
  const [newPinInput, setNewPinInput] = useState('');
  const [settingsSavedMsg, setSettingsSavedMsg] = useState(false);

  const [lang, setLang] = useState(() => localStorage.getItem('usta3d_lang') || 'ru');

  const [logoTapCount, setLogoTapCount] = useState(0);
  const [showPinModal, setShowPinModal] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminSubTab, setAdminSubTab] = useState('products');

  // Animation trigger helper
  const [animatingFavId, setAnimatingFavId] = useState(null);

  // Drag and drop states
  const [draggedImgIdx, setDraggedImgIdx] = useState(null);
  const [draggedProductIdx, setDraggedProductIdx] = useState(null);

  const t = TRANSLATIONS[lang];

  useEffect(() => {
    try {
      localStorage.setItem('usta3d_products_alpha', JSON.stringify(products));
    } catch (e) {
      console.warn('LocalStorage limit reached:', e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem('usta3d_categories_alpha', JSON.stringify(categories));
    } catch (e) {}
  }, [categories]);

  useEffect(() => {
    try {
      localStorage.setItem('usta3d_favorites_alpha', JSON.stringify(favorites));
    } catch (e) {}
  }, [favorites]);

  useEffect(() => {
    try {
      localStorage.setItem('usta3d_bot_token', botToken);
      localStorage.setItem('usta3d_chat_id', adminChatId);
      localStorage.setItem('usta3d_pin', adminPin);
    } catch (e) {}
  }, [botToken, adminChatId, adminPin]);

  useEffect(() => {
    localStorage.setItem('usta3d_lang', lang);
  }, [lang]);

  useEffect(() => {
    if (window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.ready();
      tg.expand();
      if (tg.initDataUnsafe?.user) {
        setTgUser(tg.initDataUnsafe.user);
      }
    }
  }, []);

  const [name, setName] = useState(tgUser ? `${tgUser.first_name || ''} ${tgUser.last_name || ''}`.trim() : '');
  const [phone, setPhone] = useState('+998 ');
  const [deliveryMode, setDeliveryMode] = useState('yandex');
  const [selectedRegion, setSelectedRegion] = useState(BTS_REGIONS_AND_BRANCHES[0].region);
  const [selectedBtsBranch, setSelectedBtsBranch] = useState(BTS_REGIONS_AND_BRANCHES[0].branches[0]);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('click');
  const [orderSuccess, setOrderSuccess] = useState(false);

  const [customDesc, setCustomDesc] = useState('');
  const [customSubmitted, setCustomSubmitted] = useState(false);

  const [editingProduct, setEditingProduct] = useState(null);
  const [adminForm, setAdminForm] = useState({
    titleRu: '',
    titleUz: '',
    category: categories[0] || 'Для дома',
    price: '',
    imagesList: [],
    descRu: '',
    descUz: '',
    tagsRu: '',
    tagsUz: ''
  });
  const [newCatInput, setNewCatInput] = useState('');
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  const filteredProducts = products.filter(p => {
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const title = typeof p.title === 'object' ? (p.title[lang] || p.title.ru) : p.title;
    const matchesSearch = title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFavorite = (productId, e) => {
    if (e) e.stopPropagation();
    setAnimatingFavId(productId);
    setTimeout(() => setAnimatingFavId(null), 400);

    setFavorites(prev => 
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? {...item, qty: item.qty + 1} : item);
      }
      return [...prev, {...product, qty: 1}];
    });
  };

  const updateQty = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.qty + delta;
        return newQty > 0 ? {...item, qty: newQty} : null;
      }
      return item;
    }).filter(Boolean));
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const sendOrderToTelegram = async (order) => {
    if (!botToken || !adminChatId) return;
    
    const itemsList = order.items.map(i => {
      const title = typeof i.title === 'object' ? (i.title.ru || i.title.uz) : i.title;
      return `- ${title} (x${i.qty}) — ${(i.price * i.qty).toLocaleString()} сум`;
    }).join('\n');

    const deliveryInfo = order.deliveryMode === 'yandex' 
      ? `🚕 Яндекс Доставка: ${order.deliveryAddress}` 
      : `📦 BTS Express (${order.btsRegion}): ${order.btsBranch}`;

    const text = `🔥 *НОВЫЙ ЗАКАЗ #${order.id}*\n\n` +
                 `👤 *Имя:* ${order.name}\n` +
                 `📞 *Телефон:* ${order.phone}\n` +
                 `${deliveryInfo}\n` +
                 `💳 *Оплата:* ${order.paymentMethod.toUpperCase()}\n\n` +
                 `🛒 *Товары:*\n${itemsList}\n\n` +
                 `💰 *Итого:* *${order.total.toLocaleString()} сум*\n` +
                 `📅 *Дата:* ${order.date}`;

    try {
      await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: adminChatId,
          text: text,
          parse_mode: 'Markdown',
          reply_markup: {
            inline_keyboard: [
              [
                { text: '✅ Принять в работу', callback_data: `accept_${order.id}` }
              ]
            ]
          }
        })
      });
    } catch (err) {
      console.error('Telegram notification error:', err);
    }
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (!name || phone.length < 10) return;
    
    const newOrder = {
      id: Math.floor(10000 + Math.random() * 90000),
      items: [...cart],
      total: totalPrice,
      name,
      phone,
      deliveryMode,
      btsRegion: deliveryMode === 'bts' ? selectedRegion : '',
      btsBranch: deliveryMode === 'bts' ? selectedBtsBranch : '',
      deliveryAddress: deliveryMode === 'yandex' ? deliveryAddress : '',
      paymentMethod,
      date: new Date().toLocaleDateString(),
      status: t.orderStatus
    };

    setOrders([newOrder, ...orders]);
    await sendOrderToTelegram(newOrder);

    setCart([]);
    setOrderSuccess(true);
    setTimeout(() => {
      setOrderSuccess(false);
      setActiveTab('orders');
    }, 1500);
  };

  const handleLogoTap = () => {
    const nextCount = logoTapCount + 1;
    setLogoTapCount(nextCount);
    if (nextCount >= 5) {
      setLogoTapCount(0);
      if (isAdminAuthenticated) {
        setActiveTab('admin');
      } else {
        setShowPinModal(true);
        setPinInput('');
        setPinError(false);
      }
    }
  };

  const handlePinSubmit = (e) => {
    e.preventDefault();
    if (pinInput === adminPin) {
      setIsAdminAuthenticated(true);
      setShowPinModal(false);
      setActiveTab('admin');
    } else {
      setPinError(true);
    }
  };

  const openAdminAdd = () => {
    setEditingProduct(null);
    setAdminForm({
      titleRu: '',
      titleUz: '',
      category: categories[0] || 'Для дома',
      price: '',
      imagesList: ['https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=600&q=80'],
      descRu: '',
      descUz: '',
      tagsRu: 'PLA пластик, Прочный, Стильный',
      tagsUz: 'PLA plastik, Mustahkam, Zamonaviy'
    });
    setAdminSubTab('products');
    setActiveTab('admin');
  };

  const openAdminEdit = (product) => {
    if (!isAdminAuthenticated) {
      setShowPinModal(true);
      setPinInput('');
      setPinError(false);
      return;
    }
    setEditingProduct(product);
    const tRu = typeof product.tags === 'object' && product.tags.ru ? product.tags.ru.join(', ') : 'PLA';
    const tUz = typeof product.tags === 'object' && product.tags.uz ? product.tags.uz.join(', ') : 'PLA';
    const imgs = Array.isArray(product.images) && product.images.length > 0 ? product.images : [product.image || 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=600&q=80'];

    setAdminForm({
      titleRu: typeof product.title === 'object' ? product.title.ru : product.title,
      titleUz: typeof product.title === 'object' ? product.title.uz : product.title,
      category: product.category || categories[0],
      price: product.price,
      imagesList: imgs,
      descRu: typeof product.description === 'object' ? product.description.ru : product.description,
      descUz: typeof product.description === 'object' ? product.description.uz : product.description,
      tagsRu: tRu,
      tagsUz: tUz
    });
    setAdminSubTab('products');
    setActiveTab('admin');
  };

  const moveImage = (fromIdx, toIdx) => {
    if (toIdx < 0 || toIdx >= adminForm.imagesList.length) return;
    const updated = [...adminForm.imagesList];
    const [moved] = updated.splice(fromIdx, 1);
    updated.splice(toIdx, 0, moved);
    setAdminForm(prev => ({ ...prev, imagesList: updated }));
  };

  const moveProduct = (fromIdx, toIdx) => {
    if (toIdx < 0 || toIdx >= products.length) return;
    const updated = [...products];
    const [moved] = updated.splice(fromIdx, 1);
    updated.splice(toIdx, 0, moved);
    setProducts(updated);
  };

  const compressImage = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          const maxDim = 800;

          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          const compressedBase64 = canvas.toDataURL('image/jpeg', 0.65);
          resolve(compressedBase64);
        };
        img.onerror = () => resolve(event.target.result);
      };
      reader.onerror = () => resolve(null);
    });
  };

  const handleImageFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      Promise.all(files.map(file => compressImage(file))).then(base64s => {
        const validBase64s = base64s.filter(Boolean);
        setAdminForm(prev => ({
          ...prev,
          imagesList: [...prev.imagesList, ...validBase64s]
        }));
      });
    }
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    const tagsRuArr = adminForm.tagsRu.split(',').map(s => s.trim()).filter(Boolean);
    const tagsUzArr = adminForm.tagsUz.split(',').map(s => s.trim()).filter(Boolean);

    const productData = {
      id: editingProduct ? editingProduct.id : Date.now(),
      title: { ru: adminForm.titleRu, uz: adminForm.titleUz || adminForm.titleRu },
      category: adminForm.category,
      price: Number(adminForm.price),
      images: adminForm.imagesList.length ? adminForm.imagesList : ["https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=600&q=80"],
      tags: { ru: tagsRuArr, uz: tagsUzArr },
      description: { ru: adminForm.descRu, uz: adminForm.descUz || adminForm.descRu }
    };

    if (editingProduct) {
      setProducts(prev => prev.map(p => p.id === editingProduct.id ? productData : p));
    } else {
      setProducts([productData, ...products]);
    }
    setEditingProduct(null);
    setSelectedCategory('all');
    setActiveTab('catalog');
  };

  const handleDeleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    setEditingProduct(null);
    setActiveTab('catalog');
  };

  const handleAddCategory = () => {
    if (newCatInput.trim() && !categories.includes(newCatInput.trim())) {
      setCategories([...categories, newCatInput.trim()]);
      setNewCatInput('');
    }
  };

  const handleDeleteCategory = (catToDelete) => {
    if (categories.length > 1) {
      setCategories(categories.filter(c => c !== catToDelete));
      if (selectedCategory === catToDelete) setSelectedCategory('all');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 pb-24 max-w-md mx-auto relative shadow-2xl flex flex-col">
      
      {/* HEADER */}
      <header className="bg-white/90 backdrop-blur-md px-4 py-3 sticky top-0 z-30 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-2.5 cursor-pointer select-none transition-transform active:scale-95" onClick={handleLogoTap}>
          <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-blue-500 rounded-2xl overflow-hidden flex items-center justify-center text-white font-black text-lg shadow-md shadow-blue-500/20 border-2 border-white">
            {tgUser?.photo_url ? (
              <img src={tgUser.photo_url} alt="avatar" className="w-full h-full object-cover" />
            ) : (
              <span>U</span>
            )}
          </div>
          <div>
            <h1 className="font-bold text-sm leading-tight tracking-tight flex items-center gap-1">
              {tgUser ? `${tgUser.first_name}` : "USTA 3D"}
              <span className="bg-blue-100 text-blue-700 text-[9px] font-black px-1.5 py-0.2 rounded-md">ALPHA</span>
            </h1>
            <p className="text-[10px] text-gray-400">{t.slogan}</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {isAdminAuthenticated && (
            <button 
              onClick={openAdminAdd}
              className="bg-blue-600 active:scale-95 text-white text-xs font-bold px-2.5 py-1.5 rounded-xl shadow-md shadow-blue-600/20 flex items-center gap-1 transition-all"
            >
              <Settings className="w-3.5 h-3.5" /> Admin
            </button>
          )}

          <button 
            onClick={() => setLang(lang === 'ru' ? 'uz' : 'ru')}
            className="bg-gray-100 hover:bg-gray-200 active:scale-95 text-gray-800 text-xs font-bold px-2.5 py-1.5 rounded-xl transition-all uppercase"
          >
            {lang}
          </button>
        </div>
      </header>

      {/* PIN MODAL */}
      {showPinModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 w-full max-w-xs shadow-2xl border border-gray-100 animate-scaleUp">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <ShieldCheck className="w-6 h-6 animate-pulse" />
            </div>
            <h3 className="font-bold text-center text-base mb-1">{t.adminProtected}</h3>
            <p className="text-xs text-center text-gray-400 mb-4">{t.pinPrompt}</p>

            <form onSubmit={handlePinSubmit} className="space-y-3">
              <input 
                type="password"
                maxLength="6"
                autoFocus
                placeholder={t.enterPin}
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-center text-lg tracking-widest focus:outline-none focus:border-blue-600 transition-all"
              />
              {pinError && <p className="text-xs text-red-500 text-center animate-bounce">{t.wrongPin}</p>}

              <div className="flex gap-2 pt-2">
                <button 
                  type="button" 
                  onClick={() => setShowPinModal(false)}
                  className="flex-1 bg-gray-100 active:scale-95 text-gray-700 font-semibold py-2.5 rounded-xl text-xs transition-transform"
                >
                  {t.cancel}
                </button>
                <button 
                  type="submit"
                  className="flex-1 bg-blue-600 active:scale-95 text-white font-bold py-2.5 rounded-xl text-xs shadow-md shadow-blue-600/20 transition-transform"
                >
                  OK
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MAIN CONTENT WITH FADE-IN */}
      <main className="flex-1 p-4 animate-fadeIn">
        
        {/* CATALOG TAB */}
        {activeTab === 'catalog' && (
          <div>
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-5 text-white mb-5 shadow-lg shadow-blue-600/20 relative overflow-hidden group">
              <div className="absolute right-[-20px] bottom-[-20px] w-32 h-32 bg-white/10 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500"></div>
              <span className="bg-white/20 text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-md">
                USTA 3D ALPHA
              </span>
              <h2 className="text-xl font-black mt-2 leading-tight">{t.bannerTitle}</h2>
              <p className="text-xs text-blue-100 mt-1 max-w-[220px]">{t.bannerSub}</p>
              
              <button 
                onClick={() => setActiveTab('custom')}
                className="mt-4 bg-white active:scale-95 text-blue-600 text-xs font-bold px-4 py-2.5 rounded-xl shadow hover:bg-blue-50 transition-all flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-spin" /> {t.customOrderBtn}
              </button>
            </div>

            <div className="relative mb-4">
              <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder={t.searchPlaceholder} 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-2xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-blue-600 text-gray-900 shadow-sm transition-all"
              />
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-none">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all active:scale-95 ${
                  selectedCategory === 'all' 
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20 scale-105' 
                    : 'bg-white text-gray-600 border border-gray-100 hover:bg-gray-50'
                }`}
              >
                {t.allProducts}
              </button>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all active:scale-95 ${
                    selectedCategory === cat 
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20 scale-105' 
                      : 'bg-white text-gray-600 border border-gray-100 hover:bg-gray-50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3">
              {filteredProducts.map(product => {
                const title = typeof product.title === 'object' ? (product.title[lang] || product.title.ru) : product.title;
                const prodTags = typeof product.tags === 'object' ? (product.tags[lang] || product.tags.ru || []) : [];
                const mainImg = Array.isArray(product.images) && product.images.length > 0 ? product.images[0] : (product.image || 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=600&q=80');
                const isFav = favorites.includes(product.id);
                const isAnimating = animatingFavId === product.id;

                return (
                  <div 
                    key={product.id}
                    onClick={() => { setSelectedProduct(product); setActiveImageIdx(0); setActiveTab('product'); }}
                    className="bg-white rounded-2xl p-3 border border-gray-100 flex flex-col justify-between shadow-sm cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group relative"
                  >
                    <button 
                      onClick={(e) => toggleFavorite(product.id, e)}
                      className={`absolute top-2 right-2 z-10 p-2 rounded-xl backdrop-blur-sm transition-all active:scale-125 ${isAnimating ? 'animate-heartBeat' : ''} ${isFav ? 'bg-red-500 text-white shadow-md' : 'bg-white/80 text-gray-400 hover:text-red-500'}`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-current' : ''}`} />
                    </button>

                    {isAdminAuthenticated && (
                      <button 
                        onClick={(e) => { e.stopPropagation(); openAdminEdit(product); }}
                        className="absolute top-2 left-2 z-10 bg-black/60 hover:bg-black/90 text-white p-1.5 rounded-lg transition-all active:scale-90"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                    )}

                    <div>
                      <div className="w-full h-36 bg-gray-50 rounded-xl overflow-hidden mb-2.5 relative">
                        <img src={mainImg} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        <span className="absolute bottom-2 right-2 bg-blue-600/90 text-white text-[9px] font-bold px-2 py-0.5 rounded-md">
                          3D
                        </span>
                      </div>
                      <span className="text-[10px] text-blue-600 font-semibold block mb-0.5">{product.category}</span>
                      <h3 className="font-bold text-gray-900 text-sm line-clamp-2 leading-snug">{title}</h3>
                      
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {prodTags.slice(0, 2).map((tag, idx) => (
                          <span key={idx} className="bg-gray-100 text-gray-500 text-[9px] px-1.5 py-0.5 rounded">
                            ✓ {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <span className="font-black text-gray-900 text-sm">
                        {product.price.toLocaleString()} <span className="text-[10px] font-normal">{t.sum}</span>
                      </span>
                      <button 
                        onClick={(e) => { e.stopPropagation(); addToCart(product); }}
                        className="w-8 h-8 bg-blue-50 active:scale-90 hover:bg-blue-600 text-blue-600 hover:text-white rounded-xl flex items-center justify-center transition-all shadow-sm"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* FAVORITES TAB */}
        {activeTab === 'favorites' && (
          <div className="animate-fadeIn">
            <h2 className="text-xl font-black mb-4 flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-500 fill-current animate-pulse" /> {t.favoritesTitle}
            </h2>
            {favorites.length === 0 ? (
              <div className="bg-white rounded-3xl p-8 text-center border border-gray-100 shadow-sm mt-10 animate-scaleUp">
                <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 fill-current animate-bounce" />
                </div>
                <h3 className="font-bold text-lg">{t.emptyFavorites}</h3>
                <p className="text-xs text-gray-400 mt-1 mb-6">{t.emptyFavoritesSub}</p>
                <button 
                  onClick={() => setActiveTab('catalog')}
                  className="bg-blue-600 active:scale-95 text-white font-bold px-6 py-3 rounded-2xl text-sm shadow-md shadow-blue-600/20 transition-transform"
                >
                  {t.openCatalog}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {products.filter(p => favorites.includes(p.id)).map(product => {
                  const title = typeof product.title === 'object' ? (product.title[lang] || product.title.ru) : product.title;
                  const mainImg = Array.isArray(product.images) && product.images.length > 0 ? product.images[0] : (product.image || '');
                  return (
                    <div 
                      key={product.id}
                      onClick={() => { setSelectedProduct(product); setActiveImageIdx(0); setActiveTab('product'); }}
                      className="bg-white rounded-2xl p-3 border border-gray-100 flex flex-col justify-between shadow-sm hover:shadow-md transition-all cursor-pointer relative group"
                    >
                      <button 
                        onClick={(e) => toggleFavorite(product.id, e)}
                        className="absolute top-2 right-2 z-10 p-2 rounded-xl bg-red-500 text-white shadow-md active:scale-125 transition-transform"
                      >
                        <Heart className="w-3.5 h-3.5 fill-current" />
                      </button>
                      <div>
                        <div className="w-full h-36 bg-gray-50 rounded-xl overflow-hidden mb-2.5">
                          <img src={mainImg} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        </div>
                        <span className="text-[10px] text-blue-600 font-semibold block mb-0.5">{product.category}</span>
                        <h3 className="font-bold text-gray-900 text-sm line-clamp-2">{title}</h3>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="font-black text-gray-900 text-sm">{product.price.toLocaleString()} {t.sum}</span>
                        <button 
                          onClick={(e) => { e.stopPropagation(); addToCart(product); }}
                          className="w-8 h-8 bg-blue-50 active:scale-90 text-blue-600 rounded-xl flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* SINGLE PRODUCT TAB */}
        {activeTab === 'product' && selectedProduct && (() => {
          const imgs = Array.isArray(selectedProduct.images) && selectedProduct.images.length > 0 
            ? selectedProduct.images 
            : [selectedProduct.image || 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=600&q=80'];
          const isFav = favorites.includes(selectedProduct.id);
          
          return (
            <div className="animate-fadeIn">
              <button 
                onClick={() => setActiveTab('catalog')}
                className="flex items-center gap-1.5 text-sm font-semibold text-gray-600 mb-4 hover:text-blue-600 active:scale-95 transition-all"
              >
                <ArrowLeft className="w-4 h-4" /> {t.backToCatalog}
              </button>

              <div className="bg-white rounded-3xl p-4 border border-gray-100 shadow-sm relative animate-scaleUp">
                <button 
                  onClick={(e) => toggleFavorite(selectedProduct.id, e)}
                  className={`absolute top-6 right-6 z-10 p-2.5 rounded-xl shadow-md active:scale-125 transition-all ${isFav ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-600 hover:text-red-500'}`}
                >
                  <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
                </button>

                <div className="w-full h-72 bg-gray-50 rounded-2xl overflow-hidden mb-3 relative group">
                  <img src={imgs[activeImageIdx]} alt="product" className="w-full h-full object-cover transition-all duration-300" />
                  
                  {isAdminAuthenticated && (
                    <button 
                      onClick={() => openAdminEdit(selectedProduct)}
                      className="absolute top-3 left-3 bg-black/70 text-white p-2 rounded-xl flex items-center gap-1 text-xs font-semibold active:scale-95"
                    >
                      <Edit className="w-3.5 h-3.5" /> Редактировать
                    </button>
                  )}

                  {imgs.length > 1 && (
                    <>
                      <button 
                        onClick={() => setActiveImageIdx(prev => (prev === 0 ? imgs.length - 1 : prev - 1))}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 active:scale-90 text-white p-2 rounded-full backdrop-blur-sm transition-transform"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => setActiveImageIdx(prev => (prev === imgs.length - 1 ? 0 : prev + 1))}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 active:scale-90 text-white p-2 rounded-full backdrop-blur-sm transition-transform"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/60 px-3 py-1 rounded-full text-white text-xs font-semibold backdrop-blur-sm">
                        {activeImageIdx + 1} / {imgs.length}
                      </div>
                    </>
                  )}
                </div>

                {imgs.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto pb-2 mb-3 scrollbar-none">
                    {imgs.map((imgUrl, idx) => (
                      <button 
                        key={idx}
                        onClick={() => setActiveImageIdx(idx)}
                        className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all active:scale-95 flex-shrink-0 ${activeImageIdx === idx ? 'border-blue-600 scale-105' : 'border-transparent opacity-60'}`}
                      >
                        <img src={imgUrl} alt="thumb" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}

                <span className="bg-blue-50 text-blue-600 text-xs font-semibold px-2.5 py-1 rounded-lg">
                  {selectedProduct.category}
                </span>

                <h2 className="text-xl font-bold text-gray-900 mt-2">
                  {typeof selectedProduct.title === 'object' ? (selectedProduct.title[lang] || selectedProduct.title.ru) : selectedProduct.title}
                </h2>
                
                <div className="flex flex-wrap gap-1.5 my-3">
                  {((typeof selectedProduct.tags === 'object' && selectedProduct.tags[lang]) || ['3D печать']).map((tag, idx) => (
                    <span key={idx} className="bg-gray-100 text-gray-600 text-[10px] font-medium px-2.5 py-1 rounded-md">
                      ✓ {tag}
                    </span>
                  ))}
                </div>

                <p className="text-sm text-gray-600 leading-relaxed mb-6">
                  {typeof selectedProduct.description === 'object' ? (selectedProduct.description[lang] || selectedProduct.description.ru) : selectedProduct.description}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div>
                    <span className="text-xs text-gray-400 block">Стоимость</span>
                    <span className="text-2xl font-black text-gray-900">{selectedProduct.price.toLocaleString()} {t.sum}</span>
                  </div>
                  <button 
                    onClick={() => { addToCart(selectedProduct); setActiveTab('cart'); }}
                    className="bg-blue-600 active:scale-95 hover:bg-blue-700 text-white font-bold px-6 py-3.5 rounded-2xl shadow-lg shadow-blue-600/20 text-sm transition-all flex items-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" /> {t.buyNow}
                  </button>
                </div>
              </div>
            </div>
          );
        })()}

        {/* CART TAB */}
        {activeTab === 'cart' && (
          <div className="animate-fadeIn">
            <h2 className="text-xl font-black mb-4">{t.cartTitle}</h2>

            {cart.length === 0 ? (
              <div className="bg-white rounded-3xl p-8 text-center border border-gray-100 shadow-sm mt-10 animate-scaleUp">
                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-lg">{t.emptyCart}</h3>
                <p className="text-xs text-gray-400 mt-1 mb-6">{t.emptyCartSub}</p>
                <button 
                  onClick={() => setActiveTab('catalog')}
                  className="bg-blue-600 active:scale-95 text-white font-bold px-6 py-3 rounded-2xl text-sm shadow-md shadow-blue-600/20 transition-transform"
                >
                  {t.openCatalog}
                </button>
              </div>
            ) : (
              <div>
                <div className="space-y-3 mb-6">
                  {cart.map(item => {
                    const title = typeof item.title === 'object' ? (item.title[lang] || item.title.ru) : item.title;
                    const itemImg = Array.isArray(item.images) ? item.images[0] : (item.image || '');
                    return (
                      <div key={item.id} className="bg-white rounded-2xl p-3 border border-gray-100 flex items-center gap-3 shadow-sm hover:shadow-md transition-all">
                        <img src={itemImg} alt={title} className="w-16 h-16 rounded-xl object-cover bg-gray-50" />
                        <div className="flex-1">
                          <h4 className="font-bold text-sm line-clamp-1">{title}</h4>
                          <span className="text-xs font-bold text-blue-600">{item.price.toLocaleString()} {t.sum}</span>
                        </div>
                        <div className="flex items-center gap-2 bg-gray-50 p-1 rounded-xl">
                          <button onClick={() => updateQty(item.id, -1)} className="w-7 h-7 bg-white active:scale-90 text-gray-800 rounded-lg flex items-center justify-center shadow-xs transition-transform">
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-xs font-bold w-4 text-center">{item.qty}</span>
                          <button onClick={() => updateQty(item.id, 1)} className="w-7 h-7 bg-white active:scale-90 text-gray-800 rounded-lg flex items-center justify-center shadow-xs transition-transform">
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm animate-scaleUp">
                  <h3 className="font-bold text-base mb-4">{t.checkoutTitle}</h3>
                  {orderSuccess ? (
                    <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-2xl text-center animate-fadeIn">
                      <CheckCircle className="w-8 h-8 mx-auto text-emerald-600 mb-2 animate-bounce" />
                      <h4 className="font-bold text-sm">{t.orderSuccess}</h4>
                      <p className="text-xs mt-1">{t.orderSuccessSub}</p>
                    </div>
                  ) : (
                    <form onSubmit={handleCheckout} className="space-y-3.5">
                      <div>
                        <label className="text-xs font-semibold text-gray-500 block mb-1">{t.recipientName}</label>
                        <input 
                          type="text" 
                          required 
                          placeholder={t.namePlaceholder}
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-blue-600 transition-all"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-gray-500 block mb-1">{t.phone}</label>
                        <input 
                          type="text" 
                          required 
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-blue-600 transition-all"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-gray-500 block mb-1.5">{t.deliveryType}</label>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() => setDeliveryMode('yandex')}
                            className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center justify-center gap-1 active:scale-95 transition-all ${
                              deliveryMode === 'yandex'
                                ? 'border-blue-600 bg-blue-50/50 text-blue-600'
                                : 'border-gray-200 text-gray-600'
                            }`}
                          >
                            <MapPin className="w-4 h-4" />
                            Яндекс Доставка
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeliveryMode('bts')}
                            className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center justify-center gap-1 active:scale-95 transition-all ${
                              deliveryMode === 'bts'
                                ? 'border-blue-600 bg-blue-50/50 text-blue-600'
                                : 'border-gray-200 text-gray-600'
                            }`}
                          >
                            <ShoppingBag className="w-4 h-4" />
                            BTS Почта
                          </button>
                        </div>
                      </div>

                      {deliveryMode === 'yandex' ? (
                        <div>
                          <label className="text-xs font-semibold text-gray-500 block mb-1">{t.deliveryAddress}</label>
                          <input 
                            type="text" 
                            required 
                            placeholder={t.addressPlaceholder}
                            value={deliveryAddress}
                            onChange={(e) => setDeliveryAddress(e.target.value)}
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-blue-600 transition-all"
                          />
                        </div>
                      ) : (
                        <div className="bg-blue-50/50 border border-blue-100 p-3.5 rounded-2xl space-y-2.5">
                          <div>
                            <label className="text-[10px] font-semibold text-gray-500 block mb-1">{t.selectRegion}</label>
                            <select 
                              value={selectedRegion}
                              onChange={(e) => {
                                const reg = e.target.value;
                                setSelectedRegion(reg);
                                const found = BTS_REGIONS_AND_BRANCHES.find(r => r.region === reg);
                                if (found) setSelectedBtsBranch(found.branches[0]);
                              }}
                              className="w-full bg-white border border-blue-200 rounded-xl px-3 py-2 text-xs font-medium text-gray-800 focus:outline-none"
                            >
                              {BTS_REGIONS_AND_BRANCHES.map(item => (
                                <option key={item.region} value={item.region}>{item.region}</option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="text-[10px] font-semibold text-gray-500 block mb-1">{t.selectBranch}</label>
                            <select 
                              value={selectedBtsBranch}
                              onChange={(e) => setSelectedBtsBranch(e.target.value)}
                              className="w-full bg-white border border-blue-200 rounded-xl px-3 py-2 text-xs font-medium text-gray-800 focus:outline-none"
                            >
                              {BTS_REGIONS_AND_BRANCHES.find(r => r.region === selectedRegion)?.branches.map(branch => (
                                <option key={branch} value={branch}>{branch}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      )}

                      <div>
                        <label className="text-xs font-semibold text-gray-500 block mb-1.5">{t.paymentMethod}</label>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() => setPaymentMethod('click')}
                            className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center justify-center gap-1 active:scale-95 transition-all ${
                              paymentMethod === 'click' 
                                ? 'border-blue-600 bg-blue-50/50 text-blue-600' 
                                : 'border-gray-200 text-gray-600'
                            }`}
                          >
                            <CreditCard className="w-4 h-4" />
                            Click / Payme
                          </button>

                          <button
                            type="button"
                            onClick={() => setPaymentMethod('uzum')}
                            className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center justify-center gap-1 active:scale-95 transition-all ${
                              paymentMethod === 'uzum' 
                                ? 'border-purple-600 bg-purple-50/50 text-purple-600' 
                                : 'border-gray-200 text-gray-600'
                            }`}
                          >
                            <CreditCard className="w-4 h-4" />
                            Uzum Pay
                          </button>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-gray-100 flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-500">{t.totalPrice}</span>
                        <span className="text-xl font-black text-gray-900">{totalPrice.toLocaleString()} {t.sum}</span>
                      </div>

                      <button 
                        type="submit"
                        className="w-full bg-blue-600 active:scale-95 hover:bg-blue-700 text-white font-bold py-3.5 rounded-2xl shadow-lg shadow-blue-600/20 text-sm transition-all"
                      >
                        {t.confirmOrder}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* CUSTOM ORDER TAB */}
        {activeTab === 'custom' && (
          <div className="animate-fadeIn">
            <h2 className="text-xl font-black mb-1">{t.customTitle}</h2>
            <p className="text-xs text-gray-400 mb-4">{t.customSub}</p>

            <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm animate-scaleUp">
              {customSubmitted ? (
                <div className="bg-blue-50 border border-blue-200 text-blue-800 p-6 rounded-2xl text-center animate-fadeIn">
                  <CheckCircle className="w-10 h-10 mx-auto text-blue-600 mb-2 animate-bounce" />
                  <h3 className="font-bold text-base">{t.requestSent}</h3>
                  <p className="text-xs mt-1">{t.requestSentSub}</p>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setCustomSubmitted(true); }} className="space-y-4">
                  <label className="border-2 border-dashed border-gray-200 rounded-2xl p-6 text-center hover:border-blue-600 transition-colors cursor-pointer bg-gray-50/50 block group">
                    <Camera className="w-8 h-8 text-blue-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-bold text-gray-700 block">{t.uploadPhoto}</span>
                    <span className="text-[10px] text-gray-400">{t.uploadSub}</span>
                    <input type="file" accept="image/*,.stl" className="hidden" />
                  </label>

                  <div>
                    <label className="text-xs font-semibold text-gray-500 block mb-1">{t.taskDesc}</label>
                    <textarea 
                      rows="4"
                      required
                      placeholder={t.taskPlaceholder}
                      value={customDesc}
                      onChange={(e) => setCustomDesc(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-blue-600 transition-all"
                    ></textarea>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-blue-600 active:scale-95 hover:bg-blue-700 text-white font-bold py-3.5 rounded-2xl shadow-lg shadow-blue-600/20 text-sm transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" /> {t.sendRequest}
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

        {/* ORDERS TAB */}
        {activeTab === 'orders' && (
          <div className="animate-fadeIn">
            <h2 className="text-xl font-black mb-4">{t.ordersTitle}</h2>
            {orders.length === 0 ? (
              <div className="bg-white rounded-3xl p-8 text-center border border-gray-100 shadow-sm mt-10 animate-scaleUp">
                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-lg">{t.noOrders}</h3>
                <p className="text-xs text-gray-400 mt-1 mb-6">{t.noOrdersSub}</p>
                <button 
                  onClick={() => setActiveTab('catalog')}
                  className="bg-blue-600 active:scale-95 text-white font-bold px-6 py-3 rounded-2xl text-sm shadow-md shadow-blue-600/20 transition-transform"
                >
                  {t.openCatalog}
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {orders.map(order => (
                  <div key={order.id} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all">
                    <div className="flex items-center justify-between mb-2 pb-2 border-b border-gray-100">
                      <span className="font-bold text-sm">Заказ #{order.id}</span>
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border transition-all ${
                        order.status === 'Принят в работу' || order.status === 'Qabul qilindi'
                          ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
                          : 'bg-amber-50 text-amber-600 border-amber-200'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 mb-2">
                      {order.deliveryMode === 'yandex' ? `🚕 Яндекс: ${order.deliveryAddress}` : `📦 BTS (${order.btsRegion}): ${order.btsBranch}`} | 💳 {order.paymentMethod.toUpperCase()}
                    </div>
                    <div className="space-y-1 mb-3">
                      {order.items.map((item, idx) => {
                        const title = typeof item.title === 'object' ? (item.title[lang] || item.title.ru) : item.title;
                        return (
                          <div key={idx} className="flex justify-between text-xs text-gray-600">
                            <span>{title} x{item.qty}</span>
                            <span className="font-semibold">{(item.price * item.qty).toLocaleString()} {t.sum}</span>
                          </div>
                        );
                      })}
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-xs">
                      <span className="text-gray-400">{order.date}</span>
                      <span className="font-black text-gray-900">Итого: {order.total.toLocaleString()} {t.sum}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ADMIN TAB */}
        {activeTab === 'admin' && isAdminAuthenticated && (
          <div className="animate-fadeIn">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-black">{t.adminTitle}</h2>
              <button onClick={() => setActiveTab('catalog')} className="text-gray-400 hover:text-gray-600 p-1 active:scale-90 transition-transform">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex gap-2 mb-4">
              <button 
                onClick={() => setAdminSubTab('products')}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all active:scale-95 ${adminSubTab === 'products' ? 'bg-blue-600 text-white shadow-md' : 'bg-white border border-gray-200 text-gray-600'}`}
              >
                Товары и Категории
              </button>
              <button 
                onClick={() => setAdminSubTab('settings')}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all active:scale-95 ${adminSubTab === 'settings' ? 'bg-blue-600 text-white shadow-md' : 'bg-white border border-gray-200 text-gray-600'}`}
              >
                {t.settingsTab}
              </button>
            </div>

            {adminSubTab === 'products' ? (
              <div className="space-y-4">
                <div className="bg-white rounded-3xl p-4 border border-gray-100 shadow-sm">
                  <h3 className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">{t.categoriesManage}</h3>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {categories.map(cat => (
                      <div key={cat} className="bg-blue-50 border border-blue-200 text-blue-700 px-2.5 py-1 rounded-xl text-xs flex items-center gap-1.5 font-medium">
                        <span>{cat}</span>
                        {categories.length > 1 && (
                          <button type="button" onClick={() => handleDeleteCategory(cat)} className="hover:text-red-500 active:scale-90 transition-transform">
                            <X className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input 
                      type="text"
                      placeholder={t.newCategoryName}
                      value={newCatInput}
                      onChange={(e) => setNewCatInput(e.target.value)}
                      className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-900 focus:outline-none"
                    />
                    <button 
                      type="button"
                      onClick={handleAddCategory}
                      className="bg-blue-600 active:scale-95 text-white font-bold px-3.5 py-2 rounded-xl text-xs flex items-center gap-1 shadow-sm transition-transform"
                    >
                      <Plus className="w-3.5 h-3.5" /> {t.addCategoryBtn}
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-3xl p-4 border border-gray-100 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-xs text-gray-500 uppercase tracking-wider">{t.reorderCards}</h3>
                    <button 
                      onClick={openAdminAdd}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-3 py-1.5 rounded-xl text-xs shadow-sm flex items-center gap-1 active:scale-95 transition-all"
                    >
                      <Plus className="w-3.5 h-3.5" /> Добавить
                    </button>
                  </div>

                  <div className="space-y-2">
                    {products.map((prod, idx) => {
                      const title = typeof prod.title === 'object' ? (prod.title[lang] || prod.title.ru) : prod.title;
                      const mainImg = Array.isArray(prod.images) && prod.images.length > 0 ? prod.images[0] : (prod.image || '');

                      return (
                        <div 
                          key={prod.id}
                          draggable
                          onDragStart={() => setDraggedProductIdx(idx)}
                          onDragOver={(e) => e.preventDefault()}
                          onDrop={() => {
                            if (draggedProductIdx !== null && draggedProductIdx !== idx) {
                              moveProduct(draggedProductIdx, idx);
                              setDraggedProductIdx(null);
                            }
                          }}
                          className={`flex items-center gap-2 p-2.5 rounded-2xl border transition-all cursor-grab active:cursor-grabbing ${draggedProductIdx === idx ? 'opacity-40 border-dashed border-blue-500' : 'bg-gray-50 border-gray-100 hover:border-blue-300'}`}
                        >
                          <GripVertical className="w-4 h-4 text-gray-400 flex-shrink-0" />
                          <img src={mainImg} alt="thumb" className="w-10 h-10 rounded-xl object-cover bg-white" />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-xs truncate">{title}</h4>
                            <span className="text-[10px] text-blue-600 font-semibold">{prod.price.toLocaleString()} {t.sum}</span>
                          </div>

                          <div className="flex items-center gap-1">
                            <button 
                              type="button" 
                              onClick={() => moveProduct(idx, idx - 1)}
                              disabled={idx === 0}
                              className="p-1 rounded-lg bg-white border border-gray-200 disabled:opacity-30 text-gray-600 active:scale-90 transition-transform"
                            >
                              <ArrowUp className="w-3 h-3" />
                            </button>
                            <button 
                              type="button" 
                              onClick={() => moveProduct(idx, idx + 1)}
                              disabled={idx === products.length - 1}
                              className="p-1 rounded-lg bg-white border border-gray-200 disabled:opacity-30 text-gray-600 active:scale-90 transition-transform"
                            >
                              <ArrowDown className="w-3 h-3" />
                            </button>
                            <button 
                              type="button" 
                              onClick={() => openAdminEdit(prod)}
                              className="p-1.5 bg-blue-50 text-blue-600 rounded-lg active:scale-90 transition-transform"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <form onSubmit={handleSaveProduct} className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm space-y-3 animate-scaleUp">
                  <h3 className="font-bold text-base mb-2">
                    {editingProduct ? t.editProduct : t.addNewProduct}
                  </h3>

                  <div>
                    <label className="text-xs font-semibold text-gray-500 block mb-1">{t.titleRu}</label>
                    <input 
                      type="text" 
                      required 
                      value={adminForm.titleRu}
                      onChange={(e) => setAdminForm({...adminForm, titleRu: e.target.value})}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-900 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-gray-500 block mb-1">{t.titleUz}</label>
                    <input 
                      type="text" 
                      required 
                      value={adminForm.titleUz}
                      onChange={(e) => setAdminForm({...adminForm, titleUz: e.target.value})}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-900 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-gray-500 block mb-1">{t.category}</label>
                      <select 
                        value={adminForm.category}
                        onChange={(e) => setAdminForm({...adminForm, category: e.target.value})}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-900 focus:outline-none"
                      >
                        {categories.map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-500 block mb-1">{t.price}</label>
                      <input 
                        type="number" 
                        required 
                        value={adminForm.price}
                        onChange={(e) => setAdminForm({...adminForm, price: e.target.value})}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-900 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-gray-500 block mb-1">{t.reorderGallery}</label>
                    
                    <div className="space-y-2 mb-3">
                      {adminForm.imagesList.map((imgUrl, imgIdx) => (
                        <div 
                          key={imgIdx}
                          draggable
                          onDragStart={() => setDraggedImgIdx(imgIdx)}
                          onDragOver={(e) => e.preventDefault()}
                          onDrop={() => {
                            if (draggedImgIdx !== null && draggedImgIdx !== imgIdx) {
                              moveImage(draggedImgIdx, imgIdx);
                              setDraggedImgIdx(null);
                            }
                          }}
                          className={`flex items-center gap-2 p-2 rounded-xl border bg-gray-50 border-gray-200 cursor-grab active:cursor-grabbing ${draggedImgIdx === imgIdx ? 'opacity-40 border-dashed border-blue-500' : ''}`}
                        >
                          <GripVertical className="w-4 h-4 text-gray-400 flex-shrink-0" />
                          <img src={imgUrl} alt="thumb" className="w-12 h-12 rounded-lg object-cover bg-white" />
                          <input 
                            type="text" 
                            value={imgUrl} 
                            onChange={(e) => {
                              const updated = [...adminForm.imagesList];
                              updated[imgIdx] = e.target.value;
                              setAdminForm({...adminForm, imagesList: updated});
                            }}
                            className="flex-1 bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs text-gray-900 focus:outline-none"
                          />
                          <div className="flex items-center gap-1">
                            <button 
                              type="button" 
                              onClick={() => moveImage(imgIdx, imgIdx - 1)}
                              disabled={imgIdx === 0}
                              className="p-1 rounded bg-white border disabled:opacity-30 text-gray-600"
                            >
                              <ArrowUp className="w-3 h-3" />
                            </button>
                            <button 
                              type="button" 
                              onClick={() => moveImage(imgIdx, imgIdx + 1)}
                              disabled={imgIdx === adminForm.imagesList.length - 1}
                              className="p-1 rounded bg-white border disabled:opacity-30 text-gray-600"
                            >
                              <ArrowDown className="w-3 h-3" />
                            </button>
                            <button 
                              type="button" 
                              onClick={() => {
                                const updated = adminForm.imagesList.filter((_, i) => i !== imgIdx);
                                setAdminForm({...adminForm, imagesList: updated});
                              }}
                              className="p-1 text-red-500 hover:bg-red-50 rounded"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <button 
                        type="button"
                        onClick={() => setAdminForm(prev => ({...prev, imagesList: [...prev.imagesList, '']}))}
                        className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 rounded-xl text-xs font-semibold active:scale-95 transition-transform"
                      >
                        + Добавить ссылку
                      </button>
                      <label className="flex-1 bg-blue-50 border border-blue-200 hover:bg-blue-100 text-blue-600 py-2 px-3 rounded-xl cursor-pointer text-xs font-bold text-center flex items-center justify-center gap-1 active:scale-95 transition-transform">
                        <Upload className="w-3.5 h-3.5" /> Загрузить файл
                        <input type="file" accept="image/*" multiple onChange={handleImageFileChange} className="hidden" />
                      </label>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-gray-500 block mb-1">{t.tagsRu}</label>
                      <input 
                        type="text" 
                        value={adminForm.tagsRu}
                        onChange={(e) => setAdminForm({...adminForm, tagsRu: e.target.value})}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-900 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-500 block mb-1">{t.tagsUz}</label>
                      <input 
                        type="text" 
                        value={adminForm.tagsUz}
                        onChange={(e) => setAdminForm({...adminForm, tagsUz: e.target.value})}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-900 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-gray-500 block mb-1">{t.descRu}</label>
                    <textarea 
                      rows="2"
                      value={adminForm.descRu}
                      onChange={(e) => setAdminForm({...adminForm, descRu: e.target.value})}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 text-sm text-gray-900 focus:outline-none"
                    ></textarea>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-gray-500 block mb-1">{t.descUz}</label>
                    <textarea 
                      rows="2"
                      value={adminForm.descUz}
                      onChange={(e) => setAdminForm({...adminForm, descUz: e.target.value})}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 text-sm text-gray-900 focus:outline-none"
                    ></textarea>
                  </div>

                  <div className="pt-2 flex gap-2">
                    <button 
                      type="submit"
                      className="flex-1 bg-blue-600 active:scale-95 hover:bg-blue-700 text-white font-bold py-3 rounded-xl text-sm transition-all flex items-center justify-center gap-1.5 shadow-md shadow-blue-600/20"
                    >
                      <Save className="w-4 h-4" /> {t.save}
                    </button>

                    {editingProduct && (
                      <button 
                        type="button"
                        onClick={() => handleDeleteProduct(editingProduct.id)}
                        className="bg-red-50 text-red-600 hover:bg-red-100 active:scale-90 p-3 rounded-xl text-sm transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </form>
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm space-y-4 animate-scaleUp">
                <h3 className="font-bold text-base flex items-center gap-2">
                  <Bell className="w-4 h-4 text-blue-600 animate-pulse" /> Уведомления в Telegram
                </h3>
                <p className="text-xs text-gray-400">
                  Укажите токен бота и ваш Telegram Chat ID, чтобы заказы прилетали моментально в чат.
                </p>

                <div>
                  <label className="text-xs font-semibold text-gray-500 block mb-1">{t.botTokenLabel}</label>
                  <input 
                    type="text"
                    placeholder="123456789:ABCdefGhIJKlmNoPQRsTUVwxyZ"
                    value={botToken}
                    onChange={(e) => setBotToken(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs font-mono text-gray-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-500 block mb-1">{t.chatIdLabel}</label>
                  <input 
                    type="text"
                    placeholder="987654321"
                    value={adminChatId}
                    onChange={(e) => setAdminChatId(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs font-mono text-gray-900 focus:outline-none"
                  />
                </div>

                <hr className="border-gray-100" />

                <h3 className="font-bold text-base flex items-center gap-2">
                  <Key className="w-4 h-4 text-blue-600" /> Изменить пароль админа (PIN)
                </h3>
                <div>
                  <label className="text-xs font-semibold text-gray-500 block mb-1">{t.newPinLabel}</label>
                  <input 
                    type="password"
                    maxLength="6"
                    placeholder="Новый PIN"
                    value={newPinInput}
                    onChange={(e) => setNewPinInput(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-900 focus:outline-none"
                  />
                </div>

                <button 
                  type="button"
                  onClick={() => {
                    if (newPinInput.trim().length >= 4) {
                      setAdminPin(newPinInput.trim());
                      setNewPinInput('');
                    }
                    setSettingsSavedMsg(true);
                    setTimeout(() => setSettingsSavedMsg(false), 2000);
                  }}
                  className="w-full bg-blue-600 active:scale-95 hover:bg-blue-700 text-white font-bold py-3 rounded-xl text-sm shadow-md shadow-blue-600/20 transition-all"
                >
                  {t.saveSettings}
                </button>

                {settingsSavedMsg && (
                  <p className="text-xs text-emerald-600 text-center font-bold animate-bounce">{t.settingsSaved}</p>
                )}
              </div>
            )}
          </div>
        )}

      </main>

      {/* BOTTOM NAV BAR WITH MICRO-INTERACTIONS */}
      <nav className="bg-white/95 backdrop-blur-md border-t border-gray-100 fixed bottom-0 left-0 right-0 max-w-md mx-auto px-4 py-2.5 flex items-center justify-between z-30">
        <button 
          onClick={() => setActiveTab('catalog')}
          className={`flex flex-col items-center gap-1 transition-all active:scale-90 ${activeTab === 'catalog' ? 'text-blue-600 scale-105' : 'text-gray-400 hover:text-gray-600'}`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-bold">{t.navCatalog}</span>
        </button>

        <button 
          onClick={() => setActiveTab('favorites')}
          className={`flex flex-col items-center gap-1 relative transition-all active:scale-90 ${activeTab === 'favorites' ? 'text-blue-600 scale-105' : 'text-gray-400 hover:text-gray-600'}`}
        >
          <Heart className="w-5 h-5" />
          {favorites.length > 0 && (
            <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-scaleUp">
              {favorites.length}
            </span>
          )}
          <span className="text-[10px] font-bold">{t.navFavorites}</span>
        </button>

        <button 
          onClick={() => setActiveTab('cart')}
          className={`flex flex-col items-center gap-1 relative transition-all active:scale-90 ${activeTab === 'cart' ? 'text-blue-600 scale-105' : 'text-gray-400 hover:text-gray-600'}`}
        >
          <ShoppingBag className="w-5 h-5" />
          {cart.length > 0 && (
            <span className="absolute -top-1 -right-2 bg-blue-600 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-scaleUp">
              {cart.reduce((s, i) => s + i.qty, 0)}
            </span>
          )}
          <span className="text-[10px] font-bold">{t.navCart}</span>
        </button>

        <button 
          onClick={() => setActiveTab('orders')}
          className={`flex flex-col items-center gap-1 transition-all active:scale-90 ${activeTab === 'orders' ? 'text-blue-600 scale-105' : 'text-gray-400 hover:text-gray-600'}`}
        >
          <FileText className="w-5 h-5" />
          <span className="text-[10px] font-bold">{t.navOrders}</span>
        </button>
      </nav>
    </div>
  );
}
