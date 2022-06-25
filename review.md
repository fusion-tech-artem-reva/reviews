**Global**
1. Структурируй импорты:
библиотеки 
стили
компоненты
компоненты библиотеки
утилиты
типы
апи
порядок на твое усмотрение

```
import * as React from 'react';
import Head from 'next/head';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';

import theme from '../styles/theme';
import { globalStyles } from '../shared/styles'
import '../styles/fonts.css'

import createEmotionCache from '../shared/createEmotionCache';

import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer';

```
2. `Home.module.css` я полагаю тебе не нужен. Удали неиспользуемые импорты и файлы

3. Добавь в тему все возможные комбинации для шрифтов и исполльзуй далее из темы 
(SearchMenu.style, Winners.style)

4. Надо обсудить. Возможно тебе стоит сразу подключить `redux` и уже использовать его

5. Все цвета вынести в тему и использовать из темы уже

6. Отфарматируй стили (покажу)

**app.js**
1. То что в `Head` перенеси в `_document`

**SearchMenu.jsx**
1. Отфарматируй файл
2. Моковые данные так же не нужно оставлять

**MainContent.jsx**
1. Если пока используешь моки создай папку `api` а в ней `mocks`. И там уже создай моки и испортируй там где нужно

2. Такая кнопка используется только тут ? Она не может быть переиспользована? 
```
 <button
          className="main-content__show-button"
          type="button"
          onClick={() => handleClick()}
        >
          Show more
        </button>
```

3. ` onClick={() => handleClick()}` пиши так ` onClick={handleClick}`

**MainContent.style**
1. Последняя `}` лишняя

**WinnersItem.jsx**
1. Бесхозный `useEffect`. Убери

**WinnersItem.style**
1. Удали `ItemTest`

**SearchMenu.jsx**
1. Даты возможно стоит сделать динамическим значением. А то получается что их надо каждый раз менять. 2016, 2023. 

**Winners.style.js**

1. Что то тут не так. Ширине присваиваеться значение высоты. И эти стили возможно не используеются. Все что не используется удаляй
```
 &__search-menu {
      width: 100vh
    }
```

**CreditAwarded.js**

1. Вынести в отлдельный компонент. И отрисовывать через массив. (Создать массив со значениями, возможно будет динамический)
```
<li className="credit-awarded__list-item">
          Zone 1: <span>100% of cost</span>
        </li>
```

2. Картинки будут всегда статические или же может потом это все будет динамически ?
```
<Image
        src={isMobileScreen ? CreditAwardedMobileImage : CreditAwardedDesktopImage}
```

3. Тема не используется. Можно удадить `const theme = useTheme();`

**JudgesDecision.js**
1. Не уверен что это подходящее название для компонента. Мне кажется что это динамический компонент (надо обсудить). И ссылка на картинку так же динамическая, которая будет прилетать в пропсах

2. Соответственна тогда и заголовок и тотал тогда тоже должены быть динамические.

**Winner.js**
1. Тут полагаю тоже текста должны быть динамические. Соответственно прилетать через пропсы

**Footer.js**
1. Сделай лучше массив строк для эементов и перебирай его и отрисовывай. 
2. `2000-2021, All Rights Reserved` сделай вычисляемым значением чтобы не приходилось каждый год менять

**Footer.style.js**
1. В `StyledLink` лишний символ в конце `*/`

2. Для всех `Link` которые внутри себя используют `StyledComponent` добавь аттрибут `passHref`
```
<Link href="http://google.com/" passHref <<<СЮДА > 
              <StyledLink img='/images/footer__facebook-icon.svg'className="footer__icon" />
            </Link>
```
иначе у тебя `a` не получит ссылку, что плохо для SEO. Можешь глянуть в браузере что у них нету ссылок

**BurgerPopup.jsx**
1. Елементы отрисовывай через массив
2. Удали закоменченный код
3. Отфарматируй файл
4. `@User Name` и `0xb9d6xb9d6xb9d6xb9d6xb9d6asdawdssdwab00e` должены быть динамические. Т.е прилетать через пропсы
5. Думаю это стот вынести в отдельный компонент
 ```
<Link onClick={setAuth} href="/">
       <a className="burger-popup__menu__profile">
         <Image 
         className='burger-popup__menu__profile__img'
          src="/images/user-image.svg" 
          alt='User avatar' 
          layout='fixed'
          width={33}
          height={33}
          ></Image>
          <div className='burger-popup__menu__profile__text'>
            <span className='burger-popup__menu__profile__text__name'>@User Name</span>
            <span className='burger-popup__menu__profile__text__id'>0xb9d6xb9d6xb9d6xb9d6xb9d6asdawdssdwab00e</span>
          </div>
       </a>
     </Link>
```

6. Все меню не умещяется на моблики в экране и появляется скролл

**CartItem.jsx**
1. Текста также я полагаю должны быть динамические, соответственно прилетать через пропсы. Или из редакса (Если будет) 

**CartPopup.jsx**
1. Отфарматируй файл
2. Это тоже должно отрисовываться динамически через массив. Данные прилетают сверху 
```
 <ul className="cart-popup__item-list">
        <CartItem />
        <CartItem />
      </ul>
```

3. Эти значения так же наверное динамические
```
 <CartPrice title="Subtotals:" value="$42.5 | 0,014ETH" />
          <CartPrice title="NFT Credit" value="-$5 | 0,0016ETH" />
          <CartPrice title="Totals:" value="$37,5 | 0,012ETH" isBoldValue />
```


**WalletLink**
1. Добавить `passHref` для `Link`