export const Notify = ({ variant = "alert-danger", message }) => {
  return (
    <>
      <div className={"alert".concat(" ", variant)} role="alert">
        {message}
      </div>
    </>
  );
};
