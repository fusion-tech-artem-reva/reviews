**[src/Components/AsidePanel/AsidePanel.hook.ts](https://github.com/grubrunner/food-delivery-admin/pull/6/files#diff-2b694b74dd3d81a86ba8a03c4f30391d82545fb1e9825a545f3b5ec47e24fde0R89)**

1. Это условие выполнится даже в случае с пустым массивом `clients`. И тогда `clients[0].id` упадет с ошибкой

```
useEffect(() => {
    if (clients && (!selectedClient || !clientId)) {
      selectClient(clients[0].id);
    }
  }, [clients, selectClient, selectedClient, clientId]);
```


**[src/Components/AsidePanel/AsidePanel.tsx](https://github.com/grubrunner/food-delivery-admin/pull/6/files#diff-2d4fdfe9cbf104d46a0805262b8bca397f21327935e7ed0530c3ef3f832fb2a8R33)**

1. Опять же если мы говорим о том что `clients` должен быть не пустой массив то тогда такая проверка не подходит 

```
 {clients && (
  <div className="AsidePanel-Clients">
    <Dropdown
    ....
```
