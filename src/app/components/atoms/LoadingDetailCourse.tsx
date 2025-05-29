"use client";

export const LoadingDetailCourse = () => {
  return (
    <div className="bg-white p-8">
      <div className="mb-8">
        <div className="w-full h-[360px] bg-gradient-to-r from-gray-200 via-gray-200 to-gray-200 mb-4 animate-pulse overflow-hidden relative">
          <div className="absolute inset-0 mx-auto my-auto flex justify-center items-center w-3/5 h-4/5 bg-gray-200 shadow-sm">
            <div className="w-[90%] h-[80%] rounded flex justify-center items-center">
              <div className="w-24 h-36 bg-gray-200"></div>
            </div>
          </div>
        </div>

        <div className="bg-white text-white flex p-2 mb-4 rounded">
          <div className="h-6 bg-gray-200 rounded w-[80px] mx-2 animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded w-[120px] mx-2 animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded w-[100px] mx-2 animate-pulse"></div>
        </div>
        <div className="bg-white p-4 shadow-sm mb-4">
          <div className="flex items-center mb-3">
            <div className="h-4 w-4 rounded-full bg-gray-200 mr-2 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-[180px] animate-pulse"></div>
          </div>
          <div className="flex items-center mb-3">
            <div className="h-4 w-4 rounded-full bg-gray-200 mr-2 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-[100px] animate-pulse"></div>
          </div>
          <div className="flex items-center mb-3">
            <div className="h-4 w-4 rounded-full bg-gray-200 mr-2 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-[120px] animate-pulse"></div>
          </div>
        </div>
        <div className="bg-white p-4 shadow-sm mb-8">
          <div className="h-4 bg-gray-200 rounded w-full mb-3 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-3 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-3 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-3 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-4/5 mb-3 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-3 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-3 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-4/5 animate-pulse"></div>
        </div>
      </div>
      <div className="bg-white shadow-sm p-4">
        <div className="flex justify-between mb-4">
          <div className="h-6 bg-gray-200 rounded w-[150px] animate-pulse"></div>
          <div className="flex">
            <div className="h-6 w-6 bg-yellow-200 rounded mx-1 animate-pulse"></div>
            <div className="h-6 w-6 bg-yellow-200 rounded mx-1 animate-pulse"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="bg-gradient-to-r from-gray-200 to-gray-200 overflow-hidden"
            >
              <div className="w-full h-[160px] flex justify-center items-center">
                {index === 1 ? (
                  <div className="w-16 h-16 bg-gray-200 rounded flex justify-center items-center">
                    <div className="h-6 bg-gray-200 w-10 rounded"></div>
                  </div>
                ) : (
                  <div className="w-16 h-24 bg-gray-200 rounded"></div>
                )}
              </div>
              <div className="bg-white p-2 rounded-b-md">
                <div className="h-5 bg-gray-200 rounded w-3/4 mb-1 animate-pulse"></div>
                <div className="flex mb-1">
                  <div className="h-4 bg-gray-200 rounded w-[50px] mr-1 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-[30px] animate-pulse"></div>
                </div>
                <div className="h-3 bg-gray-200 rounded w-full mb-1 animate-pulse"></div>
                <div className="h-3 bg-gray-200 rounded w-full mb-1 animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
