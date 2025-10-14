import { Heart } from 'lucide-react'

interface FooterProps {
  onPrivacyClick: () => void
  onLicenseClick: () => void
}

export default function Footer({ onPrivacyClick, onLicenseClick }: FooterProps) {
  return (
    <footer className="relative z-10 mt-16 border-t border-white/10">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center gap-4">
          {/* Made with love */}
          <div className="flex items-center gap-2 text-white/80">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            <span>by</span>
            <a
              href="https://sayedmahmoud266.website"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 transition-colors font-semibold"
            >
              sayedmahmoud266
            </a>
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-white/60">
            <button
              onClick={onPrivacyClick}
              className="hover:text-white/90 transition-colors"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button
              onClick={onLicenseClick}
              className="hover:text-white/90 transition-colors"
            >
              License
            </button>
            <span>•</span>
            <a
              href="https://github.com/sayedmahmoud266/story-splitter"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white/90 transition-colors"
            >
              GitHub
            </a>
          </div>

          {/* Copyright */}
          <div className="text-xs text-white/40">
            © {new Date().getFullYear()} Story Splitter. Open Source & Free Forever.
          </div>
        </div>
      </div>
    </footer>
  )
}
