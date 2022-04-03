

**src/screens/chatList/hook.ts**

1. Обсудить необходимость `useLayoutEffect`

```
useLayoutEffect(() => {
    if (isFirstRender.current) {
      loadedGetChats();
    }
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      return;
    }
    loadedGetChats();
  }, [unreadMessages]);

  ...

   useLayoutEffect(() => {
    dispatch(getChatsThunk());
  }, [ownGroups?.length, groups?.length]);
```


**src/screens/profile/components/posts/hook.ts**

1. Не нужна деструктуризация

```
const { userPosts } = useAppSelector((store) => store.community);
```

**src/screens/profile/hook.ts**

1. Значения зависящие от `userProfile` я бы вынест в один `useMemo`:
```
 let contentHeight = 427;
  let snapValue = hp(427);

  if (userProfile) {
    snapValue = hp(97);
    contentHeight = 97;
  }

  let title = 'my-profile';
  let headerOnPress;

  if (userProfile) {
    title = 'back';
    headerOnPress = goBack;
  }

  Вместо этого получаем:

  const {
    contentHeight,
    snapValue,
    title,
    headerOnPress
  } = useMemo(() => {
    return {
      contentHeight: userProfile ? 97 : 427,
      snapValue: userProfile ? hp(97) : hp(427),
      title: userProfile ? 'back' : 'my-profile,
      headerOnPress: userProfile ? goBack : undefined
    }
  }, [userProfile])

```


**src/screens/uploadPostFile/hook.ts**

1. Чем обоснованно то что тебе нужен `useLayoutEffect` тут ? 
```
useLayoutEffect(() => {
    (async () => {
      const isPermission = await getLibraryPhotos();
      if (isPermission) {
        dispatch(getLibraryPhotosThunk());
      }
    })();
  }, []);
```
2. А что с типом ? 
```
const positionRef = useRef<any | undefined>(undefined);
```

3. А что такое 367 ?
```
 const dX = 367 / image.width;
const dY = 367 / image.height;
```

**src/screens/uploadPostFile/index.tsx**

1. Перенос строк
```
 {img.map((item) => (
  <ImageBackground style={styles.previewImageContainer} source={{ uri: item }} resizeMode="contain" />
```

____
**Убери логи в этих файлах**:
- src/store/chats/index.ts
- src/store/user/index.ts
- src/store/community/index.ts

**src/core/hooks/useTabBar.ts**

1. Тут точно нужен `await` в `showTabBarFunc` и `hideTabBarFunc` ?


**src/screens/changePhone/components/select/hook.ts**
1. Не страшно, но типизация тут не нужна. У тебя уже селектор типизирован
```
const { countries, country } = useAppSelector((store: IStore) => store.countries);
```


**src/screens/changePhone/components/selectList/index.tsx**
1. Переносы
```
<SearchInput type="small" value={search} onChangeText={handleChangeSearch} placeholder="Search country..." />
```


**src/screens/changePhone/hook.ts**
1. Уже где то такое было. Но при таком условии `0` не будет учитываться
```
 if (idx && idx >= 0 && dialCode) 
```

**src/screens/changePhonePreview/hook.ts**
1. Убери деструктуризацию
```
 const { user } = useAppSelector((store) => store.user);
```

**src/screens/changePhonePreview/index.tsx**
1. Добавь переносы
```
 <Typography styles={[appStyles.regularText, styles.title]} text="change-number" />
<Text style={[appStyles.regularText, styles.phone]}>
  {phone}
</Text>
<Typography styles={[appStyles.normalText, styles.description]} text="change-number-description" />
<LinearGradient

```


**src/screens/chat/components/message/index.tsx**
1. Нужен ли закоменченный код

```
 <Pressable onPress={() => { goToUserProfile(author?.id); }}>
  <NoAvatar author={author} />
  {/* {author?.avatarUrl
    ? <FastImage source={{ uri: `${API.URL}${author?.avatarUrl}` }} />
    : <NoAvatar author={author} />} */}
</Pressable>
```

**src/screens/chat/hook.ts**
1. Это зачем так? Это я тебя сбил с толку чтобы ты не использовала деструкутуризацию ?

В этом случае деструктуризацию можно использовать так как ты все тянешь из одного стора `chats`
```
 const chatId = useAppSelector((store) => store.chats.chatId);
  const messageId = useAppSelector((store) => store.chats.messageId);
  const messages = useAppSelector((store) => store.chats.messages);
  const editVisibility = useAppSelector((store) => store.chats.editVisibility);
  const chatName = useAppSelector((store) => store.chats.chatName);
  const groupId = useAppSelector((store) => store.chats.groupId);
  const unreadChatMessages = useAppSelector((store) => store.chats.unreadChatMessages);
  const isLoading = useAppSelector((store) => store.chats.isLoading);
  const channelIsLoading = useAppSelector((store) => store.chats.channelIsLoading);
  const messageIsLoading = useAppSelector((store) => store.chats.messageIsLoading);

```

а лучше было бы сделать иначе. Так и глазу приятно и ну путаешься. А то слишком много полей для деструктуризации
```
const chatStore = useAppSelector((store) => store.chats);
...
остальной код

return {
    handleChangeChannelVisibility,
    channelVisibility,
    hideChannel,
    messages: chatStore.messages,
    chatName: chatStore.chatName,
    ...
}

```