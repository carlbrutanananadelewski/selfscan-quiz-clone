import React, { useState } from "react";
import { QUIZ_QUESTIONS } from "../data/quiz-questions";
import {
  nextQuestion,
  QUESTION_ORDER,
  type LeadCaptureAnswer,
  type QuestionId,
  type QuizAnswers,
} from "../data/quiz-flow";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function Quiz() {
  const [currentQuestionId, setCurrentQuestionId] =
    useState<QuestionId>("q1");
  const [history, setHistory] = useState<QuestionId[]>([]);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const { toast } = useToast();

  const question = QUIZ_QUESTIONS.find(
    (candidate) => candidate.id === currentQuestionId,
  )!;
  const isFirst = history.length === 0;
  const isLast = currentQuestionId === "q14";
  const progressIndex = QUESTION_ORDER.indexOf(currentQuestionId);
  const progress = Math.round(
    (progressIndex / (QUESTION_ORDER.length - 1)) * 100,
  );

  const handleNext = () => {
    const destination = nextQuestion(currentQuestionId, answers);
    if (destination) {
      setHistory((previous) => [...previous, currentQuestionId]);
      setCurrentQuestionId(destination);
    }
  };

  const handlePrevious = () => {
    setHistory((previous) => {
      const destination = previous.at(-1);
      if (!destination) return previous;
      setCurrentQuestionId(destination);
      return previous.slice(0, -1);
    });
  };

  const resetQuiz = () => {
    setCurrentQuestionId("q1");
    setHistory([]);
    setAnswers({});
  };

  const currentAnswer = answers[question.id];

  const canAdvance = () => {
    if (question.type === 'single' || question.type === 'image-single' || question.type === 'grid-single') {
      return currentAnswer !== undefined;
    }
    if (question.type === 'multi' || question.type === 'pain-map') {
      return Array.isArray(currentAnswer) && currentAnswer.length > 0;
    }
    if (question.type === 'lead-capture') {
      const form = currentAnswer as LeadCaptureAnswer | undefined;
      return form && form.name?.trim() !== '' && form.email?.trim() !== '';
    }
    return true; // text area or recommendation
  };

  const handleSingleSelect = (label: string) => {
    setAnswers({ ...answers, [question.id]: label });
  };

  const handleMultiSelect = (label: string, exclusive?: boolean) => {
    const prev = Array.isArray(answers[question.id]) ? (answers[question.id] as string[]) : [];
    
    let next: string[];
    if (exclusive) {
      // If selecting the exclusive option (e.g. "None"), clear everything else
      next = prev.includes(label) ? [] : [label];
    } else {
      if (prev.includes(label)) {
        next = prev.filter((a) => a !== label);
      } else {
        // If adding a normal option, remove any exclusive options first
        const exclusiveLabels = question.options?.filter(o => o.exclusive).map(o => o.label) || [];
        next = [...prev.filter(a => !exclusiveLabels.includes(a)), label];
      }
    }
    setAnswers({ ...answers, [question.id]: next });
  };

  const renderOptions = () => {
    if (question.type === 'single') {
      return (
        <div className="w-full max-w-md mx-auto space-y-2 mt-6">
          {question.options?.map((opt) => (
            <button
              key={opt.label}
              onClick={() => handleSingleSelect(opt.label)}
              role="radio"
              aria-checked={currentAnswer === opt.label}
              className={`quiz-option flex items-center w-full text-left rounded-sm ${
                currentAnswer === opt.label ? "selected" : ""
              }`}
            >
              <div className="quiz-radio flex-shrink-0">
                {currentAnswer === opt.label && (
                  <svg className="w-3 h-3 text-blue-500 fill-current" viewBox="0 0 20 20">
                    <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                  </svg>
                )}
              </div>
              <span className="flex-1">{opt.label}</span>
            </button>
          ))}
        </div>
      );
    }

    if (question.type === 'image-single') {
      return (
        <div className="w-full max-w-2xl mx-auto flex flex-wrap justify-center gap-6 mt-6">
          {question.options?.map((opt) => (
            <button
              key={opt.label}
              onClick={() => handleSingleSelect(opt.label)}
              className={`flex flex-col items-center p-4 border transition-all rounded-md w-40 ${
                currentAnswer === opt.label ? "border-blue-500 ring-2 ring-blue-500 bg-blue-50" : "border-gray-200 hover:border-blue-300"
              }`}
            >
              {opt.image && (
                <img src={import.meta.env.BASE_URL.replace(/\/$/, '') + opt.image} alt={opt.label} className="w-full h-auto object-contain mb-4 aspect-square" />
              )}
              <span className="font-semibold text-center text-sm">{opt.label}</span>
            </button>
          ))}
        </div>
      );
    }

    if (question.type === 'grid-single') {
      return (
        <div className="w-full max-w-2xl mx-auto grid grid-cols-4 sm:grid-cols-6 md:grid-cols-7 gap-3 mt-6">
          {question.options?.map((opt) => (
            <button
              key={opt.label}
              onClick={() => handleSingleSelect(opt.label)}
              className={`py-3 text-center border font-sans text-sm transition-colors ${
                currentAnswer === opt.label ? "bg-blue-500 text-white border-blue-500" : "border-gray-300 hover:bg-gray-50 text-gray-700"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      );
    }

    if (question.type === 'multi') {
      return (
        <div className="w-full max-w-md mx-auto space-y-2 mt-6">
          {question.options?.map((opt) => {
            const isSelected = Array.isArray(currentAnswer) && currentAnswer.includes(opt.label);
            return (
              <button
                key={opt.label}
                onClick={() => handleMultiSelect(opt.label, opt.exclusive)}
                className={`quiz-option flex items-center w-full text-left rounded-sm ${
                  isSelected ? "selected" : ""
                }`}
              >
                <div className="quiz-checkbox flex-shrink-0">
                  {isSelected && (
                    <svg className="w-3 h-3 text-blue-500 fill-current" viewBox="0 0 20 20">
                      <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                    </svg>
                  )}
                </div>
                <span className="flex-1">{opt.label}</span>
              </button>
            );
          })}
        </div>
      );
    }

    if (question.type === 'pain-map') {
      return (
        <div className="w-full max-w-4xl mx-auto mt-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {question.options?.map((opt) => {
              const isSelected = Array.isArray(currentAnswer) && currentAnswer.includes(opt.label);
              return (
                <button
                  key={opt.label}
                  onClick={() => handleMultiSelect(opt.label, opt.exclusive)}
                  className={`flex flex-col items-center p-3 border transition-all ${
                    isSelected ? "border-blue-500 ring-2 ring-blue-500 bg-blue-50" : "border-gray-200 hover:border-blue-300 bg-white"
                  }`}
                >
                  <div className="w-full aspect-square bg-white flex items-center justify-center mb-3">
                    {opt.image && (
                      <img src={import.meta.env.BASE_URL.replace(/\/$/, '') + opt.image} alt={opt.label} className="max-w-full max-h-full object-contain mix-blend-multiply" />
                    )}
                  </div>
                  <div className="flex items-center w-full">
                    <div className={`quiz-checkbox flex-shrink-0 ${isSelected ? '!bg-blue-500 !border-blue-500' : ''}`}>
                      {isSelected && (
                        <svg className="w-3 h-3 text-white fill-current" viewBox="0 0 20 20">
                          <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                        </svg>
                      )}
                    </div>
                    <span className="text-sm font-semibold flex-1 text-left">{opt.label}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      );
    }

    if (question.type === 'textarea') {
      return (
        <div className="w-full max-w-xl mx-auto mt-6">
          <textarea
            className="w-full h-40 p-4 border border-gray-300 font-sans focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            placeholder="Type your answer here..."
            value={(currentAnswer as string) || ''}
            onChange={(e) => setAnswers({ ...answers, [question.id]: e.target.value })}
          />
        </div>
      );
    }

    if (question.type === 'lead-capture') {
      const form = (currentAnswer as LeadCaptureAnswer | undefined) || { name: '', email: '' };
      return (
        <div className="w-full max-w-md mx-auto mt-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2 font-sans">Full Name</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 font-sans focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.name}
              onChange={(e) => setAnswers({ ...answers, [question.id]: { ...form, name: e.target.value } })}
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2 font-sans">Email</label>
            <input
              type="email"
              className="w-full p-3 border border-gray-300 font-sans focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.email}
              onChange={(e) => setAnswers({ ...answers, [question.id]: { ...form, email: e.target.value } })}
              placeholder="john@example.com"
            />
          </div>
        </div>
      );
    }

    if (question.type === 'summary') {
      const summaryItems = [
        { label: 'Gender', id: 'q7' },
        { label: 'Weight', id: 'q9' },
        { label: 'Shoe Size', id: 'q8' },
        { label: 'Arch', id: 'q2' },
        { label: 'Conditions', id: 'q4' },
        { label: 'Left Foot Pain', id: 'q5' },
        { label: 'Right Foot Pain', id: 'q6' },
        { label: 'Shoe Types', id: 'q10' },
      ];

      return (
        <div className="w-full max-w-3xl mx-auto mt-6">
          <p className="text-gray-700 font-sans mb-8 text-center bg-blue-50 p-4 border border-blue-100 rounded-sm">
            Add as many insole variants as you'd like to your cart and receive an added discount the more you add! Simply add your first selection to the cart, then change the variant and add another before proceeding to checkout.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {summaryItems.map((item) => {
              const val = answers[item.id];
              let displayVal = 'Not answered';
              if (Array.isArray(val)) {
                displayVal = val.length > 0 ? val.join(', ') : 'None';
              } else if (typeof val === 'string' && val) {
                displayVal = val;
              }
              return (
                <div key={item.id} className="flex flex-col p-4 border border-gray-200 bg-[#f9fafb]">
                  <span className="text-sm text-gray-500 font-bold uppercase tracking-wider mb-1 font-sans">{item.label}</span>
                  <span className="font-sans text-gray-900">{displayVal}</span>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center">
            <button 
              onClick={handleNext}
              className="px-8 py-3 bg-[#3b82f6] text-white font-bold text-lg hover:bg-blue-600 transition-colors rounded-sm font-sans flex items-center gap-2 shadow-sm"
            >
              Let's Go <span aria-hidden="true">&rarr;</span>
            </button>
          </div>
        </div>
      );
    }

    if (question.type === 'recommendation') {
      return (
        <div className="w-full max-w-4xl mx-auto mt-8 text-left border border-gray-200 bg-white">
          <div className="flex flex-col md:flex-row p-6 md:p-10 gap-8">
            <div className="w-full md:w-1/2 flex justify-center items-start">
              <img src={import.meta.env.BASE_URL.replace(/\/$/, '') + '/images/04-quiz-20251219_1118_Foot_Graphic_Highlighted_remix_01kcvsvqwyfbk8zd4hbg6m57mc.png'} alt="Custom Orthotics" className="w-full h-auto object-contain max-w-sm mix-blend-multiply" />
            </div>
            
            <div className="w-full md:w-1/2 flex flex-col font-sans">
              <h2 className="text-3xl font-bold text-gray-900 mb-2 font-serif">Custom Orthotic Insoles</h2>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-2xl font-bold text-gray-900">$249.00 USD</span>
                <span className="text-lg text-gray-500 line-through">$499.00 USD</span>
              </div>
              
              <div className="space-y-4 mb-8">
                <button 
                  className="w-full py-4 bg-[#3b82f6] text-white font-bold text-lg hover:bg-blue-600 transition-colors uppercase tracking-wider"
                  onClick={() => toast({ title: "Added to cart", description: "Product added." })}
                >
                  Add to cart
                </button>
                <button 
                  className="w-full py-4 bg-gray-900 text-white font-bold text-lg hover:bg-gray-800 transition-colors uppercase tracking-wider"
                  onClick={() => toast({ title: "Proceed to checkout", description: "Navigating to cart..." })}
                >
                  Proceed to cart (0)
                </button>
              </div>

              <div className="space-y-6 pt-6 border-t border-gray-200">
                <div>
                  <h3 className="text-lg font-bold font-serif mb-2">Custom Support That's Actually Built for Your Foot</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Designed entirely around the 3D profile of your foot to relieve pain and correct alignment.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold font-serif mb-2">Why Store-Bought Never Quite Works</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Generic arch supports are made for average feet. Custom orthotics are made exclusively for yours.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold font-serif mb-2">We Measure Your Foot. We Don't Guess It.</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Using precise iPhone scanning technology to capture over 25,000 data points.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold font-serif mb-2">Made for the Shoes You Actually Wear</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Tailored specifically for the depth and volume of your preferred footwear.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold font-serif mb-2">Questions People Ask</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Backed by podiatrists, with a 180-day money back guarantee so you can walk with confidence.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="min-h-[100dvh] w-full flex flex-col bg-white relative text-gray-900 font-serif">
      {/* Top Bar */}
      <div className="absolute top-0 w-full p-4 flex justify-end z-10">
        <button 
          onClick={resetQuiz}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
          aria-label="Close quiz"
        >
          <X className="w-6 h-6" strokeWidth={1.5} />
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 sm:p-12 md:p-24 pb-32 overflow-y-auto">
        <div className="w-full max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          {/* Question 1 special layout with Doctor Image */}
          {question.id === 'q1' ? (
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-24">
              <div className="flex-shrink-0">
                <img 
                  src={import.meta.env.BASE_URL.replace(/\/$/, '') + '/images/19-doctor-paul-langer-cropped.png'} 
                  alt="Dr. Paul Langer" 
                  className="w-48 h-48 md:w-[365px] md:h-[342px] object-cover"
                />
              </div>
              <div className="flex-1 max-w-[550px] w-full text-center md:text-left">
                <p className="font-bold text-lg mb-6 leading-snug">
                  Hello, I'm Dr. Paul Langer. Welcome to SelfScan 3D!
                </p>
                <h1 className="text-xl md:text-2xl font-bold mb-2">
                  {question.title.replace('{name}', (answers['q12'] as LeadCaptureAnswer | undefined)?.name || 'there')}
                </h1>
                {question.subtitle && (
                  <p className="text-gray-600 mb-4">{question.subtitle}</p>
                )}
                {renderOptions()}
              </div>
            </div>
          ) : (
            /* Standard Layout */
            <div className="text-center w-full">
              <h1 className="text-2xl md:text-3xl font-bold mb-3 font-serif max-w-3xl mx-auto leading-tight">
                {question.title.replace('{name}', (answers['q12'] as LeadCaptureAnswer | undefined)?.name?.split(' ')[0] || '')}
              </h1>
              {question.subtitle && (
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto font-sans">
                  {question.subtitle}
                </p>
              )}
              {renderOptions()}
            </div>
          )}

        </div>
      </div>

      {/* Bottom Progress & Navigation Bar */}
      <div className="fixed bottom-0 w-full bg-white border-t border-gray-100 p-4 sm:p-6 flex flex-col z-10">
        <div className="flex justify-between items-center mb-3">
          <div className="text-xs text-gray-500 font-sans tracking-wide">
            {progress}% complete
          </div>
          <div className="flex gap-2">
            {!isFirst && !isLast && (
              <button 
                onClick={handlePrevious}
                className="quiz-btn w-12 !px-0"
                aria-label="Previous question"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}
            {!isLast && (
              <button 
                onClick={handleNext}
                disabled={!canAdvance()}
                className="quiz-btn"
                aria-label="Next question"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
        
        {/* Progress Bar Line */}
        <div className="w-full h-[2px] bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gray-400 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      
    </div>
  );
}
