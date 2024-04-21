import { useLoaderData, useLocation, useNavigate } from "react-router-dom";

const ComplexPaginationContainer = () => {
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

  const addPageButton = ({ num, activeClass }) => {
    return (
      <button
        className={`btn btn-xs sm:btn-md border-none join-item ${
          activeClass ? "bg-base-300 border-base-300" : ""
        }`}
        key={num}
        onClick={() => {
          handlePageChange(num);
        }}
      >
        {num}
      </button>
    );
  };

  const renderPageButtons = () => {
    const pageButtons = [];
    pageButtons.push(addPageButton({ pageNum: 1, activeClass: page == 1 }));
    pageButtons.push(
      <button className="join-item btn btn-xs sm:btn-sm" key="dots-1">
        ...
      </button>
    );

    if (page !== 1 && page !== pageCount) {
      pageButtons.push(addPageButton({ pageNum: page, activeClass: true }));
    }

    pageButtons.push(
      addPageButton({ pageNum: pageCount, activeClass: page == pageCount })
    );
    return pageButtons;
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
        {renderPageButtons()}
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

export default ComplexPaginationContainer;
