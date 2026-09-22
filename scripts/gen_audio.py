"""lines.txt의 각 문장을 Kokoro로 mp3 생성. 파일명은 슬러그(JS와 동일 규칙)."""
import re, sys
from pathlib import Path
import soundfile as sf
from kokoro import KPipeline

SRC = Path(sys.argv[1])
OUT = Path(sys.argv[2])
OUT.mkdir(parents=True, exist_ok=True)

def slug(t):
    return re.sub(r'[^a-z0-9]+', '_', t.lower()).strip('_')[:80]

lines = [l.strip() for l in SRC.read_text(encoding='utf-8').splitlines() if l.strip()]
names = [slug(l) for l in lines]
assert len(set(names)) == len(names), "슬러그 충돌: " + str([n for n in names if names.count(n) > 1][:3])

pipeline = KPipeline(lang_code="a", repo_id="hexgrad/Kokoro-82M")
for i, (text, name) in enumerate(zip(lines, names), 1):
    target = OUT / f"{name}.mp3"
    if target.exists():
        continue
    result = next(iter(pipeline(text, voice="af_heart", speed=0.9)))
    sf.write(target, result.audio, 24_000, subtype="MPEG_LAYER_III")
    if i % 10 == 0:
        print(f"{i}/{len(lines)}", flush=True)
print(f"done {len(list(OUT.glob('*.mp3')))} files")
