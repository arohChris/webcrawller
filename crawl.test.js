const { normaliseURL, getURLsFromHTML } = require('./crawl.js');

const { test, expect } =require('@jest/globals')

test('normaliseUrl strip protocol', () => {
    const input = 'https://blogs.boot.dev/path';
    const actual = normaliseURL(input);
    const expected = 'blogs.boot.dev/path';
    expect(actual).toEqual(expected)
})

test('normaliseUrl strip trailling slash ', () => {
    const input = 'https://blogs.boot.dev/path/';
    const actual = normaliseURL(input);
    const expected = 'blogs.boot.dev/path';
    expect(actual).toEqual(expected)
})

test('normaliseUrl strip http', () => {
    const input = 'https://blogs.boot.dev/path/where/';
    const actual = normaliseURL(input);
    const expected = 'blogs.boot.dev/path/where';
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML absolute', () => {
    const inputHTMLBody = `
    <html>
         <body>
             <div>
                 <a href ="https://blogs.boot.dev/path/"> boot.devb blog path one </a>
             </div>

         </body>
    </html>
    `;
    const inputBaseUrl = 'https://blogs.boot.dev'
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseUrl);
    const expected = ['https://blogs.boot.dev/path/'];
    expect(actual).toEqual(expected)
})

 test('getURLsFromHTML relative', () => {
    const inputHTMLBody = `

    <html>
         <body>
             <div>
                 <a href ="https://blogs.boot.dev/path1/"> boot.devb blog path one </a>
             </div>
             <div>
                 <a href ="/path2/"> boot.devb blog path two </a>
             </div>
         </body>
    </html>
    `;

    
    const inputBaseUrl = 'https://blogs.boot.dev'
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseUrl);
    const expected = ['https://blogs.boot.dev/path1/','https://blogs.boot.dev/path2/'];
    expect(actual).toEqual(expected)
}) 

test('getURLsFromHTML invalid', () => {
    const inputHTMLBody = `
    <html>
         <body>
             <div>
                 <a href ="invalid"> invalid </a>
             </div>

         </body>
    </html>
    `;
    const inputBaseUrl = 'https://blogs.boot.dev'
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseUrl);
    const expected = [];
    expect(actual).toEqual(expected)
})