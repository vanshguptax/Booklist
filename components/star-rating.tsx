"use client"

import { Star } from "lucide-react"
import { motion } from "framer-motion"

interface StarRatingProps {
  rating: number
  onRatingChange?: (rating: number) => void
  editable?: boolean
}

export default function StarRating({ rating = 0, onRatingChange, editable = false }: StarRatingProps) {
  const stars = [1, 2, 3, 4, 5]

  const handleClick = (star: number) => {
    if (editable && onRatingChange) {
      // If clicking the same star that's already selected, clear the rating
      if (rating === star) {
        onRatingChange(0)
      } else {
        onRatingChange(star)
      }
    }
  }

  return (
    <div className="flex">
      {stars.map((star) => (
        <motion.div key={star} whileHover={editable ? { scale: 1.2 } : {}} whileTap={editable ? { scale: 0.9 } : {}}>
          <Star
            className={`w-5 h-5 transition-all duration-300 ${
              star <= rating ? "text-yellow-500 fill-yellow-500 drop-shadow-sm" : "text-slate-300 dark:text-slate-600"
            } ${editable ? "cursor-pointer hover:text-yellow-400" : ""}`}
            onClick={() => handleClick(star)}
          />
        </motion.div>
      ))}
    </div>
  )
}

