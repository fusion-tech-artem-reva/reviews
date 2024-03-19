### STAFF 
Для развертывания проекта в `dev` режиме необходимо иметь 
- [Staff web (React)](https://git.fusion-tech.pro/fusion-staff/staff-web)
- [Staff CRM web (Angular)](https://git.fusion-tech.pro/fusion-staff/staff-crm-web)
- [Staff API (Express + TypeORM + Sequelize)](https://git.fusion-tech.pro/fusion-staff/staff-api)
- [OLD Staff API](https://git.fusion-tech.pro/fusion-staff/old-staff-api)
- Postgresql DB

**Флоу работы:**

- `Staff web (React)` отвечает за интерфейс основного стафф функционала и необходим для регистации/авторизации в приложении. Из него происходит переход на CRM стаффа (Staff CRM web).

- `Staff CRM web (Angular)` отвеает за функционалл CRM части. Работает с  `OLD Staff API` в паре. Все запросы в стафф CRM отсылаются в `OLD Staff API` через сокеты которые так же инициализированны на `OLD Staff API` сервере.

- `Staff API` (Express + TypeORM + Sequelize) отвечает за функционал основного стафф приложения.


### Конфигурация

**1. Staff Web**
 - Установить модули `npm install`
 - Запустить приложение `npm start`

**2. Staff CRM Web**
- node 16
- установить зависимость через angular cli 11 `sudo npm link @angular/cli@11 --legacy-peer-deps`
- изменить настройки `src/environments/environment` с `proxy` на `development` (Regular dev process)
- ng serve

Сокеты будут крутится на порте `4001` согласно конфигурации environment файла. 

**3. Staff API**
- node 16
- установить зависимости `npm install`
- необходиму  установать `sequlize` и `sequlize-cli` глобально - `npm install -g sequelize sequelize-cli`
- создать `.env` фаил и вынести креды для `BD` в него
```
POSTGRES_DB_HOST="localhost"
POSTGRES_DB_PORT="5432"
POSTGRES_DB_USER="postgres"
POSTGRES_DB_PASSWORD="postgres"
POSTGRES_DB_NAME="staff-fusion_local"
POSTGRES_DB_LOGGING="false"


LEGACY_SOCKETS_PORT="4001"
LEGACY_SOCKETS_ROOMS_HR="hr"
LEGACY_SOCKETS_ROOMS_ADMIN="admin"
```
- для начала необходимо запустить `npm run build`
- запустить миграции для sequelize - `npm run db:old:migrate:up`
- запустить миграции для typeorm - `npm run db:migrate:up`
- запустить `npm run start`



**4. Old Staff Api**
- node 16
- установить зависимости `npm install`
- изменить настройки `config > config.json > development > изменить на данные локальной бд, поднятой в staff api`
- изменить настройки `config > default config > development > изменить port, secret, url(port), dbConfig(username, password, dbName)`
- secret для токена назначить такой же как и в `Staff API` `.defaultEnv.TOKEN_SECRET`
- в  `sockets > notify.js` если нету условия как прописано ниже то добавить либо закоментировать код связанный с `webpush`
```
if (env !== 'development') {
  webpush.setVapidDetails(
    `mailto:${config.vapidMail}`,
    config.vapidPublicKey,
    config.vapidPrivateKey
  );
}
```