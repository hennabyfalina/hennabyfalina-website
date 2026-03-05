# Advanced AI Henna Design Studio - Implementation Plan

## 1. Architecture Overview

To achieve "Real Functionality" without completely rewriting the existing vanilla HTML/CSS/JS codebase into React/Next.js immediately, we will build a **Hybrid Architecture**:

*   **Frontend**: Modern Vanilla JavaScript (ES6+) using Web Components principles.
    *   **AR Engine**: Google MediaPipe Hands (Client-side, real-time, zero latency).
    *   **Rendering**: HTML5 Canvas for image compositing and warping.
    *   **State Management**: Simple reactive state store for UI modes.
*   **Backend**: Node.js (Express).
    *   **AI Orchestrator**: Acts as a secure proxy to Generative AI APIs (OpenAI DALL-E 3, Stability AI, or Midjourney via API).
    *   **Auth**: Simple JWT-based session management for the "Guest/Trial" flow.

## 2. Feature Implementation Details

### A. AR Try-On (Real-Time Hand Tracking)
**Technology**: MediaPipe Hands (Google) + HTML5 Canvas.
**Logic**:
1.  **Input**: Webcam feed.
2.  **Detection**: MediaPipe detects 21 hand landmarks (knuckles, fingertips, wrist).
3.  **Warping**:
    *   Calculate the "Hand Plane" using the wrist, index MCP, and pinky MCP.
    *   Use an Affine Transform or Homography to map the 2D henna texture onto the 3D-projected hand surface.
    *   **Masking**: Use the segmentation mask provided by MediaPipe to ensure henna doesn't "spill" onto the background.
4.  **Lighting**: Adjust brightness of the overlay based on the average pixel intensity of the hand skin.

### B. AI Henna Generator (Real Output)
**Technology**: Node.js Proxy -> Stable Diffusion XL (via API) or OpenAI DALL-E 3.
**Workflow**:
1.  **User Input**: Style (e.g., "Rajasthani"), Complexity (Slider), Elements (e.g., "Peacock").
2.  **Prompt Engineering**: Backend converts inputs into a rich prompt:
    *   *Example*: "Professional henna design, Rajasthani style, intricate peacock motif, fine lines, high contrast, black ink on white background, 4k resolution, vector style."
3.  **Processing**: API generates image.
4.  **Post-Processing**: Backend removes background (using `rembg` or similar) to make it a transparent stencil.
5.  **Delivery**: Image sent to frontend for AR placement.

### C. Style Transfer
**Technology**: ControlNet (via API) or TensorFlow.js (Client-side style transfer for lower quality, Server-side for high quality).
**Logic**:
1.  User uploads photo of their hand or a pattern.
2.  **Canny Edge Detection**: Extracts the outlines.
3.  **Style Injection**: Applies "Henna" texture and style to the outlines.

### D. UX Flow (Onboarding)
1.  **Trigger**: User clicks "Launch Studio".
2.  **Step 1: Auth Modal**: "Sign in with Google" or "Continue as Guest".
3.  **Step 2: Guide Modal**: Carousel of 3 slides explaining AR, AI, and Tools.
4.  **Step 3: Action**: Button "Enter Studio" opens `/studio.html` (New Tab) to maximize performance and screen real estate.

## 3. Technical Steps & Code Structure

### Step 1: Dependencies (Frontend)
Add to `index.html`:
```html
<!-- MediaPipe -->
<script src="https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/@mediapipe/control_utils/control_utils.js" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/@mediapipe/drawing_utils/drawing_utils.js" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.js" crossorigin="anonymous"></script>
```

### Step 2: Backend API (`server.js`)
*   `/api/auth/guest`: Generate temporary token.
*   `/api/generate`: Endpoint for AI generation.
*   `/api/process-image`: Endpoint for background removal/style transfer.

### Step 3: Studio Logic (`studio.js`)
*   **Class `ARManager`**: Handles Camera and MediaPipe.
*   **Class `AIManager`**: Handles API calls and image processing.
*   **Class `UIManager`**: Handles the Onboarding flow and Theme toggles.

## 4. Theme & UI Fixes
*   **CSS Variables**: Redefine `--color-text-primary`, `--color-bg-elevated` to ensure contrast ratios > 4.5:1.
*   **Components**: Force specific background/text colors for Inputs and Selects to avoid browser default inconsistencies in Dark Mode.

## 5. Future/Bonus Features
*   **Smart Symmetry**: Canvas drawing context `scale(-1, 1)` for mirroring.
*   **3D Hand Preview**: Use `Three.js` to map the texture onto a generic 3D hand model if camera is unavailable.
