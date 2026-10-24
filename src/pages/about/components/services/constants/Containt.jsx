const containt = [
  {
    smallTitle: "Agents",
    bigTitle: "AI agents & retrieval",
    desc: [
      <div key="0-desc-0" className="p-l">{"I design multi-agent systems that connect retrieval, tools, and data."}</div>,
      <div key="0-desc-1" className="p-l">{"NexusAgent and Nova turn these components into traceable workflows."}</div>,
    ],
    descMobile: [
      <div key="0-descMobile-0" className="p-l">{"I design multi-agent systems that connect retrieval, tools, and data."}</div>,
      <div key="0-descMobile-1" className="p-l">{"NexusAgent and Nova turn these components into traceable workflows."}</div>,
    ],
    options: [
      {
        "title": "Multi-agent orchestration",
        "desc": "LangGraph agents with shared state, routing, and human approval."
      },
      {
        "title": "Retrieval-augmented generation",
        "desc": "Milvus and ChromaDB, BM25/RRF retrieval, and BGE reranking."
      },
      {
        "title": "Tool use & SQL",
        "desc": "MCP interfaces, SQLGlot validation, and read-only database access."
      },
      {
        "title": "Tracing & evaluation",
        "desc": "LangSmith traces, retrieval metrics, and automated failure-case tests."
      }
    ],
  },
  {
    smallTitle: "Models",
    bigTitle: "LLM training & research",
    desc: [
      <div key="1-desc-0" className="p-l">{"I fine-tune language models and study adaptation and knowledge retention."}</div>,
      <div key="1-desc-1" className="p-l">{"The work spans QLoRA, representation analysis, and sequence modelling."}</div>,
    ],
    descMobile: [
      <div key="1-descMobile-0" className="p-l">{"I fine-tune language models and study adaptation and knowledge retention."}</div>,
      <div key="1-descMobile-1" className="p-l">{"The work spans QLoRA, representation analysis, and sequence modelling."}</div>,
    ],
    options: [
      {
        "title": "LLM fine-tuning",
        "desc": "4-bit NF4 QLoRA with Hugging Face Transformers, PEFT, and TRL."
      },
      {
        "title": "Continual learning",
        "desc": "PCA-ranked activation drift and Subspace Feature Preservation."
      },
      {
        "title": "Sequence modelling",
        "desc": "Transformer pretraining with masked autoencoders for market-state forecasting."
      },
      {
        "title": "Model evaluation",
        "desc": "Paired benchmarks, ROUGE-L, BERTScore, and regression analysis."
      },
      {
        "title": "Formal verification",
        "desc": "A conditional forgetting bound verified in Lean 4."
      }
    ],
  },
  {
    smallTitle: "Speech",
    bigTitle: "Speech & streaming",
    desc: [
      <div key="2-desc-0" className="p-l">{"I build multilingual speech pipelines with explicit turn control."}</div>,
      <div key="2-desc-1" className="p-l">{"The work connects capture, recognition, translation, and synthesis."}</div>,
    ],
    descMobile: [
      <div key="2-descMobile-0" className="p-l">{"I build multilingual speech pipelines with explicit turn control."}</div>,
      <div key="2-descMobile-1" className="p-l">{"The work connects capture, recognition, translation, and synthesis."}</div>,
    ],
    options: [
      {
        "title": "Audio processing",
        "desc": "AudioWorklet, 20 ms frames, voice activity detection, and polyphase resampling."
      },
      {
        "title": "Speech models",
        "desc": "Groq Whisper, GPT-OSS 20B, and ElevenLabs Flash v2.5."
      },
      {
        "title": "Streaming services",
        "desc": "FastAPI WebSockets, turn IDs, and stale-output filtering."
      },
      {
        "title": "Latency & reliability",
        "desc": "Stage timings, p50/p95 measurements, and 27 backend tests."
      }
    ],
  },
];
export default containt;
