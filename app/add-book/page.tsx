"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, BookOpen } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function AddBook() {
  const router = useRouter()
  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    coverUrl: "",
    description: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setBookData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // In a real app, you would save this to a database
    // For now, we'll use localStorage
    setTimeout(() => {
      const books = JSON.parse(localStorage.getItem("books") || "[]")
      const newBook = {
        id: Date.now().toString(),
        ...bookData,
        rating: 0,
        quotes: [],
        dateAdded: new Date().toISOString(),
      }

      localStorage.setItem("books", JSON.stringify([...books, newBook]))
      router.push("/")
    }, 600) // Simulate network delay for animation
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 py-12 px-4">
      <div className="container mx-auto max-w-2xl">
        <Link
          href="/"
          className="flex items-center text-sm mb-8 hover:underline text-slate-600 dark:text-slate-400 group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
          Back to Reading List
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card className="border-none shadow-xl overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-rose-500 to-purple-600"></div>
            <CardHeader className="pb-4">
              <div className="flex items-center">
                <BookOpen className="w-5 h-5 mr-2 text-rose-500" />
                <CardTitle>Add New Book</CardTitle>
              </div>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-sm font-medium">
                    Book Title
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    value={bookData.title}
                    onChange={handleChange}
                    required
                    className="transition-all duration-200 focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                    placeholder="Enter the book title"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="author" className="text-sm font-medium">
                    Author
                  </Label>
                  <Input
                    id="author"
                    name="author"
                    value={bookData.author}
                    onChange={handleChange}
                    required
                    className="transition-all duration-200 focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                    placeholder="Enter the author's name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="coverUrl" className="text-sm font-medium">
                    Cover Image URL (optional)
                  </Label>
                  <Input
                    id="coverUrl"
                    name="coverUrl"
                    value={bookData.coverUrl}
                    onChange={handleChange}
                    className="transition-all duration-200 focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                    placeholder="https://example.com/book-cover.jpg"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-sm font-medium">
                    Description (optional)
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={bookData.description}
                    onChange={handleChange}
                    rows={4}
                    className="transition-all duration-200 focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                    placeholder="What's this book about?"
                  />
                </div>
              </CardContent>
              <CardFooter className="pt-2 pb-6">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 transition-all duration-300 w-full shadow-md hover:shadow-lg"
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Adding Book...
                    </>
                  ) : (
                    "Add Book"
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

