**src/Pages/Login/Login.hook.ts**
1. Вместо `any` сделай чуть красивее:
```
interface LocationState {
   from: { pathname: string }
}
const location = useLocation();
const locationState = location.state as LocationState;

useEffect(() => {
  ...
  const from = location.state

}, [...])

```


**src/hooks/useVenues.ts**

1. Деструктуризация не нужна

```
 const { clientId } = useAppSelector(({ main }) => main);

 просто 

  const clientId = useAppSelector(({ main }) => main.clientId);


```


**src/store/main/thunks.ts**
1.  Зачем тут `undefined`
```
const { data, error } = await tokenAuth(undefined);
```

