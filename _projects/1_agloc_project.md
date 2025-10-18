---
layout: page
title: "AGLoc++: WiFi-Fused Global Localization and Monte Carlo Enhanced Tracking"
description: "Extension of indoor LiDAR localization system based on hierarchical area graphs, integrating WiFi-aided kidnap recovery and Nav2 navigation stack"
img: assets/img/agloc_teaser.jpg
importance: 1
category: research
related_publications: xie2023agloc
---

## Motivation

Dynamic indoor environments make lifelong localization difficult: people and movable objects cause drift, kidnap events can reset tracking, and multi-floor spaces require robust map management. AGLoc++ targets these challenges with a resilient indoor localization and tracking system designed for real-world navigation.

## Contributions

- Migrated the full system to **ROS2 Humble** with an optimized architecture and data flow.
- Integrated **WiFi-aided kidnap recovery** via fingerprint mapping for rapid coarse re-localization.
- Achieved **seamless Nav2 integration** as a drop-in replacement for AMCL.
- Enabled **multi-floor awareness** with automatic floor identification and map switching.
- Designed an **odometry-fused Monte Carlo tracking** module for enhanced robustness (in progress).

<style>
.equal-height-images-contain img {
    height: 300px;
    width: 100%;
    object-fit: contain;
}
</style>

<div class="row equal-height-images-contain">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/agloc_robot.jpg" title="Autonomous Robot Platform" class="rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/agloc_demo.jpg" title="Localization Results Demo" class="rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Left: Our autonomous robot platform equipped with 3D LiDAR. Right: A demonstration of the AGLoc++ system's localization results.
</div>

## Method Overview

The system filters transient objects from 3D LiDAR and focuses on permanent structures. A **hypothesis-scoring global localization** generates and evaluates candidate poses for robust re-localization, followed by **weighted point-to-line ICP** to track poses with high accuracy, even in cluttered spaces.

## System Architecture

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/agloc_architecture.jpg" title="System Architecture" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    The overall architecture of the AGLoc++ system, illustrating the data flow and interaction between its core modules.
</div>

## Results

- **Accuracy**: < 0.15 m average localization error; < 3° angular error
- **Robustness**: > 95% success rate in challenging indoor environments
- **Throughput**: Real-time at 10 Hz
- **Resource Usage**: < 500 MB memory; < 30% CPU on Intel i7

## Tech Stack

- **Programming Languages**: C++17, Python 3.8+
- **Robotics Framework**: ROS2 Humble
- **Navigation System**: Nav2 Navigation Stack
- **Point Cloud Processing**: PCL (Point Cloud Library)
- **Mathematical Libraries**: Eigen3, GTSAM
- **Visualization**: RViz2, Matplotlib
- **Hardware Platform**: Agile X HUNTER SE, Hesai PandarQT64

## Next Steps

Finalize the **odometry-fused Monte Carlo tracking** module, enhance **automatic re-localization** strategies, and scale to broader multi-floor deployments with further performance optimizations and real-world validations.

## Project Team

- **Current Work**: Jiajie Zhang (zhangjj2023@shanghaitech.edu.cn)
- **Previous Work**: Fujing Xie (xiefj@shanghaitech.edu.cn)
- **Advisor**: Professor Sören Schwertfeger

## Related Resources

- **Original Paper**: [AGLoc: Robust Lifelong Indoor LiDAR Localization using the Area Graph](https://ieeexplore.ieee.org/abstract/document/10321673/)
- **Code Repository**: [GitHub Repository](https://github.com/jiajiezhang7/localization_using_area_graph)
<!-- - **Demo Video**: [Project Demo](https://youtu.be/demo_video) -->

---

_This project is supported by the MARS Lab at ShanghaiTech University and represents a key component of our ongoing research in mobile robotics._
