---
layout: page
title: SLAM with Vertical Plane Segmentation for Lifelong Indoor Mapping
description: Development of a SLAM system with vertical plane segmentation for creating long-term indoor maps
img: assets/img/slam_teaser.jpg
importance: 3
category: research
related_publications: false
---

## Project Overview

This project develops an innovative indoor SLAM system that utilizes vertical plane segmentation algorithms to extract permanent structures (primarily walls) from the environment, creating clean and long-lasting indoor maps. The system automatically filters out temporary obstacles (such as chairs and trash bins), retaining only the building's permanent structures to provide reliable references for indoor navigation.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/slam_original_map.jpg" title="Original SLAM Map" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/slam_filtered_map.jpg" title="Map After Vertical Plane Segmentation" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Left: Original SLAM map with temporary obstacles; Right: Clean map after vertical plane segmentation filtering
</div>

## Core Technologies

### 1. 3D LiDAR Point Cloud Processing
- High-resolution 3D environment perception
- Real-time point cloud acquisition and processing
- Efficient data structures for large-scale point clouds

### 2. RANSAC-based Vertical Plane Segmentation
- Iterative plane extraction from point clouds
- Robust estimation in the presence of noise and outliers
- Automatic determination of plane verticality

### 3. Point Cloud to LaserScan Projection
- 3D to 2D projection for traditional SLAM compatibility
- Preservation of structural information during dimensionality reduction
- Optimized projection algorithms for real-time performance

## System Architecture

The system integrates various hardware and software components:

### Hardware Components
- **Simulation**: Differential Drive Robot Model with Velodyne LiDAR
- **Real-world**: Mobile Platform equipped with Hesai PandarQT LiDAR

### Software Stack
- **Framework**: ROS1 Noetic
- **Custom Node**: Vertical Plane Segmentation ROS Node
- **Projection**: Pointcloud2laserscan Package
- **SLAM**: Gmapping Package for 2D SLAM
- **Point Cloud Library**: PCL for 3D processing
- **Simulation**: Gazebo Environment

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/slam_pipeline_1.jpg" title="SLAM Pipeline Part 1" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/slam_pipeline_2.jpg" title="SLAM Pipeline Part 2" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Complete SLAM processing pipeline showing point cloud processing and map generation stages
</div>

## Key Features

### 1. Vertical Plane Extraction
- Identify and extract vertical planes (mainly walls) from the environment
- Robust plane detection using RANSAC algorithm
- Filtering based on plane orientation and size

### 2. Point Cloud Projection
- Project 3D point clouds onto horizontal plane to form 2D line segments
- Preserve geometric relationships during projection
- Maintain real-time processing capabilities

### 3. Temporary Obstacle Filtering
- Automatically filter out non-permanent obstacles
- Distinguish between structural and movable elements
- Create clean maps for long-term navigation

### 4. Clean Map Generation
- Generate maps containing only permanent structures
- Reduce map complexity and storage requirements
- Improve localization reliability

### 5. Real-time Processing
- Efficient implementation based on C++ and PCL library
- Optimized algorithms for real-time performance
- Low computational overhead

## Workflow

1. **Point Cloud Acquisition**: Acquire point cloud data from LiDAR sensor
2. **Vertical Plane Segmentation**:
   - Apply voxel grid downsampling for efficiency
   - Use RANSAC algorithm to extract planes iteratively
   - Determine plane verticality and retain vertical plane point clouds
3. **Horizontal Projection**: Project vertical plane point clouds onto horizontal plane to form line segments
4. **Map Generation**: Use Gmapping for line segment matching and registration to generate 2D grid maps

## Experimental Results

### Simulation Experiments
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/slam_simulation.jpg" title="Simulation Environment Test" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/slam_real_world.jpg" title="Real-world Environment Test" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Left: Simulation testing in Gazebo environment; Right: Real-world testing in laboratory corridors
</div>

- Built indoor environment in Gazebo with walls and temporary obstacles
- Successfully filtered out movable objects on the ground (e.g., cans, bottles)
- Generated clean maps containing only wall structures

### Real-world Testing
- Conducted tests in laboratory corridors with chairs and trash bins as obstacles
- Algorithm successfully identified and retained wall structures while filtering out temporary obstacles
- Achieved real-time processing and map building

## Technology Stack

- **Programming Languages**: C++14, Python 3.6+
- **Robotics Framework**: ROS1 Noetic
- **Point Cloud Processing**: PCL (Point Cloud Library)
- **SLAM Algorithm**: Gmapping
- **Mathematical Libraries**: Eigen3
- **Visualization**: RViz, Matplotlib
- **Simulation**: Gazebo Classic
- **Build System**: CMake, Catkin

## Performance Metrics

### Processing Performance
- **Point Cloud Processing Rate**: 10Hz
- **Map Update Frequency**: 1Hz
- **Memory Usage**: < 200MB
- **CPU Usage**: < 25% (Intel i7-8700K)

### Map Quality
- **Structural Accuracy**: 95% wall detection rate
- **Noise Reduction**: 80% reduction in temporary obstacles
- **Map Consistency**: Stable maps over multiple runs

## Applications

- **Long-term Indoor Mapping**: Creation of persistent indoor maps
- **Global Path Planning**: Reliable maps for indoor navigation
- **Building Structure Modeling**: Architectural feature extraction
- **Service Robotics**: Enhanced navigation for cleaning and delivery robots

## Future Enhancements

1. **Multi-floor Support**: Extend to multi-level building mapping
2. **Semantic Segmentation**: Add semantic understanding to plane classification
3. **Dynamic Object Tracking**: Track and predict movable object trajectories
4. **Map Merging**: Combine maps from multiple robots
5. **ROS2 Migration**: Port system to ROS2 for improved performance

## Project Team

- **Developer**: Jiajie Zhang (zhangjj2023@shanghaitech.edu.cn)
- **Advisor**: Professor Soeren Schwertfeger

## Related Resources

- **Project Slides**: [SLAM Project Defense](../files/CS284_SLAM_Project_Defence.pdf)
- **Demo Video**: [System Demonstration](../videos/slam_projects.mp4)
- **Code Repository**: [GitHub Repository](https://github.com/jiajiezhang7/slam_vertical_segmentation)

---

*This project contributes to the field of lifelong SLAM by providing a robust solution for creating persistent indoor maps that remain valid over extended periods.*