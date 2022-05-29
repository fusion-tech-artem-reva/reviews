**src/models/analytics.ts**

1. Вложенные типы вынести в отдельные типы. (Везде). Особенно не должно быть двойной и т.д вложенности. 

```

export interface IGroupOfFields {
  name: string;
  // Такой вложенности быть не должно 
  data: {  
    name: string;
    amount: number | string;
    symbol: string;
    growth?: number;
  }[];
  selector: 'total' | 'per game' | 'per order' | 'per cap' | '';
}

лучше так 


export interface IGroupOfFields {
  name: string;
  data: DataInGroupOfFields[]; <<< Так лучше
  selector: 'total' | 'per game' | 'per order' | 'per cap' | '';
  }

export interface DataInGroupOfFields {
  name: string;
  amount: number | string;
  symbol: string;
  growth?: number;
}

```


2. Что то не так с описанием типа возможно, мне не понятен кейс для чего нучжа пустая строка в описании типа `selector: 'total' | 'per game' | 'per order' | 'per cap' | '';`


3. Лучше избегать прокидывания `setState` напрямую а переделать на callback  в котором будет использоватся `setState` соответственно типы будут другие


```

export interface IGraph {
  setMetricsRevenue: React.Dispatch<React.SetStateAction<number | string>>;
  setMetricsOrders: React.Dispatch<React.SetStateAction<number | string>>;
  setMetricsItems: React.Dispatch<React.SetStateAction<number | string>>;
  data: IAnalyticsData;
  totalAverage: TTotalAverage;
}

вместо  React.Dispatch<React.SetStateAction<number | string>>;

будет 

setMetricsRevenue: (value: number | string) => void;

То же самое для типов ниже
... и т.д
```

4. Что то много здесь типиов в этом файле похожих на пропсы к компонентам. Зачем они тут? Пропсы описываются в самом компоненте.


**src/pages/Analytics/components/Button/ButtonAnalytics.layout.ts**
1. Описание пропросов для `ButtonLayout, ButtonLayoutParam` перенеси в этот файл. 

2. Стилизованному копоненту нет необходимости знать что там у тебя за `label` (при том что у тебя описан тип `string` а в стилях ты проверяешь на конкретные значения). то есть  `p.label==='PER GAME'` или `p.label==='PER CAP'`. Все что нужно для этого компонента так это `boolean` значения для того чтобы знать отрисоываваеть ему `border` или нет и какой.
аля вместо `label` :

```
border-top-left-radius: ${p => (p.isLeftBorder ? '5px' : 0)};
border-bottom-left-radius: ${p => (p.isLeftBorder ? '5px' : 0)};
border-top-right-radius: ${p => (p.isRightBorder ? '5px' : 0)};
border-bottom-right-radius: ${p => (p.isRightBorder ? '5px' : 0)};
```


3. Ты используешь один и тот же тип для обоих кнопок, при том что `props.label` в первом не используется и соответственно зачем нам тогда его туда прокидывать если он не нужен. 

4. `'2px solid'+p.theme.colors.gray2` такая кобинация не сработает так как у тебя на выходе получиться строка `2px solidgray`. Нужен пробел используй шаблонные строки.


**src/pages/Analytics/components/Button/ButtonAnalytics.tsx**
1. Описание пропсов перенеси в этот компонент
2. Зачем прокидываеться пропса в кнопу `perParam={perParam}` если эта пропса нигде не используеться. Тоже самое с `totalAverage={totalAverage}`


**src/pages/Analytics/components/Graph/Graph.layout.ts**
1. Нужно проверить верстку лично чтобы убедится можно ли в этих стилях задавать ширины и высоты статические. 

**src/pages/Analytics/components/Graph/Graph.tsx**
1. Описание пропсов перенеси в этот компонент

2. `const handleClick = (index: any)` почему `any` ?

3. Обсудить эту логику 
```
 useEffect(() => {
    setActiveIndex(graphData[0].id);
    setMetricsRevenue(graphData[0].revenue);
    setMetricsOrders(graphData[0].countOrders);
    setMetricsItems(graphData[0].itemsSold);
  }, [graphData, setMetricsItems, setMetricsOrders, setMetricsRevenue]);
```

4. Переписать функцию `handleClickButtonGraph` на что то подобное.

```
const handleClickButtonGraph = (index: number) => {
  const someConstantValue = 6; // вам виднее как эпу переменную назвать
  const increasedGraphIndex = graphIndex + someConstantValue; // ну или какенибуть название поумнее
  const decreasedIndex = graphIndex - someConstantValue

  if ( index > 0 && increasedGraphIndex <= data.perGameStats.length) {
     return setGraphIndex(increasedGraphIndex);
   }
  if (decreasedIndex >= 0) {
    return setGraphIndex(decreasedIndex)
  }
}
```

5. `totalAverage === 'total' ` вынести в переменную типа `isTotalAverage` и уже использовать ее

6. Данной проверки недостаточно, так как  `data.perGameStats` это массив, а пустой массив тоже `true`. Так же в типах описано что этот параметр обязательный, тогда встает вопрос зачем делать проверку если он всегда должен быть.

```
return (
    data.perGameStats && (
```


7. Разбить разметку на более мелкие подкомпоненты. Как минимум два графика повторяються

8. Плохая идея делать `graphData.flat()` в разметке. Так как на каждлм ререндере будет делаться `flat` который возвращает новый массив.


**src/pages/Analytics/components/GroupOfButtons/GroupOfButtons.tsx**

1. Перенести сюда описание пропрсов

2. Вынеси в handler 

```
onClick={() => {
            setTotalAverage('total');
            setHidden(true);
          }}
```

3. Убрать  лишнии пропсы у кнопок
4. Функция которая называеть `setColors` не может ничего возвращать ведь написано set. Переименновать. 
И зачем она вообще используеться для того чтобы вернуть `isActive`? Это как то связанно с цветом. Так как вы в этом компоненте исользуете только `isActive` то напиши просто 

```
perParam={perParam}
isActive={perParam === param} <<< и так везде
```


5. Так писать не нужно `totalAverage === 'average' ? true : false` так как само сравнение `totalAverage === 'average` и так вернет тебе `true или false` то указывать через тернарник не нужно. И это не только здесь. Обращай на это внимание



**src/pages/Analytics/components/GroupOfFields/GroupOfFields.layout.ts**
1. Описание пропсов перенести сюда


**src/pages/Analytics/components/GroupOfFields/GroupOfFields.tsx**

1. Описание пропсов перенести сюда

2. Вынести в переменную useMemo в которую стразу вернется уже готовая строка. И зачем тут `+` перед каждым `item.amount`?
 
```
{+item.amount && item.symbol === '$' ? item.symbol+' ' : ''}
{+item.amount ? item.amount>1000 ? Math.round(+item.amount).toLocaleString() : item.amount.toString().slice(0,3) : '-'}
{+item.amount && item.symbol === '%' ? ' '+item.symbol : ''}
```

3. Зачем указывать `item.growth as number`? Значит что то неверное с описание типов.

```
{item.growth as number > 0
? '+' + item?.growth?.toFixed(1)
: item?.growth?.toFixed(1)}

написать как то так

{item.growth > 0 && '+'} {item?.growth?.toFixed(1)};
```

**src/pages/Analytics/components/GroupOfSelectors/GroupOfSelectors.constants.tsx**

1. Почему `any` в `control: (provided: any, state: any)`

**src/pages/Analytics/components/GroupOfSelectors/GroupOfSelectors.tsx**

1. Никогда так не делать !

```
const {
    analytics: { selectorClient, clientOptions, selectorVariables, options },
    main: { clientId: storeClientId, role }
  } = useAppSelector(state => state);
```

Если нужно достать что то из стора, то делаешь это в useSlectore. Если необходимые данные из сразных срезов сторов то ипользуешь несколько useSelector (их может быть сколько угодно)

тебе нужно так:

```
const { 
  selectorClient,
  clientOptions,
  selectorVariables,
  options,
} = useAppSelector(state => state.analytics);

const {
   storeClientId,
  role,
} = useAppSelector(state => state.main.clientId);
```

2. Зачем указывать `as a number` в  `() => selectorClient?.value ?? storeClientId as number,`. Возможно что то неверно с типизацие тогда

3. Всю логику переделать на `useReducer` вместо всех этих стэйтов. Слишком много стэйтов и стэйт сэтеров за раз. 

4. Во все функции которые идут ниже стэтов даже не смотрел так как нужно будет всю логику перенести в reducer

5. Все `Select` в разметке отрисоывавать через `map`

**src/store/analytics/index.ts**

1. Где описание типов для большинства `payload` ?
2. Вынести в отдельный тип 

```
    | 'venue'
    | 'restaurant'
    | 'zone'
    | 'station'
    | 'section'
    | 'year'
    | 'delivery'
    | 'payment';
```

**src/store/analytics/thunks.ts**

1. `axiosInstance.get<any>` почему `any`. Разве неизвестен тип возвращаемых данных ?
2. Это нужно вынести в api в отдельные функции
```
axiosInstance.get<any>(`/admin/analytics/options/client/${id}`);

axiosInstance.get<any>('/admin/analytics/clients');

axiosInstance.get<any>(`/admin/analytics/total/${params.clientId}${params.queryString}`);
```

3. `{queryString:string, clientId: number}` вынести в отдельный тип

**src/utils/analytics.ts**

1. Сомнительная функция. Для чего это все? Разве не достаточно `Object.keys(someObject)` чтобы проверить пустой объект или нет 

```
export const isEmpty = (obj: {}) => {
  for (let key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      return false;
    }
  }
  return true;
};
```

2. Использовать https://www.npmjs.com/package/query-string для манипуляция с query и соответственно переделать функцию `formQueryString` с использованием этой либы


3. `getDataFields` если аргументов функции больше чем три то делай в качестве аргументов объект. То есть например
```
const getInfoAboutMan = (name: string, age: number, numberInHospital: number, address: string) => {....}
```
пример выше очень неудобен так как вызывать эту функцию придеться всегда с параметрами в пределенном порядке и плюс к тому же может быть непонятно за что отвечает тот или иной аргумет

вызов будет выглядет так

```
const data = getInfoAboutMan('Alex', 23, 243, 'NYS');
из аргументов функции абсолютно не понятно где какая и за что отвечает
```

но если написать через объеткт

```
type Options = {
  name: string;
  age: number;
  numberInHospital: number;
  address: string;
};

const getInfoAboutMan = (options: Options) => {...}

const data = getInfoAboutMan({
  name: 'Alex',
  address: 'NYS',
  numberInHospital: 123,
  age: 23
});

```
Так лучше. Понятно где какая и можно вызывать в любом порядке


4. Это я уже гдето встречал `'per game' | 'per order' | 'per cap' `. Нужно вынести в отдельный тип и переиспользовать. Только убрать пустую строку

5. `metricsVariables` Вынести в отдельный тип

```
 metricsVariables: {
    metricsRevenue: number | string;
    metricsOrders: number | string;
    metricsItems: number | string;
    metricsConversation: number;
  },
```

6. `countOrders/ordersGrowth` и `countRefOrders/refOrdersGrowth` логика повторяется. Вынести вычисления в отдельную функцию. У уже использовать ее для получения необходимого значения. 

Значения (аля `data?.perGameStats[0]?.countOrders || 0`) попроисваивать в переменные ибо сейчас вообще непонятно что тут происходит и что за логика применяеться. 

7. `getDataFields` очень огромная функция в которой невозможно разобраться. Разбить на логические блоки. Которые вынести в вспомогательные функции. 

8. Тоже самое касаеться `formGraphData`. А также почему тут в аргумента `arr: any[],` ? 

9. Переменные `testArr` и `testArr2` ниочем не говорят. Наооборот я даже подумал что возможно это случайно оставленный код который использовался для тестов во время разработки