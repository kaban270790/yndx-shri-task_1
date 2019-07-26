# yndx-shri-task_1

Для стилей используется препроцессор SASS, в качестве сборщика настроил webpack

В папке pages хранятся собранные json для:
1. Страницы:
    * `index`
    * `product`
    * `collect`
    * `content`
2. Блоки:
    * `block_articles`
    * `block_commercial`
    * `block_cover`
    * `block_event`
    * `block_history`
    * `block_offer`
    * `block_product`
    * `block_subscription`

Что бы открыть страницу, достаточно открыть в браузере страницу `/pages/template.html#page_name`, где:
- `page_name` - название страницы

P.S.
При подгонке верстки под макет, пришлось немного покостелить, т.к. блоки проходили, все хорошо, а текст на страницах `content` и `product` местами был смещен на 1-2 пикселя. Все что пришлось закостелить описано в комментариях к конкретному блоку кода блока `text`
