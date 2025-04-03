"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import StarRating from "@/components/star-rating"
import { Quote, BookOpen } from "lucide-react"
import { motion } from "framer-motion"

export default function BookList() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real app, you would fetch this from an API
    setTimeout(() => {
      const storedBooks = JSON.parse(localStorage.getItem("books") || "[]")
      setBooks(storedBooks)
      setLoading(false)
    }, 500) // Simulate network delay
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="h-full border-none shadow-lg overflow-hidden animate-pulse">
            <div className="p-4">
              <div className="aspect-[2/3] bg-slate-200 dark:bg-slate-700 rounded-md mb-4"></div>
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/2"></div>
            </div>
          </Card>
        ))}
      </div>
    )
  }

  if (books.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center py-16 px-4 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700"
      >
        <BookOpen className="w-16 h-16 mx-auto text-slate-300 dark:text-slate-600 mb-4" />
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">Your reading list is empty</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-md mx-auto">
          Start tracking your reading journey by adding your first book.
        </p>
        <Link href="/add-book">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <div className="inline-block bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white font-medium py-2 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
              Add your first book
            </div>
          </motion.div>
        </Link>
      </motion.div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {books.map((book, index) => (
        <motion.div
          key={book.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Link href={`/book/${book.id}`}>
            <Card className="h-full border-none shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group">
              <div className="h-1 bg-gradient-to-r from-rose-500 to-purple-600 transform origin-left transition-all duration-300 scale-x-0 group-hover:scale-x-100"></div>
              <div className="p-4">
                <div className="aspect-[2/3] relative mb-4 rounded-md overflow-hidden bg-slate-100 dark:bg-slate-800">
                  {book.coverUrl ? (
                    <Image
                      src={book.coverUrl || "/placeholder.svg"}
                      alt={book.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600 text-slate-500 dark:text-slate-400">
                      <BookOpen className="w-10 h-10 opacity-50" />
                    </div>
                  )}
                </div>
                <h3 className="font-semibold line-clamp-1 text-slate-800 dark:text-slate-200 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors duration-200">
                  {book.title}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-1 mb-3">by {book.author}</p>
                <div className="flex justify-between items-center">
                  <StarRating rating={book.rating} />
                  {book.quotes.length > 0 && (
                    <div className="flex items-center text-slate-500 dark:text-slate-400 text-sm bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-full">
                      <Quote className="w-3 h-3 mr-1 text-rose-500" />
                      {book.quotes.length}
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </Link>
        </motion.div>
      ))}
    </div>
  )
}

