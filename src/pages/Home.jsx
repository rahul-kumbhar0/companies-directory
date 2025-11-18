import React, { useEffect, useState } from 'react'
import CompanyTable from '../components/CompanyTable';
import ClipLoader from "react-spinners/ClipLoader";


export default function Home() {
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState("");
    const [locationFilter, setLocationFilter] = useState("All");
    const [industryFilter, setIndustryFilter] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);

    useEffect(() => {
        fetch("/data/companies.json")
            .then(res => res.json())
            .then(data => {
                setCompanies(data);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    }, [])

    if (loading) {
        return (
            <div className="flex px-5 py-5 justify-center items-center h-40">
                <ClipLoader size={50} color="#4f46e5" />
            </div>
        )
    }

    const uniqueLocations = ["All", ...new Set(companies.map(c => c.location))];
    const uniqueIndustries = ["All", ...new Set(companies.map(c => c.industry))];

    const filteredCompanies = companies
        .filter(c => c.name.toLowerCase().includes(searchText.toLowerCase()))
        .filter(c => locationFilter === "All" ? true : c.location === locationFilter)
        .filter(c => industryFilter === "All" ? true : c.industry === industryFilter);

    const totalItems = filteredCompanies.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = filteredCompanies.slice(startIndex, endIndex);

    const clearFilter = () => {
        setSearchText("");
        setLocationFilter("All");
        setIndustryFilter("All");
        setCurrentPage(1);
    }

    return (
        <div className="p-6">
            <h1 className='text-3xl font-bold mb-6 text-indigo-600 text-center'>
                Companies Directory
            </h1>

            {/* Filters */}
            <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6'>
                <div className="flex flex-col sm:flex-row gap-3 w-full">


                    <input
                        type="text"
                        placeholder='Search by company name...'
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        className='border px-3 py-2 rounded w-full sm:w-64'
                    />

                    <select
                        value={locationFilter}
                        onChange={(e) => setLocationFilter(e.target.value)}
                        className="border px-3 py-2 rounded w-full sm:w-56"
                    >
                        {uniqueLocations.map((loc) => (
                            <option key={loc} value={loc}>{loc}</option>
                        ))}
                    </select>

                    <select
                        value={industryFilter}
                        onChange={(e) => setIndustryFilter(e.target.value)}
                        className="border px-3 py-2 rounded w-full sm:w-56"
                    >
                        {uniqueIndustries.map((ind) => (
                            <option key={ind} value={ind}>{ind}</option>
                        ))}
                    </select>

                    <button
                        onClick={clearFilter}
                        className="px-4 py-2 cursor-pointer ml-2 border rounded bg-white hover:bg-gray-100 text-sm"
                    >
                        Clear
                    </button>

                </div>
            </div>

            {/* Table */}
            <CompanyTable companies={currentItems} />

            {/* Pagination */}
            <div className="flex justify-center items-center gap-4 mt-6">

                <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 border rounded disabled:opacity-50 bg-white hover:bg-gray-100 cursor-pointer"
                >
                    Prev
                </button>

                <span className="text-sm text-gray-600">
                    Page {currentPage} of {totalPages}
                </span>

                <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 border rounded disabled:opacity-50 bg-white hover:bg-gray-100 cursor-pointer"
                >
                    Next
                </button>

            </div>

        </div>
    )
}
