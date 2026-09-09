import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkMath from 'remark-math';
import remarkRehype from 'remark-rehype';
import rehypeKatex from 'rehype-katex';
import rehypeStringify from 'rehype-stringify';

const processor = unified()
  .use(remarkParse)
  .use(remarkMath)
  .use(remarkRehype)
  .use(rehypeKatex)
  .use(rehypeStringify);

const text1 = '$\\\\sqrt[3]{250}$';
const text2 = '$\\sqrt[3]{250}$';

console.log("text1: ", text1, " => ", processor.processSync(text1).toString());
console.log("text2: ", text2, " => ", processor.processSync(text2).toString());
