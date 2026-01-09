'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { CheckCircle, XCircle, Award, RotateCcw, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface QuizPlaygroundProps {
  questions: QuizQuestion[];
  passingScore: number; // percentage (e.g., 70)
  onComplete?: (score: number, passed: boolean) => void;
  moduleSlug?: string;
  lessonSlug?: string;
}

type QuizState = 'taking' | 'reviewing' | 'completed';

export function QuizPlayground({ 
  questions, 
  passingScore,
  onComplete,
  moduleSlug,
  lessonSlug
}: QuizPlaygroundProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(
    new Array(questions.length).fill(null)
  );
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizState, setQuizState] = useState<QuizState>('taking');

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const hasSelectedAnswer = selectedAnswers[currentQuestionIndex] !== null;

  // Calculate score
  const correctAnswers = selectedAnswers.filter((answer, index) => 
    answer === questions[index].correctIndex
  ).length;
  const scorePercentage = Math.round((correctAnswers / questions.length) * 100);
  const passed = scorePercentage >= passingScore;

  const handleSelectAnswer = (optionIndex: number) => {
    if (quizState === 'reviewing') return; // Can't change answers in review mode
    
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = optionIndex;
    setSelectedAnswers(newAnswers);
    setShowExplanation(false);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowExplanation(false);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setShowExplanation(false);
    }
  };

  const handleCheckAnswer = () => {
    setShowExplanation(true);
  };

  const handleSubmitQuiz = async () => {
    setQuizState('completed');
    
    // Save score to database if moduleSlug and lessonSlug are provided
    if (moduleSlug && lessonSlug) {
      try {
        await fetch('/api/quiz/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            moduleSlug,
            lessonSlug,
            score: scorePercentage,
            questionsTotal: questions.length,
            questionsCorrect: correctAnswers
          })
        });
      } catch (error) {
        console.error('Failed to save quiz score:', error);
      }
    }

    // Callback to parent component
    if (onComplete) {
      onComplete(scorePercentage, passed);
    }
  };

  const handleRetry = () => {
    setSelectedAnswers(new Array(questions.length).fill(null));
    setCurrentQuestionIndex(0);
    setShowExplanation(false);
    setQuizState('taking');
  };

  const handleReview = () => {
    setQuizState('reviewing');
    setCurrentQuestionIndex(0);
    setShowExplanation(false);
  };

  // Quiz Completed View
  if (quizState === 'completed') {
    return (
      <div className="h-full flex items-center justify-center p-6">
        <div className="max-w-2xl w-full text-center">
          <div className={cn(
            "w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6",
            passed ? "bg-green-100" : "bg-orange-100"
          )}>
            {passed ? (
              <Award className="w-12 h-12 text-green-600" />
            ) : (
              <RotateCcw className="w-12 h-12 text-orange-600" />
            )}
          </div>

          <h2 className="text-3xl font-bold mb-2">
            {passed ? '🎉 Congratulations!' : 'Keep Practicing!'}
          </h2>
          
          <p className="text-gray-600 mb-6">
            You scored <span className="font-bold text-2xl text-gray-900">{scorePercentage}%</span>
          </p>

          <div className="bg-gray-50 rounded-lg p-6 mb-8 border border-gray-200">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-gray-900">{correctAnswers}</div>
                <div className="text-sm text-gray-600">Correct</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{questions.length - correctAnswers}</div>
                <div className="text-sm text-gray-600">Incorrect</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{questions.length}</div>
                <div className="text-sm text-gray-600">Total</div>
              </div>
            </div>
          </div>

          {passed ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <p className="text-green-800">
                ✓ You've passed! (Minimum: {passingScore}%)
              </p>
            </div>
          ) : (
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
              <p className="text-orange-800">
                You need {passingScore}% to pass. You can retake the quiz to improve your score.
              </p>
            </div>
          )}

          <div className="flex gap-3 justify-center">
            <Button variant="outline" onClick={handleReview} className="gap-2">
              Review Answers
            </Button>
            {!passed && (
              <Button onClick={handleRetry} className="gap-2">
                <RotateCcw className="w-4 h-4" />
                Retake Quiz
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Question View (Taking or Reviewing)
  const selectedAnswer = selectedAnswers[currentQuestionIndex];
  const isCorrect = selectedAnswer === currentQuestion.correctIndex;

  return (
    <div className="h-full flex flex-col">
      {/* Progress Bar */}
      <div className="px-6 pt-6 pb-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">
            Question {currentQuestionIndex + 1} of {questions.length}
          </span>
          {quizState === 'reviewing' && (
            <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded font-medium">
              Review Mode
            </span>
          )}
        </div>
        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary-600 transition-all duration-300"
            style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="flex-1 overflow-y-auto p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">
          {currentQuestion.question}
        </h3>

        {/* Options */}
        <div className="space-y-3 mb-6">
          {currentQuestion.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrectOption = index === currentQuestion.correctIndex;
            const showAsCorrect = showExplanation && isCorrectOption;
            const showAsWrong = showExplanation && isSelected && !isCorrect;

            return (
              <button
                key={index}
                onClick={() => handleSelectAnswer(index)}
                disabled={quizState === 'reviewing'}
                className={cn(
                  "w-full text-left p-4 rounded-lg border-2 transition-all",
                  "hover:border-primary-300 hover:bg-primary-50",
                  isSelected && !showExplanation && "border-primary-500 bg-primary-50",
                  showAsCorrect && "border-green-500 bg-green-50",
                  showAsWrong && "border-red-500 bg-red-50",
                  !isSelected && !showAsCorrect && !showAsWrong && "border-gray-200"
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="flex-1 text-gray-900">{option}</span>
                  {showAsCorrect && <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 ml-2" />}
                  {showAsWrong && <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 ml-2" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {showExplanation && (
          <div className={cn(
            "p-4 rounded-lg border-2 mb-6",
            isCorrect ? "bg-green-50 border-green-200" : "bg-blue-50 border-blue-200"
          )}>
            <div className="flex items-start gap-3">
              {isCorrect ? (
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              ) : (
                <div className="w-5 h-5 flex-shrink-0">
                  <div className="w-5 h-5 rounded-full border-2 border-blue-600 flex items-center justify-center">
                    <span className="text-xs font-bold text-blue-600">i</span>
                  </div>
                </div>
              )}
              <div className="flex-1">
                <p className="font-semibold mb-1 text-gray-900">
                  {isCorrect ? 'Correct!' : 'Not quite'}
                </p>
                <p className="text-sm text-gray-700">{currentQuestion.explanation}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between bg-white">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </Button>

        <div className="flex gap-2">
          {!showExplanation && hasSelectedAnswer && quizState === 'taking' && (
            <Button variant="outline" onClick={handleCheckAnswer}>
              Check Answer
            </Button>
          )}

          {!isLastQuestion ? (
            <Button 
              onClick={handleNext}
              disabled={!hasSelectedAnswer && quizState === 'taking'}
              className="gap-2"
            >
              Next Question
              <ArrowRight className="w-4 h-4" />
            </Button>
          ) : (
            quizState === 'taking' && selectedAnswers.every(a => a !== null) && (
              <Button 
                onClick={handleSubmitQuiz}
                className="gap-2 bg-green-600 hover:bg-green-700"
              >
                Submit Quiz
                <CheckCircle className="w-4 h-4" />
              </Button>
            )
          )}

          {quizState === 'reviewing' && (
            <Button onClick={() => setQuizState('completed')} variant="outline">
              Back to Results
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
