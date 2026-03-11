// data/sentences.js
const Sentences = {
    basic: [
        "I go to work.",
        "She eats breakfast.",
        "They watch TV.",
        "We play games.",
        "The dog is big."
    ],
    intermediate: [
        { correct: "He goes to work.", incorrect: "He go to work." },
        { correct: "She doesn't like apples.", incorrect: "She don't like apples." },
        { correct: "I have been waiting for two hours.", incorrect: "I am waiting since two hours." },
        { correct: "Do you know where the station is?", incorrect: "Do you know where is the station?" }
    ],
    phrasalVerbs: [
        { verb: "give up", meaning: "stop trying", example: "Don't give up on your dreams!" },
        { verb: "look after", meaning: "take care of", example: "Can you look after my dog?" }
    ]
};

window.Sentences = Sentences;
