---
title: "Campus Autonomy: Navigating the Future with Autonomous Indoor-Outdoor Delivery Vehicles"
excerpt: "Development of an autonomous delivery vehicle capable of navigating both indoor and outdoor environments within a campus setting.<br/><img src='/images/campusautonomy-robot.png'>"
collection: portfolio
---

## Project Overview

The "Campus Autonomy" project focuses on developing an autonomous delivery vehicle capable of navigating both indoor and outdoor environments within a campus setting. By assembling an Agile X HUNTER SE Ackermann model drive vehicle equipped with advanced sensors like Lidar and panoramic camera, the project aims to address the complex challenges of autonomous localization, path planning and navigation.

<div style="display: flex; justify-content: space-between; margin: 20px 0;">
    <div style="flex: 0 0 48%;">
        <img src="/images/hunterSE.png" alt="Hunter SE Chassis" style="max-width: 100%; height: auto;">
    </div>
    <div style="flex: 0 0 48%;">
        <img src="/images/campusautonomy-robot.png" alt="Completed Autonomous Robot" style="max-width: 100%; height: auto;">
    </div>
</div>
<div style="display: flex; justify-content: center; gap: 20px; margin: 20px 0;">
    <a href="/files/CampusAutonomy_FinalReport.pdf" class="btn btn--primary" target="_blank">Download Final Report (PDF)</a>
    <a href="/videos/campusautonomy.mp4" class="btn btn--primary" target="_blank">Watch Demo Video</a>
</div>

## Key Technologies

* Agile X HUNTER SE vehicle platform
* Hesai PandarQT64 Lidar
* Insta360 Air panoramic camera
* ROS2 framework with Navigation2
* SLAM using Cartographer
* Smac hybrid A* planner
* MPPI controller

## System Architecture

The system integrates sophisticated hardware and software components:

* **Hardware**: 
  - Agile X HUNTER SE vehicle
  - Hesai PandarQT64 Lidar for environment perception
  - Insta360 Air panoramic camera for visual input
  - Odometer and IMU for precise movement tracking

* **Software**:
  - ROS2 framework
  - Navigation2 package for path planning
  - Cartographer for SLAM operations
  - Behavior trees for navigation strategy
  - Custom Nav2 plugins optimized for Ackermann steering

## Key Features

1. **Indoor-Outdoor Navigation**: Seamless transition between indoor and outdoor environments
2. **Advanced Path Planning**: Using Smac hybrid A* and MPPI controller
3. **Real-time Obstacle Avoidance**: Dynamic obstacle detection and path adjustment
4. **Modular Design**: Scalable architecture for future expansions

## Future Work

Future development will focus on:

1. Introducing osmAG map format into the navigation2 stack
2. Replacing Global Planner with osmAG Planner plug-in
3. Replacing osmAG Localizer with AMCL
3. Implementing Smac Hybrid A* algorithm for improved path planning
4. Customizing local cost map for real-time dynamic obstacle detection

## Project Team

* Jiajie Zhang (zhangjj2023@shanghaitech.edu.cn)
* Yongqi Zhang (zhangyq12023@shanghaitech.edu.cn)

<div style="display: flex; justify-content: space-between; margin: 20px 0;">
    <div style="flex: 0 0 48%;">
        <img src="/images/robot_finished.jpg" alt="Robot" style="max-width: 100%; height: auto;">
    </div>
    <div style="flex: 0 0 48%;">
        <img src="/images/hunter-se-rviz-visual.png" alt="Hunter SE RViz Visualization" style="max-width: 100%; height: auto;">
    </div>
</div>

<div style="text-align: center; margin: 20px 0;">
    <div style="max-width: 75%; margin: 0 auto;">
        <img src="/images/nav2_architecture.png" alt="Navigation Architecture" style="max-width: 100%; height: auto;">
    </div>
</div>
