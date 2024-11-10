/* eslint-disable react/prop-types */




export const PageContent = ({ title, children }) => {
  return (
    <>
      <div className="text-center mt-8">
        <h1
        className=" uppercase text-4xl font-bold font-mono"
        >
          {title}
        </h1>
        {children}
      </div>
    </>
  );
}