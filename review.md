**pages/index.tsx**

1. используй `try catch` в `getStaticProps`;


**src/components/Footer/Footer.tsx**

1. Тут в разметке у тебя появиться `0` если массив пустой

```
{socials.length && (
				<Socials className="Footer-Socials" socials={socials} />
			)}
```


**src/components/Footer/components/Socials/Socials.tsx**
1. Я бы добавил еще `index` в ключ а не только `icon`
2. Не нужно везде пихать `passHref`

```
<Link key={icon}
```

**src/components/Footer/components/Subscription/Subscription.tsx**
1. У вас используются переводы, а тут вставлен просто текст
```
<span className="Subscription-Title">Sign up to stay in the loop of the latest news</span>
```

**src/components/Header/Header.constants.ts**

1. тут тоже текст у тебя статический и не учитывает переводы


**src/components/LanguageSwitch/LanguageSwitch.tsx**
1. текст без учета первода `alt='Change lang'`

**src/hooks/useLanguage.ts**
1. Не уверен что тебе нужна эта логика. Ты же можешь вытащить текущий язык из i18