---
layout: page
title: SLAM with Vertical Plane Segmentation for Lifelong Indoor Mapping
description: RANSAC vertical-plane filtering of 3D LiDAR into clean 2D structural maps for lifelong indoor SLAM
img: assets/img/slam_teaser.jpg
importance: 4
category: research
related_publications: false
mermaid:
  enabled: true
  zoomable: true
---

<style>
.demo-video {
    width: 100%;
    height: 350px;
    object-fit: contain;
    background-color: #000;
}
.equal-height-images img {
    height: 300px;
    width: 100%;
    object-fit: cover;
}
</style>

<div class="row mt-3">
    <div class="col-sm-12">
        <video class="demo-video" autoplay muted loop controls playsinline preload="auto">
            <source src="{{ '/videos/slam_projects.mp4' | relative_url }}" type="video/mp4">
            Your browser does not support the video tag.
        </video>
        <div class="caption text-center mt-2">
            <strong>Demo</strong>: Real-time map building with vertical plane filtering.
        </div>
    </div>
</div>

## Abstract

Indoor maps degrade when people, chairs, and temporary clutter enter the scan and get baked into occupancy. This project inserts a real-time **vertical plane segmentation** stage before 2D SLAM: RANSAC extracts large structural surfaces from 3D LiDAR, drops non-vertical / transient geometry, projects the remainder to a LaserScan, and feeds Gmapping so the resulting map stays structure-consistent across runs.

## Contributions

- Implemented a ROS1 Noetic node that **voxel-downsamples → RANSAC plane segments → keeps vertical planes → projects to 2D LaserScan**.
- Showed that filtering transient objects before SLAM yields **cleaner structural maps** than raw-scan Gmapping on the same corridors.
- Validated the pipeline in **Gazebo** and in **real laboratory corridors** with moving / temporary obstacles.
- Sustained **10 Hz** cloud processing and **1 Hz** map updates within a modest CPU/memory budget.

## Method

Design choice: rather than learn a semantic filter, exploit the geometric prior that walls dominate lifelong indoor structure. Pipeline:

1. Voxel grid downsampling of the raw `/point_cloud`
2. Iterative RANSAC plane segmentation
3. Verticality test: keep wall-like planes, reject floors / clutter planes
4. Accumulate retained vertical planes and project to a 2D `/scan`
5. Run Gmapping on the filtered scan to produce a structural occupancy map

```mermaid
graph LR
    A[3D LiDAR<br/>Sensor] --> B(Raw Point Cloud<br/>/point_cloud)
    B --> C1

    subgraph CoreAlgo["Core: Vertical Plane Segmentation"]
        C1[1. Voxel Grid<br/>Downsampling]
        C2[2. Plane Seg<br/>RANSAC]
        C3{3. Vertical?}
        C4[4. Accumulate<br/>Vertical Planes]
        C5[5. Project to<br/>2D LaserScan]

        C1 --> C2 --> C3
        C3 -->|Yes| C4 --> C5
        C3 -->|No| C2
    end

    C5 --> D(Filtered 2D<br/>LaserScan /scan)
    D --> E[Gmapping<br/>SLAM]
    E --> F((Clean 2D<br/>Structural Map))

    classDef coreStyle fill:#ffe6f0,stroke:#ff1493,stroke-width:2px
    classDef outputStyle fill:#e6f3ff,stroke:#0066cc,stroke-width:2px
    classDef processStyle fill:#fff9e6,stroke:#ffa500,stroke-width:2px

    class C1,C2,C3,C4,C5 coreStyle
    class F outputStyle
    class A,B,D,E processStyle
```

<div class="caption">
    Raw 3D cloud → vertical plane filter (core) → filtered LaserScan → Gmapping → structural 2D map.
</div>

### Simulation and real-world validation

<div class="row equal-height-images">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/slam_simulation.jpg" title="Simulation Environment Test" class="rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/slam_real_world.jpg" title="Real-world Environment Test" class="rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Left: Gazebo simulation. Right: laboratory corridor deployment.
</div>

<div class="row equal-height-images">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/slam_original_map.jpg" title="Original SLAM Map" class="rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/slam_filtered_map.jpg" title="Map After Vertical Plane Segmentation" class="rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Real-world maps: cluttered baseline Gmapping (left) vs. vertical-plane-filtered structural map (right).
</div>

## Results

- **Processing**: 10 Hz point cloud processing; 1 Hz map updates
- **Resources**: &lt; 200 MB memory; &lt; 25% CPU (Intel i7-8700K)
- **Map quality** (reported): 95% wall detection; 80% transient noise reduction; consistent maps over multiple runs

Stack: C++14 / Python, ROS1 Noetic, PCL, Eigen3, Gmapping, Gazebo Classic.

## Failure Cases / Limitations

- **Non-vertical structure** (ramps, large furniture, glass walls) can be under-represented or missed by the verticality gate.
- Pipeline is **ROS1 / Gmapping**-centric; ROS2 migration and alternative 2D SLAM backends are unfinished.
- No semantic labels (wall vs. door vs. glass); multi-floor mapping is not yet supported.
- Numbers above are from project tests / defense materials, not a formal published benchmark.

## Project Team

- **Developer**: Jiajie Zhang (zhangjj2023@shanghaitech.edu.cn)
- **Advisor**: Professor Sören Schwertfeger

## Related Resources

- **Slides**: [SLAM Project Defense](/files/CS284_SLAM_Project_Defence.pdf)
- **Demo video**: [System Demonstration](/videos/slam_projects.mp4)
- **Code**: [cs284_slam_project](https://github.com/jiajiezhang7/cs284_slam_project)
