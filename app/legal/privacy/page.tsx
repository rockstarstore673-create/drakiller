export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-24 text-slate-100">
      <div className="mx-auto max-w-4xl space-y-6">
        <p className="text-sm uppercase tracking-[0.25em] text-blue-400">Legal</p>
        <h1 className="text-4xl font-bold text-white">Privacy Policy</h1>
        <p className="text-slate-300">Drakiller mengumpulkan data yang diperlukan untuk autentikasi, penyimpanan file, analitik produk, dan keamanan akun. File user disimpan secara private dan hanya dapat diakses pemiliknya kecuali ada pengaturan berbagi yang eksplisit.</p>
        <p className="text-slate-300">Data yang dikumpulkan bisa mencakup email, profile, aktivitas project, AI chat history, data GitHub pencarian, dan audit log keamanan. Data dapat dihapus berdasarkan permintaan user atau kebijakan retention yang berlaku.</p>
        <p className="text-slate-300">Kami menggunakan Supabase, Vercel, GitHub API, dan AI provider seperti Groq. Data dapat diproses di layanan pihak ketiga sesuai kebutuhan produk. Kami membatasi akses hanya pada data yang diperlukan.</p>
      </div>
    </main>
  );
}
