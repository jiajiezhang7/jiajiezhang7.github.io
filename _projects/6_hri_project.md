---
layout: page
title: "HRI Voice Interaction Robot: 360° Perception and Proactive Dialogue on ROS2"
description: "ROS2 Iron elevator HRI: 360° face-angle perception, bilingual ASR/TTS, LLM intent, servo gaze"
img: assets/img/hri_project/hri-robot.png
importance: 7
category: research
related_publications: false
mermaid:
  enabled: true
  zoomable: true
---

<style>
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
</style>

<div class="row mt-3">
    <div class="col-sm-12">
        <div class="hero-media">
            <video class="hero-video" id="hri-hero-video" autoplay muted loop playsinline preload="auto"
                   aria-label="Proactive dialogue with panoramic perception and servo gaze">
                <source src="{{ site.baseurl }}/assets/video/hri_demo.MP4" type="video/mp4">
                Your browser does not support the video tag.
            </video>
        </div>
        <div class="caption text-center mt-2">
            <strong>Demo</strong>: Proactive dialogue with panoramic perception and servo gaze.
        </div>
    </div>
</div>

<script>
(function () {
  var v = document.getElementById('hri-hero-video');
  if (v && window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) {
    v.removeAttribute('autoplay');
    v.pause();
    v.controls = true;
  }
})();
</script>

## Abstract

Public-space robots must notice people who face them, start a conversation without being summoned, and respond with low-latency speech while keeping eye contact. This project builds an elevator-service HRI stack on **ROS2 Iron**: fisheye → equirectangular 360° perception, dual-stage human/face detection with facing-angle estimation, bilingual ASR/TTS, LLM intent analysis, a proactive state machine, and servo gaze that rotates to the selected user.

## Contributions

- End-to-end ROS2 Iron pipeline: **perception → understanding → decision → action**, with modular topics/services and swappable cloud providers.
- **360° panoramic perception** from fisheye images via equirectangular projection and multi-view splitting.
- **Dual-stage detection** (YOLOv8 + MTCNN) with facing-angle estimation on **0–360°**, published on `/face_angle`.
- **Bilingual ASR/TTS** (Baidu / StepFun) and **LLM intent analysis** (Volcano Engine) for dialogue.
- **Proactive questioning + state machine** (Idle → Questioning → Playback → Decision) with target switching.
- **Servo gaze control** that rotates the platform to face the selected user for user-centric interaction.

## Method

Loop: panoramic vision continuously searches for the closest face looking at the robot → publish `/face_angle` → servo turns to the user → proactive question → ASR → LLM → TTS → playback → sentiment/intent decides continue vs. end.

Module map:

- **Visual perception**: `usb_cam`, `fisheye_process`, `human_detect` (YOLOv8 + MTCNN) → `/face_angle`
- **Voice**: `audio_capture` → Baidu/StepFun ASR → `llm_bytedance` → TTS → `audio_play_python`
- **Motion**: `servo` subscribes to `/face_angle` for tracking / eye contact
- **Coordinator**: `interaction_coordinator_node`, `active_questioning_node` own the interaction state machine
- **Display**: `robot_animation_display` mirrors TTS status from `/audio_generated` and `/audio_playback_complete`

Why this split: cloud ASR/TTS/LLM stay replaceable behind ROS interfaces; local vision + servo keep the closed loop for gaze even when providers change.

```mermaid
%% HRI System - Simplified Pipeline Overview

graph LR
    USER[Human User]

    subgraph Vision["Vision System"]
        V1[360° Camera]
        V2[Face Detection<br/>YOLOv8 + MTCNN]
        V3[Angle Calculation]
        V1 --> V2 --> V3
    end

    subgraph Motion["Motion"]
        M1[Servo Control<br/>Auto Rotation]
    end

    subgraph Coordinator["Coordinator"]
        CO1{Face<br/>Detected?}
        CO2[Trigger<br/>Question]
        CO3{Emotion<br/>Analysis}
        CO4[Continue<br/>Search]
        CO5[Task<br/>Complete]
    end

    subgraph VoiceSystem["Voice Interaction"]
        direction TB
        VS1[Audio Capture<br/>+ Filter]
        VS2[Speech Recognition<br/>Baidu/StepFun]
        VS3[LLM Processing<br/>Volcano Engine]
        VS4[Speech Synthesis<br/>Baidu/StepFun]
        VS5[Audio Playback]

        VS1 --> VS2 --> VS3 --> VS4 --> VS5
    end

    subgraph Animation["Display"]
        AN1[TTS Status<br/>Animation]
    end

    USER -.->|Faces| V1
    V3 -->|/face_angle| M1
    V3 --> CO1

    CO1 -->|Yes| CO2
    CO1 -->|No| V3

    CO2 -->|Question| VS3

    USER -.->|Speaks| VS1
    VS5 -.->|Robot Speaks| USER

    VS5 --> CO3

    CO3 -->|Positive| CO5
    CO3 -->|Negative| CO4
    CO4 --> V3

    VS4 --> AN1
    VS5 --> AN1

    classDef visionClass fill:#e3f2fd,stroke:#1976d2,stroke-width:2px
    classDef motionClass fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px
    classDef voiceClass fill:#fff3e0,stroke:#f57c00,stroke-width:2px
    classDef coordClass fill:#e8f5e9,stroke:#388e3c,stroke-width:2px
    classDef animClass fill:#fce4ec,stroke:#c2185b,stroke-width:2px
    classDef userClass fill:#ffebee,stroke:#d32f2f,stroke-width:3px

    class V1,V2,V3 visionClass
    class M1 motionClass
    class VS1,VS2,VS3,VS4,VS5 voiceClass
    class CO1,CO2,CO3,CO4,CO5 coordClass
    class AN1 animClass
    class USER userClass
```

<div class="caption">
    Perception → servo gaze → proactive dialogue → intent decision → continue or terminate.
</div>

### Typical interaction flow

1. Fisheye capture → panoramic views.
2. Detect human/face, estimate facing angle, publish `/face_angle`.
3. Rotate to face the target; ask a question proactively.
4. ASR → LLM intent → TTS playback.
5. Terminate or continue searching based on sentiment / keywords.

## Results

Reported operating numbers from tested scenes:

- **Latency**: end-to-end &lt; **3 s** (face detection → playback completion)
- **Perception**: face detection accuracy &gt; **95%**; multi-person selection supported
- **Speech**: practical ASR accuracy &gt; **90%** (Chinese/English) with VAD and segmentation
- **Architecture**: modular nodes with swappable cloud services for continuous public-space operation

## Failure Cases / Limitations

- Numbers are from **tested scenes**, not a large public HRI benchmark; crowded-elevator stress tests are incomplete.
- Dialogue quality and latency depend on **external cloud** ASR/TTS/LLM providers.
- Emotion / intent understanding is keyword- and LLM-prompt based; gesture / richer non-verbal cues are unfinished.
- Multilingual coverage beyond Chinese/English and stronger multimodal LLMs are not yet integrated.
- Safety filters for public speech content need further hardening.

## Project Team

- **Lead developer**: Jiajie Zhang (zhangjj2023@shanghaitech.edu.cn)
- **Collaborator**: Yongqi Zhang (zhangyq2023@shanghaitech.edu.cn)
- **Advisor**: Professor Sören Schwertfeger

## Related Resources

- **Code**: [HRI-Campus](https://github.com/jiajiezhang7/HRI-Campus)
