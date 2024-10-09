import React, { useState, useEffect, useRef } from "react";

const SkillsRoadmap = () => {
  const circleRef = useRef<HTMLDivElement>(null);
  let circles = document.querySelectorAll(".circle0");

  const circleRef2 = useRef<HTMLDivElement>(null);
  let circles1 = document.querySelectorAll(".circle1");

  let random = Math.floor(Math.random() * 180);
  let random2 = Math.floor(Math.random() * 480);
  const mouseX = random;
  const mouseY = random2;
  for (let i = 0; i < circles.length; i++) {
    (circles[i] as HTMLElement).style.left = mouseX + "px";
    (circles[i] as HTMLElement).style.top = mouseY + "px";
    (circles[i] as HTMLElement).style.transition = "1s";
  }

  for (let i = 0; i < circles1.length; i++) {
    (circles1[i] as HTMLElement).style.left = mouseX + "px";
    (circles1[i] as HTMLElement).style.top = mouseY + "px";
    (circles1[i] as HTMLElement).style.transition = "1s";
  }
  // });
  let j = 0;
  if (circleRef.current) {
    circleRef.current.addEventListener("mouseout", function () {
      let random = Math.floor(Math.random() * 180 + 100);
      let random2 = Math.floor(Math.random() * 480 + 200);
      const mouseX = random;
      const mouseY = random2;
      (circles[j] as HTMLElement).style.left = mouseX + "px";
      (circles[j] as HTMLElement).style.top = mouseY + "px";
      (circles[j] as HTMLElement).style.transition = "1.25s";
      j++;
      if (j == circles.length) {
        j = 0;
      }
    });
  }

  let k = 0;
  if (circleRef2.current) {
    circleRef2.current.addEventListener("mouseout", function () {
      let random = Math.floor(Math.random() * 180 + 100);
      let random2 = Math.floor(Math.random() * 480 + 200);
      const mouseX = random;
      const mouseY = random2;
      (circles1[k] as HTMLElement).style.left = mouseX + "px";
      (circles1[k] as HTMLElement).style.top = mouseY + "px";
      (circles1[k] as HTMLElement).style.transition = "1.25s";
      k++;
      if (k == circles1.length) {
        k = 0;
      }
    });
  }

  var section = document.getElementsByTagName("section");
  var pointBtn = document.querySelectorAll(".pointWrap li");
  var sidebarPoint = document.querySelectorAll(".sidebarPoint li");
  var sidebar = document.getElementsByClassName("sidebar");
  var trigger = document.getElementById("trigger");
  var hambuger0 = document.getElementById("hambuger");
  var hambuger = document.getElementById("hambuger > span");
  var pageNum = 0;
  var totalNum = section.length;

  for (var i = 0; i < pointBtn.length; i++) {
    (function (idx) {
      (pointBtn[idx] as HTMLElement).onclick = function () {
        pageNum = idx;
        window.scrollTo({
          top: section[pageNum].offsetTop,
          behavior: "smooth",
        });
      };
    })(i);
  }

  for (var i = 0; i < sidebarPoint.length; i++) {
    (function (idx) {
      (sidebarPoint[idx] as HTMLElement).onclick = function () {
        (sidebar[0] as HTMLElement).style.display = "none";
        pageNum = idx;
        window.scrollTo({
          top: section[pageNum].offsetTop,
          behavior: "smooth",
        });
      };
      (sidebar[0] as HTMLElement).style.display = "block";
    })(i);
  }

  return (
    <section className="section0">
      <div className="first">
        <div className="mainline"></div>
        <ul className="point">
          {[...Array(7)].map((_, i) => (
            <li key={i}>
              <button
                className="points"
                style={{
                  position: "absolute",
                  top: 5,
                  left: `${i * 100}px`,
                }}
              ></button>
            </li>
          ))}
        </ul>
        <ul className="pointtext">
          {[
            "인터넷",
            "HTML",
            "CSS",
            "JAVASCRIPT",
            "GITHUB",
            "NPM",
            "VUEJS",
          ].map((skill, i) => (
            <li key={i}>
              <span>{skill}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="circleGroup" ref={circleRef}>
        {[
          "Java",
          "Javascript",
          "Vue JS",
          "Spring boot",
          "Spring MVC",
          "BootStrap",
          "vuetify",
          "SQL",
          "GIT HUB",
          "VSCODE",
          "CS",
        ].map((skill, i) => (
          <div key={i} id={`circle${i}`} className="circle0">
            <span>{skill}</span>
          </div>
        ))}
      </div>

      <div className="mainCircle">
        <div className="skills">
          my skills
          <br />
          road map
        </div>
        <div className="rotateCircle"></div>
      </div>

      <div className="right">
        <div className="circleGroup2" ref={circleRef2}>
          {[
            "Java",
            "Javascript",
            "Vue JS",
            "Spring boot",
            "Spring MVC",
            "BootStrap",
            "vuetify",
            "SQL",
            "Java",
            "Javascript",
            "Vue JS",
          ].map((skill, i) => (
            <div key={i} id={`circle${i}`} className="circle1">
              <span>{skill}</span>
            </div>
          ))}
        </div>
        <div className="loadMap">
          <div className="line"></div>
          <ul className="loadPoint">
            {[...Array(7)].map((_, i) => (
              <li key={i}></li>
            ))}
          </ul>
          <ul
            className="loadtext"
            style={{ fontSize: "15px", fontWeight: "bold" }}
          >
            {["HTML", "CSS", "JAVASCRIPT", "GITHUB", "NPM", "VUEJS"].map(
              (skill, i) => (
                <li key={i}>
                  <span>{skill}</span>
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default SkillsRoadmap;
