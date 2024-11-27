import axios from "axios";
import { FormEvent, useState, useMemo } from "react";
import { PacmanLoader } from "react-spinners";
import { toast } from "react-toastify";

interface Problem {
  contestId: number;
  index: string;
  name: string;
}

interface Status {
  id: number;
  creationTimeSeconds: number;
  problem: Problem;
  programmingLanguage: string;
  verdict: string;
  passedTestCount: number;
  timeConsumedMillis: number;
  memoryConsumedBytes: number;
}

const Codeforces = () => {
  const [problems, setProblems] = useState<number>();
  const [status, setStatus] = useState<Status[]>([]);
  const [solved, setSolved] = useState<number>();
  const [rating, setRating] = useState<number>();
  const [username, setUsername] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getProblems = async () => {
    const response = await axios.get(
      "https://codeforces.com/api/problemset.problems"
    );
    setProblems(response.data.result.problems.length);
  };

  const getStatus = async () => {
    const response = await axios.get(
      `https://codeforces.com/api/user.status?handle=${username}`
    );
    const results = response.data.result;
    setSolved(results.filter((x: Status) => x.verdict == "OK").length);
    setStatus(results);
  };

  const getRating = async () => {
    const response = await axios.get(
      `https://codeforces.com/api/user.rating?handle=${username}`
    );

    const results = response.data.result;

    setRating(results[results.length - 1].newRating);
  };

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await Promise.all([getRating(), getStatus(), getProblems()]);
      // Reset to first page after new search
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
  const currentItems = status.slice(indexOfFirstItem, indexOfLastItem);

  // Improved pagination rendering
  const totalPages = Math.ceil(status.length / itemsPerPage);

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
        <p>Rating: {isLoading ? "" : rating}</p>
        <p>Solved: {isLoading ? "" : solved ? `${solved}/${problems}` : ""}</p>
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
                      ID
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center font-medium"
                    >
                      When
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center font-medium"
                    >
                      Problem
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center font-medium"
                    >
                      Lang
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center font-medium"
                    >
                      Verdict
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center font-medium"
                    >
                      Time
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center font-medium"
                    >
                      Memory
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {currentItems.map((x) => (
                    <tr key={x.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-800 text-center">
                        {x.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                        {handleConvert(x.creationTimeSeconds)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-800 text-center">
                        <a
                          href={`https://codeforces.com/problemset/problem/${x.problem.contestId}/${x.problem.index}`}
                          className="underline"
                          target="_blank"
                        >
                          {`${x.problem.contestId}${x.problem.index} - ${x.problem.name}`}
                        </a>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-800 text-center">
                        {x.programmingLanguage}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-800 text-center">
                        {x.verdict == "OK" && (
                          <div className="text-[#00AA00] font-semibold">
                            Accepted
                          </div>
                        )}
                        {x.verdict == "TIME_LIMIT_EXCEEDED" && (
                          <div>
                            Time limit exceeded on test {x.passedTestCount + 1}
                          </div>
                        )}
                        {x.verdict == "WRONG_ANSWER" && (
                          <div>
                            Wrong answer on test {x.passedTestCount + 1}
                          </div>
                        )}

                        {x.verdict == "RUNTIME_ERROR" && (
                          <div>Runtime error</div>
                        )}

                        {x.verdict == "COMPILATION_ERROR" && (
                          <div>Compilation error</div>
                        )}

                        {x.verdict == "MEMORY_LIMIT_EXCEEDED" && (
                          <div>Memory limit exceeded</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-800 text-center">
                        {x.timeConsumedMillis} ms
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-800 text-center">
                        {x.memoryConsumedBytes / 1024} KB
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

export default Codeforces;
