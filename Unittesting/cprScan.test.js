const inputTextNoCPR = require('./cprScan');

test('String with no cpr-pattern returns the string unchanged', () => {
    expect(inputTextNoCPR("Hello")).toBe("Hello");
})

test('String with one cpr-pattern returns the string, where the cpr-pattern is replaced with XXXXXX-XXXX', () => {
    expect(inputTextNoCPR("Hello 241200-4026")).toBe("Hello XXXXXX-XXXX");
})

test('String with multiple cpr-patterns returns the string, where all cpr-patterns is replaced with XXXXXX-XXXX', () => {
    expect(inputTextNoCPR("Hello 241200-4026 good 060616-5034")).toBe("Hello XXXXXX-XXXX good XXXXXX-XXXX");
})

test('String with other types of socical security number, eg American, will return the string unchanged', () => {
    expect(inputTextNoCPR("Hello 101-01-3091")).toBe("Hello 101-01-3091");
})
