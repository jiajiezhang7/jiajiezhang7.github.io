---
title: "Real-time Object Detection From LiDAR Point Clouds"
excerpt: "A LiDAR-based perception system for automated solar panel installation, featuring real-time detection of solar racks and support structures.<br/><img src='/images/1_origin_scene.png'>"
collection: portfolio
---

## Project Overview

This project introduces an innovative solution leveraging Light Detection and Ranging (LiDAR) technology for real-time object detection during solar panel installation. The system is designed to enhance the automation of solar panel deployment in desert regions, addressing challenges of low manual efficiency and high operational costs.

## Key Objectives

* Real-time detection of solar rack poses
* Determination of support structure positions and heights
* Assessment of solar panel tilt angles
* Integration with robotic installation systems

## Technical Framework

Our system implements a comprehensive pipeline for processing LiDAR data:

1. **Data Acquisition and Preprocessing**
   * Reading geographical coordinates from YAML maps
   * Subscribing to base link poses
   * Coordinate transformation for support rods
   * Point cloud fusion from dual LiDAR sensors

2. **Perception Pipeline**
   * Statistical removal and PassThrough filtering for noise reduction
   * Ground plane segmentation using Plane model
   * Solar panel fitting and pose estimation
   * Rod detection using Line model segmentation
   * Inclination degree computation with safety alerts

3. **Output and Visualization**
   * Custom message publishing at 10HzPortfolio
   * Real-time visualization in RViz
   * Integration with robot URDF
   * Marker-based visualization of key points

## Implementation Details

The system processes point cloud data through several key stages:

1. **Point Cloud Processing**
   * Outlier removal and downsampling
   * Ground plane removal
   * Panel surface fitting
   * Support rod detection

2. **Parameter Extraction**
   * Ground plane parameters
   * Panel center coordinates
   * Roll, pitch, and yaw angles
   * Rod top point coordinates

3. **Safety Monitoring**
   * Real-time inclination monitoring
   * Installation failure risk assessment
   * Alert system for unsafe conditions

## Experimental Results

Our system has been tested with real-world data collected by Bolight Company:

* Dataset: "trans_2023-12-08-11-31-27.bag"
* Dual LiDAR setup with distinct frame IDs:
  * Left radar: "lidar1_link"
  * Right radar: "lidar2_link"

The experimental results demonstrate successful:
* Point cloud filtering and processing
* Solar panel detection and pose estimation
* Support rod identification
* Real-time system integration

## Project Team

* Dong Lingzheng (donglzh@shanghaitech.edu.cn)
* Zhang Jiajie (zhangjj2023@shanghaitech.edu.cn)

## Demo Video

<video width="100%" controls>
  <source src="/videos/MoMa_Project_Demo.mp4" type="video/mp4">
</video>

<div style="text-align: center;">
    <img src="/images/PipeLine.png" alt="System Pipeline" width="700">
    <img src="/images/pc_filtered.png" alt="Filtered Point Cloud" width="700">
    <img src="/images/pc_panel.png" alt="Detected Solar Panel" width="700">
    <img src="/images/pc_rods.png" alt="Detected Support Rods" width="700">
    <img src="/images/detected_pc.png" alt="Complete Detection Results" width="700">
    <img src="/images/custom_msg.png" alt="Custom Message Output" width="700">
</div>
