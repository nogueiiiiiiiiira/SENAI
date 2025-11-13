import React, { useState } from 'react';
import { Table as BootstrapTable, Pagination, Form } from 'react-bootstrap';
import LoadingSpinner from './LoadingSpinner';
import { TABLE_PAGE_SIZE } from '../utils/constants';

const Table = ({
  columns,
  data,
  loading = false,
  error = null,
  searchable = true,
  paginated = true,
  onRowClick = null,
  className = '',
  striped = true,
  hover = true,
  responsive = true
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Filter data based on search term
  const filteredData = data.filter(item =>
    columns.some(column =>
      String(item[column.key] || '').toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Paginate data
  const totalPages = Math.ceil(filteredData.length / TABLE_PAGE_SIZE);
  const startIndex = (currentPage - 1) * TABLE_PAGE_SIZE;
  const paginatedData = paginated
    ? filteredData.slice(startIndex, startIndex + TABLE_PAGE_SIZE)
    : filteredData;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  if (error) {
    return (
      <div className="alert alert-danger text-center" role="alert">
        {error}
      </div>
    );
  }

  const tableContent = (
    <BootstrapTable
      striped={striped}
      hover={hover}
      responsive={responsive}
      className={className}
    >
      <thead>
        <tr>
          {columns.map(column => (
            <th key={column.key} style={column.width ? { width: column.width } : {}}>
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {paginatedData.length === 0 ? (
          <tr>
            <td colSpan={columns.length} className="text-center text-muted">
              Nenhum dado encontrado.
            </td>
          </tr>
        ) : (
          paginatedData.map((item, index) => (
            <tr
              key={item.id || index}
              onClick={() => onRowClick && onRowClick(item)}
              style={onRowClick ? { cursor: 'pointer' } : {}}
            >
              {columns.map(column => (
                <td key={column.key}>
                  {column.render
                    ? column.render(item[column.key], item)
                    : item[column.key] || '-'
                  }
                </td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </BootstrapTable>
  );

  return (
    <div>
      {searchable && (
        <div className="d-flex justify-content-between align-items-center mb-3">
          <Form.Control
            type="text"
            placeholder="Pesquisar..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-auto"
            style={{ minWidth: '250px' }}
          />
          <small className="text-muted">
            {filteredData.length} resultado{filteredData.length !== 1 ? 's' : ''}
          </small>
        </div>
      )}

      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {tableContent}

          {paginated && totalPages > 1 && (
            <div className="d-flex justify-content-center mt-3">
              <Pagination>
                <Pagination.First
                  onClick={() => handlePageChange(1)}
                  disabled={currentPage === 1}
                />
                <Pagination.Prev
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                />

                {[...Array(totalPages)].map((_, index) => {
                  const page = index + 1;
                  const isCurrentPage = page === currentPage;
                  const showPage = (
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  );

                  if (!showPage) {
                    if (page === currentPage - 2 || page === currentPage + 2) {
                      return <Pagination.Ellipsis key={page} />;
                    }
                    return null;
                  }

                  return (
                    <Pagination.Item
                      key={page}
                      active={isCurrentPage}
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </Pagination.Item>
                  );
                })}

                <Pagination.Next
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                />
                <Pagination.Last
                  onClick={() => handlePageChange(totalPages)}
                  disabled={currentPage === totalPages}
                />
              </Pagination>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Table;
