#!/usr/bin/env python3
"""Build the single-file Wenlan reading workbench."""
from pathlib import Path

ROOT = Path(__file__).resolve().parent
SRC = ROOT / "src"
PDFJS = Path(r"C:\Users\xwdz\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\node_modules\pdfjs-dist\build")

template = (SRC / "template.html").read_text(encoding="utf-8")
css = (SRC / "styles.css").read_text(encoding="utf-8")
demo = (SRC / "demo.js").read_text(encoding="utf-8")
app = (SRC / "app.js").read_text(encoding="utf-8")
pdfjs = (PDFJS / "pdf.min.mjs").read_text(encoding="utf-8")
worker = (PDFJS / "pdf.worker.min.mjs").read_text(encoding="utf-8")

for label, text in [("demo", demo), ("app", app), ("pdfjs", pdfjs), ("worker", worker)]:
    if "</script" in text.lower():
        raise SystemExit(f"{label} contains a literal closing script tag; refusing to build")

html = template
html = html.replace("/*__WENLAN_CSS__*/", css)
html = html.replace("/*__DEMO_SOURCE__*/", demo)
html = html.replace("/*__APP_SOURCE__*/", app)
html = html.replace("/*__PDFJS_SOURCE__*/", pdfjs)
html = html.replace("/*__PDFWORKER_SOURCE__*/", worker)

out = ROOT / "index.html"
out.write_text(html, encoding="utf-8")
print(f"Wrote {out} ({out.stat().st_size:,} bytes)")
