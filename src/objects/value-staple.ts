import { G, Rect, Text } from "@svgdotjs/svg.js";

export class ValueStaple extends G {
    setValue(value: number) {
        this.$value = value;
        this.$text.text(String(value));
        return this;
    }
    $textGap: number = 5;

    $rect: Rect;
    $text: Text;
    $value: number;

    // These attributes are always set by the set* methods called in the constructor,
    // hence the assertion that the property is initialized
    $stapleWidth!: number;
    $hideText!: boolean;
    $stapleHeight!: number;


    /**
     * Also call {@link init()} to finalize initialization. 
     * Note that init() needs to be called after the staple
     * is added to the DOM.
     */
    constructor(value: number, stapleWidth: number, stapleHeight: number) {
        super();
        this.$value = value;
        this.$text = this.text(String(value));
        
        this.$rect = this.rect(stapleWidth, stapleHeight);
        this.setStapleHeight(stapleHeight);
        this.setStapleWidth(stapleWidth);
        this.addClass("valueStaple")
    }

    /**
     * To finish initialization you should call the init method after the element
     * has been added to the DOM.
     * This method should also be called each time the size of the staples change,
     * to make sure that the text and rectangle are properly aligned.
     *
     * Positioning the group before it has finished initializing is not possible,
     * which is why this separate method is needed.
     */
    init() {
        this.$text.center(0, 0).dy(this.$textGap);
        if (this.$hideText) {
            this.$text.hide();
        }

        // Translate text down by half its height
        this.$text.node.style.transformBox = 'border-box';
        this.$text.node.style.transform = 'translateY(50%)';

        this.$rect.center(0, 0).dy(-(this.$stapleHeight) / 2);

        return this;
    }

    getValue(): number {
        return this.$value;
    }

    getStapleWidth(): number {
        return this.$stapleWidth;
    }

    hideText() {
        this.$hideText = true;
        this.$text.hide();
    }

    showText() {
        this.$hideText = false;
        this.$text.show();
    }

    getTextHeight(): number {
        return Number(this.height()) - this.$stapleHeight;
    }

    setStapleWidth(width: number): this {
        this.$stapleWidth = width;
        this.$hideText = width < 25
        this.$rect.width(width);
        return this;
    }

    setStapleHeight(height: number): this {
        this.$stapleHeight = height;
        this.$rect.height(height);
        return this;
    }
}
