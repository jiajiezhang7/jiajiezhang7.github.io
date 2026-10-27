---
layout: page
title: "AGLoc++: WiFi-Fused Global Localization and Monte Carlo Enhanced Tracking"
description: "Indoor LiDAR localization on hierarchical area graphs with WiFi kidnap recovery and Nav2 drop-in tracking"
img: assets/img/agloc_teaser.jpg
importance: 2
category: research
related_publications: xie2023agloc
---

<style>
.hero-media {
    position: relative;
    aspect-ratio: 16 / 9;
    background: #0e1319;
    border-radius: 12px;
    overflow: hidden;
}
.hero-video {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    background-color: #000;
}
.hero-badge {
    position: absolute;
    top: 12px;
    left: 12px;
    padding: 6px 9px;
    border-radius: 6px;
    background: rgba(14, 19, 25, 0.72);
    color: #fff;
    font: 600 12px/1 monospace;
    letter-spacing: 0.06em;
    z-index: 2;
}
.equal-height-images-contain img {
    height: 300px;
    width: 100%;
    object-fit: contain;
}
</style>

<div class="row mt-3">
    <div class="col-md-6 mb-3 mb-md-0">
        <div class="hero-media">
            <video class="hero-video" id="agloc-hero-sim" autoplay muted loop playsinline preload="auto"
                   aria-label="AGLoc++ global localization and tracking in a simulated indoor scene">
                <source src="{{ site.baseurl }}/assets/video/AGLoc_Simulation_demo.mp4" type="video/mp4">
                Your browser does not support the video tag.
            </video>
            <span class="hero-badge">Simulation</span>
        </div>
        <div class="caption text-center mt-2">
            <strong>Simulation</strong>: AGLoc++ global localization and tracking in a simulated indoor scene.
        </div>
    </div>
    <div class="col-md-6">
        <div class="hero-media">
            <video class="hero-video" id="agloc-hero-real" autoplay muted loop playsinline preload="auto"
                   aria-label="AGLoc++ running on a LiDAR-equipped mobile platform indoors">
                <source src="{{ site.baseurl }}/assets/video/AGLoc_RealEx_demo.mp4" type="video/mp4">
                Your browser does not support the video tag.
            </video>
            <span class="hero-badge">Real world</span>
        </div>
        <div class="caption text-center mt-2">
            <strong>Real world</strong>: AGLoc++ running on a LiDAR-equipped mobile platform indoors.
        </div>
    </div>
</div>

<script>
(function () {
  if (!(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches)) return;
  ['agloc-hero-sim', 'agloc-hero-real'].forEach(function (id) {
    var v = document.getElementById(id);
    if (!v) return;
    v.removeAttribute('autoplay');
    v.pause();
    v.controls = true;
  });
})();
</script>

## Abstract

Lifelong indoor localization fails when maps drift under movable clutter, when kidnap events wipe the pose estimate, and when multi-floor buildings require map switches mid-run. AGLoc++ extends area-graph LiDAR localization with WiFi fingerprint coarse recovery and Nav2-compatible tracking: permanent structure is preferred over transient geometry, candidate poses are scored for global re-localization, and weighted point-to-line ICP keeps the robot locked after recovery.

## Contributions

- Migrated the full localization stack to **ROS2 Humble** with a cleaned module boundary between global localization, tracking, and Nav2.
- Added **WiFi fingerprint mapping** as a coarse prior for kidnap recovery before LiDAR hypothesis scoring.
- Exposed the tracker as a **drop-in AMCL replacement** inside the Nav2 localization plugin interface.
- Implemented **multi-floor awareness**: automatic floor identification and map switching on the area-graph hierarchy.
- Designed an **odometry-fused Monte Carlo tracking** module for cluttered corridors (**in progress**; not yet finalized).

<div class="row equal-height-images-contain">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/agloc_robot.jpg" title="Autonomous Robot Platform" class="rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/agloc_demo.jpg" title="Localization Results Demo" class="rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Left: Agile X HUNTER SE with Hesai PandarQT64. Right: AGLoc++ pose estimate overlaid on the indoor map.
</div>

## Method

Transient objects are filtered from the 3D LiDAR cloud so matching focuses on permanent structure (walls, fixed furniture footprints). **Hypothesis-scoring global localization** samples and ranks candidate poses against the area graph; the winning pose seeds **weighted point-to-line ICP** for continuous tracking. WiFi fingerprints provide a coarse region prior under kidnap, reducing the search volume before LiDAR scoring. The tracker is wired into Nav2 so planning and control consume the same `/amcl_pose`-style interface.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/agloc_architecture.jpg" title="System Architecture" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Module data flow: LiDAR / WiFi inputs → global localization & tracking → Nav2 consumers.
</div>

## Results

Reported operating numbers from the current AGLoc++ builds:

- **Accuracy**: &lt; 0.15 m average localization error; &lt; 3° angular error
- **Robustness**: &gt; 95% success rate in the tested challenging indoor scenes
- **Throughput**: real-time at **10 Hz**
- **Resource usage**: &lt; 500 MB memory; &lt; 30% CPU on Intel i7

Platform used for demos: Agile X HUNTER SE + Hesai PandarQT64.

## Failure Cases / Limitations

- **Odometry-fused Monte Carlo tracking** is designed but unfinished; current robustness still depends primarily on ICP after WiFi/LiDAR recovery.
- Automatic re-localization strategies under severe kidnap and long corridor aliasing need more hardening.
- Multi-floor switching works in the tested buildings; broader deployments and long-horizon drift under heavy layout change are not yet fully validated.

## Project Team

- **Current work**: Jiajie Zhang (zhangjj2023@shanghaitech.edu.cn)
- **Previous work**: Fujing Xie (xiefj@shanghaitech.edu.cn)
- **Advisor**: Professor Sören Schwertfeger

## Related Resources

- **Original paper**: [AGLoc: Robust Lifelong Indoor LiDAR Localization using the Area Graph](https://ieeexplore.ieee.org/abstract/document/10321673/)
- **Code**: [localization_using_area_graph](https://github.com/jiajiezhang7/localization_using_area_graph)
