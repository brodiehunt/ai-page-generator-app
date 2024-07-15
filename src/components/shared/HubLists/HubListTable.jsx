import Link from "next/link";
import DeleteHubModalButton from "@/src/components/shared/HubLists/DeleteHubModalButton";
import HubListTablePagination from "@/src/components/shared/HubLists/HubListTablePagination";
import NoHubsAvailable from "@/src/components/shared/HubLists/NoHubs";

async function getHubs(websiteId) {
  const response = await fetch(
    `http://localhost:3000/api/websites/${websiteId}/hubs`,
    {
      method: "GET",
      next: { tags: ["hubList"] },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    console.log(response.error);
    return { error: "Error fetching hubs." };
  }

  return response.json();
}

const HubListTable = async ({ websiteId, websiteName, userId }) => {
  const { hubs, error } = await getHubs(websiteId);

  return (
    <section className="mx-auto">
      <div className="flex flex-col">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <HubTableHead />
                {error ? (
                  <div>There has been an error</div>
                ) : (
                  hubs.length !== 0 && (
                    <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                      {hubs.map((hub) => {
                        return (
                          <HubRow
                            key={hub._id}
                            hub={hub}
                            userId={userId}
                            websiteId={websiteId}
                          />
                        );
                      })}
                    </tbody>
                  )
                )}
              </table>
              {!error && !hubs.length && (
                <NoHubsAvailable
                  websiteName={websiteName}
                  websiteId={websiteId}
                  userId={userId}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <HubListTablePagination />
    </section>
  );
};

export default HubListTable;

const HubTableHead = () => {
  return (
    <thead className="bg-gray-50 dark:bg-gray-800">
      <tr>
        <th
          scope="col"
          className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
        >
          <div className="flex items-center gap-x-3">
            <button className="flex items-center gap-x-2">
              <span>Name</span>

              <svg
                className="h-3"
                viewBox="0 0 10 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.13347 0.0999756H2.98516L5.01902 4.79058H3.86226L3.45549 3.79907H1.63772L1.24366 4.79058H0.0996094L2.13347 0.0999756ZM2.54025 1.46012L1.96822 2.92196H3.11227L2.54025 1.46012Z"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="0.1"
                />
                <path
                  d="M0.722656 9.60832L3.09974 6.78633H0.811638V5.87109H4.35819V6.78633L2.01925 9.60832H4.43446V10.5617H0.722656V9.60832Z"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="0.1"
                />
                <path
                  d="M8.45558 7.25664V7.40664H8.60558H9.66065C9.72481 7.40664 9.74667 7.42274 9.75141 7.42691C9.75148 7.42808 9.75146 7.42993 9.75116 7.43262C9.75001 7.44265 9.74458 7.46304 9.72525 7.49314C9.72522 7.4932 9.72518 7.49326 9.72514 7.49332L7.86959 10.3529L7.86924 10.3534C7.83227 10.4109 7.79863 10.418 7.78568 10.418C7.77272 10.418 7.73908 10.4109 7.70211 10.3534L7.70177 10.3529L5.84621 7.49332C5.84617 7.49325 5.84612 7.49318 5.84608 7.49311C5.82677 7.46302 5.82135 7.44264 5.8202 7.43262C5.81989 7.42993 5.81987 7.42808 5.81994 7.42691C5.82469 7.42274 5.84655 7.40664 5.91071 7.40664H6.96578H7.11578V7.25664V0.633865C7.11578 0.42434 7.29014 0.249976 7.49967 0.249976H8.07169C8.28121 0.249976 8.45558 0.42434 8.45558 0.633865V7.25664Z"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="0.3"
                />
              </svg>
            </button>
          </div>
        </th>

        <th
          scope="col"
          className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
        >
          Last Edited
        </th>

        <th
          scope="col"
          className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
        >
          SEO Matrix
        </th>

        <th
          scope="col"
          className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
        >
          Blogs
        </th>

        <th
          scope="col"
          className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
        >
          Live On Site
        </th>

        <th scope="col" className="relative py-3.5 px-4">
          <span className="sr-only">Actions</span>
        </th>
      </tr>
    </thead>
  );
};

const HubRow = ({ hub, userId }) => {
  console.log("HubData", hub);
  return (
    <tr className="">
      <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
        <div className="inline-flex items-center gap-x-3">
          <span>{hub.name}</span>
        </div>
      </td>
      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
        Jan 6, 2022
      </td>
      <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
        {/* {hub.seoMatrix?.hasContent ? (
          <GreenBubble>True</GreenBubble>
        ) : (
          <RedBubble>False</RedBubble>
        )} */}
      </td>
      <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
        <Blogs blogs={hub.blogs} />
      </td>
      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
        <Link
          href="/"
          className="text-custom-primary/80 transition-all duration-200ms hover:text-custom-primary underline"
          target="_blank"
        >
          Visit Site
        </Link>
      </td>
      <td className="px-4 py-4 text-sm whitespace-nowrap ml-auto">
        <div className="flex items-center gap-x-6 justify-end">
          <Link
            href={`/dashboard/websites/${hub.websiteId}/hubs/${hub._id}`}
            className="text-custom-primary/80 transition-all duration-200ms hover:text-custom-primary underline"
          >
            View
          </Link>

          <DeleteHubModalButton
            hubName={hub.name}
            websiteId={hub.websiteId}
            hubId={hub._id}
            userId={userId}
          ></DeleteHubModalButton>
        </div>
      </td>
    </tr>
  );
};

const GreenBubble = ({ children }) => {
  return (
    <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60 dark:bg-gray-800">
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 3L4.5 8.5L2 6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <h2 className="text-sm font-normal">{children}</h2>
    </div>
  );
};

const RedBubble = ({ children }) => {
  return (
    <div className="inline-flex items-center px-3 py-1 text-red-500 rounded-full gap-x-2 bg-red-100/60 dark:bg-gray-800">
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9 3L3 9M3 3L9 9"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <h2 className="text-sm font-normal">{children}</h2>
    </div>
  );
};

const Blogs = ({ blogs }) => {
  if (!blogs || !blogs.length) return <RedBubble>None</RedBubble>;
  console.log(blogs);
  return (
    <div className="flex flex-wrap items-center gap-x-2 max-w-[300px]">
      {blogs &&
        blogs.map((blog) => {
          return (
            <>
              <Link
                href={`/dashboard/`}
                className="text-gray-500 hover:underline hover:text-gray-600"
              >
                {blog.name},
              </Link>
            </>
          );
        })}
    </div>
  );
};
