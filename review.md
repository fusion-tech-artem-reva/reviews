**[src/core/Router/index.tsx](https://github.com/lotatech/soft-homecare-app/pull/7/files#diff-072a53ef9cbdd5a81412cfcfd69cddda5736128eff8e1044fa5270546a837860R114)**

1. А зачем `setTimeout` ?
2. Нужно делать `clearTimeout` на `return` в `useEffect`
3. `console.log` на **121** строке
4. Зачем ты используешь в асинхронной функции `loginWithRememberMe` синтаксис `then catch` если есть `await`. А то у тебя получаеться все в перемешку 


**[src/screens/Chat/index.tsx](https://github.com/lotatech/soft-homecare-app/pull/7/files#diff-c311e631248cfc3f5992e01302886ae367e9fb7cb5a6cfddfc7392ebbeb73f38R104)**

1. `{format(parseISO(relatedVisitDate), MM_DD_YY)}`  такие вещи выноси в переменные из разметки. И по хорошему можно еще проверить дату на валидность или обернуть в `try catch` 


**[src/screens/ChatsInOrder/ChatItem/index.tsx](https://github.com/lotatech/soft-homecare-app/pull/7/files#diff-04af58b6bb9b975b794a2848214291ddde5e83ad3827d107ead138790090e44fR143)**

1. Тут тоже форматированние даты вынести в переменную на **143, 149** строке

2. Тут точно условия верные ? Может стоит весь блок обернуть в условие и не отрисовывать его вовсе нежели ты скрывешь только текст а блок остаеться? 

```
  <TextBase style={styles.dataMessage}>
    {initial_message_date &&
      format(parseISO(initial_message_date), MM_DD_YY_AND_HH)}
  </TextBase>

<TextBase style={styles.dataMessage}>
  {last_message_date &&
    format(parseISO(last_message_date), MM_DD_YY_AND_HH)}
</TextBase>
```


**[src/components/WebViewWrapper/index.tsx](https://github.com/lotatech/soft-homecare-app/pull/7/files#diff-f0943e724ebe6b808d88dea97fbe17355e81498107c9b5ae905a89fce189c270R3)**

1. Не нужно оставлять закоменченный код
2. Тут действительно `containerStyle={{backgroundColor: 'red'}}` просто красный нужен или ты просто делал для проверки и забыл убрать? 

**[src/components/WebViewWrapper/styles.ts](https://github.com/lotatech/soft-homecare-app/pull/7/files#diff-49f225b6482369e3cf0c596a5c47eed31417202015e2ede3cee94a2ab54f3407R26)**

1. Закоменченный код