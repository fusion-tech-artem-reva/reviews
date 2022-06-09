**actions/sitter.tsx**

1. нет смысла в этой санке `checkSitterFavoritePermission`


**components/legal/legalAcceptanceForm.tsx**

1. Вынеси в стили `style={[margin(10), {paddingRight: 20}]}`
2. Вынеси текста для `customLabel` в констаны наверное 
3. Три раза используеться условие `isChurch` для трех компонентов. Завернуть в одно условие

**components/reviews/reviewCell.style.ts**
1. `const width = Dimensions.get('screen').width;` вроде не используеться

**containers/jobs/ReviewSittersContainer/hooks.ts**
1. `import { Alert } from 'react-native';` перенести к импортам библиотек

2. `console.log('ERROR', e);` укажи хотя бы где и в каком методе ошибка

3. Ты уверена что тебе тут нужен `is` а не `as` 
`.filter((job): job is Job & { sitter: Sitter } `

4. Тебя устраивает что `setReviews` может засетить массив `undefined`;

5. Убери 
`console.log('requestBody', JSON.stringify(requestBody, null, 2));`
` console.log('action.error?.message', action.error?.message);`

6. Вынеси в константы ошибок например вот этой
`Please provide a rating via the stars below`

7. Look like этот код дублируеться

```
  const textError = action.error?.message.includes('Please provide a rating via the stars below')
                    ? 'Select the number of stars before Submitting'
                    : getRatingSubmitErrorMessage(newReview);

                    dispatch(alert(AlertType.ERROR, null, textError));
```

8. Это зачем

```
 setTimeout(() => {                    
                    showShareComplimentModalIfShowAgain();

                }, 3000)
```


**middleware/notifications.ts**

1. Такая конструкция у тебя встречаеться не один раз. Думаю стоит вынести в утилитку


```
     const minDate = dayjs().subtract(30, 'days'); 
  
      const minEndDatetime = (Date.now() - minDate.$d.getTime()) / 1000;
      
      const churchFilters = isChurch ? {
          min_end_datetime: minEndDatetime,
      } : {};
  
```

**navigators/components/ChattingHeader/ChattingHeader.tsx**

1. Убери консоль логи
```
 console.log('proxyNumber',proxyNumber);
 console.log('KARAMBA');
console.log('FFFF');
```

**screens/Chat/components/ChattingScreen.tsx**
1. Если не нужно то просто удали
```
// minComposerHeight={27}
```


**screens/signup/signupLegalScreen.tsx**
1. А что `Promise<any>` ?