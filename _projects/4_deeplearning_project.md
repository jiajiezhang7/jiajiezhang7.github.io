---
layout: page
title: Towards Safer Navigation - Reward Shaping with Prior Topographic Knowledge
description: Enhancing navigation safety in deep reinforcement learning agents through reward shaping with prior map information
img: assets/img/rl_nav.jpg
importance: 4
category: research
related_publications: false
---

## Motivation

Modular navigation is reliable yet rigid; end-to-end RL is flexible but often unsafe near obstacles. We aim to train agents that not only reach goals but also maintain human-like safety margins during navigation.

## Method Overview

We introduce **safety-aware reward shaping** using prior topographic knowledge to form a continuous "safety gradient" rather than a binary collision penalty. The agent is penalized in a near-obstacle "Penalty Zone" and rewarded in a "Safety Zone" that preserves a sensible buffer, balancing progress and safety. Training uses **PPO** with multi-modal inputs (RGB, depth, GPS/compass) for robust perception and control.

<style>
.equal-height-images-contain img {
    height: 300px;
    width: 100%;
    object-fit: contain;
}
</style>

<div class="row equal-height-images-contain">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/method_overview.jpg" title="Method Overview" class="rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/reward_shaping.jpg" title="Reward Shaping Mechanism" class="rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Our method integrates prior map knowledge to shape the agent's rewards, encouraging safer navigation paths.
</div>

## Results

We train and evaluate in Habitat on MP3D and Gibson. Beyond Success and SPL, we measure **Path Safety** (average distance to nearest obstacle):

- **Path Safety**: +6 cm over baseline
- **Success / SPL**: Competitive with baseline while improving safety
- **Training**: Converges in ~5M steps (≈10 hours); stable across runs; improved sample efficiency

<div class="row equal-height-images-contain">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/navigation_results.jpg" title="Navigation Performance Results" class="rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/performance_analysis.jpg" title="Performance Analysis" class="rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Our method shows a clear improvement in the Path Safety metric while remaining competitive in traditional navigation benchmarks.
</div>

## Tech Stack

- **Deep Learning Framework**: PyTorch 1.9+
- **RL Algorithm**: Proximal Policy Optimization (PPO)
- **Simulation**: Habitat-Sim, Habitat-Lab
- **Computer Vision**: OpenCV, PIL
- **Neural Networks**: ResNet18, LSTM
- **Environment**: Python 3.8+, CUDA 11.2
- **Visualization**: Matplotlib, TensorBoard

## Next Steps

Scale up training, refine reward shaping, and transfer to real robots. Extend to dynamic environments with moving obstacles and explore multi-agent coordination for safe, efficient navigation.

## Project Impact

This research contributes to the field of safe autonomous navigation by:

- Demonstrating effective integration of prior knowledge in RL
- Providing a novel safety-aware reward shaping approach
- Establishing new evaluation metrics for navigation safety
- Bridging the gap between simulation and real-world deployment

## Project Team

- **Lead Researcher**: Jiajie Zhang (zhangjj2023@shanghaitech.edu.cn)
- **Advisor**: Professor Sören Schwertfeger
- **Institution**: MARS Lab, ShanghaiTech University

## Related Resources

- **Project Slides**: [Deep Learning Project Defense](/files/CS280_DL_Project_Defence.pdf)
- **Technical Report**: [Detailed Project Report](/files/DeepLearing_Project_Report.pdf)
- **Code Repository**: [GitHub Repository](https://github.com/jiajiezhang7/habitat-lab-ppo-comment)

---

_This project marks a significant step towards creating safer, more reliable autonomous agents by fundamentally rethinking how they learn to navigate, bridging the gap between task completion and real-world practicality._
