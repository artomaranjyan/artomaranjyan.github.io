"""Version stylesheet URLs using the final CSS bytes, after PurgeCSS runs."""

import hashlib
import re
import sys
from pathlib import Path


site = Path(sys.argv[1] if len(sys.argv) > 1 else "_site")
versions = {
    f"/assets/css/{css.name}": hashlib.sha256(css.read_bytes()).hexdigest()[:16]
    for css in (site / "assets/css").glob("*.css")
}
if not versions:
    raise SystemExit(f"No built stylesheets found in {site / 'assets/css'}")

stylesheet_href = re.compile(
    r"(?P<attribute>\bhref\s*=\s*)(?P<quote>[\"'])"
    r"(?P<path>/(?!/)[^\"'?#]*assets/css/[^\"'?#]+\.css)"
    r"(?:\?[^\"'#]*)?(?P<fragment>\#[^\"']*)?(?P=quote)"
)


def fingerprint(match):
    path = match["path"]
    asset = "/assets/css/" + path.rsplit("/assets/css/", 1)[-1]
    if asset not in versions:
        return match[0]
    url = f"{path}?{versions[asset]}{match['fragment'] or ''}"
    return f"{match['attribute']}{match['quote']}{url}{match['quote']}"


for html in site.rglob("*.html"):
    original = html.read_text(encoding="utf-8")
    updated = stylesheet_href.sub(fingerprint, original)
    if updated != original:
        html.write_text(updated, encoding="utf-8")
