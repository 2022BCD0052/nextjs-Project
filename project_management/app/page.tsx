import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle, Clock, Layout, Target } from "lucide-react"
import type React from "react" // Added import for React

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Target className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-bold">TaskMaster</span>
            </div>
            <nav className="hidden md:flex items-center space-x-4">
              <Link href="#features" className="text-muted-foreground hover:text-primary">
                Features
              </Link>
              <Link href="#pricing" className="text-muted-foreground hover:text-primary">
                Pricing
              </Link>
              <Link href="/login" className="text-muted-foreground hover:text-primary">
                Login
              </Link>
              <Link href="/register">
                <Button>Get Started</Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-background to-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">Manage Tasks with Ease</h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
              Stay organized and boost your productivity with our intuitive task management system. Perfect for
              individuals and teams.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link href="/register">
                <Button size="lg">
                  Get started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="#features" className="text-sm font-semibold leading-6">
                Learn more <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Everything you need to stay organized</h2>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={<Layout className="h-6 w-6" />}
              title="Intuitive Dashboard"
              description="Get a clear overview of your tasks and projects at a glance."
            />
            <FeatureCard
              icon={<Clock className="h-6 w-6" />}
              title="Time Management"
              description="Track deadlines and manage your time effectively."
            />
            <FeatureCard
              icon={<CheckCircle className="h-6 w-6" />}
              title="Task Organization"
              description="Categorize and prioritize tasks for better workflow."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
              Ready to get started?
            </h2>
            <p className="mt-6 text-lg leading-8 text-primary-foreground/90 max-w-2xl mx-auto">
              Join thousands of users who are already managing their tasks more efficiently.
            </p>
            <div className="mt-10">
              <Link href="/register">
                <Button variant="secondary" size="lg">
                  Start for free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Target className="h-6 w-6 text-primary" />
              <span className="ml-2 font-semibold">TaskMaster</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} TaskMaster. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card">
      <div className="rounded-lg bg-primary/10 p-3 text-primary">{icon}</div>
      <h3 className="mt-4 text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-muted-foreground">{description}</p>
    </div>
  )
}

