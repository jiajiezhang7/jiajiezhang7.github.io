---
title: "Towards Safer Navigation: Reward Shaping with Prior Topographic Knowledge"
excerpt: "Enhancing navigation safety in deep reinforcement learning agents through reward shaping with prior map information.<br/><img src='/images/dl_method.png'>"
collection: portfolio
---

## Project Overview

This project addresses a critical challenge in deep reinforcement learning navigation: improving agent safety while maintaining navigation capabilities. Through innovative integration of prior map information into reward shaping, we successfully enhanced the safety distance between agents and obstacles.

<div style="display: flex; flex-direction: column; gap: 20px; margin: 20px 0;">
    <div style="text-align: center;">
        <img src="/images/traditional_nav.png" alt="Traditional Navigation Stack" style="width: 50%; height: auto;">
    </div>
    <div style="text-align: center;">
        <img src="/images/rl_nav.png" alt="RL Navigation Results" style="width: 70%; height: auto;">
    </div>
</div>

<div style="display: flex; justify-content: center; gap: 20px; margin: 20px 0; background-color: #e6f3ff; padding: 15px; border-radius: 8px;">
    <a href="/files/CS280_DL_Project_Defence.pdf" class="btn btn--primary" target="_blank">Download Project Slides (PDF)</a>
    <a href="/files/DeepLearing_Project_Report.pdf" class="btn btn--primary" target="_blank">Download Project Report (PDF)</a>
</div>

## Research Motivation

The navigation field is dominated by two main approaches:

1. **Traditional Navigation Stack**
   - Widely deployed in real-world applications
   - Modular pipeline (mapping, localization, planning, control)
   - Requires extensive parameter tuning
   - Limited generalization capability

2. **Reinforcement Learning Approach**
   - Primarily validated in virtual environments
   - No explicit map information utilization
   - Often generates unsafe navigation paths
   - High collision risk with obstacles

## Technical Approach

### Network Architecture

<div style="display: flex; justify-content: center; margin: 20px 0;">
    <img src="/images/dl_ppo_framework.png" alt="PPO Framework" style="max-width: 100%; height: auto;">
</div>

* **Input Layer**
  - RGB images (256×256×3)
  - Depth maps (256×256×1)
  - GPS and compass data (2D vector)

* **Feature Extraction**
  - RGB & Depth: Independent ResNet18 backbones
  - GPS/Compass: Two-layer MLP (2→32→512)

* **Feature Fusion**
  - Dual-layer LSTM (hidden_size=512)
  - Temporal information integration

* **Output Layer**
  - Actor Head: 4 discrete actions
    - Turn left/right 30°
    - Move forward 0.5m
    - Stop
  - Critic Head: State value estimation

### Reward Shaping

<div style="display: flex; flex-direction: column; gap: 20px; margin: 20px 0;">
    <div>
        <img src="/images/dl_method.png" alt="Method Overview" style="width: 70%; height: auto;">
    </div>
    <div>
        <img src="/images/dl_rewardshaping.png" alt="Reward Shaping" style="width: 70%; height: auto;">
    </div>
</div>

1. **Exploration Reward**
   - Encourages exploration of unknown areas
   - Based on goal distance changes
   - Prevents overly cautious behavior

2. **Safety Reward**
   - Based on obstacle proximity
   - Negative reward for <0.5m distance
   - Positive reward for 0.5-2m range

## Experimental Setup

* **Environment**: Habitat Simulator
* **Datasets**: MP3D and Gibson
* **Training Configuration**
  - 4 parallel environments
  - 5 million training steps
  - ~10 hours training duration
  - RTX 3060 (12GB VRAM)

## Evaluation Metrics

1. **Success Rate**
   - Goal reached within 500 steps
   - Target threshold: 0.2m

2. **SPL (Success weighted by Path Length)**
   - Combined measure of success rate and path efficiency

3. **Path Safety**
   - Custom metric
   - Average distance to nearest obstacles

## Results
<div style="display: flex; flex-direction: column; gap: 20px; margin: 20px 0;">
    <div>
        <img src="/images/dl_result_1.png" alt="Navigation Results" style="width: 70%; height: auto;">
    </div>
    <div>
        <img src="/images/dl_result_2.png" alt="Performance Analysis" style="width: 70%; height: auto;">
    </div>
</div>

* **Safety Improvements**
  - RGBD Agent achieved 5.75cm increase in average safety distance
  - 1.64% improvement in overall path safety

* **Sensor Impact Analysis**
  - Depth sensing crucial for safe navigation
  - RGB-only input insufficient for effective safety distance mapping

## Future Work

1. Extend training to 75 million steps
2. Optimize reward function design
3. Explore additional sensor combinations
4. Real robot validation

## Project Member

* Jiajie Zhang (zhangjj2023@shanghaitech.edu.cn)

