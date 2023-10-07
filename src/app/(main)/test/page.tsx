import { CiViewList } from 'react-icons/ci'
import Image from 'next/image'

const campgrounds = [
  {
    title: 'Jane Cooper',
    location: 'Paradigm Representative',
    price: '20',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dol',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
  {
    title: 'Jane Cooper',
    location: 'Paradigm Representative',
    price: '30',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dol',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
  {
    title: 'Jane Cooper',
    location: 'Paradigm Representative',
    price: '30',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dol',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
  {
    title: 'Jane Cooper',
    location: 'Paradigm Representative',
    price: '30',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dol',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
  {
    title: 'Jane Cooper',
    location: 'Paradigm Representative',
    price: '34',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dol',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
  {
    title: 'Jane Cooper',
    location: 'Paradigm Representative',
    price: '37',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dol',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
]

export default function Test() {
  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
      {campgrounds.map((campground) => (
        <li
          key={campground.title}
          className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
        >
          <div className="flex flex-1 flex-col p-8">
            <Image width={44} height={44} className="mx-auto h-44 w-44" src={campground.imageUrl} alt="" />
            <h3 className="mt-6 text-sm font-medium text-gray-900">{campground.title}</h3>
            <dl className="mt-1 flex flex-grow flex-col justify-between">
              <dt className="sr-only">Location</dt>
              <dd className="text-sm text-gray-500">{campground.location}</dd>
              <dd className="text-sm text-gray-500">{campground.price}</dd>
              <dd className="text-sm text-gray-500">{campground.description}</dd>
              <dd className="mt-3">
              </dd>
            </dl>
          </div>
          <div>
            <div className="-mt-px flex divide-x divide-gray-200">
              <div className="flex w-0 flex-1">
                <a
                  className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                >
                  <CiViewList className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  View
                </a>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}
