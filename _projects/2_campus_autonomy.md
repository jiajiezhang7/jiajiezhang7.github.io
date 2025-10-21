---
layout: page
title: Campus Autonomy - Autonomous Indoor-Outdoor Delivery Vehicle
description: Development of an autonomous delivery vehicle capable of navigating both indoor and outdoor environments within a campus setting
img: assets/img/campus-autonomy-robot/campusautonomy-robot.jpg
importance: 2
category: research
related_publications: false
mermaid:
  enabled: true
  zoomable: true
---

## Motivation

Campus logistics require a single vehicle to navigate open outdoor paths and complex indoor corridors seamlessly. The core challenges are robust scene switching, safe real-time avoidance, and reliable navigation across diverse conditions. This project targets these challenges to enable unified, end-to-end campus delivery.

## Contributions

- Built a campus delivery platform on **Agile X HUNTER SE** with integrated **Hesai PandarQT64** and panoramic vision.
- Established **dual-environment navigation** with GPS-aided outdoor and LiDAR-based indoor localization.
- Integrated **ROS2 Nav2** with **Cartographer** for mapping, planning, and control.
- Demonstrated **real-time dynamic obstacle avoidance** and robust path re-planning.

<style>
.equal-height-images img {
    height: 300px;
    width: 100%;
    object-fit: cover;
}
</style>

<div class="row equal-height-images">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/hunter_chassis.jpg" title="Hunter SE Chassis" class="rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/completed_robot.jpg" title="Completed Autonomous Robot" class="rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    From a bare chassis to a fully equipped autonomous delivery robot, ready for the challenges of a dynamic campus.
</div>

## System Overview

The platform is equipped with a rugged base, 64-line LiDAR, panoramic RGB camera, and inertial/odometry sensors to provide reliable perception across indoor/outdoor conditions.

The software stack leverages **ROS2 + Nav2** for planning and control, with **Google Cartographer** for SLAM. Real-time perception supports dynamic obstacle avoidance and continuous re-planning for safe navigation in crowded scenes.

## Key Capabilities

- **Dual-environment navigation** with seamless switching between GPS-aided outdoor and LiDAR-based indoor localization.
- **Real-time obstacle avoidance** with dynamic re-planning for safe navigation in crowded environments.

## System Architecture

The system integrates sophisticated hardware and software components:

```mermaid
graph LR
    subgraph HW["🤖 Hardware Platform"]
        A[Hunter SE Robot<br/>Ackermann 4-Wheel]
        B[Hesai 3D LiDAR]
        C[IMU Sensor]
    end

    subgraph Perception["👁️ Perception Processing"]
        D[Point Cloud Filter<br/>PCL Filters]
        E[3D to 2D<br/>LaserScan]
        F[Sensor Fusion<br/>EKF Localization]
    end

    subgraph Mapping["🗺️ Mapping & Localization"]
        G[SLAM Mapping<br/>Cartographer]
        H[AMCL Localization]
        I[Area Graph<br/>Semantic Map]
    end

    subgraph Navigation["🧭 Navigation Planning"]
        J[Global Planning<br/>SMAC Planner]
        K[Local Control<br/>DWB Controller]
        L[Costmaps<br/>Obstacle Detection]
    end

    subgraph Control["⚡ Motion Control"]
        M[Velocity Command<br/>cmd_vel]
    end

    A --> F
    B --> D --> E
    C --> F

    E --> G
    E --> H
    E --> L

    G --> H
    H --> J
    I --> J

    L --> J
    J --> K
    L --> K

    K --> M --> A

    F -.-> Navigation

    classDef hw fill:#ffcccc,stroke:#ff0000,stroke-width:2px
    classDef perc fill:#d4edda,stroke:#28a745,stroke-width:2px
    classDef map fill:#cce5ff,stroke:#0066cc,stroke-width:2px
    classDef nav fill:#fff3cd,stroke:#ffc107,stroke-width:2px
    classDef ctrl fill:#f8d7da,stroke:#dc3545,stroke-width:2px

    class A,B,C hw
    class D,E,F perc
    class G,H,I map
    class J,K,L nav
    class M ctrl
```

<div class="caption">
    Interactive system architecture diagram showing the data flow from hardware sensors through perception, mapping, navigation planning to motion control.
</div>

## Tech Stack

- **Programming Languages**: C++17, Python 3.8+
- **Robotics Framework**: ROS2 Humble
- **Navigation**: Navigation2 (Nav2) stack
- **SLAM Algorithm**: Google Cartographer
- **Point Cloud Processing**: PCL (Point Cloud Library)
- **Computer Vision**: OpenCV, ROS2 Image Pipeline
- **Hardware Interface**: ROS2 device drivers
- **Simulation**: Gazebo Classic

## Results

- **Localization Accuracy**: ±0.2 m (indoor)
- **Goal Reaching**: 95% success rate
- **Collision Safety**: 100% collision-free in tests
- **Throughput**: 20 Hz sensor processing
- **Endurance**: 4+ hours continuous operation
- **Payload**: Up to 10 kg

## Next Steps

Integrate **osmAG** map format with Nav2 plugins for lifelong mapping and accuracy improvements, explore **multi-robot coordination** for fleet operations, and strengthen robustness under varied weather and lighting conditions.

## Project Team

- **Lead Developer**: Jiajie Zhang (zhangjj2023@shanghaitech.edu.cn)
- **Co-developer**: Yongqi Zhang (zhangyq12023@shanghaitech.edu.cn)
- **Advisor**: Professor Sören Schwertfeger

## Related Resources

- **Project Report**: [Campus Autonomy Final Report](/files/CampusAutonomy_FinalReport.pdf)
- **Demo Video**: [System Demonstration](/videos/campusautonomy.mp4)
- **Code Repository**: [GitHub Repository](https://github.com/jiajiezhang7/campus-autonomy-course-project)

---

_This project successfully demonstrates the practical application of modern autonomous navigation technologies in a real-world campus, marking a significant step forward for service robotics and autonomous delivery._
