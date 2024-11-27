import axios from "axios";
import { FormEvent, useState, useMemo } from "react";
import { PacmanLoader } from "react-spinners";
import { toast } from "react-toastify";

interface TotalSubmission {
  difficulty: string;
  count: number;
  submissions: number;
}

interface RecentSubmission {
  title: string;
  titleSlug: string;
  timestamp: number;
  statusDisplay: string;
  lang: string;
  __typename: string;
}

interface Data {
  totalSolved: number;
  totalSubmissions: TotalSubmission[];
  totalQuestions: number;
  easySolved: number;
  totalEasy: number;
  mediumSolved: number;
  totalMedium: number;
  hardSolved: number;
  totalHard: number;
  ranking: number;
  recentSubmissions: RecentSubmission[];
}

const Leetcode = () => {
  const [username, setUsername] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<Data | null>(null);
  const [submissions, setSubmissions] = useState<RecentSubmission[]>([]);

  const getData = async () => {
    const response = await axios.get(
      `https://leetcode-api-faisalshohag.vercel.app/${username}`
    );

    if (response.data.errors) {
      throw new Error();
    }

    setData(response.data);
    setSubmissions(response.data.recentSubmissions);
  };

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await getData();
      setCurrentPage(1);
    } catch {
      toast.error(`User ${username} not found`);
    } finally {
      setIsLoading(false);
    }
  };

  const convertEpochToCustomDate = (epochTime: number) => {
    const timestamp = epochTime * 1000;
    const date = new Date(timestamp);

    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = monthNames[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    const timezoneOffset = -date.getTimezoneOffset() / 60;
    const timezone = `UTC${timezoneOffset >= 0 ? "+" : ""}${timezoneOffset}`;

    return `${month}/${day}/${year} ${hours}:${minutes} ${timezone}`;
  };

  const handleConvert = (epoch: number) => {
    if (!isNaN(Number(epoch))) {
      return convertEpochToCustomDate(Number(epoch));
    } else {
      return "Invalid epoch time";
    }
  };

  // Pagination states
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10; // Number of items to show per page

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = submissions.slice(indexOfFirstItem, indexOfLastItem);

  // Improved pagination rendering
  const totalPages = Math.ceil(submissions.length / itemsPerPage);

  const getPaginationNumbers = useMemo(() => {
    // If total pages is 7 or less, show all pages
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // Otherwise, create a more complex pagination
    const pages: (number | string)[] = [];

    // Always show first page
    pages.push(1);

    // Logic for showing pages around current page
    if (currentPage > 4) {
      pages.push("...");
    }

    // Calculate range of pages to show
    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    // Add ellipsis before last page if needed
    if (currentPage < totalPages - 3) {
      pages.push("...");
    }

    // Always show last page
    pages.push(totalPages);

    return pages;
  }, [currentPage, totalPages]);

  const paginate = (pageNumber: number | string) => {
    if (typeof pageNumber === "number") {
      setCurrentPage(pageNumber);
    }
  };
  return (
    <div className="h-screen p-20 bg-[#FAFAFC] text-[16px]">
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <PacmanLoader color="#fff" size={30} />
        </div>
      )}
      <form onSubmit={handleSearch}>
        <div className="flex gap-x-3 items-center justify-center">
          <label>Username: </label>

          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            type="text"
            className="text-[16px] py-2 px-3 block w-[250px] border-black border-[1px] rounded-md focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
          />
          <button
            type="submit"
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          >
            Search
          </button>
        </div>
      </form>
      <div className="mt-3 mb-3 flex gap-x-20 justify-center">
        Solved: {data != null && data.totalSolved + "/"}
        {data != null && data.totalQuestions}
      </div>
      <div className="mt-3 mb-3 flex gap-x-14 justify-center">
        <div>
          Easy: {data != null && data.easySolved + "/"}
          {data != null && data.totalEasy}
        </div>
        <div>
          Medium: {data != null && data.mediumSolved + "/"}
          {data != null && data.totalMedium}
        </div>
        <div>
          Hard: {data != null && data.hardSolved + "/"}
          {data != null && data.totalHard}
        </div>
      </div>
      <div className="flex flex-col text-[13px]">
        <div className="-m-1.5">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="border rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center font-medium"
                    >
                      Time Submitted
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center font-medium"
                    >
                      Question
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center font-medium"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center font-medium"
                    >
                      Language
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {currentItems.map((x, i) => (
                    <tr key={i}>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                        {handleConvert(x.timestamp)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-800 text-center">
                        <a
                          href={`https://leetcode.com/problems/${x.titleSlug}`}
                          className="underline"
                          target="_blank"
                        >
                          {x.title}
                        </a>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-800 text-center">
                        {x.statusDisplay == "Accepted" ? (
                          <div>
                            <span className="text-green-600 font-semibold">{x.statusDisplay}</span>
                          </div>
                        )
                        : <div>
                            <span className="">{x.statusDisplay}</span>
                          </div>
                      }
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-800 text-center">
                        {x.lang}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Improved Pagination Controls */}
        <div className="flex justify-center mt-4 space-x-2 mb-5">
          {/* Previous button */}
          <button
            onClick={() => currentPage > 1 && paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 border rounded ${
              currentPage === 1
                ? "bg-gray-200 text-gray-400"
                : "bg-white text-blue-500 hover:bg-blue-100"
            }`}
          >
            Previous
          </button>

          {/* Page numbers */}
          {getPaginationNumbers.map((pageNumber, index) => (
            <button
              key={index}
              onClick={() => paginate(pageNumber)}
              className={`px-4 py-2 border rounded ${
                pageNumber === currentPage
                  ? "bg-blue-500 text-white"
                  : pageNumber === "..."
                  ? "cursor-default bg-white text-gray-500"
                  : "bg-white text-blue-500 hover:bg-blue-100"
              }`}
              disabled={pageNumber === "..."}
            >
              {pageNumber}
            </button>
          ))}

          {/* Next button */}
          <button
            onClick={() =>
              currentPage < totalPages && paginate(currentPage + 1)
            }
            disabled={currentPage === totalPages}
            className={`px-4 py-2 border rounded ${
              currentPage === totalPages
                ? "bg-gray-200 text-gray-400"
                : "bg-white text-blue-500 hover:bg-blue-100"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Leetcode;
