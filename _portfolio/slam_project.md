---
title: "SLAM with Vertical Plane Segmentation for Lifelong Indoor Mapping"
excerpt: "Development of a SLAM system with vertical plane segmentation for creating long-term indoor maps.<br/><img src='/images/slam-project/slam_project_teaser.png'>"
collection: portfolio
---

## Project Overview

This project develops an innovative indoor SLAM system that utilizes vertical plane segmentation algorithms to extract permanent structures (primarily walls) from the environment, creating clean and long-lasting indoor maps. The system automatically filters out temporary obstacles (such as chairs and trash bins), retaining only the building's permanent structures to provide reliable references for indoor navigation.

<div style="display: flex; flex-direction: column; gap: 20px; margin: 20px 0;">
    <div>
        <img src="/images/slam-project/original_map.png" alt="Original SLAM Map" style="width: 100%; height: auto;">
    </div>
    <div>
        <img src="/images/slam-project/filtered_map.png" alt="Map After Vertical Plane Segmentation" style="width: 100%; height: auto;">
    </div>
</div>

<div style="display: flex; justify-content: center; gap: 20px; margin: 20px 0; background-color: #e6f3ff; padding: 15px; border-radius: 8px;">
    <a href="/files/CS284_SLAM_Project_Defence.pdf" class="btn btn--primary" target="_blank">Download Project Slides (PDF)</a>
    <a href="/videos/slam_projects.mp4" class="btn btn--primary" target="_blank">Watch Demo Video</a>
</div>

## Core Technologies

* 3D LiDAR Point Cloud Processing
* RANSAC-based Vertical Plane Segmentation
* Point Cloud to LaserScan Projection
* ROS1 Noetic Framework
* Gmapping 2D SLAM Algorithm
* PCL (Point Cloud Library)

## System Architecture

The system integrates various hardware and software components:

* **Hardware**:
  - Simulation: Differential Drive Robot Model with Velodyne LiDAR
  - Real-world: Mobile Platform equipped with Hesai PandarQT LiDAR

* **Software**:
  - ROS1 Noetic Framework
  - Custom Vertical Plane Segmentation ROS Node
  - Pointcloud2laserscan Package for Point Cloud Projection
  - Gmapping Package for 2D SLAM
  - Gazebo Simulation Environment

## Key Features

1. **Vertical Plane Extraction**: Identify and extract vertical planes (mainly walls) from the environment
2. **Point Cloud Projection**: Project 3D point clouds onto horizontal plane to form 2D line segments
3. **Temporary Obstacle Filtering**: Automatically filter out non-permanent obstacles
4. **Clean Map Generation**: Create maps containing only permanent structures
5. **Real-time Processing**: Efficient implementation based on C++ and PCL library

## Workflow

<div style="display: flex; flex-direction: column; gap: 20px; margin: 20px 0;">
    <div>
        <img src="/images/slam-project/slam_pipeline_0.png" alt="SLAM Pipeline Part 1" style="width: 100%; height: auto;">
    </div>
    <div>
        <img src="/images/slam-project/slam_pipeline_2.png" alt="SLAM Pipeline Part 2" style="width: 100%; height: auto;">
    </div>
</div>

1. Acquire point cloud data from LiDAR
2. Perform vertical plane segmentation:
   - Voxel grid downsampling
   - Apply RANSAC algorithm to extract planes iteratively
   - Determine plane verticality and retain vertical plane point clouds
3. Project vertical plane point clouds onto horizontal plane to form line segments
4. Use Gmapping for line segment matching and registration to generate 2D grid maps

## Experimental Results

<div style="display: flex; justify-content: space-between; margin: 20px 0;">
    <div style="flex: 0 0 48%; background-color: #e6f3ff; padding: 15px; border-radius: 8px;">
        <img src="/images/slam-project/slam_simulation_test.png" alt="Simulation Environment Test" style="max-width: 100%; height: auto;">
    </div>
    <div style="flex: 0 0 48%; background-color: #e6f3ff; padding: 15px; border-radius: 8px;">
        <img src="/images/slam-project/slam_real_world_test.png" alt="Real-world Environment Test" style="max-width: 100%; height: auto;">
    </div>
</div>

### Simulation Experiments
- Built indoor environment in Gazebo with walls and temporary obstacles
- Successfully filtered out movable objects on the ground (e.g., cans, bottles)
- Generated clean maps containing only wall structures

### Real-world Testing
- Conducted tests in laboratory corridors with chairs and trash bins as obstacles
- Algorithm successfully identified and retained wall structures while filtering out temporary obstacles
- Achieved real-time processing and map building

## Applications

* Creation of long-term indoor maps
* Global path planning for indoor navigation
* Modeling of building permanent structures

## Project Member

* Jiajie Zhang (zhangjj2023@shanghaitech.edu.cn)

