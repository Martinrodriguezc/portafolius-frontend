import { useState } from "react";
import { QuizItem, QuizAnswer } from "../../types/aiMaterial";

export function useInteractiveQuiz(quizItems: QuizItem[]) {
    const [answers, setAnswers] = useState<QuizAnswer[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState<number>(0);
    const [showResults, setShowResults] = useState<boolean>(false);

    const selectAnswer = (questionIndex: number, selectedAnswer: string) => {
        const question = quizItems[questionIndex];
        const isCorrect = selectedAnswer === question.answer;
        
        const newAnswer: QuizAnswer = {
            questionIndex,
            selectedAnswer,
            isCorrect,
            explanation: question.explanation,
        };

        setAnswers(prev => {
            const filtered = prev.filter(a => a.questionIndex !== questionIndex);
            return [...filtered, newAnswer];
        });
    };

    const nextQuestion = () => {
        if (currentQuestion < quizItems.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setShowResults(true);
        }
    };

    const previousQuestion = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    const resetQuiz = () => {
        setAnswers([]);
        setCurrentQuestion(0);
        setShowResults(false);
    };

    const getCurrentAnswer = () => {
        return answers.find(a => a.questionIndex === currentQuestion);
    };

    const getScore = () => {
        const correctAnswers = answers.filter(a => a.isCorrect).length;
        return {
            correct: correctAnswers,
            total: quizItems.length,
            percentage: Math.round((correctAnswers / quizItems.length) * 100),
        };
    };

    return {
        answers,
        currentQuestion,
        showResults,
        selectAnswer,
        nextQuestion,
        previousQuestion,
        resetQuiz,
        getCurrentAnswer,
        getScore,
        totalQuestions: quizItems.length,
    };
} 