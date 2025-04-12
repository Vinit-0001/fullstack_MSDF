"use client"

import { Home, Laptop, FileText, ListOrdered } from 'lucide-react'
import { NavBar } from "./nav-bar"

export function NavBarDemo() {
  const navItems = [
    { name: 'Home', url: '#', icon: Home },
    { name: 'Sensors', url: '#sensors', icon: Laptop },
    { name: 'Steps', url: '#steps', icon: ListOrdered },
    { name: 'Details', url: '#sensor-details', icon: FileText }
  ]

  return <NavBar items={navItems} />
} 