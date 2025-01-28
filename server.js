import express from 'express';
import fetch from 'node-fetch';
import { decode } from 'html-entities';
import { LeetCode } from 'leetcode-query';

const app = express();

app.get('/api/blog/article/data-structure/:slug', async (req, res) => {
    const slug = req.params.slug;
    const response = await fetch(`https://backend.takeuforward.org/api/blog/article/data-structure/${slug}`);
    const data = await response.json();
    const encodedString = data.content;
    const unicodeDecoded = encodedString.replace(/\\u([\dA-F]{4})/gi, (match, group) =>
        String.fromCharCode(parseInt(group, 16))
    );
    const fullyDecodedString = decode(unicodeDecoded);

    res.json({
        content: fullyDecodedString
    });
});

app.get('/api/leetcode/problem/:titleSlug', async (req, res) => {
    const titleSlug = req.params.titleSlug;
    const leetcode = new LeetCode();
    const problem = await leetcode.problem(titleSlug);
    res.json({
        problem: problem
    });
});

app.get('/', async (req, res) => {
    const leetcode = new LeetCode();
    const user = await leetcode.user("dhyey2075");
    res.json({
        user: user
    });
});

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});