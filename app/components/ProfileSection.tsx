export default function ProfileSection() {
    return (
        <section className="flex flex-col items-center text-center p-6 bg-white rounded-lg w-80 ">
            <img
                className="w-24 h-24 rounded-full border-4 border-white shadow-md"
                src="https://via.placeholder.com/96"
                alt="Gabriel Cordeiro"
            />
            <h2 className="text-lg font-semibold mt-4">Gabriel Cordeiro</h2>
            <p className="text-gray-600 text-sm">Head development team Front-End<br />Magazord - Tagged (#BZ)</p>
            <div className="mt-4 space-y-2 text-blue-500 text-sm">
                <p>📄 Magazord - plataforma</p>
                <p>📍 Rio do Sul - SC</p>
                <p>🔗 Cordiaz.hub.wack</p>
                <p>📷 Gabriel.s.cordeiro</p>
            </div>
        </section>
    );
}
