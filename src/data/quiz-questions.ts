export type Option = {
  label: string;
  image?: string;
  exclusive?: boolean;
};

export type Question = {
  id: string;
  title: string;
  subtitle?: string;
  type: 'single' | 'multi' | 'image-single' | 'pain-map' | 'grid-single' | 'textarea' | 'lead-capture' | 'summary' | 'recommendation';
  options?: Option[];
};

export const QUIZ_QUESTIONS: Question[] = [
  {
    id: 'q1',
    title: 'What is your main reason for seeking custom orthotics?',
    type: 'single',
    options: [
      { label: 'Foot pain' },
      { label: 'Improved posture' },
      { label: 'General wellness' },
      { label: 'Foot fatigue' },
      { label: 'Injury prevention' },
      { label: 'Excelling in sports' }
    ]
  },
  {
    id: 'q2',
    title: 'What type of arch best represents your feet?',
    type: 'image-single',
    options: [
      { label: 'Normal arch', image: '/images/02-quiz-20251219_1042_Normal_Arch_Foot_remix_01kcvqv6vqfkcb4jrv08cs738m.png' },
      { label: 'Flat foot', image: '/images/01-quiz-20251219_1040_Foot_Without_Redness_remix_01kcvqqqg0fdv8d3wtzgy1d9ap.png' },
      { label: 'High arch', image: '/images/03-quiz-20251219_1044_High_Arch_Foot_remix_01kcvqx8a6epwstpcywmjakn45.png' }
    ]
  },
  {
    id: 'q3',
    title: 'How often do your feet hurt?',
    type: 'single',
    options: [
      { label: 'All the time' },
      { label: 'After a long day' },
      { label: 'Once in a while' }
    ]
  },
  {
    id: 'q4',
    title: 'Do you have any of the following conditions',
    subtitle: 'We customize your orthotics based on your conditions.',
    type: 'multi',
    options: [
      { label: 'None', exclusive: true },
      { label: 'Flat feet' },
      { label: 'Plantar fasciitis' },
      { label: 'Bunions' },
      { label: 'Hammer toes' },
      { label: "Morton's Nueroma" },
      { label: 'Arthritis' },
      { label: 'Heel spurs' },
      { label: 'Limb-length discrepancy' },
      { label: 'Metatarsalgia' },
      { label: 'Achilles tendinitis' },
      { label: 'Sesamoiditis' }
    ]
  },
  {
    id: 'q5',
    title: 'Where are you experiencing foot pain in your left foot?',
    type: 'pain-map',
    options: [
      { label: 'No foot pain', image: '/images/11-quiz-No_pain.jpg', exclusive: true },
      { label: 'The arch', image: '/images/17-quiz-Screen_Shot_2025-07-25_at_3.47.40_PM.png' },
      { label: 'The forefoot', image: '/images/13-quiz-Screenshot_2025-07-25_at_3.36.28_PM.png' },
      { label: 'The heel', image: '/images/14-quiz-Screenshot_2025-07-25_at_3.36.38_PM.png' },
      { label: 'The Achilles area', image: '/images/12-quiz-Screenshot_2025-07-25_at_3.35.41_PM.png' },
      { label: 'The Ankle', image: '/images/15-quiz-Screenshot_2025-07-25_at_3.37.04_PM.png' },
      { label: 'Ball of foot', image: '/images/08-quiz-20251219_1122_Highlighted_Foot_Ball_Area_remix_01kcvt3499fyatsbzr6v8g56x5.png' },
      { label: 'Top of foot', image: '/images/04-quiz-20251219_1118_Foot_Graphic_Highlighted_remix_01kcvsvqwyfbk8zd4hbg6m57mc.png' },
      { label: 'Big toe', image: '/images/06-quiz-20251219_1120_Highlighted_Big_Toe_remix_01kcvszr8wfy9bqbnc14t40m9n.png' },
      { label: 'Toes', image: '/images/07-quiz-20251219_1121_Highlighted_Small_Toes_remix_01kcvt231dfvvvrbypwet8cwy1.png' },
      { label: 'Knee', image: '/images/05-quiz-20251219_1119_Highlighted_Knee_Redness_remix_01kcvszaymf44v6apa3fat2tt4.png' },
      { label: 'All over', image: '/images/16-quiz-Screenshot_2025-07-25_at_3.37.26_PM.png' }
    ]
  },
  {
    id: 'q6',
    title: 'Where are you experiencing pain in your right foot?',
    type: 'pain-map',
    options: [
      { label: 'No foot pain', image: '/images/11-quiz-No_pain.jpg', exclusive: true },
      { label: 'The arch', image: '/images/17-quiz-Screen_Shot_2025-07-25_at_3.47.40_PM.png' },
      { label: 'The forefoot', image: '/images/13-quiz-Screenshot_2025-07-25_at_3.36.28_PM.png' },
      { label: 'The heel', image: '/images/14-quiz-Screenshot_2025-07-25_at_3.36.38_PM.png' },
      { label: 'The Achilles area', image: '/images/12-quiz-Screenshot_2025-07-25_at_3.35.41_PM.png' },
      { label: 'The Ankle', image: '/images/15-quiz-Screenshot_2025-07-25_at_3.37.04_PM.png' },
      { label: 'Ball of foot', image: '/images/08-quiz-20251219_1122_Highlighted_Foot_Ball_Area_remix_01kcvt3499fyatsbzr6v8g56x5.png' },
      { label: 'Top of foot', image: '/images/04-quiz-20251219_1118_Foot_Graphic_Highlighted_remix_01kcvsvqwyfbk8zd4hbg6m57mc.png' },
      { label: 'Big toe', image: '/images/06-quiz-20251219_1120_Highlighted_Big_Toe_remix_01kcvszr8wfy9bqbnc14t40m9n.png' },
      { label: 'Toes', image: '/images/07-quiz-20251219_1121_Highlighted_Small_Toes_remix_01kcvt231dfvvvrbypwet8cwy1.png' },
      { label: 'Knee', image: '/images/05-quiz-20251219_1119_Highlighted_Knee_Redness_remix_01kcvszaymf44v6apa3fat2tt4.png' },
      { label: 'All over', image: '/images/16-quiz-Screenshot_2025-07-25_at_3.37.26_PM.png' }
    ]
  },
  {
    id: 'q7',
    title: 'What is your gender?',
    subtitle: 'We only ask because men and women feet are shaped a little differently.',
    type: 'image-single',
    options: [
      { label: 'Man', image: '/images/10-quiz-a-vector-icon-illustration-of-a-confiden_cgQiTt83SlaSc1y76ltXCA_9QagaCX4Tz-blnnz_Qq-XQ_1.jpg' },
      { label: 'Woman', image: '/images/09-quiz-a-minimalist-icon-illustration-of-a-woma_zUF9AgqIRKazMZIom9oPQQ_JrxjeUvZQ-6pD6UyjE2IaA.jpg' }
    ]
  },
  {
    id: 'q8',
    title: 'What shoe size do you wear?',
    subtitle: 'In between sizes? we recommend you take a size up.',
    type: 'grid-single',
    options: Array.from({ length: 28 }, (_, i) => ({ label: (5 + i * 0.5).toString() }))
  },
  {
    id: 'q9',
    title: 'To ensure optimal support, we customize your orthotics based on body weight. ',
    type: 'single',
    options: [
      { label: '80–125 lbs' },
      { label: '130–180 lbs' },
      { label: '190–240 lbs' },
      { label: '250 lbs and above' }
    ]
  },
  {
    id: 'q10',
    title: 'What type of shoes are you putting your orthotics in?',
    subtitle: 'Select all that apply. We optimize your orthotics to each shoe type and you will have the option to purchase multiple orthotics at a discount for each shoe type.',
    type: 'multi',
    options: [
      { label: 'Sneakers / Everyday Shoes' },
      { label: 'Running Shoes' },
      { label: 'Work / Hiking Boots' },
      { label: 'Dress Shoes' },
      { label: 'Pickleball / Tennis Shoes' },
      { label: 'Golf Shoes' },
      { label: 'Cycling Shoes' },
      { label: 'Basketball Shoes' },
      { label: 'Soccer / Football Shoes' },
      { label: 'Gym / Weight Lifting Shoes' },
      { label: 'Hockey / Skates' }
    ]
  },
  {
    id: 'q11',
    title: "You're all set! Is there anything else you'd like to tell us?",
    subtitle: 'Feel free to share details about your specific conditions and activities. This helps us create your perfect custom orthotics.',
    type: 'textarea'
  },
  {
    id: 'q12',
    title: 'Almost done!',
    subtitle: 'Please provide your full name and email so we can create your account and save your answers.',
    type: 'lead-capture'
  },
  {
    id: 'q13',
    title: "You're only one step away...",
    subtitle: "This is what happens next:",
    type: 'summary'
  },
  {
    id: 'q14',
    title: 'Awesome {name}, we got your answers.',
    subtitle: "They'll be used to create your custom orthotic.",
    type: 'recommendation'
  }
];
