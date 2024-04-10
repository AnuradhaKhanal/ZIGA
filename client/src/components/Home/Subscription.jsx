import React from "react";
import "./SubStyling.css";

const Subscription = () => {
  return (
    <section class="pricing-plans">
      <div class="pricing-card basic">
        <div class="heading">
          <h4>BASIC</h4>
          <p>for small websites or blogs</p>
        </div>
        <p class="price">
          $2
          <sub>/month</sub>
        </p>
        <ul class="features">
          <li>
            <i class="fa-solid fa-check"></i>
            <strong>1 domain</strong> name
          </li>
          <li>
            <i class="fa-solid fa-check"></i>
            <strong>10 GB</strong> of disk space
          </li>
          <li>
            <i class="fa-solid fa-check"></i>
            <strong>100GB </strong>of bandwidth
          </li>
          <li>
            <i class="fa-solid fa-check"></i>
            <strong>1 MySQL</strong> database
          </li>
          <li>
            <i class="fa-solid fa-check"></i>
            <strong>5 email</strong> accounts
          </li>
          <li>
            <i class="fa-solid fa-check"></i>
            <strong>cPanel</strong> control panel
          </li>
          <li>
            <i class="fa-solid fa-check"></i>
            <strong>Free SSL</strong> certificate
          </li>
          <li>
            <i class="fa-solid fa-check"></i>
            <strong>24/7</strong> support
          </li>
        </ul>
        <a href="https://payment.page/demo/" target="_blank" rel="noreferrer">
          <button class="cta-btn">SELECT</button>
        </a>
      </div>
      <div class="pricing-card standard">
        <div class="heading">
          <h4>STANDARD</h4>
          <p>for medium-sized businesses</p>
        </div>
        <p class="price">
          $5
          <sub>/month</sub>
        </p>
        <ul class="features">
          <li>
            <i class="fa-solid fa-check"></i>
            <strong>Unlimited</strong> domain name
          </li>
          <li>
            <i class="fa-solid fa-check"></i>
            <strong>50 GB</strong> of disk space
          </li>
          <li>
            <i class="fa-solid fa-check"></i>
            <strong>500GB </strong>of bandwidth
          </li>
          <li>
            <i class="fa-solid fa-check"></i>
            <strong>10 MySQL</strong> database
          </li>
          <li>
            <i class="fa-solid fa-check"></i>
            <strong>50 email</strong> accounts
          </li>
          <li>
            <i class="fa-solid fa-check"></i>
            <strong>cPanel</strong> control panel
          </li>
          <li>
            <i class="fa-solid fa-check"></i>
            <strong>Free SSL</strong> certificate
          </li>
          <li>
            <i class="fa-solid fa-check"></i>
            <strong>24/7</strong> support
          </li>
        </ul>
        <a href="https://payment.page/demo/" target="_blank" rel="noreferrer">
          <button class="cta-btn">SELECT</button>
        </a>
      </div>
      <div class="pricing-card premium">
        <div class="heading">
          <h4>PREMIUM</h4>
          <p>for small businesses</p>
        </div>
        <p class="price">
          $10
          <sub>/month</sub>
        </p>
        <ul class="features">
          <li>
            <i class="fa-solid fa-check"></i>
            <strong>Unlimited</strong> domain name
          </li>
          <li>
            <i class="fa-solid fa-check"></i>
            <strong>100 GB</strong> of disk space
          </li>
          <li>
            <i class="fa-solid fa-check"></i>
            <strong>1TB </strong>of bandwidth
          </li>
          <li>
            <i class="fa-solid fa-check"></i>
            <strong>Unlimited MySQL</strong> database
          </li>
          <li>
            <i class="fa-solid fa-check"></i>
            <strong>Unlimited email</strong> accounts
          </li>
          <li>
            <i class="fa-solid fa-check"></i>
            <strong>cPanel</strong> control panel
          </li>
          <li>
            <i class="fa-solid fa-check"></i>
            <strong>Free SSL</strong> certificate
          </li>
          <li>
            <i class="fa-solid fa-check"></i>
            <strong>24/7 priority</strong> support
          </li>
          <li>
            <i class="fa-solid fa-check"></i>
            <strong>Advanced</strong> security features
          </li>
        </ul>
        <a href="https://payment.page/demo/" target="_blank" rel="noreferrer">
          <button class="cta-btn">SELECT</button>
        </a>
      </div>
    </section>
  );
};

export default Subscription;
