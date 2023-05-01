import "./herosec.css";
import SubscriptionCard from "../cult/SubscriptionCard";
import styles from "../cult/Cult.module.css";
import styled from "styled-components";
import React, { useState, useEffect, useRef } from "react";
// import { useEffect, useState } from "react";
// import { CSSTransition } from "react-transition-group";

import { Link } from "react-router-dom";

export const HeroSec = () => {
  const [seconds, setSeconds] = useState(0);
  const firstRender = useRef(true);

  const SpanD = styled.span`
    display: inline-block;
    transform: translateY(-40px);
    animation: slidedown 3.2s infinite;
    color: #00abe9;
  `;

  useEffect(() => {
    if (firstRender.current === true) {
      firstRender.current = false;
      return;
    }

    const interval = setInterval(() => {
      setSeconds((seconds) => {
        if (seconds === 2) {
          return 0;
        } else {
          return seconds + 1;
        }
      });
    }, 3200);
    return () => clearInterval(interval);
  });

  return (
    <>
      <div className="hero_section container">
        <div className="left_section">
          <h2>
            Hustle For{" "}
            <SpanD>
              {seconds === 0 ? "Muscle " : seconds === 1 ? "Health " : "Growth "}
            </SpanD>{" "}
          </h2>
          <p>
            {`Transform your body and mind with our innovative fitness programs designed to help you reach your goals and unlock your full potential. 
            Push yourself to new limits with our challenging and engaging fitness classes led by experienced trainers who are dedicated to helping you succeed.`}
          </p>
        </div>
        <div className="right_section">
          <video
            autoPlay
            muted
            loop
            src="https://vod-progressive.akamaized.net/exp=1680742244~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F3065%2F17%2F440326651%2F1924581254.mp4~hmac=072d453f0acc6a1b209198ca029d7660975f2e8d1a4f736d12fbae0fc5d85475/vimeo-prod-skyfire-std-us/01/3065/17/440326651/1924581254.mp4"
            // src="https://cdn-images.cure.fit/www-curefit-com/video/upload/w_800,q_auto:eco/vc_auto/video/vm/32b91e40-0e2c-477b-a2ad-88d437d0f07f.mp4"
          ></video>
        </div>
      </div>
      <div className={styles.maxWidthContainer}>
        <div className={styles.blueWrapper}>
          <div className={styles.fixWidthContainer}>
            <div className={styles.insideTitle}>FitLife</div>
            <div className={styles.insideSubitle}>
              Unlimited access to all FitLife centers and gyms.
            </div>
            <h3>
              <span className={styles.line}>
                <div></div>
              </span>
              <span>ENJOY THE BENEFITS OF</span>
              <span className={styles.line}>
                <div></div>
              </span>
            </h3>
            <div className={styles.benifits}>
              <div>
                <p>Buy Now</p>
                <span>start anytime</span>
              </div>
              <div>
                <p>Book</p>
                <span>unlimited Classes anytime</span>
              </div>
              <div>
                <p>Safest</p>
                <span>gyms In Town</span>
              </div>
              <div>
                <p>Visit</p>
                <span>the gym at your convenience</span>
              </div>
            </div>
            <div className={styles.heading}>Choose Your Subscription</div>
            <SubscriptionCard />
          </div>
        </div>
      </div>
      <div class="banner_section container">
        <Link to="/">
          <img
            src="https://img.freepik.com/premium-vector/modern-gym-schedule-template-with-flat-design_23-2147933899.jpg"
            alt="Sale banner"
          />
        </Link>
      </div>
    </>
  );
};
