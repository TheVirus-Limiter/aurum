"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff, Mail, User, Calendar, MapPin, Shield } from 'lucide-react'

interface WaitlistEntry {
  email: string
  whoAreYou?: string
  ageRange?: string
  timestamp: string
  position: number
  userAgent?: string
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [waitlistData, setWaitlistData] = useState<WaitlistEntry[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const correctPassword = "lumora2024!"

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === correctPassword) {
      setIsAuthenticated(true)
      setError("")
      fetchWaitlistData()
    } else {
      setError("Invalid password")
    }
  }

  const fetchWaitlistData = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/admin/waitlist")
      if (response.ok) {
        const data = await response.json()
        setWaitlistData(data.entries || [])
      }
    } catch (error) {
      console.error("Failed to fetch waitlist data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-slate-800 border-slate-700">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-slate-300" />
            </div>
            <CardTitle className="text-2xl text-white">Admin Access</CardTitle>
            <p className="text-slate-400">Enter password to view waitlist data</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter admin password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {error && (
                <p className="text-red-400 text-sm">{error}</p>
              )}
              <Button type="submit" className="w-full bg-slate-600 hover:bg-slate-500">
                Access Admin Panel
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Lumora Sleep Admin</h1>
            <p className="text-slate-400">Waitlist Management Dashboard</p>
          </div>
          <Button
            onClick={() => setIsAuthenticated(false)}
            variant="outline"
            className="border-slate-600 text-slate-300 hover:bg-slate-800"
          >
            Logout
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Total Signups</p>
                  <p className="text-2xl font-bold text-white">{waitlistData.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Today's Signups</p>
                  <p className="text-2xl font-bold text-white">
                    {waitlistData.filter(entry => {
                      const today = new Date().toDateString()
                      const entryDate = new Date(entry.timestamp).toDateString()
                      return today === entryDate
                    }).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Latest Signup</p>
                  <p className="text-lg font-semibold text-white">
                    {waitlistData.length > 0 
                      ? new Date(waitlistData[waitlistData.length - 1].timestamp).toLocaleDateString()
                      : "No signups yet"
                    }
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Waitlist Entries</CardTitle>
            <p className="text-slate-400">All email signups and user information</p>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <p className="text-slate-400 text-center py-8">Loading waitlist data...</p>
            ) : waitlistData.length === 0 ? (
              <p className="text-slate-400 text-center py-8">No waitlist entries yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-left py-3 px-4 text-slate-300 font-medium">#</th>
                      <th className="text-left py-3 px-4 text-slate-300 font-medium">Email</th>
                      <th className="text-left py-3 px-4 text-slate-300 font-medium">Type</th>
                      <th className="text-left py-3 px-4 text-slate-300 font-medium">Age Range</th>
                      <th className="text-left py-3 px-4 text-slate-300 font-medium">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {waitlistData.map((entry, index) => (
                      <tr key={index} className="border-b border-slate-700/50 hover:bg-slate-700/30">
                        <td className="py-3 px-4 text-slate-300">#{entry.position}</td>
                        <td className="py-3 px-4 text-white font-medium">{entry.email}</td>
                        <td className="py-3 px-4">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-slate-700 text-slate-300">
                            {entry.whoAreYou || "Not specified"}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-slate-700 text-slate-300">
                            {entry.ageRange || "Not specified"}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-slate-400">
                          {new Date(entry.timestamp).toLocaleDateString()} at{" "}
                          {new Date(entry.timestamp).toLocaleTimeString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
