---
layout: archive
title: "CV"
permalink: /cv/
author_profile: true
redirect_from:
  - /resume
---

{% include base_path %}

## Education

* **M.S. in Computer Science and Technology** <span style="float: right;">2023-Present</span>  
  ShanghaiTech University
* **B.S. in Automation** <span style="float: right;">2019-2023</span>  
  Zhengzhou University

## Technical Skills

* **Programming Languages & Tools**
  * C++ / Python
  * ROS1 & ROS2
  * PyTorch
  * Cursor & Windsurf

* **Robotics Expertise**
  * Navigation & Path Planning
  * Perception & Localization
  * Motion Planning & Control
  * SLAM & Mapping

## Publications

<ul>{% for post in site.publications reversed %}
  {% include archive-single-cv.html %}
{% endfor %}</ul>

## Teaching

<ul>{% for post in site.teaching reversed %}
  {% include archive-single-cv.html %}
{% endfor %}</ul>
