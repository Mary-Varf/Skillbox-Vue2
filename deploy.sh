#!/usr/bin/env sh

#остановить публиукацию при ошибках
set -e
#сборка приложения
npm run build

#переход в каталоге сборки
cd dist

#инициализация репозитория и загрузка кода на гит
git init
git add -A
git commit -m 'deploy'

git push -f https://github.com/Mary-Varf/vue-app.git master:gh-pages

cd -
