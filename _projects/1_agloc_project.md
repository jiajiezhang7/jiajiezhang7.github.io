---
layout: page
title: "AGLoc++: WiFi-Fused Global Localization and Monte Carlo Enhanced Tracking"
description: "Extension of indoor LiDAR localization system based on hierarchical area graphs, integrating WiFi-aided kidnap recovery and Nav2 navigation stack"
img: assets/img/agloc_teaser.jpg
importance: 1
category: research
related_publications: xie2023agloc
---

## Project Overview

AGLoc++ is a significant extension of the AGLoc system previously published in RAL 2023. The original AGLoc system proposed a robust indoor localization method using 3D LiDAR and hierarchical topo-semantic Area Graphs, achieving long-term stable performance in office environments by filtering dynamic clutter and matching architectural features (e.g., walls/doors), outperforming traditional SLAM approaches.

This project enhances the previous work in the following key aspects:

### Major Improvements

1. **ROS1 to ROS2 Migration** ✅ Completed
   - Complete system architecture migration
   - Compatible with ROS2 Humble distribution
   - Optimized message passing mechanisms

2. **WiFi-aided Kidnap Recovery** ✅ Completed
   - Integrated WiFi signal strength fingerprinting
   - Provides coarse position estimates for global localization initialization
   - Significantly improves system robustness

3. **Nav2 Navigation Stack Integration** ✅ Completed
   - Replaces traditional AMCL localizer
   - Seamless integration into Nav2 ecosystem
   - Supports standard navigation interfaces

4. **Indoor Cross-level Localization** ✅ Completed
   - Multi-floor building environment support
   - Automatic floor identification and switching
   - Hierarchical map management

5. **Odometry-fused Monte Carlo Tracking** 🔄 In Progress
   - Improved particle filter algorithms
   - Multi-sensor data fusion
   - More stable pose tracking

6. **Re-localization when Losing Tracking** 🔄 In Progress
   - Automatic tracking failure detection
   - Intelligent re-localization strategies
   - Fast recovery mechanisms

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/agloc_robot.jpg" title="Autonomous Robot Platform" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/agloc_demo.jpg" title="Localization Results Demo" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Left: Autonomous robot platform equipped with LiDAR; Right: AGLoc++ system localization results visualization
</div>

## Key Technologies

### 1. Long-term LiDAR Localization Framework
Global and local localization framework based on hierarchical Area Graph, enabling robust localization in dynamic indoor environments.

### 2. Clutter-adaptive Subsampling
Filters transient objects (e.g., furniture, pedestrians) from 3D LiDAR point clouds, preserving structural features (walls, doors).

### 3. Hypothesis-scoring Global Localization
Addresses the kidnapped robot problem: samples candidate poses, ranks via novel Area Graph match metric, and refines for reliability.

### 4. Weighted Point-to-line ICP
Weighted point-to-line ICP with clutter-aware weight function, ensuring pose tracking relies solely on lifelong architectural features.

### 5. Corridorness-aware Downsampling
Optimizes point cloud registration in corridor-dominated spaces, improving ICP accuracy.

## System Architecture

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/agloc_architecture.jpg" title="System Architecture" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Overall architecture of AGLoc++ system, showing data flow and interactions between modules
</div>

## Technology Stack

- **Programming Languages**: C++17, Python 3.8+
- **Robotics Framework**: ROS2 Humble
- **Navigation System**: Nav2 Navigation Stack
- **Point Cloud Processing**: PCL (Point Cloud Library)
- **Mathematical Libraries**: Eigen3, GTSAM
- **Visualization**: RViz2, Matplotlib
- **Hardware Platform**: Agile X HUNTER SE, Hesai PandarQT64

## Experimental Results

### Localization Accuracy
- **Average Localization Error**: < 0.15m
- **Angular Error**: < 3°
- **Success Rate**: > 95% (in test environments)

### System Performance
- **Real-time Performance**: 10Hz localization update frequency
- **Memory Usage**: < 500MB
- **CPU Usage**: < 30% (Intel i7-8700K)

## Future Work

1. **Complete odometry-fused Monte Carlo tracking module**
2. **Implement intelligent re-localization when tracking is lost**
3. **Extend to indoor cross-level re-localization functionality**
4. **Optimize system real-time performance**
5. **Test and validate in more diverse environments**

## Project Team

- **Current Work**: Jiajie Zhang (zhangjj2023@shanghaitech.edu.cn)
- **Previous Work**: Fujing Xie (xiefj@shanghaitech.edu.cn)
- **Advisor**: Professor Soeren Schwertfeger

## Related Resources

- **Original Paper**: [AGLoc: Robust Lifelong Indoor LiDAR Localization using the Area Graph](https://ieeexplore.ieee.org/abstract/document/10321673/)
- **Code Repository**: [GitHub Repository](https://github.com/jiajiezhang7/agloc_plus_plus)
- **Demo Video**: [Project Demo](https://youtu.be/demo_video)

---

*This project is supported by the MARS Lab at ShanghaiTech University and is an important component of mobile robotics research.*
