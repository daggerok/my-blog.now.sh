---
layout: MyFooteredLayout
lang: ru-RU
type: post
author: Maksim Kostromin <daggerok@gmail.com>
date: '2019/02/23 23:36:57 GMT+0200'
meta:
  - name: keywords
    content: jpa, postgres, spring-boot, PostgresSQL, Spring Boot, JPA
title: "Method PgConnection createClob() is not yet implemented"
description: |
  При использовании Postgres и Spring Boot JPA можно столкнуться
  с ошибкой типа Method PgConnection createClob() is not yet implemented.
category: note
tags:
  - postgres
  - spring-boot
---

Если в логах spring-boot / postgres придложения видно примерно такое:

```bash
  Caused by: java.sql.SQLFeatureNotSupportedException: 
  Method org.postgresql.jdbc.PgConnection.createClob() is not yet implemented.
```

то пофиксить это можно, добавлением следующего конфига в `src/main/resources/application.yaml` файл:

```yaml
spring:
  jpa:
    properties:
      hibernate:
        temp:
          use_jdbc_metadata_defaults: false
```
