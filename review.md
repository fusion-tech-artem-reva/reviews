**[src/Pages/SectionsServed/SectionsServed.hook.ts](https://github.com/grubrunner/food-delivery-admin/pull/12/files#diff-aa5a3e0382433b9951b5dc6f4cf4d8e49ef18678c5c38d2f305b06b74979c3a8R47)**

1. Удали закоменцечнный кодище
2. `selectedServedSections` может быть пустым массивом так как проверка на пустой массив отсутствует и таким образом у тебя упадет 

```
if (selectedServedSections[0].servedSectionId) {
  const { error } = await deleteServedSection({
    sectionId: selectedServedSections[0].servedSectionId
  });
```

**[src/api/menu.ts](https://github.com/grubrunner/food-delivery-admin/pull/12/files#diff-f9c086eb515f3962057e8faf0de7cacb897c7fdefbe1aa3c37e95ba041b6c0c1R39)**

1. Еще во всех апихах ты делаешь проверку на ошибку одинаковую. Вынеси это в отдельную функцию и используй её аля 

```
type ResponseError = {
  error: string;
}

function getResponseError(error: any): ResponseError {
  if (Axios.isAxiosError(error) && ( 
    typeof error.response?.data.error === "string")
  ) {
      return { error: error.response.data.error };
    }

    return { error: error.message };
}
```

**[src/hooks/useMenuItems.ts](https://github.com/grubrunner/food-delivery-admin/pull/12/files#diff-690aaf15695bdf1c45ec4ae6eaaf42f2f502b5e997d1e581c5df552616df2e97R44)**

1. Тоже что и в 11 PR - нет смысла в таких случаях делать проверку на `length` и возвращать `undefined` так как у тебя и так если не будет `menuItems` то вернется  `undefined`


**[src/hooks/useRestaurants.ts](https://github.com/grubrunner/food-delivery-admin/pull/12/files#diff-48e560777304eb08fe544864bff860764ed03f2bda776f70d6b2fc42d8ddcde6R73)**

1. `restaurants[0].id` может упасть так как нету проверки на длину массива

```
const selectRestaurantId = pathRestaurantId ?? restaurants[0].id;
```