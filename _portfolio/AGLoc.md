---
title: "AGLoc++: WiFi-Fused Global Localization and Monte Carlo Enhanced Tracking in Hierarchical Area Graph"
excerpt: "Extending previous work of Robust Lifelong Indoor LiDAR Localization using the Area Graph, published on RAL 2023."
collection: portfolio
---

## Project Overview

AGLoc ([link](https://ieeexplore.ieee.org/abstract/document/10321673/)) proposes a robust indoor localization method using 3D LiDAR and hierarchical topo-semantic Area Graphs, achieving long-term stable performance in office environments by filtering dynamic clutter and matching architectural features (e.g., walls/doors), outperforming traditional SLAM approaches. This Project enhance the previous work in the following aspects:
1. Port from ROS1 to ROS2 (Done)
2. Implement WiFi-aided Kidnap Recovery (Done)
3. Integrated with Nav2 stack by replacing AMCL (Done)
4. indoor cross-level localizaiton (Done)
5. Implement Odom-fused Monte Carlo Tracking (Doing)
6. Re-localize when losing tracking (Doing)


<div style="display: flex; justify-content: space-between; margin: 20px 0;">
    <div style="flex: 0 0 48%;">
        <img src="/images/AGLoc/campusautonomy-robot.png" alt="Autonomous Robot" style="max-width: 100%; height: auto;">
    </div>
    <div style="flex: 0 0 48%;">
        <img src="/images/AGLoc/AGLoc_demo01.png" alt="Localization Result" style="max-width: 100%; height: auto;">
    </div>
</div>
<div style="display: flex; justify-content: center; gap: 20px; margin: 20px 0; background-color: #e6f3ff; padding: 15px; border-radius: 8px;">
    <a href="/files/AGLoc-RAL-paper.pdf" class="btn btn--primary" target="_blank">Download Previous Paper(PDF)</a>
    <a href="/videos/AGLoc-posetracking-cutted.mp4" class="btn btn--primary" target="_blank">Watch Demo Video</a>
</div>

## Key Technologies
1. Long-term LiDAR localization framework based on the hierarchical Area Graph, enabling robust global and local localization in dynamic indoor environments.
2. Clutter-adaptive subsampling to filter transient objects (e.g., furniture, pedestrians) from 3D LiDAR point clouds, preserving structural features (walls, doors).
3. Hypothesis-scoring global localization to address the kidnapped robot problem: Candidate poses are sampled, ranked via a novel Area Graph match metric, and refined for reliability.
4. Weighted point-to-line ICP with a clutter-aware weight function, ensuring pose tracking relies solely on lifelong architectural features (e.g., walls, passages).
5. Corridorness-aware downsampling to optimize point cloud registration in corridor-dominated spaces, improving ICP accuracy.

## System Architecture
<div style="display: flex; justify-content: center; margin: 20px 0;">
    <img src="/images/AGLoc/AGLoc-system-archi.png" alt="System Architecture" style="max-width: 100%; height: auto;">
</div>

## Future Work

Future development will focus on:

1. Implement Odom-fused Monte Carlo Tracking 
2. Re-localize when losing tracking
3. indoor cross-level re-localization 

## Project Team

* **Current Work**: Jiajie Zhang (zhangjj2023@shanghaitech.edu.cn)
* **Previous Work**: Fujing Xie (xiefj@shanghaitech.edu.cn)
