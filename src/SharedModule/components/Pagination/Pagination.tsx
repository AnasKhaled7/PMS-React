import BootstrapPagination from "react-bootstrap/Pagination";

interface Props {
  pageNumber: number;
  setPageNumber: (pageNumber: number) => void;
  totalNumberOfPages: number;
}

const Pagination = ({
  pageNumber,
  setPageNumber,
  totalNumberOfPages,
}: Props) => {
  return (
    <BootstrapPagination className="justify-content-center">
      <BootstrapPagination.Prev
        linkClassName="text-warning"
        onClick={() => pageNumber > 1 && setPageNumber(pageNumber - 1)}
      />
      {Array.from({ length: totalNumberOfPages }, (_, i) => (
        <BootstrapPagination.Item
          key={i}
          active={i === pageNumber - 1}
          onClick={() => setPageNumber(i + 1)}
          linkClassName={`${
            i === pageNumber - 1
              ? "text-bg-warning border-warning"
              : "text-black"
          }`}
        >
          {i + 1}
        </BootstrapPagination.Item>
      ))}
      <BootstrapPagination.Next
        linkClassName="text-warning"
        onClick={() =>
          pageNumber < totalNumberOfPages && setPageNumber(pageNumber + 1)
        }
      />
    </BootstrapPagination>
  );
};

export default Pagination;
