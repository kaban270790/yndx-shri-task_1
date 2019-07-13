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
 * @param {
 *  {
 *      tag:string|boolean?,
 *      block: string,
 *      elem: string?,
 *      mods: Object?,
 *      elemMods: Object?,
 *      attrs: Object?,
 *      html: string?
 *      cls: string?,
 *      content:Object|Object[]|string?,
 *      mix:Object|Object[]?
 * }
 *} bemjson
 * @return {Tag|string}
 */
const factoryTag = function (bemjson) {
    if (bemjson.html) {
        return bemjson.html;
    }
    let tag = new Tag(bemjson.tag);
    let attrs = bemjson.attrs || {};
    let classNames = [].concat(
        attrs.class || null,
        bemjson.cls || null,
        factoryBemClassNames(bemjson)
    ).filter((name) => !!name);
    if (classNames.length > 0) {
        attrs.class = classNames.join(' ');
    }
    tag.setAttrs(factoryAttr(attrs));
    if (bemjson.content) {
        switch (typeof (bemjson.content)) {
            case "object":
                if (bemjson.content instanceof Array) {
                    bemjson.content.map((bemjson) => {
                        if (typeof bemjson === 'string') {
                            tag.addContent(bemjson);
                        } else {
                            tag.addContent(factoryTag(bemjson));
                        }
                    });
                } else {
                    tag.addContent(factoryTag(bemjson.content));
                }
                break;
            case "string":
                tag.addContent(bemjson.content);
                break;
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
    if (blockData.mix) {
        if (blockData.mix instanceof Array) {
            classNames = mix.reduce((list, blockData) => {
                return list.concat(factoryBemClassNames(blockData));
            }, classNames);
        } else {
            classNames.push(factoryBemClassNames(blockData.mix));
        }
    }

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
     * @param {Tag|string} item
     */
    addContent(item) {
        this.content.push(item);
        return this;
    }

    /**
     * @returns {string}
     */
    randOpenTag() {
        if (this.name === false) {
            return '';
        }
        let params = [this.name];
        params = params.concat(this.attrs);
        return '<' + params.join(' ') + (this.isAutoClose ? ' /' : '') + '>';
    }

    /**
     * @returns {string}
     */
    randCloseTag() {
        if (this.name === false) {
            return '';
        }
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
}
