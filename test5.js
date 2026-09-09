const str = "Liczba (__MATH_BLOCK_0__ + __MATH_BLOCK_1__) / (__MATH_BLOCK_2__ - __MATH_BLOCK_3__) jest równa:";
const lines = str.split('\n');
const processedLines = lines.map(line => {
    const tokens = line.split(/(\s+)/);
    let result = '';
    let currentMath = [];

    const flushMath = () => {
        if (currentMath.length > 0) {
            let actualMath = currentMath.join('');
            if (actualMath.includes('__MATH_BLOCK_')) {
                result += actualMath;
            } else {
                result += "$" + actualMath + "$";
            }
            currentMath = [];
        }
    };

    for (let i = 0; i < tokens.length; i++) {
        let token = tokens[i];
        if (!token.trim()) {
            if (currentMath.length > 0) currentMath.push(token);
            else result += token;
            continue;
        }

        const matchTrailing = token.match(/^([\s\S]*?)([.,:;?!)\]}]+)$/);
        let coreToken = token;
        let tokenTrailing = '';

        if (matchTrailing && token.includes('__MATH_BLOCK_')) {
            coreToken = matchTrailing[1];
            tokenTrailing = matchTrailing[2];
        }

        const matchLeading = coreToken.match(/^([(\[{]+)([\s\S]*)$/);
        let tokenLeading = '';
        if (matchLeading && coreToken.includes('__MATH_BLOCK_')) {
            tokenLeading = matchLeading[1];
            coreToken = matchLeading[2];
        }

        if (coreToken.includes('__MATH_BLOCK_')) {
            if (tokenLeading) {
                flushMath();
                result += tokenLeading;
            }
            currentMath.push(coreToken);
            if (tokenTrailing) {
                flushMath();
                result += tokenTrailing;
            }
            continue;
        }
        
        let isMath = token.match(/^[:+\-*/=<>^|_]+$/);
        
        if (isMath) {
            if (token === '/' && currentMath.length === 0) {
                flushMath();
                result += token;
            } else {
                currentMath.push(token);
            }
        } else {
            flushMath();
            result += token;
        }
    }
    flushMath();
    return result;
});
console.log(processedLines[0]);
