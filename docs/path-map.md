# SelfScan 3D Quiz — Live Transition Tree

Audited against `https://selfscan3d.com/#quiz` on 2026-09-21.

## Evidence and conclusion

- Live RevenueHunt quiz ID: `GhoA0K`
- The live configuration contained 13 questions and one result.
- Its `jumpLogic` and `skipLogic` arrays were empty for every question.
- Six fresh browser sessions were completed from Q1 through the product result, one for each Q1 answer.
- The six sessions intentionally varied every requested branch class: all arches, all hurt-frequency answers, None/one/several conditions, no-pain/specific/multiple pain selections on both feet, both genders, every weight band, and single/multiple shoe types.
- Every session visited Q1 → Q2 → Q3 → Q4 → Q5 → Q6 → Q7 → Q8 → Q9 → Q10 → Q11 → Q12 → Q13 → Result.
- Every session terminated at `Custom Orthotic Insoles`, `$249.00 USD` (compare-at `$499.00 USD`).

The shared tail below is not an assumption or an `index + 1` implementation. Every option is represented in `src/data/quiz-flow.ts`, and `nextQuestion(currentId, answers)` resolves its observed destination from that transition data.

## Completed live-browser matrix

| Q1 reason | Arch | Hurt frequency | Conditions | Left pain | Right pain | Gender | Weight | Shoe types | Terminal |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Foot pain | Normal arch | All the time | None | No foot pain | No foot pain | Man | 80–125 lbs | Sneakers / Everyday Shoes | Custom Orthotic Insoles — $249.00 USD |
| Improved posture | Flat foot | After a long day | Flat feet | The arch | No foot pain | Woman | 130–180 lbs | Running Shoes | Custom Orthotic Insoles — $249.00 USD |
| General wellness | High arch | Once in a while | Plantar fasciitis, Bunions, Hammer toes | No foot pain | The heel | Man | 190–240 lbs | Work / Hiking Boots, Dress Shoes | Custom Orthotic Insoles — $249.00 USD |
| Foot fatigue | Normal arch | After a long day | Morton's Nueroma | The Ankle | The Achilles area | Woman | 250 lbs and above | Pickleball / Tennis Shoes | Custom Orthotic Insoles — $249.00 USD |
| Injury prevention | Flat foot | Once in a while | Arthritis, Heel spurs, Limb-length discrepancy | Ball of foot | Top of foot | Man | 130–180 lbs | Golf, Cycling, Basketball | Custom Orthotic Insoles — $249.00 USD |
| Excelling in sports | High arch | All the time | Metatarsalgia, Achilles tendinitis, Sesamoiditis | Big toe, Toes, Knee, All over | The forefoot, The Ankle, Ball of foot | Woman | 250 lbs and above | Soccer / Football, Gym / Weight Lifting, Hockey / Skates | Custom Orthotic Insoles — $249.00 USD |

## Transition tree

### Q1 — What is your main reason for seeking custom orthotics?

- Foot pain → Q2
- Improved posture → Q2
- General wellness → Q2
- Foot fatigue → Q2
- Injury prevention → Q2
- Excelling in sports → Q2

### Q2 — What type of arch best represents your feet?

- Normal arch → Q3
- Flat foot → Q3
- High arch → Q3

### Q3 — How often do your feet hurt?

- All the time → Q4
- After a long day → Q4
- Once in a while → Q4

### Q4 — Do you have any of the following conditions

Multi-select. Each valid selection or combination proceeds to Q5.

- None → Q5
- Flat feet → Q5
- Plantar fasciitis → Q5
- Bunions → Q5
- Hammer toes → Q5
- Morton's Nueroma → Q5
- Arthritis → Q5
- Heel spurs → Q5
- Limb-length discrepancy → Q5
- Metatarsalgia → Q5
- Achilles tendinitis → Q5
- Sesamoiditis → Q5

### Q5 — Where are you experiencing foot pain in your left foot?

Illustrated multi-select pain map. Each valid selection or combination proceeds to Q6.

- No foot pain → Q6
- The arch → Q6
- The forefoot → Q6
- The heel → Q6
- The Achilles area → Q6
- The Ankle → Q6
- Ball of foot → Q6
- Top of foot → Q6
- Big toe → Q6
- Toes → Q6
- Knee → Q6
- All over → Q6

### Q6 — Where are you experiencing pain in your right foot?

Illustrated multi-select pain map. Each valid selection or combination proceeds to Q7.

- No foot pain → Q7
- The arch → Q7
- The forefoot → Q7
- The heel → Q7
- The Achilles area → Q7
- The Ankle → Q7
- Ball of foot → Q7
- Top of foot → Q7
- Big toe → Q7
- Toes → Q7
- Knee → Q7
- All over → Q7

### Q7 — What is your gender?

- Man → Q8
- Woman → Q8

### Q8 — What shoe size do you wear?

- Every half-size from 5 through 18.5 → Q9

### Q9 — To ensure optimal support, we customize your orthotics based on body weight.

- 80–125 lbs → Q10
- 130–180 lbs → Q10
- 190–240 lbs → Q10
- 250 lbs and above → Q10

### Q10 — What type of shoes are you putting your orthotics in?

Multi-select. Each valid selection or combination proceeds to Q11.

- Sneakers / Everyday Shoes → Q11
- Running Shoes → Q11
- Work / Hiking Boots → Q11
- Dress Shoes → Q11
- Pickleball / Tennis Shoes → Q11
- Golf Shoes → Q11
- Cycling Shoes → Q11
- Basketball Shoes → Q11
- Soccer / Football Shoes → Q11
- Gym / Weight Lifting Shoes → Q11
- Hockey / Skates → Q11

### Q11 — You're all set! Is there anything else you'd like to tell us?

- Optional text, including blank → Q12

### Q12 — Almost done!

- Valid full name and email → Q13

### Q13 — You're only one step away...

- `Let's Go -->` → Result

### Result

- Heading: `Awesome {name}, we got your answers. They'll be used to create your custom orthotic.`
- Product: `Custom Orthotic Insoles`
- Price: `$249.00 USD`
- Compare-at price: `$499.00 USD`
- Actions: `Add to cart`, `Proceed to cart (0)`