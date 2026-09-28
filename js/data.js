/* ==========================================================================
   Addiction Awareness & Recovery Platform - Master Data Architecture
   ========================================================================== */

const ADDICTION_DATA = {
  // 1. 12 Dedicated Addiction Categories Data
  categories: [
    {
      id: "alcohol",
      title: "Alcohol Addiction",
      subtitle: "Understanding Dependence, Binge Drinking & Recovery",
      icon: "🍷",
      path: "addictions/alcohol.html",
      summary: "Alcohol Use Disorder (AUD) is a chronic medical condition involving brain reward alterations, physical tolerance, and persistent cravings.",
      warningSigns: [
        "Drinking larger amounts or for longer periods than originally planned",
        "Experiencing physical withdrawal symptoms (shakiness, sweating, anxiety) when stopping",
        "Neglecting responsibilities at work, school, or home due to alcohol use",
        "Continuing to drink despite knowing it worsens health or relationship issues"
      ],
      whyCompulsive: "Alcohol increases GABA activity (calming neural firing) while inhibiting glutamate (excitatory signaling) and triggering dopamine release in the nucleus accumbens, creating strong physiological reinforcement.",
      triggers: ["High workplace stress", "Social events & peer pressure", "Emotional sadness or loneliness", "Late evening routines"],
      myths: [
        { myth: "You must hit rock bottom before seeking help.", reality: "Support is effective at any stage of problematic use; early intervention improves outcomes." },
        { myth: "Quitting alcohol is just a matter of willpower.", reality: "Severe alcohol dependence involves physiological neuroadaptation requiring medical management." }
      ]
    },
    {
      id: "substance",
      title: "Drug & Substance Addiction",
      subtitle: "Prescription Meds, Opioids, Stimulants & Harm Reduction",
      icon: "💊",
      path: "addictions/substance.html",
      summary: "Substance Use Disorder involves compulsive drug seeking and use despite harmful physical, emotional, and social consequences.",
      warningSigns: [
        "Needing higher doses to achieve the same effect (tolerance)",
        "Spending excessive time acquiring, using, or recovering from substances",
        "Unsuccessful attempts to cut down or control usage",
        "Experiencing intense physical or psychological cravings"
      ],
      whyCompulsive: "Substances artificially flood synaptic clefts with dopamine or mimic natural endorphins, creating intense neural associations between environmental cues and substance seeking.",
      triggers: ["Chronic physical pain", "Untreated trauma or anxiety", "Availability in social environments", "Stressful life transitions"],
      myths: [
        { myth: "Prescription drugs aren't addictive because a doctor gave them.", reality: "Prescription opioids and sedatives can cause rapid physical tolerance and dependence." }
      ]
    },
    {
      id: "gaming",
      title: "Gaming Addiction",
      subtitle: "Digital Balance, Dopamine Loops & Screen Health",
      icon: "🎮",
      path: "addictions/gaming.html",
      summary: "Gaming Disorder is classified by the WHO as a persistent pattern of digital or video gaming that takes precedence over daily life interests.",
      warningSigns: [
        "Preoccupation with gaming even when engaged in school, work, or meals",
        "Irritability, restlessness, or sadness when unable to play",
        "Lying to family or friends regarding actual hours spent gaming",
        "Gaming as the primary escape from stress or negative emotions"
      ],
      whyCompulsive: "Game developers utilize variable reward schedules, achievement badges, and multiplayer social obligation to continuously stimulate dopamine reward prediction errors.",
      triggers: ["Boredom", "Academic/work frustration", "Social isolation", "Late-night unstructured time"],
      myths: [
        { myth: "All video gaming is addictive.", reality: "Problematic gaming exists on a spectrum; most people game casually without impairment." }
      ]
    },
    {
      id: "social-media",
      title: "Social Media Addiction",
      subtitle: "Doomscrolling, FOMO & Notification Loops",
      icon: "📱",
      path: "addictions/social-media.html",
      summary: "Compulsive social media use involves hyper-fixation on feeds, likes, and algorithmic streams that fragment attention and increase anxiety.",
      warningSigns: [
        "Checking notifications immediately upon waking and right before sleep",
        "Feeling anxious or restless when separated from social feeds",
        "Doomscrolling for hours despite feeling exhausted or distressed",
        "Constantly seeking external social validation through metrics"
      ],
      whyCompulsive: "Short-form video algorithms supply infinite variable rewards, triggering micro-dopamine hits paired with social comparison and FOMO.",
      triggers: ["Loneliness", "Boredom during daily tasks", "Procrastination", "Fear of missing out"],
      myths: [
        { myth: "Social media use isn't a 'real' addiction.", reality: "Compulsive scrolling triggers the exact same neural reward circuits as behavioral gambling." }
      ]
    },
    {
      id: "pornography",
      title: "Pornography & Compulsive Sexual Content Use",
      subtitle: "Understanding Urges, Stress Cycles & Brain Rewiring",
      icon: "🔒",
      path: "addictions/pornography.html",
      summary: "Compulsive explicit content consumption occurs when urge cycles interfere with personal relationships, focus, self-esteem, and daily goals.",
      warningSigns: [
        "Using explicit content as a primary mechanism to cope with stress or loneliness",
        "Escalating to more novel or intense content to achieve the same satisfaction",
        "Feeling guilt, shame, or brain fog following consumption",
        "Unsuccessful attempts to reduce or stop viewing"
      ],
      whyCompulsive: "High novelty paired with immediate gratification triggers potent neurochemical spikes, reinforcing compulsive habits when under emotional distress.",
      triggers: ["Unmanaged stress", "Late nights alone", "Boredom", "Emotional loneliness"],
      myths: [
        { myth: "It is simply a moral failing.", reality: "It is a learned behavioral coping loop driven by stress relief and dopamine novelty." }
      ]
    },
    {
      id: "smartphone",
      title: "Smartphone & Internet Overuse",
      subtitle: "Nomophobia, Constant Checking & Digital Detox",
      icon: "📲",
      path: "addictions/smartphone.html",
      summary: "Smartphone dependency (Nomophobia) involves compulsive phone handling, browser tab hoarding, and fragmented focus.",
      warningSigns: [
        "Compulsive reflex checking of phone screen every few minutes without purpose",
        "Panic or distress when battery is low or signal is lost",
        "Using phone while driving, walking, or during direct conversations",
        "Disrupted sleep due to late-night phone browsing"
      ],
      whyCompulsive: "Smartphones aggregate communication, news, shopping, and entertainment into a single portable cue-trigger device.",
      triggers: ["Micro-moments of waiting", "Work pressure", "Awkward social situations"],
      myths: [
        { myth: "A 24-hour phone detox cures phone addiction forever.", reality: "Sustainable recovery requires building realistic long-term digital boundaries, not one-off fixes." }
      ]
    },
    {
      id: "gambling",
      title: "Gambling Addiction",
      subtitle: "Sports Betting, Chasing Losses & Financial Consequences",
      icon: "🎰",
      path: "addictions/gambling.html",
      summary: "Gambling Disorder is a recognized impulse-control disorder where individuals repeatedly bet money despite severe financial and personal loss.",
      warningSigns: [
        "Chasing losses (gambling more to win back lost money)",
        "Hiding or lying about financial debts to loved ones",
        "Borrowing money or selling possessions to fund gambling",
        "Obsessive thoughts about odds, sports bets, or casino games"
      ],
      whyCompulsive: "Near-misses and uncertain rewards activate the brain's dopamine reward prediction circuitry even more strongly than actual wins.",
      triggers: ["Financial stress", "Boredom", "Sports viewing", "Promotional casino notifications"],
      myths: [
        { myth: "You can win your money back if you double down.", reality: "Chasing losses is a classic psychological trap that worsens financial consequences." }
      ]
    },
    {
      id: "shopping",
      title: "Shopping & Spending Addiction",
      subtitle: "Compulsive Buying, Emotional Relief & Debt Cycles",
      icon: "🛍️",
      path: "addictions/shopping.html",
      summary: "Compulsive buying disorder involves uncontrollable purchasing of unneeded items to soothe negative emotions, resulting in financial strain.",
      warningSigns: [
        "Buying items to cope with sadness, anger, or stress",
        "Hiding shopping bags or credit card statements from family",
        "Feeling temporary euphoria during purchase followed by intense guilt",
        "Accumulating un-opened or unused items in closets"
      ],
      whyCompulsive: "The anticipation of purchasing releases dopamine, while e-commerce 'buy now' buttons eliminate friction to indulge impulse urges.",
      triggers: ["Emotional distress", "Flash sales & targeted ads", "Payday excitement"],
      myths: [
        { myth: "Shopping addiction is just a funny bad habit.", reality: "Compulsive spending can cause devastating debt, legal issues, and severe psychological distress." }
      ]
    },
    {
      id: "food",
      title: "Compulsive Eating Behaviors",
      subtitle: "Emotional Eating, Craving Cycles & Reward Mechanisms",
      icon: "🥑",
      path: "addictions/food.html",
      summary: "Compulsive eating involves consuming high-fat, high-sugar hyper-palatable foods as an emotional coping mechanism rather than for physical hunger.",
      warningSigns: [
        "Eating rapidly in secret during periods of stress or emotional pain",
        "Feeling unable to stop eating even when uncomfortably full",
        "Intense cravings for hyper-palatable processed foods",
        "Deep guilt or distress regarding eating patterns"
      ],
      whyCompulsive: "Hyper-palatable food combinations (sugar + fat) bypass natural satiety signals and stimulate hedonic reward pathways.",
      triggers: ["Emotional stress", "Late-night isolation", "Fatigue", "Restrictive dieting cycles"],
      myths: [
        { myth: "Compulsive eating is solved by strict crash diets.", reality: "Restrictive diets often trigger binge-eating cycles; emotional regulation is key." }
      ]
    },
    {
      id: "work",
      title: "Work Addiction (Workaholism)",
      subtitle: "Compulsive Productivity, Rest Guilt & Burnout",
      icon: "💼",
      path: "addictions/work.html",
      summary: "Work addiction is a compulsive need to work continuously, driven by internal pressure or anxiety, leading to burnout and damaged health.",
      warningSigns: [
        "Inability to disconnect from work during weekends, vacations, or family events",
        "Feeling overwhelming anxiety or guilt when taking a break or resting",
        "Sacrificing sleep, physical exercise, and personal relationships for work tasks",
        "Using work as the sole source of personal identity and self-worth"
      ],
      whyCompulsive: "Societal approval of productivity reinforces the compulsion, masking underlying anxieties or fear of failure.",
      triggers: ["Fear of inadequacy", "Email notifications", "Perfectionism"],
      myths: [
        { myth: "Being a workaholic just means you are dedicated.", reality: "Compulsive work leads to chronic health issues, emotional exhaustion, and severe burnout." }
      ]
    },
    {
      id: "exercise",
      title: "Compulsive Exercise Addiction",
      subtitle: "Over-Training, Guilt & Physical Injury Risks",
      icon: "🏋️",
      path: "addictions/exercise.html",
      summary: "Exercise addiction occurs when physical activity becomes an unhealthy obsession, pursued despite illness, physical injury, or social disruption.",
      warningSigns: [
        "Exercising while injured or sick against medical advice",
        "Extreme distress, irritability, or depression when a workout is missed",
        "Structuring entire life around workouts at the expense of family/work",
        "Exercising for hours to compensate for eating food"
      ],
      whyCompulsive: "Endorphin and endocannabinoid releases ('runner's high') can become a rigid emotional regulation reliance.",
      triggers: ["Body dissatisfaction", "Stress", "Guilt after eating"],
      myths: [
        { myth: "Exercise is always healthy, so you can never do too much.", reality: "Compulsive exercise causes joint damage, hormonal disruption, and chronic fatigue." }
      ]
    },
    {
      id: "relationship",
      title: "Relationship & Love Addiction",
      subtitle: "Validation Reliance, Solitude Fear & Attachment Loops",
      icon: "❤️",
      path: "addictions/relationship.html",
      summary: "Compulsive relationship behavior involves an obsessive reliance on romantic validation or remaining in unhealthy dynamics due to severe fear of solitude.",
      warningSigns: [
        "Feeling completely lost, panicked, or empty when not in a romantic relationship",
        "Rushing into intense relationship dynamics without evaluating safety or fit",
        "Tolerating severe mistreatment to avoid being alone",
        "Obsessive tracking or controlling behavior of romantic partners"
      ],
      whyCompulsive: "Early attachment insecurity creates hyper-vigilance, where romantic affection acts as an intense short-term anxiety reliever.",
      triggers: ["Solitude or silence", "Fear of rejection", "Breakups"],
      myths: [
        { myth: "It just means you are a hopeless romantic.", reality: "Compulsive attachment stems from fear of solitude and hinders genuine, healthy connection." }
      ]
    }
  ],

  // 2. Interactive Addiction Cycle Visualizer Data
  cycles: {
    alcohol: [
      { step: 1, title: "Trigger", desc: "Workplace stress or social anxiety hits.", icon: "⚡" },
      { step: 2, title: "Urge", desc: "Brain recalls past drink for relief.", icon: "🧠" },
      { step: 3, title: "Behavior", desc: "Consuming multiple drinks rapidly.", icon: "🍷" },
      { step: 4, title: "Temporary Reward", desc: "GABA surge brings brief relaxation.", icon: "✨" },
      { step: 5, title: "Consequence", desc: "Hangover, guilt, poor sleep, anxiety spike.", icon: "📉" },
      { step: 6, title: "Reinforcement", desc: "Increased baseline stress restarts the loop.", icon: "🔄" }
    ],
    gaming: [
      { step: 1, title: "Trigger", desc: "Boredom or academic frustration.", icon: "⚡" },
      { step: 2, title: "Urge", desc: "Desire for quick achievement & escape.", icon: "🧠" },
      { step: 3, title: "Behavior", desc: "Binge gaming session past midnight.", icon: "🎮" },
      { step: 4, title: "Temporary Reward", desc: "Level up dopamine reward hit.", icon: "✨" },
      { step: 5, title: "Consequence", desc: "Exhaustion, missed deadlines, guilt.", icon: "📉" },
      { step: 6, title: "Reinforcement", desc: "Unfinished tasks build more stress.", icon: "🔄" }
    ],
    socialMedia: [
      { step: 1, title: "Trigger", desc: "Phone chime or moment of solitude.", icon: "⚡" },
      { step: 2, title: "Urge", desc: "Compulsion to check feeds & FOMO.", icon: "🧠" },
      { step: 3, title: "Behavior", desc: "Endless doomscrolling short videos.", icon: "📱" },
      { step: 4, title: "Temporary Reward", desc: "Novelty micro-dopamine hits.", icon: "✨" },
      { step: 5, title: "Consequence", desc: "Time lost, comparison fatigue, eye strain.", icon: "📉" },
      { step: 6, title: "Reinforcement", desc: "Higher baseline restlessness.", icon: "🔄" }
    ],
    gambling: [
      { step: 1, title: "Trigger", desc: "Financial strain or sports notification.", icon: "⚡" },
      { step: 2, title: "Urge", desc: "Illusion of easy win to solve problem.", icon: "🧠" },
      { step: 3, title: "Behavior", desc: "Placing bets or spinning online slots.", icon: "🎰" },
      { step: 4, title: "Temporary Reward", desc: "Adrenaline rush of near-miss or win.", icon: "✨" },
      { step: 5, title: "Consequence", desc: "Financial loss, secrecy, panic.", icon: "📉" },
      { step: 6, title: "Reinforcement", desc: "Desire to chase losses restarts cycle.", icon: "🔄" }
    ],
    substance: [
      { step: 1, title: "Trigger", desc: "Physical pain or emotional trauma cue.", icon: "⚡" },
      { step: 2, title: "Urge", desc: "Intense craving for chemical relief.", icon: "🧠" },
      { step: 3, title: "Behavior", desc: "Substance consumption.", icon: "💊" },
      { step: 4, title: "Temporary Reward", desc: "Synthetic endorphin/dopamine flood.", icon: "✨" },
      { step: 5, title: "Consequence", desc: "Rebound pain, withdrawal discomfort.", icon: "📉" },
      { step: 6, title: "Reinforcement", desc: "Neuroadaptation increases tolerance.", icon: "🔄" }
    ],
    pornography: [
      { step: 1, title: "Trigger", desc: "Late night solitude or stress episode.", icon: "⚡" },
      { step: 2, title: "Urge", desc: "Seeking novelty dopamine stimulation.", icon: "🧠" },
      { step: 3, title: "Behavior", desc: "Compulsive adult content viewing.", icon: "🔒" },
      { step: 4, title: "Temporary Reward", desc: "Brief tension release.", icon: "✨" },
      { step: 5, title: "Consequence", desc: "Brain fog, guilt, relationship distance.", icon: "📉" },
      { step: 6, title: "Reinforcement", desc: "Stress returns, strengthening habit loop.", icon: "🔄" }
    ],
    shopping: [
      { step: 1, title: "Trigger", desc: "Targeted ad or feeling low self-esteem.", icon: "⚡" },
      { step: 2, title: "Urge", desc: "Thrill of new purchase anticipation.", icon: "🧠" },
      { step: 3, title: "Behavior", desc: "One-click online checkout spree.", icon: "🛍️" },
      { step: 4, title: "Temporary Reward", desc: "Package arrival excitement surge.", icon: "✨" },
      { step: 5, title: "Consequence", desc: "Credit card debt, buyer's remorse.", icon: "📉" },
      { step: 6, title: "Reinforcement", desc: "Financial stress triggers next buy.", icon: "🔄" }
    ]
  },

  // 3. Interactive Trigger Library Data
  triggerLibrary: [
    {
      id: "stress",
      name: "High Workplace / Academic Stress",
      category: "Emotional",
      description: "Overwhelming pressure or deadlines triggering the desire to numb out or escape.",
      actions: [
        "1. Step away from your desk for 5 minutes of deep box breathing (4s in, 4s hold, 4s out, 4s hold).",
        "2. Drink a glass of cold water to ground your physical body.",
        "3. Write down the top 1 task to focus on instead of multi-tasking.",
        "4. Call a colleague or supportive friend to express feelings aloud.",
        "5. Reassess your craving after 15 minutes—cravings peak and naturally fall."
      ]
    },
    {
      id: "boredom",
      name: "Unstructured Boredom",
      category: "Environmental",
      description: "Empty time gaps without a clear activity triggering reflex scrolling or indulgence.",
      actions: [
        "1. Change your immediate environment (walk outside or move to another room).",
        "2. Engage your hands in a physical activity (stretching, drawing, puzzle, dishwashing).",
        "3. Set a 10-minute timer to read a book or article on recovery.",
        "4. Put your phone in a designated 'charging box' away from reach.",
        "5. Review your personal goals written in your Recovery Journal."
      ]
    },
    {
      id: "loneliness",
      name: "Social Isolation & Loneliness",
      category: "Social / Emotional",
      description: "Feeling disconnected from others driving the desire for artificial rewards.",
      actions: [
        "1. Send a text or make a brief phone call to a family member or sponsor.",
        "2. Attend an online or local peer support meeting (AA, NA, SMART Recovery).",
        "3. Go to a public space like a library or coffee shop to be around human activity.",
        "4. Listen to an uplifting podcast or music playlist.",
        "5. Practice self-compassion meditation."
      ]
    },
    {
      id: "notifications",
      name: "Phone Chimes & Notifications",
      category: "Environmental",
      description: "Auditory or visual cues triggering involuntary phone checking and feed doomscrolling.",
      actions: [
        "1. Turn off non-essential app notifications immediately in settings.",
        "2. Switch screen color mode to Grayscale to reduce visual dopamine appeal.",
        "3. Leave phone in another room during meals and before bedtime.",
        "4. Place a physical rubber band around your phone as a mindfulness reminder.",
        "5. Use app blocker tools to enforce daily time limits."
      ]
    },
    {
      id: "late-nights",
      name: "Late Night Solitude",
      category: "Routine",
      description: "Fatigue combined with privacy after midnight creating high vulnerability to urges.",
      actions: [
        "1. Establish a strict 10:30 PM digital device shutdown rule.",
        "2. Keep laptops and smartphones out of the bedroom overnight.",
        "3. Prepare herbal chamomile tea and practice warm bath/shower winding down.",
        "4. Listen to guided sleep meditation or binaural sleep soundscapes.",
        "5. Go to bed even if not tired—resting your body prevents impulsive late-night actions."
      ]
    },
    {
      id: "financial-strain",
      name: "Financial Strain & Debt Stress",
      category: "Situational",
      description: "Worry about bills triggering escape compulsions like gambling or emotional spending.",
      actions: [
        "1. Acknowledge the feeling without taking impulsive financial action.",
        "2. Contact a free non-profit financial counselor or helpline.",
        "3. Lock credit cards or self-exclude from sports betting apps.",
        "4. Focus on free zero-cost grounding activities (nature walks, home exercise).",
        "5. Discuss financial stress openly with a trusted family member."
      ]
    }
  ],

  // 4. Addiction Self-Reflection Questionnaire Data
  selfReflection: [
    { id: 1, text: "Do you repeatedly attempt to cut down or stop the behavior, but struggle to maintain control?" },
    { id: 2, text: "Do you spend significantly more time engaged in the behavior than originally intended?" },
    { id: 3, text: "Does the behavior interfere with your sleep schedule, energy levels, or physical health?" },
    { id: 4, text: "Has the behavior negatively impacted your academic performance, work tasks, or career goals?" },
    { id: 5, text: "Have loved ones expressed concern regarding the time or money you spend on the behavior?" },
    { id: 6, text: "Do you continue the behavior despite knowing it causes personal, financial, or health issues?" },
    { id: 7, text: "Do you experience strong cravings, restlessness, or irritability when unable to indulge?" },
    { id: 8, text: "Do you hide, minimize, or lie about the extent of your behavior to family or friends?" },
    { id: 9, text: "Do you rely on the behavior as your primary method to cope with stress, anger, or sadness?" }
  ],

  // 5. Myth vs Reality Cards
  myths: [
    {
      myth: "Addiction is simply a lack of willpower.",
      reality: "Addiction involves neurobiological alterations in brain circuits governing motivation, reward, and executive behavioral control. Willpower alone is rarely sufficient without proper coping strategies and support."
    },
    {
      myth: "You have to hit 'rock bottom' before recovery can begin.",
      reality: "Intervention and support are effective at any stage. Seeking help early prevents severe health, relationship, and financial damage."
    },
    {
      myth: "Relapse means that recovery has completely failed.",
      reality: "Relapse is a sign that the current recovery plan needs adjustment or additional support. Recovery is rarely a linear path."
    },
    {
      myth: "Only certain 'weak' types of people become addicted.",
      reality: "Addiction affects individuals across all demographics, socio-economic backgrounds, professions, and intelligence levels."
    }
  ]
};
