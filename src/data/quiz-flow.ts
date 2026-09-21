export type LeadCaptureAnswer = {
  name: string;
  email: string;
};

export type QuizAnswer = string | string[] | LeadCaptureAnswer;
export type QuizAnswers = Record<string, QuizAnswer>;

export const QUESTION_ORDER = [
  "q1",
  "q2",
  "q3",
  "q4",
  "q5",
  "q6",
  "q7",
  "q8",
  "q9",
  "q10",
  "q11",
  "q12",
  "q13",
  "q14",
] as const;

export type QuestionId = (typeof QUESTION_ORDER)[number];

type AnswerTransitions = Record<string, QuestionId>;

/**
 * Transition data transcribed from the live RevenueHunt quiz (GhoA0K) and
 * verified with six complete browser journeys on 2026-09-21.
 *
 * The live quiz currently has a shared tail. Keeping every answer in this map
 * is intentional: navigation is driven by the observed answer graph rather
 * than by array position, and a future live divergence can be represented by
 * changing only the affected answer destination.
 */
export const ANSWER_TRANSITIONS: Partial<
  Record<QuestionId, AnswerTransitions>
> = {
  q1: {
    "Foot pain": "q2",
    "Improved posture": "q2",
    "General wellness": "q2",
    "Foot fatigue": "q2",
    "Injury prevention": "q2",
    "Excelling in sports": "q2",
  },
  q2: {
    "Normal arch": "q3",
    "Flat foot": "q3",
    "High arch": "q3",
  },
  q3: {
    "All the time": "q4",
    "After a long day": "q4",
    "Once in a while": "q4",
  },
  q4: {
    None: "q5",
    "Flat feet": "q5",
    "Plantar fasciitis": "q5",
    Bunions: "q5",
    "Hammer toes": "q5",
    "Morton's Nueroma": "q5",
    Arthritis: "q5",
    "Heel spurs": "q5",
    "Limb-length discrepancy": "q5",
    Metatarsalgia: "q5",
    "Achilles tendinitis": "q5",
    Sesamoiditis: "q5",
  },
  q5: {
    "No foot pain": "q6",
    "The arch": "q6",
    "The forefoot": "q6",
    "The heel": "q6",
    "The Achilles area": "q6",
    "The Ankle": "q6",
    "Ball of foot": "q6",
    "Top of foot": "q6",
    "Big toe": "q6",
    Toes: "q6",
    Knee: "q6",
    "All over": "q6",
  },
  q6: {
    "No foot pain": "q7",
    "The arch": "q7",
    "The forefoot": "q7",
    "The heel": "q7",
    "The Achilles area": "q7",
    "The Ankle": "q7",
    "Ball of foot": "q7",
    "Top of foot": "q7",
    "Big toe": "q7",
    Toes: "q7",
    Knee: "q7",
    "All over": "q7",
  },
  q7: {
    Man: "q8",
    Woman: "q8",
  },
  q8: Object.fromEntries(
    Array.from({ length: 28 }, (_, index) => [
      String(5 + index * 0.5),
      "q9",
    ]),
  ),
  q9: {
    "80–125 lbs": "q10",
    "130–180 lbs": "q10",
    "190–240 lbs": "q10",
    "250 lbs and above": "q10",
  },
  q10: {
    "Sneakers / Everyday Shoes": "q11",
    "Running Shoes": "q11",
    "Work / Hiking Boots": "q11",
    "Dress Shoes": "q11",
    "Pickleball / Tennis Shoes": "q11",
    "Golf Shoes": "q11",
    "Cycling Shoes": "q11",
    "Basketball Shoes": "q11",
    "Soccer / Football Shoes": "q11",
    "Gym / Weight Lifting Shoes": "q11",
    "Hockey / Skates": "q11",
  },
};

const FIXED_TRANSITIONS: Partial<Record<QuestionId, QuestionId>> = {
  q11: "q12",
  q12: "q13",
  q13: "q14",
};

function selectedValues(answer: QuizAnswer | undefined): string[] {
  if (typeof answer === "string") {
    return answer.trim() ? [answer.trim()] : [];
  }

  return Array.isArray(answer) ? answer.map((value) => value.trim()) : [];
}

export function nextQuestion(
  currentId: QuestionId,
  answers: QuizAnswers,
): QuestionId | null {
  if (currentId === "q14") {
    return null;
  }

  const fixedDestination = FIXED_TRANSITIONS[currentId];
  if (fixedDestination) {
    return fixedDestination;
  }

  const transitions = ANSWER_TRANSITIONS[currentId];
  const values = selectedValues(answers[currentId]);

  if (!transitions || values.length === 0) {
    return null;
  }

  const destinations = new Set(
    values.map((value) => transitions[value]).filter(Boolean),
  );

  if (destinations.size !== 1) {
    return null;
  }

  return [...destinations][0];
}