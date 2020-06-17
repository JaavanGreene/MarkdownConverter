import React from 'react';

export class OutputConverter {
    // Appending markup to the DOM in this manner is generally frowned upon but for the purpose of this example project I'll do it. *
    static ConvertToHtml(input) {
        let converted = this.convertMarkdown(input);
        return <div dangerouslySetInnerHTML={this.createMarkup(converted)} />;
    }

    static convertMarkdown(input) {
        input = this.convertLinks(input);
        input = this.convertParagraphs(input);
        input = this.convertHeaders(input);
        return input;
    }

    static convertLinks(input) {
        let regLink = new RegExp(`\\[(.*?)\\]\\((.*?)\\)`, 'gm')
        input = input.replace(regLink, `<a href="$2" >$1</a>`);
        return input;
    }

    static convertParagraphs(input) {
        //replaces any lines that don't start with a header tag with a paragraph
        let regPara = new RegExp(`(^(?!#{1,6}\\s{1})).+`, 'gm')
        input = input.replace(regPara, `<p>$&</p>`);
        return input;
    }

    static convertHeaders(input) {
        for (var i = 6; i >= 1; i--) {
            // selects characters matching '#n {anything but a line return} where n is the number of #'s'
            let regSelect = new RegExp(`^#{${i}}\\s{1}(.+)`, 'gm')
            // replaces the entire match with just the sectioned off portion being our inner value
            input = input.replace(regSelect, `<h${i}>$1</h${i}>`);
        }
        return input;
    }

    static createMarkup(input) {
        return { __html: input };
    }
}

export default OutputConverter;