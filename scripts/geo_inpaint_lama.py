"""
Object removal used for Geo's requested photo cleanups (2026-10-02).

Big-LaMa inpainting (TorchScript build from github.com/Sanster/models, big-lama.pt;
not committed — ~200 MB). Only pixels inside the hand-drawn mask are replaced;
the result is composited back over the untouched original with a 2 px feather,
so every pixel outside the mask is byte-identical to the source.

Used for: 010-AllseeinJah.com (13 of 639) — the two drinks (glasses, straw and
their table reflections) removed. People were never masked except where a
glass overlapped a fingertip edge.

  pip install torch pillow numpy
  inpaint(img, mask, box) -> PIL.Image
"""
import numpy as np, torch, sys
from PIL import Image, ImageDraw, ImageFilter
torch.set_num_threads(2)
model=torch.jit.load('/tmp/claude-0/lama/big-lama.pt',map_location='cpu').eval()
def inpaint(img, mask, box, dilate=7):
    """img: PIL RGB full; mask: PIL L full (255=remove); box: crop region to process."""
    x0,y0,x1,y1=box
    m=mask.filter(ImageFilter.MaxFilter(dilate)) if dilate else mask
    ci=np.asarray(img.crop(box)).astype(np.float32)/255.; cm=(np.asarray(m.crop(box))>127).astype(np.float32)
    h,w=cm.shape; H=(h+7)//8*8; W=(w+7)//8*8
    ci=np.pad(ci,((0,H-h),(0,W-w),(0,0)),mode='symmetric'); cm=np.pad(cm,((0,H-h),(0,W-w)),mode='symmetric')
    t=torch.from_numpy(ci).permute(2,0,1)[None]; tm=torch.from_numpy(cm)[None,None]
    with torch.no_grad(): out=model(t,tm)[0].permute(1,2,0).numpy()
    out=np.clip(out*255,0,255).astype(np.uint8)[:h,:w]
    res=img.copy(); patch=Image.fromarray(out)
    # composite only inside (feathered) mask so every other pixel is untouched
    feather=m.crop(box).filter(ImageFilter.GaussianBlur(2))
    base=img.crop(box); base.paste(patch,(0,0),feather)
    res.paste(base,(x0,y0)); return res
