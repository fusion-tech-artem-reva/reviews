**[src/hooks/useKitchens.ts](https://github.com/grubrunner/food-delivery-admin/pull/11/files#diff-b9ae885da8f2f86e4cf2a0777d1b530f26f33ae2ee7b8a483a97bf0be18ed3edR54)**

1. Если `kitchens` будет пустой массив ? Тогда у тебя упадет тут так ка к `kitchens[0]` будет `undefined` 

```
    if (kitchens && !selectedKitchenId) {
      selectKitchen(kitchens[0].id);
    }
```

**[src/hooks/useSections.ts](https://github.com/grubrunner/food-delivery-admin/pull/11/files#diff-c72a6a39c2792562569f2b7e56003020f1eefbc541ba6221750d044635f0d1b1R38)**

1. Нет смысла в таких случаях делать проверку на `length` и возвращать `undefined` так как у тебя и так если не будет `data` то вернется  `undefined`

```
 const sections: ISection[] | undefined = useMemo(() => {
    const adapteredSections = data?.data.map(adaptResponseSections);

    return adapteredSections?.length ? adapteredSections : undefined;
  }, [data?.data]);

  можно же просто

   const sections: ISection[] | undefined = useMemo(() => {
    return data?.data.map(adaptResponseSections);
  }, [data?.data]);

```



**[src/hooks/useSectionsList.ts](src/hooks/useSectionsList.ts)**

1. Делай переносы 

```
[lastSelected, sections, selectSection, setSections, selectedSections, getIsSelected]
```