#### [src/api/lessonsApi/lessonsApi.ts](https://github.com/fusion-dev-team/boomerangCRM_frontend/pull/345/files#diff-cf4857bfc00c7717125f0861b2a4baf4f8abc3c0ff3e2e219d1bdf679694ee0b)

1. Нет смысла делать деструктуризацию аргументов 

```ts
async ({ ...props }: CreateLessonType): ....
```

переделай в 
```ts
async (params: CreateLessonType): ....
```

и так далее

2. Бессмысленные try catch во всех api. Убери везде их на этом уровне

3. Типизируй ответ от апих через generic в axios

Нет 
```ts
createLesson: async (params: CreateLessonType): Promise<CreateUpdateLessonResponse> => {
        const res = await instance.post(LessonsApiPath.LESSON_CRUD, params);
        return res.data;
}
```

Да 
```ts
createLesson: async (params: CreateLessonType) => {
        const res = await instance.post<CreateUpdateLessonResponse>(LessonsApiPath.LESSON_CRUD, params);
        return res.data;
}
```

4. Не нужное условие добавления query параметра
```ts
getLessonsList: async (sectionId?: number): Promise<GetLessonsResponse> => {
        try {
            const url = sectionId
                ? `${LessonsApiPath.LESSON_CRUD}?sectionId=${sectionId}`
                : `${LessonsApiPath.LESSON_CRUD}`;

            const res = await instance.get(url);
        }
}
```

Передавай параметры через params в axios (https://axios-http.com/ru/docs/req_config)
```ts
getLessonsList: async (sectionId?: number): Promise<GetLessonsResponse> => {
        try {
   
            const res = await instance.get(LessonsApiPath.LESSON_CRUD, {
              params: {
                sectionId,
              }
            });
        }
}
```
**Применить данные правила выше ко всем апи далее** 

#### [src/api/lessonsApi/lessonsApi.types.ts](https://github.com/fusion-dev-team/boomerangCRM_frontend/pull/345/files#diff-8cf36cd363818e061a99d46e216abf8205bd665f9ab0566cf7aa9a0977137b4e)

1. Это по факту один и тот же тип. Используй один тип. И Расширяйся от него если нужно

```ts
export type CreateLessonType = {
    sectionId: number;
    priority: number;
    title: string;
    description: string;
    videoUrl: string;
    attachedFiles: AttachedFile[];
    usersIds: number[];
};

export type UpdateLessonType = {
    sectionId?: number;
    priority?: number;
    title?: string;
    description?: string;
    videoUrl?: string;
    attachedFiles?: AttachedFile[];
    usersIds?: number[];
    id: number;
};
```

Например

```ts
const fetch = (data: CreateLessonType) => ...;

const fetch2 = (data: Omit<CreateLessonType, 'usersIds'> & {id: number; usersIds?: number[]}) => ...

```


2. Почему типизация подразумевает что респонс может быть `undefined` ??

```ts
export type CreateUpdateLessonResponse =
    | {
          data: ILesson;
          message: string;
      }
    | undefined;

export type DeleteLessonResponse =
    | {
          data: number;
          message: string;
      }
    | undefined;

export type GetLessonsResponse =
    | {
          data: ILesson[];
          message: string;
      }
    | undefined;
```
тип должнен иметь смысл. То есть если есть типизация и может быть undefined то правильным будет
```ts
type CreateUpdateLessonResponse = {
          data: ILesson;
          message: string;
}

const fetch = async (): Promise<CreateUpdateLessonResponse | undefined> ...
```

Но и то это странно почему респонс должен быть undefined. Такого не должно быть. Либо ошибка с Бэка либо данные

*src/api/sectionsApi/sectionsApi.types.ts* <- тут тоже самое


#### [src/components/AddButtonWithIcon/AddButtonWithIcon.style.ts](https://github.com/fusion-dev-team/boomerangCRM_frontend/pull/345/files#diff-0d92a2f0fbfac182508dff5607547b4a31498d65a7d5a4ef10b67e756e849437)

1. Почему импорт из `'styled-components/macro'` ?  (и далее тоже)

2. Не типизируй вложенные элементы через тэги. Добавь им классы (И далее везде тоже)
```css
 img {
        width: 20px;
        height: 20px;
        margin: 0 6px;
    }
    p {
        width: fit-content;
    }
```

#### [src/components/AddButtonWithIcon/AddButtonWithIcon.tsx](https://github.com/fusion-dev-team/boomerangCRM_frontend/pull/345/files#diff-00122e902e8d0d37b79c81b73d9608909600648d89426e02631564422389e8b6)

1. Плохо переиспользуемы компонент. 
Не нужно привязываться только к двум иконкам
```ts
type IconType = 'plus' | 'bag';

const iconMap: Record<IconType, string> = {
    plus: AddDocumentIcon,
    bag: BagAddIcon,
};
```

вот это убрать. И принимать иконку через пропсы. Тогда кнопка может быть использована с различными иконками. 


```ts
interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    action: () => void;
    text?: string;
    icon?: string;
}
```

2. Зачем название `action` если есть `onClick` который явно отображает действие

3. Почему `className` явно задан как пустая строка ?  
4. ` alt="Icon" ` alt должен явно отобрадать что за иконка - а не просто Icon


#### [src/components/Common/CustomSelect/CustomSelect.tsx](https://github.com/fusion-dev-team/boomerangCRM_frontend/pull/345/files#diff-3734c750f33edcba12771965239f0ec297c1a9d637fb6a84910783032fe8cf8d)

1. Зачем тут добавлен `clsx` ? Он тут вообще не нужен ` className={clsx(className)}`


#### [src/components/Common/LearningComponent/AddSectionModal/AddSectionModal.tsx](https://github.com/fusion-dev-team/boomerangCRM_frontend/pull/345/files#diff-b6c19697a95a5fdf7316027aba6ffe33efb3dfb16b9a6e0830f87901bd121fe5)

1. Странное использование проверки результата санки. 
```ts
const result = await dispatch(createSectionThunk({ name: trimmedName }));
        if (createSectionThunk.fulfilled.match(result)) {
            toast.success('Раздел успешно добавлен');
        } else {
            toast.error(result.payload as string);
        }
```

у тебя есть `unwrap` для этого   (https://redux-toolkit.js.org/api/createAsyncThunk#handling-thunk-results)

```ts
try {
  await dispatch(createSectionThunk({ name: trimmedName })).unwrap()
} catch(){}
```

и тогда санка вернет реальный результат


#### [src/components/Common/LearningComponent/LearningComponent.tsx](https://github.com/fusion-dev-team/boomerangCRM_frontend/pull/345/files#diff-478b102fd41a06e3cd92e75bd069edd3697450e9b4f50b06d970dd7ea812d381)

1. Удали этот аля селектор `import { lessonsSelector } from '../../../store/slices/lessonsSlice';`

Такого рода селекторы пишем прямо в компоненте в useSelector


```ts
const { lessons } = useSelector((state: RootState) => state.lessons);
```

и опять же этот вариант не верный. Так как в таком случае ты подписываешься на изменения всех поленй в `lessons`. а тебе нужно толлько `lessons.lessons`

```ts
const lessons = useSelector((state: RootState) => state.lessons.lessons);
```

И тоже самое далее. 


#### [src/components/Common/LearningComponent/Lesson/Lesson.tsx](https://github.com/fusion-dev-team/boomerangCRM_frontend/pull/345/files#diff-1d6860ed99f1234f384341ff591a833334f89a0a827e1ab35925b9ad1b81efe4)

```tsx
 <button type="button">
    <img onClick={() => editLesson(lesson)} src={GearsIcon} />
  </button>
```

`onClick` должен быть на `button` а не на `img`

#### [src/components/Common/TextEditor/TextEditor.tsx](https://github.com/fusion-dev-team/boomerangCRM_frontend/pull/345/files#diff-34ee1e3f18e88aef5997043d7bede51ba3f26177563714e1b98d65b26b79ff22)

```ts
 if (this.props.onChange) {
      this.props.onChange(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  }
```

=== 

```ts
  this.props.onChange?.(draftToHtml(convertToRaw(editorState.getCurrentContent())));
```

Замени такие конструкции


#### [src/components/LessonEditor/LessonPrioritySelector/LessonPrioritySelector.tsx](https://github.com/fusion-dev-team/boomerangCRM_frontend/pull/345/files#diff-86b54d13c83b9afffd0ee50406ab253c6841ec249879e4885c00072b7e6860f8)

1. вынеси из компонента как константу `const allPriorities = Array.from({ length: 30 }, (_, i) => i + 1);` незачем на каждый ререндер пересоздавать массив

2. Переделать в соответствии с правилами выше 
 `const { lessons } = useSelector(lessonsSelector);`

#### [src/components/LessonEditor/UsersToggleList/UsersToggleList.tsx](https://github.com/fusion-dev-team/boomerangCRM_frontend/pull/345/files#diff-5885612b02f8e2fa5f973a6583dff0404408f2f9acf8f7ab80fb0f7ace330f19)

1. Заверни вычисления `areAllSelected` в `useMemo`


#### [src/store/slices/lessonsSlice/index.ts](https://github.com/fusion-dev-team/boomerangCRM_frontend/pull/345/files#diff-d2034b0f3f43c2caf9df144d6263bd9d524563148c86f73c564f2d8beef606a1)

1. `const error = err as AxiosError<{ message?: string }>;`  неверное утверждение 

нужно сделать проверку isAxiosError, импортировать из axios

2. По хорошему разделить на 2 файла - slice и thunks

3. `action` должны быть типизированны 

и так далее