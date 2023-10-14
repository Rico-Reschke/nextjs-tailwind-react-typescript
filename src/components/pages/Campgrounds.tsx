import Image from "next/image";
import Link from "next/link";
import { CiViewList } from "react-icons/ci";

const getCampgrounds = async () => {
  try {
    const res = await fetch("http://127.0.0.1:3000/api/campgrounds", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch topics");
    }

    return res.json();
  } catch (error) {
    console.log("Error loading campgrounds: ", error);
  }
};

export default async function Example() {
  const { campgrounds } = await getCampgrounds();

  return (
    <ul
      role="list"
      className="mx-5 mt-5 grid grid-cols-1 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
    >
      {campgrounds.map((t: any) => (
        <li
          key={t._id}
          className="col-span-1 flex flex-col rounded-lg bg-white text-center shadow"
        >
          <div className="relative h-96 w-full">
            {t.imageUrl && (
              <Image
                className="w-300 h-300"
                objectFit="cover"
                layout="fill"
                alt="Campground Image"
                src={t.imageUrl}
              />
            )}
          </div>
          <div className="flex flex-1 flex-col divide-y divide-gray-100 p-8">
            <div className="flex justify-between gap-x-4 py-3">
              <dt className="font-bold text-gray-900">Title</dt>
              <dd className="flex items-start gap-x-2">
                <div className="break-words text-gray-500">{t.title}</div>
              </dd>
            </div>
            <div className="flex justify-between gap-x-4 py-3">
              <dt className="font-bold text-gray-900">Location</dt>
              <dd className="flex items-start gap-x-2">
                <div className="break-words text-gray-500">
                  {t.location}
                </div>
              </dd>
            </div>
            <div className="flex justify-between gap-x-4 py-3">
              <dt className="font-bold text-gray-900">Price a Day</dt>
              <dd className="flex items-start gap-x-2">
                <div className="text-gray-500 break-words">{t.price}</div>
              </dd>
            </div>
            <div className="gap-x-4 py-3">
              <dt className="font-bold text-gray-900">Description</dt>
              <div className="mt-2 break-words text-gray-500">
                {t.description}
              </div>
            </div>
          </div>
          <div>
            <div className="-mt-px flex divide-x divide-gray-200">
              <div className="flex w-0 flex-1">
                <Link
                  href={""}
                  className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                >
                  <CiViewList
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  View
                </Link>
              </div>
              <div className="-ml-px flex w-0 flex-1">
                <Link
                  href={""}
                  className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                >
                  <CiViewList
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  Edit
                </Link>
              </div>
              <div className="-ml-px flex w-0 flex-1">
                <Link
                  href={""}
                  className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                >
                  <CiViewList
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  Delete
                </Link>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
