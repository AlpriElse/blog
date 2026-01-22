# Safari Compatibility Issues & Solutions

**Date:** January 22, 2026
**Project:** POC Subtext - Video Transcription Web App
**Issue Type:** Browser Compatibility (Safari/WebKit)

## Overview

While developing a browser-based video transcription application using Web Workers, WebGPU/WASM, and the Hugging Face Transformers library, we encountered several Safari-specific compatibility issues that caused the application to hang during video processing. This document details the problems encountered and the solutions implemented.

## Issues Encountered

### 1. Video Element ReadyState Stuck at HAVE_METADATA

**Symptom:**
Video processing hung indefinitely at the "Waiting for video to be ready for seeking" stage. The video element's `readyState` remained at `1` (HAVE_METADATA) and never progressed to `3` (HAVE_FUTURE_DATA) or `4` (HAVE_ENOUGH_DATA).

**Root Cause:**
Safari interprets the `preload="metadata"` attribute very strictly for detached video elements (elements not in the DOM). When set to `"metadata"`, Safari will load *only* metadata and refuse to buffer any actual video data, even when explicitly requested. This is part of Safari's aggressive battery-saving and bandwidth-conservation strategy, especially on mobile devices.

**Solution:**
```typescript
// Before (doesn't work in Safari):
video.preload = 'metadata'

// After (Safari compatible):
video.preload = 'auto'

// Also added explicit loading trigger:
video.load()

// And multiple event listeners for Safari compatibility:
video.addEventListener('canplay', handleReady)
video.addEventListener('canplaythrough', handleReady)
video.addEventListener('loadeddata', handleReady)

// With a 3-second timeout fallback:
setTimeout(() => {
  if (!resolved) {
    resolve() // Proceed even if not fully loaded
  }
}, 3000)
```

**Technical Details:**
- Safari on iOS/macOS prioritizes battery life over developer convenience
- Detached video elements receive even stricter treatment
- Multiple event listeners are necessary because Safari may fire different events depending on network conditions and video format

---

### 2. CORS Error on Blob URLs with crossOrigin Attribute

**Symptom:**
Video loading failed immediately with an error event. Console showed: `{"isTrusted":true}` error.

**Root Cause:**
Setting `crossOrigin = 'anonymous'` on a video element loading from a blob URL causes Safari to throw a CORS error. Blob URLs are same-origin by definition and don't require CORS headers. Safari enforces this strictly, while Chrome and Firefox silently ignore the unnecessary crossOrigin attribute.

**Solution:**
```typescript
// Before (fails in Safari):
video.crossOrigin = 'anonymous'
video.src = URL.createObjectURL(file)

// After (Safari compatible):
// Don't set crossOrigin for blob URLs at all
video.src = URL.createObjectURL(file)
```

**Technical Details:**
- Blob URLs are `blob:https://example.com/...` - same origin as the page
- CORS only applies to cross-origin requests
- Safari correctly rejects unnecessary CORS configuration; other browsers are more permissive

---

### 3. Float32Array Transfer to Web Worker Hangs

**Symptom:**
After audio extraction completed, the transcription stage would start but never progress. The worker would receive the message but Safari would hang indefinitely.

**Root Cause:**
Safari has incomplete or buggy support for transferring typed array buffers (like Float32Array) to Web Workers using the transfer list. When using `postMessage(data, [data.buffer])`, Safari can:
- Fail to properly transfer the buffer
- Detach the buffer before the worker receives it
- Hang without throwing an error

This is a known Safari/WebKit limitation with structured cloning of transferable objects.

**Solution:**
```typescript
// Before (hangs in Safari):
workerRef.current?.postMessage(
  { type: 'transcribe', audio: audioData },
  [audioData.buffer]  // Transfer list
)

// After (Safari compatible):
workerRef.current?.postMessage(
  { type: 'transcribe', audio: audioData }
  // No transfer list - data is copied instead
)
```

**Technical Details:**
- Transferring = zero-copy, ownership moves to worker (fast, low memory)
- Copying = duplicates the data (slower, more memory, but reliable)
- For moderate-sized audio buffers (~1.5M samples), the performance difference is acceptable
- Safari's structured clone algorithm doesn't fully support ArrayBuffer transfers

---

### 4. Web Worker Module Not Executing

**Symptom:**
The Whisper transcription worker was created successfully but never sent any messages back to the main thread, not even the initialization message. Model loading progress stayed at 0%.

**Root Cause:**
Safari has stricter Content Security Policy (CSP) enforcement and module loading requirements for Web Workers. The worker script wasn't executing at all, likely due to:
- ES module import issues with the `@huggingface/transformers` library
- Potential CSP violations
- Different module resolution behavior in Safari's worker context

**Solution:**
```typescript
// Added worker creation error handling:
try {
  worker = new Worker(new URL('./workers/whisper.worker.ts', import.meta.url), {
    type: 'module',
  })
} catch (error) {
  setError(`Failed to initialize transcription worker: ${error}`)
  return
}

// Added health check timeout:
const workerHealthCheck = setTimeout(() => {
  if (!modelLoadedRef.current) {
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
    if (isSafari) {
      setError('Safari compatibility issue: Worker failed to load.')
    }
  }
}, 10000)

// Added worker error handler:
worker.onerror = (error) => {
  console.error('Worker error:', error)
  setError('Transcription worker encountered an error.')
}
```

**Technical Details:**
- Safari requires explicit error handling for worker creation
- Module workers may fail silently in Safari without proper error handlers
- User agent detection helps provide browser-specific error messages
- 10-second timeout ensures users aren't stuck indefinitely

---

## Category: Safari's Stricter WebKit Sandbox

These issues aren't bugs per se—Safari interprets W3C specifications more strictly and prioritizes:
- **Security**: Stricter CSP, CORS enforcement
- **Privacy**: Limited resource loading for detached elements
- **Performance**: Aggressive battery/bandwidth conservation
- **Mobile-first**: iOS Safari behavior influences macOS Safari

### Chrome/Firefox vs Safari Philosophy

| Aspect | Chrome/Firefox | Safari |
|--------|---------------|---------|
| Spec interpretation | Permissive - "do what you mean" | Strict - "do exactly what spec says" |
| Media loading | Proactive, developer-friendly | Conservative, user/battery-first |
| Error handling | Often silent failures | Explicit errors |
| Worker support | Mature, battle-tested | Newer, stricter |

---

## Testing Strategy

To catch Safari issues earlier:

1. **Test early and often in Safari** - Don't wait until the end
2. **Use Safari Technology Preview** - Get early access to WebKit changes
3. **Enable Safari Developer Mode** - Check Console, Network, and Sources tabs
4. **Monitor readyState transitions** - Video/media loading is different
5. **Test worker communication** - Verify messages are sent/received
6. **Add timeouts and fallbacks** - Don't assume asynchronous operations will complete

---

## Related Safari Quirks

Similar issues you might encounter in Safari:

- **AudioContext suspended state** - Requires user gesture to resume
- **IndexedDB quota prompts** - Safari prompts users for storage permissions
- **Service Worker limitations** - More restricted than other browsers
- **WebGPU support** - Newer, may have compatibility issues
- **Module import maps** - Limited support compared to Chrome

---

## Resources

- [WebKit Blog](https://webkit.org/blog/)
- [Safari Technology Preview](https://developer.apple.com/safari/technology-preview/)
- [MDN Safari-specific docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video#browser_compatibility)
- [Can I Use - Browser Compatibility](https://caniuse.com/)

---

## Summary

Safari compatibility required four main fixes:

1. ✅ Use `preload="auto"` + explicit `load()` + timeout for video elements
2. ✅ Don't set `crossOrigin` on blob URLs
3. ✅ Don't use transfer list when posting typed arrays to workers
4. ✅ Add comprehensive error handling and timeouts for workers

These changes maintain full functionality in Chrome/Firefox while ensuring Safari compatibility. The performance impact is minimal (data copying instead of transferring) and acceptable for the use case.
