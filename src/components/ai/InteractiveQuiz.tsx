import React from "react";
import { ChevronLeft, ChevronRight, CheckCircle, XCircle, RotateCcw, Trophy } from "lucide-react";
import Button from "../common/Button/Button";
import { QuizItem } from "../../types/aiMaterial";
import { useInteractiveQuiz } from "../../hooks/ai/useInteractiveQuiz";

interface InteractiveQuizProps {
    quizItems: QuizItem[];
}

export default function InteractiveQuiz({ quizItems }: InteractiveQuizProps) {
    const {
        answers,
        currentQuestion,
        showResults,
        selectAnswer,
        nextQuestion,
        previousQuestion,
        resetQuiz,
        getCurrentAnswer,
        getScore,
        totalQuestions,
    } = useInteractiveQuiz(quizItems);

    const currentAnswer = getCurrentAnswer();
    const score = getScore();

    if (showResults) {
        return (
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
                <div className="bg-gradient-to-r from-orange-600 to-orange-700 px-8 py-6">
                    <h2 className="text-2xl font-bold text-white flex items-center">
                        <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mr-3">🏆</div>
                        Resultados del Quiz
                    </h2>
                </div>
                <div className="p-8">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full mb-4">
                            <Trophy className="w-10 h-10 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">
                            ¡Quiz Completado!
                        </h3>
                        <div className="text-4xl font-bold text-orange-600 mb-2">
                            {score.percentage}%
                        </div>
                        <p className="text-slate-600">
                            {score.correct} de {score.total} preguntas correctas
                        </p>
                    </div>

                    <div className="space-y-4 mb-8">
                        {quizItems.map((question, index) => {
                            const answer = answers.find(a => a.questionIndex === index);
                            return (
                                <div key={index} className="p-4 border border-slate-200 rounded-lg">
                                    <div className="flex items-start gap-3 mb-3">
                                        <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                                            answer?.isCorrect 
                                                ? 'bg-green-100 text-green-600' 
                                                : 'bg-red-100 text-red-600'
                                        }`}>
                                            {answer?.isCorrect ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-medium text-slate-900 mb-2">
                                                Pregunta {index + 1}: {question.question}
                                            </p>
                                            <p className="text-sm text-slate-600 mb-2">
                                                Tu respuesta: <span className="font-medium">{answer?.selectedAnswer}</span>
                                            </p>
                                            <p className="text-sm text-slate-600 mb-2">
                                                Respuesta correcta: <span className="font-medium text-green-600">{question.answer}</span>
                                            </p>
                                            <div className="bg-slate-50 p-3 rounded-lg">
                                                <p className="text-sm text-slate-700">
                                                    <strong>Explicación:</strong> {question.explanation}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="flex justify-center">
                        <Button
                            onClick={resetQuiz}
                            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg flex items-center gap-2"
                        >
                            <RotateCcw className="w-4 h-4" />
                            Repetir Quiz
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    const currentQuizItem = quizItems[currentQuestion];

    return (
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
            <div className="bg-gradient-to-r from-orange-600 to-orange-700 px-8 py-6">
                <h2 className="text-2xl font-bold text-white flex items-center">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mr-3">❓</div>
                    Preguntas de Autoevaluación
                </h2>
                <div className="mt-2 text-orange-100">
                    Pregunta {currentQuestion + 1} de {totalQuestions}
                </div>
            </div>
            <div className="p-8">
                <div className="mb-6">
                    <h3 className="text-xl font-semibold text-slate-900 mb-4">
                        {currentQuizItem.question}
                    </h3>
                    
                    <div className="space-y-3">
                        {currentQuizItem.options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => selectAnswer(currentQuestion, option)}
                                className={`w-full p-4 text-left border-2 rounded-lg transition-all duration-200 ${
                                    currentAnswer?.selectedAnswer === option
                                        ? currentAnswer.isCorrect
                                            ? 'border-green-500 bg-green-50'
                                            : 'border-red-500 bg-red-50'
                                        : 'border-slate-200 hover:border-orange-300 hover:bg-orange-50'
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                                        currentAnswer?.selectedAnswer === option
                                            ? currentAnswer.isCorrect
                                                ? 'border-green-500 bg-green-500 text-white'
                                                : 'border-red-500 bg-red-500 text-white'
                                            : 'border-slate-300'
                                    }`}>
                                        {currentAnswer?.selectedAnswer === option && (
                                            currentAnswer.isCorrect ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />
                                        )}
                                    </div>
                                    <span className="text-slate-700">{option}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {currentAnswer && (
                    <div className="mb-6 p-4 bg-slate-50 border border-slate-200 rounded-lg">
                        <p className="text-sm text-slate-700">
                            <strong>Explicación:</strong> {currentQuizItem.explanation}
                        </p>
                    </div>
                )}

                <div className="flex justify-between items-center">
                    <Button
                        onClick={previousQuestion}
                        disabled={currentQuestion === 0}
                        className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        Anterior
                    </Button>

                    <div className="text-sm text-slate-500">
                        {answers.length} de {totalQuestions} respondidas
                    </div>

                    <Button
                        onClick={nextQuestion}
                        disabled={!currentAnswer}
                        className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {currentQuestion === totalQuestions - 1 ? 'Ver Resultados' : 'Siguiente'}
                        <ChevronRight className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
} 