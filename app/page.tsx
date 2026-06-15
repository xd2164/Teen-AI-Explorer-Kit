"use client"
import React, { useState } from "react"

const PACK_CSS = `
.aip-root *, .aip-root *::before, .aip-root *::after { box-sizing: border-box; }
.aip-root {
  --bg-p: #ffffff; --bg-s: #f7f6f3; --bg-t: #f1efe8;
  --tp: #1a1a18; --ts: #5f5e5a; --tt: #888780; --ti: #185fa5;
  --bdt: rgba(26,26,24,0.12); --bds: rgba(26,26,24,0.22); --bdp: rgba(26,26,24,0.35);
  --rm: 8px; --rl: 12px;
  --fn: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  display: block; padding: 0 1.5rem 3rem; background: var(--bg-t);
  font-family: var(--fn); color: var(--tp); font-size: 14px; line-height: 1.6; min-height: 100vh;
}
@media (prefers-color-scheme: dark) {
  .aip-root {
    --bg-p: #1c1c1a; --bg-s: #252523; --bg-t: #2c2c2a;
    --tp: #f0ede8; --ts: #b4b2a9; --tt: #888780; --ti: #85b7eb;
    --bdt: rgba(240,237,232,0.1); --bds: rgba(240,237,232,0.18); --bdp: rgba(240,237,232,0.28);
  }
}
.aip-root .pw { max-width: 780px; margin: 0 auto; }
.aip-root h1 { font-size: 22px; font-weight: 500; margin: 0 0 3px; color: var(--tp); }
.aip-root h2 { font-size: 15px; font-weight: 500; margin: 0; color: var(--tp); }
.aip-root h3 { font-size: 12px; font-weight: 500; margin: 0 0 8px; color: var(--ts); display: flex; align-items: center; gap: 5px; }
.aip-root p { margin: 0; }
.aip-root a { color: var(--ti); text-decoration: none; }
.aip-root a:hover { text-decoration: underline; }
.aip-root .hub-hdr { padding: 1.5rem 0 1rem; }
.aip-root .hub-hdr p { font-size: 13px; color: var(--ts); }
.aip-root .back-row { display: flex; align-items: center; gap: 8px; margin-bottom: 1.25rem; }
.aip-root .back-btn { display: flex; align-items: center; gap: 5px; font-size: 13px; color: var(--ts); cursor: pointer; border: 0.5px solid var(--bds); background: var(--bg-p); border-radius: var(--rm); padding: 5px 12px; font-family: var(--fn); }
.aip-root .back-btn:hover { background: var(--bg-s); }
.aip-root .breadcrumb { font-size: 12px; color: var(--tt); }
.aip-root .level-tabs { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 1.25rem; }
.aip-root .ltab { padding: 5px 14px; border-radius: 16px; font-size: 12px; font-weight: 500; cursor: pointer; border: 0.5px solid var(--bds); background: var(--bg-p); color: var(--ts); font-family: var(--fn); }
.aip-root .ltab:hover { background: var(--bg-s); }
.aip-root .la.sel { background: #EEEDFE; color: #3C3489; border-color: transparent; }
.aip-root .lb.sel { background: #E1F5EE; color: #085041; border-color: transparent; }
.aip-root .li.sel { background: #FAEEDA; color: #633806; border-color: transparent; }
.aip-root .lv.sel { background: #FAECE7; color: #712B13; border-color: transparent; }
.aip-root .zone-section { margin-bottom: 1.5rem; }
.aip-root .zone-hdr { display: flex; align-items: center; gap: 10px; margin-bottom: 0.75rem; }
.aip-root .zone-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
.aip-root .zone-hint { font-size: 11px; color: var(--tt); margin-left: auto; }
.aip-root .cards-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(190px, 1fr)); gap: 10px; }
.aip-root .rc { background: var(--bg-p); border: 0.5px solid var(--bdt); border-radius: var(--rl); padding: 0.85rem 1rem; text-decoration: none; display: block; color: inherit; }
.aip-root .rc:hover { border-color: var(--bdp); text-decoration: none; }
.aip-root .rc.kit-card { border-style: dashed; cursor: pointer; }
.aip-root .rc.kit-card:hover { border-style: solid; }
.aip-root .rc-top { display: flex; align-items: center; gap: 8px; margin-bottom: 5px; }
.aip-root .rc-icon { width: 30px; height: 30px; border-radius: var(--rm); display: flex; align-items: center; justify-content: center; font-size: 15px; flex-shrink: 0; }
.aip-root .rc-title { font-size: 13px; font-weight: 500; color: var(--tp); line-height: 1.3; }
.aip-root .rc-desc { font-size: 11px; color: var(--ts); line-height: 1.45; margin-bottom: 6px; }
.aip-root .rc-foot { display: flex; align-items: center; justify-content: space-between; }
.aip-root .lvl-badge { font-size: 10px; padding: 2px 7px; border-radius: 8px; font-weight: 500; }
.aip-root .lv-B { background: #E1F5EE; color: #085041; }
.aip-root .lv-I { background: #FAEEDA; color: #633806; }
.aip-root .lv-A { background: #FAECE7; color: #712B13; }
.aip-root .ext-link { font-size: 11px; color: var(--ti); display: flex; align-items: center; gap: 2px; }
.aip-root .dbl-hint { font-size: 10px; color: var(--tt); display: flex; align-items: center; gap: 2px; }
.aip-root .hidden { display: none !important; }
.aip-root .proj-card { background: var(--bg-p); border: 0.5px solid var(--bdt); border-radius: var(--rl); padding: 0.85rem 1rem; }
.aip-root .pc-top { display: flex; align-items: center; gap: 8px; margin-bottom: 5px; }
.aip-root .pc-title { font-size: 13px; font-weight: 500; color: var(--tp); }
.aip-root .pc-desc { font-size: 11px; color: var(--ts); line-height: 1.45; margin-bottom: 6px; }
.aip-root .pc-foot { font-size: 10px; font-weight: 500; padding: 2px 8px; border-radius: 8px; display: inline-block; }
.aip-root .bi-nav { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 1.25rem; }
.aip-root .bi-btn { display: flex; align-items: center; gap: 5px; padding: 6px 13px; border-radius: 16px; font-size: 12px; font-weight: 500; cursor: pointer; border: 0.5px solid var(--bds); background: var(--bg-p); color: var(--ts); font-family: var(--fn); white-space: nowrap; }
.aip-root .bi-btn:hover { background: var(--bg-s); }
.aip-root .bi-btn .dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; }
.aip-root .bk1.sel { background: #EEEDFE; color: #3C3489; border-color: #AFA9EC; }
.aip-root .bk2.sel { background: #E1F5EE; color: #085041; border-color: #5DCAA5; }
.aip-root .bk3.sel { background: #FAEEDA; color: #633806; border-color: #EF9F27; }
.aip-root .bk4.sel { background: #FAECE7; color: #712B13; border-color: #F0997B; }
.aip-root .bk5.sel { background: #E6F1FB; color: #0C447C; border-color: #85B7EB; }
.aip-root .kit-hero { border-radius: var(--rl); padding: 1rem 1.3rem; margin-bottom: 1.1rem; border: 0.5px solid; }
.aip-root .kit-hero h2 { font-size: 15px; font-weight: 500; margin: 0 0 4px; }
.aip-root .kit-hero > p { font-size: 12px; margin: 0 0 9px; line-height: 1.5; }
.aip-root .pills { display: flex; flex-wrap: wrap; gap: 4px; }
.aip-root .pill { font-size: 10px; font-weight: 500; padding: 2px 8px; border-radius: 8px; }
.aip-root .subhdr { font-size: 11px; font-weight: 500; color: var(--tt); letter-spacing: 0.05em; text-transform: uppercase; margin: 1.1rem 0 0.6rem; }
.aip-root .g2 { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 10px; margin-bottom: 0.9rem; }
.aip-root .g3 { display: grid; grid-template-columns: repeat(auto-fill, minmax(175px, 1fr)); gap: 9px; margin-bottom: 0.9rem; }
.aip-root .box { background: var(--bg-p); border: 0.5px solid var(--bdt); border-radius: var(--rl); padding: 0.85rem 0.95rem; }
.aip-root .trow { display: flex; gap: 9px; align-items: flex-start; padding: 6px 0; border-bottom: 0.5px solid var(--bdt); }
.aip-root .trow:last-child { border-bottom: none; padding-bottom: 0; }
.aip-root .tib { width: 28px; height: 28px; border-radius: var(--rm); display: flex; align-items: center; justify-content: center; font-size: 14px; flex-shrink: 0; }
.aip-root .tn { font-size: 12px; font-weight: 500; color: var(--tp); }
.aip-root .td { font-size: 11px; color: var(--ts); line-height: 1.4; margin: 1px 0 2px; }
.aip-root .tl { font-size: 10px; color: var(--ti); display: inline-flex; align-items: center; gap: 2px; }
.aip-root .steps { list-style: none; margin: 0; padding: 0; }
.aip-root .steps li { display: flex; gap: 8px; padding: 5px 0; border-bottom: 0.5px solid var(--bdt); font-size: 11px; color: var(--tp); line-height: 1.4; }
.aip-root .steps li:last-child { border-bottom: none; padding-bottom: 0; }
.aip-root .sn { font-size: 10px; font-weight: 500; min-width: 18px; height: 18px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 1px; }
.aip-root .lc { background: var(--bg-p); border: 0.5px solid var(--bdt); border-radius: var(--rl); padding: 0.75rem 0.85rem; }
.aip-root .lc-top { display: flex; align-items: flex-start; gap: 6px; margin-bottom: 5px; }
.aip-root .sbadge { font-size: 10px; font-weight: 500; padding: 2px 6px; border-radius: 6px; flex-shrink: 0; margin-top: 1px; }
.aip-root .gtag { font-size: 10px; padding: 2px 6px; border-radius: 6px; font-weight: 500; }
.aip-root .gE { background: #E1F5EE; color: #085041; }
.aip-root .gM { background: #FAEEDA; color: #633806; }
.aip-root .gH { background: #FAECE7; color: #712B13; }
.aip-root .lc-ttl { font-size: 12px; font-weight: 500; color: var(--tp); line-height: 1.3; }
.aip-root .lc-std { font-size: 10px; color: var(--tt); margin: 1px 0 4px; }
.aip-root .lc-body { font-size: 11px; color: var(--ts); line-height: 1.45; }
.aip-root .dq { background: var(--bg-s); border-radius: var(--rm); padding: 0.6rem 0.85rem; margin: 4px 0; }
.aip-root .dq p { font-size: 11px; color: var(--ts); line-height: 1.5; }
.aip-root .rstrip { border-left: 3px solid; padding: 0.65rem 0.9rem; margin-top: 1.1rem; }
.aip-root .rstrip p { font-size: 12px; line-height: 1.55; color: var(--ts); }
.aip-root .rstrip strong { color: var(--tp); font-weight: 500; }
.aip-root .source-note { margin-top: 2.5rem; padding-top: 1rem; border-top: 0.5px solid var(--bdt); font-size: 11px; color: var(--tt); line-height: 1.6; }
`

export default function AiPackPage() {
  const [lv, setLv]     = useState("all")
  const [view, setView] = useState<"ov" | "kit">("ov")
  const [kit, setKit]   = useState(1)

  const h = (cardLv: string) => lv !== "all" && cardLv !== lv

  const openKit = (n: number) => {
    setView("kit"); setKit(n)
    if (typeof window !== "undefined") window.scrollTo(0, 0)
  }
  const goBack = () => {
    setView("ov")
    if (typeof window !== "undefined") window.scrollTo(0, 0)
  }

  const kitNames = ["", "Perception", "Representation", "Learning", "Natural interaction", "Societal impact"]

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3.19.0/dist/tabler-icons.min.css" />
      <style dangerouslySetInnerHTML={{ __html: PACK_CSS }} />
      <div className="aip-root">
        <div className="pw">

          <div className="hub-hdr">
            <h1><i className="ti ti-robot" aria-hidden="true" style={{ fontSize: 19, verticalAlign: -2, marginRight: 8, color: "#7F77DD" }}></i>AI Pack for Teens</h1>
            <p>Start in the overview — browse by zone and level. Double-click any kit card to open its full curriculum detail.</p>
          </div>

          {view === "ov" && (
            <div>
              <div className="level-tabs">
                <button className={`ltab la${lv === "all" ? " sel" : ""}`} onClick={() => setLv("all")}><i className="ti ti-layout-grid"></i> All</button>
                <button className={`ltab lb${lv === "beginner" ? " sel" : ""}`} onClick={() => setLv("beginner")}>Beginner</button>
                <button className={`ltab li${lv === "intermediate" ? " sel" : ""}`} onClick={() => setLv("intermediate")}>Intermediate</button>
                <button className={`ltab lv${lv === "advanced" ? " sel" : ""}`} onClick={() => setLv("advanced")}>Advanced</button>
              </div>

              <div className="zone-section">
                <div className="zone-hdr"><div className="zone-dot" style={{ background: "#1D9E75" }}></div><h2>Play &amp; explore — zero coding</h2><span className="zone-hint">No setup needed</span></div>
                <div className="cards-grid">
                  <a href="https://www.moralmachine.net/" className={`rc${h("beginner") ? " hidden" : ""}`} target="_blank" rel="noopener"><div className="rc-top"><div className="rc-icon" style={{ background: "#E1F5EE", color: "#0F6E56" }}><i className="ti ti-scale"></i></div><span className="rc-title">MIT Moral Machine</span></div><p className="rc-desc">Play through AI ethical dilemmas — self-driving car scenarios. See how your choices compare globally.</p><div className="rc-foot"><span className="lvl-badge lv-B">Beginner</span><span className="ext-link"><i className="ti ti-external-link"></i> Open</span></div></a>
                  <a href="https://www.khanmigo.ai/" className={`rc${h("beginner") ? " hidden" : ""}`} target="_blank" rel="noopener"><div className="rc-top"><div className="rc-icon" style={{ background: "#EEEDFE", color: "#534AB7" }}><i className="ti ti-messages"></i></div><span className="rc-title">Khanmigo AI tutor</span></div><p className="rc-desc">Free AI tutor that guides rather than answers. Great for math, science, writing.</p><div className="rc-foot"><span className="lvl-badge lv-B">Beginner</span><span className="ext-link"><i className="ti ti-external-link"></i> Open</span></div></a>
                  <a href="https://spectrogram.sciencemusic.org/" className={`rc${h("beginner") ? " hidden" : ""}`} target="_blank" rel="noopener"><div className="rc-top"><div className="rc-icon" style={{ background: "#FAEEDA", color: "#854F0B" }}><i className="ti ti-wave-sine"></i></div><span className="rc-title">Speech spectrogram</span></div><p className="rc-desc">Sing into your mic and watch AI visualize your voice as frequency data.</p><div className="rc-foot"><span className="lvl-badge lv-B">Beginner</span><span className="ext-link"><i className="ti ti-external-link"></i> Open</span></div></a>
                  <a href="https://ai.google/" className={`rc${h("beginner") ? " hidden" : ""}`} target="_blank" rel="noopener"><div className="rc-top"><div className="rc-icon" style={{ background: "#E6F1FB", color: "#185FA5" }}><i className="ti ti-school"></i></div><span className="rc-title">Google AI explainers</span></div><p className="rc-desc">Simple visual explainers on how AI, ML, and neural networks actually work.</p><div className="rc-foot"><span className="lvl-badge lv-B">Beginner</span><span className="ext-link"><i className="ti ti-external-link"></i> Open</span></div></a>
                </div>
              </div>

              <div className="zone-section">
                <div className="zone-hdr"><div className="zone-dot" style={{ background: "#BA7517" }}></div><h2>Build blocks — drag-and-drop coding</h2><span className="zone-hint">No typing required</span></div>
                <div className="cards-grid">
                  <a href="https://scratch.mit.edu/" className={`rc${h("beginner") ? " hidden" : ""}`} target="_blank" rel="noopener"><div className="rc-top"><div className="rc-icon" style={{ background: "#FAEEDA", color: "#854F0B" }}><i className="ti ti-cat"></i></div><span className="rc-title">Scratch</span></div><p className="rc-desc">MIT block-based coding. Build autonomous agents, games, and AI chatbots — core to all five book lessons.</p><div className="rc-foot"><span className="lvl-badge lv-B">Beginner</span><span className="ext-link"><i className="ti ti-external-link"></i> Open</span></div></a>
                  <a href="https://appinventor.mit.edu/" className={`rc${h("beginner") ? " hidden" : ""}`} target="_blank" rel="noopener"><div className="rc-top"><div className="rc-icon" style={{ background: "#E1F5EE", color: "#0F6E56" }}><i className="ti ti-device-mobile"></i></div><span className="rc-title">MIT App Inventor</span></div><p className="rc-desc">Build real Android apps with AI features — image recognition, speech, sensors.</p><div className="rc-foot"><span className="lvl-badge lv-B">Beginner</span><span className="ext-link"><i className="ti ti-external-link"></i> Open</span></div></a>
                  <a href="https://machinelearningforkids.co.uk/" className={`rc${h("intermediate") ? " hidden" : ""}`} target="_blank" rel="noopener"><div className="rc-top"><div className="rc-icon" style={{ background: "#FAEEDA", color: "#854F0B" }}><i className="ti ti-brain"></i></div><span className="rc-title">ML for Kids</span></div><p className="rc-desc">Train your own AI on text, images, or sound. Connect the trained model to Scratch or Python.</p><div className="rc-foot"><span className="lvl-badge lv-I">Intermediate</span><span className="ext-link"><i className="ti ti-external-link"></i> Open</span></div></a>
                  <a href="https://www.geogebra.org/" className={`rc${h("intermediate") ? " hidden" : ""}`} target="_blank" rel="noopener"><div className="rc-top"><div className="rc-icon" style={{ background: "#E6F1FB", color: "#185FA5" }}><i className="ti ti-math-function"></i></div><span className="rc-title">GeoGebra</span></div><p className="rc-desc">Explore the math behind AI — probability trees, scatter plots, tessellations — visually.</p><div className="rc-foot"><span className="lvl-badge lv-I">Intermediate</span><span className="ext-link"><i className="ti ti-external-link"></i> Open</span></div></a>
                </div>
              </div>

              <div className="zone-section">
                <div className="zone-hdr"><div className="zone-dot" style={{ background: "#D85A30" }}></div><h2>Code &amp; create — structured curricula</h2><span className="zone-hint">Real projects</span></div>
                <div className="cards-grid">
                  <a href="https://ai4k12.org/activities/" className={`rc${h("intermediate") ? " hidden" : ""}`} target="_blank" rel="noopener"><div className="rc-top"><div className="rc-icon" style={{ background: "#EEEDFE", color: "#534AB7" }}><i className="ti ti-list-check"></i></div><span className="rc-title">AI4K12 activities</span></div><p className="rc-desc">Hands-on activities for all Five Big Ideas in AI. The framework underlying the entire book.</p><div className="rc-foot"><span className="lvl-badge lv-I">Intermediate</span><span className="ext-link"><i className="ti ti-external-link"></i> Open</span></div></a>
                  <a href="https://dayofai.org/" className={`rc${h("intermediate") ? " hidden" : ""}`} target="_blank" rel="noopener"><div className="rc-top"><div className="rc-icon" style={{ background: "#E1F5EE", color: "#0F6E56" }}><i className="ti ti-calendar-event"></i></div><span className="rc-title">Day of AI</span></div><p className="rc-desc">Free MIT curriculum on how AI works, who builds it, bias, and real-world applications.</p><div className="rc-foot"><span className="lvl-badge lv-I">Intermediate</span><span className="ext-link"><i className="ti ti-external-link"></i> Open</span></div></a>
                  <a href="https://ai-4-all.org/resources/" className={`rc${h("advanced") ? " hidden" : ""}`} target="_blank" rel="noopener"><div className="rc-top"><div className="rc-icon" style={{ background: "#FAECE7", color: "#993C1D" }}><i className="ti ti-users"></i></div><span className="rc-title">AI4ALL open learning</span></div><p className="rc-desc">Full self-paced curriculum — ML concepts, AI careers, social impact. No CS background needed.</p><div className="rc-foot"><span className="lvl-badge lv-A">Advanced</span><span className="ext-link"><i className="ti ti-external-link"></i> Open</span></div></a>
                  <a href="https://www.wolframalpha.com/" className={`rc${h("advanced") ? " hidden" : ""}`} target="_blank" rel="noopener"><div className="rc-top"><div className="rc-icon" style={{ background: "#FAEEDA", color: "#854F0B" }}><i className="ti ti-calculator"></i></div><span className="rc-title">WolframAlpha</span></div><p className="rc-desc">AI computation engine. Ask anything in plain English — math, science, data.</p><div className="rc-foot"><span className="lvl-badge lv-A">Advanced</span><span className="ext-link"><i className="ti ti-external-link"></i> Open</span></div></a>
                  <a href="https://teacher.desmos.com/" className={`rc${h("intermediate") ? " hidden" : ""}`} target="_blank" rel="noopener"><div className="rc-top"><div className="rc-icon" style={{ background: "#EAF3DE", color: "#3B6D11" }}><i className="ti ti-chart-line"></i></div><span className="rc-title">Desmos</span></div><p className="rc-desc">Free graphing. See scatter plots, regression lines, and the math core of ML.</p><div className="rc-foot"><span className="lvl-badge lv-I">Intermediate</span><span className="ext-link"><i className="ti ti-external-link"></i> Open</span></div></a>
                  <a href="https://phet.colorado.edu/" className={`rc${h("beginner") ? " hidden" : ""}`} target="_blank" rel="noopener"><div className="rc-top"><div className="rc-icon" style={{ background: "#E6F1FB", color: "#185FA5" }}><i className="ti ti-atom"></i></div><span className="rc-title">PhET simulations</span></div><p className="rc-desc">Free science simulations from CU Boulder. Used in 6 lessons across the book.</p><div className="rc-foot"><span className="lvl-badge lv-B">Beginner</span><span className="ext-link"><i className="ti ti-external-link"></i> Open</span></div></a>
                </div>
              </div>

              <div className="zone-section">
                <div className="zone-hdr"><div className="zone-dot" style={{ background: "#534AB7" }}></div><h2>Project prompts — starter builds</h2><span className="zone-hint">Tied to book lessons</span></div>
                <div className="cards-grid">
                  <div className={`proj-card${h("beginner") ? " hidden" : ""}`}><div className="pc-top"><div className="rc-icon" style={{ background: "#E1F5EE", color: "#0F6E56" }}><i className="ti ti-paw"></i></div><span className="pc-title">Search &amp; rescue bot</span></div><p className="pc-desc">Scratch agent navigates a maze, avoids obstacles, rescues a target. Full code steps in book Lesson 3.5.</p><span className="pc-foot" style={{ background: "#E1F5EE", color: "#085041" }}>Beginner · Scratch</span></div>
                  <div className={`proj-card${h("intermediate") ? " hidden" : ""}`}><div className="pc-top"><div className="rc-icon" style={{ background: "#FAEEDA", color: "#854F0B" }}><i className="ti ti-message-chatbot"></i></div><span className="pc-title">Text classifier</span></div><p className="pc-desc">Train ML for Kids on movie reviews. Hook to a Scratch chatbot that responds to your mood.</p><span className="pc-foot" style={{ background: "#FAEEDA", color: "#633806" }}>Intermediate · ML for Kids</span></div>
                  <div className={`proj-card${h("advanced") ? " hidden" : ""}`}><div className="pc-top"><div className="rc-icon" style={{ background: "#FAECE7", color: "#993C1D" }}><i className="ti ti-network"></i></div><span className="pc-title">Social network graph</span></div><p className="pc-desc">Download a real dataset from Stanford SNAP. Visualize friendships as a graph. See how AI uses networks for recommendations.</p><span className="pc-foot" style={{ background: "#FAECE7", color: "#712B13" }}>Advanced · Python + data</span></div>
                  <div className={`proj-card${h("intermediate") ? " hidden" : ""}`}><div className="pc-top"><div className="rc-icon" style={{ background: "#EEEDFE", color: "#534AB7" }}><i className="ti ti-bulb"></i></div><span className="pc-title">AI ethics debate</span></div><p className="pc-desc">Use MIT Moral Machine + ChatGPT to research both sides of an AI ethics question. Present as 2-min video or slides.</p><span className="pc-foot" style={{ background: "#EEEDFE", color: "#3C3489" }}>Intermediate · No coding</span></div>
                </div>
              </div>

              <div className="zone-section">
                <div className="zone-hdr"><div className="zone-dot" style={{ background: "#7F77DD" }}></div><h2>AI kits — Five Big Ideas in AI</h2><span className="zone-hint">Double-click to open full kit</span></div>
                <div className="cards-grid">
                  <div className={`rc kit-card${h("intermediate") ? " hidden" : ""}`} onDoubleClick={() => openKit(1)} title="Double-click to open Kit 1"><div className="rc-top"><div className="rc-icon" style={{ background: "#EEEDFE", color: "#534AB7" }}><i className="ti ti-ear"></i></div><span className="rc-title">Kit 1 · Perception</span></div><p className="rc-desc">Accessibility sensor + pixel statistics + phonics AI. Scratch, ML for Kids, App Inventor.</p><div className="rc-foot"><span className="lvl-badge lv-I">Intermediate</span><span className="dbl-hint"><i className="ti ti-hand-click"></i> double-click</span></div></div>
                  <div className={`rc kit-card${h("intermediate") ? " hidden" : ""}`} onDoubleClick={() => openKit(2)} title="Double-click to open Kit 2"><div className="rc-top"><div className="rc-icon" style={{ background: "#E1F5EE", color: "#0F6E56" }}><i className="ti ti-binary-tree"></i></div><span className="rc-title">Kit 2 · Representation</span></div><p className="rc-desc">Netflix recommender + probability trees + character annotation. Scratch, Desmos, GeoGebra.</p><div className="rc-foot"><span className="lvl-badge lv-I">Intermediate</span><span className="dbl-hint"><i className="ti ti-hand-click"></i> double-click</span></div></div>
                  <div className={`rc kit-card${h("intermediate") ? " hidden" : ""}`} onDoubleClick={() => openKit(3)} title="Double-click to open Kit 3"><div className="rc-top"><div className="rc-icon" style={{ background: "#FAEEDA", color: "#854F0B" }}><i className="ti ti-brain"></i></div><span className="rc-title">Kit 3 · Learning</span></div><p className="rc-desc">Climate ML model + regression + data labeling board game. ML for Kids, Desmos, PhET.</p><div className="rc-foot"><span className="lvl-badge lv-I">Intermediate</span><span className="dbl-hint"><i className="ti ti-hand-click"></i> double-click</span></div></div>
                  <div className={`rc kit-card${h("intermediate") ? " hidden" : ""}`} onDoubleClick={() => openKit(4)} title="Double-click to open Kit 4"><div className="rc-top"><div className="rc-icon" style={{ background: "#FAECE7", color: "#993C1D" }}><i className="ti ti-sparkles"></i></div><span className="rc-title">Kit 4 · Natural interaction</span></div><p className="rc-desc">GenAI fashion design + Earth reasoning + AI debate. ChatGPT, Canva, EarthViewer.</p><div className="rc-foot"><span className="lvl-badge lv-I">Intermediate</span><span className="dbl-hint"><i className="ti ti-hand-click"></i> double-click</span></div></div>
                  <div className={`rc kit-card${h("advanced") ? " hidden" : ""}`} onDoubleClick={() => openKit(5)} title="Double-click to open Kit 5"><div className="rc-top"><div className="rc-icon" style={{ background: "#E6F1FB", color: "#185FA5" }}><i className="ti ti-world"></i></div><span className="rc-title">Kit 5 · Societal impact</span></div><p className="rc-desc">Autonomous rescue agent + genetic AI ethics + digital divide. Scratch, Moral Machine, ChatGPT.</p><div className="rc-foot"><span className="lvl-badge lv-A">Advanced</span><span className="dbl-hint"><i className="ti ti-hand-click"></i> double-click</span></div></div>
                </div>
              </div>
            </div>
          )}

          {view === "kit" && (
            <div>
              <div className="back-row">
                <button className="back-btn" onClick={goBack}><i className="ti ti-arrow-left"></i> Back to overview</button>
                <span className="breadcrumb">AI Pack › Kit {kit} · {kitNames[kit]}</span>
              </div>
              <div className="bi-nav">
                <button className={`bi-btn bk1${kit === 1 ? " sel" : ""}`} onClick={() => setKit(1)}><span className="dot" style={{ background: "#7F77DD" }}></span>1 · Perception</button>
                <button className={`bi-btn bk2${kit === 2 ? " sel" : ""}`} onClick={() => setKit(2)}><span className="dot" style={{ background: "#1D9E75" }}></span>2 · Representation</button>
                <button className={`bi-btn bk3${kit === 3 ? " sel" : ""}`} onClick={() => setKit(3)}><span className="dot" style={{ background: "#BA7517" }}></span>3 · Learning</button>
                <button className={`bi-btn bk4${kit === 4 ? " sel" : ""}`} onClick={() => setKit(4)}><span className="dot" style={{ background: "#D85A30" }}></span>4 · Natural interaction</button>
                <button className={`bi-btn bk5${kit === 5 ? " sel" : ""}`} onClick={() => setKit(5)}><span className="dot" style={{ background: "#378ADD" }}></span>5 · Societal impact</button>
              </div>
              {kit === 1 && <Kit1 />}
              {kit === 2 && <Kit2 />}
              {kit === 3 && <Kit3 />}
              {kit === 4 && <Kit4 />}
              {kit === 5 && <Kit5 />}
            </div>
          )}

          <div className="source-note">
            Based on: Lyublinskaya, I. (2026). <em>Teaching AI Literacy Across the Curriculum.</em> Corwin Press.<br />
            Companion website:{" "}<a href="https://companion.corwin.com/courses/TeachingAILiteracy" target="_blank" rel="noopener">companion.corwin.com/courses/TeachingAILiteracy</a>{" "}·{" "}
            All linked tools are free. No accounts required for most.
          </div>

        </div>
      </div>
    </>
  )
}

function Kit1() {
  return (
    <div>
      <div className="kit-hero" style={{ background: "#EEEDFE", borderColor: "#AFA9EC" }}>
        <h2 style={{ color: "#26215C" }}>Kit 1 · Perception — how machines sense the world</h2>
        <p style={{ color: "#534AB7" }}>Computers perceive the world through sensors — converting physical signals (sound, light, motion) into data an algorithm can process. This kit builds an accessibility sensor, analyzes images as pixel grids, and connects voice-assistant phonics to AI hearing.</p>
        <div className="pills"><span className="pill" style={{ background: "#CECBF6", color: "#26215C" }}>Sensing</span><span className="pill" style={{ background: "#CECBF6", color: "#26215C" }}>Signal processing</span><span className="pill" style={{ background: "#CECBF6", color: "#26215C" }}>Noise filtering</span><span className="pill" style={{ background: "#CECBF6", color: "#26215C" }}>Thresholding</span><span className="pill" style={{ background: "#CECBF6", color: "#26215C" }}>Feature extraction</span></div>
      </div>
      <div className="subhdr">Core tools</div>
      <div className="box" style={{ marginBottom: ".9rem" }}>
        <div className="trow"><div className="tib" style={{ background: "#FAEEDA", color: "#854F0B" }}><i className="ti ti-wave-sine"></i></div><div><div className="tn">Speech spectrogram</div><div className="td">Visualize voice as frequency data — exactly how AI "hears" before processing.</div><a href="https://spectrogram.sciencemusic.org/" className="tl" target="_blank" rel="noopener"><i className="ti ti-external-link"></i> spectrogram.sciencemusic.org</a></div></div>
        <div className="trow"><div className="tib" style={{ background: "#EAF3DE", color: "#3B6D11" }}><i className="ti ti-brain"></i></div><div><div className="tn">ML for Kids — sound classifier</div><div className="td">Record 20+ samples/class (alarm, voice, silence). Train. Trigger a Scratch visual alert.</div><a href="https://machinelearningforkids.co.uk/" className="tl" target="_blank" rel="noopener"><i className="ti ti-external-link"></i> machinelearningforkids.co.uk</a></div></div>
        <div className="trow"><div className="tib" style={{ background: "#EEEDFE", color: "#534AB7" }}><i className="ti ti-device-mobile"></i></div><div><div className="tn">MIT App Inventor</div><div className="td">Package sound detection as a real Android vibration-alert app.</div><a href="https://appinventor.mit.edu/" className="tl" target="_blank" rel="noopener"><i className="ti ti-external-link"></i> appinventor.mit.edu</a></div></div>
      </div>
      <div className="subhdr">Build steps — Lesson 3.2</div>
      <div className="g2">
        <div className="box"><h3><i className="ti ti-list-numbers"></i> Design &amp; create</h3><ul className="steps"><li><span className="sn" style={{ background: "#EEEDFE", color: "#534AB7" }}>1</span>Pick a learning space. Use the Empathize Template: target action → data type → sensor → AI perception needed.</li><li><span className="sn" style={{ background: "#EEEDFE", color: "#534AB7" }}>2</span>Record 20+ audio samples per class in ML for Kids. Label carefully — this is your training data.</li><li><span className="sn" style={{ background: "#EEEDFE", color: "#534AB7" }}>3</span>Train. Note confidence. Add samples where accuracy is below 80%. Retrain and compare.</li><li><span className="sn" style={{ background: "#EEEDFE", color: "#534AB7" }}>4</span>In Scratch, trigger a visual flash when the model detects an alert sound.</li><li><span className="sn" style={{ background: "#EEEDFE", color: "#534AB7" }}>5</span>Extend to App Inventor: package the model as a real phone notification app.</li></ul></div>
        <div className="box"><h3><i className="ti ti-zoom-question"></i> Reflect</h3><ul className="steps"><li><span className="sn" style={{ background: "#EEEDFE", color: "#534AB7" }}>R1</span>Test on 10 new sounds not in training. Track failures — what patterns do you see?</li><li><span className="sn" style={{ background: "#EEEDFE", color: "#534AB7" }}>R2</span>How might a noise-cancellation algorithm treat accents or non-English speech differently?</li><li><span className="sn" style={{ background: "#EEEDFE", color: "#534AB7" }}>R3</span>Your sensor works in a quiet room. How would you redesign it for a cafeteria?</li></ul></div>
      </div>
      <div className="subhdr">Cross-disciplinary lessons</div>
      <div className="g3">
        <div className="lc"><div className="lc-top"><span className="sbadge" style={{ background: "#EAF3DE", color: "#27500A" }}>Science</span><span className="gtag gE">Elem</span></div><div className="lc-ttl">5.1: Renewable energy &amp; solar sensing</div><div className="lc-std">NGSS 4-PS3-2 · Energy transfer</div><div className="lc-body">Attach sensors to solar panels. AI processes sensor data to optimize orientation — the same sensing pipeline as your hearing sensor.</div></div>
        <div className="lc"><div className="lc-top"><span className="sbadge" style={{ background: "#E6F1FB", color: "#0C447C" }}>Math</span><span className="gtag gM">Middle</span></div><div className="lc-ttl">6.1: Statistics in digital photography</div><div className="lc-std">CCSS 6.SP.B.5 · Distributions</div><div className="lc-body">Work with a 5×5 pixel grid (0–255). Calculate mean, median, mode — exactly how AI "sees" an image. Apply thresholding to convert to black-and-white.</div></div>
        <div className="lc"><div className="lc-top"><span className="sbadge" style={{ background: "#FBEAF0", color: "#72243E" }}>ELA</span><span className="gtag gE">Elem</span></div><div className="lc-ttl">7.2: Phonics — decoding complex words</div><div className="lc-std">CCSS RF.2.3.B · Vowel teams</div><div className="lc-body">Practice vowel teams with a voice assistant. Try to "trick" it with mispronunciations — reveals its perception limits. Parallels how AI tokenizes speech.</div></div>
      </div>
      <div className="dq"><p>A camera represents an image as numbers; a mic represents sound as frequency data. What is always lost when the real world becomes data — and who decides what gets discarded?</p></div>
      <div className="rstrip" style={{ borderColor: "#7F77DD", background: "#EEEDFE" }}><p><strong>Book's core question:</strong> How might a noise-cancellation algorithm treat accents or non-English speech? What does that reveal about whose voices AI is trained to hear?</p></div>
    </div>
  )
}

function Kit2() {
  return (
    <div>
      <div className="kit-hero" style={{ background: "#E1F5EE", borderColor: "#5DCAA5" }}>
        <h2 style={{ color: "#04342C" }}>Kit 2 · Representation &amp; reasoning — how machines think</h2>
        <p style={{ color: "#0F6E56" }}>Computers structure knowledge as data and use reasoning algorithms to make decisions. This kit builds a Netflix recommender chatbot, uses probability trees to model weather-prediction AI, and connects literary annotation to AI feature extraction.</p>
        <div className="pills"><span className="pill" style={{ background: "#9FE1CB", color: "#04342C" }}>Collaborative filtering</span><span className="pill" style={{ background: "#9FE1CB", color: "#04342C" }}>Content-based filtering</span><span className="pill" style={{ background: "#9FE1CB", color: "#04342C" }}>Conditional probability</span><span className="pill" style={{ background: "#9FE1CB", color: "#04342C" }}>Feature extraction</span><span className="pill" style={{ background: "#9FE1CB", color: "#04342C" }}>Sentiment analysis</span></div>
      </div>
      <div className="subhdr">Core tools</div>
      <div className="box" style={{ marginBottom: ".9rem" }}>
        <div className="trow"><div className="tib" style={{ background: "#E1F5EE", color: "#0F6E56" }}><i className="ti ti-cat"></i></div><div><div className="tn">Scratch — recommender chatbot</div><div className="td">Store user preferences in lists. Use if/else logic to match and suggest — collaborative or content-based filtering made tangible.</div><a href="https://scratch.mit.edu/" className="tl" target="_blank" rel="noopener"><i className="ti ti-external-link"></i> scratch.mit.edu</a></div></div>
        <div className="trow"><div className="tib" style={{ background: "#EAF3DE", color: "#3B6D11" }}><i className="ti ti-chart-scatter"></i></div><div><div className="tn">Desmos — scatter plots &amp; similarity</div><div className="td">Plot users in a 2D preference space to show nearest-neighbor filtering. Also used in Lesson 6.4 for regression.</div><a href="https://teacher.desmos.com/" className="tl" target="_blank" rel="noopener"><i className="ti ti-external-link"></i> teacher.desmos.com</a></div></div>
        <div className="trow"><div className="tib" style={{ background: "#FAEEDA", color: "#854F0B" }}><i className="ti ti-binary-tree"></i></div><div><div className="tn">GeoGebra — probability trees</div><div className="td">Draw decision trees for Lesson 6.2 weather-prediction AI. Also tessellations as a training-dataset simulation.</div><a href="https://www.geogebra.org/" className="tl" target="_blank" rel="noopener"><i className="ti ti-external-link"></i> geogebra.org</a></div></div>
      </div>
      <div className="subhdr">Build steps — Lesson 3.1</div>
      <div className="g2">
        <div className="box"><h3><i className="ti ti-list-numbers"></i> Design &amp; create</h3><ul className="steps"><li><span className="sn" style={{ background: "#E1F5EE", color: "#0F6E56" }}>1</span>Choose community and item type. Decide: collaborative (similar users) or content-based (similar features)?</li><li><span className="sn" style={{ background: "#E1F5EE", color: "#0F6E56" }}>2</span>Sketch the algorithm as a flowchart before coding — if user liked X and Y, suggest Z.</li><li><span className="sn" style={{ background: "#E1F5EE", color: "#0F6E56" }}>3</span>In Scratch: build lists of items and preferences. Wire "when [user picks X] → suggest [Y]" logic.</li><li><span className="sn" style={{ background: "#E1F5EE", color: "#0F6E56" }}>4</span>Add a chatbot sprite: 3 questions → personalized recommendation.</li><li><span className="sn" style={{ background: "#E1F5EE", color: "#0F6E56" }}>5</span>Test with 5 peers. Log wrong outputs. Is the failure in data, logic, or categories?</li></ul></div>
        <div className="box"><h3><i className="ti ti-zoom-question"></i> Reflect</h3><ul className="steps"><li><span className="sn" style={{ background: "#E1F5EE", color: "#0F6E56" }}>R1</span>Netflix reinforces what you already watch. How could you redesign your recommender to avoid filter bubbles?</li><li><span className="sn" style={{ background: "#E1F5EE", color: "#0F6E56" }}>R2</span>What data would improve your recommender? What data would make it biased?</li><li><span className="sn" style={{ background: "#E1F5EE", color: "#0F6E56" }}>R3</span>What does human recommendation use that your algorithm cannot model?</li></ul></div>
      </div>
      <div className="subhdr">Cross-disciplinary lessons</div>
      <div className="g3">
        <div className="lc"><div className="lc-top"><span className="sbadge" style={{ background: "#EAF3DE", color: "#27500A" }}>Science</span><span className="gtag gM">Middle</span></div><div className="lc-ttl">5.3: Natural selection simulation</div><div className="lc-std">NGSS MS-LS4-4 · Natural selection</div><div className="lc-body">Adjust predator/food in PhET sim; observe rabbit population. Parallels AI genetic algorithms: encoding traits as data, running selection pressure, optimizing on feedback.</div></div>
        <div className="lc"><div className="lc-top"><span className="sbadge" style={{ background: "#E6F1FB", color: "#0C447C" }}>Math</span><span className="gtag gH">High school</span></div><div className="lc-ttl">6.2: Probability trees &amp; weather prediction</div><div className="lc-std">CCSS HSS-CP.A.2 · Conditional probability</div><div className="lc-body">70% cloudiness → 60% humidity if cloudy → 80% rain if humid. Build the probability tree and compute total rain probability — exactly how a Bayesian AI weather model works.</div></div>
        <div className="lc"><div className="lc-top"><span className="sbadge" style={{ background: "#FBEAF0", color: "#72243E" }}>ELA</span><span className="gtag gM">Middle</span></div><div className="lc-ttl">7.1: Analyzing character development</div><div className="lc-std">CCSS RL.6.3 · Plot and character</div><div className="lc-body">Annotate a character timeline (The Giver, Wonder, Percy Jackson). Each step maps to AI: key event = data selection; emotional arc = sentiment analysis; cause-effect = pattern recognition.</div></div>
      </div>
      <div className="dq"><p>Your recommender, the probability tree, and the character timeline all represent knowledge differently. What does each make easy to compute — and what human nuance does each lose?</p></div>
      <div className="rstrip" style={{ borderColor: "#1D9E75", background: "#E1F5EE" }}><p><strong>Book's core question:</strong> Netflix's algorithm can reinforce what you already watch. How could you redesign your recommender to ensure users occasionally encounter something genuinely unexpected?</p></div>
    </div>
  )
}

function Kit3() {
  return (
    <div>
      <div className="kit-hero" style={{ background: "#FAEEDA", borderColor: "#EF9F27" }}>
        <h2 style={{ color: "#412402" }}>Kit 3 · Learning — how machines learn from data</h2>
        <p style={{ color: "#854F0B" }}>ML means computers find patterns in labeled data to make predictions. This kit trains a supervised ML model on climate images, parallels physics experiments with ML training, and shows how a word board game teaches the same logic as NLP data labeling.</p>
        <div className="pills"><span className="pill" style={{ background: "#FAC775", color: "#412402" }}>Supervised learning</span><span className="pill" style={{ background: "#FAC775", color: "#412402" }}>Neural networks</span><span className="pill" style={{ background: "#FAC775", color: "#412402" }}>Training &amp; test sets</span><span className="pill" style={{ background: "#FAC775", color: "#412402" }}>Data labeling</span><span className="pill" style={{ background: "#FAC775", color: "#412402" }}>Linear regression</span></div>
      </div>
      <div className="subhdr">Core tools</div>
      <div className="box" style={{ marginBottom: ".9rem" }}>
        <div className="trow"><div className="tib" style={{ background: "#FAEEDA", color: "#854F0B" }}><i className="ti ti-brain"></i></div><div><div className="tn">ML for Kids — image classifier</div><div className="td">Label climate images (healthy/deforested/flooded). Train. Connect to Scratch alert when damage is detected.</div><a href="https://machinelearningforkids.co.uk/" className="tl" target="_blank" rel="noopener"><i className="ti ti-external-link"></i> machinelearningforkids.co.uk</a></div></div>
        <div className="trow"><div className="tib" style={{ background: "#EAF3DE", color: "#3B6D11" }}><i className="ti ti-chart-line"></i></div><div><div className="tn">Desmos — line of best fit</div><div className="td">Collect height–shoe size data. Plot, fit manually, then compare to linear regression. The math core of supervised ML.</div><a href="https://teacher.desmos.com/" className="tl" target="_blank" rel="noopener"><i className="ti ti-external-link"></i> teacher.desmos.com</a></div></div>
        <div className="trow"><div className="tib" style={{ background: "#E6F1FB", color: "#185FA5" }}><i className="ti ti-atom"></i></div><div><div className="tn">PhET — Build a Molecule + Natural Selection</div><div className="td">Building molecules from atomic rules parallels supervised ML training. Natural Selection sim shows genetic algorithm learning.</div><a href="https://phet.colorado.edu/" className="tl" target="_blank" rel="noopener"><i className="ti ti-external-link"></i> phet.colorado.edu</a></div></div>
      </div>
      <div className="subhdr">Build steps — Lesson 3.3</div>
      <div className="g2">
        <div className="box"><h3><i className="ti ti-list-numbers"></i> Design &amp; create</h3><ul className="steps"><li><span className="sn" style={{ background: "#FAEEDA", color: "#854F0B" }}>1</span>Use the Identity Wheel to pick an environmental issue connected to your community.</li><li><span className="sn" style={{ background: "#FAEEDA", color: "#854F0B" }}>2</span>Collect and label 20+ images per class. Quality of labels = quality of model.</li><li><span className="sn" style={{ background: "#FAEEDA", color: "#854F0B" }}>3</span>Train in ML for Kids. If any class is below 80%, add 10 samples and retrain.</li><li><span className="sn" style={{ background: "#FAEEDA", color: "#854F0B" }}>4</span>Connect to Scratch: show alert + confidence score when damage is detected.</li><li><span className="sn" style={{ background: "#FAEEDA", color: "#854F0B" }}>5</span>Test on 10 unseen images. Calculate real-world accuracy. Compare to training accuracy.</li></ul></div>
        <div className="box"><h3><i className="ti ti-zoom-question"></i> Reflect</h3><ul className="steps"><li><span className="sn" style={{ background: "#FAEEDA", color: "#854F0B" }}>R1</span>Training vs. test accuracy gap — what does a large gap mean? This is "overfitting." Why does it matter for real-world AI deployment?</li><li><span className="sn" style={{ background: "#FAEEDA", color: "#854F0B" }}>R2</span>If your training images mostly showed one region's forests, what communities might be harmed by geographic bias?</li><li><span className="sn" style={{ background: "#FAEEDA", color: "#854F0B" }}>R3</span>Physics models are validated against new data (Lesson 5.5). You tested on 10 unseen images. Why does every discipline insist on validation with new data?</li></ul></div>
      </div>
      <div className="subhdr">Cross-disciplinary lessons</div>
      <div className="g3">
        <div className="lc"><div className="lc-top"><span className="sbadge" style={{ background: "#EAF3DE", color: "#27500A" }}>Science</span><span className="gtag gH">High school</span></div><div className="lc-ttl">5.5: Conservation of momentum</div><div className="lc-std">NGSS HS-PS2-2 · Mathematical representations</div><div className="lc-body">Collect collision data with Vernier sensors or CK12 sim. Derive a mathematical model from data — parallels ML: labeled examples → predictions. Validation, iteration, and overfitting all apply.</div></div>
        <div className="lc"><div className="lc-top"><span className="sbadge" style={{ background: "#E6F1FB", color: "#0C447C" }}>Math</span><span className="gtag gH">High school</span></div><div className="lc-ttl">6.4: Line of best fit &amp; regression</div><div className="lc-std">CCSS HSS-ID.B.6 · Scatter plots</div><div className="lc-body">Measure height + shoe size. Plot. Fit manually. Compare to calculator regression. Introduces training vs. test sets and asks: how does dataset size affect generalization?</div></div>
        <div className="lc"><div className="lc-top"><span className="sbadge" style={{ background: "#FBEAF0", color: "#72243E" }}>ELA</span><span className="gtag gE">Elem</span></div><div className="lc-ttl">7.4: Words with multiple meanings</div><div className="lc-std">CCSS L.4.4.A · Context clues</div><div className="lc-body">Board game: match multiple-meaning words to context sentences and picture cards — matching = data labeling, correct card = ground truth, win/lose = reinforcement signal.</div></div>
      </div>
      <div className="dq"><p>In the board game, students are the data labelers. In your climate model, you labeled the training images. Who decides what "deforestation" looks like in the Philippines vs. Brazil — and how might those choices embed cultural assumptions?</p></div>
      <div className="rstrip" style={{ borderColor: "#BA7517", background: "#FAEEDA" }}><p><strong>Book's core question:</strong> If your training images mostly showed one region's forests, how would that limit the model — and who might it harm when deployed in a different geography?</p></div>
    </div>
  )
}

function Kit4() {
  return (
    <div>
      <div className="kit-hero" style={{ background: "#FAECE7", borderColor: "#F0997B" }}>
        <h2 style={{ color: "#4A1B0C" }}>Kit 4 · Natural interaction — how machines understand humans</h2>
        <p style={{ color: "#993C1D" }}>Natural interaction means AI that communicates intuitively. This kit uses GenAI as a creative partner in fashion design, explores commonsense reasoning limits through Earth's geological history, and stages a structured debate on whether AI can ever truly understand human communication.</p>
        <div className="pills"><span className="pill" style={{ background: "#F5C4B3", color: "#4A1B0C" }}>NLP</span><span className="pill" style={{ background: "#F5C4B3", color: "#4A1B0C" }}>Generative AI</span><span className="pill" style={{ background: "#F5C4B3", color: "#4A1B0C" }}>GANs</span><span className="pill" style={{ background: "#F5C4B3", color: "#4A1B0C" }}>Prompt engineering</span><span className="pill" style={{ background: "#F5C4B3", color: "#4A1B0C" }}>Commonsense reasoning</span></div>
      </div>
      <div className="subhdr">Core tools</div>
      <div className="box" style={{ marginBottom: ".9rem" }}>
        <div className="trow"><div className="tib" style={{ background: "#FAECE7", color: "#993C1D" }}><i className="ti ti-sparkles"></i></div><div><div className="tn">ChatGPT — image generation &amp; debate prep</div><div className="td">Generate fashion designs (book shows: Renaissance dress, futuristic blazer, smart sneakers). Also used in Lesson 7.5 to generate debate counterarguments.</div><a href="https://chatgpt.com/" className="tl" target="_blank" rel="noopener"><i className="ti ti-external-link"></i> chatgpt.com</a></div></div>
        <div className="trow"><div className="tib" style={{ background: "#FBEAF0", color: "#993556" }}><i className="ti ti-palette"></i></div><div><div className="tn">Canva AI — text-to-image</div><div className="td">Create cultural holiday posters (Lesson 8.3) or fashion mood boards. Explicitly named in the book's social studies curriculum.</div><a href="https://www.canva.com/" className="tl" target="_blank" rel="noopener"><i className="ti ti-external-link"></i> canva.com</a></div></div>
        <div className="trow"><div className="tib" style={{ background: "#E6F1FB", color: "#185FA5" }}><i className="ti ti-world"></i></div><div><div className="tn">EarthViewer (HHMI Biointeractive)</div><div className="td">4.5 billion years of Earth history. Students reason about geological cause-and-effect — paralleling the challenge AI faces in commonsense reasoning (Lessons 5.6–5.7).</div><a href="https://www.biointeractive.org/" className="tl" target="_blank" rel="noopener"><i className="ti ti-external-link"></i> biointeractive.org</a></div></div>
      </div>
      <div className="subhdr">Build steps — Lesson 3.4</div>
      <div className="g2">
        <div className="box"><h3><i className="ti ti-list-numbers"></i> Design &amp; create</h3><ul className="steps"><li><span className="sn" style={{ background: "#FAECE7", color: "#993C1D" }}>1</span>Define your collection theme (3–5 garments). Research real design trends from one era before prompting.</li><li><span className="sn" style={{ background: "#FAECE7", color: "#993C1D" }}>2</span>Write 5 prompts for the same garment — vary fabric, mood, cultural reference. Compare outputs.</li><li><span className="sn" style={{ background: "#FAECE7", color: "#993C1D" }}>3</span>Identify which prompt elements changed the output most. Document as a design log.</li><li><span className="sn" style={{ background: "#FAECE7", color: "#993C1D" }}>4</span>Build a Scratch style-quiz chatbot: 3 questions → outfit description output.</li><li><span className="sn" style={{ background: "#FAECE7", color: "#993C1D" }}>5</span>Present: original prompt → output → refined prompt → final. Show design log to class.</li></ul></div>
        <div className="box"><h3><i className="ti ti-zoom-question"></i> Reflect</h3><ul className="steps"><li><span className="sn" style={{ background: "#FAECE7", color: "#993C1D" }}>R1</span>Which cultural aesthetics does GenAI default to? Which body types or cultures are absent from its outputs?</li><li><span className="sn" style={{ background: "#FAECE7", color: "#993C1D" }}>R2</span>If a GAN trained primarily on European fashion photography, what would it know — and not know — about global fashion traditions?</li><li><span className="sn" style={{ background: "#FAECE7", color: "#993C1D" }}>R3</span>Does ChatGPT "understand" what makes a design beautiful — or is it producing statistically likely pixel combinations? Is there a meaningful difference?</li></ul></div>
      </div>
      <div className="subhdr">Cross-disciplinary lessons</div>
      <div className="g3">
        <div className="lc"><div className="lc-top"><span className="sbadge" style={{ background: "#EAF3DE", color: "#27500A" }}>Science</span><span className="gtag gH">Elem/HS</span></div><div className="lc-ttl">5.6–5.7: Earth's features &amp; Earth's age</div><div className="lc-std">NGSS 4-ESS2-2 / HS-ESS1-5</div><div className="lc-body">EarthViewer: reason about geological cause-effect across 4.5 billion years. The book notes AI has not yet achieved commonsense reasoning about ill-defined physical problems — students experience this firsthand.</div></div>
        <div className="lc"><div className="lc-top"><span className="sbadge" style={{ background: "#FBEAF0", color: "#72243E" }}>ELA</span><span className="gtag gH">High school</span></div><div className="lc-ttl">7.5: Debating the future of AI</div><div className="lc-std">CCSS SL.11-12.1 · Collaborative discussion</div><div className="lc-body">Two teams debate: "AI can achieve true natural interaction" vs. "AI always lacks human depth." Use Poll Everywhere for opinion polls, ChatGPT for counterarguments, mind-map tools for argument structure.</div></div>
        <div className="lc"><div className="lc-top"><span className="sbadge" style={{ background: "#E6F1FB", color: "#0C447C" }}>Soc. studies</span><span className="gtag gE">Elem</span></div><div className="lc-ttl">8.3: Celebrating together — cultural holidays</div><div className="lc-std">CCSS D2.Civ.7.K-2 · Civic virtues</div><div className="lc-body">Create cultural holiday posters using Canva AI text-to-image. Students analyze what the AI includes and what it misrepresents — NLP + image generation working together.</div></div>
      </div>
      <div className="dq"><p>Your GenAI fashion designs and Canva's holiday posters both take text and produce images. Cultural imagery is deeply meaningful — a mistake can be disrespectful. What responsibilities do AI designers have when systems interact across cultures?</p></div>
      <div className="rstrip" style={{ borderColor: "#D85A30", background: "#FAECE7" }}><p><strong>Book's core question:</strong> How might biases in the training data influence which designs GenAI favors? Whose definition of "fashionable" is baked into the model — and who decided what images to train it on?</p></div>
    </div>
  )
}

function Kit5() {
  return (
    <div>
      <div className="kit-hero" style={{ background: "#E6F1FB", borderColor: "#85B7EB" }}>
        <h2 style={{ color: "#042C53" }}>Kit 5 · Societal impact — how AI shapes the world</h2>
        <p style={{ color: "#185FA5" }}>AI raises ethical and social questions: job displacement, algorithmic bias, privacy, accountability, and the digital divide. This kit builds an autonomous agent in Scratch, interrogates AI's role in genetic engineering, and analyzes how AI affects civic participation and access inequality.</p>
        <div className="pills"><span className="pill" style={{ background: "#B5D4F4", color: "#042C53" }}>Autonomous agents</span><span className="pill" style={{ background: "#B5D4F4", color: "#042C53" }}>Algorithmic bias</span><span className="pill" style={{ background: "#B5D4F4", color: "#042C53" }}>AI ethics</span><span className="pill" style={{ background: "#B5D4F4", color: "#042C53" }}>Digital divide</span><span className="pill" style={{ background: "#B5D4F4", color: "#042C53" }}>Civic AI</span></div>
      </div>
      <div className="subhdr">Core tools</div>
      <div className="box" style={{ marginBottom: ".9rem" }}>
        <div className="trow"><div className="tib" style={{ background: "#E1F5EE", color: "#0F6E56" }}><i className="ti ti-cat"></i></div><div><div className="tn">Scratch — autonomous search-and-rescue agent</div><div className="td">Full step-by-step Scratch code in the book. Build a robot that navigates a maze, detects obstacles, and rescues a target — without human input.</div><a href="https://scratch.mit.edu/" className="tl" target="_blank" rel="noopener"><i className="ti ti-external-link"></i> scratch.mit.edu</a></div></div>
        <div className="trow"><div className="tib" style={{ background: "#FAECE7", color: "#993C1D" }}><i className="ti ti-scale"></i></div><div><div className="tn">MIT Moral Machine</div><div className="td">Play ethical dilemmas. See global variation in decisions. Write 3 ethical rules for your agent — then code at least one.</div><a href="https://www.moralmachine.net/" className="tl" target="_blank" rel="noopener"><i className="ti ti-external-link"></i> moralmachine.net</a></div></div>
        <div className="trow"><div className="tib" style={{ background: "#EEEDFE", color: "#534AB7" }}><i className="ti ti-messages"></i></div><div><div className="tn">ChatGPT — counterargument stress-test</div><div className="td">Explicitly used in Lesson 7.5 for ethics debates. Prompt it to argue against your agent's design decisions — then revise in response to the best counterarguments.</div><a href="https://chatgpt.com/" className="tl" target="_blank" rel="noopener"><i className="ti ti-external-link"></i> chatgpt.com</a></div></div>
      </div>
      <div className="subhdr">Build steps — Lesson 3.5</div>
      <div className="g2">
        <div className="box"><h3><i className="ti ti-list-numbers"></i> Design &amp; create</h3><ul className="steps"><li><span className="sn" style={{ background: "#E6F1FB", color: "#185FA5" }}>1</span>Scratch: new project, delete cat, build maze backdrop with obstacles and rescue target sprite.</li><li><span className="sn" style={{ background: "#E6F1FB", color: "#185FA5" }}>2</span>Add robot sprite. Verify basic movement with arrow keys before automating.</li><li><span className="sn" style={{ background: "#E6F1FB", color: "#185FA5" }}>3</span>Collision detection: touching obstacle → stop. Touching target → broadcast "rescued."</li><li><span className="sn" style={{ background: "#E6F1FB", color: "#185FA5" }}>4</span>Make it autonomous: remove human controls. Add random movement + wall-avoidance loop.</li><li><span className="sn" style={{ background: "#E6F1FB", color: "#185FA5" }}>5</span>Play Moral Machine. Write 3 ethical rules. Code at least one. Use ChatGPT to argue against your rules — revise if compelling.</li></ul></div>
        <div className="box"><h3><i className="ti ti-zoom-question"></i> Reflect</h3><ul className="steps"><li><span className="sn" style={{ background: "#E6F1FB", color: "#185FA5" }}>R1</span>Your agent made a mistake and harmed a rescue target. Who is responsible — coder, deployer, or algorithm? How does the answer change depending on how much testing was done?</li><li><span className="sn" style={{ background: "#E6F1FB", color: "#185FA5" }}>R2</span>What tasks in a real rescue scenario should always require a human — and why? What is lost when we remove human judgment from high-stakes decisions?</li><li><span className="sn" style={{ background: "#E6F1FB", color: "#185FA5" }}>R3</span>If autonomous rescue agents were only deployed in wealthy neighborhoods due to infrastructure costs, how would that compound existing inequality?</li></ul></div>
      </div>
      <div className="subhdr">Cross-disciplinary lessons</div>
      <div className="g3">
        <div className="lc"><div className="lc-top"><span className="sbadge" style={{ background: "#EAF3DE", color: "#27500A" }}>Science</span><span className="gtag gH">High school</span></div><div className="lc-ttl">5.8: Genetic engineering &amp; AI-augmented breeding</div><div className="lc-std">NGSS HS-LS4-2 · Natural selection</div><div className="lc-body">Analyze genetic variation datasets. Discuss AI's role in selective breeding and gene editing — visualizing allele frequency changes and evaluating ethical implications of AI-directed evolution.</div></div>
        <div className="lc"><div className="lc-top"><span className="sbadge" style={{ background: "#E6F1FB", color: "#0C447C" }}>Soc. studies</span><span className="gtag gH">High school</span></div><div className="lc-ttl">8.4: Political parties &amp; AI voter registration</div><div className="lc-std">CCSS D2.Civ standards</div><div className="lc-body">Interact with an AI chatbot simulating voters from diverse backgrounds. Analyze what it gets right and wrong about voter motivation — and what ethical guardrails are needed when AI enters civic contexts.</div></div>
        <div className="lc"><div className="lc-top"><span className="sbadge" style={{ background: "#E6F1FB", color: "#0C447C" }}>Soc. studies</span><span className="gtag gH">High school</span></div><div className="lc-ttl">8.5: Bridging the gap — AI &amp; the digital divide</div><div className="lc-std">Economics · Marginal costs &amp; benefits</div><div className="lc-body">Analyze NTIA, US Census, and Pew Research data on the Digital Divide. Calculate marginal costs and benefits of AI-powered educational tools — who gains access, and who is excluded?</div></div>
      </div>
      <div className="dq"><p>Your rescue agent, an AI voter chatbot, and an AI genetic selection tool all act without direct human control at the moment of action. In each case: who should have veto power — and how would that veto actually work in practice?</p></div>
      <div className="rstrip" style={{ borderColor: "#378ADD", background: "#E6F1FB" }}><p><strong>Book's core question:</strong> If your rescue robot made a mistake that harmed someone, who is responsible — the coder, the deployer, or the algorithm? How does your answer change when the AI is deployed by a government vs. a private company?</p></div>
    </div>
  )
}
