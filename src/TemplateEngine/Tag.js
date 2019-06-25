const Attribute = require('./Attribute.js');

const TAGS_AUTO_CLOSING = [
    'link', 'br', 'input', 'img', 'hr', 'br'
];

module.exports = class Tag {

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
