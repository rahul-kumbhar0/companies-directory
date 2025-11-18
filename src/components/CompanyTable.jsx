export default function CompanyTable({ companies }) {
    if (!companies.length) {
        return <p className="text-red-600 mt-4">No companies available.</p>;
    }

    return (
        <div className="overflow-x-auto mt-4">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-sm">

                <thead className="bg-gray-100">
                    <tr>
                        <th className="text-left px-4 py-2 border-b">Name</th>
                        <th className="text-left px-4 py-2 border-b">Location</th>
                        <th className="text-left px-4 py-2 border-b">Industry</th>
                    </tr>
                </thead>

                <tbody>
                    {companies.map((company) => (
                        <tr key={company.id} className="hover:bg-gray-100 transition">
                            <td className="px-4 py-2 border-b">{company.name}</td>
                            <td className="px-4 py-2 border-b">{company.location}</td>
                            <td className="px-4 py-2 border-b">{company.industry}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
