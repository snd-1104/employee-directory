const Option = ({ allVals }) => {
  return allVals.map((singleval, i) => (
    <option key={i} value={singleval}>
      {singleval}
    </option>
  ));
};

export default Option;
