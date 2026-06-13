export interface SentenceQuestion {
  id: number;
  sentence: string;
  acceptedAnswers: string[];
}

export interface PassageRecall {
  id: number;
  title: string;
  passage: string;
}

export interface EmailTask {
  situation: string;
  task: string;
}

export interface PracticeTest {
  id: number;
  title: string;
  sentenceCompletion: SentenceQuestion[];
  passageRecall: PassageRecall[];
  emailWriting: EmailTask;
}

export const PRACTICE_TESTS: PracticeTest[] = [
  {
    id: 1,
    title: "TCS Verbal Ability Practice – Set 1",
    sentenceCompletion: [
      { id: 1, sentence: "The manager appreciated her ________ approach to solving customer complaints.", acceptedAnswers: ["proactive", "positive", "constructive", "helpful", "professional", "prompt", "efficient"] },
      { id: 2, sentence: "The students were asked to ________ their assignments before Friday.", acceptedAnswers: ["submit", "complete", "finish", "hand in", "upload", "deliver", "turn in"] },
      { id: 3, sentence: "Due to heavy rain, traffic movement was severely ________.", acceptedAnswers: ["disrupted", "halted", "delayed", "affected", "congested", "blocked", "slowed", "obstructed"] },
      { id: 4, sentence: "The scientist presented clear ________ to support his theory.", acceptedAnswers: ["evidence", "proof", "data", "facts", "arguments", "findings"] },
      { id: 5, sentence: "The company plans to ________ its operations to new cities.", acceptedAnswers: ["expand", "extend", "grow", "spread", "scale", "launch"] },
      { id: 6, sentence: "His speech was so ________ that everyone listened attentively.", acceptedAnswers: ["inspiring", "impressive", "eloquent", "engaging", "persuasive", "powerful", "moving", "captivating", "interesting"] },
      { id: 7, sentence: "The team worked together to ________ the project on time.", acceptedAnswers: ["complete", "finish", "deliver", "execute", "accomplish", "submit"] },
      { id: 8, sentence: "The new software helps ________ repetitive tasks.", acceptedAnswers: ["automate", "simplify", "reduce", "streamline", "eliminate", "handle", "manage"] },
      { id: 9, sentence: "The teacher encouraged students to remain ________ during examinations.", acceptedAnswers: ["calm", "quiet", "silent", "focused", "composed", "peaceful"] },
      { id: 10, sentence: "The sudden increase in demand created a ________ of products.", acceptedAnswers: ["shortage", "scarcity", "lack", "deficit", "surplus"] },
      { id: 11, sentence: "Employees must ________ company policies at all times.", acceptedAnswers: ["follow", "obey", "respect", "observe", "uphold", "adhere to"] },
      { id: 12, sentence: "The athlete showed remarkable ________ during the competition.", acceptedAnswers: ["stamina", "resilience", "determination", "performance", "strength", "skill", "endurance", "spirit"] },
      { id: 13, sentence: "The report highlighted several areas that needed ________.", acceptedAnswers: ["improvement", "attention", "work", "focus", "revision", "changes", "modifications"] },
      { id: 14, sentence: "The organization is committed to promoting ________ in the workplace.", acceptedAnswers: ["diversity", "equality", "inclusion", "inclusivity", "harmony", "safety", "fairness", "respect"] },
      { id: 15, sentence: "The engineer carefully ________ the machine before starting it.", acceptedAnswers: ["inspected", "checked", "examined", "tested", "evaluated", "analyzed"] },
      { id: 16, sentence: "The meeting was postponed due to ________ circumstances.", acceptedAnswers: ["unforeseen", "unavoidable", "unfavorable", "unfortunate", "unexpected"] },
      { id: 17, sentence: "Effective communication can ________ misunderstandings.", acceptedAnswers: ["prevent", "reduce", "avoid", "minimize", "resolve", "eliminate", "clear"] },
      { id: 18, sentence: "The library offers a ________ collection of books.", acceptedAnswers: ["vast", "diverse", "wide", "huge", "large", "extensive", "great"] },
      { id: 19, sentence: "The company rewarded employees for their ________ performance.", acceptedAnswers: ["outstanding", "exceptional", "excellent", "stellar", "extraordinary", "exemplary", "great"] },
      { id: 20, sentence: "The customer expressed ________ with the quality of service.", acceptedAnswers: ["satisfaction", "dissatisfaction", "displeasure", "pleasure", "unhappiness", "grade", "happiness"] }
    ],
    passageRecall: [
      {
        id: 1,
        title: "Passage Recall 1",
        passage: "Cloud computing has transformed the way businesses store and access information. Instead of relying on physical servers, organizations can use online platforms to manage data securely. This technology reduces operational costs, improves flexibility, and enables employees to work remotely. As a result, cloud services have become an essential part of modern business operations."
      },
      {
        id: 2,
        title: "Passage Recall 2",
        passage: "Many companies encourage employees to participate in training programs. These programs help workers develop technical and interpersonal skills. Continuous learning improves productivity, increases confidence, and prepares employees for future responsibilities. Organizations that invest in employee development often achieve better performance and higher retention rates."
      },
      {
        id: 3,
        title: "Passage Recall 3",
        passage: "Renewable energy sources such as solar and wind power are becoming increasingly popular. Unlike fossil fuels, renewable energy produces less pollution and can be replenished naturally. Governments and businesses are investing heavily in sustainable energy projects to reduce environmental impact and ensure long-term energy security."
      },
      {
        id: 4,
        title: "Passage Recall 4",
        passage: "Effective teamwork requires trust, communication, and shared goals. Team members who collaborate openly can solve problems more efficiently and generate innovative ideas. Successful teams respect different perspectives and support one another in achieving common objectives."
      }
    ],
    emailWriting: {
      situation: "Requesting certificate of completion.",
      task: "Write an email to the course coordinator requesting the issuance of your certificate. Mention your registration details, explain the situation politely, and request an update regarding the certificate."
    }
  },
  {
    id: 2,
    title: "TCS Verbal Ability Practice – Set 2",
    sentenceCompletion: [
      { id: 1, sentence: "The teacher praised the student for her ________ performance in the exams.", acceptedAnswers: ["outstanding", "exceptional", "excellent", "stellar", "remarkable", "brilliant", "great"] },
      { id: 2, sentence: "Please ________ the form carefully before submitting it.", acceptedAnswers: ["read", "review", "fill", "check", "examine", "verify"] },
      { id: 3, sentence: "The heavy workload left him feeling completely ________.", acceptedAnswers: ["exhausted", "overwhelmed", "tired", "drained", "stressed", "fatigued"] },
      { id: 4, sentence: "The committee reached a ________ decision after long discussions.", acceptedAnswers: ["unanimous", "joint", "collective", "mutual", "common", "shared"] },
      { id: 5, sentence: "Regular exercise helps to ________ overall health and fitness.", acceptedAnswers: ["improve", "maintain", "boost", "enhance", "promote", "support"] },
      { id: 6, sentence: "Her ________ explanation made the difficult concept easy to understand.", acceptedAnswers: ["clear", "simple", "lucid", "excellent", "elegant", "detailed"] },
      { id: 7, sentence: "The government announced new measures to ________ unemployment.", acceptedAnswers: ["reduce", "tackle", "combat", "curb", "address", "decrease", "fight"] },
      { id: 8, sentence: "The artist used bright colors to ________ the painting.", acceptedAnswers: ["enhance", "beautify", "highlight", "complete", "enrich", "brighten"] },
      { id: 9, sentence: "Students should always ________ their notes before the test.", acceptedAnswers: ["revise", "review", "study", "read", "check"] },
      { id: 10, sentence: "The new policy aims to ________ customer satisfaction levels.", acceptedAnswers: ["increase", "improve", "boost", "enhance", "raise", "maximize"] },
      { id: 11, sentence: "He showed great ________ in handling the difficult situation.", acceptedAnswers: ["maturity", "patience", "skill", "composure", "courage", "calm", "wisdom", "tact"] },
      { id: 12, sentence: "The book provides valuable ________ into Indian history.", acceptedAnswers: ["insights", "insight", "information", "perspectives", "knowledge"] },
      { id: 13, sentence: "The manager asked the team to ________ the deadline.", acceptedAnswers: ["meet", "respect", "honor", "observe"] },
      { id: 14, sentence: "Proper planning is essential for ________ success.", acceptedAnswers: ["ensuring", "achieving", "overall", "long-term", "guaranteeing"] },
      { id: 15, sentence: "The doctor advised her to ________ from junk food.", acceptedAnswers: ["abstain", "refrain", "stay away", "avoid"] },
      { id: 16, sentence: "The conference was attended by ________ experts from around the world.", acceptedAnswers: ["renowned", "eminent", "leading", "prominent", "famous", "distinguished"] },
      { id: 17, sentence: "She has a ________ habit of reading before bedtime.", acceptedAnswers: ["regular", "daily", "constant", "good", "set"] },
      { id: 18, sentence: "The company is looking for candidates with strong ________ skills.", acceptedAnswers: ["communication", "technical", "leadership", "analytical", "interpersonal"] },
      { id: 19, sentence: "The weather forecast predicts ________ rains in the coming days.", acceptedAnswers: ["heavy", "torrential", "continuous", "abundant", "severe"] },
      { id: 20, sentence: "His ________ attitude helped him overcome many challenges.", acceptedAnswers: ["positive", "optimistic", "resilient", "determined", "confident", "can-do"] }
    ],
    passageRecall: [
      {
        id: 1,
        title: "Passage Recall 1",
        passage: "Time management plays a vital role in achieving personal and professional goals. By prioritizing tasks and avoiding distractions, individuals can accomplish more in less time. Good time management reduces stress, improves work-life balance, and increases overall productivity. Many successful people credit their achievements to effective planning and discipline."
      },
      {
        id: 2,
        title: "Passage Recall 2",
        passage: "Social media has become a powerful tool for communication and marketing. It allows businesses to reach a global audience quickly and interact directly with customers. However, excessive use can lead to privacy concerns and reduced face-to-face interactions. Balancing online and offline activities is important for healthy relationships."
      },
      {
        id: 3,
        title: "Passage Recall 3",
        passage: "Leadership qualities include vision, integrity, and the ability to inspire others. Great leaders motivate their teams and lead by example. They are open to feedback and willing to make tough decisions when necessary. Effective leadership is crucial for the growth and success of any organization."
      },
      {
        id: 4,
        title: "Passage Recall 4",
        passage: "Healthy eating habits contribute significantly to physical and mental well-being. A balanced diet rich in fruits, vegetables, and whole grains provides essential nutrients. Avoiding processed foods and staying hydrated helps maintain energy levels and prevents various diseases. Small dietary changes can lead to long-term health benefits."
      }
    ],
    emailWriting: {
      situation: "Following up on a job interview.",
      task: "Write an email to the HR manager politely following up on your interview status. Mention the position you applied for, the date of the interview, and request an update on the selection process."
    }
  },
  {
    id: 3,
    title: "TCS Verbal Ability Practice – Set 3",
    sentenceCompletion: [
      { id: 1, sentence: "The principal emphasized the importance of ________ attendance.", acceptedAnswers: ["regular", "consistent", "daily", "full", "punctual"] },
      { id: 2, sentence: "She was able to ________ the problem with a simple solution.", acceptedAnswers: ["solve", "resolve", "address", "fix", "tackle"] },
      { id: 3, sentence: "The festival created a ________ atmosphere in the entire city.", acceptedAnswers: ["joyful", "vibrant", "lively", "cheerful", "festive", "celebratory", "wonderful"] },
      { id: 4, sentence: "Employees are expected to maintain ________ in the workplace.", acceptedAnswers: ["professionalism", "discipline", "decorum", "harmony", "peace", "standards"] },
      { id: 5, sentence: "The novel received ________ reviews from critics.", acceptedAnswers: ["rave", "excellent", "favorable", "positive", "mixed", "stellar"] },
      { id: 6, sentence: "Regular practice is the key to ________ any skill.", acceptedAnswers: ["mastering", "improving", "developing", "learning", "perfecting", "honing"] },
      { id: 7, sentence: "The bank offers various ________ schemes for customers.", acceptedAnswers: ["investment", "saving", "savings", "financial", "loan", "welfare"] },
      { id: 8, sentence: "His ________ behavior surprised everyone at the party.", acceptedAnswers: ["unusual", "strange", "eccentric", "rude", "bizarre", "polite", "peculiar"] },
      { id: 9, sentence: "The report must be submitted in a ________ format.", acceptedAnswers: ["standard", "specific", "brief", "written", "prescribed", "digital"] },
      { id: 10, sentence: "Yoga helps in improving mental ________ and flexibility.", acceptedAnswers: ["clarity", "focus", "peace", "health", "alertness", "sharpness", "stamina"] },
      { id: 11, sentence: "The detective gathered enough ________ to solve the case.", acceptedAnswers: ["evidence", "clues", "proof", "information", "facts"] },
      { id: 12, sentence: "The school organizes ________ events to promote creativity.", acceptedAnswers: ["various", "creative", "cultural", "annual", "special", "frequent"] },
      { id: 13, sentence: "She has a natural ________ for learning languages quickly.", acceptedAnswers: ["flair", "aptitude", "talent", "gift", "ability", "inclination"] },
      { id: 14, sentence: "The government is taking steps to ________ traffic congestion.", acceptedAnswers: ["reduce", "ease", "alleviate", "control", "tackle", "minimize"] },
      { id: 15, sentence: "Honest feedback is necessary for personal ________.", acceptedAnswers: ["growth", "development", "improvement", "progress", "evolution"] },
      { id: 16, sentence: "The team celebrated their ________ victory enthusiastically.", acceptedAnswers: ["spectacular", "historic", "grand", "recent", "glorious", "brilliant", "deserved"] },
      { id: 17, sentence: "Reading books can ________ your vocabulary significantly.", acceptedAnswers: ["improve", "enhance", "expand", "boost", "enrich", "increase"] },
      { id: 18, sentence: "The instructions were ________ and easy to follow.", acceptedAnswers: ["clear", "simple", "lucid", "straightforward", "precise"] },
      { id: 19, sentence: "He is known for his ________ approach to problem-solving.", acceptedAnswers: ["innovative", "analytical", "practical", "creative", "systematic", "logical", "pragmatic"] },
      { id: 20, sentence: "The museum displays a wide ________ of historical artifacts.", acceptedAnswers: ["range", "variety", "collection", "array", "exhibition"] }
    ],
    passageRecall: [
      {
        id: 1,
        title: "Passage Recall 1",
        passage: "Artificial Intelligence is rapidly changing various industries including healthcare, finance, and transportation. AI systems can analyze large amounts of data and make accurate predictions. While it offers many benefits, experts also warn about ethical concerns and job displacement. Responsible development of AI is essential for its positive impact."
      },
      {
        id: 2,
        title: "Passage Recall 2",
        passage: "Volunteering provides an opportunity to give back to society while gaining new experiences. Volunteers develop empathy, leadership skills, and a sense of purpose. Many organizations rely on volunteers to support their community projects and social initiatives."
      },
      {
        id: 3,
        title: "Passage Recall 3",
        passage: "E-commerce has revolutionized the way people shop. Customers can now browse and purchase products from the comfort of their homes. This convenience has increased competition among sellers and improved service standards. However, it also raises concerns about data security and product quality."
      },
      {
        id: 4,
        title: "Passage Recall 4",
        passage: "Emotional intelligence is the ability to understand and manage one’s own emotions and those of others. People with high emotional intelligence build better relationships and handle stress effectively. It is considered as important as technical skills in the modern workplace."
      }
    ],
    emailWriting: {
      situation: "Lost a borrowed library book.",
      task: "Write an email to the librarian explaining the situation, apologizing, and asking about the procedure to replace the lost book or pay any fine."
    }
  },
  {
    id: 4,
    title: "TCS Verbal Ability Practice – Set 4",
    sentenceCompletion: [
      { id: 1, sentence: "The speaker delivered an ________ speech at the annual function.", acceptedAnswers: ["inspiring", "impressive", "eloquent", "outstanding", "excellent", "emotional"] },
      { id: 2, sentence: "Please ________ your phone before entering the examination hall.", acceptedAnswers: ["silence", "silent", "switch off", "turn off", "mute", "disable"] },
      { id: 3, sentence: "The project requires ________ attention to detail.", acceptedAnswers: ["close", "meticulous", "careful", "strict", "undivided", "great"] },
      { id: 4, sentence: "She made a ________ effort to complete the task on time.", acceptedAnswers: ["sincere", "determined", "great", "conscious", "valiant", "mindful"] },
      { id: 5, sentence: "The advertisement was designed to ________ young customers.", acceptedAnswers: ["attract", "appeal to", "engage", "target", "lure", "interest"] },
      { id: 6, sentence: "Good manners reflect a person’s ________ upbringing.", acceptedAnswers: ["good", "proper", "decent", "excellent", "respected"] },
      { id: 7, sentence: "The company conducted a ________ survey to understand customer needs.", acceptedAnswers: ["comprehensive", "detailed", "thorough", "market", "wide", "extensive"] },
      { id: 8, sentence: "He has a ________ memory and remembers everything clearly.", acceptedAnswers: ["sharp", "vivid", "excellent", "remarkable", "photographic", "strong"] },
      { id: 9, sentence: "The coach motivated the players to give their ________ best.", acceptedAnswers: ["absolute", "very", "personal", "own"] },
      { id: 10, sentence: "Environmental ________ is everyone’s responsibility.", acceptedAnswers: ["protection", "conservation", "preservation", "safety", "cleanliness"] },
      { id: 11, sentence: "The new manager introduced several ________ changes.", acceptedAnswers: ["significant", "major", "key", "meaningful", "welcome", "drastic"] },
      { id: 12, sentence: "Her ________ smile made everyone feel welcome.", acceptedAnswers: ["warm", "beautiful", "friendly", "pleasant", "genial", "welcoming"] },
      { id: 13, sentence: "Students must follow the ________ rules of the institution.", acceptedAnswers: ["strict", "established", "basic", "set", "prescribed"] },
      { id: 14, sentence: "The scientist made a groundbreaking ________ in research.", acceptedAnswers: ["discovery", "breakthrough", "advancement", "finding", "contribution"] },
      { id: 15, sentence: "Physical activity is important for maintaining a healthy ________.", acceptedAnswers: ["lifestyle", "body", "physique", "mind", "weight", "life"] },
      { id: 16, sentence: "The judge listened to both sides before giving a ________ verdict.", acceptedAnswers: ["fair", "balanced", "just", "impartial", "neutral", "unbiased"] },
      { id: 17, sentence: "The hotel provides ________ facilities for its guests.", acceptedAnswers: ["excellent", "luxurious", "modern", "premium", "deluxe", "quality"] },
      { id: 18, sentence: "He is very ________ about keeping his workspace organized.", acceptedAnswers: ["particular", "careful", "fussy", "disciplined", "serious", "meticulous"] },
      { id: 19, sentence: "The workshop helped participants develop new ________.", acceptedAnswers: ["skills", "techniques", "perspectives", "abilities", "ideas"] },
      { id: 20, sentence: "The film received mixed ________ from the audience.", acceptedAnswers: ["reviews", "feedback", "responses", "reactions", "reception"] }
    ],
    passageRecall: [
      {
        id: 1,
        title: "Passage Recall 1",
        passage: "Digital payments have become very popular in recent years. They offer convenience, speed, and better tracking of expenses. However, users must be careful about cybersecurity threats and protect their personal information. Many countries are promoting cashless transactions to build a stronger economy."
      },
      {
        id: 2,
        title: "Passage Recall 2",
        passage: "Mentorship plays a key role in career development. Experienced professionals guide juniors by sharing knowledge and providing constructive feedback. A good mentor helps mentees build confidence and avoid common mistakes. Many successful people acknowledge the support of their mentors."
      },
      {
        id: 3,
        title: "Passage Recall 3",
        passage: "Tourism contributes significantly to the economy of many countries. It creates employment opportunities and promotes cultural exchange. Sustainable tourism practices are important to protect local environments and communities from negative impacts."
      },
      {
        id: 4,
        title: "Passage Recall 4",
        passage: "Critical thinking skills help individuals analyze information objectively and make informed decisions. These skills are essential in both academic and professional settings. Practicing critical thinking improves problem-solving abilities and reduces the influence of biases."
      }
    ],
    emailWriting: {
      situation: "Following up with a team member on missed deadlines.",
      task: "Write a polite but firm email to the team member expressing concern, discussing the issue, and requesting a meeting to resolve it."
    }
  },
  {
    id: 5,
    title: "TCS Verbal Ability Practice – Set 5",
    sentenceCompletion: [
      { id: 1, sentence: "The children were ________ by the magician’s performance.", acceptedAnswers: ["spellbound", "amazed", "fascinated", "mesmerized", "delighted", "thrilled", "captivated"] },
      { id: 2, sentence: "Please keep the information ________ until further notice.", acceptedAnswers: ["confidential", "secret", "private", "hidden", "secure"] },
      { id: 3, sentence: "The university offers ________ courses in various fields.", acceptedAnswers: ["diverse", "multiple", "various", "specialized", "numerous", "wide-ranging"] },
      { id: 4, sentence: "Regular breaks during work can ________ productivity.", acceptedAnswers: ["improve", "boost", "increase", "enhance", "maximize"] },
      { id: 5, sentence: "The athlete trained ________ to win the gold medal.", acceptedAnswers: ["hard", "rigorously", "intensely", "daily", "tirelessly"] },
      { id: 6, sentence: "The manager appreciated the team’s ________ and dedication.", acceptedAnswers: ["hardwork", "hard work", "commitment", "efforts", "dedication", "contribution", "performance"] },
      { id: 7, sentence: "She has a ________ collection of rare stamps.", acceptedAnswers: ["unique", "vast", "rare", "valuable", "magnificent", "wonderful"] },
      { id: 8, sentence: "The policy change will ________ all employees equally.", acceptedAnswers: ["affect", "impact", "influence", "benefit", "apply to"] },
      { id: 9, sentence: "Good communication is the ________ of strong relationships.", acceptedAnswers: ["foundation", "basis", "cornerstone", "key", "backbone"] },
      { id: 10, sentence: "The detective followed every possible ________ in the investigation.", acceptedAnswers: ["clue", "lead", "angle", "line", "detail"] },
      { id: 11, sentence: "The garden was filled with ________ flowers of different colors.", acceptedAnswers: ["vibrant", "beautiful", "colorful", "radiant", "glorious"] },
      { id: 12, sentence: "He always remains ________ even in difficult situations.", acceptedAnswers: ["calm", "composed", "positive", "patient", "resilient", "poised"] },
      { id: 13, sentence: "The seminar provided useful ________ on career opportunities.", acceptedAnswers: ["insights", "information", "guidance", "tips", "advice", "knowledge"] },
      { id: 14, sentence: "The company is expanding its ________ in the Asian market.", acceptedAnswers: ["presence", "business", "operations", "footprint", "reach", "market"] },
      { id: 15, sentence: "She handled the criticism with great ________.", acceptedAnswers: ["grace", "maturity", "dignity", "poise", "composure", "tact"] },
      { id: 16, sentence: "The new building has excellent ________ facilities.", acceptedAnswers: ["modern", "state-of-the-art", "residential", "advanced", "recreational", "amenity"] },
      { id: 17, sentence: "Students are encouraged to participate in ________ activities.", acceptedAnswers: ["extracurricular", "creative", "sports", "co-curricular", "various"] },
      { id: 18, sentence: "The doctor prescribed medicine to ________ the pain.", acceptedAnswers: ["relieve", "alleviate", "ease", "reduce", "lessen", "mitigate"] },
      { id: 19, sentence: "His ________ nature makes him popular among friends.", acceptedAnswers: ["friendly", "genial", "amiable", "helpful", "cheerful", "natured"] },
      { id: 20, sentence: "The report was submitted well within the given ________.", acceptedAnswers: ["deadline", "timeline", "timeframe", "period", "schedule"] }
    ],
    passageRecall: [
      {
        id: 1,
        title: "Passage Recall 1",
        passage: "Work-from-home has become a common practice after the pandemic. It offers flexibility and saves commuting time for employees. Companies benefit from reduced office costs but face challenges in maintaining team collaboration and company culture. Many organizations now follow a hybrid working model."
      },
      {
        id: 2,
        title: "Passage Recall 2",
        passage: "Financial literacy is important for making smart money decisions. Understanding budgeting, saving, and investing helps individuals achieve financial stability. Schools and parents should teach children basic financial concepts from an early age."
      },
      {
        id: 3,
        title: "Passage Recall 3",
        passage: "Wildlife conservation is necessary to protect endangered species and maintain ecological balance. Deforestation and poaching are major threats to biodiversity. Governments and NGOs are working together to create protected areas and raise awareness."
      },
      {
        id: 4,
        title: "Passage Recall 4",
        passage: "Creativity is a valuable skill in today’s competitive world. It involves thinking differently and coming up with original ideas. Creative individuals often excel in problem-solving and innovation. Encouraging creativity in education can benefit students throughout their lives."
      }
    ],
    emailWriting: {
      situation: "Received a damaged item from an online store.",
      task: "Write an email to the customer service department explaining the issue, providing order details, and requesting a replacement or refund."
    }
  }
];
