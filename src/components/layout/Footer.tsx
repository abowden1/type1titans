export default function Footer() {
  return (
    <footer className="text-white p-4 mt-auto bg-black/20 backdrop-blur-sm">
      <div className="container mx-auto text-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} Your Forum Name. All rights reserved.</p>
      </div>
    </footer>
  )
} 