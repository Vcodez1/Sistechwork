"use client";

import { useEffect, useState } from "react";
import ScrollSequence from "../components/ScrollSequence";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("login");

  useEffect(() => {
    // Mobile menu logic
    const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
    const nav = document.querySelector(".nav");

    const toggleMenu = () => {
      nav?.classList.toggle("active");
      mobileMenuBtn?.classList.toggle("active");
    };

    mobileMenuBtn?.addEventListener("click", toggleMenu);

    return () => {
      mobileMenuBtn?.removeEventListener("click", toggleMenu);
    };
  }, []);

  return (
    <div id="app">
      {/* Header */}
      <header className="header">
        <div className="container header-container">
          <a href="#" className="logo">
            <img src="/logo.png" alt="Sistechwork" className="logo-img" />
          </a>
          <nav className="nav">
            <ul className="nav-list">
              <li><a href="#products">Products</a></li>
              <li><a href="#solutions">Solutions</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#support">Support</a></li>
            </ul>
          </nav>
          <div className="header-actions">
            <button onClick={() => { setIsModalOpen(true); setActiveTab("login"); }} className="btn btn-ghost">Sign In</button>
            <a href="#" className="btn btn-primary">Book Demo</a>
          </div>
          <button className="mobile-menu-btn" aria-label="Toggle Menu">
            <span></span><span></span><span></span>
          </button>
        </div>
      </header>

      <main>
        {/* Integrating Scroll Sequence as a Featured Visual Section */}
        <section className="scroll-sequence-section">
          <ScrollSequence />
        </section>

        {/* Hero Section */}
        <section className="hero">
          <div className="container hero-container">
            <div className="hero-content">
              <h1 className="text-display-1 fade-in-up">Technology That Works Like a Human</h1>
              <p className="text-lead fade-in-up delay-1">We build intelligent solutions that help teams learn smarter,
                communicate faster, and run efficiently.</p>
              <div className="hero-btns fade-in-up delay-2">
                <a href="#products" className="btn btn-primary btn-lg">Explore Our Products</a>
                <a href="#" className="btn btn-outline btn-lg">Book a Free Demo</a>
              </div>
            </div>
            <div className="hero-visual fade-in-left delay-3">
              <div className="hero-spline-container">
                {/* @ts-ignore */}
                <spline-viewer url="https://prod.spline.design/S913VDgWuLtybWvC/scene.splinecode"></spline-viewer>
              </div>
            </div>
          </div>
        </section>

        {/* Product Overview */}
        <section id="products" className="section products-section">
          <div className="container">
            <div className="section-header text-center">
              <h2 className="text-display-2">Our Intelligent Products</h2>
              <p className="text-sub">Powerful tools designed to streamline your operations.</p>
            </div>

            <div className="grid grid-4 products-grid">
              {/* Product 1 */}
              <div className="card product-card">
                <div className="card-icon-wrapper">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                    strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <h3 className="card-title">HRM Portal</h3>
                <p className="card-desc">Efficient Human Resource Management automation.</p>
                <a href="#" className="link-arrow">Learn More &rarr;</a>
              </div>
              {/* Product 2 */}
              <div className="card product-card">
                <div className="card-icon-wrapper">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                    strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                  </svg>
                </div>
                <h3 className="card-title">Agile H</h3>
                <p className="card-desc">Project management for high-velocity teams.</p>
                <a href="#" className="link-arrow">Learn More &rarr;</a>
              </div>
              {/* Product 3 */}
              <div className="card product-card">
                <div className="card-icon-wrapper">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                    strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                    <line x1="8" y1="21" x2="16" y2="21"></line>
                    <line x1="12" y1="17" x2="12" y2="21"></line>
                  </svg>
                </div>
                <h3 className="card-title">Job Portal</h3>
                <p className="card-desc">Connect top talent with the best opportunities.</p>
                <a href="#" className="link-arrow">Learn More &rarr;</a>
              </div>
              {/* Product 4 */}
              <div className="card product-card">
                <div className="card-icon-wrapper">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                    strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path>
                    <path d="M22 12A10 10 0 0 0 12 2v10z"></path>
                  </svg>
                </div>
                <h3 className="card-title">Custom Data</h3>
                <p className="card-desc">Data analytics tailored to your business needs.</p>
                <a href="#" className="link-arrow">Learn More &rarr;</a>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us / Stats */}
        <section className="section stats-section bg-light">
          <div className="container">
            <div className="grid grid-2 stats-layout">
              <div className="stats-content">
                <h2 className="text-display-2">Why Choose Sistechwork?</h2>
                <p className="text-body">We empower businesses with cutting-edge technology designed for human efficiency. Our
                  solutions are built on a foundation of reliability, scalability, and deep understanding of enterprise
                  needs.</p>
                <ul className="check-list">
                  <li>Seamless Integration</li>
                  <li>Enhanced Communication</li>
                  <li>Automated Workflows</li>
                </ul>
              </div>
              <div className="stats-grid">
                <div className="stat-item">
                  <span className="stat-number">99.9%</span>
                  <span className="stat-label">Uptime Reliability</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">100%</span>
                  <span className="stat-label">Customer Satisfaction</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">+50%</span>
                  <span className="stat-label">Efficiency Boost</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">10M+</span>
                  <span className="stat-label">Users Supported</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="section testimonials-section">
          <div className="container text-center">
            <h2 className="text-display-2 mb-lg">What Our Clients Say</h2>
            <div className="grid grid-3 testimonials-grid">
              <div className="card testimonial-card">
                <p className="quote">"Sistechwork's HRM Portal transform our HR processes. It's incredibly intuitive and has
                  saved us hours of manual data entry."</p>
                <div className="author">
                  <div className="author-avatar" style={{ backgroundColor: "#E0E7FF", color: "#4F46E5" }}>JD</div>
                  <div className="author-info">
                    <strong>Jane Doe</strong>
                    <span>HR Director, TechCorp</span>
                  </div>
                </div>
              </div>
              <div className="card testimonial-card">
                <p className="quote">"The agility we gained using Agile H is unmatched. Our team communication has never been
                  better."</p>
                <div className="author">
                  <div className="author-avatar" style={{ backgroundColor: "#DCFCE7", color: "#166534" }}>MS</div>
                  <div className="author-info">
                    <strong>Mark Smith</strong>
                    <span>CTO, Innovate Inc</span>
                  </div>
                </div>
              </div>
              <div className="card testimonial-card">
                <p className="quote">"Support is fantastic. They really understand our business needs and deliver solutions
                  that work."</p>
                <div className="author">
                  <div className="author-avatar" style={{ backgroundColor: "#FEF3C7", color: "#D97706" }}>AL</div>
                  <div className="author-info">
                    <strong>Alice Lee</strong>
                    <span>Ops Manager, GlobalBiz</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="cta-section">
          <div className="container">
            <div className="cta-box">
              <h2 className="text-display-2 text-white">Transform Your Business Operations with Sistechwork</h2>
              <p className="text-lead text-white-opacity">Ready to simplify your tasks and accelerate growth?</p>
              <a href="#" className="btn btn-white btn-lg mt-md">Request a Demo</a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="grid grid-4 footer-grid">
            <div className="footer-col">
              <a href="#" className="logo mb-sm d-block">
                <img src="/logo.png" alt="Sistechwork" className="logo-img" style={{ height: "32px" }} />
              </a>
              <p className="text-small text-muted">Intelligent digital products designed for human needs.</p>
            </div>
            <div className="footer-col">
              <h4 className="footer-heading">Products</h4>
              <ul className="footer-links">
                <li><a href="#">HRM Portal</a></li>
                <li><a href="#">Agile H</a></li>
                <li><a href="#">Job Portal</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4 className="footer-heading">Company</h4>
              <ul className="footer-links">
                <li><a href="#">About Us</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Blog</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4 className="footer-heading">Support</h4>
              <ul className="footer-links">
                <li><a href="#">Help Center</a></li>
                <li><a href="#">Contact/Sales</a></li>
                <li><a href="#">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p className="text-small text-muted">&copy; 2024 Sistechwork. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      {isModalOpen && (
        <div id="auth-modal" className="modal">
          <div className="modal-content">
            <button onClick={() => setIsModalOpen(false)} className="close-modal">&times;</button>
            <div className="auth-tabs">
              <button
                className={`tab-btn ${activeTab === "login" ? "active" : ""}`}
                onClick={() => setActiveTab("login")}
              >
                Sign In
              </button>
              <button
                className={`tab-btn ${activeTab === "signup" ? "active" : ""}`}
                onClick={() => setActiveTab("signup")}
              >
                Sign Up
              </button>
            </div>

            {/* Login Form */}
            {activeTab === "login" && (
              <form id="login-form" className="auth-form active">
                <h3 className="text-display-2" style={{ fontSize: "1.5rem" }}>Welcome Back</h3>
                <p className="text-small text-muted mb-sm">Enter your credentials to access your account.</p>

                <div className="form-group">
                  <label htmlFor="login-email">Email Address</label>
                  <input type="email" id="login-email" required placeholder="name@company.com" />
                </div>
                <div className="form-group">
                  <label htmlFor="login-password">Password</label>
                  <input type="password" id="login-password" required placeholder="••••••••" />
                </div>
                <div className="form-actions">
                  <button type="submit" className="btn btn-primary full-width">Sign In</button>
                </div>
              </form>
            )}

            {/* Signup Form */}
            {activeTab === "signup" && (
              <form id="signup-form" className="auth-form active">
                <h3 className="text-display-2" style={{ fontSize: "1.5rem" }}>Create Account</h3>
                <p className="text-small text-muted mb-sm">Get started with Sistechwork today.</p>

                <div className="form-group">
                  <label htmlFor="signup-email">Email Address</label>
                  <input type="email" id="signup-email" required placeholder="name@company.com" />
                </div>
                <div className="form-group">
                  <label htmlFor="signup-password">Password</label>
                  <input type="password" id="signup-password" required placeholder="•••••••• (min 6 chars)" />
                </div>
                <div className="form-actions">
                  <button type="submit" className="btn btn-primary full-width">Create Account</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
