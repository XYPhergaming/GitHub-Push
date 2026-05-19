export default function Footer() {
  return (
    <footer className="bg-white border-t py-4 text-center text-sm text-gray-500">
      <p>&copy; {new Date().getFullYear()} Mini Chat App. Built with Next.js & Firebase.</p>
    </footer>
  );
}