---
layout: page
title: "Automating Solar Panel Installation: A LiDAR-based Perception System"
description: "Real-time dual-LiDAR detection of racks, posts, and panels with 3D pose for robotic solar assembly"
img: assets/img/industrial_teaser.jpg
importance: 6
category: research
related_publications: false
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
        <video class="demo-video" controls preload="auto" playsinline>
            <source src="{{ site.baseurl }}/videos/industrial_demo.mp4" type="video/mp4">
            Your browser does not support the video tag.
        </video>
        <div class="caption text-center mt-2">
            <strong>Demo</strong>: Real-time LiDAR detection of solar panel structures on-site.
        </div>
    </div>
</div>

## Abstract

Large-scale solar installation needs repeatable 3D measurements of racks, posts, and panels—center, roll/pitch/yaw, post positions and inclinations—faster and more consistently than manual surveying. This project builds a ROS + PCL pipeline that fuses dual LiDARs, segments planes and vertical posts with RANSAC, and publishes actionable pose parameters at 10 Hz for the assembly controller, including alerts when post angles are unsafe.

## Contributions

- Built a **dual-LiDAR fusion** perception node (denoise, passthrough, downsample) producing a unified working cloud.
- Used **RANSAC plane models** to remove ground and fit panel surfaces (center + RPY), and **line models with geometric priors** to locate vertical posts.
- Published custom ROS messages at **10 Hz** with 3D positions, inclinations, and unsafe-angle alerts for the control system.
- Validated on a **real installation-site ROS bag** from an industrial partner (panel + all 8 posts detected in the reported frame).

## Method

End-to-end loop at 10 Hz:

1. **Sensor fusion & filtering** — align dual-LiDAR clouds; statistical / passthrough denoise; downsample for latency.
2. **Plane & line segmentation** — RANSAC planes remove ground and fit the panel surface; line models locate vertical posts using structural priors.
3. **Parameter extraction & publishing** — compute center coordinates, roll/pitch/yaw, post positions/angles; publish custom messages; raise alerts for unsafe post inclinations.

Geometric RANSAC is preferred over learned detectors here because the structures are highly regular, labeled industrial data is scarce, and the control loop needs deterministic latency.

<style>
.equal-height-images img {
    height: 300px;
    width: 100%;
    object-fit: cover;
}
</style>

<div class="row equal-height-images">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/industrial_setup.jpg" title="System Visualization in RViz" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/perception_results.jpg" title="Perception Results" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Left: RViz visualization of detected structures. Right: real-time detection / classification view.
</div>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/system_architecture.jpg" title="System Architecture" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Dual-LiDAR → filter/segment → parameter extraction → control interface.
</div>

## Results

- **Data**: ROS bag from an active installation site with dual LiDARs (industrial partner).
- **Latency**: end-to-end processing at **10 Hz**.
- **Detection**: panel and all **8 vertical posts** identified in the reported evaluation frame.
- **Pose example** (one frame): panel inclination **(36.7°, -2.9°)**; post position **(-8.75, -1.36, -0.09)** with near-zero inclination.

Stack: ROS, PCL, C++, Eigen, RViz.

## Failure Cases / Limitations

- Results are demonstrated on partner bags / selected frames; a large multi-site quantitative benchmark (precision/recall, pose RMSE distribution) is not reported here.
- Geometric priors assume relatively regular rack/post layouts; heavily occluded or atypical structures can break line/plane fits.
- Closed-loop robotic installation (perception → manipulator) is the intended consumer; this page covers the perception side only.

## Project Team

- **Developers**: Dong Lingzheng, Jiajie Zhang (zhangjj2023@shanghaitech.edu.cn)

## Related Resources

- **Report**: [Real-time Object Detection From LiDAR Point Clouds](/files/industrial_perception_report.pdf)
