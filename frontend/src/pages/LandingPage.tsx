import { Link } from "react-router-dom";
import { Leaf, ShoppingCart, Truck, ShieldCheck, ArrowRight } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <header className="px-6 lg:px-12 h-20 flex items-center justify-between border-b border-border/40 backdrop-blur-md sticky top-0 z-50 bg-background/80">
        <div className="flex items-center gap-2">
          <div className="bg-primary p-2 rounded-xl text-primary-foreground">
            <Leaf className="h-6 w-6" />
          </div>
          <span className="text-xl font-bold tracking-tight text-foreground manrope">Farm-to-Table</span>
        </div>
        <nav className="hidden md:flex gap-8 items-center inter">
          <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Features</a>
          <a href="#about" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">About DA Initiative</a>
        </nav>
        <div className="flex gap-4 items-center">
          <Link to="/login" className="text-sm font-semibold text-foreground hover:text-primary transition-colors inter">Log in</Link>
          <Link to="/signup" className="text-sm font-semibold bg-primary text-primary-foreground px-5 py-2.5 rounded-full hover:bg-primary/90 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 inter">Get Started</Link>
        </div>
      </header>

      <main className="flex-1 flex flex-col">
        <section className="relative px-6 lg:px-12 py-24 md:py-32 overflow-hidden flex flex-col items-center text-center">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background"></div>
          
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary font-medium text-sm mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700 inter">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Department of Agriculture Official Platform
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight max-w-4xl text-foreground mb-6 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100 manrope">
            Fresh harvest, <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-600">delivered direct</span> to your table.
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200 inter">
            The central public market catalog offering you direct access to buy premium agricultural products. Support local farmers and enjoy fresh, high-quality produce.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center animate-in fade-in slide-in-from-bottom-6 duration-700 delay-300 inter">
            <Link to="/shop" className="inline-flex justify-center items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full text-lg font-semibold hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/25 hover:-translate-y-1">
              Browse Catalog <ArrowRight className="h-5 w-5" />
            </Link>
            <a href="#features" className="inline-flex justify-center items-center px-8 py-4 rounded-full text-lg font-semibold text-foreground bg-secondary hover:bg-secondary/80 transition-all border border-border">
              Learn More
            </a>
          </div>
        </section>

        <section id="features" className="px-6 lg:px-12 py-24 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 manrope">Why choose Farm-to-Table?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto inter">Our platform bridges the gap between local agriculture and consumers, offering a seamless, trustworthy shopping experience.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <ShoppingCart className="h-8 w-8 text-primary" />,
                  title: "Intuitive E-Commerce",
                  description: "A modern, easy-to-use catalog tailored for fresh agricultural produce, from crops to poultry."
                },
                {
                  icon: <Truck className="h-8 w-8 text-primary" />,
                  title: "Cash-on-Delivery",
                  description: "Convenient and secure transactions with our direct Cash-on-Delivery fulfillment system."
                },
                {
                  icon: <ShieldCheck className="h-8 w-8 text-primary" />,
                  title: "DA Certified Quality",
                  description: "An official initiative by the Department of Agriculture ensuring quality and fair pricing."
                }
              ].map((feature, i) => (
                <div key={i} className="bg-background p-8 rounded-3xl border border-border/50 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 group">
                  <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 manrope">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed inter">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-background py-12 px-6 lg:px-12 mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <div className="flex items-center gap-2 opacity-80">
            <Leaf className="h-5 w-5 text-primary" />
            <span className="font-semibold text-foreground manrope">Farm-to-Table</span>
          </div>
          <p className="text-sm text-muted-foreground inter">
            © {new Date().getFullYear()} Department of Agriculture Initiative. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
