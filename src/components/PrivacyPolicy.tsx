import { X } from 'lucide-react'

interface PrivacyPolicyProps {
  onClose: () => void
}

export default function PrivacyPolicy({ onClose }: PrivacyPolicyProps) {
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
          <h1 className="text-3xl font-bold text-white mb-6">Privacy Policy</h1>

          <div className="space-y-6 text-white/80">
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">Your Privacy Matters</h2>
              <p>
                Story Splitter is committed to protecting your privacy. This privacy policy explains
                how we handle your data when you use our application.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">No Data Collection</h2>
              <p className="mb-2">
                <strong className="text-cyan-400">We do not collect, store, or transmit any of your data.</strong>
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>No personal information is collected</li>
                <li>No usage analytics or tracking</li>
                <li>No cookies or local storage (except for browser functionality)</li>
                <li>No third-party services or integrations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">Client-Side Processing</h2>
              <p className="mb-2">
                All video processing happens entirely in your browser:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong className="text-cyan-400">No uploads:</strong> Your videos never leave your device</li>
                <li><strong className="text-cyan-400">No servers:</strong> We don't have any servers to store your data</li>
                <li><strong className="text-cyan-400">Complete privacy:</strong> Only you have access to your videos</li>
                <li><strong className="text-cyan-400">Offline capable:</strong> Works without internet connection</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">Open Source</h2>
              <p>
                Story Splitter is free and open source software. You can review the entire source
                code on{' '}
                <a
                  href="https://github.com/sayedmahmoud266/story-splitter"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 underline"
                >
                  GitHub
                </a>{' '}
                to verify that we don't collect any data.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">Browser Permissions</h2>
              <p className="mb-2">
                The application may request browser permissions for:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>File access:</strong> To read the video files you select</li>
                <li><strong>Download:</strong> To save the processed video segments</li>
              </ul>
              <p className="mt-2">
                These permissions are used solely for the application's functionality and do not
                involve any data transmission.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">Changes to This Policy</h2>
              <p>
                Since we don't collect any data, this policy is unlikely to change. Any updates
                will be reflected in the application's source code on GitHub.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">Contact</h2>
              <p>
                If you have any questions about this privacy policy, please visit{' '}
                <a
                  href="https://sayedmahmoud266.website"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 underline"
                >
                  sayedmahmoud266.website
                </a>
              </p>
            </section>

            <div className="mt-8 p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
              <p className="text-cyan-300 font-semibold">
                ✓ Your privacy is guaranteed. Everything happens on your device.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
