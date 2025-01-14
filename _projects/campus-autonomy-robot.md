---
title: "Campus Autonomy: Navigating the Future with Autonomous Indoor-Outdoor Delivery Vehicles"
excerpt: "Development of an autonomous delivery vehicle capable of navigating both indoor and outdoor environments within a campus setting.<br/><img src='/images/hunterSE.png'>"
collection: portfolio
---

## Project Overview

The "Campus Autonomy" project focuses on developing an autonomous delivery vehicle capable of navigating both indoor and outdoor environments within a campus setting. By assembling an Agile X HUNTER SE Ackermann model drive vehicle equipped with advanced sensors like Lidar and panoramic camera, the project aims to address the complex challenges of autonomous localization, path planning and navigation.

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

1. Introducing osmAG map format into the navigation stack
2. Replacing Global Planner with osmAG plug-in
3. Implementing Smac Hybrid A* algorithm for improved path planning
4. Customizing local cost map for real-time dynamic obstacle detection
5. Breaking through storage limits and environment constraints

## Project Team

* Yongqi Zhang (zhangyq12023@shanghaitech.edu.cn)
* Jiajie Zhang (zhangjj2023@shanghaitech.edu.cn)

<div style="text-align: center;">
    <img src="/images/robot_finished.jpg" alt="Robot" width="50%">
    <img src="/images/nav2_architecture.png" alt="Navigation Architecture" width="50%">
    <img src="/images/overall_bt_w_breakdown.png" alt="Behavior Tree" width="75%">
    <img src="/images/in_out.png" alt="Indoor-Outdoor Navigation" width="50%">
</div>
