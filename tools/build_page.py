"""Build index.html: tools/page_template.html + the annotation-quality and benchmark fragments in tools/fragments/."""
import os
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
T = os.path.join(ROOT, "tools")
tpl = open(os.path.join(T, "page_template.html")).read()
html = (tpl.replace("{{QUALITY}}", open(os.path.join(T, "fragments", "quality.html")).read())
           .replace("{{TABLES}}", open(os.path.join(T, "fragments", "benchmark_tables.html")).read()))
open(os.path.join(ROOT, "index.html"), "w").write(html)
print("index.html", len(html), "bytes")
