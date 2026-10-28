---
layout: page
title: Campus Autonomy - Autonomous Indoor-Outdoor Delivery Vehicle
description: Unified campus delivery stack with GPS outdoor / LiDAR indoor localization and Nav2 re-planning
img: assets/img/campus-autonomy-robot/campusautonomy-robot.jpg
importance: 3
category: research
related_publications: false
mermaid:
  enabled: true
  zoomable: true
---

<style>
.campus-hero {
    align-items: center;
}
.campus-hero-copy p {
    margin-bottom: 0.85rem;
}
.campus-hero-copy ul {
    margin-bottom: 0;
    padding-left: 1.15rem;
}
.campus-hero-copy li + li {
    margin-top: 0.45rem;
}
.campus-hero-stage {
    position: relative;
    width: min(100%, calc(min(70vh, 640px) * 9 / 16));
    max-height: min(70vh, 640px);
    aspect-ratio: 9 / 16;
    margin-left: auto;
    margin-right: auto;
    background: #0e1319;
    border-radius: 12px;
    overflow: hidden;
}
.campus-hero-video {
    position: absolute;
    inset: 0;
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    background: #0e1319;
}
.equal-height-images img {
    height: 300px;
    width: 100%;
    object-fit: cover;
}
@media (min-width: 768px) {
    .campus-hero-stage {
        margin-left: auto;
        margin-right: 0;
    }
}
@media (max-width: 767.98px) {
    .campus-hero-copy {
        margin-top: 0.25rem;
    }
}
</style>

<div class="row campus-hero mt-3">
    <div class="col-12 col-md-5 order-2 order-md-1 campus-hero-copy">
        <p>Campus logistics needs one vehicle that can leave open outdoor paths, enter indoor corridors, and keep moving under pedestrians and temporary obstacles. This stack runs on an AgileX Hunter SE: scene-switched localization, Cartographer mapping, and Nav2 planning that keeps re-routing around people.</p>
        <ul>
            <li>Integrated <strong>Hesai PandarQT64</strong>, panoramic RGB, IMU/odometry on an Ackermann <strong>Hunter SE</strong> chassis into a ROS2 Humble vehicle.</li>
            <li>Split localization by domain: <strong>GPS-aided outdoor</strong> vs <strong>LiDAR-based indoor</strong>, with scene switching for dual-environment runs.</li>
            <li>Wired <strong>Google Cartographer</strong> for mapping and <strong>Nav2</strong> (SMAC global planner + DWB local controller + layered costmaps) for planning and control.</li>
            <li>Demonstrated <strong>real-time dynamic obstacle avoidance</strong> with path re-planning in crowded campus scenes.</li>
        </ul>
    </div>
    <div class="col-12 col-md-7 order-1 order-md-2">
        <div class="campus-hero-stage">
            <video class="campus-hero-video" id="campus-hero-video" autoplay muted loop playsinline preload="auto" aria-label="Indoor and outdoor delivery runs on a single Hunter SE platform">
                <source src="{{ site.baseurl }}/videos/campusautonomy.mp4" type="video/mp4">
                Your browser does not support the video tag.
            </video>
        </div>
        <div class="caption">
            <strong>Demo</strong>: Indoor/outdoor delivery runs on a single Hunter SE platform.
        </div>
    </div>
</div>

<script>
(function () {
  var v = document.getElementById('campus-hero-video');
  if (v && window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) {
    v.removeAttribute('autoplay');
    v.pause();
    v.controls = true;
  }
})();
</script>

<div class="row equal-height-images">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/hunter_chassis.jpg" title="Hunter SE Chassis" class="rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/completed_robot.jpg" title="Completed Autonomous Robot" class="rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Left: bare Hunter SE chassis. Right: completed delivery robot with LiDAR, cameras, and compute.
</div>

## Method

Hardware: Ackermann 4-wheel Hunter SE, 64-line 3D LiDAR, panoramic RGB, IMU. Perception downsamples and filters the cloud (PCL), projects 3D → 2D LaserScan for 2D planners, and fuses IMU/odometry with an EKF. Mapping uses Cartographer; indoor pose tracking uses AMCL (with an Area Graph semantic map available as a planning prior). Navigation uses SMAC globally and DWB locally against obstacle costmaps; `cmd_vel` closes the loop on the chassis.

```mermaid
graph LR
    subgraph HW["Hardware Platform"]
        A[Hunter SE Robot<br/>Ackermann 4-Wheel]
        B[Hesai 3D LiDAR]
        C[IMU Sensor]
    end

    subgraph Perception["Perception Processing"]
        D[Point Cloud Filter<br/>PCL Filters]
        E[3D to 2D<br/>LaserScan]
        F[Sensor Fusion<br/>EKF Localization]
    end

    subgraph Mapping["Mapping & Localization"]
        G[SLAM Mapping<br/>Cartographer]
        H[AMCL Localization]
        I[Area Graph<br/>Semantic Map]
    end

    subgraph Navigation["Navigation Planning"]
        J[Global Planning<br/>SMAC Planner]
        K[Local Control<br/>DWB Controller]
        L[Costmaps<br/>Obstacle Detection]
    end

    subgraph Control["Motion Control"]
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
    Sensor → perception → mapping/localization → Nav2 planning → chassis command.
</div>

## Results

Measured / claimed operating envelope from project tests:

- **Indoor localization**: ±0.2 m
- **Goal reaching**: 95% success rate
- **Collision safety**: 100% collision-free in the reported test set
- **Sensor processing**: 20 Hz
- **Endurance**: 4+ hours continuous operation
- **Payload**: up to 10 kg

## Failure Cases / Limitations

- **osmAG** map format is not yet integrated with Nav2 plugins; lifelong map updates and area-graph-native planning remain unfinished.
- Dual-environment switching is demonstrated, but robustness under varied weather and lighting is not fully characterized.
- Multi-robot / fleet coordination is out of scope for the current single-vehicle stack.

## Project Team

- **Lead developer**: Jiajie Zhang (zhangjj2023@shanghaitech.edu.cn)
- **Co-developer**: Yongqi Zhang (zhangyq12023@shanghaitech.edu.cn)
- **Advisor**: Professor Sören Schwertfeger

## Related Resources

- **Report**: [Campus Autonomy Final Report](/files/CampusAutonomy_FinalReport.pdf)
- **Code**: [campus-autonomy-course-project](https://github.com/jiajiezhang7/campus-autonomy-course-project)
