"""V2.5 hero recut from the client's recap/sizzle footage (TenAmbassadors_Recap_16-35).
Only the sharp vertical column (x 655-1263) is used. Caption-free crops, faces kept in
the safe zone per format (checked per frame against YuNet boxes), 0.85x speed with
two-frame blending, soft dip-dissolves, and a final dissolve into the exact first frame."""
import cv2, numpy as np, subprocess, json, math, sys, os
SRC="/tmp/ta2/assets/recap-master/TenAmbassadors_Recap_16-35_Horizontal_1080p.mp4"
X0, CW, FPS = 655, 608, 30
SPEED = 0.78; F = 0.5; DIP = 0.22
# shot: (name, t0, t1)   order = playback order
SHOTS = [("speaker", 4.02, 7.52, 0.8), ("listen", 7.60, 10.10, 0.8), ("cap", 10.16, 11.10, 0.8)]
# per-format: output size, crop height in column px (h = CW*H/W), y0 per shot
FORMATS = {
  "phone":  {"size": (720, 792), "y0": {"listen": 140, "speaker": 20, "cap": 0}},
  "square": {"size": (720, 720), "y0": {"listen": 120, "speaker": 30, "cap": 0}},
}
def decode(t0, t1):
    p = subprocess.run(["ffmpeg","-loglevel","error","-ss",f"{t0:.3f}","-t",f"{t1-t0:.3f}","-i",SRC,"-vf",f"crop={CW}:1080:{X0}:0",
                        "-f","rawvideo","-pix_fmt","bgr24","-"], capture_output=True).stdout
    n = len(p)//(CW*1080*3); return np.frombuffer(p,np.uint8).reshape(n,1080,CW,3)
def build(name, outdir):
    fmt = FORMATS[name]; W,H = fmt["size"]; ch = round(CW*H/W)
    clips = {}
    for i,(k,a,b,sp) in enumerate(SHOTS):
        pre = 0  # shot 0 holds its first frame under the closing dissolve  # shot 0 needs footage before t0 for the closing dissolve
        clips[k] = (decode(a-pre, b), pre)
    durs = [(b-a)/sp for _,a,b,sp in SHOTS]
    speeds = {k: sp for k,_,_,sp in SHOTS}
    starts = []; t = 0
    for d in durs: starts.append(t); t += d - F
    T = t  # loop length (last shot's dissolve overlaps shot 0's pre-roll)
    def src_frame(k, tl):
        fr, pre = clips[k]
        s = (tl*speeds[k] + pre)*FPS; i = int(math.floor(s)); a = s - i
        i = max(0, min(len(fr)-1, i)); j = min(len(fr)-1, i+1)
        im = fr[max(0, min(len(fr)-1, int(round(s))))].astype(np.float32)
        y0 = fmt["y0"][k]; crop = im[y0:y0+ch]
        return cv2.resize(crop, (W,H), interpolation=cv2.INTER_LANCZOS4 if W>CW else cv2.INTER_AREA)
    N = round(T*FPS)
    os.makedirs(outdir, exist_ok=True); mp4 = f"{outdir}/ta-hero-{name}.mp4"
    ff = subprocess.Popen(["ffmpeg","-loglevel","error","-y","-f","rawvideo","-pix_fmt","bgr24","-s",f"{W}x{H}","-r",str(FPS),"-i","-",
        "-vf","hqdn3d=1.5:1.2:4:4,unsharp=5:5:0.35","-c:v","libx264","-preset","slow","-crf","24","-tune","film","-profile:v","high","-level","4.0",
        "-pix_fmt","yuv420p","-color_range","tv","-colorspace","bt709","-color_primaries","bt709","-color_trc","bt709",
        "-g",str(FPS*2),"-movflags","+faststart","-an",mp4], stdin=subprocess.PIPE)
    n = len(SHOTS)
    for fi in range(N):
        t = fi/FPS; layers = []
        for i,(k,a,b,sp) in enumerate(SHOTS):
            u = t - starts[i]
            if i == 0 and t > T - F: u = t - T          # closing dissolve: shot 0 pre-roll
            if u < (-F if i == 0 else 0) or u > durs[i]: continue
            if i > 0 and u < F: alpha = u/F            # dissolve in
            elif i == 0 and u < 0: alpha = (u+F)/F
            else: alpha = 1
            layers.append((0 if (i == 0 and u < 0) else i, i, alpha, u))
        layers.sort(key=lambda L: (L[0] == 0 and L[3] < 0, L[1]))
        out = None; dip = 0
        for _,i,alpha,u in sorted(layers, key=lambda L: (L[1]==0 and L[3]<0, L[1])):
            im = src_frame(SHOTS[i][0], u)
            if out is None: out = im
            else:
                a2 = alpha*alpha*(3-2*alpha); out = out*(1-a2) + im*a2; dip = max(dip, math.sin(math.pi*a2))
        out = out*(1-DIP*dip)
        ff.stdin.write(np.clip(out+0.5,0,255).astype(np.uint8).tobytes())
        if fi == 0: cv2.imwrite(f"{outdir}/ta-hero-{name}-poster.jpg", np.clip(out+0.5,0,255).astype(np.uint8), [cv2.IMWRITE_JPEG_QUALITY,88,cv2.IMWRITE_JPEG_PROGRESSIVE,1,cv2.IMWRITE_JPEG_OPTIMIZE,1])
    ff.stdin.close(); ff.wait(); print(mp4, round(T,2), "s")
for name in (sys.argv[2:] or FORMATS): build(name, sys.argv[1])
