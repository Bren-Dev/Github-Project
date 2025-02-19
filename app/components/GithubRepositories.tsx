export default function GitHubRepositories() {
    return (
        <div className="p-6 bg-white">
            <section className="flex items-center space-x-6 mb-4">
                <div className="flex items-center space-x-2">
                    <span className="font-semibold">📂 Repositories</span>
                    <span className="bg-gray-200 text-gray-700 px-2 py-1 text-xs rounded-full">81</span>
                </div>
                <div className="flex items-center space-x-2">
                    <span className="text-gray-500">⭐ Starred</span>
                    <span className="bg-gray-200 text-gray-700 px-2 py-1 text-xs rounded-full">12</span>
                </div>
            </section>

            <section className="flex items-center space-x-4 mb-4">
                <input
                    type="text"
                    placeholder="Search Here"
                    className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring"
                />
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md">Type</button>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md">Language</button>
            </section>

            <section className="space-y-6">
                <div>
                    <h3 className="font-semibold">Node / <a href="#" className="text-blue-600">Release</a></h3>
                    <p className="text-gray-500 text-sm">Node.js Foundation Release Working Group.</p>
                    <div className="text-gray-600 text-sm flex space-x-4">
                        <span>⭐ 1.569</span>
                        <span>🔗 142</span>
                    </div>
                </div>

                <div>
                    <h3 className="font-semibold">Cordeiro / <a href="#" className="text-blue-600">Angular Choosen</a></h3>
                    <p className="text-gray-500 text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
                    <div className="text-gray-600 text-sm flex space-x-4">
                        <span>⭐ 726</span>
                        <span>🔗 91</span>
                    </div>
                </div>

                <div>
                    <h3 className="font-semibold">Teste / <a href="#" className="text-blue-600">App Release 1.03</a></h3>
                    <p className="text-gray-500 text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
                    <div className="text-gray-600 text-sm flex space-x-4">
                        <span>⭐ 9.327</span>
                        <span>🔗 562</span>
                    </div>
                </div>
            </section>
        </div>
    );
}
