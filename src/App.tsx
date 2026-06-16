import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  History, 
  Settings, 
  Award, 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  ChevronRight, 
  Play, 
  BookOpen, 
  Send, 
  User, 
  ChevronLeft, 
  RefreshCw, 
  HelpCircle, 
  X, 
  Check, 
  Eye, 
  ShieldAlert,
  Database,
  Info,
  Lock,
  Unlock
} from 'lucide-react';
import { PRACTICE_TESTS, PracticeTest, SentenceQuestion } from './questions';

// Structure for a student result saved in localStorage
interface SubmissionRecord {
  id: string; // Sample STU-XXX
  studentName: string;
  studentId: string;
  testId: number;
  testTitle: string;
  date: string;
  sentenceScore: number; // /20
  passageScore: number; // /40
  emailScore: number; // /20
  totalScore: number; // /80
  percentage: number;
  grade: string;
  passageAnalysis: {
    score: number;
    retentionScore: number;
    grammarScore: number;
    feedback: string;
    improvements: string[];
  }[];
  emailAnalysis: {
    score: number;
    relevanceScore: number;
    toneScore: number;
    vocabularyScore: number;
    structureScore: number;
    feedback: string;
    improvements: string[];
  };
  sentenceAnswers: Record<number, string>;
  sentenceGrading: boolean[];
  // AI summary fields (if loaded from server)
  keyVerbalStrengths?: string;
  criticalImprovements?: string;
  customActionableTip?: string;
}

export default function App() {
  // Navigation & Views
  const [currentView, setCurrentView] = useState<'landing' | 'taking_test' | 'results' | 'admin'>('landing');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);
  const [adminPasswordInput, setAdminPasswordInput] = useState<string>('');
  const [adminPasswordError, setAdminPasswordError] = useState<string>('');
  
  // Student Context
  const [studentName, setStudentName] = useState<string>('Sai Praveen ');
  const [studentId, setStudentId] = useState<string>('2501050160');

  // Load blocked students list from localStorage
  const [blockedStudents, setBlockedStudents] = useState<string[]>(() => {
    const raw = localStorage.getItem('intellitest_blocked_students');
    return raw ? JSON.parse(raw) : [];
  });

  const [isExamBlockedCurrentSession, setIsExamBlockedCurrentSession] = useState<boolean>(false);

  const blockStudent = (id: string) => {
    setBlockedStudents((prev) => {
      const updated = prev.includes(id) ? prev : [...prev, id];
      localStorage.setItem('intellitest_blocked_students', JSON.stringify(updated));
      return updated;
    });
  };

  const unblockStudent = (id: string) => {
    setBlockedStudents((prev) => {
      const updated = prev.filter((item) => item !== id);
      localStorage.setItem('intellitest_blocked_students', JSON.stringify(updated));
      return updated;
    });
  };
  
  // Admin Configurations (Customizable values)
  const [sentenceTimeLimit, setSentenceTimeLimit] = useState<number>(25); // 25 seconds per blank
  const [passageReadTimeLimit, setPassageReadTimeLimit] = useState<number>(30); // 30 seconds to memorize
  const [passageWriteTimeLimit, setPassageWriteTimeLimit] = useState<number>(90); // 90 seconds to write
  const [emailTimeLimit, setEmailTimeLimit] = useState<number>(540); // 540 seconds (9 min)
  
  // Active Assessment States
  const [activeTest, setActiveTest] = useState<PracticeTest | null>(null);
  const [currentSection, setCurrentSection] = useState<'briefing' | 'sentence' | 'passage_read' | 'passage_write' | 'email' | 'grading'>('briefing');
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState<number>(0);
  const [currentPassageIndex, setCurrentPassageIndex] = useState<number>(0);
  
  // Timers & Countdown States
  const [globalTimer, setGlobalTimer] = useState<number>(0);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // Inputs during exam
  const [sentenceInputs, setSentenceInputs] = useState<Record<number, string>>({});
  const [currentSentenceInput, setCurrentSentenceInput] = useState<string>('');
  const [passageInputs, setPassageInputs] = useState<string[]>(['', '', '', '']);
  const [emailInput, setEmailInput] = useState<string>('');
  
  // UI Interactive States
  const [revealInstructionId, setRevealInstructionId] = useState<boolean>(false);
  const [activeAccordionIndex, setActiveAccordionIndex] = useState<number>(0);
  
  // AI Evaluations / Scoring results
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [activeGradingStep, setActiveGradingStep] = useState<number>(0); // 0 to 4 steps
  const [currentSubmission, setCurrentSubmission] = useState<SubmissionRecord | null>(null);
  
  // Database / LocalStorage results for Admin & Comparisons
  const [allSubmissions, setAllSubmissions] = useState<SubmissionRecord[]>([]);

  // Clock state (Refined IST Real-Time Tracker)
  const [currentTime, setCurrentTime] = useState<string>(new Date().toLocaleTimeString('en-GB', { timeZone: 'Asia/Kolkata' }) + ' IST');

  useEffect(() => {
    const t = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-GB', { timeZone: 'Asia/Kolkata' }) + ' IST');
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const enterFullScreen = () => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen().catch((err) => {
        console.warn("Fullscreen request rejected", err);
      });
    } else if ((elem as any).webkitRequestFullscreen) { /* Safari */
      (elem as any).webkitRequestFullscreen();
    } else if ((elem as any).msRequestFullscreen) { /* IE11 */
      (elem as any).msRequestFullscreen();
    }
  };

  const exitFullScreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen().catch(() => {});
    } else if ((document as any).webkitExitFullscreen) {
      (document as any).webkitExitFullscreen();
    } else if ((document as any).msExitFullscreen) {
      (document as any).msExitFullscreen();
    }
  };

  // Monitor proctoring locks & focus breaches during active test periods
  useEffect(() => {
    const isProctoringActive = 
      currentView === 'taking_test' && 
      currentSection !== 'briefing' && 
      currentSection !== 'grading' &&
      !isExamBlockedCurrentSession;

    if (!isProctoringActive) return;

    const handleViolation = (reason: string) => {
      console.warn("Strict Proctoring Lock Breached:", reason);
      
      // Stop timer updates
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }

      // Add student ID to active blocked registry
      const targetId = studentId.trim();
      setBlockedStudents((prev) => {
        if (!prev.includes(targetId)) {
          const updated = [...prev, targetId];
          localStorage.setItem('intellitest_blocked_students', JSON.stringify(updated));
          return updated;
        }
        return prev;
      });

      // Exit fullscreen safely
      exitFullScreen();

      // Trigger session breach lock block page
      setIsExamBlockedCurrentSession(true);
    };

    // Callback on fullscreen state exit transitions
    const handleFullscreenChange = () => {
      // If full screen is exited but proctoring is still marked active, it is a breach!
      if (!document.fullscreenElement && !isExamBlockedCurrentSession) {
        handleViolation("Exited locked Fullscreen mode");
      }
    };

    // Callback on tab/window switching hidden
    const handleVisibilityChange = () => {
      if ((document.hidden || document.visibilityState === 'hidden') && !isExamBlockedCurrentSession) {
        handleViolation("Tab/Window Switched or Minimized");
      }
    };

    // Callback on window blur
    const handleWindowBlur = () => {
      if (!isExamBlockedCurrentSession) {
        handleViolation("Window lost system active focus");
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleWindowBlur);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleWindowBlur);
    };
  }, [currentView, currentSection, studentId, isExamBlockedCurrentSession]);
  
  // Initialize Mock Peer Data on first load
  useEffect(() => {
    const rawSubmissions = localStorage.getItem('intellitest_submissions');
    if (rawSubmissions) {
      setAllSubmissions(JSON.parse(rawSubmissions));
    } else {
      // Default high-fidelity cohort mock datasets for beautiful calculations and peers comparison
      const initialCohorts: SubmissionRecord[] = [
        {
          id: "STU-2026-042",
          studentName: "Aniket Sharma",
          studentId: "CSE-2025-1042",
          testId: 1,
          testTitle: "TCS Verbal Ability Practice – Set 1",
          date: "11 Jun 2026",
          sentenceScore: 16,
          passageScore: 28,
          emailScore: 14,
          totalScore: 58,
          percentage: 72.5,
          grade: "First Class",
          sentenceAnswers: {},
          sentenceGrading: [],
          passageAnalysis: [
            { score: 7, retentionScore: 4, grammarScore: 3, feedback: "Great effort in capturing the business flexibility benefit.", improvements: ["Incorporate secure remote elements"] },
            { score: 8, retentionScore: 5, grammarScore: 3, feedback: "Captured confidence and interpersonal values correctly.", improvements: ["Add worker retention details"] },
            { score: 6, retentionScore: 3, grammarScore: 3, feedback: "Understood solar and wind energy naturally.", improvements: ["Discuss long-term energy security"] },
            { score: 7, retentionScore: 4, grammarScore: 3, feedback: "Highlights mutual trust is essential context.", improvements: ["State innovative problem solving concepts"] }
          ],
          emailAnalysis: { score: 14, relevanceScore: 4, toneScore: 3, vocabularyScore: 4, structureScore: 3, feedback: "Formally sound structure with standard greetings. Add registration numbers clearly for maximum compliance in candidate tracking.", improvements: ["Incorporate detailed roll numbers", "Avoid contractions like 'can't'"] }
        },
        {
          id: "STU-2026-105",
          studentName: "Ananya Rao",
          studentId: "CSE-2025-1105",
          testId: 1,
          testTitle: "TCS Verbal Ability Practice – Set 1",
          date: "12 Jun 2026",
          sentenceScore: 18,
          passageScore: 34,
          emailScore: 17,
          totalScore: 69,
          percentage: 86.25,
          grade: "Distinction",
          sentenceAnswers: {},
          sentenceGrading: [],
          passageAnalysis: [
            { score: 9, retentionScore: 5, grammarScore: 4, feedback: "Excellent keyword precision. Outlined secure online platforms.", improvements: [] },
            { score: 8, retentionScore: 5, grammarScore: 3, feedback: "Strong focus on worker training benefits.", improvements: ["Integrate retention rates"] },
            { score: 9, retentionScore: 5, grammarScore: 4, feedback: "Outstanding focus on eco balance and low pollution.", improvements: [] },
            { score: 8, retentionScore: 4, grammarScore: 4, feedback: "Solid context on trust and shared collaboration.", improvements: [] }
          ],
          emailAnalysis: { score: 17, relevanceScore: 5, toneScore: 4, vocabularyScore: 4, structureScore: 4, feedback: "Highly precise. Perfectly formatted subject. Addressed the coordinator using professional honorifics and provided clear context.", improvements: ["Vary standard transitions for smoother sentence rhythm"] }
        },
        {
          id: "STU-2026-302",
          studentName: "Karthik Subramanian",
          studentId: "CSE-2025-1302",
          testId: 1,
          testTitle: "TCS Verbal Ability Practice – Set 1",
          date: "12 Jun 2026",
          sentenceScore: 11,
          passageScore: 22,
          emailScore: 11,
          totalScore: 44,
          percentage: 55.0,
          grade: "Second Class",
          sentenceAnswers: {},
          sentenceGrading: [],
          passageAnalysis: [
            { score: 5, retentionScore: 3, grammarScore: 2, feedback: "Grammatically correct but extremely brief recall.", improvements: ["Include company cost reduction"] },
            { score: 6, retentionScore: 4, grammarScore: 2, feedback: "Understood skill building benefits. Omitted key stats.", improvements: ["Explain organizational motivation results"] },
            { score: 5, retentionScore: 3, grammarScore: 2, feedback: "Partially represented solar and environmental balance.", improvements: ["State fossil fuels alternative contexts"] },
            { score: 6, retentionScore: 3, grammarScore: 3, feedback: "Lacks core teamwork criteria. No details surrounding trust.", improvements: ["Add team common goals definition"] }
          ],
          emailAnalysis: { score: 11, relevanceScore: 3, toneScore: 3, vocabularyScore: 2, structureScore: 3, feedback: "Lacks core structure. Signature layout is incomplete. The email was excessively brief and missed the coordination requirements.", improvements: ["Include coordinate registration details", "Ensure correct signature spacing"] }
        },
        {
          id: "STU-2026-941",
          studentName: "Pragya Singh",
          studentId: "CSE-2025-1941",
          testId: 1,
          testTitle: "TCS Verbal Ability Practice – Set 1",
          date: "12 Jun 2026",
          sentenceScore: 19,
          passageScore: 36,
          emailScore: 18,
          totalScore: 73,
          percentage: 91.25,
          grade: "Distinction",
          sentenceAnswers: {},
          sentenceGrading: [],
          passageAnalysis: [
            { score: 9, retentionScore: 5, grammarScore: 4, feedback: "Virtually flawless recall. Transcribed cloud servers seamlessly.", improvements: [] },
            { score: 9, retentionScore: 5, grammarScore: 4, feedback: "Detailed descriptions of training metrics. Very high clarity.", improvements: [] },
            { score: 9, retentionScore: 5, grammarScore: 4, feedback: "Excellent comparison of fossil fuels with wind energy.", improvements: [] },
            { score: 9, retentionScore: 5, grammarScore: 4, feedback: "Exceptional representation of team goals, trust and support.", improvements: [] }
          ],
          emailAnalysis: { score: 18, relevanceScore: 5, toneScore: 5, vocabularyScore: 4, structureScore: 4, feedback: "Exceptional vocabulary choice. Highly respectful tone throughout the email. The request for certificate of completion is clear and well-calibrated.", improvements: ["Add date of completion explicitly for administrative ease"] }
        }
      ];
      localStorage.setItem('intellitest_submissions', JSON.stringify(initialCohorts));
      setAllSubmissions(initialCohorts);
    }
  }, []);

  // Sync to local database handler
  const saveSubmissions = (updated: SubmissionRecord[]) => {
    setAllSubmissions(updated);
    localStorage.setItem('intellitest_submissions', JSON.stringify(updated));
  };

  // Timer side effects
  useEffect(() => {
    if (currentView === 'taking_test' && currentSection !== 'briefing' && currentSection !== 'grading') {
      timerIntervalRef.current = setInterval(() => {
        setGlobalTimer((prev) => {
          if (prev <= 1) {
            clearInterval(timerIntervalRef.current!);
            handleTimerTimeout();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [currentView, currentSection, currentSentenceIndex, currentPassageIndex]);

  // Handler when timers trigger an automatic progression
  const handleTimerTimeout = () => {
    if (currentSection === 'sentence') {
      // Auto submit current sentence blank response
      const updatedSentences = { 
        ...sentenceInputs, 
        [currentSentenceIndex]: currentSentenceInput.trim() 
      };
      setSentenceInputs(updatedSentences);
      setCurrentSentenceInput('');

      if (currentSentenceIndex < 19) {
        setCurrentSentenceIndex((prev) => prev + 1);
        setGlobalTimer(sentenceTimeLimit);
      } else {
        // Complete Sentence Completion, move to Passage Recall
        setCurrentSection('passage_read');
        setCurrentPassageIndex(0);
        setGlobalTimer(passageReadTimeLimit);
      }
    } else if (currentSection === 'passage_read') {
      // Auto move to writing
      setCurrentSection('passage_write');
      setGlobalTimer(passageWriteTimeLimit);
    } else if (currentSection === 'passage_write') {
      // Auto submit current passage recall
      const updatedPassages = [...passageInputs];
      updatedPassages[currentPassageIndex] = (passageInputs[currentPassageIndex] || '').trim();
      setPassageInputs(updatedPassages);

      if (currentPassageIndex < 3) {
        setCurrentPassageIndex((prev) => prev + 1);
        setCurrentSection('passage_read');
        setGlobalTimer(passageReadTimeLimit);
      } else {
        // Complete all passages, go to email
        setCurrentSection('email');
        setGlobalTimer(emailTimeLimit);
      }
    } else if (currentSection === 'email') {
      // Time over, auto trigger grading
      submitTestForGrading();
    }
  };

  // Skip / Manual progress handlers
  const handleNextSentence = () => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    
    // Save current sentence response
    const updatedSentences = { 
      ...sentenceInputs, 
      [currentSentenceIndex]: currentSentenceInput.trim() 
    };
    setSentenceInputs(updatedSentences);
    setCurrentSentenceInput('');

    if (currentSentenceIndex < 19) {
      setCurrentSentenceIndex((prev) => prev + 1);
      setGlobalTimer(sentenceTimeLimit);
    } else {
      setCurrentSection('passage_read');
      setCurrentPassageIndex(0);
      setGlobalTimer(passageReadTimeLimit);
    }
  };

  const handleStartWritingPassage = () => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    setCurrentSection('passage_write');
    setGlobalTimer(passageWriteTimeLimit);
  };

  const handleNextPassage = (userText: string) => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    
    const updatedPassages = [...passageInputs];
    updatedPassages[currentPassageIndex] = userText.trim();
    setPassageInputs(updatedPassages);

    if (currentPassageIndex < 3) {
      setCurrentPassageIndex((prev) => prev + 1);
      setCurrentSection('passage_read');
      setGlobalTimer(passageReadTimeLimit);
    } else {
      setCurrentSection('email');
      setGlobalTimer(emailTimeLimit);
    }
  };

  // Trigger test initialization
  const startExam = (test: PracticeTest) => {
    if (!studentName.trim() || !studentId.trim()) {
      alert("Please enter both Candidate Name and Student ID credentials in the panel first.");
      return;
    }

    // Check if the student ID is blocked due to a proctoring violation
    if (blockedStudents.includes(studentId.trim())) {
      alert(`Access Strictly Blocked: Candidate registration ID ${studentId} is barred due to an active proctoring violation (exiting fullscreen or tab/window change). An administrator must clear the lock from the system admin panel.`);
      return;
    }
    
    // Check if the student ID has already completed this set of the test
    const alreadyDone = allSubmissions.some(
      sub => sub.studentId === studentId && sub.testId === test.id
    );
    if (alreadyDone) {
      alert(`Candidate verification notice: This Student ID (${studentId}) has already attempted ${test.title}. Only 1 exam attempt is registered per applicant id.`);
      return;
    }

    setActiveTest(test);
    setSentenceInputs({});
    setCurrentSentenceInput('');
    setPassageInputs(['', '', '', '']);
    setEmailInput('');
    setCurrentSentenceIndex(0);
    setCurrentPassageIndex(0);
    setCurrentSection('briefing');
    setCurrentView('taking_test');
  };

  // Heuristic offline grading (in case of api failure or fallback)
  const calculateHeuristicGrades = (correctSentences: number, sentenceGradingResult: boolean[]) => {
    // Grade passages recall
    const passageAnalyses: any[] = [];
    let absolutePassageScore = 0;

    for (let i = 0; i < 4; i++) {
      const recallText = passageInputs[i].trim();
      const originalText = activeTest!.passageRecall[i].passage;
      const originalTitle = activeTest!.passageRecall[i].title;

      if (!recallText) {
        passageAnalyses.push({
          score: 0,
          retentionScore: 0,
          grammarScore: 0,
          feedback: "No passage recall transcribed. The field was left entirely blank.",
          improvements: ["Ensure you prioritize reading and jotting down key facts immediately."]
        });
        continue;
      }

      // Count keyword matches (substantial nouns/verbs from original passage, excluding prepositions)
      const stopwords = new Set(['the', 'is', 'at', 'which', 'on', 'and', 'a', 'of', 'to', 'in', 'that', 'we', 'for', 'by', 'it', 'or', 'with', 'as', 'remain', 'remains', 'have', 'has', 'had']);
      const originalWords = originalText.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g,"").split(/\s+/);
      const uniqueKeyWords = Array.from(new Set(originalWords.filter((w: string) => w.length > 4 && !stopwords.has(w)))) as string[];
      
      let keywordHits = 0;
      const rememberedHighlights: string[] = [];
      const missedHighlights: string[] = [];

      uniqueKeyWords.forEach((word) => {
        if (recallText.toLowerCase().includes(word)) {
          keywordHits++;
          if (rememberedHighlights.length < 3) rememberedHighlights.push(word);
        } else {
          if (missedHighlights.length < 3) missedHighlights.push(word);
        }
      });

      // Score normalized out of 10
      const keywordRatio = uniqueKeyWords.length > 0 ? (keywordHits / uniqueKeyWords.length) : 0;
      const baseRecScore = Math.min(10, Math.floor(keywordRatio * 15) + (recallText.length > 180 ? 3 : 1));
      const score = Math.max(1, Math.min(10, baseRecScore));
      
      absolutePassageScore += score;
      passageAnalyses.push({
        score: score,
        retentionScore: Math.ceil(score * 0.6),
        grammarScore: Math.ceil(score * 0.4),
        feedback: `(Safe Heuristic Grade) Captured reasonable semantic cohesion. Successfully matched core keywords: [${rememberedHighlights.join(', ')}]. Overall alignment reflects moderate memory persistence.`,
        improvements: missedHighlights.length > 0 ? [`Work on transcribing central concepts like: "${missedHighlights.join(', ')}"`] : ["Superb keywords persistence. Maintain structure."]
      });
    }

    // Grade email draft
    const wordCount = emailInput.trim().split(/\s+/).length;
    let absoluteEmailScore = 0;
    let emailAnalysis: any = null;

    if (!emailInput.trim()) {
      emailAnalysis = {
        score: 0,
        relevanceScore: 0,
        toneScore: 0,
        vocabularyScore: 0,
        structureScore: 0,
        feedback: "The email composition was left blank. No points were obtained.",
        improvements: ["Draft an email structure with a polite greeting, objective statement, and final sign-off."]
      };
    } else {
      let score = 10; // Start out of 20 (base)
      const hasGreeting = /(dear|hello|respected|hi|greetings)/i.test(emailInput);
      const hasSignOff = /(sincerely|thanks|regards|thanking you|warmly|with respect)/i.test(emailInput);
      const hasAppropriateLength = wordCount >= 80 && wordCount <= 220;
      const hasRegDetails = /id|reg|registration|roll|number|enrol/i.test(emailInput);

      if (hasGreeting) score += 2;
      if (hasSignOff) score += 2;
      if (hasAppropriateLength) score += 3;
      if (hasRegDetails) score += 3;

      // Adjust for spelling indicators
      const finalScore = Math.max(4, Math.min(20, score));
      absoluteEmailScore = finalScore;

      emailAnalysis = {
        score: finalScore,
        relevanceScore: hasRegDetails ? 5 : 2,
        toneScore: hasGreeting && hasSignOff ? 5 : 3,
        vocabularyScore: hasAppropriateLength ? 5 : 3,
        structureScore: hasGreeting && hasSignOff ? 5 : 2,
        feedback: "(Safe Heuristic Grade) Completed formal standard email draft. Greeting and closing salutations have been calculated. Spacing criteria is structurally sound.",
        improvements: [
          !hasRegDetails ? "Explicitly mention your registration credentials more prominently." : "Keep referencing roll info.",
          !hasGreeting ? "Include formal greetings like 'Dear Course Coordinator'." : "Greetings are well configured.",
          !hasAppropriateLength ? "Ensure word density bounds are within TCS recommendations (80-200 words)." : "Perfect word length."
        ]
      };
    }

    const overallTotal = correctSentences + absolutePassageScore + absoluteEmailScore; // Max: 20 + 40 + 20 = 80
    const calculatedPercentage = parseFloat(((overallTotal / 80) * 100).toFixed(2));
    
    // Choose grade
    let grade = "Pass Class";
    if (calculatedPercentage >= 85) grade = "Distinction";
    else if (calculatedPercentage >= 70) grade = "First Class";
    else if (calculatedPercentage >= 50) grade = "Second Class";

    return {
      sentenceScore: correctSentences,
      passageScore: absolutePassageScore,
      emailScore: absoluteEmailScore,
      totalScore: overallTotal,
      percentage: calculatedPercentage,
      grade,
      passageAnalysis: passageAnalyses,
      emailAnalysis,
      sentenceAnswers: sentenceInputs,
      sentenceGrading: sentenceGradingResult
    };
  };

  // Real-time AI grading core integration
  const submitTestForGrading = async () => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    setCurrentSection('grading');
    setActiveGradingStep(0);
    setTerminalLogs([`[0.0s] Initializing IntelliTest grading engine...`]);

    // 1. Calculate sentence completions list
    let correctSentences = 0;
    const sentenceGradingResult: boolean[] = [];
    const questions = activeTest!.sentenceCompletion;
    
    for (let i = 0; i < 20; i++) {
      const studentAns = (sentenceInputs[i] || '').trim().toLowerCase();
      const question = questions[i];
      const isCorrect = question.acceptedAnswers.includes(studentAns);
      sentenceGradingResult.push(isCorrect);
      if (isCorrect) correctSentences++;
    }

    // Interactive logging delays for premium dashboard feel
    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    setTerminalLogs(prev => [...prev, `[0.5s] Verifying Section 1 exact-match answers... Done. Score: ${correctSentences}/20`]);
    await delay(700);
    setActiveGradingStep(1);

    setTerminalLogs(prev => [...prev, `[1.2s] Packaging Student Recalls: 4 text modules detected.`]);
    setTerminalLogs(prev => [...prev, `[1.5s] Preparing semantic evaluation array payload...`]);
    await delay(800);
    setActiveGradingStep(2);

    setTerminalLogs(prev => [...prev, `[2.3s] Transmitting telemetry scores to secure AI evaluator...`]);
    
    // Connect to the actual custom backend /api/grade endpoint!
    // If it succeeds, we parse the real AI analysis. If it fails (missing key or network error), we calculate heuristics dynamically so the app is robust.
    try {
      const payload = {
        testId: activeTest!.id,
        studentId: studentId,
        studentName: studentName,
        recallAttempts: activeTest!.passageRecall.map((p, idx) => ({
          originalPassage: p.passage,
          studentRecallText: passageInputs[idx] || ""
        })),
        emailText: {
          situation: activeTest!.emailWriting.situation,
          task: activeTest!.emailWriting.task,
          studentEmailText: emailInput
        }
      };

      setTerminalLogs(prev => [...prev, `[2.8s] Fetching secure server-side analysis (/api/grade)...`]);
      
      const response = await fetch('/api/grade', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`Server returned HTTP ${response.status}`);
      }

      const resData = await response.json();
      setActiveGradingStep(3);
      setTerminalLogs(prev => [...prev, `[3.4s] Received AI multi-agent evaluation response (Success).`]);
      setTerminalLogs(prev => [...prev, `[3.8s] Structuring score breakdowns & action matrices...`]);
      await delay(600);

      const passagesGrading = resData.passagesGrading || [];
      const emailGrading = resData.emailGrading || {};
      const overallSummary = resData.overallSummary || {};

      let parsedPassageScore = 0;
      const mappedPassages = passagesGrading.map((p: any, idx: number) => {
        const sc = p.score != null ? p.score : 5;
        parsedPassageScore += sc;
        return {
          score: sc,
          retentionScore: Math.round(sc * 0.6),
          grammarScore: Math.round(sc * 0.4),
          feedback: p.suggestions || `Detected keywords: ${p.rememberedKeyPoints?.join(', ') || 'none'}.`,
          improvements: p.missedKeyPoints || []
        };
      });

      const parsedEmailScore = emailGrading.score != null ? emailGrading.score : 10;

      // Ensure scores scale correctly (Passage scores out of 40, email out of 20, correctSentences out of 20)
      // Passage scores in server are /10 per passage, total 4 passages = /40.
      // Email score is /10 in server, so we double it to align with /20.
      const scaledEmailScore = parsedEmailScore * 2;
      const overallTotal = correctSentences + parsedPassageScore + scaledEmailScore;
      const calculatedPercentage = parseFloat(((overallTotal / 80) * 100).toFixed(2));

      let grade = "Pass Class";
      if (calculatedPercentage >= 85) grade = "Distinction";
      else if (calculatedPercentage >= 70) grade = "First Class";
      else if (calculatedPercentage >= 50) grade = "Second Class";

      const finalRecord: SubmissionRecord = {
        id: "STU-2026-" + Math.floor(100 + Math.random() * 900),
        studentName,
        studentId,
        testId: activeTest!.id,
        testTitle: activeTest!.title,
        date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
        sentenceScore: correctSentences,
        passageScore: parsedPassageScore,
        emailScore: scaledEmailScore,
        totalScore: overallTotal,
        percentage: calculatedPercentage,
        grade,
        passageAnalysis: mappedPassages,
        emailAnalysis: {
          score: scaledEmailScore,
          relevanceScore: emailGrading.structureScore != null ? Math.ceil(emailGrading.structureScore * 1.6) : 4,
          toneScore: emailGrading.grammarScore != null ? Math.ceil(emailGrading.grammarScore * 1.6) : 4,
          vocabularyScore: emailGrading.grammarScore != null ? Math.ceil(emailGrading.grammarScore * 1.6) : 4,
          structureScore: emailGrading.structureScore != null ? Math.ceil(emailGrading.structureScore * 1.6) : 4,
          feedback: emailGrading.detailedReview || "Drafted successfully.",
          improvements: emailGrading.improvements || []
        },
        sentenceAnswers: sentenceInputs,
        sentenceGrading: sentenceGradingResult,
        keyVerbalStrengths: overallSummary.keyVerbalStrengths,
        criticalImprovements: overallSummary.criticalImprovements,
        customActionableTip: overallSummary.customActionableTip
      };

      const currentList = [finalRecord, ...allSubmissions];
      saveSubmissions(currentList);
      
      setCurrentSubmission(finalRecord);
      await delay(400);
      setCurrentView('results');

    } catch (err) {
      console.warn("API grading failed, converting to localized heuristic engine:", err);
      setTerminalLogs(prev => [
        ...prev, 
        `[2.9s] Server connection failed or key not activated.`, 
        `[3.1s] Initializing High-Fidelity Heuristic Fallback Core...`
      ]);
      await delay(900);
      setActiveGradingStep(3);

      setTerminalLogs(prev => [...prev, `[4.0s] Executing localized lexical cross-matching loops...`]);
      await delay(500);

      const computed = calculateHeuristicGrades(correctSentences, sentenceGradingResult);
      
      const fallbackRecord: SubmissionRecord = {
        id: "STU-2026-" + Math.floor(100 + Math.random() * 900),
        studentName,
        studentId,
        testId: activeTest!.id,
        testTitle: activeTest!.title,
        date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
        ...computed,
        keyVerbalStrengths: "Demonstrates consistent response completion speeds. Displays accurate knowledge of sentence structure syntax checks.",
        criticalImprovements: "Enhance detailed recall keywords storage and build transitional email signatures explicitly.",
        customActionableTip: "Practice transcribing passages with core dates, metrics, and technical keywords immediately."
      };

      const currentList = [fallbackRecord, ...allSubmissions];
      saveSubmissions(currentList);
      
      setCurrentSubmission(fallbackRecord);
      setActiveGradingStep(4);
      setTerminalLogs(prev => [...prev, `[4.5s] Compiled results cataloged. Loading report view.`]);
      await delay(300);
      setCurrentView('results');
    }
  };

  // Peer comparison calculation helper
  const getCohortComparisonStats = () => {
    const allScores = allSubmissions
      .filter((s) => s.testId === (activeTest?.id || 1))
      .map((s) => s.percentage);
    
    if (allScores.length === 0) {
      if (currentSubmission) allScores.push(currentSubmission.percentage);
      else allScores.push(72.5); // anchor avg
    }

    const max = Math.max(...allScores, 91.25);
    const min = Math.min(...allScores, 55.0);
    const sum = allScores.reduce((acc, v) => acc + v, 0);
    const avg = parseFloat((sum / allScores.length).toFixed(1));

    // Calculate percentile rank approximation
    let rankPercentile = 75;
    if (currentSubmission) {
      const countBelow = allScores.filter((s) => s < currentSubmission.percentage).length;
      const totalCount = allScores.length;
      rankPercentile = totalCount > 1 ? Math.round((countBelow / (totalCount - 1)) * 100) : 90;
      if (rankPercentile > 99) rankPercentile = 99;
      if (rankPercentile < 1) rankPercentile = 12;
    }

    return {
      min: Math.max(30, Math.round(min)),
      avg: Math.round(avg),
      max: Math.round(max),
      percentile: rankPercentile
    };
  };

  // Delete submission handler
  const deleteSubmission = (idToDelete: string) => {
    if (window.confirm("Verify: Are you sure you want to de-register this feedback row?")) {
      const filtered = allSubmissions.filter((sub) => sub.id !== idToDelete);
      saveSubmissions(filtered);
    }
  };

  // Reset core data to presets
  const handleResetData = () => {
    if (window.confirm("Restore presets: Are you sure you want to restore high-contrast default seed cohorts?")) {
      localStorage.removeItem('intellitest_submissions');
      window.location.reload();
    }
  };

  const compStats = getCohortComparisonStats();

  return (
    <div className="min-h-screen bg-[#060814] text-slate-100 flex flex-col font-sans overflow-x-hidden relative p-4 md:p-8 select-none selection:bg-indigo-500/30 selection:text-white">
      
      {/* GLOW DECORATIVE BLURS */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-15%] left-[-15%] w-[60%] h-[60%] bg-indigo-600/10 rounded-full blur-[150px] glow-ambient"></div>
        <div className="absolute bottom-[-15%] right-[-15%] w-[60%] h-[60%] bg-violet-600/10 rounded-full blur-[150px] glow-ambient" style={{ animationDelay: '-5s' }}></div>
        <div className="absolute top-[30%] left-[40%] w-[30%] h-[30%] bg-emerald-600/5 rounded-full blur-[130px]"></div>
      </div>

      {/* CORE CONTAINER */}
      <div className="max-w-6xl w-full mx-auto flex-1 flex flex-col relative z-10 gap-6">
        
        {/* PREMIUM GLASS HEADER */}
        <header id="app-header" className="flex flex-col md:flex-row justify-between items-center bg-[#0d1127]/85 border border-[#1f2951]/60 rounded-2xl px-6 py-4 shadow-xl backdrop-blur-xl gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/25 border border-indigo-400/30">
              <Award className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg md:text-xl font-display font-bold tracking-tight text-white">
                  IntelliTest Verbal Platform
                </h1>
                <span className="px-2.5 py-0.5 bg-indigo-500/15 text-indigo-300 text-[9px] uppercase font-bold rounded-full border border-indigo-500/30 tracking-wider">TCS NQT STAGE</span>
              </div>
              <p className="text-[11px] text-slate-400 tracking-wide font-sans mt-0.5">Automated Verbal Comprehension Benchmarking Simulator</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center md:justify-end gap-3 w-full md:w-auto">
            {/* Clock display */}
            <div className="px-3 py-1.5 bg-[#080a15] rounded-lg border border-[#1a1f3b] text-right font-mono text-xs text-slate-400 hidden sm:block">
              {currentTime}
            </div>

            <div className="flex gap-2">
              <button 
                id="btn-nav-dashboard"
                onClick={() => setCurrentView('landing')}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold tracking-wide transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                  currentView === 'landing' || currentView === 'taking_test'
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/15 border border-indigo-500/30' 
                    : 'bg-[#0a0d1d] text-slate-400 border border-[#161a35] hover:text-slate-100 hover:bg-[#121630]'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                Practice Sets
              </button>

              <button 
                id="btn-nav-admin"
                onClick={() => setCurrentView('admin')}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold tracking-wide transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                  currentView === 'admin' 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/15 border border-indigo-500/30' 
                    : 'bg-[#0a0d1d] text-slate-400 border border-[#161a35] hover:text-slate-100 hover:bg-[#121630]'
                }`}
              >
                <Settings className="w-3.5 h-3.5" />
                System Admin
              </button>
            </div>
          </div>
        </header>

        {/* VIEW 1: LANDING & INITIAL SETUP */}
        {currentView === 'landing' && (
          <main className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Left: Credentials, Practice Selection */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              
              {/* Credentials / Profile Configuration */}
              <div id="student-credentials-panel" className="bg-[#0b0e22]/90 border border-[#1b2247] rounded-2xl p-6 shadow-lg backdrop-blur-xl flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-indigo-400" />
                    <h3 className="text-xs font-bold text-indigo-300 uppercase tracking-widest font-display">Candidate Identification Ledger</h3>
                  </div>
                  <HelpCircle 
                    className="w-4 h-4 text-slate-500 hover:text-slate-300 cursor-pointer transition-colors"
                    onClick={() => setRevealInstructionId(!revealInstructionId)}
                  />
                </div>
                
                {revealInstructionId && (
                  <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-800 text-[11px] text-slate-400 leading-relaxed">
                    Verify that your Registration Roll Number matches university archives. To change candidate profile values, edit the details below directly before launching assessments.
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Candidate Full Name</span>
                    <input 
                      id="input-student-name"
                      type="text" 
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      placeholder="e.g. Praveen Kumar"
                      className="bg-[#05060d] border border-[#1e254d] text-slate-100 focus:border-indigo-500 rounded-xl px-4 py-3 text-xs font-semibold placeholder:text-slate-600 focus:outline-none transition-all duration-200"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Unique Registration ID / Roll Number</span>
                    <input 
                      id="input-student-id"
                      type="text" 
                      value={studentId}
                      onChange={(e) => setStudentId(e.target.value)}
                      placeholder="e.g. CSE-2026-8891"
                      className="bg-[#05060d] border border-[#1e254d] text-slate-100 focus:border-indigo-500 rounded-xl px-4 py-3 text-xs font-mono font-bold placeholder:text-slate-600 focus:outline-none transition-all duration-200"
                    />
                  </div>
                </div>
              </div>

              {/* Practice Test Sets Grid */}
              <div className="bg-[#0b0e22]/90 border border-[#1b2247] rounded-2xl p-6 shadow-xl backdrop-blur-xl flex flex-col flex-grow gap-4 min-h-[400px]">
                <div className="flex justify-between items-center border-b border-[#1b2247]/60 pb-3">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-indigo-400" />
                    <h3 className="text-xs font-bold text-indigo-300 uppercase tracking-widest font-display">Verbal Evaluation Practice Catalogs</h3>
                  </div>
                  <span className="text-[10px] bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 px-2 py-0.5 text-xs rounded-full font-mono font-bold">5 sets ready</span>
                </div>

                <div className="space-y-3.5 overflow-y-auto max-h-[480px] pr-1">
                  {PRACTICE_TESTS.map((test) => {
                    const hasTaken = allSubmissions.some(
                      s => s.testId === test.id && s.studentId === studentId
                    );
                    return (
                      <div 
                        key={test.id} 
                        className={`p-4 rounded-xl transition-all duration-300 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 ${
                          hasTaken 
                            ? 'bg-[#0f1430]/40 border border-[#212c61]/40 hover:border-[#212c61]/85' 
                            : 'bg-[#070914] border border-[#141a36] hover:border-indigo-500/20'
                        }`}
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2.5">
                            <h4 className="text-sm font-semibold text-white tracking-tight leading-none">{test.title}</h4>
                            {hasTaken && (
                              <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded text-[8px] uppercase tracking-wider font-bold">
                                Checked
                              </span>
                            )}
                          </div>
                          
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-3 text-[11px] text-slate-400">
                            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-indigo-400/80" /> 20 Blank Completions</span>
                            <span className="flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5 text-indigo-400/80" /> 4 Passage Recalls</span>
                            <span className="flex items-center gap-1.5"><Send className="w-3.5 h-3.5 text-indigo-400/80" /> 1 AI graded Email</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 w-full md:w-auto justify-end shrink-0">
                          {hasTaken ? (
                            <button
                              id={`btn-view-result-${test.id}`}
                              onClick={() => {
                                const matched = allSubmissions.find(s => s.testId === test.id && s.studentId === studentId);
                                if (matched) {
                                  setCurrentSubmission(matched);
                                  setCurrentView('results');
                                }
                              }}
                              className="w-full md:w-auto px-4 py-2.5 bg-[#141b3a] hover:bg-[#1a234c] border border-[#232e5c] text-indigo-300 hover:text-white text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              Inspect Report
                            </button>
                          ) : (
                            <button
                              id={`btn-start-test-${test.id}`}
                              onClick={() => startExam(test)}
                              className="w-full md:w-auto px-4.5 py-2.5 bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white text-xs font-bold rounded-lg tracking-wide shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                            >
                              <Play className="w-3 h-3 fill-white" />
                              Begin Assessment
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Side: Quick Info, Prep Metrics, Credits */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              
              {/* Prep Metrics Statistics Info Box */}
              <div className="bg-[#0b0e22]/90 border border-[#1b2247] rounded-2xl p-6 shadow-lg backdrop-blur-xl flex flex-col gap-5">
                <div className="flex items-center gap-2 border-b border-[#1b2247]/60 pb-2">
                  <Database className="w-4 h-4 text-emerald-400" />
                  <h3 className="text-xs font-bold text-indigo-300 uppercase tracking-widest font-display">System Calibration Parameters</h3>
                </div>
                
                <div className="space-y-3.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400 font-medium">Sentence Completions:</span>
                    <span className="font-mono bg-indigo-500/10 text-indigo-300 px-2 py-0.5 rounded font-bold">{sentenceTimeLimit}s limit</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400 font-medium">Passage Study timer:</span>
                    <span className="font-mono bg-indigo-500/10 text-indigo-300 px-2 py-0.5 rounded font-bold">{passageReadTimeLimit}s / paragraph</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400 font-medium">Recall Transcription:</span>
                    <span className="font-mono bg-indigo-500/10 text-indigo-300 px-2 py-0.5 rounded font-bold">{passageWriteTimeLimit}s limit</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400 font-medium">Email Compose duration:</span>
                    <span className="font-mono bg-indigo-500/10 text-indigo-300 px-2 py-0.5 rounded font-bold">{(emailTimeLimit/60).toFixed(0)} min limit</span>
                  </div>
                  <div className="flex justify-between items-center text-xs pt-2.5 border-t border-[#1b2247]/50">
                    <span className="text-slate-400 font-medium">AI Grading Core:</span>
                    <span className="font-bold text-indigo-300 text-xs flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                      Gemini 3.5 Flash
                    </span>
                  </div>
                </div>

                <div className="bg-[#05060d] border border-[#1b2247] rounded-xl p-3.5 text-xs text-slate-400 space-y-2 leading-relaxed">
                  <p className="font-bold text-slate-300 text-[11px] uppercase tracking-wider">Exam Compliance:</p>
                  <p>1. Complete candidate information ledger fields.</p>
                  <p>2. Select practice catalogs. Answer blanks sequentially. Each blank has an individual countdown ticking.</p>
                  <p>3. Spend time reading the recalls, then draft a clean textual representation from memory.</p>
                  <p>4. Secure server-side grading computes official metrics.</p>
                </div>
              </div>

              {/* Developer Spotlight Card */}
              <div className="bg-gradient-to-br from-[#0e1233] to-[#040614] border border-[#1e254d] p-6 rounded-2xl flex flex-col justify-center text-center shadow-lg relative overflow-hidden flex-1 min-h-[170px]">
                <div className="absolute top-[-10px] right-[-10px] text-indigo-500/5 rotate-12">
                  <Award size={130} />
                </div>
                <div className="w-10 h-10 bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 rounded-full flex items-center justify-center mx-auto mb-2.5">
                  <Award size={18} />
                </div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#6366f1] mb-1">Architect & Developer Spotlight</p>
                <h3 className="text-xl font-display font-bold text-white mb-0.5">Praveen</h3>
                <p className="text-xs text-slate-400">MTech Computer Science &amp; Engineering</p>
                <p className="text-[11px] text-indigo-300 font-serif italic mt-2">"Benchmarking system timings for highest verbal performance"</p>
                <div className="mt-3.5 px-3 py-1 bg-slate-900/60 text-[9px] text-[#6366f1] font-mono tracking-widest uppercase rounded-md border border-[#1b2247] self-center">
                  Calibration Verified
                </div>
              </div>

            </div>
          </main>
        )}

        {/* VIEW 2: TAKING THE TEST */}
        {currentView === 'taking_test' && (isExamBlockedCurrentSession || blockedStudents.includes(studentId.trim())) ? (
          <main className="flex-1 bg-red-950/20 border border-red-500/30 rounded-2xl p-6 md:p-8 flex flex-col shadow-inner relative justify-center items-center text-center gap-6 min-h-[500px] backdrop-blur-md">
            <div className="absolute inset-0 z-0 bg-[#060814]/80 rounded-2xl pointer-events-none"></div>
            <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
            
            <div className="relative z-10 w-16 h-16 bg-red-500/10 border border-red-500/40 rounded-2xl flex items-center justify-center text-red-500 shadow-xl shadow-red-500/10 animate-pulse">
              <ShieldAlert className="w-8 h-8" />
            </div>

            <div className="relative z-10 max-w-xl space-y-3">
              <h2 className="text-2xl font-display font-black tracking-tight text-red-400">SECURITY PROTOCOL VIOLATION</h2>
              <p className="text-sm text-slate-200 font-bold uppercase tracking-wider font-mono">Exam Session Terminated &amp; Restricted</p>
              <div className="bg-[#05060d]/90 border border-red-500/20 rounded-xl p-5 text-xs text-slate-300 text-left space-y-3.5 leading-relaxed font-sans mt-4">
                <p>
                  <b>Violation Identifier:</b> <span className="font-mono bg-red-500/10 text-red-300 px-1.5 py-0.5 rounded font-bold">SYSTEM_PROCTOR_EVENT</span>
                </p>
                <p>
                  <b>Registered Candidate ID:</b> <span className="font-mono text-white font-bold">{studentId}</span>
                </p>
                <p>
                  <b>Candidate Name:</b> <span className="text-white font-bold">{studentName}</span>
                </p>
                <hr className="border-red-500/20" />
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  During an active assessment lock, the system detected a proctoring event threshold breach. This corresponds to either <b>exiting full screen mode</b>, <b>changing browser tabs</b>, or <b>losing window focus (blur)</b>.
                </p>
                <p className="text-[11px] text-red-400 font-semibold italic">
                  To discourage academic dishonesty, you are blocked from writing or starting this exam again on this account/system.
                </p>
              </div>
            </div>

            <div className="relative z-10 flex gap-3 mt-2">
              <button
                id="btn-violation-return"
                onClick={() => {
                  setIsExamBlockedCurrentSession(false);
                  setCurrentView('landing');
                }}
                className="px-5 py-2.5 bg-slate-900 border border-slate-800 text-slate-400 hover:text-white rounded-lg text-xs font-bold font-mono uppercase tracking-wider transition-all duration-150 cursor-pointer"
              >
                Return to Dashboard
              </button>
              <button
                id="btn-violation-contact-admin"
                onClick={() => {
                  setCurrentView('admin');
                }}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold font-mono uppercase tracking-wider transition-all duration-150 cursor-pointer"
              >
                Go to Admin Portal
              </button>
            </div>
          </main>
        ) : currentView === 'taking_test' && (
          <main className="flex-1 bg-[#0b0e22]/90 border border-[#1b2247] rounded-xl p-6 md:p-8 flex flex-col shadow-inner relative justify-between gap-6 min-h-[500px]">
            
            {/* Countdown indicators / Header inside test */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-[#1b2247]/60 pb-4 gap-3">
              <div>
                <span className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-[9px] font-bold uppercase tracking-widest rounded-full">
                  {currentSection === 'briefing' && "Verification Pre-launch"}
                  {currentSection === 'sentence' && `Section 1: Blanks Completion [Q ${currentSentenceIndex + 1} of 20]`}
                  {currentSection === 'passage_read' && `Section 2: Passage Memorize [Recall ${currentPassageIndex + 1} of 4]`}
                  {currentSection === 'passage_write' && `Section 2: Write recall [Recall ${currentPassageIndex + 1} of 4]`}
                  {currentSection === 'email' && "Section 3: Email Writing Evaluation"}
                  {currentSection === 'grading' && "Evaluation Process"}
                </span>
                <h2 className="text-base md:text-lg font-display font-semibold text-white mt-2">{activeTest?.title}</h2>
              </div>

              {/* Strict Countdown Timer Block */}
              {currentSection !== 'briefing' && currentSection !== 'grading' && (
                <div className="flex items-center gap-3 bg-red-500/15 border border-red-500/30 px-3.5 py-1.5 rounded-xl">
                  <Clock className="w-4 h-4 text-red-400" />
                  <div>
                    <span className="text-[8px] text-slate-400 uppercase font-bold tracking-wider block">Remaining Timer</span>
                    <span className="font-mono text-sm font-bold text-red-200">
                      {Math.floor(globalTimer / 60)}:{(globalTimer % 60).toString().padStart(2, '0')}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* TEST CONTENT VIEW SWITCH */}
            <div className="flex-grow py-4 flex flex-col justify-center">

              {/* A. Briefing Entrance */}
              {currentSection === 'briefing' && (
                <div className="max-w-2xl mx-auto flex flex-col gap-6 text-center items-center py-6">
                  <div className="w-12 h-12 bg-[#121630] border border-[#232e5c] rounded-full flex items-center justify-center text-indigo-400">
                    <Info size={24} />
                  </div>
                  <h3 className="text-lg md:text-xl font-display font-bold text-white">Assessment Guidelines &amp; Timing Compliance</h3>
                  
                  <div className="bg-[#05060d] border border-[#1b2247] rounded-xl p-5 text-xs text-slate-400 text-left space-y-3.5 leading-relaxed">
                    <p className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-1.5 shrink-0"></span>
                      <span><b>Section 1: Fill in the Blanks.</b> Answer 20 questions. Each is visible for exactly <span className="text-white font-bold">{sentenceTimeLimit} seconds</span> and submits automatically on expiration. You cannot return to previous blanks.</span>
                    </p>
                    <p className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-1.5 shrink-0"></span>
                      <span><b>Section 2: Passage Study &amp; Recall.</b> You will study a paragraph for <span className="text-white font-bold">{passageReadTimeLimit} seconds</span>, then transcribe whatever you remember within <span className="text-white font-bold">{passageWriteTimeLimit} seconds</span>. Repeated 4 times.</span>
                    </p>
                    <p className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-1.5 shrink-0"></span>
                      <span><b>Section 3: Email Writing.</b> Comprise a high-relevance professional email targeting the prompt details. Maximum time allocated is <span className="text-white font-bold">{(emailTimeLimit/60).toFixed(0)} minutes</span>.</span>
                    </p>
                  </div>

                  <button
                    id="btn-confirm-start-exam"
                    onClick={() => {
                      setCurrentSection('sentence');
                      setGlobalTimer(sentenceTimeLimit);
                      enterFullScreen();
                    }}
                    className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-xs tracking-wider transition-all shadow-md active:scale-95 flex items-center gap-2 cursor-pointer"
                  >
                    Launch Assessment Now
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* B. Section 1 (Fill in the blanks timer) */}
              {currentSection === 'sentence' && (
                <div className="max-w-2xl mx-auto w-full flex flex-col gap-6 py-4">
                  <div className="flex justify-between items-center text-[10px] text-slate-500 font-bold uppercase tracking-wider font-mono">
                    <span>SECTION PROGRESS STATS</span>
                    <span className="text-indigo-400 font-bold">{currentSentenceIndex + 1} / 20</span>
                  </div>

                  {/* Elegant floating question block */}
                  <div className="bg-[#05060d] border border-[#1e254d] rounded-2xl p-8 shadow-md min-h-[165px] flex items-center justify-center relative overflow-hidden">
                    <div className="absolute top-1.5 left-2.5 text-xs text-indigo-500 font-mono font-bold opacity-30 select-none">TCS_SENTENCE_{currentSentenceIndex + 1}</div>
                    <p className="text-base md:text-xl font-medium text-slate-200 leading-relaxed text-center">
                      {activeTest?.sentenceCompletion[currentSentenceIndex].sentence}
                    </p>
                  </div>

                  {/* Input form */}
                  <div className="flex flex-col sm:flex-row gap-3 mt-1 items-stretch">
                    <input
                      id="input-sentence-completion"
                      type="text"
                      autoFocus
                      placeholder="Enter exactly ONE word..."
                      value={currentSentenceInput}
                      onChange={(e) => setCurrentSentenceInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleNextSentence();
                      }}
                      className="flex-1 bg-[#05060d] border border-[#1e254d] text-[#10b981] font-bold focus:border-indigo-500 rounded-xl px-5 py-3 text-sm focus:outline-none placeholder:text-slate-700 transition-all font-mono"
                    />
                    <button
                      id="btn-next-sentence"
                      onClick={handleNextSentence}
                      className="px-5 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all text-xs flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
                    >
                      {currentSentenceIndex === 19 ? "Section 2" : "Next blank"}
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <span className="text-[10px] text-slate-500 italic text-center block leading-none">
                    * If individual countdown expires, blank submissions are committed as empty. Focus!
                  </span>
                </div>
              )}

              {/* C. Section 2: Passage Read State */}
              {currentSection === 'passage_read' && (
                <div className="max-w-2xl mx-auto w-full flex flex-col gap-6 py-4">
                  <div className="text-center space-y-1">
                    <span className="text-[10px] font-bold text-[#10b981] bg-[#10b981]/10 px-2 py-0.5 rounded border border-[#10b981]/20 font-mono">MEMORIZE COMPREHENSION PHASE</span>
                    <h3 className="text-sm font-semibold text-slate-300 mt-2">Recall Challenge {currentPassageIndex + 1} of 4</h3>
                    <p className="text-xs text-slate-400">Absorb as many keywords, facts, and benefit indices as possible before transcription window.</p>
                  </div>

                  <div className="bg-[#05060d] border border-[#1e254d] rounded-2xl p-8 shadow-lg leading-relaxed text-slate-200 text-sm md:text-base italic font-serif leading-loose tracking-wide">
                    "{activeTest?.passageRecall[currentPassageIndex].passage}"
                  </div>

                  <button
                    id="btn-confirm-start-writing"
                    onClick={handleStartWritingPassage}
                    className="self-center mt-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs tracking-wider uppercase transition-all shadow-md cursor-pointer active:scale-95"
                  >
                    Complete Reading ({globalTimer}s Remaining)
                  </button>
                </div>
              )}

              {/* D. Section 2: Passage Write Recalls */}
              {currentSection === 'passage_write' && (
                <div className="max-w-2xl mx-auto w-full flex flex-col gap-5 py-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-xs font-bold text-[#f43f5e] uppercase tracking-wider font-mono">Recall Transcription Active</h3>
                      <p className="text-xs text-slate-400 mt-0.5">Transcribe whatever you remember of the passage. Content is now hidden.</p>
                    </div>
                    <span className="font-mono text-xs text-slate-500">Length: {passageInputs[currentPassageIndex].length} chars</span>
                  </div>

                  <textarea
                    id="textarea-passage-recall"
                    rows={6}
                    autoFocus
                    placeholder="Provide detailed recall representation. Reference dates or benefits context..."
                    value={passageInputs[currentPassageIndex]}
                    onChange={(e) => {
                      const updated = [...passageInputs];
                      updated[currentPassageIndex] = e.target.value;
                      setPassageInputs(updated);
                    }}
                    className="w-full bg-[#05060d] border border-[#1e254d] rounded-xl px-4 py-3 text-slate-200 text-xs focus:outline-none focus:border-indigo-500 font-sans leading-relaxed resize-none transition-all duration-200"
                  />

                  <button
                    id="btn-next-passage"
                    onClick={() => handleNextPassage(passageInputs[currentPassageIndex])}
                    className="px-5 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs tracking-wider uppercase transition-all duration-250 cursor-pointer self-end"
                  >
                    {currentPassageIndex === 3 ? "Launch Email Module" : "Commit recall & Next paragraph"}
                  </button>
                </div>
              )}

              {/* E. Section 3: Email Drafting (Outlook Style Redesign) */}
              {currentSection === 'email' && (
                <div className="max-w-4xl mx-auto w-full flex flex-col md:grid md:grid-cols-12 gap-6 py-4 items-stretch">
                  
                  {/* Task prompt constraints panel */}
                  <div className="md:col-span-5 bg-[#05060d] border border-[#1b2247] rounded-xl p-5 flex flex-col gap-4">
                    <div>
                      <span className="text-[9px] font-bold text-indigo-400 uppercase tracking-widest font-mono">DRAFT CONSTRAINTS</span>
                      <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mt-1">{activeTest?.emailWriting.situation}</h4>
                    </div>

                    <div className="space-y-1.5 p-3.5 bg-[#0a0c1a]/80 border border-[#1c234a] rounded-lg">
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Required situational context:</p>
                      <p className="text-xs text-slate-200 leading-relaxed italic">
                        "{activeTest!.emailWriting.task}"
                      </p>
                    </div>

                    <div className="text-[11px] text-slate-400 space-y-2 leading-relaxed border-t border-[#1b2247] pt-3 flex-1 flex flex-col justify-end">
                      <p className="font-bold text-slate-300">TCS Evaluator Criteria:</p>
                      <div className="grid grid-cols-1 gap-1.5">
                        <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#10b981]" /> Includes coordinator context</span>
                        <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#10b981]" /> Respectful, corporate tone</span>
                        <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#10b981]" /> Standard salutations &amp; signature</span>
                      </div>
                    </div>
                  </div>

                  {/* High Quality Email Client Interface Simulation */}
                  <div className="md:col-span-7 flex flex-col bg-[#05060d] border border-[#1e254d] rounded-xl overflow-hidden shadow-2xl">
                    {/* Client top frame */}
                    <div className="bg-[#0b0e22] border-b border-[#1e254d] px-4 py-2.5 flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#f43f5e]"></span>
                        <span className="w-2.5 h-2.5 rounded-full bg-[#eab308]"></span>
                        <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]"></span>
                        <span className="text-[10px] font-mono text-slate-500 font-semibold uppercase tracking-wider ml-2">Secure outlook simulation</span>
                      </div>
                      <span className="text-[10px] text-slate-500 font-mono font-bold uppercase">To: coord@prep-center.com</span>
                    </div>

                    {/* From / Subject fields */}
                    <div className="p-3 bg-[#080914] border-b border-[#141832] text-[11px] space-y-1.5 font-sans font-medium text-slate-400">
                      <div><span className="text-slate-500">From:</span> candidate_exam_{studentId.toLowerCase()}@intellitest.org</div>
                      <div><span className="text-slate-500">Subject:</span> Request for Issuance of Certificate - Reg No {studentId}</div>
                    </div>

                    <textarea
                      id="textarea-email-composition"
                      rows={10}
                      placeholder="Dear Course Coordinator,&#10;&#10;I am writing this email to politely request the issuance of my completion certificate for the TCS Verbal course...&#10;&#10;Sincerely,&#10;Praveen Kumar&#10;Reg No: CSE-2026-8891"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      className="w-full bg-transparent border-0 text-slate-200 text-xs focus:outline-none p-4 font-mono leading-relaxed resize-none flex-grow"
                    />

                    <div className="bg-[#0b0e22] border-t border-[#1e254d] px-4 py-3 flex justify-between items-center shrink-0">
                      <span className="text-[10px] text-slate-400 font-mono">Words: {emailInput.trim() ? emailInput.trim().split(/\s+/).length : 0}</span>
                      <button
                        id="btn-submit-final-exam"
                        onClick={submitTestForGrading}
                        className="px-4.5 py-2.1 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg text-xs transition-all tracking-wider uppercase cursor-pointer flex items-center justify-center gap-1.5 shadow-md active:scale-95"
                      >
                        <Send className="w-3 h-3" />
                        Finalize &amp; Submit Entire Exam
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* F. AI Evaluator Loading State (Terminal Trace Design) */}
              {currentSection === 'grading' && (
                <div className="max-w-lg mx-auto py-8 flex flex-col items-center gap-6">
                  
                  {/* Step indicators */}
                  <div className="flex items-center gap-4 w-full justify-between select-none p-3 bg-slate-900/40 rounded-xl border border-[#1b2247]">
                    {[0, 1, 2, 3].map((step) => {
                      const isActive = activeGradingStep === step;
                      const isDone = activeGradingStep > step;
                      return (
                        <div key={step} className="flex items-center gap-1.5">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold font-mono text-[10px] border transition-all duration-300 ${
                            isDone 
                              ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/35' 
                              : isActive 
                                ? 'bg-indigo-500 text-white border-indigo-400 animate-pulse'
                                : 'bg-transparent text-slate-500 border-slate-800'
                          }`}>
                            {isDone ? <Check className="w-3 h-3" /> : step + 1}
                          </div>
                          <span className={`text-[9px] font-bold uppercase tracking-wider hidden sm:inline ${
                            isActive ? 'text-indigo-400' : isDone ? 'text-emerald-400' : 'text-slate-500'
                          }`}>
                            {step === 0 && "Sentence"}
                            {step === 1 && "Parse Recalls"}
                            {step === 2 && "Gemini API"}
                            {step === 3 && "Verified"}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Pulsing Glowing Circle */}
                  <div className="relative my-2 select-none">
                    <div className="w-16 h-16 border-2 border-indigo-500/10 border-t-indigo-400 border-r-indigo-400 rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-indigo-400 animate-pulse" />
                    </div>
                  </div>
                  
                  <div className="space-y-1.5 text-center">
                    <h3 className="text-sm font-bold text-slate-200 uppercase tracking-widest font-display">Multi-Agent AI Benchmarking</h3>
                    <p className="text-xs text-slate-400">Comparing lexical keywords, semantic facts, and analyzing email formal compliance.</p>
                  </div>

                  <div className="w-full bg-[#05060d] border border-[#1e254d] p-4 rounded-xl font-mono text-[11px] text-[#10b981] leading-loose space-y-1 max-h-[160px] overflow-y-auto shadow-inner text-left">
                    {terminalLogs.map((log, index) => (
                      <div key={index} className="flex items-start gap-1">
                        <span className="text-indigo-500 select-none">&gt;</span>
                        <span>{log}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Strict bottom watermark */}
            <div className="border-t border-[#1b2247]/50 pt-3 flex flex-col sm:flex-row justify-between items-center text-[10px] text-slate-500 font-mono gap-2 shrink-0">
              <span>ACTIVE ELECTRONIC ASSESSMENT DEVICE STATUS: MONITORED</span>
              <span>NAME: {studentName} ({studentId})</span>
            </div>

          </main>
        )}

        {/* VIEW 3: REPORT & CERTIFICATE */}
        {currentView === 'results' && currentSubmission && (
          <main className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Left: Overall feedback description, details breakdown, areas for improvement */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              
              {/* Overall reports block */}
              <div className="bg-[#0b0e22]/90 border border-[#1b2247] rounded-2xl p-6 shadow-xl backdrop-blur-xl flex flex-col gap-5">
                
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-[#1b2247]/60 pb-4 gap-3">
                  <div>
                    <span className="px-2.5 py-0.5 bg-emerald-500/10 text-emerald-400 text-[9px] font-bold uppercase tracking-widest rounded-full border border-emerald-500/20 font-mono">
                      ELECTRONIC LEDGER SCORE COMMITTED
                    </span>
                    <h2 className="text-xl font-display font-bold text-slate-100 tracking-tight mt-2">
                       Candidate Verbal <span className="text-indigo-400">Grading Matrix</span>
                    </h2>
                  </div>
                  <div className="text-right flex items-center gap-4">
                    <div className="bg-[#05060d] p-2.5 rounded-lg border border-[#1e254d] text-center min-w-[100px]">
                      <span className="text-[8px] text-slate-500 block font-bold uppercase">Record ID</span>
                      <span className="font-mono text-xs font-bold text-indigo-300">{currentSubmission.id}</span>
                    </div>
                  </div>
                </div>

                {/* Sub-areas Analysis Grid */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 font-display">Section Performance Metrics</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Section 1 */}
                      <div className="bg-[#05060d] border border-[#141a36] p-4 rounded-xl flex flex-col relative overflow-hidden">
                        <div className="absolute top-1 right-1 opacity-5"><CheckCircle2 size={32} /></div>
                        <p className="text-[9px] text-[#6366f1] font-mono font-bold uppercase tracking-wider">01. SentenceCompletion</p>
                        <h4 className="text-xl font-mono font-bold text-white mt-1.5">{currentSubmission.sentenceScore} <span className="text-xs text-slate-500">/ 20</span></h4>
                        <div className="mt-2 text-[10px] text-slate-400">
                          {Math.round((currentSubmission.sentenceScore / 20) * 100)}% absolute matching
                        </div>
                      </div>

                      {/* Section 2 */}
                      <div className="bg-[#05060d] border border-[#141a36] p-4 rounded-xl flex flex-col relative overflow-hidden">
                        <div className="absolute top-1 right-1 opacity-5"><BookOpen size={32} /></div>
                        <p className="text-[9px] text-[#6366f1] font-mono font-bold uppercase tracking-wider">02. Passage recalls</p>
                        <h4 className="text-xl font-mono font-bold text-white mt-1.5">{currentSubmission.passageScore} <span className="text-xs text-slate-500">/ 40</span></h4>
                        <div className="mt-2 text-[10px] text-slate-400">
                          AI semantics correlation
                        </div>
                      </div>

                      {/* Section 3 */}
                      <div className="bg-[#05060d] border border-[#141a36] p-4 rounded-xl flex flex-col relative overflow-hidden">
                        <div className="absolute top-1 right-1 opacity-5"><Send size={32} /></div>
                        <p className="text-[9px] text-[#6366f1] font-mono font-bold uppercase tracking-wider">03. Email writing</p>
                        <h4 className="text-xl font-mono font-bold text-white mt-1.5">{currentSubmission.emailScore} <span className="text-xs text-slate-500">/ 20</span></h4>
                        <div className="mt-2 text-[10px] text-slate-400">
                          Tone &amp; prompt fulfillment
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* High Quality Accordion-Styled Multi-Agent Feedback Logs */}
                  <div className="space-y-3.5 pt-1.5">
                    <h3 className="text-xs font-bold text-indigo-300 uppercase tracking-widest font-display">Detailed Evaluator Insights</h3>
                    
                    {/* Log block 1 */}
                    <div className="border border-[#1b2247] bg-[#05060d] rounded-xl overflow-hidden shadow-inner">
                      <button 
                        onClick={() => setActiveAccordionIndex(0)}
                        className="w-full px-5 py-3.5 bg-[#0b0e22] hover:bg-[#111533] transition-all flex justify-between items-center text-xs font-bold uppercase tracking-widest text-slate-200 border-b border-[#1b2247]"
                      >
                        <span className="flex items-center gap-2"><Sparkles className="w-3.5 h-3.5 text-indigo-400" /> 01. Professional Email Review</span>
                        <span className="text-[10px] font-mono text-indigo-400 font-bold">{currentSubmission.emailScore} marks</span>
                      </button>
                      
                      {activeAccordionIndex === 0 && (
                        <div className="p-5 text-xs text-slate-400 space-y-3 leading-relaxed">
                          <p className="text-slate-200 italic font-mono bg-[#0a0c1a] p-3 rounded-lg border border-[#1c234a]">
                            "{currentSubmission.emailAnalysis.feedback}"
                          </p>
                          <div className="space-y-1.5">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-300">Prescribed improvements for document:</span>
                            <ul className="space-y-1">
                              {currentSubmission.emailAnalysis.improvements.map((imp, idx) => (
                                <li key={idx} className="flex items-start gap-1.5">
                                  <span className="w-1.5 h-1.5 bg-[#f43f5e] rounded-full mt-1.5 shrink-0"></span>
                                  <span>{imp}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Log block 2 */}
                    <div className="border border-[#1b2247] bg-[#05060d] rounded-xl overflow-hidden shadow-inner">
                      <button 
                        onClick={() => setActiveAccordionIndex(1)}
                        className="w-full px-5 py-3.5 bg-[#0b0e22] hover:bg-[#111533] transition-all flex justify-between items-center text-xs font-bold uppercase tracking-widest text-slate-200 border-b border-[#1b2247]"
                      >
                        <span className="flex items-center gap-2"><BookOpen className="w-3.5 h-3.5 text-indigo-400" /> 02. Recall Paragraph analyses</span>
                        <span className="text-[10px] font-mono text-indigo-400 font-bold">{currentSubmission.passageScore} marks</span>
                      </button>
                      
                      {activeAccordionIndex === 1 && (
                        <div className="p-5 text-xs text-slate-400 space-y-4 leading-relaxed">
                          {currentSubmission.passageAnalysis.map((p, idx) => (
                            <div key={idx} className="bg-[#0b0e22] border border-[#1b2247]/60 p-3.5 rounded-lg">
                              <div className="flex justify-between items-center font-bold text-slate-300 mb-1.5">
                                <span className="uppercase tracking-wider">Comprehension Recall {idx+1}</span>
                                <span className="text-[#10b981] font-mono">{p.score}/10</span>
                              </div>
                              <p className="italic text-slate-400">"{p.feedback}"</p>
                              {p.improvements && p.improvements.length > 0 && (
                                <div className="mt-2 text-slate-500 font-medium">
                                  <span className="text-[#f43f5e] font-bold uppercase text-[9px] mr-1.5">Target improve:</span>
                                  {p.improvements.join('; ')}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Log block 3 */}
                    <div className="border border-[#1b2247] bg-[#05060d] rounded-xl overflow-hidden shadow-inner">
                      <button 
                        onClick={() => setActiveAccordionIndex(2)}
                        className="w-full px-5 py-3.5 bg-[#0b0e22] hover:bg-[#111533] transition-all flex justify-between items-center text-xs font-bold uppercase tracking-widest text-slate-200 border-b border-[#1b2247]"
                      >
                        <span className="flex items-center gap-2"><Award className="w-3.5 h-3.5 text-indigo-400" /> 03. Global actionable advisory</span>
                        <span className="text-[10px] font-mono text-[#10b981] font-bold">Consolidated</span>
                      </button>
                      
                      {activeAccordionIndex === 2 && (
                        <div className="p-5 text-xs text-slate-400 space-y-3.5 leading-relaxed">
                          <div>
                            <span className="text-[10px] uppercase font-bold text-slate-200">Verbal Comprehension Strengths:</span>
                            <p className="mt-1 text-slate-400">{currentSubmission.keyVerbalStrengths || "Demonstrates outstanding compliance across blanks with fast keyword recall."}</p>
                          </div>
                          <div>
                            <span className="text-[10px] uppercase font-bold text-slate-200">Critical Gaps Target:</span>
                            <p className="mt-1 text-slate-400">{currentSubmission.criticalImprovements || "Synthesize detailed notes and incorporate explicit registration numbers inside paragraphs."}</p>
                          </div>
                          <div className="p-3 bg-amber-500/10 border border-amber-500/20 text-amber-200 rounded-lg">
                            <span className="font-semibold uppercase tracking-wider text-[10px] block">Actionable Calibration Advisory:</span>
                            <p className="mt-1">{currentSubmission.customActionableTip || "Read standard comprehension passages daily for 30s intervals, then immediately jot down semantic landmarks."}</p>
                          </div>
                        </div>
                      )}
                    </div>

                  </div>

                </div>

              </div>

            </div>

            {/* Right Side: Certificate display, Peer Comparison */}
            <div className="lg:col-span-4 flex flex-col gap-6 select-none shrink-0">
              
              {/* Premium Certificate of Performance */}
              <div className="bg-[#05060d] border border-amber-500/35 relative p-6 rounded-2xl flex flex-col items-center justify-between shadow-2xl relative select-none shrink-0 min-h-[340px]">
                {/* Vintage Border corners */}
                <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-amber-500/60 font-serif"></div>
                <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-amber-500/60 font-serif"></div>
                <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-amber-500/60 font-serif"></div>
                <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-amber-500/60 font-serif"></div>

                <div className="text-center w-full mt-2">
                  <span className="text-[8px] tracking-widest font-bold uppercase text-amber-400 block font-mono">Verifiable electronic credential</span>
                  <div className="text-xs font-serif italic text-slate-400 mt-3">This is proudly awarded to</div>
                  <h3 className="text-xl font-display font-black text-amber-100 tracking-wide mt-1.5 leading-none">{currentSubmission.studentName}</h3>
                  <div className="p-1 px-3 bg-white/5 inline-block text-[10px] tracking-wider rounded border border-white/5 font-mono text-slate-400 mt-2 font-bold">{currentSubmission.studentId}</div>
                  
                  <p className="text-[10px] text-slate-400 leading-relaxed max-w-[210px] mx-auto mt-4">
                    For successfully mastering the verbal assessment benchmark <span className="font-semibold text-white">{currentSubmission.testTitle}</span> under supervised electronic telemetry parameters.
                  </p>
                </div>

                <div className="w-full text-center mt-4">
                  <div className="font-mono text-2xl font-black text-amber-400">
                    {currentSubmission.percentage}<span className="text-sm font-sans font-medium text-amber-300">%</span>
                  </div>
                  <span className="text-[8px] font-bold text-amber-500/70 uppercase tracking-widest font-mono">Grade obtained: {currentSubmission.grade}</span>
                </div>

                {/* Digital certified signatures */}
                <div className="w-full flex justify-between items-end border-t border-[#1b2247] pt-4.5 mt-3 select-none">
                  <div className="text-left font-sans block text-[8px] text-slate-500 shrink-0">
                    <span className="italic block font-serif text-slate-400 leading-none">Praveen</span>
                    <span className="font-mono mt-0.5 block leading-none">MTECH CSE AUDIT</span>
                  </div>
                  <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/30 rounded-full flex items-center justify-center font-display font-medium text-amber-400 text-[10px] shrink-0">
                    SEAL
                  </div>
                  <div className="text-right font-mono text-[8px] text-slate-500 shrink-0 leading-none">
                    <span>VERIFY CODE:</span>
                    <span className="block font-bold text-slate-400 mt-0.5">{currentSubmission.id}</span>
                  </div>
                </div>

                <button 
                  id="btn-download-cert"
                  onClick={() => alert(`IntelliTest certified notification: Verifiable electronic diploma successfully prepared for ${currentSubmission.studentName} under ledger index ${currentSubmission.id}.`)}
                  className="w-full mt-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-[#000] py-3 rounded-lg font-bold text-xs shadow-xl tracking-wider transition-all uppercase cursor-pointer active:scale-97"
                >
                  Verify diploma status
                </button>
              </div>

              {/* Peer Comparison Bar Chart (Graph compared to others) */}
              <div id="peer-comparison-graph" className="bg-[#0b0e22]/90 border border-[#1b2247] rounded-xl p-5 h-[230px] flex flex-col shadow-lg justify-between select-none">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono block">Cohort comparisons stats</span>
                
                <div className="flex-grow flex items-end justify-between px-2 pb-2 gap-3.5 mt-2 h-[120px]">
                  {/* Bottom bar */}
                  <div className="flex flex-col items-center gap-1.5 w-full h-full justify-end select-none">
                    <div className="w-full bg-[#131730] rounded-t relative transition-all" style={{ height: '35%' }}>
                    </div>
                    <span className="text-[9px] text-slate-500 font-mono">Min (35%)</span>
                  </div>

                  {/* Avg bar */}
                  <div className="flex flex-col items-center gap-1.5 w-full h-full justify-end font-semibold select-none">
                    <div className="w-full bg-[#1b234d] rounded-t relative transition-all" style={{ height: `${compStats.avg}%` }}>
                      <div className="absolute -top-4 left-1/2 -to-translate-x-1/2 text-[8px] text-slate-400 font-mono leading-none">{compStats.avg}%</div>
                    </div>
                    <span className="text-[9px] text-slate-400 font-mono">Avg</span>
                  </div>

                  {/* YOU bar */}
                  <div className="flex flex-col items-center gap-1.5 w-full h-full justify-end font-bold text-indigo-400 select-none">
                    <div className="w-full bg-indigo-600 rounded-t relative transition-all shadow-md shadow-indigo-600/30" style={{ height: `${currentSubmission.percentage}%` }}>
                      <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-white text-slate-900 px-1 rounded font-black text-[8px] uppercase select-none leading-none shadow">YOU</div>
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-[8px] text-indigo-200 font-mono">{currentSubmission.percentage}%</div>
                    </div>
                    <span className="text-[9px] text-indigo-400 font-mono">{compStats.percentile}th %</span>
                  </div>

                  {/* Top 99th bar */}
                  <div className="flex flex-col items-center gap-1.5 w-full h-full justify-end select-none">
                    <div className="w-full bg-[#1e234c] rounded-t relative transition-all" style={{ height: '95%' }}>
                    </div>
                    <span className="text-[9px] text-slate-500 font-mono">Top</span>
                  </div>
                </div>

                <p className="text-[9px] text-slate-500 italic mt-1 text-center border-t border-[#1b2247]/50 pt-2">
                  Verbal proficiency benchmark exceeds {compStats.percentile}% of all candidates tested in this set.
                </p>
              </div>

            </div>
          </main>
        )}

        {/* VIEW 4: SYSTEM ADMIN CALIBRATION PLATFORM */}
        {currentView === 'admin' && !isAdminAuthenticated && (
          <main className="flex-1 flex items-center justify-center min-h-[450px]">
            <div className="max-w-md w-full bg-[#0b0e22]/90 border border-[#1b2247] rounded-3xl p-8 shadow-2xl backdrop-blur-xl flex flex-col items-center text-center gap-6 relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent"></div>
              
              <div className="w-14 h-14 bg-indigo-500/10 border border-indigo-500/30 rounded-2xl flex items-center justify-center text-indigo-400 shadow-lg shadow-indigo-500/5">
                <Lock className="w-7 h-7" />
              </div>
              
              <div>
                <h2 className="text-xl font-display font-bold text-white tracking-tight">Administrative Vault Locked</h2>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed font-sans">
                  Enter master security key below to unlock simulator calibration, telemetry parameters, and historical grading lists.
                </p>
              </div>

              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  if (adminPasswordInput === 'AdminVerbal2026') {
                    setIsAdminAuthenticated(true);
                    setAdminPasswordError('');
                    setAdminPasswordInput('');
                  } else {
                    setAdminPasswordError('Security code identification mismatch. Access denied.');
                  }
                }}
                className="w-full flex flex-col gap-4"
              >
                <div className="flex flex-col gap-1.5 text-left">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Master Security Passcode</span>
                  <input 
                    id="input-admin-passcode"
                    type="password" 
                    value={adminPasswordInput}
                    onChange={(e) => {
                      setAdminPasswordInput(e.target.value);
                      if (adminPasswordError) setAdminPasswordError('');
                    }}
                    placeholder="••••••••••••••••"
                    className="w-full bg-[#05060d] border border-[#1e254d] text-slate-100 focus:border-indigo-500 rounded-xl px-4 py-3 text-sm font-mono tracking-widest placeholder:text-slate-600 focus:outline-none transition-all duration-200"
                  />
                  {adminPasswordError && (
                    <span className="text-[10px] text-red-400 flex items-center gap-1 font-semibold mt-1">
                      <ShieldAlert className="w-3.5 h-3.5" />
                      {adminPasswordError}
                    </span>
                  )}
                </div>

                <button 
                  id="btn-submit-passcode"
                  type="submit"
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 active:scale-97 text-white text-xs font-bold rounded-xl tracking-wider shadow-lg shadow-indigo-600/15 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Unlock className="w-3.5 h-3.5" />
                  Decrypt Vault Access
                </button>
              </form>
            </div>
          </main>
        )}

        {currentView === 'admin' && isAdminAuthenticated && (
          <main className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Left Column: Calibration values */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              
              <div className="bg-[#0b0e22]/90 border border-[#1b2247] rounded-2xl p-6 shadow-xl backdrop-blur-xl flex flex-col gap-5">
                <div className="flex items-center gap-2 border-b border-[#1b2247]/60 pb-2">
                  <Settings className="w-4 h-4 text-indigo-400" />
                  <h3 className="text-xs font-bold text-indigo-300 uppercase tracking-widest font-display">Simulator Customization</h3>
                </div>

                <div className="space-y-4">
                  {/* Timer 1 */}
                  <div className="flex flex-col gap-1.5">
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider flex justify-between">
                      <span>Sentence completion blank duration</span>
                      <span className="text-indigo-400 font-mono font-bold">{sentenceTimeLimit}s</span>
                    </div>
                    <input 
                      type="range" 
                      min={10} 
                      max={60} 
                      step={5} 
                      value={sentenceTimeLimit}
                      onChange={(e) => setSentenceTimeLimit(parseInt(e.target.value))}
                      className="w-full accent-indigo-500 h-1.5 bg-[#05060d] rounded-lg cursor-pointer border border-[#1b2247] hover:border-[#212c61]/80"
                    />
                  </div>

                  {/* Timer 2 */}
                  <div className="flex flex-col gap-1.5">
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider flex justify-between">
                      <span>Passage Reading Memorize Timer</span>
                      <span className="text-indigo-400 font-mono font-bold">{passageReadTimeLimit}s</span>
                    </div>
                    <input 
                      type="range" 
                      min={10} 
                      max={90} 
                      step={5} 
                      value={passageReadTimeLimit}
                      onChange={(e) => setPassageReadTimeLimit(parseInt(e.target.value))}
                      className="w-full accent-indigo-500 h-1.5 bg-[#05060d] rounded-lg cursor-pointer border border-[#1b2247] hover:border-[#212c61]/80"
                    />
                  </div>

                  {/* Timer 3 */}
                  <div className="flex flex-col gap-1.5">
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider flex justify-between">
                      <span>Passage Recalls transcript writing time</span>
                      <span className="text-indigo-400 font-mono font-bold">{passageWriteTimeLimit}s</span>
                    </div>
                    <input 
                      type="range" 
                      min={30} 
                      max={240} 
                      step={10} 
                      value={passageWriteTimeLimit}
                      onChange={(e) => setPassageWriteTimeLimit(parseInt(e.target.value))}
                      className="w-full accent-indigo-500 h-1.5 bg-[#05060d] rounded-lg cursor-pointer border border-[#1b2247] hover:border-[#212c61]/80"
                    />
                  </div>

                  {/* Timer 4 */}
                  <div className="flex flex-col gap-1.5">
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider flex justify-between">
                      <span>Email Composing timeline restriction</span>
                      <span className="text-indigo-400 font-mono font-bold">{emailTimeLimit}s ({(emailTimeLimit/60).toFixed(0)} min)</span>
                    </div>
                    <input 
                      type="range" 
                      min={60} 
                      max={900} 
                      step={60} 
                      value={emailTimeLimit}
                      onChange={(e) => setEmailTimeLimit(parseInt(e.target.value))}
                      className="w-full accent-indigo-500 h-1.5 bg-[#05060d] rounded-lg cursor-pointer border border-[#1b2247] hover:border-[#212c61]/80"
                    />
                  </div>
                </div>

                <div className="pt-3 border-t border-[#1b2247]/60 space-y-2.5">
                  <button
                    id="btn-admin-logout"
                    onClick={() => {
                      setIsAdminAuthenticated(false);
                      setAdminPasswordInput('');
                      setCurrentView('landing');
                    }}
                    className="w-full text-center text-[10px] text-slate-300 bg-indigo-950/40 hover:bg-indigo-900/40 py-2 rounded-xl transition-all font-semibold uppercase border border-indigo-500/20 cursor-pointer active:scale-97"
                  >
                    Lock administrative vault
                  </button>
                  <button
                    id="btn-admin-reset"
                    onClick={handleResetData}
                    className="w-full text-center text-[10px] text-red-400 bg-red-500/10 hover:bg-red-500/20 py-2 rounded-xl transition-all font-semibold uppercase border border-red-500/20 cursor-pointer active:scale-97"
                  >
                    Restore default seed submissions
                  </button>
                  <p className="text-[9px] text-slate-500 text-center leading-relaxed">
                    Timers are saved within state context instantly. Adjusting constraints represents rapid debugging.
                  </p>
                </div>
              </div>

              {/* Proctoring Lock Registry card */}
              <div className="bg-[#0b0e22]/90 border border-[#1b2247] rounded-2xl p-6 shadow-xl backdrop-blur-xl flex flex-col gap-4">
                <div className="flex items-center gap-2 border-b border-[#1b2247]/60 pb-2">
                  <ShieldAlert className="w-4 h-4 text-red-400 animate-pulse" />
                  <h3 className="text-xs font-bold text-red-300 uppercase tracking-widest font-display font-bold">Proctoring Lock Registry</h3>
                </div>

                {blockedStudents.length === 0 ? (
                  <p className="text-[11px] text-slate-500 italic text-center py-4">
                    No active candidate ID blocks resolved or registered right now.
                  </p>
                ) : (
                  <div className="space-y-2 max-h-[180px] overflow-y-auto pr-1">
                    {blockedStudents.map((blockedId) => (
                      <div key={blockedId} className="flex justify-between items-center bg-[#05060d] border border-red-500/20 rounded-lg p-3 text-xs">
                        <div className="flex flex-col">
                          <span className="font-mono text-xs font-bold text-red-300">{blockedId}</span>
                          <span className="text-[9px] text-slate-500">Status: Locked session</span>
                        </div>
                        <button
                          onClick={() => {
                            unblockStudent(blockedId);
                            setIsExamBlockedCurrentSession(false);
                            alert(`Admin Authorization: Candidate registration ID ${blockedId} proctor unlock successfully committed. Exam rights restored.`);
                          }}
                          className="bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-emerald-400 text-[10px] px-2.5 py-1.5 rounded font-bold transition-all uppercase cursor-pointer"
                        >
                          Unblock Candidate
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                
                <p className="text-[9px] text-slate-500 leading-relaxed font-sans mt-1">
                  * Admin actions instantly de-restrict candidate access tokens allowing brand new testing trials.
                </p>
              </div>

            </div>

            {/* Right: Results list view where admin has visibility */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              
              <div className="bg-[#0b0e22]/90 border border-[#1b2247] rounded-2xl p-6 shadow-inner flex flex-col flex-grow gap-4 min-h-[460px]">
                <div className="flex justify-between items-center border-b border-[#1b2247]/60 pb-3">
                  <div className="flex items-center gap-2">
                    <Database className="w-4 h-4 text-indigo-400" />
                    <h3 className="text-xs font-bold text-indigo-300 uppercase tracking-widest font-display">Official Grading Registry</h3>
                  </div>
                  <span className="text-[10px] bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 px-2 py-0.5 rounded-full font-mono font-bold font-mono">{allSubmissions.length} rows</span>
                </div>

                <div className="flex-grow overflow-y-auto max-h-[450px] space-y-3.5 pr-1">
                  {allSubmissions.length === 0 ? (
                    <div className="text-center py-10 text-slate-500 text-xs">
                      No candidate submissions registered. Carry out an assessment first.
                    </div>
                  ) : (
                    allSubmissions.map((sub) => (
                      <div 
                        key={sub.id} 
                        className="bg-[#05060d] p-4.5 rounded-xl border border-[#1e254d]/60 flex items-center justify-between hover:border-slate-700/80 transition-all text-xs gap-4"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-200 text-sm leading-none">{sub.studentName}</span>
                            <span className="font-mono text-[9px] bg-indigo-500/15 text-indigo-300 px-1.5 py-0.5 rounded border border-indigo-500/20">({sub.id})</span>
                          </div>
                          
                          <div className="flex flex-wrap gap-x-3 text-[10px] text-slate-400">
                            <span>Test Set: #{sub.testId}</span>
                            <span>• {sub.date}</span>
                            <span>• Roll: <span className="font-mono font-bold text-indigo-300">{sub.studentId}</span></span>
                          </div>

                          <div className="flex flex-wrap gap-2 text-[9px] pt-1.5">
                            <span className="bg-slate-900 border border-[#1b2247]/60 px-1.5 py-0.5 rounded text-slate-400">Sentences: {sub.sentenceScore}/20</span>
                            <span className="bg-slate-900 border border-[#1b2247]/60 px-1.5 py-0.5 rounded text-slate-400">Recalls: {sub.passageScore}/40</span>
                            <span className="bg-slate-900 border border-[#1b2247]/60 px-1.5 py-0.5 rounded text-slate-400">Email: {sub.emailScore}/20</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 shrink-0">
                          <div className="text-right">
                            <p className="text-base font-mono font-black text-white leading-none">{sub.percentage}%</p>
                            <p className="text-[10px] text-indigo-300 font-bold mt-1 uppercase tracking-wider">{sub.grade}</p>
                          </div>

                          <div className="flex gap-1.5 shrink-0">
                            <button
                              id={`btn-admin-view-${sub.id}`}
                              onClick={() => {
                                setCurrentSubmission(sub);
                                setCurrentView('results');
                              }}
                              className="bg-[#121630] hover:bg-[#1a234c] border border-[#232e5c] text-indigo-300 hover:text-white p-2.5 rounded-lg transition-all cursor-pointer active:scale-95"
                              title="Inspect Evaluation"
                            >
                              <Eye size={13} />
                            </button>
                            
                            <button
                              id={`btn-admin-delete-${sub.id}`}
                              onClick={() => deleteSubmission(sub.id)}
                              className="bg-red-500/10 hover:bg-red-500/20 border border-red-500/25 text-red-400 p-2.5 rounded-lg transition-all cursor-pointer active:scale-95"
                              title="Delete Record"
                            >
                              <X size={13} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

            </div>
          </main>
        )}

      </div>

    </div>
  );
}
