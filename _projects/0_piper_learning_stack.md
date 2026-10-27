---
layout: page
title: "Dual-Arm PiPER Learning Stack"
description: "Built a full real-robot learning stack for a bimanual PiPER platform; ACT stacks five cups autonomously."
img: assets/img/piper/rollout_poster.jpg
importance: 1
category: research
related_publications: false
---

<style>
.demo-video {
    width: 100%;
    height: 350px;
    object-fit: contain;
    background-color: #000;
}
.hero-media {
    position: relative;
    aspect-ratio: 16 / 9;
    background: #0e1319;
    border-radius: 12px;
    overflow: hidden;
}
.hero-video {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    background-color: #000;
}
.hero-badge {
    position: absolute;
    top: 12px;
    padding: 6px 9px;
    border-radius: 6px;
    background: rgba(14, 19, 25, 0.72);
    color: #fff;
    font: 600 12px/1 monospace;
    letter-spacing: 0.06em;
    z-index: 2;
}
.hero-badge-l { left: 12px; }
.hero-badge-r { right: 12px; }
.piper-stat {
    text-align: center;
    padding: 0.75rem 0.5rem;
}
.piper-stat .num {
    display: block;
    font-size: 1.6rem;
    font-weight: 700;
    line-height: 1.2;
}
.piper-stat .lbl {
    display: block;
    font-size: 0.85rem;
    opacity: 0.75;
    margin-top: 0.25rem;
}
.piper-card {
    height: 100%;
    border: 1px solid rgba(0, 0, 0, 0.12);
    border-radius: 10px;
    padding: 1rem 1.1rem;
    background: #fff;
}
.piper-card h3 {
    font-size: 1.05rem;
    margin-top: 0;
    margin-bottom: 0.5rem;
}
.piper-card p {
    margin-bottom: 0;
    font-size: 0.95rem;
}
.piper-chip {
    display: inline-block;
    margin: 0.2rem 0.25rem 0.2rem 0;
    padding: 0.25rem 0.6rem;
    border-radius: 999px;
    border: 1px solid rgba(0, 0, 0, 0.14);
    font-size: 0.85rem;
    background: #f6f6ef;
}
.equal-height-images-contain img {
    height: 280px;
    width: 100%;
    object-fit: contain;
}
details.piper-note {
    border: 1px solid rgba(0, 0, 0, 0.12);
    border-radius: 8px;
    padding: 0.6rem 0.9rem;
    margin-bottom: 0.6rem;
    background: #fff;
}
details.piper-note summary {
    cursor: pointer;
    font-weight: 600;
}
</style>

<!-- Hero: 4× muted autoplay loop -->
<div class="row mt-3">
    <div class="col-sm-12">
        <div class="hero-media">
            <video class="hero-video" id="piper-hero-video" autoplay muted loop playsinline preload="auto"
                   poster="{{ site.baseurl }}/assets/img/piper/rollout_poster.jpg"
                   aria-label="ACT policy autonomously stacking five cups with two PiPER arms, 4x speed">
                <source src="{{ site.baseurl }}/assets/video/piper/hero_rollout_4x.mp4" type="video/mp4">
                Your browser does not support the video tag.
            </video>
            <span class="hero-badge hero-badge-l">Autonomous · ACT</span>
            <span class="hero-badge hero-badge-r">4×</span>
        </div>
        <div class="caption text-center mt-2">
            Autonomous rollout of ACT on the real robot, 4× speed.
            <a href="#results">Full 1× video</a>
        </div>
    </div>
</div>

<script>
(function () {
  var v = document.getElementById('piper-hero-video');
  if (v && window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) {
    v.removeAttribute('autoplay');
    v.pause();
    v.controls = true;
  }
})();
</script>

## Summary

From CAN frames to closed-loop policies on a bimanual robot.

I built the complete real-robot learning pipeline for a bimanual AgileX PiPER platform: hardware bring-up, Lighthouse-tracked handheld teleoperation, a versioned 30 Hz data contract, policy training, and a fail-closed deployment gateway. With it I collected 100 teleoperated demonstrations and deployed learned policies on the real robot. The video shows ACT stacking five cups with both arms, with no teleoperation input.

**Role:** Sole engineer: hardware integration, software, data collection, training  
**Timeline:** Aug–Oct 2026  
**Platform:** 2× AgileX PiPER (6-DoF), 2× Pika Gripper, 2× Pika Sense, 4× RealSense D405 + D435i  
**Software:** ROS 2 Jazzy · Python · LeRobot · PyTorch · Pinocchio · gRPC

<div class="row mt-3 mb-2">
    <div class="col-6 col-md-3 piper-stat">
        <span class="num">100</span>
        <span class="lbl">teleoperated demos<br/>(57.45 min)</span>
    </div>
    <div class="col-6 col-md-3 piper-stat">
        <span class="num">30 Hz</span>
        <span class="lbl">14-D joint-space<br/>contract</span>
    </div>
    <div class="col-6 col-md-3 piper-stat">
        <span class="num">3</span>
        <span class="lbl">policy families:<br/>ACT, DP, SmolVLA</span>
    </div>
    <div class="col-6 col-md-3 piper-stat">
        <span class="num">185</span>
        <span class="lbl">automated tests</span>
    </div>
</div>

## What I built

<div class="row">
    <div class="col-md-6 mb-3">
        <div class="piper-card">
            <h3>Infrastructure</h3>
            <p>Brought up two PiPER arms over CAN and four Pika devices over USB. Device identity is bound to hardware serials, both arms, grippers and all camera frames live in one URDF/TF tree, and one-command backends refuse to report READY until every stream and status flag checks out.</p>
        </div>
    </div>
    <div class="col-md-6 mb-3">
        <div class="piper-card">
            <h3>Pipeline</h3>
            <p>Teleoperation, recording, conversion, training and deployment share one versioned interface: 30 Hz, 14-D absolute joint state and action, three 640×480 RGB views, locked by a schema hash and a per-checkpoint manifest.</p>
        </div>
    </div>
    <div class="col-md-6 mb-3">
        <div class="piper-card">
            <h3>Teleoperation data</h3>
            <p>Mapped Lighthouse-tracked Pika Sense handhelds to both arms through relative-pose numerical IK with 1:1 gripper control, and collected 100 successful bimanual demonstrations (57.45 min) through a fail-closed raw-to-LeRobot export.</p>
        </div>
    </div>
    <div class="col-md-6 mb-3">
        <div class="piper-card">
            <h3>Policy training</h3>
            <p>Trained ACT and Diffusion Policy and fine-tuned SmolVLA on the same data. ACT runs live through an async PolicyServer/RobotClient with per-policy execution contracts, behind a gateway that owns the command topics and is designed for policy swap.</p>
        </div>
    </div>
</div>

The stack is organized as one shared ROS 2 hardware layer with three loops on top: teleoperation, data/training, and policy deployment. Teleoperation and the learned policy are interchangeable sources of joint targets; the recorder only subscribes. Upstream drivers and SDKs (pyAgxArm, agx_arm_ros, pika_ros, LeRobot) stay pinned; the integration, contracts, gateway, and training/deployment path are what I built.

## 1 · Hardware & software stack

Two 6-DoF PiPER arms run on CAN; two mounted Pika grippers, two handheld Pika Sense trackers and a third-view RealSense run on USB. I kept the vendor SDK and ROS 2 drivers at pinned commits and built the integration layer on top: hardware identity by serial number, a combined URDF/TF tree for both arms, grippers and every camera frame, and backends with built-in health checks. Real-time servo control stays in the arm firmware; everything above it only ever sends six target joint angles per arm.

## 2 · Teleoperation & data

Each Pika Sense is tracked by two Lighthouse base stations at about 164 Hz. Hand motion is applied to the gripper as a relative pose, so the tracking frame never has to be registered to the robot, then solved with numerical IK and executed with the same smoothed joint mode used at deployment. The recorder only subscribes. It writes immutable raw episodes, which are reviewed by hand and exported to LeRobot v3 by a converter that fails closed on timestamp gaps, rate errors, camera skew above 30 ms, frozen or black frames, and out-of-bound joints.

<div class="row equal-height-images-contain">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/piper/teleop_station_redacted.jpg" title="Teleoperation station" class="rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/piper/pika_sense_handheld_redacted.jpg" title="Pika Sense handheld" class="rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Left: teleoperation station — two Lighthouse base stations define the tracking volume; the Pika Sense handhelds rest on foam stands between sessions.
    Right: Pika Sense handheld used for Lighthouse-tracked teleoperation.
</div>

## 3 · Training

State and action are both absolute 14-D vectors: six joints and a gripper opening per arm. Action is the commanded target rather than the next measured state, so the policy learns intent and is tracked by the same controller at run time. On one dataset I trained ACT and Diffusion Policy and fine-tuned SmolVLA from its pretrained base. Every checkpoint climbs the same ladder: data visualization, 100-step smoke test, single-episode overfit, full training, held-out offline evaluation, shadow mode, and only then live.

## 4 · Deployment & safety

A LeRobot PolicyServer runs inference; a RobotClient with a custom robot plugin talks to a ROS-side gateway over gRPC on a Unix socket. The gateway owns the arm and gripper command topics. It checks schema and checkpoint hashes on connect, health and freshness before enable, bounds and collisions for every action, and a 0.3 s watchdog throughout. On any failure it holds, closes both gates and does not re-enable itself. Swapping policies only means writing a new execution contract: how long an action chunk is and how overlapping chunks are merged.

## Results {#results}

ACT, trained on my teleoperated demonstrations, stacking five cups with both arms on the real robot. Single rollout, shown at 1× speed, one take. This is a qualitative demonstration; a held-out evaluation over 20 unseen cup layouts is planned / in progress.

<div class="row mt-3">
    <div class="col-sm-12">
        <video class="demo-video" controls muted playsinline preload="metadata"
               poster="{{ site.baseurl }}/assets/img/piper/rollout_poster.jpg"
               aria-label="Full-length dual-arm cup stacking rollout at 1x speed">
            <source src="{{ site.baseurl }}/assets/video/piper/rollout_1x.mp4" type="video/mp4">
            Your browser does not support the video tag.
        </video>
        <div class="caption text-center mt-2">
            Full rollout at 1×. Keyframes at 0, 15, 36 and 50 s below.
        </div>
    </div>
</div>

<div class="row mt-2">
    <div class="col-sm-12">
        {% include figure.liquid loading="lazy" path="assets/img/piper/rollout_keyframes_strip.jpg" title="Rollout keyframes" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Keyframes from the ACT cup-stacking rollout at 0, 15, 36 and 50 s.
</div>

## Engineering notes

<details class="piper-note">
<summary>Note 1 — A safety limiter that rewrote good actions</summary>
<p>I first rate-limited the gripper at 0.05 m/s in the gateway. Comparing predicted and sent actions from live ACT runs showed that 43–56% of demonstrated gripper frames moved faster than that, and one closure stretched from 1.9 s to 5.3 s. The gateway now only rejects anomalies (NaN, out of bounds, collision, stale data, timeouts) and passes in-bound actions unchanged.</p>
</details>

<details class="piper-note">
<summary>Note 2 — An inference queue that starved when the robot slowed down</summary>
<p>LeRobot's async server skips observations whose 14-D state is within distance 1 of the previous one. When the arms moved slowly or paused, valid requests were dropped and the 10-step action queue ran dry before the next inference. My PolicyServer accepts one observation per control timestep and rejects only duplicates and stale timesteps.</p>
</details>

<details class="piper-note">
<summary>Note 3 — Left and right are serial numbers, not USB ports</summary>
<p>Both CAN adapters are renamed to <code>can_left</code> and <code>can_right</code> by their USB serial; cameras are bound by RealSense serial; devices without unique serials are bound by a verified hub topology. Moving a USB plug is harmless. Swapping the two CAN cables silently mirrors the robot, and the runbook says so.</p>
</details>

<details class="piper-note">
<summary>Note 4 — A zero position just outside the joint limit</summary>
<p>At rest, joint 2 can read a few hundredths of a radian below its URDF lower limit of 0, so a small regression move from there produced a −0.0322 rad target and was rejected. The fix tolerates the measured residual at the start and only allows motion back into the valid range.</p>
</details>

<details class="piper-note">
<summary>Note 5 — Porting to ROS 2 Jazzy</summary>
<p>The vendor's tracker node shipped as a Humble binary and would not load on Jazzy because of an ABI mismatch. I reimplemented it as a Jazzy node that publishes the same pose convention, so the teleoperation mapping did not change.</p>
</details>

### By the numbers

~21k lines of Python across 101 files · 185 test functions in 32 test files · 36 operational scripts · 18 ROS 2 launch files · 24 runbook documents · 5 upstream repositories pinned to exact commits

## What's next

Next: plug π0.5 and world-action models into the same interface (a new execution contract; data, robot plugin and gateway unchanged), move the PolicyServer to a remote GPU, and use the teleoperation rig for harder coordinated bimanual tasks.

## Tech stack

<span class="piper-chip">ROS 2 Jazzy</span>
<span class="piper-chip">Python</span>
<span class="piper-chip">C++</span>
<span class="piper-chip">pyAgxArm</span>
<span class="piper-chip">LeRobot</span>
<span class="piper-chip">PyTorch</span>
<span class="piper-chip">ACT</span>
<span class="piper-chip">Diffusion Policy</span>
<span class="piper-chip">SmolVLA</span>
<span class="piper-chip">Pinocchio</span>
<span class="piper-chip">gRPC</span>
<span class="piper-chip">libsurvive</span>
<span class="piper-chip">Intel RealSense</span>
<span class="piper-chip">SocketCAN</span>
