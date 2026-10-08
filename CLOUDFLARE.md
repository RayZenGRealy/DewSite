# Публикация DEW на Cloudflare Pages

Сейчас сайт работает как статический магазин: товары и корзина, без серверных заказов и оплаты. Поэтому первый релиз размещаем через Cloudflare Pages.

## 1. Подключить GitHub

1. Открой https://dash.cloudflare.com
2. Выбери **Workers & Pages** → **Create application** → **Pages** → **Import an existing Git repository** (названия пунктов могут отличаться).
3. Подключи GitHub-аккаунт **RayZenGRealy**.
4. Выбери репозиторий **RayZenGRealy/DewSite** и ветку **main**.

## 2. Параметры сборки

- Project name: `dewsite` (или свободное имя)
- Production branch: `main`
- Framework preset: **Next.js (Static HTML Export)**; если пресета нет, выбери **None**
- Build command: `npm run build`
- Build output directory: `out`
- Root directory: `/` (корень репозитория)
- Environment variable при необходимости: `NODE_VERSION=22`

Затем нажми **Save and Deploy** и дождись успешной сборки.

В репозитории уже есть `next.config.ts` с `output: "export"`. Он нужен, чтобы сборка создавала директорию `out` для Cloudflare Pages.

## 3. Открыть сайт

Cloudflare выдаст адрес вроде `https://dewsite.pages.dev` при условии, что такое имя свободно. Следующие изменения в ветке `main` будут публиковаться автоматически.

## 4. Собственный домен

В настройках проекта Cloudflare Pages открой **Custom domains** → **Set up a custom domain**, введи свой домен и следуй шагам DNS.

## Важное ограничение

**Сейчас это демонстрационный магазин:** на страницах примерные товары и цены, иллюстрации вместо фото; оформление заказа не отправляет данные, оплаты нет. Не принимай настоящие заказы до подключения сервера, базы и политики обработки персональных данных.

**Будущая админка:** для входа по email, реальных заказов и изменения товаров на сервере переходим с Pages static export на **Cloudflare Workers** (рекомендуемая текущая технология Cloudflare для Next.js — vinext). Тогда необходимо убрать `output: "export"` и проверить совместимость, а секреты и список администраторов хранить только в защищённой серверной конфигурации.

Ссылки: https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-static-nextjs-site/ и https://developers.cloudflare.com/workers/framework-guides/web-apps/nextjs/
