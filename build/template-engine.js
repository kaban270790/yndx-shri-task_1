const TemplateEngine = require('../src/TemplateEngine/TemplateEngine.js');
/**
 * @param  {object} obj — Структура блоков интерфейса в формате BEMJSON
 * @return {string} HTML разметка страницы
 */
export default function (obj) {
    return TemplateEngine(obj);
}
