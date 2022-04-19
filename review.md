**PR10**

**[src/Pages/Kitchens/Kitchens.hook.ts](https://github.com/grubrunner/food-delivery-admin/pull/10/files#diff-e63848ee51b28c8a8b9a06e23ab56eaad3f6cb21a04a223fc40c3a1efcd1f877R14)**

1. Ты тут пишешь `string | null` но при этом начальное значение `undefined`
```
const [requestError, setRequestError] = useState<string | null>();
```

2. `newKitchen` создаешь с `id = 0`. Не может быть такого что ты можешь создать несколько `newKitchen` и у них будет у все `id=0` ?

```
const handleCreateKitchen = useCallback(async () => {
    if (!pathRestaurantId || !kitchensResponse) return;
    const newKitchen = {
      id: 0,
      name: `Kitchen ${kitchensResponse.length + 2}`,
      isInOperation: false
    };
```



**[src/Pages/Kitchens/Kitchens.tsx](https://github.com/grubrunner/food-delivery-admin/pull/10/files#diff-4e6611b453f1e6d2b2f83152801e9c6556b155a0d79b9a4c6356cd54e6d465a6R30)**

1. Это прям так и надо ?
```
<span>#</span>
```

2. По хорошему это у тебя должен быть отдельный компонент. Который ты уже будешь мапать

```
<div key={kitchen.id} className="Form-Row FormItem">
    <span className="FormItem-Index">{idx + 1}</span>

    <span className="FormItem-Name">{kitchen.name}</span>

    <div className="FormItem-Row">
      <Switch
        isActive={kitchen.isInOperation}
        onSelect={value => handleSwitch(kitchen.id, value)}
      />

      <div
        className="FormItem-Delete"
        onClick={() => handleDeleteKitchen(kitchen.id)}
      />
    </div>
  </div>
```
