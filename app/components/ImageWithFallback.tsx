'use client'

import Image from "next/image"
import { useState } from "react"

export function ImageWithFallback({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const [imgSrc, setImgSrc] = useState(src)

  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill
      className={className}
      onError={() => {
        setImgSrc("/placeholder.svg?height=400&width=600&text=Hình+ảnh+bài+học")
      }}
      priority={true}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
  )
} 