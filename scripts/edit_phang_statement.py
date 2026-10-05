"""Geo meeting revision (2026-10-04): remove one spoken statement from the Dr. Phang film.

Geo asked to remove the narration line saying Dr. Phang "unexpectedly passed away this year".
Nothing else changes: same source, framing, watermark/timecode, music bed and end card.

Source: Dr_Phang_Scholarship_01m00s-02m00s.mp4 (approved asset package; covers 01:00-02:00 of the
film). Narration around the edit (seconds in that file, from a Whisper + VAD pass):

    48.25-49.96  "physician Dr. Christopher Phang."
    50.33-51.24  "Dr. Phang,"
    51.52-54.15  "born October 7, 1968,"
    54.49-56.62  "unexpectedly passed away this year."   <- removed
    57.12-58.31  "He was not just a doctor."

The cut joins the natural pause after "1968" (54.15-54.49) to the pause before "He was"
(56.62-57.12). A 0.24 s equal-power audio crossfade and a matching 0.24 s video dissolve hide the
join; the picture there is the static end card, so the dissolve is invisible. The result reads:
"Dr. Phang, born October 7, 1968. He was not just a doctor."

Outputs (new filenames so no cached copy of the old cut is ever served):
  public/media/scholarship/dr-phang-film.mp4      full film for /scholarship/dr-christopher-a-phang
  public/media/scholarship/dr-phang-excerpt.mp4   homepage excerpt: 01:19 -> end, fades 0.9 s in / 1.75 s out
Both come from the same edit, so the homepage and the scholarship page always match.

Usage: python3 scripts/edit_phang_statement.py <path to Dr_Phang_Scholarship_01m00s-02m00s.mp4>
"""
import subprocess
import sys
from pathlib import Path

SRC = Path(sys.argv[1])
OUT = Path(__file__).resolve().parent.parent / "public" / "media" / "scholarship"

CUT_OUT, CUT_IN, XF = 54.32, 56.87, 0.24  # remove CUT_OUT..CUT_IN; dissolve XF centred on the join
A_END = CUT_OUT + XF / 2  # part 1 ends here (still inside the pause after "1968")
B_START = CUT_IN - XF / 2  # part 2 starts here (still inside the pause before "He was")
END = 60.0
ENC = ["-c:v", "libx264", "-preset", "slow", "-crf", "21", "-maxrate", "2200k", "-bufsize", "4400k",
       "-profile:v", "high", "-level", "4.0", "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "128k",
       "-movflags", "+faststart"]


def render(start: float, name: str, fade_in: float = 0.0, fade_out: float = 0.0) -> None:
    d1 = A_END - start
    total = d1 + (END - B_START) - XF
    fades_v = fades_a = ""
    if fade_in:
        fades_v += f",fade=t=in:st=0:d={fade_in}"
        fades_a += f",afade=t=in:st=0:d={fade_in}"
    if fade_out:
        fades_v += f",fade=t=out:st={total - fade_out:.3f}:d={fade_out}"
        fades_a += f",afade=t=out:st={total - fade_out:.3f}:d={fade_out}"
    graph = (
        f"[0:v]trim=start={start}:end={A_END},setpts=PTS-STARTPTS[v1];"
        f"[0:v]trim=start={B_START}:end={END},setpts=PTS-STARTPTS[v2];"
        f"[v1][v2]xfade=transition=fade:duration={XF}:offset={d1 - XF:.3f}{fades_v}[v];"
        f"[0:a]atrim=start={start}:end={A_END},asetpts=PTS-STARTPTS[a1];"
        f"[0:a]atrim=start={B_START}:end={END},asetpts=PTS-STARTPTS[a2];"
        f"[a1][a2]acrossfade=d={XF}:c1=qsin:c2=qsin{fades_a}[a]"
    )
    subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", str(SRC), "-filter_complex", graph,
                    "-map", "[v]", "-map", "[a]", *ENC, str(OUT / name)], check=True)
    print(name, f"{total:.2f} s")


render(0.0, "dr-phang-film.mp4")
render(19.0, "dr-phang-excerpt.mp4", fade_in=0.9, fade_out=1.75)
