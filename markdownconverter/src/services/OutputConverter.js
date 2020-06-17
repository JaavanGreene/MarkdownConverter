import React from 'react';

export class OutputConverter {
    /* 
        Appending markup to the DOM in this manner is generally frowned upon 
        but for the purpose of this example project I'll do it.
    */
    static ConvertToHtml(input) {
        let converted = this.convertMarkdown(input);
        return <div dangerouslySetInnerHTML={this.createMarkup(converted)} />;
    }

    static createMarkup(input) {
        return { __html: input };
    }

    /*
        Conversion is done by regular exression string replacement.
        Resource to help understand and test out Regular Expressions : https://regex101.com
        Output is done in an order of operations to be sure that certain dom elements can nest. 
        Namely paragraph is first to ensure that links within paragraphs can still function as such.
        Regular expressions allow for groupings based on the parenthesis placed in a regular expression.
        You can then reference those groupings from $1 to $9 as well as the entire match using $&
    */
    static convertMarkdown(input) {
        input = this.convertParagraphs(input);
        input = this.convertHeaders(input);
        input = this.convertLinks(input);
        return input;
    }

    /*
        Paragraph conversion just makes sure that a line doesn't start with the header formatting 
        and turns all of the text of that line into a paragraph tag
    */
    static convertParagraphs(input) {
        /* 
            replaces any lines that don't start with a header tag with a paragraph
            it is possible that lines start with a link and only contain said link. 
            This will be cleaned later
        */
        let regPara = new RegExp(`(^(?!#{1,6}\\s{1})).+`, 'gm')
        input = input.replace(regPara, `<p>$&</p>`);
        return input;
    }

    /*
        Header conversion checks that you have anywhere  from 1 to 6 #'s with at least one space 
        followed by the header text
    */
    static convertHeaders(input) {
        for (var i = 6; i >= 1; i--) {
            /* 
                selects characters matching '#n {anything but a line return} where n is the number of #'s and the corresponding header level.'
            */
            let regSelect = new RegExp(`^#{${i}}\\s{1}(.+)`, 'gm')
            /* 
                replaces the entire match with just the sectioned off portion being our inner value
            */
            input = input.replace(regSelect, `<h${i}>$1</h${i}>`);
        }
        return input;
    }

    /*
        The first regular expression converts any string in the format [text](link) into an html link
        The second removes any surrounding paragraph tags from links that stand alone without text before or after. 
    */
    static convertLinks(input) {
        let regLink = new RegExp(`\\[(.*?)\\]\\((.*?)\\)`, 'gm')
        input = input.replace(regLink, `<a href="$2" >$1</a>`);
        let regexCleanup = new RegExp(`^\\<p\\>(<a.*?>.*?\\<\\/a\\>)<\\/p>.*?$`, 'gm')
        input = input.replace(regexCleanup, `$1`);
        return input;
    }
}

export default OutputConverter;