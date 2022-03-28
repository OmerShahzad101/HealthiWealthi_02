/**
 * @description
 * A utility function to transform any string into its capitalized form; just like in CSS `text-transform: capitalize;`
 * @param {string} input Input string to transform
 * @returns {string} Transformed string
 */

export default function capitalize(input) {
    if (!input || typeof input !== 'string') {
        return;
    }

    return input.toLowerCase().replace(/\b\w/g, function (m) {
        return m.toUpperCase();
    });
}
