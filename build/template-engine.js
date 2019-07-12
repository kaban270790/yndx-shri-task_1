/**
 * @param  {object} bemjson — Структура блоков интерфейса в формате BEMJSON
 * @return {string} HTML разметка страницы
 */
module.exports = function (bemjson) {
    if (bemjson instanceof Array) {
        return bemjson.reduce((html, bemjson) => html + factoryTag(bemjson).toString(), '');
    }
    return factoryTag(bemjson).toString();
};
/**
 * @param {{block:string, elem:string?, mods:Object, elemMods:Object, attrs:Object, content:Object|[]}} bemjson
 * @return {Tag}
 */
const factoryTag = function (bemjson) {
    let tag = new Tag(bemjson.tag);
    let attrs = bemjson.attrs || {};
    let classNames = (attrs.class ? [attrs.class] : []).concat(factoryBemClassNames(bemjson));
    if (classNames.length > 0) {
        attrs.class = classNames.join(' ');
    }
    tag.setAttrs(factoryAttr(attrs));
    if (bemjson.content && typeof(bemjson.content) === 'object') {
        if (bemjson.content instanceof Array) {
            bemjson.content.map((bemjson) => {
                    tag.addContent(factoryTag(bemjson));
                });
        } else {
            tag.addContent(factoryTag(bemjson.content));
        }
    }
    return tag;
};

/**
 * @param {object} attrs
 * @returns {string[]}
 */
const factoryAttr = function (attrs = {}) {
    return Object.keys(attrs).reduce((list, name) => {
        list.push(name + "=\"" + attrs[name] + "\"");
        return list;
    }, []);
};
/**
 * @param {object} blockData
 * @returns {string[]}
 */
const factoryBemClassNames = function (blockData) {
    let classNames = [];
    if (!blockData.block) {
        return classNames;
    }
    let mods = blockData.mods || {};
    let element = blockData.elem || null;
    if (element) {
        mods = blockData.elemMods || {};
    }
    classNames.push(createClassName(blockData.block, element));
    classNames = Object.keys(mods).reduce((list, name) => {
        list.push(createClassName(blockData.block, element, name, mods[name]));
        return list;
    }, classNames);

    let mix = blockData.mix || [];
    classNames = mix.reduce((list, blockData) => {
        return list.concat(factoryBemClassNames(blockData));
    }, classNames);

    return classNames;
};
/**
 * @param {string} block
 * @param {string | null} element
 * @param {string | null} modifier
 * @param {string | null} modifierValue
 * @return {string}
 */
const createClassName = function (block, element = null, modifier = null, modifierValue = null) {
    let className = block;
    if (element) {
        className += '__' + element;
    }
    if (modifierValue) {
        className += '_' + modifier;
        if (modifierValue && modifierValue !== true) {
            className += '_' + modifierValue;
        }
    }
    return className;
};
const TAGS_AUTO_CLOSING = [
    'link', 'br', 'input', 'img', 'hr', 'br'
];

class Tag {

    /**
     * @param {string | null} name
     */
    constructor(name = 'div') {
        this.name = name;
        this.content = [];
        this.attrs = [];
        this.isAutoClose = TAGS_AUTO_CLOSING.indexOf(this.name) >= 0;
    }

    /**
     * @param {string[]} attrs
     */
    setAttrs(attrs) {
        this.attrs = attrs;
        return this;
    }

    /**
     * @param {Tag} item
     */
    addContent(item) {
        this.content.push(item);
        return this;
    }

    /**
     * @returns {string}
     */
    randOpenTag() {
        let params = [this.name];
        params = params.concat(this.attrs);
        return '<' + params.join(' ') + (this.isAutoClose ? ' /' : '') + '>';
    }

    /**
     * @returns {string}
     */
    randCloseTag() {
        return '</' + this.name + '>';
    }

    /**
     * @returns {string}
     */
    randContent() {
        return this.content.reduce((html, item) => {
            return html + item.toString();
        }, '');
    }

    /**
     * @returns {string}
     */
    toString() {
        let html = this.randOpenTag();
        if (!this.isAutoClose) {
            html += this.randContent();
            html += this.randCloseTag();
        }
        return html;
    }
};
class Attribute {
    /**
     * @param {string} name
     * @param {string} value
     */
    constructor(name, value) {
        this.name = name;
        this.value = value;
    }

    /**
     * @returns {string}
     */
    toString() {
        return this.name + "=\"" + this.value + "\"";
    }
    static factory(attrs = {}) {
        return Object.keys(attrs).reduce((list, name) => {
            list.push(new this(name, attrs[name]));
            return list;
        }, []);
    }
};
