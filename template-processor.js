'use strict';

function TemplateProcessor(template) {
    this.template = template;
}

TemplateProcessor.prototype.fillIn = function (dictionary) {
    const regex = /{{(.*?)}}/g;
    const filledTemplate = this.template.replace(regex, (match, property) => {
        // Trim property to remove any leading or trailing spaces
        property = property.trim();

        // Check if the property exists in the dictionary
        if (Object.prototype.hasOwnProperty.call(dictionary, property)) {
            // Replace the property with its value from the dictionary
            return dictionary[property];
        } else {
            // If the property is not found, replace it with an empty string
            return '';
        }
    });

    return filledTemplate;
};
