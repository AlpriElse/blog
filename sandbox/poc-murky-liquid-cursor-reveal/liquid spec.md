# Murky liquid cursor reveal + corner distortion (implementation notes)

You’re describing a very specific (and very *good*) interaction pattern:

* As the cursor moves around, it **reveals a texture / image** underneath.
* The reveal doesn’t feel like a clean mask — it feels like the image is **occluded behind a murky / viscous liquid**.
* When you move the cursor quickly over an image, the **corners warp / bend** (like refraction + shear).

This effect is basically:

1. A **soft reveal mask** that follows the cursor (blobby + smeared)
2. A **refraction / displacement pass** whose strength is driven by **cursor velocity**

---

## Best approach: WebGL shader (Three.js / R3F / raw WebGL)

### Mental model

Render each image (or the whole page as a texture) through a fragment shader that:

* computes distance to cursor → reveal amount
* uses a *fluid-ish field* (noise + smear) → makes it look like it’s behind liquid
* uses cursor **velocity** → increases UV distortion when you move quickly
* optionally adds a tiny **chromatic aberration** → sells “refraction”

The corner warping happens naturally because you’re distorting UVs near the edges of the quad.

---

## Shader core: reveal mask + refraction

### Core math

* `mask = smoothstep(r, r-soft, distance(uv, mouseUV))`
* `flow = noise(uv*freq + time) + velocityVector`
* `uvDistorted = uv + flow * mask * strength`
* `color = texture(image, uvDistorted)`

---

## Minimal fragment shader (conceptual)

```glsl
// uniforms
uniform sampler2D uTex;
uniform vec2 uMouse;      // 0..1 in plane UV space
uniform vec2 uVel;        // mouse velocity in UV/sec-ish
uniform float uTime;

varying vec2 vUv;

float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
float noise(vec2 p){
  vec2 i=floor(p), f=fract(p);
  float a=hash(i), b=hash(i+vec2(1,0)), c=hash(i+vec2(0,1)), d=hash(i+vec2(1,1));
  vec2 u=f*f*(3.0-2.0*f);
  return mix(a,b,u.x) + (c-a)*u.y*(1.0-u.x) + (d-b)*u.x*u.y;
}

void main(){
  vec2 uv = vUv;

  // cursor reveal mask (soft blob)
  float d = distance(uv, uMouse);
  float radius = 0.18;       // size of “reveal”
  float softness = 0.12;     // edge falloff
  float mask = 1.0 - smoothstep(radius, radius+softness, d);

  // murky “liquid” field (noise + slight directional smear)
  float n = noise(uv*6.0 + uTime*0.25);
  vec2 flow = vec2(noise(uv*6.0 + 10.0 + uTime*0.25), n) - 0.5;

  // velocity boosts distortion (fast cursor = stronger warp)
  float v = clamp(length(uVel) * 2.5, 0.0, 1.0);
  vec2 velDir = normalize(uVel + 1e-5);

  // refraction offset: noise + smear in direction of motion
  vec2 offset = (flow*0.02 + velDir*0.03*v) * mask * (0.35 + 0.65*v);

  // slight “thickness”: second offset so it feels like medium
  vec2 uv2 = uv + offset + flow*0.01*mask;

  vec4 col = texture2D(uTex, uv2);

  // optional: tiny chromatic aberration for refraction
  vec3 ca;
  ca.r = texture2D(uTex, uv2 + offset*0.35).r;
  ca.g = col.g;
  ca.b = texture2D(uTex, uv2 - offset*0.35).b;

  // optional: “murk” = desat + lift blacks under mask edge
  float murk = smoothstep(0.0, 1.0, mask) * 0.35;
  vec3 finalCol = mix(col.rgb, mix(vec3(dot(ca, vec3(0.33))), ca, 0.6), 0.25);
  finalCol = mix(finalCol, finalCol + 0.08, murk);

  gl_FragColor = vec4(finalCol, 1.0);
}
```

---

## Getting `uMouse` + `uVel` in image-local UV space

This is *the* key for “distorts corners of images when cursor moves fast”.

For each image plane:

* raycast mouse → get intersection `uv`
* velocity = `(uv - prevUv) / dt`
* smooth velocity with a low-pass filter (lerp)

Pseudo:

```ts
// per frame
const dt = clock.getDelta();
const uv = intersection.uv; // 0..1 in plane space

vel.lerp(
  uv.clone().sub(prevUv).divideScalar(dt),
  0.15
);

prevUv.copy(uv);

material.uniforms.uMouse.value.copy(uv);
material.uniforms.uVel.value.copy(vel);
```

That velocity spike is what makes “fast cursor movement” bend corners.

---

## What makes it feel like “murky liquid” (the look knobs)

### 1) Mask is not a perfect circle

Instead of a clean distance field, perturb the distance by noise:

* `d += (noise(uv*freq + time) - 0.5) * amp;`

This makes the reveal edge feel organic.

### 2) Smear trails

Keep a decaying velocity vector so distortion lingers:

* use `vel.lerp(newVel, smoothing)`
* or decay: `vel *= 0.9` each frame

### 3) Thickness / refraction

Sample texture with slightly different offsets (multi-sample), and optionally add:

* subtle chromatic aberration
* slight blur / desat in the “murk zone”

### 4) Murkiness

Inside/near the mask edge:

* desaturate
* lift blacks a bit
* add slight haze

This reads like looking through a medium.

---

## Alternate approach (easier, less perfect): DOM + SVG displacement

You *can* prototype this with SVG filters:

* `feTurbulence` → procedural noise
* `feDisplacementMap` → warp pixels

Then animate displacement `scale` based on cursor velocity.

Pros:

* fast to prototype
* no WebGL scene setup

Cons:

* harder to make it feel truly “liquid”
* per-image local UV + correct warping is trickier

---

## Pro version: true fluid sim (ping-pong FBO)

If you want the *really* premium version:

* create a small render target (FBO)
* on mouse move: **splat** velocity + dye
* each frame: advect + diffuse + decay
* use the resulting texture as your displacement map

This is how the best “liquid hover / ink reveal” demos do it.

---

## Summary

This effect is:

* **Reveal mask** following cursor (soft, noisy)
* **UV displacement/refraction** driven by:

  * noise field
  * cursor velocity (big spikes = corner bending)
* Optional: chromatic aberration + murk/desat for the “occluded behind liquid” look

If you tell me your stack (Three.js vs React Three Fiber vs DOM-only), I can write a clean drop-in implementation (including raycasting UV + velocity smoothing + shader material).
