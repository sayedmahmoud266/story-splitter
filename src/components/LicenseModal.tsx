import { X } from 'lucide-react'

interface LicenseModalProps {
  onClose: () => void
}

export default function LicenseModal({ onClose }: LicenseModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-slate-900/95 to-purple-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        >
          <X className="w-5 h-5 text-white" />
        </button>

        {/* Content */}
        <div className="p-8">
          <h1 className="text-3xl font-bold text-white mb-6">MIT License</h1>

          <div className="space-y-6 text-white/80">
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">Free & Open Source</h2>
              <p>
                Story Splitter is free and open source software licensed under the MIT License.
                This means you can use, modify, and distribute it freely.
              </p>
            </section>

            <section className="bg-black/30 p-6 rounded-lg border border-white/10 font-mono text-sm">
              <p className="text-white mb-4">MIT License</p>
              <p className="mb-4">Copyright (c) {new Date().getFullYear()} sayedmahmoud266</p>
              <p className="mb-4">
                Permission is hereby granted, free of charge, to any person obtaining a copy
                of this software and associated documentation files (the "Software"), to deal
                in the Software without restriction, including without limitation the rights
                to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
                copies of the Software, and to permit persons to whom the Software is
                furnished to do so, subject to the following conditions:
              </p>
              <p className="mb-4">
                The above copyright notice and this permission notice shall be included in all
                copies or substantial portions of the Software.
              </p>
              <p className="text-yellow-300">
                THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
                IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
                FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
                AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
                LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
                OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
                SOFTWARE.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">What This Means</h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong className="text-cyan-400">Free to use:</strong> Use this software for any purpose</li>
                <li><strong className="text-cyan-400">Free to modify:</strong> Change the code to fit your needs</li>
                <li><strong className="text-cyan-400">Free to distribute:</strong> Share it with others</li>
                <li><strong className="text-cyan-400">Free to sell:</strong> Use it in commercial projects</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">Privacy Guarantee</h2>
              <p>
                This software processes all videos locally on your device. No data is collected,
                stored, or transmitted to any server. Your privacy is completely protected.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">Source Code</h2>
              <p>
                View the complete source code on{' '}
                <a
                  href="https://github.com/sayedmahmoud266/story-splitter"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 underline"
                >
                  GitHub
                </a>
              </p>
            </section>

            <div className="mt-8 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
              <p className="text-green-300 font-semibold">
                ✓ Free forever. Open source. No hidden costs or data collection.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
