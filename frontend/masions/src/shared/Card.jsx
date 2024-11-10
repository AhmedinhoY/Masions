/* eslint-disable react/prop-types */


export const Card = ({children,classes})=>{
  return (
    <>
    <div className={` w-[67%] mx-auto sm:w-[48.8%] sm:mx-0 md:w-[32.3%]  px-8 py-4 bg-white border-stone-300 border-[1px] rounded-md drop-shadow-xl flex items-center justify-center ${classes}`}>
      {children}
    </div>
    </>
  );
}