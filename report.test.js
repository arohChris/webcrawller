
const { test, expect } = require('@jest/globals')
const { sortPages } = require('./report.js')

test('sort 2 Pages', () => {
     
    const input = {
        'https://wagslane.dev/path' : 1,
        'https://wagslane.dev' : 3
    } 
    const actual = sortPages(input)
    const expected = [   
                     ['https://wagslane.dev' , 3],
                     ['https://wagslane.dev/path' , 1]
                   ]
    expect(actual).toEqual(expected)
})

test('sort 5 Pages', () => {
     
    const input = {
        'https://wagslane.dev/path4': 4,
        'https://wagslane.dev3' : 3,
        'https://wagslane.dev/path9' : 9,
        'https://wagslane.dev6' : 6,
        'https://wagslane.dev/path10': 10
    } 
    const actual = sortPages(input)
    const expected = [   
                     ['https://wagslane.dev/path10', 10],
                     ['https://wagslane.dev/path9', 9],
                     ['https://wagslane.dev6', 6],
                     ['https://wagslane.dev/path4', 4],
                     ['https://wagslane.dev3', 3]
                   ]
    expect(actual).toEqual(expected)
})