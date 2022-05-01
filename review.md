**[src/Pages/Seats/Seats.hook.ts](https://github.com/grubrunner/food-delivery-admin/pull/13/files#diff-fd1069807af65ef55eb4189e7ce522073b0af0848d175dcd83bb07f0a11b49deR15)**

И

 **[src/Pages/Sections/Sections.hook.ts](https://github.com/grubrunner/food-delivery-admin/pull/13/files#diff-f40845d751f325b87d7059ace8808fcbd4a9470780b0876e3a6c546418d09f86R15)**

 1. Одно и тоже для управлением загрузкой файлов. Предлагаю вынести все что связано с файлами в хук который будет принимать коллбэк который нужно исполнить для того чтобы загрузить файлы.