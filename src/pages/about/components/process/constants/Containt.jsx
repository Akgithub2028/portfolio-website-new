const containt = [
  {
    smallTitle: "Question",
    bigTitle: "Define the problem",
    desc: [
      <div key="0-desc-0" className="p-l">{"I start with the task, its constraints, and a baseline."}</div>,
      <div key="0-desc-1" className="p-l">{"The evaluation should make the research question testable."}</div>,
    ],
    descMobile: [
      <div key="0-descMobile-0" className="p-l">{"I start with the task, its constraints, and a baseline."}</div>,
      <div key="0-descMobile-1" className="p-l">{"The evaluation should make the research question testable."}</div>,
    ],
    options: [
      {
        "title": "Specify the task",
        "desc": "Define inputs, outputs, operating constraints, and failure cases."
      },
      {
        "title": "Choose a baseline",
        "desc": "Establish a clear reference for measuring improvement."
      },
      {
        "title": "Design the evaluation",
        "desc": "Choose datasets, held-out tasks, metrics, and controlled comparisons."
      },
      {
        "title": "Set the scope",
        "desc": "Record model choices, assumptions, and the limits of the experiment."
      }
    ],
  },
  {
    smallTitle: "Evidence",
    bigTitle: "Build, evaluate, iterate",
    desc: [
      <div key="1-desc-0" className="p-l">{"I instrument the system and evaluate it against the same tasks."}</div>,
      <div key="1-desc-1" className="p-l">{"Results and failure analysis guide the next iteration."}</div>,
    ],
    descMobile: [
      <div key="1-descMobile-0" className="p-l">{"I instrument the system and evaluate it against the same tasks."}</div>,
      <div key="1-descMobile-1" className="p-l">{"Results and failure analysis guide the next iteration."}</div>,
    ],
    options: [
      {
        "title": "Instrument the system",
        "desc": "Trace retrieval, tool execution, model outputs, and state changes."
      },
      {
        "title": "Measure performance",
        "desc": "Evaluate task quality alongside latency and resource use."
      },
      {
        "title": "Analyse failures",
        "desc": "Investigate regressions, misleading outputs, and failure cases."
      },
      {
        "title": "Document & reproduce",
        "desc": "Keep code, experiments, results, and limitations together."
      }
    ],
  },
];
export default containt;
