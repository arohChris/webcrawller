const { normaliseUrl } = require('./crawl.js');

const { test, expect } =require('@jest/globals')

test('normaliseUrl strip protocol', () => {
    const input = 'https://blogs.boot.dev/path';
    const actual = normaliseUrl(input);
    const expected = 'blogs.boot.dev/path';
    expect(actual).toEqual(expected)
})

test('normaliseUrl strip trailling slash ', () => {
    const input = 'https://blogs.boot.dev/path/';
    const actual = normaliseUrl(input);
    const expected = 'blogs.boot.dev/path';
    expect(actual).toEqual(expected)
})

test('normaliseUrl strip http', () => {
    const input = 'https://blogs.boot.dev/path/where/';
    const actual = normaliseUrl(input);
    const expected = 'blogs.boot.dev/path/where';
    expect(actual).toEqual(expected)
})