---
layout: page
title: Campus Autonomy - Autonomous Indoor-Outdoor Delivery Vehicle
description: Development of an autonomous delivery vehicle capable of navigating both indoor and outdoor environments within a campus setting
img: assets/img/campus_robot.jpg
importance: 2
category: research
related_publications: false
---

## Project Overview

The "Campus Autonomy" project focuses on developing an autonomous delivery vehicle capable of navigating both indoor and outdoor environments within a campus setting. By assembling an Agile X HUNTER SE Ackermann model drive vehicle equipped with advanced sensors like LiDAR and panoramic camera, the project aims to address the complex challenges of autonomous localization, path planning, and navigation.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/hunter_chassis.jpg" title="Hunter SE Chassis" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/completed_robot.jpg" title="Completed Autonomous Robot" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Left: Agile X HUNTER SE vehicle chassis; Right: Completed autonomous delivery robot with full sensor suite
</div>

## Key Technologies

### Hardware Platform
- **Vehicle Platform**: Agile X HUNTER SE Ackermann drive vehicle
- **LiDAR**: Hesai PandarQT64 for high-precision environment perception
- **Vision System**: Insta360 Air panoramic camera for 360° visual input
- **Navigation Sensors**: Odometer and IMU for precise movement tracking

### Software Stack
- **Framework**: ROS2 with Navigation2 package
- **SLAM**: Cartographer for simultaneous localization and mapping
- **Path Planning**: Global and local planners for optimal route generation
- **Obstacle Avoidance**: Real-time dynamic obstacle detection and avoidance

## System Architecture

The system integrates sophisticated hardware and software components:

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/nav2_architecture.jpg" title="Navigation Architecture" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    ROS2 Navigation2 system architecture showing the integration of perception, planning, and control modules
</div>

## Key Features

### 1. Dual Environment Navigation
- **Indoor Navigation**: Precise localization in structured environments
- **Outdoor Navigation**: GPS-aided navigation with obstacle avoidance
- **Seamless Transition**: Automatic switching between indoor and outdoor modes

### 2. Real-time Obstacle Avoidance
- Dynamic obstacle detection using LiDAR point clouds
- Adaptive path re-planning for moving obstacles
- Safety-first approach with emergency stop capabilities

### 3. Modular Design
- Scalable architecture for future sensor additions
- Plugin-based navigation components
- Easy configuration and parameter tuning

## Technology Stack

- **Programming Languages**: C++17, Python 3.8+
- **Robotics Framework**: ROS2 Humble
- **Navigation**: Navigation2 (Nav2) stack
- **SLAM Algorithm**: Google Cartographer
- **Point Cloud Processing**: PCL (Point Cloud Library)
- **Computer Vision**: OpenCV, ROS2 Image Pipeline
- **Hardware Interface**: ROS2 device drivers
- **Simulation**: Gazebo Classic

## Experimental Results

### Navigation Performance
- **Localization Accuracy**: ±0.2m in indoor environments
- **Path Planning Efficiency**: 95% success rate in reaching destinations
- **Obstacle Avoidance**: 100% collision-free navigation in test scenarios

### System Metrics
- **Real-time Performance**: 20Hz sensor processing
- **Battery Life**: 4+ hours continuous operation
- **Payload Capacity**: Up to 10kg delivery capacity

## Implementation Highlights

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/robot_testing.jpg" title="Robot Field Testing" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/rviz_visualization.jpg" title="RViz Visualization" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Left: Field testing of the autonomous delivery robot; Right: Real-time visualization in RViz2
</div>

## Future Work

Future development will focus on:

1. **osmAG Map Integration**: Introducing osmAG map format into the Navigation2 stack
2. **Custom Global Planner**: Replacing default global planner with osmAG Planner plugin
3. **Advanced Localization**: Replacing AMCL with osmAG Localizer for improved accuracy
4. **Multi-robot Coordination**: Enabling fleet management capabilities
5. **Weather Adaptation**: Robust operation in various weather conditions

## Project Team

- **Lead Developer**: Jiajie Zhang (zhangjj2023@shanghaitech.edu.cn)
- **Co-developer**: Yongqi Zhang (zhangyq12023@shanghaitech.edu.cn)
- **Advisor**: Professor Sören Schwertfeger

## Related Resources

- **Project Report**: [Campus Autonomy Final Report](../files/CampusAutonomy_FinalReport.pdf)
- **Demo Video**: [System Demonstration](../videos/campusautonomy.mp4)
- **Code Repository**: [GitHub Repository](https://github.com/jiajiezhang7/campus_autonomy)

---

*This project demonstrates the practical application of autonomous navigation technologies in real-world campus environments, contributing to the advancement of service robotics and autonomous delivery systems.*