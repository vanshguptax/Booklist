import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import BookList from "@/components/book-list"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="container py-12 mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-start mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-rose-500 to-purple-600 bg-clip-text text-transparent mb-3">
            My Reading Journey
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-2xl">
            Track your reading progress, save memorable quotes, and rate your favorite books.
          </p>
          <Link href="/add-book">
            <Button className="bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg">
              <PlusCircle className="w-4 h-4 mr-2" />
              Add New Book
            </Button>
          </Link>
        </div>
        <BookList />
      </div>
    </div>
  )
}

