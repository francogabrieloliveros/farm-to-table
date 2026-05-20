import { Link } from "react-router-dom";
import {
  Leaf,
  ShoppingCart,
  Truck,
  ShieldCheck,
  ArrowRight,
  Star,
  Users,
  Sprout,
  CheckCircle2,
  ShoppingBag
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#FDFDFC] flex flex-col font-sans overflow-x-hidden">
      {/* Navbar */}
      <header className="px-6 lg:px-12 h-20 flex items-center justify-between border-b border-gray-100/50 backdrop-blur-xl sticky top-0 z-50 bg-white/70">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-[#2D6A28] to-[#1C4419] p-2.5 rounded-xl shadow-lg shadow-green-900/20 text-white">
            <Leaf className="h-5 w-5" />
          </div>
          <span className="text-2xl font-black tracking-tight text-[#1C4419] manrope">
            Farm-to-<span className="text-emerald-600">Table</span>
          </span>
        </div>
        <nav className="hidden md:flex gap-10 items-center inter">
          <a href="#features" className="text-sm font-bold text-gray-500 hover:text-[#1C4419] transition-colors">Features</a>
          <a href="#how-it-works" className="text-sm font-bold text-gray-500 hover:text-[#1C4419] transition-colors">How it Works</a>
          <a href="#about" className="text-sm font-bold text-gray-500 hover:text-[#1C4419] transition-colors">About DA Initiative</a>
        </nav>
        <div className="flex gap-4 items-center">
          <Link to="/login" className="text-sm font-bold text-gray-700 hover:text-[#1C4419] transition-colors inter">
            Sign In
          </Link>
          <Link to="/signup" className="text-sm font-bold bg-[#1C4419] text-white px-6 py-2.5 rounded-full hover:bg-[#2D6A28] transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 inter">
            Get Started
          </Link>
        </div>
      </header>

      <main className="flex-1 flex flex-col">
        {/* Hero Section */}
        <section className="relative px-6 lg:px-12 py-24 md:py-32 flex flex-col items-center text-center">
          {/* Decorative background blobs */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-72 h-72 bg-lime-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

          <div className="relative z-10 flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-700 font-bold text-xs uppercase tracking-widest mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700 inter border border-emerald-100/50">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
              </span>
              Official Dept. of Agriculture Platform
            </div>

            <h1 className="text-6xl md:text-8xl font-black tracking-tighter max-w-5xl text-[#1C4419] mb-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100 manrope leading-tight">
              Fresh harvest, <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-lime-500">
                straight to your table.
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-500 max-w-2xl mb-12 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200 inter font-medium leading-relaxed">
              Connect directly with local farmers through our premium marketplace. 
              Support the community and enjoy the freshest, high-quality agricultural products.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 w-full justify-center animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300 inter">
              <Link to="/shop" className="inline-flex justify-center items-center gap-2 bg-[#1C4419] text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-[#2D6A28] transition-all shadow-xl shadow-green-900/20 hover:shadow-2xl hover:shadow-green-900/30 hover:-translate-y-1">
                Start Shopping <ArrowRight className="h-5 w-5" />
              </Link>
              <a href="#how-it-works" className="inline-flex justify-center items-center px-8 py-4 rounded-full text-lg font-bold text-[#1C4419] bg-white hover:bg-gray-50 transition-all border-2 border-[#1C4419]/10 hover:border-[#1C4419]/20 shadow-sm">
                How it works
              </a>
            </div>

            {/* Social Proof */}
            <div className="mt-20 pt-10 border-t border-gray-100 flex flex-col md:flex-row items-center gap-8 animate-in fade-in duration-1000 delay-500">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-green-100 flex items-center justify-center overflow-hidden">
                    <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${i}`} alt="user" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <div className="flex flex-col items-center md:items-start">
                <div className="flex gap-1 text-amber-400 mb-1">
                  {[1, 2, 3, 4, 5].map(i => <Star key={i} size={18} fill="currentColor" />)}
                </div>
                <p className="text-sm font-bold text-gray-600">Trusted by <span className="text-[#1C4419]">10,000+</span> citizens & farmers</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="px-6 lg:px-12 py-32 bg-[#FCFBF9] relative">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-black mb-6 manrope text-[#1C4419] tracking-tight">
                Why choose Farm-to-Table?
              </h2>
              <p className="text-lg text-gray-500 max-w-2xl mx-auto inter font-medium">
                Our platform bridges the gap between local farmers and consumers—offering a seamless, trustworthy shopping experience backed by the DA.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Sprout className="h-8 w-8 text-emerald-600" />,
                  title: "100% Fresh & Local",
                  description: "Every product is sourced directly from verified local farmers, ensuring maximum freshness and quality.",
                  color: "bg-emerald-50",
                  border: "border-emerald-100"
                },
                {
                  icon: <Truck className="h-8 w-8 text-amber-600" />,
                  title: "Reliable Delivery",
                  description: "Convenient and secure transactions with our direct Cash-on-Delivery fulfillment system.",
                  color: "bg-amber-50",
                  border: "border-amber-100"
                },
                {
                  icon: <ShieldCheck className="h-8 w-8 text-blue-600" />,
                  title: "DA Certified Quality",
                  description: "An official initiative by the Department of Agriculture ensuring strict quality control and fair pricing.",
                  color: "bg-blue-50",
                  border: "border-blue-100"
                },
              ].map((feature, i) => (
                <div key={i} className="bg-white p-10 rounded-[2rem] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-2 group">
                  <div className={`${feature.color} ${feature.border} border w-20 h-20 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-black mb-4 manrope text-[#1C4419]">
                    {feature.title}
                  </h3>
                  <p className="text-gray-500 leading-relaxed inter font-medium">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="px-6 lg:px-12 py-32 relative overflow-hidden bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="lg:w-1/2 space-y-10">
                <div className="inline-block px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full font-bold text-xs uppercase tracking-widest border border-emerald-100">
                  Simple Process
                </div>
                <h2 className="text-4xl md:text-5xl font-black manrope text-[#1C4419] tracking-tight leading-tight">
                  From farm to your doorstep in 3 simple steps.
                </h2>
                
                <div className="space-y-8">
                  {[
                    { title: "Browse Fresh Catalog", desc: "Explore a wide variety of crops and poultry directly from farmers." },
                    { title: "Place Your Order", desc: "Add items to your cart and checkout securely with Cash-on-Delivery." },
                    { title: "Receive & Enjoy", desc: "Get your fresh harvest delivered right to your door." }
                  ].map((step, i) => (
                    <div key={i} className="flex gap-6 group">
                      <div className="flex-shrink-0 w-14 h-14 bg-gray-50 border border-gray-100 rounded-2xl flex items-center justify-center font-black text-xl text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                        {i + 1}
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-[#1C4419] mb-2">{step.title}</h4>
                        <p className="text-gray-500 font-medium leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="lg:w-1/2 w-full relative">
                <div className="aspect-square rounded-[3rem] bg-gradient-to-tr from-emerald-100 to-lime-50 p-8 relative overflow-hidden">
                   {/* Abstract representation of a farm/delivery */}
                   <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                   
                   {/* Floating cards animation */}
                   <div className="absolute top-1/4 left-10 bg-white p-4 rounded-2xl shadow-xl shadow-green-900/10 flex items-center gap-4 animate-bounce duration-3000">
                      <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                        <ShoppingBag size={20} className="text-amber-600" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">Fresh Tomatoes</p>
                        <p className="text-xs font-medium text-emerald-600">Added to cart</p>
                      </div>
                   </div>

                   <div className="absolute bottom-1/4 right-10 bg-white p-4 rounded-2xl shadow-xl shadow-green-900/10 flex items-center gap-4 animate-pulse duration-2000 delay-500">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <Truck size={20} className="text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">Order #1024</p>
                        <p className="text-xs font-medium text-blue-600">Out for delivery</p>
                      </div>
                   </div>
                   
                   <div className="w-full h-full flex items-center justify-center relative z-10">
                      <div className="w-64 h-64 bg-emerald-500 rounded-full blur-3xl opacity-20 absolute"></div>
                      <img src="https://api.dicebear.com/7.x/shapes/svg?seed=farm" alt="Farm abstract" className="w-3/4 h-3/4 object-contain" />
                   </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA / About Section */}
        <section id="about" className="px-6 lg:px-12 py-32">
          <div className="max-w-6xl mx-auto bg-[#1C4419] rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-green-900/20">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/noise-lines.png')] opacity-10 mix-blend-overlay"></div>
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500 rounded-full blur-3xl opacity-30"></div>
            
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-black text-white mb-8 manrope tracking-tight">
                Ready to taste the difference?
              </h2>
              <p className="text-emerald-100 text-lg md:text-xl font-medium max-w-2xl mx-auto mb-12">
                Join thousands of citizens supporting local agriculture. Sign up today and get fresh produce delivered straight to your home.
              </p>
              <Link to="/signup" className="inline-flex justify-center items-center gap-2 bg-white text-[#1C4419] px-10 py-5 rounded-full text-xl font-black hover:bg-emerald-50 transition-all shadow-xl hover:scale-105 active:scale-95">
                Create Free Account
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-gray-100 bg-white pt-20 pb-10 px-6 lg:px-12 mt-auto">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-[#1C4419] p-2 rounded-lg text-white">
                  <Leaf className="h-5 w-5" />
                </div>
                <span className="text-2xl font-black text-[#1C4419] manrope">
                  Farm-to-<span className="text-emerald-600">Table</span>
                </span>
              </div>
              <p className="text-gray-500 font-medium max-w-sm leading-relaxed mb-6">
                An official Department of Agriculture initiative connecting citizens with local farmers for a sustainable future.
              </p>
              <div className="flex items-center gap-2 text-sm font-bold text-gray-400">
                <CheckCircle2 size={16} className="text-emerald-500" /> DA Certified Platform
              </div>
            </div>
            
            <div>
              <h4 className="font-black text-gray-900 mb-6 uppercase tracking-widest text-sm">Platform</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-gray-500 hover:text-[#1C4419] font-medium transition-colors">Shop Products</a></li>
                <li><a href="#" className="text-gray-500 hover:text-[#1C4419] font-medium transition-colors">How it works</a></li>
                <li><a href="#" className="text-gray-500 hover:text-[#1C4419] font-medium transition-colors">Pricing</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-black text-gray-900 mb-6 uppercase tracking-widest text-sm">Support</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-gray-500 hover:text-[#1C4419] font-medium transition-colors">Help Center</a></li>
                <li><a href="#" className="text-gray-500 hover:text-[#1C4419] font-medium transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-gray-500 hover:text-[#1C4419] font-medium transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm font-bold text-gray-400 inter">
              © {new Date().getFullYear()} Farm-to-Table - Dept. of Agriculture. All rights reserved.
            </p>
            <div className="flex gap-6">
              {/* Social placeholders */}
              <div className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 cursor-pointer transition-colors"></div>
              <div className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 cursor-pointer transition-colors"></div>
              <div className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 cursor-pointer transition-colors"></div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
