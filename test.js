const s = 'Liczba ($\\sqrt[3]{250}$ + $\\sqrt[3]{54}$) / ($\\sqrt[3]{250}$ - $\\sqrt[3]{54}$) jest równa:\nA) $\\sqrt[3]{76/49}$\nB) -1\nC) 4\nD) 4*$\\sqrt[3]{2}$';
const mathBlocks = [];
let res = s.replace(/\$([^$]+)\$/g, (match, content) => {
    mathBlocks.push(`$${content}$`);
    return `__MATH_BLOCK_${mathBlocks.length - 1}__`;
});
console.log(res);
console.log(mathBlocks);
