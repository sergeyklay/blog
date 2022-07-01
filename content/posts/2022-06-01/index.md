---
title: Настройка заголовков безопасности с помощью Netlify
date: 2022-06-01T22:00:40+02:00
draft: false
slug: nastrojka-zagolovkov-bezopasnosti-s-pomoshchyu-netlify
featured_image: 'data-security.jpeg'
tags:
  - netlify
  - security
  - http
---

Существует некоторый набор стандартных HTTP-заголовков, которые каждому веб-сайту желательно устанавливать, чтобы обеспечить базовый набор безопасности. В этой заметке рассматриваются такие заголовки и то, как и устанавливать на сайтах развернутых в Netlify.

<!--more-->

## Общие заголовки безопасности

Для начала, давайте рассмотрим базовые HTTP-заголовки --- они общие для всех запросов и обеспечивают базовый набор безопасности.

1. **Заголовок `Content-Security-Policy`**  --- помогает защитить ваш веб-сайт от атак типа {{< link src="https://ru.wikipedia.org/wiki/%D0%9C%D0%B5%D0%B6%D1%81%D0%B0%D0%B9%D1%82%D0%BE%D0%B2%D1%8B%D0%B9_%D1%81%D0%BA%D1%80%D0%B8%D0%BF%D1%82%D0%B8%D0%BD%D0%B3" hreflang="ru" target="_blank" rel="noopener noreferrer" >}}межсайтовый скриптинг{{< /link >}}, предоставляя список одобренного контента. Этот заголовок позволяет запретить использование контента, который не проходит проверку по правилам или который не должен быть использован в качестве контента. Настройка данного заголовка может показаться сложной, поэтому, если хотите углубиться в тему, посетите {{< link src="https://content-security-policy.com/" hreflang="en" target="_blank" rel="noopener noreferrer" >}}официальный сайт{{< /link >}}. Пример использования:
```
Content-Security-Policy: default-src 'https://example.com'; script-src  'unsafe-inline' 'https://example.com'; style-src 'unsafe-inline' 'https://example.com'; object-src 'none'
```

2. **Заголовок `X-Frame-Options`** --- этот заголовок говорит браузеру, хотите ли вы, чтобы ваш сайт находился в `iframe` или нет. В большинстве случаев вы этого не хотите, так как это позволяет использовать веб-сайт для {{< link src="https://ru.wikipedia.org/wiki/%D0%9A%D0%BB%D0%B8%D0%BA%D0%B4%D0%B6%D0%B5%D0%BA%D0%B8%D0%BD%D0%B3" hreflang="ru" target="_blank" rel="noopener noreferrer" >}}кликджекинга{{< /link >}}. Суть атаки проста --- посетителю показывается страница вашего веб-сайта, где он кликает по какой-то кнопке. На самом деле поверх этой страницы находится какая-то другая прозрачная страница, по кнопке на которой посетитель в действительности деле кликает. Пример использования:
```
X-Frame-Options: DENY
```

3. **Заголовок `X-XSS-Protection`** -- в старых браузерах (в основном в Safary) позволяет защитить ваш сайт от {{< link src="https://ru.wikipedia.org/wiki/%D0%9C%D0%B5%D0%B6%D1%81%D0%B0%D0%B9%D1%82%D0%BE%D0%B2%D1%8B%D0%B9_%D1%81%D0%BA%D1%80%D0%B8%D0%BF%D1%82%D0%B8%D0%BD%D0%B3" hreflang="ru" target="_blank" rel="noopener noreferrer" >}}XSS атак{{< /link >}}. Большинство браузеров понимает этот заголовок и при обнаружении прекращают загружать страницу при обнаружении попыток таких атак. Пример использования:
```
X-XSS-Protection: 1; mode=block
```

4. **Заголовок `X-Content-Type-Options`** --- позволяет запретить браузеру анализировать и изменять MIME-тип содержимого. Этот тип атак проверяет содержимое потока информации, чтобы попытаться определить формат файлов данных внутри него и добавить свою информацию. Пример использования:
```
X-Content-Type-Options: nosniff
```

5. **Заголовок `Referrer-Policy`** --- позволяет задать поведение браузера при обращении к странице из другого домена. По сути, этот заголовок контролирует, сколько информации о Referrer включается в запросы. Пример использования:
```
Referrer-Policy: same-origin
```

6. **Заголовок `Strict-Transport-Security`** --- позволяет защитить ваш сайт от перенаправления на незащищенные протоколы. Он сообщает браузерам всегда подключаться к вашему сайту через HTTPS и никогда не подключаться по HTTP. Пример использования:
```
Strict-Transport-Security: max-age=31536000; includeSubDomains
```

7. **Заголовок `Permissions-Policy`** --- Сообщает браузерам, какие функции браузера (геолокация, камера, микрофон и т.п.) разрешены или запрещены на вашем веб-сайте. Пример использования:
```
Permissions-Policy = "geolocation=(), gyroscope=(), magnetometer=()"
```

## Настройка заголовков в Netlify

Существует два способа установки заголовков в Netlify: добавление в файл конфигурации Netlify (`netlify.toml`) или добавление отдельного файла `_headers`.


### Файл конфигурации Netlify 

```toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "same-origin"
    Permissions-Policy = "accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=(), interest-cohort=()"
    Strict-Transport-Security = "max-age=31536000; includeSubDomains; preload"
```

### Отдельный файл `_headers`

```text
/*
  X-Frame-Options = "DENY"
  X-XSS-Protection = "1; mode=block"
  X-Content-Type-Options = "nosniff"
  Referrer-Policy = "same-origin"
  Permissions-Policy = "accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=(), interest-cohort=()"
  Strict-Transport-Security = "max-age=31536000; includeSubDomains; preload"
```

## Выводы

Установка заголовков безопасности должна дать вашему веб-сайту оценку типа A на таких сервисах, как {{< link src="https://securityheaders.com/?q=https%3A%2F%2Fserghei.blog&followRedirects=on" hreflang="en" target="_blank" rel="noopener noreferrer" >}}securityheaders.com{{< /link >}}, а осмысленное использование --- заставить любых тестировщиков безопасности считаться с вашим уровнем безопасности.

Настройка политики безопасности контента зависит от конкретного веб-сайта и может отличаться, например, если вы используете Google Analytics или другие сторонние скрипты. Учтите, при внедрении любой политики безопасности контента вы должны тщательно протестировать свой веб-сайт, чтобы убедиться, что все сторонние ресурсы и клиенты все еще работают с ним.

## Ссылки

- {{< link src="https://content-security-policy.com/" hreflang="en" target="_blank" rel="noopener noreferrer" >}}Content Security Policy Reference{{< /link >}}
- {{< link src="https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP" hreflang="en" target="_blank" rel="noopener noreferrer" >}}MDN: Content Security Policy (CSP){{< /link >}}
- {{< link src="https://securityheaders.com/" hreflang="en" target="_blank" rel="noopener noreferrer" >}}Security Headers{{< /link >}}
