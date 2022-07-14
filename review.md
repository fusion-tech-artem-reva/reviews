**Global**
1. Разделяйте импорты на логические блоки: 
аля сначала 
1. Библиотеки
2. Компоненты из Библиотек
3. api
4. utils 

и так далее. 


**pages/categories/[slug].tsx**

1. Зачем здесь `map` если ты ничего не возвращяешь. Нужен `forEach`;
2. Что за название переменной `test` ? Переименнуйте 

```
locales?.forEach((locale) => {
      categories?.data?.map(
          // eslint-disable-next-line array-callback-return
          (category) => {
          const test = { params: { slug: category.attributes?.slug }, locale };
            paths.push(test);
          },
      );
```


3. Не понятно зачем тут `Promise.allSettled`, если в любом случае когда нету одного то это уже ошибка. Соответственно Promise.All больше подходит так как если упадет один упадут и все. И тода не нужно будет проверка

```
export const getStaticProps: GetStaticProps = async ({ locale, params }) => {
	try {
		const response = await Promise.allSettled([
			serverSideTranslations(locale as string, ['footer', 'common', 'categories']),
			getCategoriesPage(locale as LocalesEnum),
			getCategories(locale as LocalesEnum),
			getFooter(locale as LocalesEnum),
			getFaq(locale as LocalesEnum),
			getCategoryInfoResponse(params?.slug as string, locale as LocalesEnum),
		]);

```


**pages/finder-tool.tsx**

1. Тут тоже самое про `allSettled` что и в пункте выше

**pages/index.tsx**

1.  Тоже самое


**src/api/categories.api.ts**
1. По хорошему типы перенести в `models` (и так далее в api файлах)

2. `undefined` указываеться через `?`

3. Что за странный формат данных? Зачем тут массив с одним элементом ?
```
export type CategoryInfoResponse = {
  data: [{
    id: number,
    attributes: {
      info: CategoryInfoType[],
      software_category: CategoryData,
    }
  }]
}
```

**src/components/Breadcrumbs/CustomBreadcrumbs.layout.js**
1. А зачем этот файл с раширением `js`? если есть такой же только `ts` 


**src/components/Button/Button.tsx**
1. Ставьте `;` в конце каждого типа (и так везде)

```
type Props = {
  title: string
  onClick: () => void
  className?: string
}
```
**src/components/Footer/components/Subscription/Subscription.tsx**

1. В тэгах в разметке импользуйте двойные кавычки (и так везде) 
```
<Image
					src={vector}
					alt='vector' <<< тут
					layout='fixed' << тут
					width={15}
					height={15}
				/>
```


**src/constants/routers.ts**
Похожие константы используеются в `api` или не ?
```
export const POPULATE_DEEP = 'populate=deep';
export const POPULATE = 'populate=*';
export const LOCALE = 'locale';
export const FILTERS = 'filters';
```

**src/models/BreadCrumbsTitlesEnum.types.ts**
**src/models/breadCrumbsTitles.types.ts** 

1. явно какойто из этих файлов лишний. 
2. Для чего этот `enum` у вас же вроде переводы используються

**src/models/dynamicZone.types.ts**
**src/models/dynamicZoneEnum.types.ts**

тоже два файла

**src/models/homePage.types.ts**

1. Зачем в `HomePageResponse` поле `meta` если оно всегда `undefined` ?

тоже самое и с другими полями где `null` и в других типах. Если вы еще не знаете то оставьте хотябы коменты типа

// TODO: .... 

2. Это тоже не понятно
```
localizations: {
          data: []
      }
```

3. Если вложенный тип может быть переиспользован то выносить его в отдельный тип. 
Тут `icon` и в `RecommendationType` аналогичный
```
export type CompanySliderType = {
  id: number,
  name: string,
  icon: {
    id: number,
    description: null,
    alt: string,
    image: ImageType
  }
}
```

**src/models/image.types.ts**
Так же оставьте комментариии для типов у которых всегда `null`


**src/views/Categories/Categories.tsx**

1. `const onClickedCategory = async (id: number)` зачем она асинхронная

2. Что это такое ? Не до конца разобрались для чего нужно `useMemo`. Судя по тому что тут написано это точно не мемо это дело `useEffect`

И плюс где try catch?

```
useMemo(async () => {
		const updatedInfo = await getCategoryInfoByIdSoftwareCategoryId(
			activeCategory?.id, locale as LocalesEnum,
		);

		setInfoAboutCategory(updatedInfo.data[0].attributes.info);

		return updatedInfo;
	}, [activeCategory?.id, locale]);
```

3.Тут действительно нужен пустой `div` ? Если тебе ничего не нужно рисовать по пишешь просто `null`

```
{infoAboutCategory && infoAboutCategory.length
					? <CategoryInfo info={infoAboutCategory} /> : <div></div>}
```


**src/views/Categories/components/Category/Category.tsx**
1. Такие вещи не делаються вобщем потоке. Для побочный действий есть `useEffect`. 
useEffect исполняеться только на стороне клиента. Соответственно в нем всегда будет window. 


```
if (typeof window !== 'undefined') {
		if (width === 0 || width !== window.innerWidth) {
			setWidth(window.innerWidth);
			width <= 767 ? setProps(sxScreen) : setProps(largeScreen);
		}
	}
```

2. Тут нету отписки у вас вешаются куча листенеров
3. Зачем тут вообще размеры вычисляються через js ? нельзя через css ?

```
useEffect(() => {
		window.addEventListener('resize', () => {
			if (width !== window.innerWidth) {
				setWidth(window.innerWidth);
				window.innerWidth <= 767 ? setProps(sxScreen) : setProps(largeScreen);
			}
		});
	}, [width]);
```

3. зачем `showInfo` асинхронная ?


4. `onMouseEnter={() => (width >= 1439 ? setIsShown(true) : showInfo)}` как минимум вынести в функцию. И плюс `showInfo` у вас тут не вызываеться

**src/views/Categories/components/CategoryInfo/CategoryInfo.tsx**
и тут
**src/views/FinderTool/components/Info/Info.tsx**
1. Для чего это все завернуто в `useMemo` ?

2. Все что в `if`ах разбить на подкомпоненты а потом просто мапать в разметке

**src/views/FinderTool/components/Header/components/Bubbles/Bubbles.tsx**
**src/views/Home/components/Guaranteed/Guaranteed.tsx**
1. Надо обсудить что тут вообще происходит. И показть мне что это прям работает


**src/views/Home/components/BestCards/components/Card/Card.tsx**
1. Условия из разметки перенести в переменные


**src/views/Home/components/DragCategory/DragCategory.tsx**

1. Зачем сделано через кнопку а не через линку?
```
<Button
									className="SelectedCategory-Button"
									title={t('explore-category')}
									onClick={() => router.push('/')}
								/>
```
