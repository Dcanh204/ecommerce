export default function ProductDetailsSkeleton() {
  return (
    <div className="bg-gray-50 min-h-screen animate-pulse">

      {/* HEADER */}
      <div className="bg-white shadow-sm py-3 mb-5">
        <div className="w-[90%] mx-auto h-4 bg-gray-200 rounded"></div>
      </div>

      {/* MAIN */}
      <div className="w-[90%] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">

        {/* LEFT IMAGE */}
        <div className="bg-white p-5 rounded-2xl shadow">
          <div className="h-[400px] bg-gray-200 rounded-xl mb-4"></div>

          <div className="flex gap-3">
            {Array(4).fill(0).map((_, i) => (
              <div key={i} className="w-[70px] h-[70px] bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="flex flex-col gap-4">

          {/* TITLE */}
          <div className="h-6 w-3/4 bg-gray-200 rounded"></div>

          {/* RATING */}
          <div className="h-4 w-1/3 bg-gray-200 rounded"></div>

          {/* PRICE */}
          <div className="h-10 w-1/2 bg-gray-200 rounded"></div>

          {/* BRAND */}
          <div className="h-4 w-1/3 bg-gray-200 rounded"></div>

          {/* DESCRIPTION */}
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
          </div>

          {/* QUANTITY */}
          <div className="flex gap-3 items-center">
            <div className="h-4 w-20 bg-gray-200 rounded"></div>
            <div className="h-8 w-24 bg-gray-200 rounded"></div>
          </div>

          {/* BUTTONS */}
          <div className="flex gap-4 mt-4">
            <div className="h-12 flex-1 bg-gray-200 rounded-xl"></div>
            <div className="h-12 flex-1 bg-gray-200 rounded-xl"></div>
            <div className="h-12 w-12 bg-gray-200 rounded-xl"></div>
          </div>

        </div>
      </div>

      {/* REVIEW SECTION */}
      <div className="w-[90%] mx-auto mt-10 bg-white p-6 rounded-2xl shadow">
        <div className="flex gap-4 mb-5">
          <div className="h-10 w-24 bg-gray-200 rounded"></div>
          <div className="h-10 w-24 bg-gray-200 rounded"></div>
        </div>

        <div className="space-y-3">
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
        </div>
      </div>

    </div>
  );
}