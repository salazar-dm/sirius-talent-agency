type QuestionType = "single" | "multiple";

type Question = {
    id: number;
    type: QuestionType;
    question: string;
    options: string[];
    correctAnswers: number[];
};

export default Question