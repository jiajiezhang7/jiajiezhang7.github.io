---
layout: page
title: Towards Safer Navigation - Reward Shaping with Prior Topographic Knowledge
description: PPO navigation with continuous safety-gradient reward shaping from prior topographic maps
img: assets/img/rl_nav.jpg
importance: 5
category: research
related_publications: false
---

<style>
.equal-height-images-contain img {
    height: 300px;
    width: 100%;
    object-fit: contain;
}
</style>

## Abstract

Modular navigation stacks are reliable but rigid; end-to-end RL is flexible but tends to clip obstacles. This project trains Habitat agents with **safety-aware reward shaping** built from prior topographic knowledge: a continuous safety gradient (Penalty Zone near obstacles, Safety Zone that preserves buffer) replaces a binary collision penalty, so PPO policies must trade off goal progress against clearance rather than only avoiding terminal crashes.

## Contributions

- Defined a **continuous safety-gradient reward** from prior map topography (Penalty Zone / Safety Zone) instead of sparse collision termination.
- Trained **PPO** agents with multi-modal inputs (RGB, depth, GPS/compass) in Habitat on **MP3D** and **Gibson**.
- Added **Path Safety** (average distance to nearest obstacle) alongside Success and SPL as an evaluation axis.
- Reported **+6 cm** Path Safety over baseline while remaining competitive on Success / SPL, with training converging in ~5M steps.

## Method

Prior topographic knowledge is converted into a spatially continuous shaping signal: near-obstacle cells form a Penalty Zone; a surrounding Safety Zone rewards maintaining a human-like buffer. The agent therefore receives dense feedback about proximity, not only a binary crash. Policy learning uses PPO; perception/control consume RGB, depth, and GPS/compass. Architecture components used in training include ResNet18 and LSTM (PyTorch / Habitat-Sim / Habitat-Lab).

<div class="row equal-height-images-contain">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/method_overview.jpg" title="Method Overview" class="rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/reward_shaping.jpg" title="Reward Shaping Mechanism" class="rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Left: method overview. Right: Penalty Zone / Safety Zone reward shaping from prior map knowledge.
</div>

## Results

Evaluated in Habitat on MP3D and Gibson:

- **Path Safety**: +6 cm average clearance over baseline
- **Success / SPL**: competitive with baseline while improving safety
- **Training**: converges in ~5M steps (≈10 hours); stable across runs; improved sample efficiency relative to the baseline setup

<div class="row equal-height-images-contain">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/navigation_results.jpg" title="Navigation Performance Results" class="rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/performance_analysis.jpg" title="Performance Analysis" class="rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Path Safety improves while traditional Success / SPL remain competitive with the baseline.
</div>

Exact absolute Success / SPL tables are in the project report and slides; this page keeps only numbers stated in the prior write-up.

## Failure Cases / Limitations

- Evaluation is **simulation-only** (Habitat); real-robot transfer is unfinished.
- Reward shaping assumes access to **prior topographic maps**; fully unknown or dynamic layouts are outside the current setup.
- Moving obstacles and multi-agent coordination are not covered; scaling and further reward refinement remain open.

## Project Team

- **Lead researcher**: Jiajie Zhang (zhangjj2023@shanghaitech.edu.cn)
- **Advisor**: Professor Sören Schwertfeger
- **Institution**: MARS Lab, ShanghaiTech University

## Related Resources

- **Slides**: [Deep Learning Project Defense](/files/CS280_DL_Project_Defence.pdf)
- **Report**: [Detailed Project Report](/files/DeepLearing_Project_Report.pdf)
- **Code**: [habitat-lab-ppo-comment](https://github.com/jiajiezhang7/habitat-lab-ppo-comment)
