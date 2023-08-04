import ErrorPage from "../assets/images/maintenance/Error404.png";

const NotFound = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "80vh",
      }}
    >
      <div style={{ width: "36rem", height: "30rem" }}>
        <img
          src={ErrorPage}
          alt="error"
          style={{
            width: "100%",
            height: "100%",
            display: "block",
            objectFit: "contain",
          }}
        />
      </div>
      <h1>존재하지않는 페이지입니다</h1>
    </div>
  );
};

export default NotFound;
