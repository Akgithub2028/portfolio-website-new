const projects = [
  {
    "id": "nexusagent",
    "title": "NexusAgent",
    "img": "/images/projects/nexusagent.webp",
    "link": "/projects/nexusagent",
    "date": "Aug — Sep 2026",
    "liveLink": "https://github.com/Akgithub2028/NexusAgent-Enterprise-Autonomous-Multi-Agent-Decision-Intelligence-Platform",
    "company": "Independent engineering project",
    "kind": "engineering",
    "images": [
      {
        "src": "/images/projects/nexusagent.webp",
        "tag": "big",
        "isRight": false
      },
      {
        "src": "/images/projects/nexusagent-full.webp",
        "tag": "big",
        "isRight": false
      }
    ],
    "desc": [
      "An enterprise decision platform combining policy retrieval, read-only SQL, and multi-agent review.",
      "I built three LangGraph routes for policy, database, and combined questions. Hybrid RAG uses Milvus, BM25/RRF, and BGE reranking; MCP and SQLGlot constrain database access before execution.",
      "On the recorded synthetic evaluation, reranking improved Child Hit@1 from 85.62% to 96.25% (154 of 160 answerable tasks). The SQL workflow passed 28 of 28 frozen security cases.",
      "Evaluation scope: 200 synthetic scenarios, including 160 answerable and 40 unanswerable tasks. These results describe the tested fixtures; production validation and public cloud acceptance remain pending."
    ],
    "primary": "#2D2D2D",
    "accentColor": "#FCFBF7",
    "secondary": "#F2EEE7",
    "fillColor": "#F2F3F4",
    "menuColor": "gold",
    "menuFontColor": "#2D2D2D",
    "fluidColor": "#0028FF"
  },
  {
    "id": "nova",
    "title": "Nova",
    "img": "/images/research/nova.svg",
    "link": "/projects/nova",
    "date": "Jun — Jul 2026",
    "liveLink": "https://github.com/Akgithub2028/Autonomous-AI-Co-Scientist",
    "company": "Independent engineering project",
    "kind": "engineering",
    "images": [
      {
        "src": "/images/research/nova.svg",
        "tag": "big",
        "isRight": false
      }
    ],
    "desc": [
      "A multi-agent research system for generating, critiquing, and refining scientific hypotheses from the literature.",
      "Built with LangGraph and ChromaDB, Nova coordinates literature retrieval, hypothesis generation, pairwise Elo ranking, and iterative refinement. Human approval and LangSmith traces keep the research process reviewable.",
      "In the liver-fibrosis case study, Nova achieved 71.9/100 on the Scientific Hypothesis Quality Index (SHQI) and 74.63/100 on the reported AI Co-Scientist benchmark. The final run used 105 LLM calls and 210,620 tokens over 11.5 minutes.",
      "These scores assess generated hypotheses; experimental validation remains separate. Nova is an independent implementation inspired by Google’s AI Co-Scientist, with no Google or DeepMind affiliation."
    ],
    "primary": "#263745",
    "accentColor": "#f0f4f1",
    "secondary": "#F3F5F7",
    "fillColor": "#E0DFFC",
    "menuColor": "#5C58EB",
    "menuFontColor": "#f0f4f1",
    "fluidColor": "#A3A714"
  },
  {
    "id": "voice-translator",
    "title": "Real-Time Voice Translator",
    "img": "/images/projects/voice-translator-demo.png",
    "link": "/projects/voice-translator",
    "date": "Sep — Oct 2026",
    "liveLink": "https://github.com/Akgithub2028/Real-Time-AI-Voice-Translator",
    "company": "Independent engineering project",
    "kind": "engineering",
    "images": [
      {
        "src": "/images/projects/voice-translator-demo.png",
        "tag": "big",
        "isRight": false
      },
      {
        "src": "/images/research/voice-translator.svg",
        "tag": "big",
        "isRight": false
      }
    ],
    "desc": [
      "A deployed speech-translation application supporting seven languages, with bilingual captions and explicit speaker controls.",
      "I built a Next.js AudioWorklet interface over FastAPI WebSockets, with Groq Whisper for speech recognition, GPT-OSS 20B for translation, and ElevenLabs Flash v2.5 for synthesis.",
      "The pipeline uses 20 ms audio frames, 600 ms silence detection, resampling, turn IDs, and stale-output filtering. It reports p50/p95 latency, and the backend includes 27 recorded passing tests.",
      "Translation follows an utterance boundary. Speaker changes and interruptions are explicit; simultaneous speaker separation and automatic barge-in are outside the current scope. Demo availability depends on service cold starts and quotas."
    ],
    "primary": "#000000",
    "accentColor": "#f0f4f1",
    "secondary": "#FAFAFA",
    "fillColor": "#f2f2f2",
    "menuColor": "#FFD54F",
    "menuFontColor": "#000000",
    "fluidColor": "#002AB0",
    "demoLink": "https://real-time-ai-voice-translator.vercel.app/"
  },
  {
    "id": "sfp",
    "title": "Subspace Feature Preservation",
    "img": "/images/research/sfp.svg",
    "link": "/research/sfp",
    "date": "Feb — Oct 2026",
    "liveLink": "https://github.com/Akgithub2028/SFP/blob/main/paper/sfp.pdf",
    "company": "Independent research",
    "kind": "research",
    "images": [
      {
        "src": "/images/research/sfp.svg",
        "tag": "big",
        "isRight": false
      }
    ],
    "desc": [
      "An empirical study of catastrophic forgetting in Qwen2.5-1.5B, testing whether preserving selected activation subspaces improves retention during sequential fine-tuning.",
      "I designed PCA-based drift analysis and controlled interventions around 32 activation axes, then evaluated retention and adaptation across the tested task sequence. A conditional forgetting bound was verified in Lean 4.",
      "SFP achieved 0.754 retention, 0.650 plasticity, and a 0.699 harmonic score, compared with 0.631 for Learning without Forgetting (LwF). The top-ranked drift predictor reached R² = 0.9331.",
      "The findings apply to the evaluated models and tasks. The drift relationship is correlational, and the study documents sensitivity to model scale."
    ],
    "primary": "#000000",
    "accentColor": "#f0f4f1",
    "secondary": "#F9F9F9",
    "fillColor": "#ebfaf8",
    "menuColor": "#00a8c1",
    "menuFontColor": "#f0f4f1",
    "fluidColor": "#FF573E",
    "sourceLabel": "READ PAPER",
    "paperLink": "/papers/sfp.pdf",
    "resources": [
      {
        "label": "Code & experiments",
        "href": "https://github.com/Akgithub2028/SFP"
      },
      {
        "label": "Study limitations",
        "href": "https://github.com/Akgithub2028/SFP/blob/main/docs/limitations.md"
      }
    ]
  },
  {
    "id": "qlora",
    "title": "Qwen2.5 · QLoRA Fine-Tuning Study",
    "img": "/images/research/qlora.svg",
    "link": "/research/qlora",
    "date": "Aug — Sep 2026",
    "liveLink": "https://github.com/Akgithub2028/qwen-domain-finetuning",
    "company": "Independent research",
    "kind": "research",
    "images": [
      {
        "src": "/images/research/qlora.svg",
        "tag": "big",
        "isRight": false
      }
    ],
    "desc": [
      "A controlled fine-tuning study of Qwen2.5-1.5B-Instruct on ML systems tasks, measuring domain-adaptation gains alongside individual regressions.",
      "I fine-tuned a 4-bit NF4 base with rank-16 QLoRA adapters using Hugging Face Transformers, PEFT, and TRL. Training used 1,286 tasks; the frozen base and adapted model were evaluated on the same 161 held-out examples.",
      "ROUGE-L improved by 30.42%, while BERTScore F1 rose from 0.8187 to 0.8497. Analysis covered 48 topics and difficulty levels, including the 14.2% of test examples that regressed.",
      "This is an independent notebook study, not a peer-reviewed publication. Similarity metrics describe response overlap and do not establish factual correctness."
    ],
    "primary": "#0e0063",
    "accentColor": "#f0f4f1",
    "secondary": "#fbfbfc",
    "fillColor": "#e1e1f9",
    "menuColor": "#170053",
    "menuFontColor": "#f0f4f1",
    "fluidColor": "#E8FFC8",
    "sourceLabel": "VIEW STUDY",
    "resources": [
      {
        "label": "Evaluation results",
        "href": "https://github.com/Akgithub2028/qwen-domain-finetuning/tree/main/results"
      }
    ]
  }
];
export default projects;
