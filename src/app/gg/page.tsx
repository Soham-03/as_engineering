
"use client";

import { useState } from "react";
import { ArrowRight, Menu, X, Instagram, Zap, BarChart3, CreditCard, Package, Palette, CheckCircle, Star, Users, Globe, Shield, Smartphone, Clock, Brain, Database, Settings, TrendingUp, Award, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const BuiltInAILandingPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("pro");

  return (
    <div className="relative bg-black">
      {/* Hero Section */}
      <div className="relative min-h-screen overflow-hidden bg-black">
        {/* Gradient background with grain effect */}
        <div className="flex flex-col items-end absolute -right-60 -top-10 blur-xl z-0 ">
          <div className="h-[10rem] rounded-full w-[60rem] z-1 bg-gradient-to-b blur-[6rem] from-purple-600 to-sky-600"></div>
          <div className="h-[10rem] rounded-full w-[90rem] z-1 bg-gradient-to-b blur-[6rem] from-pink-900 to-yellow-400"></div>
          <div className="h-[10rem] rounded-full w-[60rem] z-1 bg-gradient-to-b blur-[6rem] from-yellow-600 to-sky-500"></div>
        </div>
        <div className="absolute inset-0 z-0 bg-noise opacity-30"></div>

        {/* Content container */}
        <div className="relative z-10">
          {/* Navigation */}
          <nav className="container mx-auto flex items-center justify-between px-4 py-4 mt-6">
            <div className="flex items-center">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                <Zap className="h-5 w-5" />
              </div>
              <span className="ml-2 text-xl font-bold text-white">builtIn AI</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <div className="flex items-center space-x-6">
                <div className="flex items-center text-sm text-gray-300 hover:text-white cursor-pointer">
                  <span>Features</span>
                </div>
                <div className="flex items-center text-sm text-gray-300 hover:text-white cursor-pointer">
                  <span>Templates</span>
                </div>
                <div className="flex items-center text-sm text-gray-300 hover:text-white cursor-pointer">
                  <span>Pricing</span>
                </div>
                <div className="flex items-center text-sm text-gray-300 hover:text-white cursor-pointer">
                  <span>How it Works</span>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button className="h-12 rounded-full border border-gray-600 px-6 text-base font-medium text-white hover:bg-white/10">
                  Login
                </button>
                <button className="h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-6 text-base font-medium text-white hover:from-purple-600 hover:to-pink-600">
                  Get Started
                </button>
              </div>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Toggle menu</span>
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-white" />
              ) : (
                <Menu className="h-6 w-6 text-white" />
              )}
            </button>
          </nav>

          {/* Mobile Navigation Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ y: "-100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-100%" }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 z-50 flex flex-col p-4 bg-black/95 md:hidden"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                      <Zap className="h-5 w-5" />
                    </div>
                    <span className="ml-2 text-xl font-bold text-white">
                      builtIn AI
                    </span>
                  </div>
                  <button onClick={() => setMobileMenuOpen(false)}>
                    <X className="h-6 w-6 text-white" />
                  </button>
                </div>
                <div className="mt-8 flex flex-col space-y-6">
                  <div className="flex items-center justify-between border-b border-gray-800 pb-2 text-lg text-white">
                    <span>Features</span>
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                  </div>
                  <div className="flex items-center justify-between border-b border-gray-800 pb-2 text-lg text-white">
                    <span>Templates</span>
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                  </div>
                  <div className="flex items-center justify-between border-b border-gray-800 pb-2 text-lg text-white">
                    <span>Pricing</span>
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                  </div>
                  <div className="flex items-center justify-between border-b border-gray-800 pb-2 text-lg text-white">
                    <span>How it Works</span>
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                  </div>
                  <div className="pt-4">
                    <button className="w-full h-12 rounded-full border border-gray-700 text-white hover:bg-white/10">
                      Login
                    </button>
                  </div>
                  <button className="h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-8 text-base font-medium text-white hover:from-purple-600 hover:to-pink-600">
                    Get Started
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Badge */}
          <div className="mx-auto mt-6 flex max-w-fit items-center justify-center space-x-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm">
            <Instagram className="h-4 w-4 text-pink-400" />
            <span className="text-sm font-medium text-white">
              Transform your Instagram into a professional website
            </span>
            <ArrowRight className="h-4 w-4 text-white" />
          </div>

          {/* Hero section */}
          <div className="container mx-auto mt-12 px-4 text-center">
            <h1 className="mx-auto max-w-5xl text-5xl font-bold leading-tight text-white md:text-6xl lg:text-7xl">
              AI-Powered Websites for 
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> Instagram Businesses</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-300">
              Just enter your Instagram username and watch our AI build a complete e-commerce website with your products, images, pricing, and analytics — all in minutes, not months.
            </p>
            
            {/* Feature highlights */}
            <div className="mx-auto mt-8 grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-4">
              <div className="flex items-center space-x-2 rounded-lg bg-white/5 p-3 backdrop-blur-sm">
                <div className="text-purple-400">
                  <Instagram className="h-5 w-5" />
                </div>
                <span className="text-sm text-white">Instagram Sync</span>
              </div>
              <div className="flex items-center space-x-2 rounded-lg bg-white/5 p-3 backdrop-blur-sm">
                <div className="text-purple-400">
                  <BarChart3 className="h-5 w-5" />
                </div>
                <span className="text-sm text-white">Analytics</span>
              </div>
              <div className="flex items-center space-x-2 rounded-lg bg-white/5 p-3 backdrop-blur-sm">
                <div className="text-purple-400">
                  <CreditCard className="h-5 w-5" />
                </div>
                <span className="text-sm text-white">Payments</span>
              </div>
              <div className="flex items-center space-x-2 rounded-lg bg-white/5 p-3 backdrop-blur-sm">
                <div className="text-purple-400">
                  <Package className="h-5 w-5" />
                </div>
                <span className="text-sm text-white">Order Management</span>
              </div>
            </div>

            <div className="mt-10 flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <button className="h-14 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-8 text-base font-medium text-white hover:from-purple-600 hover:to-pink-600 shadow-lg shadow-purple-500/25">
                Build My Website - Free
              </button>
              <button className="h-14 rounded-full border border-gray-600 px-8 text-base font-medium text-white hover:bg-white/10">
                Watch Demo
              </button>
            </div>

            {/* Instagram username input demo */}
            <div className="mx-auto mt-12 max-w-md">
              <div className="rounded-full bg-white/10 p-1 backdrop-blur-sm">
                <div className="flex items-center">
                  <Instagram className="ml-4 h-5 w-5 text-pink-400" />
                  <input
                    type="text"
                    placeholder="Enter your Instagram username"
                    className="flex-1 bg-transparent px-4 py-3 text-white placeholder-gray-400 focus:outline-none"
                  />
                  <button className="mr-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 text-sm font-medium text-white hover:from-purple-600 hover:to-pink-600">
                    Build Now
                  </button>
                </div>
              </div>
              <p className="mt-2 text-sm text-gray-400">
                No credit card required • 7-day free trial
              </p>
            </div>

            {/* Hero Image */}
            <div className="relative mx-auto my-20 w-full max-w-6xl">
              <div className="absolute inset-0 rounded-2xl shadow-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-3xl" />
              
              <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-2 shadow-2xl">
                <div className="bg-black rounded-xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-400 text-sm">
                      <span>https://yourstore.builtin.ai</span>
                    </div>
                  </div>
                  
                  {/* Mock website preview */}
                  <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-lg p-8 text-left">
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                        <Palette className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white">Your Store</h3>
                        <p className="text-gray-300">Built with builtIn AI</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="bg-white/10 rounded-lg p-4 text-center">
                        <div className="w-full h-24 bg-gradient-to-br from-purple-400 to-pink-400 rounded-md mb-2"></div>
                        <p className="text-sm text-white">Product 1</p>
                        <p className="text-xs text-gray-400">$29.99</p>
                      </div>
                      <div className="bg-white/10 rounded-lg p-4 text-center">
                        <div className="w-full h-24 bg-gradient-to-br from-blue-400 to-purple-400 rounded-md mb-2"></div>
                        <p className="text-sm text-white">Product 2</p>
                        <p className="text-xs text-gray-400">$39.99</p>
                      </div>
                      <div className="bg-white/10 rounded-lg p-4 text-center">
                        <div className="w-full h-24 bg-gradient-to-br from-pink-400 to-red-400 rounded-md mb-2"></div>
                        <p className="text-sm text-white">Product 3</p>
                        <p className="text-xs text-gray-400">$49.99</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-center">
                      <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm">
                        Shop Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              From Instagram to website in 3 simple steps
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white mx-auto">
                  <Instagram className="h-12 w-12" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-white text-black rounded-full flex items-center justify-center text-sm font-bold">
                  01
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Connect Instagram</h3>
              <p className="text-gray-400">Enter your Instagram username and let our AI scan your profile, posts, and products automatically.</p>
            </div>
            <div className="text-center">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white mx-auto">
                  <Brain className="h-12 w-12" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-white text-black rounded-full flex items-center justify-center text-sm font-bold">
                  02
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">AI Builds Your Site</h3>
              <p className="text-gray-400">Our AI analyzes your content, categorizes products, extracts pricing, and selects the perfect template for your business.</p>
            </div>
            <div className="text-center">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white mx-auto">
                  <Globe className="h-12 w-12" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-white text-black rounded-full flex items-center justify-center text-sm font-bold">
                  03
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Launch & Manage</h3>
              <p className="text-gray-400">Your website goes live instantly with built-in analytics, payment processing, and order management.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Everything You Need</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              A complete platform to run your business online
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm hover:bg-white/10 transition-colors">
              <div className="text-purple-400 mb-4">
                <Instagram className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Auto Instagram Sync</h3>
              <p className="text-gray-400">Automatically imports products, images, descriptions, and pricing from your Instagram posts.</p>
            </div>
            <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm hover:bg-white/10 transition-colors">
              <div className="text-purple-400 mb-4">
                <Brain className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">AI Template Selection</h3>
              <p className="text-gray-400">Our AI categorizes your business and selects the perfect template design that matches your brand.</p>
            </div>
            <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm hover:bg-white/10 transition-colors">
              <div className="text-purple-400 mb-4">
                <BarChart3 className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Advanced Analytics</h3>
              <p className="text-gray-400">Track visitors, sales, conversion rates, and customer behavior with detailed insights.</p>
            </div>
            <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm hover:bg-white/10 transition-colors">
              <div className="text-purple-400 mb-4">
                <CreditCard className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Payment Processing</h3>
              <p className="text-gray-400">Accept payments with Stripe, PayPal, and other gateways. Handle taxes and invoicing automatically.</p>
            </div>
            <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm hover:bg-white/10 transition-colors">
              <div className="text-purple-400 mb-4">
                <Package className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Order Management</h3>
              <p className="text-gray-400">Manage orders, track inventory, handle shipping, and automate customer communications.</p>
            </div>
            <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm hover:bg-white/10 transition-colors">
              <div className="text-purple-400 mb-4">
                <Settings className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Content Management</h3>
              <p className="text-gray-400">Easy-to-use CMS to add, edit, or remove products and content without technical skills.</p>
            </div>
            <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm hover:bg-white/10 transition-colors">
              <div className="text-purple-400 mb-4">
                <Smartphone className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Mobile Optimized</h3>
              <p className="text-gray-400">All websites are fully responsive and optimized for mobile shopping experiences.</p>
            </div>
            <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm hover:bg-white/10 transition-colors">
              <div className="text-purple-400 mb-4">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">SSL Security</h3>
              <p className="text-gray-400">Enterprise-grade security with SSL certificates and secure payment processing.</p>
            </div>
            <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm hover:bg-white/10 transition-colors">
              <div className="text-purple-400 mb-4">
                <TrendingUp className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">SEO Optimized</h3>
              <p className="text-gray-400">Built-in SEO optimization to help your website rank higher in search results.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Templates Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">AI-Selected Templates</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Our AI automatically chooses the perfect template based on your business category
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm hover:bg-white/10 transition-colors">
              <div className="w-full h-32 bg-gradient-to-br from-pink-500 to-purple-500 rounded-lg mb-4 flex items-center justify-center">
                <Palette className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Fashion & Apparel</h3>
              <p className="text-gray-400 text-sm">Perfect for clothing brands, accessories, and fashion boutiques</p>
            </div>
            <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm hover:bg-white/10 transition-colors">
              <div className="w-full h-32 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg mb-4 flex items-center justify-center">
                <Palette className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Food & Beverage</h3>
              <p className="text-gray-400 text-sm">Ideal for restaurants, cafes, and food delivery services</p>
            </div>
            <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm hover:bg-white/10 transition-colors">
              <div className="w-full h-32 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg mb-4 flex items-center justify-center">
                <Palette className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Beauty & Cosmetics</h3>
              <p className="text-gray-400 text-sm">Designed for beauty brands, skincare, and wellness products</p>
            </div>
            <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm hover:bg-white/10 transition-colors">
              <div className="w-full h-32 bg-gradient-to-br from-green-500 to-teal-500 rounded-lg mb-4 flex items-center justify-center">
                <Palette className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Home & Lifestyle</h3>
              <p className="text-gray-400 text-sm">Great for home decor, furniture, and lifestyle brands</p>
            </div>
            <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm hover:bg-white/10 transition-colors">
              <div className="w-full h-32 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg mb-4 flex items-center justify-center">
                <Palette className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Electronics & Tech</h3>
              <p className="text-gray-400 text-sm">Perfect for gadgets, accessories, and tech products</p>
            </div>
            <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm hover:bg-white/10 transition-colors">
              <div className="w-full h-32 bg-gradient-to-br from-yellow-500 to-pink-500 rounded-lg mb-4 flex items-center justify-center">
                <Palette className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Art & Crafts</h3>
              <p className="text-gray-400 text-sm">Tailored for artists, crafters, and creative businesses</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Choose the plan that grows with your business
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div 
              className={`relative bg-white/5 rounded-xl p-6 backdrop-blur-sm hover:bg-white/10 transition-colors cursor-pointer ${
                selectedPlan === "starter" ? 'ring-2 ring-purple-500' : ''
              }`}
              onClick={() => setSelectedPlan("starter")}
            >
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">Starter</h3>
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold text-white">$9</span>
                  <span className="text-gray-400 ml-1">/month</span>
                </div>
                <p className="text-gray-400 text-sm mt-2">Perfect for small businesses just getting started</p>
              </div>
              
              <ul className="space-y-3 mb-6">
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                  <span className="text-sm">Up to 50 Products</span>
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                  <span className="text-sm">Basic Analytics</span>
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                  <span className="text-sm">Payment Processing</span>
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                  <span className="text-sm">Email Support</span>
                </li>
              </ul>
              
              <button className="w-full h-12 rounded-full border border-gray-600 text-white hover:bg-white/10 font-medium transition-colors">
                {selectedPlan === "starter" ? 'Selected' : 'Choose Plan'}
              </button>
            </div>

            <div 
              className={`relative bg-white/5 rounded-xl p-6 backdrop-blur-sm hover:bg-white/10 transition-colors cursor-pointer ring-2 ring-yellow-500 ${
                selectedPlan === "pro" ? 'ring-2 ring-purple-500' : ''
              }`}
              onClick={() => setSelectedPlan("pro")}
            >
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-4 py-1 rounded-full text-sm font-bold">
                  Most Popular
                </span>
              </div>
              
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">Pro</h3>
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold text-white">$29</span>
                  <span className="text-gray-400 ml-1">/month</span>
                </div>
                <p className="text-gray-400 text-sm mt-2">Best for growing businesses with advanced needs</p>
              </div>
              
              <ul className="space-y-3 mb-6">
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                  <span className="text-sm">5 Websites</span>
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                  <span className="text-sm">Unlimited Products</span>
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                  <span className="text-sm">Advanced Analytics</span>
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                  <span className="text-sm">Priority Support</span>
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                  <span className="text-sm">Custom Domain</span>
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                  <span className="text-sm">Order Management</span>
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                  <span className="text-sm">Inventory Tracking</span>
                </li>
              </ul>
              
              <button className="w-full h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 font-medium transition-colors">
                {selectedPlan === "pro" ? 'Selected' : 'Choose Plan'}
              </button>
            </div>

            <div 
              className={`relative bg-white/5 rounded-xl p-6 backdrop-blur-sm hover:bg-white/10 transition-colors cursor-pointer ${
                selectedPlan === "enterprise" ? 'ring-2 ring-purple-500' : ''
              }`}
              onClick={() => setSelectedPlan("enterprise")}
            >
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">Enterprise</h3>
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold text-white">$99</span>
                  <span className="text-gray-400 ml-1">/month</span>
                </div>
                <p className="text-gray-400 text-sm mt-2">For large businesses with custom requirements</p>
              </div>
              
              <ul className="space-y-3 mb-6">
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                  <span className="text-sm">Unlimited Websites</span>
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                  <span className="text-sm">White Label Solution</span>
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                  <span className="text-sm">API Access</span>
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                  <span className="text-sm">Custom Integrations</span>
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                  <span className="text-sm">Dedicated Support</span>
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                  <span className="text-sm">Advanced Security</span>
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                  <span className="text-sm">Custom Templates</span>
                </li>
              </ul>
              
              <button className="w-full h-12 rounded-full border border-gray-600 text-white hover:bg-white/10 font-medium transition-colors">
                {selectedPlan === "enterprise" ? 'Selected' : 'Choose Plan'}
              </button>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <p className="text-gray-400 mb-6">All plans include 7-day free trial • No setup fees • Cancel anytime</p>
            <button className="h-14 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-8 text-base font-medium text-white hover:from-purple-600 hover:to-pink-600 shadow-lg shadow-purple-500/25">
              Start Free Trial
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">What Our Users Say</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Real stories from businesses that transformed with builtIn AI
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                  SJ
                </div>
                <div className="ml-4">
                  <h4 className="text-white font-semibold">Sarah Johnson</h4>
                  <p className="text-gray-400 text-sm">Fashion Boutique</p>
                </div>
                <div className="ml-auto flex">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                </div>
              </div>
              <p className="text-gray-300 italic">"I went from having just an Instagram page to a full e-commerce website in under 10 minutes. Sales increased by 300% in the first month!"</p>
            </div>
            <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                  MC
                </div>
                <div className="ml-4">
                  <h4 className="text-white font-semibold">Mike Chen</h4>
                  <p className="text-gray-400 text-sm">Coffee Roastery</p>
                </div>
                <div className="ml-auto flex">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                </div>
              </div>
              <p className="text-gray-300 italic">"The AI perfectly captured our brand aesthetic and built exactly what we needed. The order management system is a game-changer."</p>
            </div>
            <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                  ER
                </div>
                <div className="ml-4">
                  <h4 className="text-white font-semibold">Emma Rodriguez</h4>
                  <p className="text-gray-400 text-sm">Handmade Jewelry</p>
                </div>
                <div className="ml-auto flex">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                </div>
              </div>
              <p className="text-gray-300 italic">"As a non-tech person, I was amazed how easy it was. Now I have a professional website that actually converts visitors to customers."</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-bold text-white mb-6">
              Ready to Transform Your Instagram into a 
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> Professional Website?</span>
            </h2>
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              Join thousands of businesses that have already made the switch. Start your free trial today.
            </p>
            
            {/* Final CTA Input */}
            <div className="mx-auto mb-8 max-w-lg">
              <div className="rounded-full bg-white/10 p-1 backdrop-blur-sm">
                <div className="flex items-center">
                  <Instagram className="ml-4 h-5 w-5 text-pink-400" />
                  <input
                    type="text"
                    placeholder="Enter your Instagram username"
                    className="flex-1 bg-transparent px-4 py-4 text-white placeholder-gray-400 focus:outline-none"
                  />
                  <button className="mr-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-4 text-base font-medium text-white hover:from-purple-600 hover:to-pink-600">
                    Build My Website
                  </button>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-center space-x-8 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span>7-day free trial</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                  <Zap className="h-5 w-5" />
                </div>
                <span className="ml-2 text-xl font-bold text-white">builtIn AI</span>
              </div>
              <p className="text-gray-400 text-sm">
                Transform your Instagram business into a professional website with the power of AI.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li className="hover:text-white cursor-pointer">Features</li>
                <li className="hover:text-white cursor-pointer">Templates</li>
                <li className="hover:text-white cursor-pointer">Pricing</li>
                <li className="hover:text-white cursor-pointer">Integrations</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li className="hover:text-white cursor-pointer">Help Center</li>
                <li className="hover:text-white cursor-pointer">Documentation</li>
                <li className="hover:text-white cursor-pointer">Contact Us</li>
                <li className="hover:text-white cursor-pointer">Status</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li className="hover:text-white cursor-pointer">About</li>
                <li className="hover:text-white cursor-pointer">Blog</li>
                <li className="hover:text-white cursor-pointer">Careers</li>
                <li className="hover:text-white cursor-pointer">Privacy</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2025 builtIn AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BuiltInAILandingPage