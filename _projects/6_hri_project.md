---
layout: page
title: "HRI Voice Interaction Robot: 360° Perception and Proactive Dialogue on ROS2"
description: "A complete human–robot interaction system with panoramic vision, bilingual speech, LLM reasoning, and servo tracking for elevator service scenarios"
img: assets/img/hri_project/hri-robot.png
importance: 6
category: research
related_publications: false
---

## Motivation

Robots operating in public spaces need reliable human-facing perception and natural, low-latency interaction. This project targets an elevator service scenario where the robot detects people facing it, proactively initiates a dialogue, and reacts appropriately based on user intent, enabling contactless and socially acceptable assistance.

## Contributions

- Built an end-to-end HRI pipeline on **ROS2 Iron** covering perception → understanding → decision → action.
- Implemented **360° panoramic perception** from fisheye images with equirectangular projection and multi-view splitting.
- Deployed **dual-stage human/face detection** (YOLOv8 + MTCNN) with facing-angle estimation (0–360°).
- Integrated **bilingual ASR/TTS** via Baidu and StepFun, and **LLM-based intent analysis** (Volcano Engine) for natural dialogue.
- Designed **proactive questioning + state machine** to manage interaction flow and target switching.
- Realized **servo-based gaze control**, rotating to face the target for stable, user-centric interaction.
- Provided a **modular ROS2 architecture** with clear topics/services and swappable providers.

## System Overview

The system continuously perceives the environment through panoramic vision, detects the closest face looking at the robot, turns to face the user, asks a question proactively, recognizes the reply, reasons with an LLM, synthesizes speech, and decides whether to continue or end the interaction based on the sentiment/intent.

## System Architecture

- **Visual Perception**: `usb_cam`, `fisheye_process`, `human_detect` (YOLOv8 + MTCNN). Publishes facing angles to `/face_angle`.
- **Voice Interaction**: `audio_capture`, Baidu/StepFun for ASR and TTS, `llm_bytedance` for LLM reasoning, `audio_play_python` for playback. Pipeline: Audio → ASR → LLM → TTS → Playback.
- **Motion Control**: `servo` subscribes to `/face_angle` and rotates the platform for visual tracking and eye contact.
- **Interaction Coordinator**: `interaction_coordinator_node` and `active_questioning_node` manage states (Idle → Questioning → Playback → Decision) and determine whether to continue searching.
- **Animation Display**: `robot_animation_display` monitors `/audio_generated` and `/audio_playback_complete`, publishing `/tts_status` in real time.
- **Auxiliary Tools**: `audio_recorder.py`, `dummy_level_publisher`, and `level_interfaces` for development and integration.

<div class="row justify-content-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/hri_project/hri-pipeline-mermaid.png" title="HRI System Architecture" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    The overall pipeline of the HRI system, from panoramic perception and intent understanding to servo-based gaze control and dialogue.
</div>

## Results

- **Latency**: End-to-end < 3 s (from face detection to playback completion).
- **Perception**: Face detection accuracy > 95% in tested scenes; supports multi-person selection.
- **Speech**: Practical ASR accuracy > 90% (Chinese/English) with robust VAD and segmentation.
- **Robustness & Scalability**: Modular nodes and swappable cloud services; supports continuous operation in public spaces.

## Tech Stack

- **Robotics Framework**: ROS2 Iron
- **Languages**: Python, C++
- **Computer Vision**: OpenCV, Ultralytics (YOLOv8), MTCNN, FaceNet-PyTorch
- **Audio & Signal**: GStreamer, ALSA, NumPy, Wave
- **AI Services**: Baidu ASR/TTS, StepFun ASR/TTS, Volcano Engine LLM
- **Hardware I/O**: PySerial, USB camera, servo controller

## Typical Interaction Flow

1. Perceive scene with fisheye camera and generate panoramic views.
2. Detect human and face, estimate facing angle, publish `/face_angle`.
3. Rotate to face the target and initiate a question proactively.
4. Recognize the reply (ASR), analyze intent (LLM), synthesize and play response (TTS).
5. Decide to terminate or continue searching based on sentiment/keywords.

## Next Steps

- Expand multilingual support in ASR/TTS.
- Integrate stronger multimodal LLMs for richer reasoning.
- Enhance emotion/intent understanding and safety filters.
- Add gesture recognition and richer non-verbal cues.
- Optimize latency and throughput for crowded environments.

## Project Team

- **Lead Developer**: Jiajie Zhang (zhangjj2023@shanghaitech.edu.cn)
- **Collaborator**: Yongqi Zhang (zhangyq2023@shanghaitech.edu.cn)
- **Advisor**: Professor Sören Schwertfeger

## Related Resources

- **Demo Video**: [System Demonstration](/assets/video/hri_demo.MP4)
- **code**: [GitHub](https://github.com/jiajiezhang7/HRI-Campus)

---

_This project demonstrates a practical, end-to-end HRI stack for real-world service robotics, focusing on natural, proactive interactions in public environments such as elevators._
