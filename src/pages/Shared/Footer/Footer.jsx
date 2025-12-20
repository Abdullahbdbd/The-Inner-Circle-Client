import React from "react";
import { Link } from "react-router";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaGithub,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Logo from "../../../component/Logo/Logo";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300">
      {/* Upper Footer */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand Section */}
        <div className="space-y-6">
          <div className="flex items-center -ml-3">
            <span className="text-2xl font-black text-white tracking-tight">
              <Logo />
            </span>
          </div>
          <p className="text-sm leading-relaxed text-slate-400">
            A community-driven platform where wisdom meets experience. Share
            your life lessons and inspire the world to grow intentionally.
          </p>

          {/* 🌐 Social Links */}
          <div className="flex gap-4">
            <a
              href="https://facebook.com/"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center hover:bg-teal-500 hover:text-white transition-all duration-300"
            >
              <FaFacebookF />
            </a>

            <a
              href="https://x.com/"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center hover:bg-teal-500 hover:text-white transition-all duration-300"
            >
              <FaXTwitter />
            </a>

            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center hover:bg-teal-500 hover:text-white transition-all duration-300"
            >
              <FaLinkedinIn />
            </a>

            <a
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center hover:bg-teal-500 hover:text-white transition-all duration-300"
            >
              <FaGithub />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-bold text-lg mb-6 border-l-4 border-teal-500 pl-3">
            Explore
          </h3>
          <ul className="space-y-4 text-sm font-medium">
            <li>
              <Link to="/" className="hover:text-teal-400 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/public-lessons"
                className="hover:text-teal-400 transition-colors"
              >
                All Lessons
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-teal-400 transition-colors">
                Our Mission
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-teal-400 transition-colors">
                Top Contributors
              </Link>
            </li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-white font-bold text-lg mb-6 border-l-4 border-teal-500 pl-3">
            Popular Tones
          </h3>
          <ul className="space-y-4 text-sm font-medium">
            <li>
              <Link className="hover:text-teal-400 transition-colors">
                Inspirational
              </Link>
            </li>
            <li>
              <Link className="hover:text-teal-400 transition-colors">
                Resilience
              </Link>
            </li>
            <li>
              <Link className="hover:text-teal-400 transition-colors">
                Self-Growth
              </Link>
            </li>
            <li>
              <Link className="hover:text-teal-400 transition-colors">
                Wisdom
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-white font-bold text-lg mb-6 border-l-4 border-teal-500 pl-3">
            Contact Us
          </h3>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <FaMapMarkerAlt className="text-teal-500 mt-1" />
              <span>Dhaka, Bangladesh</span>
            </li>
            <li className="flex items-center gap-3">
              <FaEnvelope className="text-teal-500" />
              <span>support@lifelesson.com</span>
            </li>

            {/* Newsletter */}
            <li className="mt-6">
              <div className="p-1 bg-slate-800 rounded-xl flex">
                <input
                  type="email"
                  placeholder="Newsletter"
                  className="bg-transparent border-none outline-none px-4 py-2 w-full text-xs"
                />
                <button className="bg-gradient-to-r from-blue-600 via-teal-500 to-green-500 hover:opacity-90 text-white px-4 py-2 rounded-lg text-xs font-bold transition-all">
                  Join
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-slate-500 uppercase tracking-widest">
          <p>© 2025 LifeLesson. All Rights Reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
