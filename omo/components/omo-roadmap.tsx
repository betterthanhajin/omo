import { circle } from "framer-motion/client";
import React, { useState, useEffect, useRef } from "react";

const SkillsRoadmap = () => {
  const circleRef = useRef<HTMLDivElement>(null);
  let circles = document.querySelectorAll(".circle0");

  const circleRef2 = useRef<HTMLDivElement>(null);
  let circles1 = document.querySelectorAll(".circle1");

  const circleRect = circleRef.current?.getBoundingClientRect();
  console.log(circleRect?.top);
  if (circleRect && circleRect.top) {
    let random = Math.floor(Math.random() * circleRect.right);
    let random2 = Math.floor(Math.random() * circleRect.top);
    const mouseX = random;
    const mouseY = random2;

    for (let i = 0; i < circles.length; i++) {
      (circles[i] as HTMLElement).style.left = mouseX + "px";
      (circles[i] as HTMLElement).style.top = mouseY + "px";
      (circles[i] as HTMLElement).style.transition = "1s";
    }

    for (let i = 0; i < circles1.length; i++) {
      (circles1[i] as HTMLElement).style.left = Math.random() * mouseX + "px";
      (circles1[i] as HTMLElement).style.top = Math.random() * mouseY + "px";
      (circles1[i] as HTMLElement).style.transition = "1s";
    }

    let j = 0;
    if (circleRef.current) {
      circleRef.current.addEventListener("mouseover", function () {
        for (let i = 0; i < circles.length; i++) {
          (circles[i] as HTMLElement).style.left = mouseX + "px";
          (circles[i] as HTMLElement).style.top = mouseY + "px";
          (circles[i] as HTMLElement).style.transition = "1s";
        }
      });

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
  var pageNum = 0;

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
    <section className="w-full h-full flex flex-col gap-20">
      <ul className="w-[600px] sticky h-[10%] border-b-[#dcaa71] border-b-4">
        {["인터넷", "HTML", "CSS", "JAVASCRIPT", "GITHUB", "GITHUB"].map(
          (skill, i) => (
            <li key={i}>
              <button
                className="points"
                style={{
                  position: "absolute",
                  top: 85,
                  left: `${i * 100}px`,
                }}
              >
                {" "}
                <span className="text-xs w-8 inline-block mt-4">{skill}</span>
              </button>
            </li>
          )
        )}
      </ul>

      <div className="flex flex-row">
        <div ref={circleRef}>
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
        <div className="rotateCircle w-40 h-40 justify-center">
          <div className="rotateTitle">
            my skills
            <br />
            road map
          </div>
        </div>
        <div ref={circleRef2}>
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
      </div>

      <ul className="w-full sticky h-[10%] border-b-[#dcaa71] border-b-4">
        {["인터넷", "HTML", "CSS", "JAVASCRIPT", "GITHUB", "NPM"].map(
          (skill, i) => (
            <li
              key={i}
              style={{
                position: "absolute",
                bottom: 10,
                display: "inline-block",
              }}
            >
              <button
                className="points"
                style={{
                  position: "absolute",
                  right: `${i * -100}px`,
                }}
              >
                {" "}
                <span className="text-xs w-8 inline-block">{skill}</span>
              </button>
            </li>
          )
        )}
      </ul>
    </section>
  );
};

export default SkillsRoadmap;
