**[src/core/hooks/useMessaging.ts](https://gitlab.com/krypt_app/krypt_frontend/-/merge_requests/10/diffs#b7a57c3eb0469a253248210b11338716c8021eed_0_16)**

1. Слишком намешано в фукции `requestUserPermission`. Вроде про permissions а на деле там и токен полуить и канал созадть. Я бы предложить разбить. Это не требование изменить прям как я написал. Но желательно подумать на тем как можно разбить на логические части.

```
async function requestUserPermission() {
    try {
      let authStatus = await messaging().requestPermission();
      if (authStatus === messaging.AuthorizationStatus.NOT_DETERMINED) {
        authStatus = await messaging().requestPermission();
      }

      const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED || (
        authStatus === messaging.AuthorizationStatus.PROVISIONAL);
      return enabled;
    } catch (ex) {
      console.error('REQUEST USER PERMISSION ERROR:', ex);
    }
  }

  const initializeDeviceToken = async () => {
    try {     
      const token =  await messaging().getToken();
      saveTokenToAsyncStorage(token);

      messaging().onTokenRefresh((token) => {
          saveTokenToAsyncStorage(token);
      });
    } catch(err) {
       console.error('REQUEST TOKEN ERROR:', ex);
    }
  }

  const createNotificationChanel = () => {
     PushNotification.createChannel(
          {
            channelId: 'krypt-channel',
            channelName: 'My channel',
            importance: Importance.HIGH,
          },
          (created) => {
            console.log(`createChannel returned '${created}'`);
          },
        );
  }

  useEffect(() => {
  (async () => {
    try {
      const isPermissionsGranted = await requestUserPermission();
      await messaging().registerDeviceForRemoteMessages();

      if (!isPermissionsGranted) return;
      createNotificationChanel();
      initializeDeviceToken()

    } catch (err) {
      ...
    }
  })
  }, [])


```


**[src/navigation/tabNavigator/index.tsx](https://gitlab.com/krypt_app/krypt_frontend/-/merge_requests/10/diffs#a98664edb721558b5d06a2963e03f9e3a87e3e32_13_37)**

1. По хорошему такое количество диспатчей объеденить в один если имееться возможность создать один который будет тригеррить эти 3 - 4 изменения (https://redux.js.org/style-guide/#avoid-dispatching-many-actions-sequentially)

2. Похоче что ты забыла тут `return` перед `messaging().onMessage(onMessageReceived);`. 

А вообще мне не понятно для чего тебе тут IIFE ([Immediately Invoked Function Expression](https://developer.mozilla.org/ru/docs/Glossary/IIFE)). Что мешает тебе просто написать

```
useEffect(() => {
    const unsubscribe = (() => {
      messaging().onMessage(onMessageReceived);
    })();

    return unsubscribe;
  }, []);

  Что мешает тебе просто написать

  useEffect(() => {
    const unsubscribe = messaging().onMessage(onMessageReceived);

    return unsubscribe;
  }, []);
  ```


**[src/screens/chat/components/header/hook.ts](https://gitlab.com/krypt_app/krypt_frontend/-/merge_requests/10/diffs#f1a974af2679b5d7755141bcbb36c154ab1af064_22_37)**

1. Пофикси название `handleSetChannelChannelCount` chanelchanel


**[src/screens/group/components/socials/index.tsx](https://gitlab.com/krypt_app/krypt_frontend/-/merge_requests/10/diffs#86b802a2de7b68cf07ad4c7160ee9181243dfa82_20_19)**


1. Возможно ты ошиблась `handlePressSocial(name, name)` ? не `name` и `name` в аргументах должно быть  а `url` и `name`. А может и нет но тогда как то странно зачем одно и тоже прокидывать


**[src/screens/liveChart/hook.ts](https://gitlab.com/krypt_app/krypt_frontend/-/merge_requests/10/diffs#deee9a00c4d88a07a244860a72a1b31ae91a6d8b_0_23)**

1. Засунь это в `useMemo` 

```
const coinName = useMemo(() => {
  const coin = coins.find((item) => item.apiCode === apiCode);
  return coin?.name.toLowerCase().replace(' ', '-');
}, [coin, apiCode])
```

**src/screens/postDetails/hook.ts**

1. Тут опять миссандерстэндинг. Если вытаскиваешь из одно участка стора данные и тянешь большу их часть можно не разбивать на кучу селекторов.

```
  const parentComment = useAppSelector((store) => store.community.parentComment);
  const postId = useAppSelector((store) => store.community.postId);
  const isLoading = useAppSelector((store) => store.community.isLoading);
  const visibilityBottomSheet = useAppSelector((store) => store.community.visibilityBottomSheet);
  const deleted = useAppSelector((store) => store.community.deleted);
  const postDetails = useAppSelector((store) => store.community.postDetails);
```


**src/screens/market/components/coins/index.tsx**

1. 25 строка `console.log('item', item);`


**src/screens/postDetails/components/comment/hook.ts**

1. 41 строка `console.log('KKKKKKKKKKKKK', comment);`

**src/screens/postDetails/components/replyingComment/index.tsx**

1. 18 - `console.log('parentComment', parentComment);`

**src/screens/postDetails/index.tsx**

1. `console.log('parentComment', parentComment);`

2. Закоменченный код нужен?

**src/navigation/tabNavigator/index.tsx**
1. Закоменченный код ?

**src/screens/searchCommunity/index.tsx**

1. Что то пробелов многовато 

```
<KeyboardAvoidingView behavior={isIOS ? 'padding' : 'height'}           style={{flex: 1}}>
```
2. 

```
<Pressable
    style={{flex: 1}}
    onPress={() => { Keyboard.dismiss() }}>
      <EmptyScreen text="no-results" />
  </Pressable>


  напиши без стрелочной функции
  onPress={Keyboard.dismiss}>

```

**src/shared/postInfo/index.tsx**
1. Вынеси стили из инлайновых

```
 <View style={{ alignContent: 'center', alignItems: 'center' }}>
```

2. Важно! Нету key

```
<View style={styles.postDetailIndicatorsContainer}>
              {
              indicators.map((_, index) => {
                const selected = (index + 1) === currentIndex;
                return (
                  <View
                  key <<< ОТСУТСТВУЕТ
                    style={[
                      styles.postDetailIndicator,
                      selected && styles.postDetailActiveIndicator,
                    ]}
                  />
                );
```


**src/store/community/index.ts**

1. А тебе функция `initialState` не подходит разве для того чтобы обнулить стэйт в `resetCommunityStore`, а не для каждого полля писать? (так же и в других слайсах)