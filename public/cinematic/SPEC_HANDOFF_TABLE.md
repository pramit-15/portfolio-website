# lets-scroll Production Handoff & Asset Verification Spec

Art Direction: **Neon Night / Stealth AI Lab** (#28282B canvas, #89CFF0 cyan neon)  
Camera Style: **Architecture A — One Continuous Walkthrough** (Single continuous forward take)  
Source Format: **16:9 Landscape, 1280×720, H.264/MP4, 24 fps**  
Delivery Format: **audio-free H.264/MP4, 2.8 Mbps target bitrate, GOP 4, faststart**

---

### Phase 1: Scene Stills (3:2 Landscape, 2528x1696px, solid #28282B background)

| Prompt File | Scene Name | Key Subject | Output File | Status |
| :--- | :--- | :--- | :--- | :--- |
| `public/cinematic/prompts/still_0_intake.txt` | Scene 0: Intake Bay | Multi-channel data ingestion & holographic OCR chamber | `public/cinematic/vid/still_0.png` | ✓ Verified (2528x1696) |
| `public/cinematic/prompts/still_1_langgraph.txt` | Scene 1: LangGraph Chamber | 8-node stateful agent router & failover towers | `public/cinematic/vid/still_1.png` | ✓ Verified (2528x1696) |
| `public/cinematic/prompts/still_2_clinical_ml.txt` | Scene 2: Clinical ML Lab | Stacked ensemble chambers & SHAP waterfall displays | `public/cinematic/vid/still_2.png` | ✓ Verified (2528x1696) |
| `public/cinematic/prompts/still_3_terminal.txt` | Scene 3: Recruiter Terminal | Executive AI terminal, live telemetry & credential HUD | `public/cinematic/vid/still_3.png` | ✓ Verified (2528x1696) |

---

### Phase 2: Sequential Walkthrough Legs (Architecture A — Seamless Forward Take)

> **The Seam Rule for Architecture A**: Leg 0 starts from `still_0.png`. Each subsequent leg uses the **ACTUAL last frame** of the previous rendered video as its `--start-image`. No `--end-image` is used, guaranteeing that the camera never reverses across seams!

| Prompt File | Start Frame / Conditioning | Camera Move | Output Video | Status |
| :--- | :--- | :--- | :--- | :--- |
| `leg_0_intake_glide.txt` | `still_0.png` | Forward glide into intake bay toward gateway | `public/cinematic/vid/leg_0-optimized.mp4` | ✓ Verified (1280×720, 10.00s, 3.4MB) |
| `leg_1_langgraph_walkthrough.txt` | `leg_0_last.png` (from `leg_0.mp4`) | Continuous glide into 8-node LangGraph router | `public/cinematic/vid/leg_1-optimized.mp4` | ✓ Verified (1280×720, 20.00s, 6.9MB) |
| `leg_2_clinical_ml_walkthrough.txt` | `leg_1_last.png` (from `leg_1.mp4`) | Continuous glide into Clinical ML & SHAP lab | `public/cinematic/vid/leg_2-optimized.mp4` | ✓ Verified (1280×720, 30.00s, 10.4MB) |
| `leg_3_terminal_finale.txt` | `leg_2_last.png` (from `leg_2.mp4`) | Push-in toward central Recruiter AI console | `public/cinematic/vid/leg_3-optimized.mp4` | ✓ Verified (1280×720, 30.00s, 10.6MB) |

---

### Verification Summary
- All 4 high-resolution stills (2528x1696) are loaded into the scrub engine as instant posters.
- The site fetches only the active clip and its adjacent clips as in-memory Blobs, keeping scroll seeking smooth without loading the entire film at startup.
- Auto Flight mode enabled for hands-free cinematic playback.
