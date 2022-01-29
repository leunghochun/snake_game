const ShowObject = (props) => {
  return (
    <>
      {props.data && Object.entries(props.data).map((item, i) => (
        <div key={item[0] + i}>
            {item[0] + " " + item[1] + " "}
        </div>
      ))}
    </>
  );
};

export default ShowObject;
