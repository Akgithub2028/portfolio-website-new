// Profile facts preserved from the existing portfolio.
export default {
  "person": {
    "name": "Aayaann Kausar",
    "identity": "AI Engineer · Independent AI Researcher",
    "email": "aayaannkausar@gmail.com",
    "github": "https://github.com/Akgithub2028",
    "linkedin": "https://www.linkedin.com/in/aayaann-kausar-8b2813344/",
    "location": "Kharagpur, India",
    "education": {
      "institution": "Indian Institute of Technology Kharagpur",
      "degree": "B.Tech in Chemical Engineering",
      "minor": "Minor in Artificial Intelligence",
      "period": "2024 — Present"
    },
    "portrait": null,
    "cv": "/cv/Aayaann-Kausar-CV.pdf"
  },
  "projects": [
    {
      "slug": "nexusagent",
      "media": {
        "type": "retrieval-evaluation",
        "before": "85.62",
        "after": "96.25",
        "context": "Child Hit@1 · 160 answerable synthetic tasks",
        "caption": "Synthetic retrieval evaluation",
        "provenance": "https://github.com/Akgithub2028/NexusAgent-Enterprise-Autonomous-Multi-Agent-Decision-Intelligence-Platform"
      },
      "name": "NexusAgent",
      "subtitle": "Enterprise decision intelligence",
      "category": "Agents & retrieval",
      "date": "Aug — Sep 2026",
      "description": "An evidence-grounded multi-agent platform connecting policy retrieval, guarded SQL, and inspectable decisions.",
      "stack": [
        "LangGraph",
        "Hybrid RAG",
        "Milvus",
        "FastAPI"
      ],
      "metric": "96.25%",
      "metricLabel": "Child Hit@1 · synthetic benchmark",
      "github": "https://github.com/Akgithub2028/NexusAgent-Enterprise-Autonomous-Multi-Agent-Decision-Intelligence-Platform",
      "overview": "I built a decision workflow that brings policy clauses and operational database facts into the same evidence contract. Knowledge, data, and mixed requests follow explicit agent routes, with review before an answer is released.",
      "problem": "Enterprise questions often need both a policy exception and a database fact. Retrieval can lose fine print; generated SQL can exceed its scope; a fluent answer can still lack evidence. The engineering challenge was to make those boundaries visible and enforceable.",
      "decisions": [
        {
          "title": "Retrieve clauses, preserve context",
          "body": "Milvus dense retrieval and BM25 lexical search feed reciprocal rank fusion and a BGE cross-encoder. Parent expansion restores the policy context around a retrieved child clause."
        },
        {
          "title": "Constrain SQL before execution",
          "body": "Schema-aware planning passes through an internal MCP boundary. SQLGlot validates the query structure; read-only scopes, limits, and timeouts bound execution."
        },
        {
          "title": "Review evidence before release",
          "body": "LangGraph coordinates knowledge, data, and mixed routes. Evidence sufficiency and citation checks allow an answer, a clarification, or an insufficient-evidence outcome."
        }
      ],
      "outcomes": [
        {
          "value": "85.62 → 96.25%",
          "label": "Child Hit@1 before / after reranking"
        },
        {
          "value": "154 / 160",
          "label": "Answerable tasks with a top-ranked hit"
        },
        {
          "value": "28 / 28",
          "label": "Frozen security boundary cases passed"
        }
      ],
      "limitations": "These are recorded evaluations on synthetic fixtures: 200 scenarios, including 160 answerable and 40 unanswerable tasks. They do not establish production accuracy or security certification. The repository states that public cloud acceptance is pending; no live deployment is claimed here.",
      "sourceNote": "Retrieval results and benchmark denominators are recorded in the repository README."
    },
    {
      "slug": "nova",
      "media": {
        "type": "run-record",
        "caption": "Liver-fibrosis case study · recorded run",
        "provenance": "https://github.com/Akgithub2028/Autonomous-AI-Co-Scientist"
      },
      "name": "Nova",
      "subtitle": "Autonomous AI co-scientist",
      "category": "Agents & retrieval",
      "date": "Jun — Jul 2026",
      "description": "A literature-grounded research workflow that generates, critiques, ranks, and evolves scientific hypotheses.",
      "stack": [
        "LangGraph",
        "Python",
        "ChromaDB",
        "LangSmith"
      ],
      "metric": "71.9 / 100",
      "metricLabel": "SHQI · liver-fibrosis case study",
      "github": "https://github.com/Akgithub2028/Autonomous-AI-Co-Scientist",
      "overview": "Nova is my independent implementation of a multi-agent scientific ideation system, inspired by Google’s AI Co-Scientist. It turns a research goal into literature review, competing hypotheses, critiques, and iterative refinement.",
      "problem": "A single generation pass gives little visibility into why one hypothesis should be preferred to another. I wanted a workflow that makes the process explicit: ground the question in literature, compare alternatives, critique weaknesses, and retain human approval.",
      "decisions": [
        {
          "title": "Separate research responsibilities",
          "body": "A LangGraph supervisor dispatches literature, generation, reflection, ranking, evolution, and proximity work. A meta-review stage informs strategy before the final report."
        },
        {
          "title": "Make candidates compete",
          "body": "Pairwise Elo ranking compares hypotheses, while proximity analysis tracks similarity. Reflection and evolution feed the next iteration instead of treating the first draft as final."
        },
        {
          "title": "Keep the run inspectable",
          "body": "Human approval and LangSmith traces expose decisions and resource use. Persistent vector memory and literature retrieval supply context for later iterations."
        }
      ],
      "outcomes": [
        {
          "value": "71.9 / 100",
          "label": "Scientific Hypothesis Quality Index"
        },
        {
          "value": "74.63 / 100",
          "label": "Reported AI Co-Scientist benchmark score"
        },
        {
          "value": "105",
          "label": "LLM calls in the reported final run"
        }
      ],
      "limitations": "The liver-fibrosis run evaluates generated hypotheses, not experimentally validated biological discoveries. Scores are case-study evaluations, not a general measure of scientific reliability. Nova is an independent project; it has no Google or DeepMind affiliation.",
      "sourceNote": "Workflow, SHQI and the final-run call count are recorded in the repository README."
    },
    {
      "slug": "voice-translator",
      "media": {
        "type": "language-support",
        "languages": [
          {
            "name": "English",
            "code": "en"
          },
          {
            "name": "हिन्दी",
            "code": "hi"
          },
          {
            "name": "தமிழ்",
            "code": "ta"
          },
          {
            "name": "Español",
            "code": "es"
          },
          {
            "name": "Français",
            "code": "fr"
          },
          {
            "name": "Deutsch",
            "code": "de"
          },
          {
            "name": "日本語",
            "code": "ja"
          }
        ],
        "caption": "Language support · documented capability",
        "provenance": "https://github.com/Akgithub2028/Real-Time-AI-Voice-Translator"
      },
      "name": "Real-Time Voice Translator",
      "subtitle": "Bidirectional multilingual speech",
      "category": "Speech systems",
      "date": "Sep — Oct 2026",
      "description": "A seven-language speech pipeline with streaming audio, bilingual captions, explicit turn control, and latency observability.",
      "stack": [
        "Next.js",
        "FastAPI",
        "WebSockets",
        "AudioWorklet"
      ],
      "metric": "7 languages",
      "metricLabel": "Two-way speech · explicit speaker switching",
      "github": "https://github.com/Akgithub2028/Real-Time-AI-Voice-Translator",
      "overview": "I built an utterance-based speech translation application with a Next.js interface and a persistent FastAPI WebSocket pipeline. Recognition, translation, synthesis, and browser playback can each be inspected independently.",
      "problem": "Streaming audio is a coordination problem as much as a model problem. Natural pauses need to define utterances, changing speakers must invalidate stale output, and latency needs an explicit measurement boundary.",
      "decisions": [
        {
          "title": "Use natural speech boundaries",
          "body": "An AudioWorklet emits 20 ms PCM frames. RMS voice activity detection waits for about 600 ms of silence, with an eight-second utterance boundary. Polyphase resampling prepares audio for Whisper."
        },
        {
          "title": "Make turn identity explicit",
          "body": "Speaker switches and interruptions advance turn IDs. Stale captions and audio are discarded, and scheduled playback stops when the user explicitly interrupts."
        },
        {
          "title": "Observe each pipeline stage",
          "body": "Groq Whisper handles recognition, GPT-OSS 20B translation, and ElevenLabs Flash v2.5 streaming synthesis. The dashboard separates server-stage timings from scheduled browser playback, including p50/p95 and sample counts."
        }
      ],
      "outcomes": [
        {
          "value": "7",
          "label": "Selectable source and target languages"
        },
        {
          "value": "27",
          "label": "Recorded backend tests passing"
        },
        {
          "value": "20 ms",
          "label": "Audio capture / VAD frame duration"
        }
      ],
      "limitations": "Translation begins after a pause, rather than word by word. Speaker switching and interruption are explicit; automatic acoustic barge-in and simultaneous speaker separation are outside this version. The documented demo uses free services, so cold starts and quotas affect availability.",
      "sourceNote": "Pipeline, seven-language scope, tests, and measurement boundaries checked against the original README. The README documents a Vercel demo; current availability could not be independently checked, so no live-demo button is shown."
    }
  ],
  "research": {
    "sfp": {
      "title": "Subspace Feature Preservation",
      "short": "SFP",
      "period": "Feb — Oct 2026",
      "description": "Investigating whether catastrophic forgetting during sequential LLM fine-tuning is concentrated in low-dimensional activation subspaces, through drift analysis, controlled interventions, and formal reasoning.",
      "github": "https://github.com/Akgithub2028/SFP",
      "paper": "https://github.com/Akgithub2028/SFP/blob/main/paper/sfp.pdf",
      "experiments": "https://github.com/Akgithub2028/SFP/tree/main/results",
      "limitations": "https://github.com/Akgithub2028/SFP/blob/main/docs/limitations.md",
      "predictors": [
        {
          "name": "Top-ranked",
          "value": 0.9331
        },
        {
          "name": "Total drift",
          "value": 0.8883
        },
        {
          "name": "Random",
          "value": 0.85
        },
        {
          "name": "Bottom-ranked",
          "value": 0.8272
        }
      ],
      "baselines": [
        {
          "name": "SFP",
          "retention": 0.754,
          "plasticity": 0.65,
          "harmonic": 0.699
        },
        {
          "name": "Distill (LwF)",
          "retention": 0.65,
          "plasticity": 0.613,
          "harmonic": 0.631
        },
        {
          "name": "Hidden distill",
          "retention": 0.63,
          "plasticity": 0.6,
          "harmonic": 0.615
        },
        {
          "name": "Strong replay",
          "retention": 0.61,
          "plasticity": 0.59,
          "harmonic": 0.6
        },
        {
          "name": "Standard replay",
          "retention": 0.582,
          "plasticity": 0.6,
          "harmonic": 0.591
        },
        {
          "name": "Orthogonal LoRA",
          "retention": 0.535,
          "plasticity": 0.575,
          "harmonic": 0.554
        },
        {
          "name": "Random basis",
          "retention": 0.47,
          "plasticity": 0.558,
          "harmonic": 0.51
        }
      ]
    },
    "qlora": {
      "title": "Qwen2.5 · QLoRA Fine-Tuning Study",
      "period": "Aug — Sep 2026",
      "description": "A controlled domain-adaptation study comparing a frozen base model and 4-bit QLoRA on the same held-out ML systems tasks, including difficulty analysis and regressions.",
      "github": "https://github.com/Akgithub2028/qwen-domain-finetuning",
      "results": "https://github.com/Akgithub2028/qwen-domain-finetuning/tree/main/results"
    }
  },
  "toolkitGroups": [
    {
      "id": "languages",
      "title": "Languages & systems",
      "label": "Languages",
      "description": "The foundations behind my models, services, and interfaces.",
      "tools": [
        "Python",
        "C++",
        "SQL",
        "TypeScript",
        "JavaScript",
        "Bash",
        "Linux",
        "Git"
      ]
    },
    {
      "id": "frontend",
      "title": "Frontend & creative development",
      "label": "Frontend",
      "description": "Responsive interfaces, browser audio, and motion-driven experiences.",
      "tools": [
        "React",
        "Next.js",
        "TypeScript",
        "JavaScript",
        "HTML",
        "CSS",
        "Tailwind CSS",
        "GSAP",
        "Framer Motion",
        "Web Audio API",
        "AudioWorklet"
      ]
    },
    {
      "id": "backend",
      "title": "Backend & APIs",
      "label": "Backend",
      "description": "Typed APIs, asynchronous workflows, and real-time communication.",
      "tools": [
        "FastAPI",
        "Python",
        "Pydantic",
        "Uvicorn",
        "WebSockets",
        "REST APIs",
        "asyncio",
        "SQLAlchemy",
        "MCP",
        "SQLGlot"
      ]
    },
    {
      "id": "data",
      "title": "Databases & retrieval",
      "label": "Data & retrieval",
      "description": "Structured data, vector search, and evidence-grounded retrieval.",
      "tools": [
        "PostgreSQL",
        "MySQL",
        "Redis",
        "Milvus",
        "ChromaDB",
        "Hybrid RAG",
        "BM25",
        "BGE Reranking",
        "Sentence Transformers"
      ]
    },
    {
      "id": "models",
      "title": "Machine learning & adaptation",
      "label": "ML & models",
      "description": "Model adaptation and controlled experiments with measurable tradeoffs.",
      "tools": [
        "PyTorch",
        "Hugging Face",
        "Transformers",
        "PEFT",
        "QLoRA",
        "TRL",
        "NumPy",
        "SciPy",
        "scikit-learn"
      ]
    },
    {
      "id": "agents",
      "title": "Agents & evaluation",
      "label": "Agents & evals",
      "description": "Tool-using agents, observable workflows, and reproducible evaluation.",
      "tools": [
        "LangGraph",
        "LangChain",
        "LangSmith",
        "MCP",
        "Whisper",
        "ROUGE-L",
        "BERTScore",
        "Lean 4"
      ]
    },
    {
      "id": "cloud",
      "title": "Cloud & infrastructure exploration",
      "label": "Cloud & infra",
      "description": "Deployment tooling and cloud exploration, including AWS, GCP, and Kubernetes.",
      "tools": [
        "AWS",
        "GCP",
        "Kubernetes",
        "Docker",
        "Google Cloud Run",
        "GitHub Actions",
        "CI/CD",
        "Vercel",
        "Render",
        "Linux"
      ]
    },
    {
      "id": "engineering",
      "title": "Testing & developer tools",
      "label": "Engineering",
      "description": "Automated checks and repeatable experiments across Python and the web.",
      "tools": [
        "pytest",
        "Playwright",
        "ESLint",
        "Ruff",
        "Git",
        "GitHub Actions",
        "Matplotlib"
      ]
    }
  ],
  "toolkitHighlights": [
    "Python",
    "TypeScript",
    "React",
    "Next.js",
    "Tailwind CSS",
    "FastAPI",
    "WebSockets",
    "PostgreSQL",
    "Redis",
    "Docker",
    "Kubernetes",
    "AWS",
    "GCP",
    "PyTorch",
    "Hugging Face",
    "LangGraph",
    "Hybrid RAG",
    "Milvus",
    "QLoRA",
    "GitHub Actions",
    "Playwright",
    "GSAP"
  ],
  "skills": [
    {
      "title": "Languages & systems",
      "items": "Python, C++, SQL, TypeScript, JavaScript, Bash, Linux, Git"
    },
    {
      "title": "Frontend & creative development",
      "items": "React, Next.js, TypeScript, JavaScript, HTML, CSS, Tailwind CSS, GSAP, Framer Motion, Web Audio API, AudioWorklet"
    },
    {
      "title": "Backend & APIs",
      "items": "FastAPI, Python, Pydantic, Uvicorn, WebSockets, REST APIs, asyncio, SQLAlchemy, MCP, SQLGlot"
    },
    {
      "title": "Databases & retrieval",
      "items": "PostgreSQL, MySQL, Redis, Milvus, ChromaDB, Hybrid RAG, BM25, BGE Reranking, Sentence Transformers"
    },
    {
      "title": "Machine learning & adaptation",
      "items": "PyTorch, Hugging Face, Transformers, PEFT, QLoRA, TRL, NumPy, SciPy, scikit-learn"
    },
    {
      "title": "Agents & evaluation",
      "items": "LangGraph, LangChain, LangSmith, MCP, Whisper, ROUGE-L, BERTScore, Lean 4"
    },
    {
      "title": "Cloud & infrastructure exploration",
      "items": "AWS, GCP, Kubernetes, Docker, Google Cloud Run, GitHub Actions, CI/CD, Vercel, Render, Linux"
    },
    {
      "title": "Testing & developer tools",
      "items": "pytest, Playwright, ESLint, Ruff, Git, GitHub Actions, Matplotlib"
    }
  ],
  "researchInterests": [
    {
      "title": "LLM post-training",
      "description": "Post-training and continual learning: how representations change during adaptation, which capabilities regress, and how to preserve them without blocking new learning."
    },
    {
      "title": "Learning agents",
      "description": "Reinforcement learning and recursive self-improvement for tool-using agents, with a focus on credit assignment, reliable feedback, and evaluations that distinguish progress from reward hacking."
    },
    {
      "title": "Autonomous scientific discovery",
      "description": "Literature-grounded agents that propose, critique, and refine hypotheses. I’m interested in the boundary between generating a plausible idea and producing evidence that makes it worth testing."
    }
  ]
};
