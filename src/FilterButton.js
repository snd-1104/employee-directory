const FilterButton = ({ prop, allVals, filter }) => {
  return (
    <div className="filter-container">
      {allVals.map((singleval, i) => (
        <button
          className="btn btn-outline-secondary l-height-1 m-1 p-1 filter-btn col-auto white-space-nowrap"
          key={i}
          onClick={(e) => filter(e, prop, { singleval })}
          value={singleval}
        >
          {singleval}
        </button>
      ))}
    </div>
  );
};

export default FilterButton;
