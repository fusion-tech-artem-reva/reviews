**actions/sitter.tsx**

1. 389 строка - Напши в кочоле хотябы где эта ошибка произолшла

2. 383 `sitterId: any` ? 



**common/domain/payment/PaymentService.ts**

1. Убери 
```
console.log('tip', tip);
console.log('familyProcessingPercentFee', familyProcessingPercentFee);
```


**components/jobs/jobPay.tsx**

1. 425 `console.log('twentyPercent', twentyPercent);`


**components/legal/legalAcceptanceForm.tsx**


1. В классовом компоненете не нужно в стэйт пихать деструктуризацию. ПРосто пишешь только то поле которе хочешь обновить

```
        this.setState({
            ...this.state,
            isAgreedTwoAdultsPresent: !this.state.isAgreedTwoAdultsPresent,
        });


        будет

        this.setState({
             isAgreedTwoAdultsPresent: !this.state.isAgreedTwoAdultsPresent,
        })

```

и так ниже


2. 101 строка `console.log('churchReadOnly');`


**components/reviews/reviewDetailForm.tsx**

1. 151 строка закоменченный код


**components/safety/agreeModal.style.ts**

1. Почему так жесто 480 ? `height: deviceHeight - 480,`. А если устройство маленькое

**containers/jobs/ReviewSittersContainer/hooks.ts**

1. Я увидел вы используете Crashlytics а ты не юзаешь его в catch?

2. в функции на 162 строке завернуть в `try catch`


**containers/layouts/defaultLayout.tsx**

1. Закоменченный код на 76 стоке и на 205

**navigators/components/ChattingHeader/ChattingHeader.tsx**

1. `console.log('proxyNumber',proxyNumber)` ` console.log('KARAMBA');` `console.log('FFFF');`;


**services/api/utils.tsx**

1. `console.log('content', content);`
