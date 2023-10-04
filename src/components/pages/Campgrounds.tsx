import Image from "next/image";
import Link from "next/link";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { CiViewList } from "react-icons/ci";
import useCampgrounds from '../../app/hooks/useCampgrounds';
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal, PromiseLikeOfReactNode } from "react";

export default function Example() {
  const { campgrounds, loading } = useCampgrounds();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <ul
      role="list"
      className="mb-10 ml-36 mr-36 mt-10 grid grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
    >
      {campgrounds.map((campground: { email: Key | null | undefined; imageUrl: string | StaticImport; name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined; title: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined; role: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined; telephone: any; }) => (
        <li
          key={campground.email}
          className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
        >
          <div className="flex flex-1 flex-col p-8">
            <Image
              className="mx-auto h-60 w-60"
              src={campground.imageUrl}
              alt=""
              width={40}
              height={40}
            />
            <h3 className="mt-6 text-sm font-medium text-gray-900">
              {campground.name}
            </h3>
            <dl className="mt-1 flex flex-grow flex-col justify-between">
              <dt className="sr-only">Title</dt>
              <dd className="text-sm text-gray-500">{campground.title}</dd>
              <dt className="sr-only">Role</dt>
              <dd className="mt-3">
                <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                  {campground.role}
                </span>
              </dd>
            </dl>
          </div>
          <div>
            <div className="-mt-px flex divide-x divide-gray-200">
              <div className="flex w-0 flex-1">
                <Link
                  href={`mailto:${campground.email}`}
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
                  href={`tel:${campground.telephone}`}
                  className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                >
                  <AiFillEdit
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  Edit
                </Link>
              </div>
              <div className="-ml-px flex w-0 flex-1">
                <Link
                  href={`tel:${campground.telephone}`}
                  className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                >
                  <AiFillDelete
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
