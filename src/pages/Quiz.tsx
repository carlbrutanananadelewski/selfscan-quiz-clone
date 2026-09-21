import React, { useState } from "react";
import { QUIZ_QUESTIONS } from "../data/quiz-questions";
import {
  nextQuestion,
  type LeadCaptureAnswer,
  type QuestionId,
  type QuizAnswers,
} from "../data/quiz-flow";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const LIVE_PROGRESS: Record<QuestionId, number> = {
  q1: 0,
  q2: 8,
  q3: 15,
  q4: 23,
  q5: 31,
  q6: 38,
  q7: 46,
  q8: 54,
  q9: 62,
  q10: 69,
  q11: 77,
  q12: 85,
  q13: 92,
  q14: 100,
};

const PRODUCT_SECTIONS = [
  {
    heading: "Custom Support That's Actually Built for Your Foot",
    body: "Most foot pain, and a lot of knee and back pain, starts with feet that aren't supported the way they're built. Off-the-shelf insoles are made for an average foot that doesn't exist, so they cushion a little and fix nothing. If your feet ache, your arches feel tired, or the pain travels up your legs, the problem is usually support in the wrong places.",
  },
  {
    heading: "Why Store-Bought Never Quite Works",
    body: "A generic insole guesses at your arch and hopes it's close. Too high and it digs in, too low and you feel nothing. Either way it isn't your foot, so it can't hold you where you need to be, and soft foam just packs down under your weight within an hour.",
  },
  {
    heading: "We Measure Your Foot. We Don't Guess It.",
    body: "It starts with a scan of your actual foot, 30,000 points of it, taken in about a minute with your phone. We aren't reading a pressure pad or going off your shoe size. We have your real shape. From that we build a firm orthotic that supports your exact arch, holds its shape all day, and keeps your foot aligned the way it should be. It's 3D printed to your foot and nobody else's, for less than half of what a podiatrist charges.",
  },
  {
    heading: "Made for the Shoes You Actually Wear",
    body: "Pick the length and profile for your work boots, sneakers, or dress shoes, so you're supported everywhere you go. Backed by our 180-day money-back guarantee.",
  },
] as const;

const PRODUCT_VARIANTS = [
  "Walking / Universal Shoe",
  "Baseball",
  "Basketball",
  "Climbing",
  "Cycling",
  "Golf",
  "Hiking",
  "Hockey",
  "Running",
  "Skiing",
  "Soccer",
  "Tennis",
  "Pickleball",
  "Dress Shoe",
  "Work Boots",
  "Badminton",
] as const;

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
  const progress = LIVE_PROGRESS[currentQuestionId];

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
      const usesCheckboxes = question.id === "q1";
      return (
        <div className="quiz-options">
          {question.options?.map((opt) => (
            <button
              key={opt.label}
              onClick={() => handleSingleSelect(opt.label)}
              role={usesCheckboxes ? "checkbox" : "radio"}
              aria-checked={currentAnswer === opt.label}
              className={`quiz-option ${
                currentAnswer === opt.label ? "selected" : ""
              }`}
            >
              <div className={usesCheckboxes ? "quiz-checkbox" : "quiz-radio"}>
                {currentAnswer === opt.label && (
                  <svg className="quiz-checkmark" viewBox="0 0 20 20">
                    <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                  </svg>
                )}
              </div>
              <span>{opt.label}</span>
            </button>
          ))}
        </div>
      );
    }

    if (question.type === 'image-single') {
      return (
        <div className={`image-options ${question.id === "q7" ? "gender-options" : ""}`}>
          {question.options?.map((opt) => (
            <button
              key={opt.label}
              onClick={() => handleSingleSelect(opt.label)}
              role="radio"
              aria-checked={currentAnswer === opt.label}
              className={`image-option ${currentAnswer === opt.label ? "selected" : ""}`}
            >
              {opt.image && (
                <img src={import.meta.env.BASE_URL.replace(/\/$/, '') + opt.image} alt={opt.label} />
              )}
              <span className="image-option-label">
                <span className="quiz-radio">
                  {currentAnswer === opt.label && <span className="radio-dot" />}
                </span>
                {opt.label}
              </span>
            </button>
          ))}
        </div>
      );
    }

    if (question.type === 'grid-single') {
      return (
        <div className="size-select-wrap">
          <select
            className="size-select"
            aria-label="What shoe size do you wear?"
            value={(currentAnswer as string | undefined) ?? ""}
            onChange={(event) => handleSingleSelect(event.target.value)}
          >
            <option value="" disabled>Select</option>
            {question.options?.map((opt) => (
              <option key={opt.label} value={opt.label}>{opt.label}</option>
            ))}
          </select>
        </div>
      );
    }

    if (question.type === 'multi') {
      return (
        <div className="quiz-options">
          {question.options?.map((opt) => {
            const isSelected = Array.isArray(currentAnswer) && currentAnswer.includes(opt.label);
            return (
              <button
                key={opt.label}
                onClick={() => handleMultiSelect(opt.label, opt.exclusive)}
                role="checkbox"
                aria-checked={isSelected}
                className={`quiz-option ${
                  isSelected ? "selected" : ""
                }`}
              >
                <div className="quiz-checkbox flex-shrink-0">
                  {isSelected && (
                    <svg className="quiz-checkmark" viewBox="0 0 20 20">
                      <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                    </svg>
                  )}
                </div>
                <span>{opt.label}</span>
              </button>
            );
          })}
        </div>
      );
    }

    if (question.type === 'pain-map') {
      return (
        <div className="pain-map">
          <div className="pain-grid">
            {question.options?.map((opt) => {
              const isSelected = Array.isArray(currentAnswer) && currentAnswer.includes(opt.label);
              return (
                <button
                  key={opt.label}
                  onClick={() => handleMultiSelect(opt.label, opt.exclusive)}
                  role="checkbox"
                  aria-checked={isSelected}
                  className={`pain-card ${isSelected ? "selected" : ""}`}
                >
                  <div className="pain-image">
                    {opt.image && (
                      <img src={import.meta.env.BASE_URL.replace(/\/$/, '') + opt.image} alt={opt.label} />
                    )}
                  </div>
                  <div className="pain-label">
                    <div className="quiz-checkbox">
                      {isSelected && (
                        <svg className="quiz-checkmark" viewBox="0 0 20 20">
                          <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                        </svg>
                      )}
                    </div>
                    <span>{opt.label}</span>
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
        <div className="textarea-wrap">
          <textarea
            className="quiz-textarea"
            placeholder="Type your answer here"
            value={(currentAnswer as string) || ''}
            onChange={(e) => setAnswers({ ...answers, [question.id]: e.target.value })}
          />
        </div>
      );
    }

    if (question.type === 'lead-capture') {
      const form = (currentAnswer as LeadCaptureAnswer | undefined) || { name: '', email: '' };
      return (
        <div className="lead-form">
          <input
            type="text"
            aria-label="Type your name here"
            value={form.name}
            onChange={(e) => setAnswers({ ...answers, [question.id]: { ...form, name: e.target.value } })}
            placeholder="Type your name here"
          />
          <input
            type="email"
            aria-label="Type your email address here"
            value={form.email}
            onChange={(e) => setAnswers({ ...answers, [question.id]: { ...form, email: e.target.value } })}
            placeholder="Type your email address here"
          />
        </div>
      );
    }

    if (question.type === 'summary') {
      return (
        <div className="handoff">
          <div className="handoff-image" role="img" aria-label="full image" />
          <button onClick={handleNext} className="handoff-button">
            Let's Go --&gt;
          </button>
        </div>
      );
    }

    if (question.type === 'recommendation') {
      const lead = answers.q12 as LeadCaptureAnswer | undefined;
      const display = (id: string) => {
        const value = answers[id];
        return Array.isArray(value) ? value.join(", ") : typeof value === "string" ? value : "";
      };

      return (
        <div className="result">
          <h1>Awesome {lead?.name || "there"}, we got your answers. They'll be used to create your custom orthotic.</h1>
          <p>Next, choose the activity you’ll be using the insole for by selecting an option under <strong>“Variant”.</strong></p>
          <p>Add as many insole variants as you'd like to your cart and receive an added discount the more you add! Simply add your first selection to the cart, then change the variant and add another before proceeding to checkout.</p>

          <dl className="answer-summary">
            <div><dt>Gender:</dt><dd>{display("q7")}</dd></div>
            <div><dt>Weight:</dt><dd>{display("q9")}</dd></div>
            <div><dt>Shoe Size:</dt><dd>{display("q8")}</dd></div>
            <div><dt>Arch:</dt><dd>{display("q2")}</dd></div>
            <div><dt>Conditions:</dt><dd>{display("q4")}</dd></div>
            <div><dt>Left Foot Pain:</dt><dd>{display("q5")}</dd></div>
            <div><dt>Right Foot Pain:</dt><dd>{display("q6")}</dd></div>
            <div><dt>Shoe Types:</dt><dd>{display("q10")}</dd></div>
          </dl>

          <article className="product-card">
            <a href="https://selfscan3d.com/products/custom-orthotics" className="product-image-link">
              <img
                src={import.meta.env.BASE_URL.replace(/\/$/, '') + '/images/20-custom-orthotic-insoles.png'}
                alt="Custom orthotic insole built from a 30,000-point scan of your foot"
              />
            </a>
            <div className="product-details">
              <h2>Custom Orthotic Insoles</h2>
              <div className="price"><strong>$249.00 USD</strong> <s>$499.00 USD</s></div>
              <div className="product-copy">
                {PRODUCT_SECTIONS.map((section) => (
                  <section key={section.heading}>
                    <h3>{section.heading}</h3>
                    <p>{section.body}</p>
                  </section>
                ))}
                <section>
                  <h3>Questions People Ask</h3>
                  <h4>How are these different from drugstore insoles?</h4>
                  <p>Drugstore insoles cushion an average foot. These are built from a scan of your exact foot, so the support sits where you actually need it and it lasts.</p>
                  <h4>Do I need a doctor or a foam mold?</h4>
                  <p>No. You scan your feet at home with your phone in about a minute. No appointment, no mess.</p>
                  <h4>What if they aren't right?</h4>
                  <p>You have 180 days to send them back for a refund. We'll also reassess your scan and remake them if the fit needs adjusting.</p>
                </section>
              </div>
              <label className="variant-label">
                Variant
                <select defaultValue={PRODUCT_VARIANTS[0]}>
                  {PRODUCT_VARIANTS.map((variant) => <option key={variant}>{variant}</option>)}
                </select>
              </label>
              <button
                className="add-cart"
                onClick={() => toast({ title: "Added to cart", description: "Product added." })}
              >
                Add to cart
              </button>
            </div>
          </article>
        </div>
      );
    }

    return null;
  };

  return (
    <div className={`quiz-shell ${isLast ? "result-screen" : ""}`}>
      <div className="quiz-close">
        <button 
          onClick={resetQuiz}
          aria-label="Close quiz"
        >
          <X className="w-6 h-6" strokeWidth={1.5} />
        </button>
      </div>

      <main className="quiz-main">
        <div className="quiz-content">
          
          {/* Question 1 special layout with Doctor Image */}
          {question.id === 'q1' ? (
            <div className="doctor-layout">
              <div className="doctor-photo">
                <img 
                  src={import.meta.env.BASE_URL.replace(/\/$/, '') + '/images/19-doctor-paul-langer-cropped.png'} 
                  alt="Dr. Paul Langer" 
                />
              </div>
              <div className="doctor-question">
                <p className="doctor-intro">
                  Hello, I'm Dr. Paul Langer. Welcome to SelfScan 3D!
                </p>
                <h1>
                  {question.title.replace('{name}', (answers['q12'] as LeadCaptureAnswer | undefined)?.name || 'there')}
                </h1>
                {question.subtitle && (
                  <p className="quiz-subtitle">{question.subtitle}</p>
                )}
                {renderOptions()}
                <button className="inline-next" onClick={handleNext} disabled={!canAdvance()}>
                  Next
                </button>
              </div>
            </div>
          ) : (
            /* Standard Layout */
            <div className="standard-layout">
              {!isLast && (
                <>
                  <h1>
                    {question.title.replace('{name}', (answers['q12'] as LeadCaptureAnswer | undefined)?.name || '')}
                  </h1>
                  {question.subtitle && (
                    <p className="quiz-subtitle">
                      {question.subtitle}
                    </p>
                  )}
                </>
              )}
              {renderOptions()}
              {!isLast && question.type !== "summary" && (
                <button className="inline-next" onClick={handleNext} disabled={!canAdvance()}>
                  next
                </button>
              )}
            </div>
          )}

        </div>
      </main>

      {!isLast ? (
      <footer className="quiz-footer">
        <div className="footer-row">
          <div className="progress-label">
            {progress}% complete
          </div>
          <div className="footer-nav">
            <button 
              onClick={handlePrevious}
              className="footer-arrow previous"
              aria-label="Previous question"
              disabled={isFirst}
            >
              <ChevronLeft />
            </button>
            <button 
              onClick={handleNext}
              disabled={!canAdvance()}
              className="footer-arrow next"
              aria-label="Next question"
            >
              <ChevronRight />
            </button>
          </div>
        </div>
        <div className="progress-track">
          <div 
            className="progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
      </footer>
      ) : (
        <footer className="result-footer">
          <button disabled>Proceed to cart (0)</button>
        </footer>
      )}
    </div>
  );
}
