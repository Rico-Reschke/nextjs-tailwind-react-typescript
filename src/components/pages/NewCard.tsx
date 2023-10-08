import { CiViewList } from "react-icons/ci";

const getCampgrounds = async () => {
  try {
    const res = await fetch("http://127.0.0.1:3000/api/campgrounds", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch Campgrounds");
    }

    return res.json();
  } catch (error) {
    console.log("Error loading Campgrounds: ", error);
  }
};

export default async function NewCard() {
  const { campgrounds } = await getCampgrounds();

  return (
    <>
      <ul className="my-3 mt-10 grid grid-cols-1 gap-6 gap-x-4 py-3 sm:grid-cols-2 md:grid-cols-3">
        {campgrounds.map((t: any) => (
          <li
            key={t._id}
            className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
          >
            <div className="flex flex-1 flex-col p-8">
              <dl className="-my-3 mt-10 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
                <div className="flex justify-between gap-x-4 py-3">
                  <dt className="text-gray-500">Title</dt>
                  <dd className="flex items-start gap-x-2">
                    <div className="font-medium text-gray-900">{t.title}</div>
                  </dd>
                </div>
                <div className="flex justify-between gap-x-4 py-3">
                  <dt className="text-gray-500">Location</dt>
                  <dd className="flex items-start gap-x-2">
                    <div className="font-medium text-gray-900">
                      {t.location}
                    </div>
                  </dd>
                </div>
                <div className="flex justify-between gap-x-4 py-3">
                  <dt className="text-gray-500">Campground Price</dt>
                  <dd className="flex items-start gap-x-2">
                    <div className="font-medium text-gray-900">{t.price}</div>
                  </dd>
                </div>
                <div className="flex justify-between gap-x-4 py-3">
                  <dt className="text-gray-500">Description</dt>
                  <dd className="flex items-start gap-x-2">
                    <div className="font-medium text-gray-900">
                      {t.description}
                    </div>
                  </dd>
                </div>
              </dl>
            </div>
            <div>
              <div className="-mt-px flex divide-x divide-gray-200">
                <div className="flex w-0 flex-1">
                  <a className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900">
                    <CiViewList
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    View
                  </a>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
