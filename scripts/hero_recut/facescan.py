import cv2, numpy as np, subprocess, json
F="/tmp/ta2/assets/recap-master/TenAmbassadors_Recap_16-35_Horizontal_1080p.mp4"
X0=655; CW=608
det=cv2.FaceDetectorYN.create("/tmp/vr/yunet.onnx","",(CW,1080),0.6,0.3,50)
SHOTS={"speaker":(4.0,7.55),"listen":(7.58,10.12),"contact":(11.15,12.32),"mc":(12.35,13.15),"blazer":(16.52,17.32),"listen0":(1.95,3.98),"suit":(13.2,14.1),"shirt":(14.15,15.08)}
out={}
for k,(a,b) in SHOTS.items():
    p=subprocess.run(["ffmpeg","-loglevel","error","-ss",str(a),"-t",str(b-a),"-i",F,"-vf",f"crop={CW}:1080:{X0}:0,fps=6","-f","rawvideo","-pix_fmt","bgr24","-"],capture_output=True).stdout
    n=len(p)//(CW*1080*3); fr=np.frombuffer(p,np.uint8).reshape(n,1080,CW,3)
    boxes=[]
    for im in fr:
        _,f=det.detect(im)
        boxes.append([[int(v) for v in x[:4]]+[round(float(x[-1]),2)] for x in (f if f is not None else []) if x[-1]>0.75])
    # union per shot of significant faces
    allb=[b for fb in boxes for b in fb if b[2]>40]
    if allb:
        xs=[b[0] for b in allb]; ys=[b[1] for b in allb]; xe=[b[0]+b[2] for b in allb]; ye=[b[1]+b[3] for b in allb]
        print(k, n, "faces y", min(ys), max(ye), "x", min(xs), max(xe), "per-frame counts", [len(x) for x in boxes])
    out[k]=boxes
json.dump(out,open('/tmp/vr/rv/faces.json','w'))
