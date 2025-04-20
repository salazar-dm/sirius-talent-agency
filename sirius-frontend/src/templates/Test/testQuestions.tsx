import Question from "../../types/QuestionType.tsx";

export const testQuestions: Question[] = [
    {
        id: 1,
        type: "multiple",
        question: "What documents must be provided during registration?",
        options: [
            "Workplace Safety Certificate",
            "Photos with actors from previous sets",
            "Valid identification documents",
            "A recipe for cinnamon rolls",
        ],
        correctAnswers: [0, 2],
    },
    {
        id: 2,
        type: "single",
        question: "What document must be completed before shooting?",
        options: ["Voucher", "Minor Injury Report", "Residence Form", "A contract with the devil"],
        correctAnswers: [2],
    },
    {
        id: 3,
        type: "single",
        question: "When do you usually receive your payment?",
        options: ["On the day of the shoot", "Within 1–2 days", "Within 2–4 weeks", "After 12 months"],
        correctAnswers: [2],
    },
    {
        id: 4,
        type: "single",
        question: "What amount is the agency's commission based on?",
        options: ["On the net amount", "On the gross amount"],
        correctAnswers: [1],
    },
    {
        id: 5,
        type: "single",
        question: "What is the commission percentage for Non-Union/AABP performers?",
        options: ["15%", "Call us, and we’ll give you a random number between 1 and 100", "10%"],
        correctAnswers: [2],
    },
    {
        id: 6,
        type: "single",
        question: "How early should you arrive before Call Time?",
        options: [
            "It’s okay to be 10 minutes late",
            "10 minutes before",
            "15–30 minutes before",
            "Better to come the night before",
        ],
        correctAnswers: [2],
    },
    {
        id: 7,
        type: "single",
        question: "What should you do upon arriving on set?",
        options: [
            "Eat immediately",
            "Take pictures of the set",
            "Check in with Sign-In / AD",
            "Introduce yourself to the lead actors",
        ],
        correctAnswers: [2],
    },
    {
        id: 8,
        type: "single",
        question: "What is the command for background actors to start moving?",
        options: ["Background!", "Reset!", "Action!"],
        correctAnswers: [0],
    },
    {
        id: 9,
        type: "single",
        question: "What do you do if you need to go to the restroom?",
        options: [
            "Walk off silently",
            "Say “Going 10-1” to the AD",
            "Feel free to call us (please don’t)",
        ],
        correctAnswers: [1],
    },
    {
        id: 10,
        type: "single",
        question: "Can you bring a friend to set with you if they were not booked?",
        options: [
            "Yes, and brother, father, mother, dog",
            "No"
        ],
        correctAnswers: [1],
    },
    {
        id: 11,
        type: "single",
        question: "Are you allowed to take pictures during filming?",
        options: [
            "Yes, and send them to all your relatives and friends",
            "No"
        ],
        correctAnswers: [1],
    },
    {
        id: 12,
        type: "single",
        question: "What happens if you don’t show up and don’t notify the agency?",
        options: [
            "You’ll be fined",
            "We’ll say “Good job darling!”",
            "You’ll be reassigned (and won’t like it)"
        ],
        correctAnswers: [0],
    },
    {
        id: 13,
        type: "multiple",
        question: "What is NOT allowed on set?",
        options: [
            "Talking to lead actors without permission",
            "Leaving without signing your voucher",
            "Leaving holding without instructions",
            "Telling the AD when you need a break"
        ],
        correctAnswers: [0, 1, 2],
    },
    {
        id: 14,
        type: "single",
        question: "Who must accompany a minor performer?",
        options: [
            "A friend",
            "A parent or legal guardian",
            "A guardian angel"
        ],
        correctAnswers: [1],
    },
    {
        id: 15,
        type: "single",
        question: "What is a voucher for?",
        options: [
            "To get lunch",
            "To prove you worked and get paid",
            "To boost morale"
        ],
        correctAnswers: [1],
    },
    {
        id: 16,
        type: "single",
        question: "What should you do with your voucher at the end of the day?",
        options: [
            "Burn it",
            "Sign it and keep a copy (keep the copy until you receive your cheque)",
            "Laminate it and hang it on the wall"
        ],
        correctAnswers: [1],
    },
    {
        id: 17,
        type: "single",
        question: "What is RABS?",
        options: [
            "An online shop",
            "A digital voucher system",
            "A casting director"
        ],
        correctAnswers: [1],
    },
    {
        id: 18,
        type: "multiple",
        question: "What should you bring to set?",
        options: [
            "2–3 outfit options",
            "A pillow",
            "Your ID and documents",
            "A pen"
        ],
        correctAnswers: [0, 2, 3],
    },
    {
        id: 19,
        type: "single",
        question: "When should you confirm your call time?",
        options: [
            "Within an hour of receiving it",
            "We’ll just assume you saw it",
            "One hour before you leave the house"
        ],
        correctAnswers: [0],
    },
    {
        id: 20,
        type: "single",
        question: "Why join the union?",
        options: [
            "Because it’s trendy",
            "To increase your Instagram followers",
            "It gives you more rights"
        ],
        correctAnswers: [2],
    }
];
