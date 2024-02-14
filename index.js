const express = require('express');
const axios = require('axios');
const shuffle = require('lodash.shuffle');

const app = express();


app.use(express.json());


app.get('/quiz', async (req, res) => {
    try {
        const category = req.query.category || 'gk';
        let apiUrl = '';

       
        if (category === 'gk') {
            apiUrl = `https://opentdb.com/api.php?amount=1&category=9&difficulty=medium&type=multiple`;
        } else if (category === 'music') {
            apiUrl = `https://opentdb.com/api.php?amount=1&category=12&difficulty=medium&type=multiple`;
        } else if (category === 'videogame') {
            apiUrl = `https://opentdb.com/api.php?amount=1&category=15&difficulty=medium&type=multiple`;
        } else if (category === 'naturescience') {
            apiUrl = `https://opentdb.com/api.php?amount=1&category=17&difficulty=medium&type=multiple`;
        } else if (category === 'computerscience') {
            apiUrl = `https://opentdb.com/api.php?amount=1&category=18&difficulty=medium&type=multiple`;
        } else if (category === 'math') {
            apiUrl = `https://opentdb.com/api.php?amount=1&category=19&difficulty=medium&type=multiple`;
        } else if (category === 'mythology') {
            apiUrl = `https://opentdb.com/api.php?amount=1&category=20&difficulty=medium&type=multiple`;
        } else if (category === 'sports') {
            apiUrl = `https://opentdb.com/api.php?amount=1&category=21&difficulty=medium&type=multiple`;
        } else if (category === 'geography') {
            apiUrl = `https://opentdb.com/api.php?amount=1&category=22&difficulty=medium&type=multiple`;
        } else if (category === 'history') {
            apiUrl = `https://opentdb.com/api.php?amount=1&category=23&difficulty=medium&type=multiple`;
        } else if (category === 'politics') {
            apiUrl = `https://opentdb.com/api.php?amount=1&category=24&difficulty=medium&type=multiple`;
        } else if (category === 'art') {
            apiUrl = `https://opentdb.com/api.php?amount=1&category=25&difficulty=medium&type=multiple`;
        } else if (category === 'celebrity') {
            apiUrl = `https://opentdb.com/api.php?amount=1&category=26&difficulty=medium&type=multiple`;
        } else if (category === 'anime') {
            apiUrl = `https://opentdb.com/api.php?amount=1&category=31&difficulty=medium&type=multiple`;
        } else if (category === 'cartoon') {
            apiUrl = `https://opentdb.com/api.php?amount=1&category=32&difficulty=medium&type=multiple`;
        } else {
            return res.status(400).json({ error: 'Invalid category' });
        }

        const response = await axios.get(apiUrl);
        const quizData = response.data.results[0];
        const { question, correct_answer, incorrect_answers } = quizData;

      
        const options = shuffle([...incorrect_answers, correct_answer]);

      
        const optionsWithLetters = options.map((option, index) => ({
            letter: String.fromCharCode(65 + index), 
            answer: option
        }));

      
        const correctAnswerLetter = optionsWithLetters.find(option => option.answer === correct_answer).letter;

        const formattedQuestion = {
            question,
            options: optionsWithLetters,
            correct_answer: correct_answer,
            correct_answer_letter: correctAnswerLetter
        };

        res.json(formattedQuestion);
    } catch (error) {
        console.error('Error fetching quiz question:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
