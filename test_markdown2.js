import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkMath from 'remark-math';
import remarkRehype from 'remark-rehype';
import rehypeKatex from 'rehype-katex';

const processor = unified()
  .use(remarkParse)
  .use(remarkMath)
  .use(remarkRehype)
  .use(rehypeKatex);

const text1 = '$\\\\sqrt[3]{250}$';
const text2 = '$\\sqrt[3]{250}$';
const text3 = '$\\\\\\\\sqrt[3]{250}$';

console.log("text1 KaTeX tree: ", JSON.stringify(processor.runSync(processor.parse(text1))));
console.log("text2 KaTeX tree: ", JSON.stringify(processor.runSync(processor.parse(text2))));
