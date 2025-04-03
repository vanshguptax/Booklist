"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Trash2, Plus, Quote, BookOpen } from "lucide-react"
import StarRating from "@/components/star-rating"
import { motion, AnimatePresence } from "framer-motion"

export default function BookDetail({ params }) {
  const router = useRouter()
  const { id } = params
  const [book, setBook] = useState(null)
  const [newQuote, setNewQuote] = useState("")
  const [loading, setLoading] = useState(true)
  const [addingQuote, setAddingQuote] = useState(false)

  useEffect(() => {
    // In a real app, you would fetch this from an API
    const books = JSON.parse(localStorage.getItem("books") || "[]")
    const foundBook = books.find((b) => b.id === id)

    if (foundBook) {
      setBook(foundBook)
    } else {
      router.push("/")
    }

    setLoading(false)
  }, [id, router])

  const handleRatingChange = (newRating) => {
    const updatedBook = { ...book, rating: newRating }
    updateBook(updatedBook)
  }

  const addQuote = () => {
    if (!newQuote.trim()) return

    setAddingQuote(true)

    setTimeout(() => {
      const updatedBook = {
        ...book,
        quotes: [...book.quotes, { id: Date.now().toString(), text: newQuote }],
      }

      updateBook(updatedBook)
      setNewQuote("")
      setAddingQuote(false)
    }, 300)
  }

  const removeQuote = (quoteId) => {
    const updatedBook = {
      ...book,
      quotes: book.quotes.filter((quote) => quote.id !== quoteId),
    }

    updateBook(updatedBook)
  }

  const updateBook = (updatedBook) => {
    const books = JSON.parse(localStorage.getItem("books") || "[]")
    const updatedBooks = books.map((b) => (b.id === id ? updatedBook : b))

    localStorage.setItem("books", JSON.stringify(updatedBooks))
    setBook(updatedBook)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <BookOpen className="w-12 h-12 text-rose-500 mb-4" />
          <p className="text-slate-600 dark:text-slate-400">Loading book details...</p>
        </div>
      </div>
    )
  }

  if (!book) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">Book not found</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-4">The book you're looking for doesn't exist.</p>
          <Link href="/">
            <Button className="bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 transition-all duration-300">
              Return to Library
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <Link
          href="/"
          className="flex items-center text-sm mb-8 hover:underline text-slate-600 dark:text-slate-400 group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
          Back to Reading List
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="md:col-span-1">
            <Card className="border-none shadow-xl overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-rose-500 to-purple-600"></div>
              <CardContent className="pt-6">
                <div className="aspect-[2/3] relative mb-6 rounded-md overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-[1.02]">
                  {book.coverUrl ? (
                    <Image src={book.coverUrl || "/placeholder.svg"} alt={book.title} fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-700 text-slate-500 dark:text-slate-400">
                      <BookOpen className="w-12 h-12 opacity-50" />
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <h2 className="font-semibold text-lg mb-2 text-slate-700 dark:text-slate-300">Your Rating</h2>
                    <StarRating rating={book.rating} onRatingChange={handleRatingChange} editable={true} />
                  </div>

                  <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Added on {new Date(book.dateAdded).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-2 space-y-6">
            <Card className="border-none shadow-xl overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-rose-500 to-purple-600"></div>
              <CardHeader>
                <CardTitle className="text-2xl">{book.title}</CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-400">by {book.author}</CardDescription>
              </CardHeader>
              <CardContent>
                {book.description ? (
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{book.description}</p>
                ) : (
                  <p className="text-slate-500 dark:text-slate-500 italic">No description available</p>
                )}
              </CardContent>
            </Card>

            <Card className="border-none shadow-xl overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-rose-500 to-purple-600"></div>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-xl">
                  <Quote className="w-5 h-5 mr-2 text-rose-500" />
                  Memorable Quotes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-2">
                  <Textarea
                    placeholder="Add a memorable quote from this book..."
                    value={newQuote}
                    onChange={(e) => setNewQuote(e.target.value)}
                    className="transition-all duration-200 focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                  />
                  <Button
                    onClick={addQuote}
                    className="shrink-0 bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 transition-all duration-300"
                    disabled={!newQuote.trim() || addingQuote}
                  >
                    {addingQuote ? (
                      <svg
                        className="animate-spin h-4 w-4 text-white"
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
                    ) : (
                      <Plus className="w-4 h-4" />
                    )}
                  </Button>
                </div>

                {book.quotes.length === 0 ? (
                  <div className="text-center py-8 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-dashed border-slate-300 dark:border-slate-700">
                    <Quote className="w-8 h-8 mx-auto text-slate-400 dark:text-slate-600 mb-2" />
                    <p className="text-slate-500 dark:text-slate-500 italic">No quotes added yet</p>
                    <p className="text-sm text-slate-400 dark:text-slate-600">
                      Add your favorite passages from this book
                    </p>
                  </div>
                ) : (
                  <AnimatePresence>
                    <div className="space-y-3">
                      {book.quotes.map((quote) => (
                        <motion.div
                          key={quote.id}
                          className="flex group p-4 border border-slate-200 dark:border-slate-700 rounded-md bg-white dark:bg-slate-800 shadow-sm hover:shadow-md transition-all duration-200"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="flex-1">
                            <div className="text-rose-500 dark:text-rose-400 text-lg mb-1">"</div>
                            <p className="text-slate-700 dark:text-slate-300 italic px-2">{quote.text}</p>
                            <div className="text-rose-500 dark:text-rose-400 text-lg text-right">"</div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeQuote(quote.id)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 className="w-4 h-4 text-rose-500 hover:text-rose-700 transition-colors" />
                          </Button>
                        </motion.div>
                      ))}
                    </div>
                  </AnimatePresence>
                )}
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

