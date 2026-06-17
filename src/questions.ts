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
  },
  {
    id: 6,
    title: "TCS Verbal Ability Practice – Set 6",
    sentenceCompletion: [
      { id: 1, sentence: "The company seeks to ________ its carbon footprint by 2030.", acceptedAnswers: ["reduce", "minimize", "decrease", "lessen", "curb"] },
      { id: 2, sentence: "A successful product must ________ the needs of its target user.", acceptedAnswers: ["meet", "satisfy", "fulfill", "address", "match"] },
      { id: 3, sentence: "The committee will ________ the proposal during the next session.", acceptedAnswers: ["review", "evaluate", "examine", "discuss", "assess", "consider"] },
      { id: 4, sentence: "His ________ devotion to work earned him a promotion.", acceptedAnswers: ["sincere", "absolute", "unwavering", "complete", "genuine", "consistent"] },
      { id: 5, sentence: "The team was able to ________ the server error within ten minutes.", acceptedAnswers: ["resolve", "fix", "solve", "remedy", "rectify", "address"] },
      { id: 6, sentence: "Continuous learning is essential to ________ in a competitive industry.", acceptedAnswers: ["succeed", "thrive", "excel", "grow", "survive"] },
      { id: 7, sentence: "She managed to ________ her thoughts clearly during the debate.", acceptedAnswers: ["express", "articulate", "present", "convey", "state"] },
      { id: 8, sentence: "The new layout is designed to ________ user interaction.", acceptedAnswers: ["improve", "enhance", "optimize", "boost", "facilitate"] },
      { id: 9, sentence: "He remains ________ about the future of the project despite setbacks.", acceptedAnswers: ["optimistic", "positive", "hopeful", "confident"] },
      { id: 10, sentence: "Please ________ the accuracy of the statements in the report.", acceptedAnswers: ["verify", "check", "confirm", "ensure", "validate"] },
      { id: 11, sentence: "The main goal of the seminar is to ________ collaboration.", acceptedAnswers: ["promote", "foster", "encourage", "drive", "strengthen", "boost"] },
      { id: 12, sentence: "A professional must keep client details completely ________.", acceptedAnswers: ["confidential", "secure", "private", "secret"] },
      { id: 13, sentence: "With proper delegation of authority, we can ________ efficiency.", acceptedAnswers: ["improve", "increase", "maximize", "enhance", "boost", "strengthen"] },
      { id: 14, sentence: "The executive board reached a ________ outcome after voting.", acceptedAnswers: ["favorable", "positive", "unanimous", "successful", "satisfactory"] },
      { id: 15, sentence: "The company will ________ new features into the app next week.", acceptedAnswers: ["introduce", "launch", "integrate", "release", "add"] },
      { id: 16, sentence: "Your ________ support made it possible to hit our sales target.", acceptedAnswers: ["constant", "continuous", "steady", "unwavering", "strong", "active"] },
      { id: 17, sentence: "The system is programmed to ________ any security breaches immediately.", acceptedAnswers: ["detect", "identify", "report", "block", "alert"] },
      { id: 18, sentence: "She possesses an ________ eye for detail in design.", acceptedAnswers: ["excellent", "exceptional", "incredible", "outstanding", "sharp", "amazing"] },
      { id: 19, sentence: "The government has proposed new guidelines to ________ water resources.", acceptedAnswers: ["conserve", "protect", "preserve", "save", "manage"] },
      { id: 20, sentence: "He drafted a ________ summary of the financial quarters.", acceptedAnswers: ["concise", "clear", "brief", "short", "comprehensive"] }
    ],
    passageRecall: [
      {
        id: 1,
        title: "Passage Recall 1",
        passage: "Corporate social responsibility enables companies to contribute positively to society. By supporting educational, health, and environmental programs, corporations build strong goodwill. Customers prefer buying from brands that demonstrate ethical practices and social awareness."
      },
      {
        id: 2,
        title: "Passage Recall 2",
        passage: "Active listening is an essential prerequisite of effective management. Managers who listen patiently build stronger trust and understanding. It allows them to understand root issues before deciding on critical resolutions."
      },
      {
        id: 3,
        title: "Passage Recall 3",
        passage: "Agile methodologies promote iterative software development with continuous client collaboration. By breaking large features into manageable sprints, development teams reduce operational risks and deliver products faster."
      },
      {
        id: 4,
        title: "Passage Recall 4",
        passage: "Green building initiatives utilize sustainable resources and energy-efficient lighting. These buildings consume less power and minimize global warming impacts. They improve workspace health and air quality for corporate employees."
      }
    ],
    emailWriting: {
      situation: "Reporting a system security flaw to the IT desk.",
      task: "Write an email to the IT security officer describing the critical system vulnerability you observed. Mention the department systems affected, apologize for any inconvenience, and request immediate troubleshooting support."
    }
  },
  {
    id: 7,
    title: "TCS Verbal Ability Practice – Set 7",
    sentenceCompletion: [
      { id: 1, sentence: "The project leader requested a ________ update on our software progress.", acceptedAnswers: ["weekly", "daily", "regular", "detailed", "quick", "brief"] },
      { id: 2, sentence: "We must ________ the server configuration to improve security.", acceptedAnswers: ["update", "modify", "adjust", "check", "verify", "secure"] },
      { id: 3, sentence: "The trainer provided ________ assistance to struggling students.", acceptedAnswers: ["personal", "individual", "prompt", "valuable", "timely", "constant"] },
      { id: 4, sentence: "Industry standards ________ that all data must be encrypted.", acceptedAnswers: ["require", "demand", "dictate", "mandate", "specify"] },
      { id: 5, sentence: "She has an ________ understanding of corporate regulations.", acceptedAnswers: ["excellent", "deep", "outstanding", "thorough", "exceptional"] },
      { id: 6, sentence: "The software update will ________ the system's performance.", acceptedAnswers: ["improve", "enhance", "boost", "speed up", "optimize"] },
      { id: 7, sentence: "Our company is committed to ________ global clients professionally.", acceptedAnswers: ["serving", "helping", "supporting", "assisting", "guiding"] },
      { id: 8, sentence: "He maintains a highly ________ schedule during critical projects.", acceptedAnswers: ["disciplined", "strict", "organized", "busy", "structured"] },
      { id: 9, sentence: "They discussed several ________ options to reduce expenses.", acceptedAnswers: ["viable", "possible", "effective", "practical", "different"] },
      { id: 10, sentence: "The system will generate a detailed ________ after audit.", acceptedAnswers: ["report", "document", "log", "summary", "analysis"] },
      { id: 11, sentence: "You should ________ professional advice before investing capital.", acceptedAnswers: ["seek", "get", "obtain", "consult", "request", "take"] },
      { id: 12, sentence: "A balanced team exhibits ________ and mutual respect.", acceptedAnswers: ["trust", "harmony", "understanding", "cooperation", "unity"] },
      { id: 13, sentence: "The developer managed to ________ the code block efficiently.", acceptedAnswers: ["refactor", "optimize", "rewrite", "debug", "clean"] },
      { id: 14, sentence: "A clear policy helps ________ confusion among staff members.", acceptedAnswers: ["prevent", "avoid", "eliminate", "reduce", "minimize"] },
      { id: 15, sentence: "They demonstrated high ________ throughout the consultation phases.", acceptedAnswers: ["professionalism", "competence", "integrity", "reliability", "efficiency"] },
      { id: 16, sentence: "The product launch was a ________ success globally.", acceptedAnswers: ["grand", "brilliant", "major", "great", "huge", "resounding"] },
      { id: 17, sentence: "Our main focus is to ________ healthy habits among kids.", acceptedAnswers: ["promote", "encourage", "foster", "build", "nurture"] },
      { id: 18, sentence: "They encountered ________ challenges during system integration.", acceptedAnswers: ["unexpected", "unforeseen", "several", "major", "complex", "technical"] },
      { id: 19, sentence: "Please ________ that all fields are filled accurately.", acceptedAnswers: ["ensure", "verify", "check", "confirm"] },
      { id: 20, sentence: "She received ________ remarks from her reporting manager.", acceptedAnswers: ["positive", "complimentary", "favorable", "excellent", "supportive"] }
    ],
    passageRecall: [
      {
        id: 1,
        title: "Passage Recall 1",
        passage: "Cloud analytics platforms empower businesses to extract meaningful insights from client records. By identifying purchasing behavior in real-time, brands optimize their supply chains. This results in reduced wastes and happier customers."
      },
      {
        id: 2,
        title: "Passage Recall 2",
        passage: "Creative design workshops foster cross-team collaboration and help generate innovative ideas. Team members are encouraged to share original sketches without fear of initial criticism. This builds self-confidence and creative problem-solving skills."
      },
      {
        id: 3,
        title: "Passage Recall 3",
        passage: "Clean ocean initiatives work aggressively to protect endangered marine ecosystems from severe pollution. Plastic wastes are collected by robotic vessels, protecting marine mammals from accidental consumption. Raising civic responsibility is central to saving beaches."
      },
      {
        id: 4,
        title: "Passage Recall 4",
        passage: "Hybrid working is popular as it combines remote convenience with face-to-face brainstorming. This structure boosts employee motivation while streamlining building utility costs. However, establishing strong virtual protocols is vital for team cohesion."
      }
    ],
    emailWriting: {
      situation: "Inquiring about project billing invoice delay.",
      task: "Write a polite email to the vendor accounting representative inquiring about the delayed invoice for the June software development assignment. Polite greetings, state the urgency for billing closes, and ask them to send the details before Friday."
    }
  },
  {
    id: 8,
    title: "TCS Verbal Ability Practice – Set 8",
    sentenceCompletion: [
      { id: 1, sentence: "Every student should learn to ________ tasks effectively.", acceptedAnswers: ["prioritize", "manage", "organize", "handle", "schedule"] },
      { id: 2, sentence: "She has an ________ ability to speak multiple languages.", acceptedAnswers: ["exceptional", "extraordinary", "amazing", "incredible", "outstanding", "excellent"] },
      { id: 3, sentence: "Traffic laws help ________ public safety on the roads.", acceptedAnswers: ["ensure", "guarantee", "protect", "maintain", "promote"] },
      { id: 4, sentence: "A brief rest can help ________ your concentration levels.", acceptedAnswers: ["restore", "boost", "improve", "refresh", "raise", "increase"] },
      { id: 5, sentence: "The investigator gathered ________ evidence to confirm the claim.", acceptedAnswers: ["substantial", "concrete", "clear", "sufficient", "critical"] },
      { id: 6, sentence: "We should ________ energy to protect natural habitats.", acceptedAnswers: ["conserve", "save", "protect", "preserve"] },
      { id: 7, sentence: "The candidate spoke with great ________ and clarity.", acceptedAnswers: ["confidence", "poise", "conviction", "eloquence", "assurance"] },
      { id: 8, sentence: "The manager was pleased with our ________ effort.", acceptedAnswers: ["sincere", "joint", "collective", "honest", "great", "excellent"] },
      { id: 9, sentence: "The app relies on ________ research from academic studies.", acceptedAnswers: ["extensive", "thorough", "scholarly", "detailed", "rigorous"] },
      { id: 10, sentence: "They will ________ the new product at the convention.", acceptedAnswers: ["launch", "introduce", "unveil", "release", "present", "showcase"] },
      { id: 11, sentence: "The firm seeks to build ________ relationships with clients.", acceptedAnswers: ["strong", "lasting", "durable", "sustainable", "valuable", "fruitful"] },
      { id: 12, sentence: "Her feedback was ________ and helped us improve.", acceptedAnswers: ["constructive", "valuable", "helpful", "insightful", "excellent"] },
      { id: 13, sentence: "Our team leader is highly ________ to feedback.", acceptedAnswers: ["receptive", "open", "responsive", "attentive"] },
      { id: 14, sentence: "Regular maintenance is required for and to ________ breakdowns.", acceptedAnswers: ["prevent", "avoid", "eliminate", "reduce", "minimize"] },
      { id: 15, sentence: "She handled the complex escalations with great ________.", acceptedAnswers: ["poise", "grace", "skill", "tact", "maturity", "composure"] },
      { id: 16, sentence: "Critical thinking is an essential ________ for problem solving.", acceptedAnswers: ["skill", "tool", "ability", "prerequisite", "requirement"] },
      { id: 17, sentence: "They discussed the ________ of the new project schedule.", acceptedAnswers: ["details", "timeline", "scope", "plan", "feasibility", "metrics"] },
      { id: 18, sentence: "Heavy fog led to ________ flights at the airport.", acceptedAnswers: ["delayed", "cancelled", "disrupted", "suspended", "grounded"] },
      { id: 19, sentence: "An ________ diet provides necessary vitamins and minerals.", acceptedAnswers: ["balanced", "appropriate", "healthy", "optimal", "excellent"] },
      { id: 20, sentence: "He offered a ________ apology for the delayed mail.", acceptedAnswers: ["sincere", "genuine", "polite", "heartfelt", "quick"] }
    ],
    passageRecall: [
      {
        id: 1,
        title: "Passage Recall 1",
        passage: "Conflict resolution protocols are essential in modern workplaces. Interpersonal problems are addressed professionally before escalations occur. Encouraging constructive dialogue solves misunderstandings and preserves healthy working relationships."
      },
      {
        id: 2,
        title: "Passage Recall 2",
        passage: "Wildlife corridors allow biological passage between fragmented forests. These spaces help migratory animals find vital nutrients and mates safely. Integrating ecological plans into urban building development allows biodiversity growth."
      },
      {
        id: 3,
        title: "Passage Recall 3",
        passage: "Financial budgeting tools allow individuals to monitor expenses. Planning small savings targets prevents debts and protects wellness in difficult periods. Schools are introducing these core lessons to teach finance habits early."
      },
      {
        id: 4,
        title: "Passage Recall 4",
        passage: "Time optimization encourages workers to complete complex assignments first. By minimizing minor email checking during prime hours, people achieve high deep-work states. Good pacing helps build sustainable product outputs."
      }
    ],
    emailWriting: {
      situation: "Reporting a technical bug in the payroll portal.",
      task: "Write an email to the corporate helpdesk security representative reporting a server-side bug in the payroll dashboard. State the error details politely, suggest immediate escalation, and request correction updates."
    }
  },
  {
    id: 9,
    title: "TCS Verbal Ability Practice – Set 9",
    sentenceCompletion: [
      { id: 1, sentence: "Good leaders always ________ by inspiring example.", acceptedAnswers: ["lead", "guide", "manage", "motivate"] },
      { id: 2, sentence: "Please ________ the draft before sending it to clients.", acceptedAnswers: ["proofread", "review", "check", "edit", "verify", "read"] },
      { id: 3, sentence: "The recent policy will ________ positive growth in trade.", acceptedAnswers: ["promote", "foster", "favour", "encourage", "drive", "stimulate"] },
      { id: 4, sentence: "She is highly ________ for her exceptional achievements.", acceptedAnswers: ["respected", "admired", "praised", "known", "renowned"] },
      { id: 5, sentence: "We must ________ clear goals to track progress.", acceptedAnswers: ["establish", "set", "define", "determine"] },
      { id: 6, sentence: "The presentation was simple but ________ structured.", acceptedAnswers: ["well", "neatly", "professionally", "beautifully", "perfectly"] },
      { id: 7, sentence: "He is extremely ________ about keeping his room clean.", acceptedAnswers: ["particular", "careful", "fussy", "mindful", "meticulous"] },
      { id: 8, sentence: "Newer technologies can ________ standard communication routes.", acceptedAnswers: ["disrupt", "modify", "improve", "bypass", "enhance", "redefine"] },
      { id: 9, sentence: "A professional response needs to be ________ and respectful.", acceptedAnswers: ["polite", "courteous", "timely", "prompt", "brief", "formal"] },
      { id: 10, sentence: "They discussed various tactics to ________ market share.", acceptedAnswers: ["increase", "expand", "boost", "capture", "gain", "grow"] },
      { id: 11, sentence: "The research provides an ________ analysis of climate models.", acceptedAnswers: ["excellent", "indepth", "in-depth", "accurate", "comprehensive"] },
      { id: 12, sentence: "We must follow the ________ safety rules at construction sites.", acceptedAnswers: ["strict", "standard", "established", "mandatory", "prescribed"] },
      { id: 13, sentence: "Her ________ training helped her perform well under pressure.", acceptedAnswers: ["rigorous", "intense", "proper", "excellent", "consistent"] },
      { id: 14, sentence: "A clear target is essential for ________ success.", acceptedAnswers: ["ensuring", "achieving", "guaranteeing"] },
      { id: 15, sentence: "The director ________ the hard work of the team.", acceptedAnswers: ["appreciated", "praised", "recognized", "acknowledged", "applauded"] },
      { id: 16, sentence: "They encountered some ________ bugs during final test.", acceptedAnswers: ["unexpected", "unforeseen", "minor", "technical", "challenging"] },
      { id: 17, sentence: "Sustainable habits can ________ environmental degradation.", acceptedAnswers: ["prevent", "reduce", "arrest", "minimize", "slow down", "stop"] },
      { id: 18, sentence: "The library maintains a ________ reserve of historic files.", acceptedAnswers: ["vast", "large", "huge", "great", "valuable"] },
      { id: 19, sentence: "She exhibits an ________ attitude toward solving problems.", acceptedAnswers: ["excellent", "innovative", "constructive", "proactive", "positive"] },
      { id: 20, sentence: "The course coordinator will ________ completion reports soon.", acceptedAnswers: ["review", "evaluate", "verify", "release", "check", "approve"] }
    ],
    passageRecall: [
      {
        id: 1,
        title: "Passage Recall 1",
        passage: "Sustainable agriculture utilizes natural composting and crop rotation to preserve soil quality. By avoiding industrial synthetic chemicals, local farms safeguard river systems from toxic runoffs. This promotes eco balance in agricultural belts."
      },
      {
        id: 2,
        title: "Passage Recall 2",
        passage: "Technical debugging in software migration requires systematic logging. Developers isolate system logs sequentially to diagnose security issues. Establishing clean trace indexes reduces troubleshooting overheads dramatically."
      },
      {
        id: 3,
        title: "Passage Recall 3",
        passage: "Public transport development provides direct civic benefits. Express rail networks reduce daily highway congestion and carbon output. Affordable transit networks create better job opportunities for lower income families."
      },
      {
        id: 4,
        title: "Passage Recall 4",
        passage: "Workplace micro-learning provides short, highly targeted video courses daily. Employees absorb specialized compliance skills without disturbing their core tasks. Regular training promotes productivity and keeps teams up-to-date."
      }
    ],
    emailWriting: {
      situation: "Requesting a project review extension.",
      task: "Write an email to your project manager requesting a two-day extension for the client analytics presentation. Cite unexpected data testing delays, outline your recovery plan, and request an updated meeting schedule."
    }
  },
  {
    id: 10,
    title: "TCS Verbal Ability Practice – Set 10",
    sentenceCompletion: [
      { id: 1, sentence: "They are looking for candidates ________ in software engineering.", acceptedAnswers: ["proficient", "skilled", "expert", "experienced", "qualified"] },
      { id: 2, sentence: "Please ________ the files securely in the storage room.", acceptedAnswers: ["store", "keep", "save", "place", "lock"] },
      { id: 3, sentence: "The director will ________ client comments before launch.", acceptedAnswers: ["review", "examine", "consider", "evaluate", "check"] },
      { id: 4, sentence: "His ________ contribution to science was recognized widely.", acceptedAnswers: ["outstanding", "significant", "stellar", "exceptional", "great", "vivid"] },
      { id: 5, sentence: "They managed to ________ the electrical defect safely.", acceptedAnswers: ["repair", "fix", "resolve", "address"] },
      { id: 6, sentence: "Exercise is key to ________ healthy blood pressure.", acceptedAnswers: ["maintaining", "improving", "regulating", "achieving", "controlling"] },
      { id: 7, sentence: "We must ________ our thoughts professionally in client mails.", acceptedAnswers: ["express", "articulate", "present", "write", "state", "convey"] },
      { id: 8, sentence: "Regular maintenance can ________ overall gear duration.", acceptedAnswers: ["increase", "extend", "improve", "prolong", "heighten", "boost"] },
      { id: 9, sentence: "He remains ________ about recovering from the injury.", acceptedAnswers: ["optimistic", "confident", "positive", "hopeful"] },
      { id: 10, sentence: "Please ________ that all systems are online.", acceptedAnswers: ["ensure", "verify", "check", "confirm"] },
      { id: 11, sentence: "They implemented measures to ________ team coordination.", acceptedAnswers: ["promote", "boost", "improve", "encourage", "strengthen", "foster"] },
      { id: 12, sentence: "Client details must remain strictly ________.", acceptedAnswers: ["confidential", "secret", "private"] },
      { id: 13, sentence: "Proper scheduling help to ________ resource waste.", acceptedAnswers: ["minimize", "prevent", "reduce", "avoid"] },
      { id: 14, sentence: "The discussion led to a ________ outcome for both.", acceptedAnswers: ["favorable", "positive", "win-win", "successful", "satisfactory"] },
      { id: 15, sentence: "The firm plans to ________ new products next month.", acceptedAnswers: ["introduce", "unveil", "launch", "release", "present"] },
      { id: 16, sentence: "Your ________ focus is required for this operation.", acceptedAnswers: ["undivided", "complete", "sincere", "full", "absolute", "steady"] },
      { id: 17, sentence: "The app will ________ server performance automatically.", acceptedAnswers: ["monitor", "track", "evaluate", "optimize", "check"] },
      { id: 18, sentence: "She has an ________ eye for creative graphics.", acceptedAnswers: ["excellent", "exquisite", "exceptional", "outstanding", "amazing"] },
      { id: 19, sentence: "We must protect forests to ________ biodiversity.", acceptedAnswers: ["preserve", "conserve", "maintain", "save", "protect"] },
      { id: 20, sentence: "Her summary was ________ and well structured.", acceptedAnswers: ["concise", "clear", "brief", "well"] }
    ],
    passageRecall: [
      {
        id: 1,
        title: "Passage Recall 1",
        passage: "Data protection rules require commercial systems to acquire explicit consumer consent before auditing private profiles. Severe billing fines are imposed for non-compliance. These policies build digital trust and secure user data."
      },
      {
        id: 2,
        title: "Passage Recall 2",
        passage: "Strategic talent acquisition values candidate chemistry as much as academic scores. Inclusive recruiters evaluate collaborative potential through team bonding simulations. Correct assessment steps reduce executive attrition."
      },
      {
        id: 3,
        title: "Passage Recall 3",
        passage: "Regular system stress tests prevent runtime outages during high transactional loads. Core developers trace memory profiles to fix buffer overflows. Eliminating resource leaks ensures high application availability."
      },
      {
        id: 4,
        title: "Passage Recall 4",
        passage: "Agile retrospective discussions assist squads in optimizing continuous workflows. Team members list bottlenecks transparently to adjust planning parameters. Corrective actions reinforce team output velocities."
      }
    ],
    emailWriting: {
      situation: "Reporting wrong payroll calculation query.",
      task: "Write a polite email to the payroll department executive querying the June salary computation discrepancies. Respectfully list your computed working hours, state index files, and request calculation adjustment support."
    }
  },
  {
    id: 11,
    title: "TCS Verbal Ability Practice – Set 11",
    sentenceCompletion: [
      { id: 1, sentence: "The squad worked diligently to ________ the software system.", acceptedAnswers: ["deploy", "upgrade", "update", "improve", "build"] },
      { id: 2, sentence: "Always ________ the safety switches before cleaning machinery.", acceptedAnswers: ["deactivate", "disengage", "check", "verify", "turn off"] },
      { id: 3, sentence: "The manager offered ________ feedback to support our growth.", acceptedAnswers: ["constructive", "valuable", "positive", "helpful", "timely"] },
      { id: 4, sentence: "These guidelines ________ that all staff complete training.", acceptedAnswers: ["require", "mandate", "stipulate", "command", "specify"] },
      { id: 5, sentence: "She has an ________ knowledge of local history.", acceptedAnswers: ["excellent", "outstanding", "impressive", "extensive", "encyclopedic"] },
      { id: 6, sentence: "The recent update will ________ user retrieval times.", acceptedAnswers: ["improve", "shorten", "reduce", "boost", "speed up", "optimize"] },
      { id: 7, sentence: "The team was able to ________ the complex bug.", acceptedAnswers: ["resolve", "fix", "solve", "remedy", "eliminate"] },
      { id: 8, sentence: "He maintains an ________ list of all resources.", acceptedAnswers: ["organized", "accurate", "updated", "exhaustive", "meticulous"] },
      { id: 9, sentence: "We must ________ reliable ways to measure impact.", acceptedAnswers: ["establish", "find", "devise", "create", "discover"] },
      { id: 10, sentence: "They discussed options to ________ office utility costs.", acceptedAnswers: ["reduce", "decrease", "minimize", "cut"] },
      { id: 11, sentence: "Please ________ that the connection is active.", acceptedAnswers: ["ensure", "verify", "confirm", "check"] },
      { id: 12, sentence: "We should remain ________ in difficult circumstances.", acceptedAnswers: ["calm", "patient", "positive", "composed", "collected"] },
      { id: 13, sentence: "The seminar provided ________ knowledge on coding standards.", acceptedAnswers: ["valuable", "excellent", "useful", "vital", "practical"] },
      { id: 14, sentence: "The department is ________ its scope of operations.", acceptedAnswers: ["expanding", "widening", "increasing", "broadening"] },
      { id: 15, sentence: "She handled the clients with great ________.", acceptedAnswers: ["professionalism", "patience", "skill", "tact", "maturity", "composure"] },
      { id: 16, sentence: "The construction has been ________ due to bad forecast.", acceptedAnswers: ["delayed", "postponed", "halted", "suspended", "stopped"] },
      { id: 17, sentence: "Proper practice is critical to ________ any syntax.", acceptedAnswers: ["master", "learn", "understand", "excel"] },
      { id: 18, sentence: "They found some ________ errors during review.", acceptedAnswers: ["minor", "unexpected", "critical", "technical"] },
      { id: 19, sentence: "A safe environment helps ________ mental wellness.", acceptedAnswers: ["foster", "encourage", "promote", "protect", "support"] },
      { id: 20, sentence: "The document needs to be ________ formatted.", acceptedAnswers: ["properly", "correctly", "professionally", "perfectly", "consistently"] }
    ],
    passageRecall: [
      {
        id: 1,
        title: "Passage Recall 1",
        passage: "Risk assessment procedures enable businesses to prepare for unforeseen crises. By outlining backup structures, departments maintain operational continuity during system disruptions. Proper risk controls prevent client losses."
      },
      {
        id: 2,
        title: "Passage Recall 2",
        passage: "Employee wellness programs help improve productivity and reduce medical leaves. Offering mindfulness coaching and ergonomic setups improves workplace comfort. High-performance cohorts often attribute success to sound wellness."
      },
      {
        id: 3,
        title: "Passage Recall 3",
        passage: "Professional networking events expose juniors to leading industry mentors. Sharing technical knowledge establishes career growth avenues. These networking structures reinforce long-term confidence in young professionals."
      },
      {
        id: 4,
        title: "Passage Recall 4",
        passage: "Workplace feedback loops must remain constructive to achieve high quality parameters. Constructive criticism allows researchers to rectify experimental mistakes promptly. Balanced feedback formats build cohesive teams."
      }
    ],
    emailWriting: {
      situation: "Reporting a damaged office phone device.",
      task: "Write an email to the corporate administration officer reporting a physical circuit defect on your office desk phone. Apologize for reporting late, list the inventory ID, and request replacement assistance."
    }
  },
  {
    id: 12,
    title: "TCS Verbal Ability Practice – Set 12",
    sentenceCompletion: [
      { id: 1, sentence: "I will ________ my best to complete on schedule.", acceptedAnswers: ["try", "do", "strive", "attempt"] },
      { id: 2, sentence: "Please ________ your entries carefully before submitting.", acceptedAnswers: ["review", "check", "verify", "inspect", "read"] },
      { id: 3, sentence: "The team worked together to ________ the client's targets.", acceptedAnswers: ["achieve", "meet", "fulfill", "attain", "surpass"] },
      { id: 4, sentence: "The analyst compiled a ________ overview of global sales.", acceptedAnswers: ["comprehensive", "detailed", "thorough", "complete", "clear"] },
      { id: 5, sentence: "We must protect the forest to ________ endangered species.", acceptedAnswers: ["save", "protect", "preserve", "conserve", "shelter"] },
      { id: 6, sentence: "The new framework will ________ developer workload significantly.", acceptedAnswers: ["reduce", "decrease", "minimize", "ease", "alleviate"] },
      { id: 7, sentence: "She has an ________ talent for playing classical music.", acceptedAnswers: ["exceptional", "extraordinary", "amazing", "incredible", "outstanding"] },
      { id: 8, sentence: "Please ensure that your details are ________ entered.", acceptedAnswers: ["correctly", "properly", "accurately", "exactly"] },
      { id: 9, sentence: "His ________ support helped us clear final milestones.", acceptedAnswers: ["constant", "consistent", "steady", "unwavering", "active"] },
      { id: 10, sentence: "They discussed different ways to ________ performance gaps.", acceptedAnswers: ["address", "resolve", "bridge", "close", "remedy"] },
      { id: 11, sentence: "Always ________ the coordinator if you expect delays.", acceptedAnswers: ["inform", "notify", "tell", "alert", "advise"] },
      { id: 12, sentence: "Proper training helps workers develop ________ competence.", acceptedAnswers: ["technical", "interpersonal", "professional", "greater"] },
      { id: 13, sentence: "He handles pressure with remarkable ________.", acceptedAnswers: ["composure", "calm", "patience", "poise", "maturity"] },
      { id: 14, sentence: "The website provides helpful ________ about courses.", acceptedAnswers: ["information", "insights", "details", "guidance"] },
      { id: 15, sentence: "The system is designed to ________ repetitive entries.", acceptedAnswers: ["prevent", "eliminate", "avoid", "block", "remove"] },
      { id: 16, sentence: "Her feedback was ________ to improving product quality.", acceptedAnswers: ["crucial", "essential", "vital", "helpful", "important"] },
      { id: 17, sentence: "They plan to ________ new courses next semester.", acceptedAnswers: ["introduce", "launch", "add", "offer", "start"] },
      { id: 18, sentence: "She has a ________ habit of journaling daily.", acceptedAnswers: ["regular", "constant", "set", "disciplined"] },
      { id: 19, sentence: "The project was delayed due to ________ conditions.", acceptedAnswers: ["unforeseen", "unexpected", "unfavorable", "unavoidable"] },
      { id: 20, sentence: "The firm seeks to maintain high ________ values.", acceptedAnswers: ["ethical", "professional", "moral", "quality", "corporate"] }
    ],
    passageRecall: [
      {
        id: 1,
        title: "Passage Recall 1",
        passage: "Workplace diversity reinforces innovation through varied cultural viewpoints. Hiring strategies must focus on skill parameters transparently to avoid personal biases. Inclusive organizations observe high creative outputs."
      },
      {
        id: 2,
        title: "Passage Recall 2",
        passage: "Client onboarding requires seamless documentation of operational expectations. Standard briefings ensure complete understanding between parties. Clarifying objectives early prevents delivery friction."
      },
      {
        id: 3,
        title: "Passage Recall 3",
        passage: "Data parsing in database architectures facilitates rapid indexing of client fields. Implementing normalized keys reduces analytical delay. High resource efficiency improves user retrieval speeds."
      },
      {
        id: 4,
        title: "Passage Recall 4",
        passage: "Corporate volunteering improves group synergy while helping local nonprofit schools. Teams participate in technical training for marginalized students. These activities promote corporate citizenship scores."
      }
    ],
    emailWriting: {
      situation: "Reporting missing office access badge.",
      task: "Write an email to the security desk supervisor reporting your lost corporate identity badge. List the card registration code politely, request a temporary system pass, and apologize for the trouble caused."
    }
  },
  {
    id: 13,
    title: "TCS Verbal Ability Practice – Set 13",
    sentenceCompletion: [
      { id: 1, sentence: "The manager was pleased with her ________ communication.", acceptedAnswers: ["clear", "effective", "polite", "professional", "eloquent"] },
      { id: 2, sentence: "Always ________ the test suite before submitting pull requests.", acceptedAnswers: ["run", "execute", "check", "verify", "test"] },
      { id: 3, sentence: "The program is designed to ________ repetitive manual tasks.", acceptedAnswers: ["automate", "eliminate", "simplify", "reduce", "streamline"] },
      { id: 4, sentence: "We must ________ strict compliance guidelines.", acceptedAnswers: ["follow", "obey", "enforce", "adhere to", "observe", "uphold"] },
      { id: 5, sentence: "The database experienced an ________ outage last night.", acceptedAnswers: ["unexpected", "unforeseen", "accidental", "overnight", "unfortunate"] },
      { id: 6, sentence: "She has an ________ track record of project delivery.", acceptedAnswers: ["excellent", "outstanding", "exceptional", "impeccable", "proven"] },
      { id: 7, sentence: "They managed to ________ the client's confidence quickly.", acceptedAnswers: ["win", "restore", "gain", "earn", "build"] },
      { id: 8, sentence: "The system will generate an ________ log during compilation.", acceptedAnswers: ["activity", "audit", "error", "detailed", "automatic"] },
      { id: 9, sentence: "Please ________ any security issues to IT immediately.", acceptedAnswers: ["report", "flag", "notify", "submit", "escalate"] },
      { id: 10, sentence: "The developer resolved the issue with a ________ patch.", acceptedAnswers: ["quick", "simple", "temporary", "robust", "clever"] },
      { id: 11, sentence: "A clear target helps ________ team performance.", acceptedAnswers: ["improve", "boost", "enhance", "maximize", "guide"] },
      { id: 12, sentence: "He represents the company with high ________.", acceptedAnswers: ["integrity", "professionalism", "honored", "dedication"] },
      { id: 13, sentence: "They discussed tactics to ________ user engagement levels.", acceptedAnswers: ["increase", "boost", "enhance", "improve", "raise"] },
      { id: 14, sentence: "Please ________ that all systems are backed up.", acceptedAnswers: ["ensure", "verify", "check", "confirm"] },
      { id: 15, sentence: "Regular breaks are helpful to ________ worker fatigue.", acceptedAnswers: ["reduce", "prevent", "avoid", "minimize", "combat"] },
      { id: 16, sentence: "The novel method provides a ________ approach to engineering.", acceptedAnswers: ["practical", "novel", "unique", "systematic", "robust"] },
      { id: 17, sentence: "They have a ________ commitment to supporting community projects.", acceptedAnswers: ["strong", "firm", "deep", "sincere", "long-term"] },
      { id: 18, sentence: "The seminar helped us expand our ________ paths.", acceptedAnswers: ["career", "learning", "knowledge", "professional"] },
      { id: 19, sentence: "She received an ________ appreciation award from directors.", acceptedAnswers: ["outstanding", "excellent", "annual", "academic", "unconditional"] },
      { id: 20, sentence: "We must ________ resource waste during testing iterations.", acceptedAnswers: ["minimize", "prevent", "reduce", "avoid", "stop"] }
    ],
    passageRecall: [
      {
        id: 1,
        title: "Passage Recall 1",
        passage: "Escalation procedures require developers to alert lead engineers when core database indexes corrupt. Teams jolt down steps to isolate tables sequentially on sandboxed recovery networks. Streamlined tracking ensures faster bug correction."
      },
      {
        id: 2,
        title: "Passage Recall 2",
        passage: "Policy compliance requires regular audits of internal employee access logs. Certified corporate security teams check permissions manually to identify potential gaps. Transparent reporting minimizes external breach variables."
      },
      {
        id: 3,
        title: "Passage Recall 3",
        passage: "Code modularity improves structural clarity and eases future maintenance. By grouping logic cleanly into custom classes, software architects bypass redundant functions. This improves system processing speeds."
      },
      {
        id: 4,
        title: "Passage Recall 4",
        passage: "Knowledge transfer sessions assist engineering teams in onboarding incoming graduates efficiently. Documenting core technical specs ensures uninterrupted project cycles. This fosters corporate performance indexes."
      }
    ],
    emailWriting: {
      situation: "Reporting corrupted files in shared drive folder.",
      task: "Write an email to the document management administrator reporting corrupted spreadsheets in your project directory. apololgize for reporting, cite the file paths, and request backup transfer support."
    }
  },
  {
    id: 14,
    title: "TCS Verbal Ability Practice – Set 14",
    sentenceCompletion: [
      { id: 1, sentence: "Our main focus is to ________ customer loyalty.", acceptedAnswers: ["retain", "build", "improve", "ensure", "boost", "strengthen"] },
      { id: 2, sentence: "Please ________ the accuracy of your profile inputs.", acceptedAnswers: ["verify", "check", "ensure", "confirm", "validate"] },
      { id: 3, sentence: "The software update will ________ database query speed.", acceptedAnswers: ["improve", "enhance", "boost", "increase", "optimize"] },
      { id: 4, sentence: "The coordinator was happy with his ________ performance.", acceptedAnswers: ["excellent", "consistently", "steady", "outstanding", "stellar"] },
      { id: 5, sentence: "We must ________ natural resources for future generations.", acceptedAnswers: ["conserve", "preserve", "save", "protect"] },
      { id: 6, sentence: "Every student must ________ the university code of conduct.", acceptedAnswers: ["follow", "obey", "respect", "uphold", "adhere to"] },
      { id: 7, sentence: "The company plans to ________ its cloud services.", acceptedAnswers: ["expand", "improve", "upgrade", "grow", "modernize"] },
      { id: 8, sentence: "He remains ________ about securing a positive outcome.", acceptedAnswers: ["optimistic", "confident", "positive", "hopeful"] },
      { id: 9, sentence: "Always ________ standard greetings in formal emails.", acceptedAnswers: ["include", "use", "write", "place"] },
      { id: 10, sentence: "The sudden storm caused severe ________ to flight schedules.", acceptedAnswers: ["disruptions", "delay", "disruption", "interference", "damage"] },
      { id: 11, sentence: "She handled the client query with outstanding ________.", acceptedAnswers: ["professionalism", "patience", "skill", "competence", "composure"] },
      { id: 12, sentence: "Please safeguard the customer credentials as ________ records.", acceptedAnswers: ["confidential", "private", "secure", "critical"] },
      { id: 13, sentence: "The meeting was cancelled due to ________ reasons.", acceptedAnswers: ["unavoidable", "unforeseen", "unexpected", "technical"] },
      { id: 14, sentence: "They discussed options to ________ server overheads.", acceptedAnswers: ["reduce", "decrease", "minimize", "optimize"] },
      { id: 15, sentence: "A clear timeline is required to ________ deadline success.", acceptedAnswers: ["ensure", "guarantee", "achieve", "secure"] },
      { id: 16, sentence: "The novel method is highly ________ in treating pain.", acceptedAnswers: ["effective", "efficient", "useful", "successful", "reliable"] },
      { id: 17, sentence: "She has an ________ eye for elegant typography.", acceptedAnswers: ["excellent", "exceptional", "outstanding", "amazing", "incredible"] },
      { id: 18, sentence: "He always remains ________ under competitive pressure.", acceptedAnswers: ["calm", "composed", "focused", "positive", "collected"] },
      { id: 19, sentence: "Always ask for help to ________ major errors.", acceptedAnswers: ["prevent", "avoid", "eliminate", "resolve", "minimize"] },
      { id: 20, sentence: "The workshop provided detailed ________ into software testing.", acceptedAnswers: ["insights", "insight", "guidance", "tips", "details"] }
    ],
    passageRecall: [
      {
        id: 1,
        title: "Passage Recall 1",
        passage: "Cloud firewalls prevent network security breaches by inspecting incoming client packages. Core policies block unauthorized IP scopes automatically. Routine configuration updates secure company servers against advanced exploits."
      },
      {
        id: 2,
        title: "Passage Recall 2",
        passage: "Customer loyalty schemes improve repeat business margins through customized rewards. By analyzing buying behavior carefully, firms formulate attractive discounts. Maintaining high trust keeps customers engaged."
      },
      {
        id: 3,
        title: "Passage Recall 3",
        passage: "Process documentation outlines standard operating parameters for factory technical assets. Machine operators check safety checklists daily before launching heavy procedures. Proper safety steps prevent accidents."
      },
      {
        id: 4,
        title: "Passage Recall 4",
        passage: "Leadership alignment structures reinforce executive focus during structural mergers. Managers meet regularly to formulate cohesive team goals. Respecting cultural inputs eases departmental transitions."
      }
    ],
    emailWriting: {
      situation: "Reporting defective office chair asset.",
      task: "Write an email to the corporate facilities supervisor reporting a broken height-adjustment control on your office chair. Include inventory ID, apologize for reporting, and request replacement support."
    }
  },
  {
    id: 15,
    title: "TCS Verbal Ability Practice – Set 15",
    sentenceCompletion: [
      { id: 1, sentence: "I will ________ my best to resolve your server queries.", acceptedAnswers: ["do", "try", "strive", "attempt"] },
      { id: 2, sentence: "Please ________ the application code for syntax errors.", acceptedAnswers: ["review", "check", "verify", "inspect", "debug"] },
      { id: 3, sentence: "A clear target helps ________ employee motivation.", acceptedAnswers: ["promote", "boost", "improve", "encourage", "strengthen", "foster"] },
      { id: 4, sentence: "The director offered ________ remarks on our performance.", acceptedAnswers: ["positive", "complimentary", "favorable", "praising", "supportive"] },
      { id: 5, sentence: "Always ________ client records confidential.", acceptedAnswers: ["keep", "maintain", "store", "save", "hold"] },
      { id: 6, sentence: "The firm seeks to ________ business operations to Europe.", acceptedAnswers: ["expand", "extend", "grow", "launch"] },
      { id: 7, sentence: "The system is designed to ________ repetitive entries.", acceptedAnswers: ["prevent", "eliminate", "avoid", "block", "remove"] },
      { id: 8, sentence: "She has an ________ talent for solving logic grids.", acceptedAnswers: ["exceptional", "extraordinary", "amazing", "incredible", "outstanding"] },
      { id: 9, sentence: "They discussed different options to ________ the budget.", acceptedAnswers: ["reduce", "optimize", "adjust", "cut", "maximize"] },
      { id: 10, sentence: "He handles difficult client meetings with great ________.", acceptedAnswers: ["patience", "composure", "tact", "poise", "professionalism"] },
      { id: 11, sentence: "Proper scheduling helps to ________ resource waste.", acceptedAnswers: ["minimize", "prevent", "reduce", "avoid"] },
      { id: 12, sentence: "We must protect forests to ________ biodiversity.", acceptedAnswers: ["preserve", "maintain", "conserve", "save", "protect"] },
      { id: 13, sentence: "Please ensure that your credentials are ________ entered.", acceptedAnswers: ["correctly", "properly", "accurately", "exactly"] },
      { id: 14, sentence: "The new building has ________ facilities for recreation.", acceptedAnswers: ["excellent", "luxurious", "modern", "wonderful", "premium"] },
      { id: 15, sentence: "We must follow the ________ rules of the examination.", acceptedAnswers: ["strict", "established", "mandatory", "prescribed", "basic"] },
      { id: 16, sentence: "The program will generate a detailed ________ upon completion.", acceptedAnswers: ["report", "document", "log", "summary", "analysis"] },
      { id: 17, sentence: "Yoga helps in improving overall physical ________.", acceptedAnswers: ["health", "fitness", "well-being", "stamina", "flexibility"] },
      { id: 18, sentence: "Good leaders always motivate their squads by ________.", acceptedAnswers: ["example", "inspiring", "motivation", "themselves"] },
      { id: 19, sentence: "The meeting was postponed due to ________ issues.", acceptedAnswers: ["unforeseen", "unexpected", "technical", "unfavorable"] },
      { id: 20, sentence: "Her summary was ________ and easy to read.", acceptedAnswers: ["concise", "clear", "brief", "well"] }
    ],
    passageRecall: [
      {
        id: 1,
        title: "Passage Recall 1",
        passage: "Career pathing methodologies encourage junior employees to achieve specialized technological certifications. By scheduling regular goal-setting checks, corporations retain high-value performers and establish strong engineering leads internally."
      },
      {
        id: 2,
        title: "Passage Recall 2",
        passage: "Team synergy workshops leverage group problem-solving exercises to build trust. When squad members share expertise openly, the group resolves complex analytical hurdles faster. Cohesive partnerships are key to corporate success."
      },
      {
        id: 3,
        title: "Passage Recall 3",
        passage: "Digital collaboration tools streamline daily file sharing among global development teams. Centralizing project requirements on cloud wikis keeps engineers aligned on scope parameters. Balanced systems minimize delivery delays."
      },
      {
        id: 4,
        title: "Passage Recall 4",
        passage: "Quality assurance audits verify that software releases compile safely without warning logs. Experienced testing teams run edge-case scenarios manually to guard security integrity. Streamlined verification processes protect end users."
      }
    ],
    emailWriting: {
      situation: "Reporting corrupted payroll deposit discrepancy.",
      task: "Write a formal email to the human resources manager reporting a computation error in your latest direct billing deposit. Politely outline your verified work indices, apologize for query, and request calculation adjustment support."
    }
  }
];
