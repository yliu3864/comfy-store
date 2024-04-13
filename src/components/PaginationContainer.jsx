import { useLoaderData, useLocation, useNavigate } from "react-router-dom";

const PaginationContainer = () => {
  const { meta } = useLoaderData();
  const { pageCount, page } = meta.pagination;

  const pages = Array.from({ length: pageCount }, (_, index) => {
    return index + 1;
  });
  const { search, pathname } = useLocation();
  const navigate = useNavigate();
  const handlePageChange = (pageNum) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set("page", pageNum);
    navigate(`${pathname}?${searchParams.toString()}`);
  };
  if (pageCount < 2) return null;
  return (
    <div className="mt-16 flex justify-end">
      <div className="join">
        <button
          className="btn btn-xs sm:btn-md join-item"
          onClick={() => {
            let prevP = page - 1;
            if (prevP < 1) prevP = pageCount;
            handlePageChange(prevP);
          }}
        >
          Prev
        </button>
        {pages.map((num) => {
          return (
            <button
              className={`btn btn-xs sm:btn-md border-none join-item ${
                num === page ? "bg-base-300 border-base-300" : ""
              }`}
              key={num}
              onClick={() => {
                handlePageChange(num);
              }}
            >
              {num}
            </button>
          );
        })}
        <button
          className="btn btn-xs sm:btn-md join-item"
          onClick={() => {
            let prevP = page + 1;
            if (prevP > pageCount) prevP = 1;
            handlePageChange(prevP);
            handlePageChange(prevP);
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PaginationContainer;
