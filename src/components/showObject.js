const ShowObject = (props) => {
  console.log(props.data)
  //   const content = Object.entries(object).map((item) => <>{item[0] + item[1]}</>);
  return (
    <>
      {props.data && Object.entries(props.data).map((item) => (
        <div>
            {item[0] + " " + item[1] + " "}
        </div>
      ))}
    </>
  );
};

export default ShowObject;
