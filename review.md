**[src/components/AppButton/AppButton.tsx](https://gitlab.com/egor.zheludkov/gr_admin/-/merge_requests/1/diffs#00408d8555e227148adfc2aa45fbca7898d7ee60_0_13)**

1. Делай переносы

```
const AppButton: React.FC<Props> = ({ title, onClick, type, disabled, className }) => {


  ...


const AppButton: React.FC<Props> = ({
  title,
  onClick,
  type,
  disabled,
  className,
  }) => {
```

**[src/components/AppInput/AppInput.tsx](https://gitlab.com/egor.zheludkov/gr_admin/-/merge_requests/1/diffs#6abd9f236dd907ecea01efa555a2533a10f2ab30_0_19)**

1. делай переносы

```
const AppInput = forwardRef<HTMLLabelElement | null, Props>(
  ({
    type,
    value,
    name,
    maxLength,
    placeholder,
    onChange,
    onBlur,
    isError,
    className,
    },
    ref
  ) => {
```


2. 

```
<AppInputLayout ref={ref} isEmpty={isEmpty} isError={isError} className={className}>

to 

<AppInputLayout 
  ref={ref} 
  isEmpty={isEmpty}
  isError={isError}
  className={className}
  >
```


3. Если `maxLength` у тебя будет равен нулю то у тебя в разметке будет неохиданная цифра ноль. Добавь двойное отрицание `!!maxLength`

```
 {maxLength && (
          <span className="Lenght">
            {value?.length}/{maxLength}
          </span>
        )}
```

**[src/pages/Login/Login.hook.ts](https://gitlab.com/egor.zheludkov/gr_admin/-/merge_requests/1/diffs#e1c9f356d6ddb1d550b8f48b7bebd729271397fd_0_48)**

1. Перенеси записывание токена в localStorage в интерсептор который на response. В нем проверяешь если в ответе есть токен тогда записываешь в localStorage

2. `setUserRights` разве не может делать `setIsAuthorized(true)` ?

**[src/pages/Login/Login.tsx](https://gitlab.com/egor.zheludkov/gr_admin/-/merge_requests/1/diffs#aaa26783830873e8480409c93f8a1688570b941c_0_11)**

1. Делай переносы

```
const {
    register,
    errors,
    requestError, 
    onSubmit,
    isLoading,
  } = useLoginHook();
```

2. А в следующем году менять год будешь ? Или же все таки делать год динамическим ?
```
  <span className="Copyright">© GrubRunner 2022</span>
```