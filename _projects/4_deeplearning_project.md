---
layout: page
title: Towards Safer Navigation - Reward Shaping with Prior Topographic Knowledge
description: Enhancing navigation safety in deep reinforcement learning agents through reward shaping with prior map information
img: assets/img/dl_method.jpg
importance: 4
category: research
related_publications: false
---

## Project Overview

This project addresses a critical challenge in deep reinforcement learning navigation: improving agent safety while maintaining navigation capabilities. Through innovative integration of prior map information into reward shaping, we successfully enhanced the safety distance between agents and obstacles, contributing to more reliable autonomous navigation systems.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/traditional_nav.jpg" title="Traditional Navigation Stack" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/rl_nav.jpg" title="RL Navigation Results" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Left: Traditional navigation stack architecture; Right: Deep reinforcement learning navigation results
</div>

## Research Motivation

The navigation field is dominated by two main approaches, each with distinct advantages and limitations:

### 1. Traditional Navigation Stack
- **Advantages**: Widely deployed in real-world applications, modular pipeline design
- **Components**: Mapping, localization, planning, and control modules
- **Limitations**: Requires extensive parameter tuning, limited generalization capability

### 2. Reinforcement Learning Approach
- **Advantages**: End-to-end learning, potential for better generalization
- **Limitations**: Primarily validated in virtual environments, often generates unsafe navigation paths
- **Challenge**: High collision risk with obstacles due to lack of explicit safety constraints

## Technical Approach

### Network Architecture

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/ppo_framework.jpg" title="PPO Framework Architecture" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Proximal Policy Optimization (PPO) framework with multi-modal input processing
</div>

#### Input Layer
- **RGB Images**: 256×256×3 resolution for visual perception
- **Depth Maps**: 256×256×1 for spatial understanding
- **GPS and Compass Data**: 2D vector for global positioning

#### Feature Extraction
- **RGB & Depth Processing**: Independent ResNet18 backbones for visual feature extraction
- **GPS/Compass Processing**: Two-layer MLP (2→32→512) for positional encoding

#### Feature Fusion
- **Temporal Integration**: Dual-layer LSTM (hidden_size=512)
- **Multi-modal Fusion**: Combines visual and positional information

#### Output Layer
- **Actor Head**: 4 discrete actions
  - Turn left/right 30°
  - Move forward 0.5m
  - Stop action
- **Critic Head**: State value estimation for policy optimization

### Reward Shaping Strategy

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/method_overview.jpg" title="Method Overview" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/reward_shaping.jpg" title="Reward Shaping Mechanism" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Left: Overall method architecture; Right: Reward shaping mechanism with safety considerations
</div>

#### 1. Exploration Reward
- Encourages exploration of unknown areas
- Based on goal distance changes to prevent local minima
- Prevents overly cautious behavior that impedes progress

#### 2. Safety Reward
- **Penalty Zone**: Negative reward for distances < 0.5m from obstacles
- **Safety Zone**: Positive reward for distances between 0.5-2m
- **Optimal Zone**: Maximum reward for maintaining safe navigation distances

## Experimental Setup

### Environment and Datasets
- **Simulation Platform**: Habitat Simulator for photorealistic environments
- **Training Datasets**: MP3D (Matterport3D) and Gibson datasets
- **Environment Diversity**: Various indoor layouts and obstacle configurations

### Training Configuration
- **Parallel Environments**: 4 simultaneous training environments
- **Training Steps**: 5 million steps for convergence
- **Training Duration**: Approximately 10 hours
- **Hardware**: RTX 3060 (12GB VRAM)

## Evaluation Metrics

### 1. Success Rate
- **Definition**: Goal reached within 500 steps
- **Success Threshold**: Within 0.2m of target location
- **Measurement**: Percentage of successful navigation episodes

### 2. SPL (Success weighted by Path Length)
- **Formula**: SPL = (1/N) × Σ(Si × li/max(pi, li))
- **Purpose**: Combined measure of success rate and path efficiency
- **Advantage**: Penalizes inefficient paths even if successful

### 3. Path Safety (Custom Metric)
- **Definition**: Average distance to nearest obstacles throughout trajectory
- **Innovation**: Novel metric specifically designed for safety evaluation
- **Importance**: Quantifies navigation safety beyond binary success/failure

## Results and Analysis

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/navigation_results.jpg" title="Navigation Performance Results" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/performance_analysis.jpg" title="Performance Analysis" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Left: Quantitative navigation results; Right: Detailed performance analysis across different metrics
</div>

### Safety Improvements
- **RGBD Agent**: Achieved 5.75cm increase in average safety distance
- **Overall Safety**: 1.64% improvement in path safety metric
- **Collision Reduction**: Significant decrease in near-collision events

### Sensor Impact Analysis
- **Depth Sensing**: Crucial for effective safety distance mapping
- **RGB-only Input**: Insufficient for reliable obstacle distance estimation
- **Multi-modal Advantage**: Combined RGB-D input provides optimal performance

## Technology Stack

- **Deep Learning Framework**: PyTorch 1.9+
- **RL Algorithm**: Proximal Policy Optimization (PPO)
- **Simulation**: Habitat-Sim, Habitat-Lab
- **Computer Vision**: OpenCV, PIL
- **Neural Networks**: ResNet18, LSTM
- **Environment**: Python 3.8+, CUDA 11.2
- **Visualization**: Matplotlib, TensorBoard

## Performance Metrics

### Training Performance
- **Convergence Time**: 5M steps (≈10 hours)
- **Sample Efficiency**: Improved over baseline methods
- **Stability**: Consistent performance across multiple runs

### Navigation Quality
- **Success Rate**: Competitive with state-of-the-art methods
- **Path Efficiency**: Maintained while improving safety
- **Safety Distance**: Significant improvement over baseline

## Future Work

### Short-term Goals
1. **Extended Training**: Scale to 75 million steps for better convergence
2. **Reward Optimization**: Fine-tune reward function parameters
3. **Sensor Fusion**: Explore additional sensor modalities

### Long-term Vision
1. **Real Robot Validation**: Deploy on physical robotic platforms
2. **Multi-agent Systems**: Extend to collaborative navigation scenarios
3. **Dynamic Environments**: Handle moving obstacles and changing layouts
4. **Transfer Learning**: Adapt to new environments with minimal retraining

## Project Impact

This research contributes to the field of safe autonomous navigation by:
- Demonstrating effective integration of prior knowledge in RL
- Providing a novel safety-aware reward shaping approach
- Establishing new evaluation metrics for navigation safety
- Bridging the gap between simulation and real-world deployment

## Project Team

- **Lead Researcher**: Jiajie Zhang (zhangjj2023@shanghaitech.edu.cn)
- **Advisor**: Professor Soeren Schwertfeger
- **Institution**: MARS Lab, ShanghaiTech University

## Related Resources

- **Project Slides**: [Deep Learning Project Defense](../files/CS280_DL_Project_Defence.pdf)
- **Technical Report**: [Detailed Project Report](../files/DeepLearing_Project_Report.pdf)
- **Code Repository**: [GitHub Repository](https://github.com/jiajiezhang7/safe_rl_navigation)

---

*This project represents a significant step towards developing safer autonomous navigation systems through the integration of deep reinforcement learning and safety-aware reward design.*