1. Компоненты перенести как минимум в папку `components` для начала. Сейчас у тебя все в одном месте перемешанно. Для каждого компонента создай свою папку в:

```
 src:
	- components:
		  - Header:
			  -Header.jsx
			  -Header.styles.css
```
и так далее.

2. Перепиши для начала вместо css стили используя модули [ссылка](https://create-react-app.dev/docs/adding-a-css-modules-stylesheet/) 



**[MainTodo](https://github.com/krok-86/REDUX-TODO/blob/main/src/MainToDo.jsx)**

1. `const [todoDone, setTodoDone] = useState(0);` не нужный стейт
ты его устанавливаешь каждый раз когда меняеться `todo`
```
  useEffect(() => {
    countTaskDone();
  }, [todo]);
```
в этом нет никакого смысла так как `todo` это тоже стейт при изменении которого будет вызван ререндер. Так зачем нам тогда еще один стейт если ты можешь просто взять и присвоить значение выполненных в переменную и она будем меняться всегда так как зависит от стейта

```
const doneTodos = todo.filter((item) => item.status).length;
```

и никакой дополнительный стейт для этого не нужнен


2. 
- как бы вроде бы ок тут. Но ты мутируешь оригинальный стейт ` item.title = title;` вот этим действием. Ты внутри массива напрямую обращаешься к оригинальному объекту и в оригинальном объетке меняешь `title`. Так делать нельзя. 

```
const editTodo = (id, title) => {
    const newTodo = todo.map((item) => {
      if (item.id === id) {
        item.title = title;
      }
      return item;
    });
    setTodo(newTodo);
  };
```

- что такое `setTodo` в функции `editTodo`. Откуда он береться? 
- так как у тебя есть редакс то все подобные изменения/вычисления для стейта переноси в `slice`. А в компоненте ты будешь просто вызывать `action` в который передашь например только `id, title`

3. Сейчас у тебя `key={uuidv4()}` при каждом ререндере новый так как ты вызываешь `uuidv4()` каждый раз как массив меняеться и вся реактовская оптимизация летит на дно. У тебя должен быть статический уникальный id. 
То есть в твоем случае это наверное должно быть как `key={item.id}`

```
{todo.map((item) => (
          <TaskString todo={item} editTodo={editTodo} key={uuidv4()} />
        ))}
```

4. TaskString - не особо подходящее название для компонента. Непонятно за что он отвечает по название. Если бы хотябы это был TaskListItem было бы интереснее


**[TaskString](https://github.com/krok-86/REDUX-TODO/blob/main/src/TaskString.jsx)**

1. Не нужный стейт ` const [taskColor, setTaskColor] = useState(todo.status);
`

У тебя и так есть значение `todo.status` на него и опирайся


2. Старайся условия писать от меньшено к большему всегда. Сначала пишешь условие которое тебя не удовлетворяет и выходишь а потом уже делаешь операции без условий. Например в твоем случае

```
 const handleEnter = (e) => {
    if (e.key == "Enter") {
      correctTodo();
    }
  };
```

==

```
 const handleEnter = (e) => {
    if (e.key !== "Enter") {
     return
    }
    correctTodo();
  };
```

Пересмотри все у себя и переделай. Особенно посмотри в Bottom.jsx. 

**src/screens/community/index.tsx**

1. Обсудить как работает этот компонент. А именно ты при `isEmpty` отрисовываешь один layout но тот же можешь поменять `hideEmptyModal` и тем самым отрисовать другой. (это все напоминание для меня). 

Если при `isEmpty` просто отображается какаято модалка с оповещением тогда все ок

____
**src/screens/creatingGroup/components/form/hook.ts**

1. Так как это один и тот же обработчик то можно просто сделать его общим. И вместо нескольких иметь один

```
type Options = {
  key: 'name' | 'description';
  value: string;
}

const updateGroupInfoByKey = useCallback((options: Options) => {
  dispatch(setGroupInfo(options));
}, [])
```

____

**src/screens/creatingGroup/components/uploadingImage/index.tsx**

1. Цвета вынести в константы `'#00C8FE', '#4FACFE'`


____

**src/screens/group/components/coinData/hook.ts**

1. Убрать деструктуризацию

```
 const { group } = useAppSelector((store) => store.groups);
```

____

**src/screens/group/components/headerInfo/hook.ts**

1. Убрать деструктуризацию

```
 const { group } = useAppSelector((store) => store.groups);
```
____

**src/screens/group/components/roadMap/hook.ts**

1. Убрать деструктуризацию

```
 const { group } = useAppSelector((store) => store.groups);
```
____
**src/screens/group/components/socials/hook.ts**

1. Убрать деструктуризацию

```
 const { group } = useAppSelector((store) => store.groups);
```
12
___

**src/screens/group/hook.ts**

1. `headerProps` заверни в `useMemo`
2. Убери деструктуризацию 
```
const { modalVisibility } = useAppSelector((store) => store.app);
```

3. Как то ты выборочно решаешь что завернуть в `useCallback` а что нет. В данном случае все обработчики можно завернуть.


___
**src/screens/group/index.tsx**

1. Это задел на будущее или что ? в `BottomSheetButton`

```
 onPress={() => {}}
```

___

**src/screens/groups/components/emptyGroups/index.tsx**

1. Отфарматируй файл (перенос строк)

___
**src/screens/groups/components/header/index.tsx**

1. Отфарматируй файл (перенос строк)

___

**src/screens/groups/components/item/index.tsx**

1. Отфарматируй файл (перенос строк)

___

**src/screens/roadMap/components/roadMapItem/index.tsx**

1. Цвета в константы `'#00C8FE', '#4FACFE'`
2. Вынеси в обработчик. Не надо все группировать прямо в разметке
```
 onChangeText={(text) => {
    setError('');
    handleChangeRoadMapValue(text);
  }}
```

___

**src/screens/roadMap/index.tsx**

1. Цвета вынеси в костанты `'#00C8FE', '#4FACFE'`.

___
**src/screens/uploadPostFile/components/checkbox/hook.ts**

1. Убери деструктуризацию 
```
const { selectedPostImages } = useAppSelector((store) => store.community);
```


___
**src/screens/uploadPostFile/hook.ts**

1. Перенос строк
2. Мне кажеться я где то уже встречал точно такую же функцию как `hasIOSPermission`. Нельзя ее вынести в утилиты и переиспользовать ?

3. В другом компоннете похожем у тебя данный массив вынесен в переменную `['UNAVAILABLE', 'BLOCKED', 'DENIED']` а тут пожалела. 

___
**src/shared/authInput/nickNameInput.tsx**

1. Перенос строк
2. Цвет в константы `"#8C8F9C"`


___
**src/shared/authInput/phoneInput..tsx**

1. Перенос строк
2.  В константы `"#8C8F9C"`

___
**src/shared/header/index.tsx**

1. Перенос строк 

___
**src/shared/input/index.tsx**

1. В константы `['#00C8FE', '#4FACFE']`
