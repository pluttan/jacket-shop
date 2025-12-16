import { useState } from 'react';
import './App.css';

// Данные товаров (те же самые)
const products = [
  {
    id: 1,
    title: "Кожаная косуха Cyber",
    price: "12 990 ₽",
    image: "https://avatars.mds.yandex.net/i?id=d81df769e17f9ae393cb01c83dd4509c_l-12772801-images-thumbs&n=13",
    description: "Классическая косуха из натуральной кожи с усиленной фурнитурой. Идеально подходит для осенней погоды. Подкладка из дышащего материала."
  },
  {
    id: 2,
    title: "Бомбер Urban Style",
    price: "8 500 ₽",
    image: "https://avatars.mds.yandex.net/i?id=7290037fcd2b658dff4f98baefde0bd95f15e6e8-4407838-images-thumbs&n=13",
    description: "Легкий и стильный бомбер для городских прогулок. Водоотталкивающая ткань, внутренний карман для документов."
  },
  {
    id: 3,
    title: "Зимняя парка Everest",
    price: "24 000 ₽",
    image: "https://basket-09.wbbasket.ru/vol1208/part120888/120888282/images/big/1.webp",
    description: "Утепленная парка, выдерживающая морозы до -30 градусов. Натуральный мех на капюшоне, множество карманов и ветрозащитная планка."
  },
  {
    id: 4,
    title: "Джинсовка Retro",
    price: "6 200 ₽",
    image: "https://avatars.mds.yandex.net/i?id=f4394d334b854c56fcc60df28148758e_sr-5876729-images-thumbs&n=13",
    description: "Винтажная джинсовая куртка с потертостями. Плотный деним 14oz. Классический крой, который никогда не выйдет из моды."
  },
  {
    id: 5,
    title: "Ветровка Active Run",
    price: "4 990 ₽",
    image: "https://main-cdn.sbermegamarket.ru/big2/hlr-system/95/-48/34/-13/23/-85/100062457173b2.jpg",
    description: "Ультралегкая ветровка для бега и активного отдыха. Складывается в собственный карман."
  },
  {
    id: 6,
    title: "Стеганый жилет Base",
    price: "5 500 ₽",
    image: "https://yandex-images.clstorage.net/E9G8K3R48/d896b0cRExF/JGrYEewoEVYL2t1fRQmNJvRSEacLH2-RsvuKv_1ZYqHtU5v4Hsw6m7bTTbGWXwqAsZGLMqACJy27rU5UWkPYwTBuiwM8roYDGh1IXUXIzaGjAtXgHZ541yJsia-_TzV1bEpBsAMS9FF72IVuyc8eVqaGmSBwUmgiv7TRS4ZbBoqppxXcqfmblUrJlltOREUgJlPZ6pVY8VJ3asmqrYkiqLDEiPuG2P-Y8VCJp4CJkJmqChfzfdYmJSx4Gg9OGQiI6iYS3OVwWFvKSJ2WB00F4umUVSATV3wdfaQAruDHb2l7RQe8hxD2UH7WgKIDzBgbLgxWt3Re7KRku9mJBlxIwuCu010rPR5cyQuYkkwDQGAh0Fhp1Z6zHjMsDmUkjycntg4Dvk4Rv5l62EUnj8jXliRL3j85kWWvYfnZCoxejgTiJB1YIfXZ1QICXllFBMXiJJOTLtyeudg95oyhIUquLf3DwPGF2_pb_NMMKAaMG1zszx3x_ZoiKak20wBLl0hLqGNbW2E4WpzNARqZTQNA6KPQHaJRFPKTPmkDYSMP6qmxRUL7xtD-mTQQjWeHxVCX68YUPvKaZOysPRWCyZ1OCq6jlBPjvtdWBInX0osOhqtpWBop0hB62H8iSyosjGhjPYgEPcsWudnxW07pRgIW12aEGzbym-tkKT5bjcXSCM2tq5UY7X8Yl46LWdeEzQQs49udp5UZNFHyrozjIU3pIHyBhX0JGLaTPNoBpQdIm1grQ9d_PZZur2K6UcyDkczI6eIZECHwUlvBipaWCAIAom2aXWDWnzje-iZGZ2UJ4uv4BI91AZA2k7ITRe7BCB6ep0GZNf6aKmjlfdqBDx8BiqHtnRYicFRWSUyVnEXEReFqUp2vEh-y2PZqSiPviujqfgmPNAmZ-Ja-HEHsSQyXUCWHVTJxG6UgqfHWCYNbzcghJdzQLnlb1YdCkFtFzgyoY1qZY9mYPRo4Jc8qac",
    description: "Универсальный жилет на синтепоне. Отлично сочетается с худи или свитером. Высокий воротник защищает горло от ветра."
  },
  {
    id: 7,
    title: "Пальто Classic Wool",
    price: "18 900 ₽",
    image: "https://avatars.mds.yandex.net/i?id=31dfd743a72a5ef6d185a7164b02843b5f39eaef-5667956-images-thumbs&n=13",
    description: "Строгое пальто из смесовой шерсти. Прямой силуэт, английский воротник. Идеальный выбор для делового гардероба."
  },
  {
    id: 8,
    title: "Анорак Forest Hiker",
    price: "7 800 ₽",
    image: "https://yandex-images.clstorage.net/E9G8K3R48/d896b0cRExF/JGrYEewoEVYL2t1fRQmNJvRSEacLH2-RsvuLvmiZI3Q4xA94ns_uTKESWvAXn18BMxOf5nRDpy37uRkUT8IZATD6iwN97cfDWpyIXUXIzaGjAtXgHZ541yJsia-_TzV1bEpBsAMS9FF72IVuyc8eVqaGmSBwUmgiv7TRS4ZbBoqppxXcqfmblUrJlltOREUgJlPZ6pVY8VJ3asmqrYkiqLDEiPuG2P-Y8VCJp4CJkJmqChfzfdYmJSx4Gg9OGQiI6iYS3OVwWFvKSJ2WB00F4umUVSATV3wdfaQAruDHb2l7RQe8hxD2UH7WgKIDzBgbLgxWt3Re7KRku9mJBlxIwuCu010rPR5cyQuYkkwDQGAh0Fhp1Z6zHjMsDmUkjycntg4Dvk4Rv5l62EUnj8jXliRL3j85kWWvYfnZCoxejgTiJB1YIfXZ1QICXllFBMXiJJOTLtyeudg95oyhIUquLf3DwPGF2_pb_NMMKAaMG1zszx3x_ZoiKak20wBLl0hLqGNbW2E4WpzNARqZTQNA6KPQHaJRFPKTPmkDYSMP6qmxRUL7xtD-mTQQjWeHxVCX68YUPvKaZOysPRWCyZ1OCq6jlBPjvtdWBInX0osOhqtpWBop0hB62H8iSyosjGhjPYgEPcsWudnxW07pRgIW12aEGzbym-tkKT5bjcXSCM2tq5UY7X8Yl46LWdeEzQQs49udp5UZNFHyrozjIU3pIHyBhX0JGLaTPNoBpQdIm1grQ9d_PZZur2K6UcyDkczI6eIZECHwUlvBipaWCAIAom2aXWDWnzje-iZGZ2UJ4uv4BI91AZA2k7ITRe7BCB6ep0GZNf6aKmjlfdqBDx8BiqHtnRYicFRWSUyVnEXEReFqUp2vEh-y2PZqSiPviujqfgmPNAmZ-Ja-HEHsSQyXUCWHVTJxG6UgqfHWCYNbzcghJdzQLnlb1YdCkFtFzgyoY1qZY9mYPRo4Jc8qac",
    description: "Туристический анорак цвета хаки. Большой карман-кенгуру спереди. Мембранная ткань 5000/5000 защищает от дождя."
  }
];

function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showOrderForm, setShowOrderForm] = useState(false); // Новое состояние для формы заказа

  const handleCardClick = (product) => {
    setSelectedProduct(product);
    setShowOrderForm(false); // Сбрасываем форму при открытии товара
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setShowOrderForm(false);
  };

  // Обработка отправки формы "Свяжитесь с нами" (внизу страницы)
  const handleContactSubmit = (e) => {
    e.preventDefault();
    alert("Сообщение отправлено! Мы ответим вам на почту.");
    e.target.reset();
  };

  // Обработка отправки заказа (в модальном окне)
  const handleOrderSubmit = (e) => {
    e.preventDefault();
    alert(`Спасибо! Заказ на "${selectedProduct.title}" принят. Мы перезвоним вам в течение 15 минут.`);
    closeModal();
  };

  return (
    <div className="app-container">
      {/* Шапка */}
      <header className="header">
        <div className="logo">JACKET STORE</div>
        <nav>
          <a href="#about">О нас</a>
          <a href="#catalog">Каталог</a>
          <a href="#contact">Контакты</a>
        </nav>
      </header>

      {/* Параллакс секция */}
      <section className="parallax-hero">
        <div className="hero-content">
          <h1>Новая коллекция 2025</h1>
          <p>Стиль, комфорт и защита от любой погоды</p>
        </div>
      </section>

      {/* О нас */}
      <section id="about" className="about-section">
        <div className="about-container">
          <div className="about-text">
            <h2>О нашем бренде</h2>
            <div className="key-value-block">
              <h3>Наша философия</h3>
              <p>
                «Мы объединяем <strong>надежность горной экипировки</strong> с
                <strong> эстетикой street-style</strong>. Свобода движений и защита от стихии
                без ущерба для вашего образа.»
              </p>
            </div>
            <p>
              Мы создаем верхнюю одежду с 2010 года, вдохновляясь ритмом мегаполиса и суровой природой.
              Наша миссия — объединить технологичность туристической экипировки с эстетикой уличной моды.
            </p>
            <div className="stats">
              <div className="stat-item">
                <span>10+</span>
                <p>Лет опыта</p>
              </div>
              <div className="stat-item">
                <span>50k+</span>
                <p>Клиентов</p>
              </div>
            </div>
          </div>
          <div className="about-image">
            <img src="https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&q=80&w=800" alt="О нас" />
          </div>
        </div>
      </section>

      {/* Каталог */}
      <main id="catalog" className="catalog-section">
        <h2>Наши куртки</h2>
        <div className="products-grid">
          {products.map((product) => (
            <div
              key={product.id}
              className="product-card"
              onClick={() => handleCardClick(product)}
            >
              <img src={product.image} alt={product.title} />
              <div className="card-info">
                <h3>{product.title}</h3>
                <span className="price">{product.price}</span>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Форма обратной связи (Общая) */}
      <section id="contact" className="contact-section">
        <h2>Свяжитесь с нами</h2>
        <form className="contact-form" onSubmit={handleContactSubmit}>
          <input type="text" placeholder="Ваше имя" required />
          <input type="email" placeholder="Email" required />
          <textarea placeholder="Какую куртку вы ищете?" rows="4"></textarea>
          <button type="submit">Отправить</button>
        </form>
      </section>

      {/* Футер */}
      <footer className="footer">
        <p>&copy; 2025 Jacket Store. Все права защищены.</p>
        <p>г. Москва, ул. Модная, д. 10</p>
      </footer>

      {/* ЛОГИКА МОДАЛЬНЫХ ОКОН */}
      {selectedProduct && (
        <div className="modal-overlay" onClick={closeModal}>

          {/* Если showOrderForm === false, показываем описание товара */}
          {!showOrderForm ? (
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="close-btn" onClick={closeModal}>&times;</button>
              <img src={selectedProduct.image} alt={selectedProduct.title} />
              <div className="modal-text">
                <h2>{selectedProduct.title}</h2>
                <p className="modal-price">{selectedProduct.price}</p>
                <p className="modal-desc">{selectedProduct.description}</p>
                <button className="buy-btn" onClick={() => setShowOrderForm(true)}>
                  Купить сейчас
                </button>
              </div>
            </div>
          ) : (
            /* Если showOrderForm === true, показываем форму телефона */
            <div className="order-modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="close-btn" onClick={closeModal}>&times;</button>
              <h3>Оформление заказа</h3>
              <p>Вы заказываете: <b>{selectedProduct.title}</b></p>
              <p className="order-price">{selectedProduct.price}</p>

              <form className="order-form" onSubmit={handleOrderSubmit}>
                <label>Введите ваш номер, и мы уточним детали доставки:</label>
                <input
                  type="tel"
                  placeholder="+7 (999) 000-00-00"
                  pattern="[0-9\+\-\(\)\s]+"
                  required
                  autoFocus
                />
                <button type="submit" className="confirm-btn">Жду звонка</button>
              </form>

              <button className="back-btn" onClick={() => setShowOrderForm(false)}>
                ← Назад к описанию
              </button>
            </div>
          )}

        </div>
      )}
    </div>
  );
}

export default App;