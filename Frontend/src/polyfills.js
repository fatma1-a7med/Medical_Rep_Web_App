// polyfills.js
const { JSDOM } = require('jsdom');

// Create a mock DOM environment
const dom = new JSDOM('<!doctype html><html><body></body></html>');

// Get the mock window and document objects
global.window = dom.window;
global.document = dom.window.document;