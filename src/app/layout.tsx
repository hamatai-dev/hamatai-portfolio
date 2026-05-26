// Root layout — minimal shell required by Next.js.
// The actual <html>/<body> and locale-aware Provider live in [locale]/layout.tsx.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
